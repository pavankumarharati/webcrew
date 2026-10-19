// Ping IndexNow (Bing, Yandex, Seznam...) with every URL in the built sitemap.
// Runs after each deploy. Bing's index feeds ChatGPT search and Copilot.
// Key file: public/7d4045cfc868b8ddaa3e4f66434c3b04.txt (must stay deployed at the site root).
import fs from 'node:fs'

const KEY = '7d4045cfc868b8ddaa3e4f66434c3b04'
const HOST = 'webcrew.app'
const xml = fs.readFileSync('out/sitemap.xml', 'utf8')
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
if (!urls.length) { console.log('[indexnow] no URLs in sitemap'); process.exit(0) }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
// 200/202 = accepted. Never fail the deploy over this.
console.log(`[indexnow] ${urls.length} URLs -> HTTP ${res.status}`)
