// Public pricing tiers. Mirrors pipeline/src/reception/entitlements.ts TIERS and
// admin/src/lib/plans.ts by hand: Founding 10 $99 (250 min), Standard $149
// (500 min), Custom quote. Keep the numbers in step when a price changes.
import { Check } from 'lucide-react'

const INCLUDED = [
  'AI receptionist on your phone line, 24/7',
  'Talking AI assistant on your website',
  'Books into your Google Calendar',
  'Urgent calls transferred to your cell',
  'Summary after every customer call',
  'Missed-call text-back (opted-in callers)',
  'Lead follow-ups on day 3 and day 10',
  'Review requests with your Google link',
  'Monthly report: calls, leads, bookings',
  'Free website if you want one',
]

const TIERS = [
  {
    name: 'Founding 10', price: '$99', per: '/mo', badge: 'First 10 clients only',
    lede: 'Locked for life while you stay. Built for one-location owners who want in early.',
    limits: ['250 AI minutes a month', '300 texts a month', '1,000 website chats a month'],
    cta: 'Claim a founding spot', featured: true,
  },
  {
    name: 'Standard', price: '$149', per: '/mo', badge: 'After the founding spots fill',
    lede: 'Same product, double the minutes, for busy single-location businesses.',
    limits: ['500 AI minutes a month', '300 texts a month', '1,000 website chats a month'],
    cta: 'Start my free trial', featured: false,
  },
  {
    name: 'Custom', price: 'Quote', per: '', badge: 'Multi-location or high volume',
    lede: 'Several locations, heavy call volume, or special routing. Same product, sized to you.',
    limits: ['Minutes and texts sized to your volume', 'One AI line per location', 'One dashboard for every location'],
    cta: 'Get a custom quote', featured: false,
  },
]

export default function TierPricing({ ctaHref = "#lead-form" }: { ctaHref?: string }) {
  return (
    <section className="wct" id="pricing" data-avatar-caption="Three plans, no surprises. Over your minutes, calls just ring your cell.">
      <style>{CSS}</style>
      <div className="wct-in">
        <div className="wct-eyebrow">Pricing</div>
        <h2>One product. <em>Three simple plans.</em></h2>
        <p className="wct-sub">$0 setup. 30-day free trial on every plan (card needed to start, nothing charged until it ends). No contracts, cancel anytime.</p>
        <div className="wct-grid">
          {TIERS.map(t => (
            <div key={t.name} className={`wct-card${t.featured ? ' on' : ''}`}>
              <div className="wct-badge">{t.badge}</div>
              <h3>{t.name}</h3>
              <div className="wct-price"><b>{t.price}</b><span>{t.per}</span></div>
              <p className="wct-lede">{t.lede}</p>
              <ul className="wct-limits">{t.limits.map(l => <li key={l}>{l}</li>)}</ul>
              <a className="wct-cta" href={ctaHref}>{t.cta}</a>
            </div>
          ))}
        </div>
        <div className="wct-all">
          <h3>Every plan includes</h3>
          <ul>{INCLUDED.map(f => <li key={f}><Check size={16} strokeWidth={2.6} />{f}</li>)}</ul>
        </div>
        <p className="wct-note"><b>No surprise bills.</b> If you use all your minutes in a month, calls ring your cell instead of the AI until the month resets. We never charge overage. Booking needs a connected Google Calendar; texts only go to customers who agreed to receive them.</p>
      </div>
    </section>
  )
}

const CSS = `
.wct{background:#fff;padding:88px 20px;border-top:1px solid #eef0f4}
.wct-in{max-width:1120px;margin:auto}
.wct-eyebrow{color:#ff6b1a;font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.wct h2{font-family:var(--font-display),system-ui;font-size:clamp(30px,4vw,46px);letter-spacing:-.035em;line-height:1.08;margin:10px 0 12px;color:#0d172b}
.wct h2 em{font-style:normal;color:#ff6b1a}
.wct-sub{color:#5b6475;font-size:17px;line-height:1.6;max-width:680px;margin:0 0 34px}
.wct-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:stretch}
.wct-card{border:1px solid #e4e7ec;border-radius:20px;padding:26px 24px;display:flex;flex-direction:column;background:#fff}
.wct-card.on{border:2px solid #ff6b1a;box-shadow:0 18px 50px rgba(255,107,26,.14);background:linear-gradient(180deg,#fff7f2,#fff 40%)}
.wct-badge{align-self:flex-start;font-size:12px;font-weight:700;color:#0d172b;background:#f2f4f7;border-radius:999px;padding:5px 11px}
.wct-card.on .wct-badge{background:#ff6b1a;color:#fff}
.wct-card h3{font-size:20px;margin:16px 0 4px;color:#0d172b}
.wct-price{display:flex;align-items:baseline;gap:4px;margin-bottom:8px}
.wct-price b{font-family:var(--font-display),system-ui;font-size:46px;letter-spacing:-.04em;color:#0d172b;line-height:1}
.wct-price span{color:#5b6475;font-size:15px}
.wct-lede{color:#5b6475;font-size:15px;line-height:1.55;margin:0 0 16px}
.wct-limits{list-style:none;padding:14px 0 0;margin:0 0 22px;border-top:1px solid #eef0f4;display:grid;gap:8px;flex:1}
.wct-limits li{font-size:15px;color:#0d172b;font-weight:600}
.wct-cta{display:block;text-align:center;text-decoration:none;font-weight:700;border-radius:12px;padding:13px 16px;border:1.5px solid #0d172b;color:#0d172b}
.wct-card.on .wct-cta{background:#ff6b1a;border-color:#ff6b1a;color:#fff}
.wct-all{margin-top:26px;border:1px solid #e4e7ec;border-radius:20px;padding:24px;background:#fafbfc}
.wct-all h3{margin:0 0 14px;font-size:17px;color:#0d172b}
.wct-all ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 24px}
.wct-all li{display:flex;gap:9px;align-items:flex-start;font-size:15px;color:#0d172b;line-height:1.4}
.wct-all li svg{color:#00a85f;flex-shrink:0;margin-top:2px}
.wct-note{color:#5b6475;font-size:14px;line-height:1.6;margin:18px 0 0}
.wct-note b{color:#0d172b}
@media (max-width:900px){.wct-grid{grid-template-columns:1fr}.wct-all ul{grid-template-columns:1fr}.wct{padding:64px 16px}}
`
