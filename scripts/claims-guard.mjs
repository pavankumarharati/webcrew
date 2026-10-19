// Blocks claims WebCrew cannot back up from reaching the live site.
// Run before every unattended deploy (weekly SEO autofix) — exit 1 = do not ship.
// Patterns are claims we removed after the 2026-10 promise audit, or ones we can
// never make (compliance, guarantees, invented results).
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOTS = ['src/app', 'src/content', 'src/components/niche-landing.tsx', 'src/components/tier-pricing.tsx', 'public/llms.txt']
const BANNED = [
  [/\b6 hours\b|no human involvement/i, 'build-time claim (removed: not true)'],
  [/97\/100|PageSpeed score/i, 'PageSpeed score claim'],
  [/\$297/, 'old $297 price'],
  [/weekly Google Business Profile post|GBP post|automatic review repl|review-reply agent|auto[- ]repl(y|ies) to (every )?review/i, 'GBP posting / review replies (not offered)'],
  [/HIPAA|SOC ?2/i, 'compliance claim'],
  [/\bguarantee(d|s)? (more|results|leads|bookings|ranking)/i, 'results guarantee'],
  [/\b\d{2,3}\s?% (more|fewer|increase|of (callers|customers|leads))/i, 'unsourced statistic'],
  [/(trusted by|used by|join) \d[\d,]* (businesses|clients|owners|companies)/i, 'customer-count claim'],
]
// A banned word inside an explicit denial is fine ("We do not claim HIPAA").
const DENIAL = /(do(es)? not|don't|never|not) (claim|offer|promise|publish)|no (HIPAA|SOC)/i

// Default: check only lines added since HEAD (what an unattended edit introduced).
// --all: scan every file (informational; older reviewed copy may legitimately
// explain terms like HIPAA in an educational post).
const ALL = process.argv.includes('--all')
const hits = []
const check = (f, line, n) => {
  if (f.includes('/terms/') || f.includes('/privacy/')) return
  for (const [re, why] of BANNED) if (re.test(line) && !DENIAL.test(line)) hits.push(`${f}:${n}  ${why}  →  ${line.trim().slice(0, 140)}`)
}
let scanned = 0
if (ALL) {
  const files = []
  const walk = p => { const s = fs.statSync(p); if (s.isDirectory()) for (const f of fs.readdirSync(p)) walk(path.join(p, f)); else if (/\.(tsx?|txt|md)$/.test(p)) files.push(p) }
  for (const r of ROOTS) if (fs.existsSync(r)) walk(r)
  for (const f of files) { scanned++; fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => check(f, l, i + 1)) }
} else {
  // tracked changes + brand-new untracked files under ROOTS
  const diff = execSync(`git diff -U0 HEAD -- ${ROOTS.join(' ')}`, { encoding: 'utf8' })
  let file = ''
  for (const l of diff.split('\n')) {
    if (l.startsWith('+++ b/')) { file = l.slice(6); scanned++ }
    else if (l.startsWith('+') && !l.startsWith('+++')) check(file, l.slice(1), '+')
  }
  const untracked = execSync(`git ls-files --others --exclude-standard -- ${ROOTS.join(' ')}`, { encoding: 'utf8' }).split('\n').filter(f => /\.(tsx?|txt|md)$/.test(f))
  for (const f of untracked) { scanned++; fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => check(f, l, i + 1)) }
}
if (hits.length) { console.error(`[claims-guard] ${hits.length} blocked claim(s):\n` + hits.join('\n')); process.exit(1) }
console.log(`[claims-guard] OK (${scanned} file(s) checked${ALL ? ', full scan' : ', changes only'})`)
