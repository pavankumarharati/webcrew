// Fetch a free stock hero image (Pexels first, Pixabay fallback) for every blog
// post that has none yet. Images are downloaded into public/blog/<slug>.jpg
// (both sites ask you not to hotlink permanently) and recorded with the
// photographer credit in src/content/blog/images.json.
// Usage: PEXELS_API_KEY=… PIXABAY_API_KEY=… node scripts/blog-images.mjs [slug "query"]
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const MANIFEST = path.join(ROOT, 'src/content/blog/images.json')
const CONTENT = path.join(ROOT, 'src/content/blog')
const OUT = path.join(ROOT, 'public/blog')

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {}
const usedIds = new Set(Object.values(manifest).map(m => m.id))

function postMeta(slug) {
  const src = fs.readFileSync(path.join(CONTENT, `${slug}.ts`), 'utf8')
  const q = src.match(/imageQuery:\s*["']([^"']+)["']/)
  const kw = src.match(/keywords:\s*\[\s*["']([^"']+)["']/)
  const title = src.match(/title:\s*["']([^"']+)["']/)
  return { query: q?.[1], keyword: kw?.[1], title: title?.[1] ?? slug }
}

async function pexels(query) {
  const key = process.env.PEXELS_API_KEY
  if (!key) return null
  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`, { headers: { Authorization: key } })
  if (!r.ok) return null
  const j = await r.json()
  const ph = (j.photos ?? []).find(p => !usedIds.has(`pexels:${p.id}`))
  if (!ph) return null
  return { id: `pexels:${ph.id}`, url: ph.src.landscape, alt: ph.alt || query, credit: ph.photographer, creditUrl: ph.url, source: 'Pexels' }
}

async function pixabay(query) {
  const key = process.env.PIXABAY_API_KEY
  if (!key) return null
  const r = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=30&safesearch=true`)
  if (!r.ok) return null
  const j = await r.json()
  const ph = (j.hits ?? []).find(p => !usedIds.has(`pixabay:${p.id}`))
  if (!ph) return null
  return { id: `pixabay:${ph.id}`, url: ph.largeImageURL, alt: query, credit: ph.user, creditUrl: ph.pageURL, source: 'Pixabay' }
}

export async function ensureImage(slug, queryOverride) {
  if (manifest[slug] && !queryOverride) return manifest[slug]
  const meta = postMeta(slug)
  const queries = [queryOverride, meta.query, meta.keyword?.replace(/\bAI\b/gi, '').trim(), 'small business owner phone call'].filter(Boolean)
  let hit = null
  for (const q of queries) { hit = (await pexels(q)) ?? (await pixabay(q)); if (hit) break }
  if (!hit) { console.warn(`[blog-images] no image for ${slug}`); return null }
  const img = await fetch(hit.url)
  if (!img.ok) { console.warn(`[blog-images] download failed ${slug}`); return null }
  fs.writeFileSync(path.join(OUT, `${slug}.jpg`), Buffer.from(await img.arrayBuffer()))
  usedIds.add(hit.id)
  manifest[slug] = { id: hit.id, src: `/blog/${slug}.jpg`, alt: hit.alt, credit: hit.credit, creditUrl: hit.creditUrl, source: hit.source }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`[blog-images] ${slug} ← ${hit.source} ${hit.id} (${hit.credit})`)
  return manifest[slug]
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [slugArg, queryArg] = process.argv.slice(2)
  const slugs = slugArg ? [slugArg] : fs.readdirSync(CONTENT).filter(f => f.endsWith('.ts') && f !== 'index.ts').map(f => f.replace(/\.ts$/, ''))
  for (const s of slugs) await ensureImage(s, queryArg)
}
