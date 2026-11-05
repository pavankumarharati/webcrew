'use client'

import { useEffect, useState, type ReactNode } from 'react'

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.webcrew.app'

interface Item { id: string; rating: number; quote: string; name: string | null; business: string | null; city: string | null }

/**
 * Real client testimonials only: rows the client allowed to publish AND we approved,
 * showing only the name/business details they agreed to. Until there is at least one,
 * the honest placeholder (children) stays.
 */
export default function CustomerProof({ placeholder }: { placeholder: ReactNode }) {
  const [items, setItems] = useState<Item[] | null>(null)
  useEffect(() => {
    let live = true
    fetch(`${ADMIN_URL}/api/public/testimonials`).then(r => r.ok ? r.json() : { items: [] }).then(d => { if (live) setItems(Array.isArray(d.items) ? d.items : []) }).catch(() => { if (live) setItems([]) })
    return () => { live = false }
  }, [])

  if (!items?.length) return <>{placeholder}</>
  return (
    <div className="wc-proof-grid">
      {items.slice(0, 6).map(t => (
        <figure key={t.id} className="wc-proof-card">
          <div className="wc-proof-stars" aria-label={`${t.rating} out of 5 stars`}>{'★'.repeat(t.rating)}<span>{'★'.repeat(5 - t.rating)}</span></div>
          <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption>
            <strong>{t.name ?? 'WebCrew client'}</strong>
            {(t.business || t.city) && <span>{[t.business, t.city].filter(Boolean).join(', ')}</span>}
            <em>Verified paying client</em>
          </figcaption>
        </figure>
      ))}
      <style>{`
        .wc-proof-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
        .wc-proof-card{margin:0;background:#fff;border:1px solid #e3e7ee;border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:12px}
        .wc-proof-stars{color:#f5a524;font-size:16px;letter-spacing:2px}.wc-proof-stars span{color:#dfe3ea}
        .wc-proof-card blockquote{margin:0;font-size:15px;line-height:1.6;color:#1b2333}
        .wc-proof-card figcaption{display:flex;flex-direction:column;gap:2px;font-size:13px;color:#5b6577;margin-top:auto}
        .wc-proof-card figcaption strong{color:#0d172b}.wc-proof-card figcaption em{font-style:normal;font-size:11px;font-weight:700;color:#07875e;text-transform:uppercase;letter-spacing:.04em;margin-top:4px}
      `}</style>
    </div>
  )
}
