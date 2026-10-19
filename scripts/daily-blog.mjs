// Daily blog writer. Picks the next topic from src/content/blog/queue.json (or
// asks Gemini for a fresh one when the queue is empty), writes the post with
// Gemini, validates it against our honesty rules, adds a free stock photo, and
// registers it in src/content/blog/index.ts. A post that fails validation after
// 3 attempts is NOT published (the day is skipped, never a bad post).
// Usage: GEMINI_API_KEY=… PEXELS_API_KEY=… node scripts/daily-blog.mjs [--force] [--dry]
import fs from 'node:fs'
import path from 'node:path'
import { ensureImage } from './blog-images.mjs'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const CONTENT = path.join(ROOT, 'src/content/blog')
const INDEX = path.join(CONTENT, 'index.ts')
const QUEUE = path.join(CONTENT, 'queue.json')
const MODEL = process.env.BLOG_MODEL ?? 'gemini-3.8-flash'
const KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_AI_API_KEY
const FORCE = process.argv.includes('--force')
const DRY = process.argv.includes('--dry')
const CATEGORIES = ['Guides', 'Pricing & comparisons', 'By trade', 'Follow-up & reviews', 'Phone basics']
const today = new Date().toISOString().slice(0, 10)

const FACTS = `
WebCrew facts (the ONLY product facts you may state):
- WebCrew is an AI front desk for local service businesses: an AI receptionist answers the business phone and a talking assistant on the website, 24/7.
- It answers questions from the business's own info, captures name + callback number + what they need, flags urgent calls, and can transfer urgent calls to the owner's cell.
- Booking: books straight into the owner's Google Calendar once it is connected; customers can text C to confirm, R to reschedule, X to cancel.
- After every real customer call the owner gets a summary by email/text.
- Any text message (confirmations, reminders, text-back, follow-ups) only goes to callers who agreed to texts; otherwise email.
- Missed-call text-back only goes to callers who agreed to texts. Lead follow-ups on day 3 and day 10 for leads that did not book. Review requests go by email after a visit with the owner's Google review link (no review gating).
- Monthly report: calls handled, after-hours calls, leads, urgent calls, bookings, follow-ups sent.
- Free demo website built for the business if they want one.
- Pricing: Founding 10 = $99/month locked for life for the first 10 clients (250 AI minutes, 300 texts, 1,000 website chats a month). After that, Standard = $149/month (500 AI minutes). Custom quote for multi-location or high volume. $0 setup. 30-day free trial. Over the monthly limit, calls ring the owner's cell instead of the AI, so there are no surprise charges.
- Setup: forward the business number to the WebCrew number (only when you don't answer, or always), connect Google Calendar, share service list + service area.
- WebCrew does NOT claim HIPAA or SOC 2 compliance, does not post to Google Business Profile, does not reply to reviews automatically, and does not give prices for jobs it has not been told.`

const RULES = `
Writing rules (a post that breaks any rule is rejected):
- Audience: owners of local service businesses (HVAC, plumbing, roofing, electrical, cleaning, landscaping, pest control, auto detailing, garage doors, etc.). Plain English, short paragraphs, practical, specific. Write like an experienced operator, not a marketer.
- NO statistics, percentages or numbers presented as facts about the market, and never write "studies show", "research", "survey", "according to", "on average", "industry data". If a number helps, present it as a worked example with the owner's own numbers ("say a job is worth $400…") or as a formula.
- No invented customers, testimonials, quotes or case studies. No named people.
- Do not state facts about competitors other than that they exist.
- No legal advice beyond "check the rules in your state"; say that for texting consent topics.
- Body format (markdown-lite): "## " and "### " headings, paragraphs, "- " bullet lists, "1. " numbered lists (no nesting), simple "|" tables with a header row, "> " single-line callouts, **bold**, [link text](/blog/slug) links. NO backticks, NO code, NO "#" h1, NO images, NO HTML, NO "\${".
- 900 to 1,600 words. 5 to 9 "## " sections. End with a short "## " section that mentions WebCrew naturally: 2 to 4 sentences, not a feature list, the founding offer at most once.
- Include 1 to 3 internal links, only to slugs from the list provided.
- description: 120 to 158 characters, no quotes. title: under 70 characters, includes the main keyword.
- faq: 3 to 4 short question/answer pairs that a business owner would actually ask, answers 1 to 3 sentences, consistent with the facts.`

const SCHEMA = {
  type: 'OBJECT',
  properties: {
    slug: { type: 'STRING' }, title: { type: 'STRING' }, description: { type: 'STRING' },
    keywords: { type: 'ARRAY', items: { type: 'STRING' } }, body: { type: 'STRING' },
    faq: { type: 'ARRAY', items: { type: 'OBJECT', properties: { q: { type: 'STRING' }, a: { type: 'STRING' } }, required: ['q', 'a'] } },
  },
  required: ['slug', 'title', 'description', 'keywords', 'body', 'faq'],
}

function existingPosts() {
  return fs.readdirSync(CONTENT).filter(f => f.endsWith('.ts') && f !== 'index.ts').map(f => {
    const src = fs.readFileSync(path.join(CONTENT, f), 'utf8')
    return { slug: f.replace(/\.ts$/, ''), title: src.match(/title:\s*["']([^"']+)["']/)?.[1] ?? '', date: src.match(/date:\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1] ?? '' }
  })
}

// Fallback chain: 3.x flash models all serve from AI Studio; a 503/429 "high demand"
// on one usually clears on another or after a short wait (2026-10-19 run lost the day
// to three straight 503s on 3.8-flash).
const MODELS = [MODEL, 'gemini-3.7-flash', 'gemini-3.5-flash'].filter((m, i, a) => a.indexOf(m) === i)
const RETRYABLE = new Set([429, 500, 503, 504])

async function gemini(prompt, schema) {
  if (!KEY) throw new Error('GEMINI_API_KEY is not set')
  let last
  for (const [i, model] of MODELS.entries()) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 12000, responseMimeType: 'application/json', ...(schema ? { responseSchema: schema } : {}) },
        }),
      })
      const j = await r.json().catch(() => ({}))
      if (r.ok) {
        const text = (j.candidates?.[0]?.content?.parts ?? []).map(p => p.text ?? '').join('')
        if (i > 0) console.log(`[daily-blog] used fallback model ${model}`)
        return JSON.parse(text)
      }
      last = new Error(`Gemini ${model} ${r.status}: ${JSON.stringify(j).slice(0, 200)}`)
      if (!RETRYABLE.has(r.status)) throw last
      console.log(`[daily-blog] ${model} ${r.status}, retrying`)
      await new Promise(res => setTimeout(res, 15000 * (attempt + 1)))
    }
  }
  throw last
}

const slugify = s => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-$/, '')

export function validate(post, slugs) {
  const errs = []
  const b = post.body ?? ''
  const words = b.split(/\s+/).filter(Boolean).length
  if (words < 850 || words > 1800) errs.push(`body is ${words} words (need 900-1600)`)
  const h2 = (b.match(/^## /gm) ?? []).length
  if (h2 < 5 || h2 > 10) errs.push(`${h2} "## " sections (need 5-9)`)
  if (/`|\$\{|<[a-z/][^>]*>|^# /m.test(b)) errs.push('body contains backticks, ${, HTML or an h1')
  const banned = [
    [/\d+(\.\d+)?\s?(%|percent)/i, 'a percentage'],
    [/\b(studies|study|research|survey|surveys|statistic|statistics|report(s|ed)? that|according to|on average|industry data|data shows)\b/i, 'a research/statistics claim'],
    [/\b(hipaa|soc ?2|gdpr compliant|guarantee[ds]?)\b/i, 'a compliance or guarantee claim'],
    [/\b(testimonial|case study|one of our (clients|customers))\b/i, 'an invented customer reference'],
    [/\b(replies to (your )?reviews|posts to (your )?google business)\b/i, 'an unsupported feature'],
  ]
  const all = [post.title, post.description, b, ...(post.faq ?? []).flatMap(f => [f.q, f.a])].join('\n')
  for (const [re, what] of banned) { const m = all.match(re); if (m) errs.push(`contains ${what}: "${m[0]}"`) }
  for (const m of all.matchAll(/\$\s?(\d[\d,]*)/g)) {
    const n = Number(m[1].replace(/,/g, ''))
    const ctx = all.slice(Math.max(0, m.index - 80), m.index + 40).toLowerCase()
    const isOurPrice = [0, 99, 149].includes(n)
    const isExample = /(say|example|imagine|if |suppose|worth|your|e\.g\.|for instance|x |×|=)/.test(ctx)
    if (!isOurPrice && !isExample) errs.push(`dollar amount ${m[0]} is not WebCrew pricing or a clearly labeled example`)
  }
  for (const m of b.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const url = m[1]
    const ok = url === '/' || url === '/blog' || (url.startsWith('/blog/') && slugs.includes(url.slice(6)))
    if (!ok) errs.push(`bad link ${url} (only /, /blog or /blog/<existing slug>)`)
  }
  if (!post.description || post.description.length < 100 || post.description.length > 165) errs.push(`description is ${post.description?.length ?? 0} chars (need 120-158)`)
  if (!post.title || post.title.length > 75) errs.push('title missing or too long')
  if (!post.faq || post.faq.length < 3) errs.push('need 3-4 FAQ pairs')
  return [...new Set(errs)]
}

const q = s => JSON.stringify(s)
function toTs(post) {
  const faq = post.faq.map(f => `    [${q(f.q)}, ${q(f.a)}],`).join('\n')
  const body = post.body.replace(/\\/g, '\\\\').trim()
  return `import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: ${q(post.slug)},
  title: ${q(post.title)},
  description: ${q(post.description)},
  date: ${q(post.date)},
  category: ${q(post.category)},
  imageQuery: ${q(post.imageQuery)},
  keywords: [${post.keywords.slice(0, 6).map(q).join(', ')}],
  body: \`
${body}
\`,
  faq: [
${faq}
  ],
}
`
}

function register(slug) {
  let src = fs.readFileSync(INDEX, 'utf8')
  if (src.includes(`'./${slug}'`)) return
  const n = (src.match(/import \{ post as p(\d+) \}/g) ?? []).map(s => Number(s.match(/\d+/)[0])).reduce((a, b) => Math.max(a, b), 0) + 1
  src = src.replace(/(\nexport const POSTS)/, `\nimport { post as p${n} } from './${slug}'$1`)
  src = src.replace(/export const POSTS: BlogPost\[\] = \[/, `export const POSTS: BlogPost[] = [p${n}, `)
  fs.writeFileSync(INDEX, src)
}

async function nextTopic(posts) {
  const queue = fs.existsSync(QUEUE) ? JSON.parse(fs.readFileSync(QUEUE, 'utf8')) : []
  const taken = new Set(posts.map(p => p.slug))
  const t = queue.find(t => !taken.has(slugify(t.slug ?? t.title)))
  if (t) return { ...t, slug: slugify(t.slug ?? t.title) }
  // Queue empty: ask Gemini for a fresh topic that does not overlap existing titles.
  const idea = await gemini(`Suggest ONE new blog topic for webcrew.app (AI receptionist / front desk for local service businesses). It must target a real search a local business owner makes, and must NOT overlap these existing posts:\n${posts.map(p => '- ' + p.title).join('\n')}\nReturn JSON {title, category (one of ${CATEGORIES.join(' | ')}), keywords (4), imageQuery (3-5 word stock photo search showing a real scene, no text/logos), angle (one sentence)}.`, {
    type: 'OBJECT', properties: { title: { type: 'STRING' }, category: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, imageQuery: { type: 'STRING' }, angle: { type: 'STRING' } }, required: ['title', 'category', 'keywords', 'imageQuery', 'angle'],
  })
  if (!CATEGORIES.includes(idea.category)) idea.category = 'Guides'
  return { ...idea, slug: slugify(idea.title) }
}

async function main() {
  const posts = existingPosts()
  if (!FORCE && posts.some(p => p.date === today)) { console.log(`[daily-blog] a post is already dated ${today}; nothing to do`); return }
  const topic = await nextTopic(posts)
  const slugs = posts.map(p => p.slug)
  console.log(`[daily-blog] topic: ${topic.title} (${topic.slug})`)
  let feedback = ''
  for (let attempt = 1; attempt <= 3; attempt++) {
    const prompt = `Write one blog post for webcrew.app.\n\nTopic: ${topic.title}\nAngle: ${topic.angle ?? ''}\nCategory: ${topic.category}\nTarget keywords: ${(topic.keywords ?? []).join(', ')}\nUse slug: ${topic.slug}\n${FACTS}\n${RULES}\n\nExisting posts you may link to (slug — title):\n${posts.map(p => `${p.slug} — ${p.title}`).join('\n')}\n${feedback ? `\nYour previous draft was rejected for: ${feedback}\nFix every item.` : ''}\nReturn JSON {slug, title, description, keywords, body, faq:[{q,a}]}.`
    let draft
    try { draft = await gemini(prompt, SCHEMA) } catch (e) { feedback = `invalid output (${e.message})`; console.warn(`[daily-blog] attempt ${attempt}: ${e.message}`); continue }
    draft.slug = topic.slug
    const errs = validate(draft, slugs)
    if (errs.length) { feedback = errs.join('; '); console.warn(`[daily-blog] attempt ${attempt} rejected: ${feedback}`); continue }
    const post = { ...draft, date: today, category: topic.category, imageQuery: topic.imageQuery ?? draft.keywords[0] }
    if (DRY) { console.log(toTs(post)); return }
    fs.writeFileSync(path.join(CONTENT, `${post.slug}.ts`), toTs(post))
    register(post.slug)
    await ensureImage(post.slug)
    console.log(`[daily-blog] published ${post.slug}`)
    return
  }
  console.error('[daily-blog] all attempts rejected; nothing published today')
  process.exitCode = 2
}

if (import.meta.url === `file://${process.argv[1]}`) await main()
