import { Fragment, type ReactNode } from 'react'

// Minimal markdown renderer for blog posts (no dependency, static export friendly).
function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g
  let last = 0, m: RegExpExecArray | null, i = key
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const t = m[0]
    if (t.startsWith('[[')) out.push(<code key={i++}>{t.slice(2, -2)}</code>)
    else if (t.startsWith('**')) out.push(<strong key={i++}>{t.slice(2, -2)}</strong>)
    else if (t.startsWith('`')) out.push(<code key={i++}>{t.slice(1, -1)}</code>)
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!
      const ext = /^https?:/.test(href) && !href.includes('webcrew.app')
      out.push(<a key={i++} href={href} {...(ext ? { target: '_blank', rel: 'noopener nofollow' } : {})}>{label}</a>)
    }
    last = m.index + t.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function headings(body: string): { id: string; text: string }[] {
  return body.split('\n').filter(l => l.startsWith('## ')).map(l => ({ id: slugify(l.slice(3)), text: l.slice(3) }))
}

export function Markdown({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/)
  return (
    <>
      {blocks.map((raw, bi) => {
        const b = raw.trim()
        const lines = b.split('\n')
        if (b.startsWith('### ')) return <h3 key={bi}>{inline(b.slice(4))}</h3>
        if (b.startsWith('## ')) return <h2 key={bi} id={slugify(b.slice(3))}>{inline(b.slice(3))}</h2>
        if (b.startsWith('> ')) return <aside key={bi} className="bp-callout">{inline(lines.map(l => l.replace(/^>\s?/, '')).join(' '))}</aside>
        if (lines.every(l => /^- /.test(l))) return <ul key={bi}>{lines.map((l, i) => <li key={i}>{inline(l.slice(2))}</li>)}</ul>
        if (lines.every(l => /^\d+\. /.test(l))) return <ol key={bi}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\d+\. /, ''))}</li>)}</ol>
        if (lines.every(l => l.trim().startsWith('|'))) {
          const rows = lines.filter(l => !/^\|\s*-/.test(l.trim())).map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()))
          const [head, ...rest] = rows
          return (
            <div key={bi} className="bp-table"><table>
              <thead><tr>{head.map((c, i) => <th key={i}>{inline(c)}</th>)}</tr></thead>
              <tbody>{rest.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c)}</td>)}</tr>)}</tbody>
            </table></div>
          )
        }
        return <p key={bi}>{lines.map((l, i) => <Fragment key={i}>{i > 0 && ' '}{inline(l)}</Fragment>)}</p>
      })}
    </>
  )
}
