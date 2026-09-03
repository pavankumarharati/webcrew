import { CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react'
import BrandMark from './brand-mark'

const AI_RECEPTION_PHONE = '+19182555151'

export type NicheContent = {
  slug: string
  formValue: string
  label: string
  /** lowercase-safe adjective form, e.g. "HVAC" stays "HVAC", "Roofing" becomes "roofing" */
  adj: string
  headline: React.ReactNode
  sub: string
  emergencyLabel: string
  triage: { title: string; body: string }[]
  faq: [string, string][]
}

export default function NicheLanding({ n }: { n: NicheContent }) {
  const ctaHref = `/#lead-form?niche=${encodeURIComponent(n.formValue)}`
  return (
    <div className="wcn-page">
      <nav className="wcn-nav">
        <a href="/" className="wcn-logo" aria-label="WebCrew home"><BrandMark size={30} />WebCrew</a>
        <a href="/" className="wcn-back">← All industries</a>
      </nav>

      <main>
        <section className="wcn-hero">
          <div className="wcn-pill"><ShieldCheck size={13} /> Built for {n.label}</div>
          <h1>{n.headline}</h1>
          <p>{n.sub}</p>
          <div className="wcn-actions">
            <a className="wcn-cta" href={ctaHref}><span>See it for my {n.adj} business</span><ArrowRight size={16} strokeWidth={2.5} /></a>
            <a className="wcn-call" href={`tel:${AI_RECEPTION_PHONE}`}><PhoneCall size={14} /> Call the live AI: <strong>(918) 255-5151</strong></a>
          </div>
          <small>$0 setup fee · 2-week free trial · no credit card</small>
        </section>

        <section className="wcn-triage">
          <div className="wcn-eyebrow"><span />{n.emergencyLabel}</div>
          <h2>It knows the difference between a question and a job walking away.</h2>
          <div className="wcn-triage-grid">
            {n.triage.map(t => (
              <article key={t.title}><CheckCircle2 /><h3>{t.title}</h3><p>{t.body}</p></article>
            ))}
          </div>
        </section>

        <section className="wcn-included">
          <h2>Same flat plan as every WebCrew client.</h2>
          <ul>
            <li><CheckCircle2 /><span>AI receptionist answers every call 24/7 — trained on {n.adj} triage language, not generic scripts</span></li>
            <li><CheckCircle2 /><span>Custom website built overnight, on your own domain</span></li>
            <li><CheckCircle2 /><span>Call transcript + summary sent to you after every call</span></li>
            <li><CheckCircle2 /><span>Missed-call text-back and automatic day-3/day-10 follow-up</span></li>
            <li><CheckCircle2 /><span>Weekly Google Business Profile posts and review replies</span></li>
            <li><CheckCircle2 /><span>One flat price — $0 setup, 2-week free trial, then $299/mo</span></li>
          </ul>
        </section>

        <section className="wcn-faq">
          <h2>Questions {n.adj} owners actually ask</h2>
          <div className="wcn-faq-list">
            {n.faq.map(([q, a]) => (
              <div key={q}><b>{q}</b><p>{a}</p></div>
            ))}
          </div>
        </section>

        <section className="wcn-final">
          <div>
            <h2>Stop losing {n.adj} jobs to voicemail.</h2>
            <p>Same setup as every WebCrew client — tell us about your business, WebCrew builds your AI front office overnight.</p>
            <a className="wcn-cta light" href={ctaHref}><span>Get my WebCrew plan</span><ArrowRight size={16} strokeWidth={2.5} /></a>
          </div>
        </section>
      </main>

      <footer className="wcn-footer">
        <a href="/" className="wcn-logo"><BrandMark size={26} />WebCrew</a>
        <p>AI front office for local businesses.</p>
        <div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@webcrew.app">Contact</a></div>
      </footer>

      <style>{`
        :root{--wcn-navy:#0d172b;--wcn-navy2:#172238;--wcn-orange:#ff6b1a;--wcn-bg:#f6f7f9;--wcn-ink:#10182b;--wcn-muted:#667085;--wcn-line:#e5e8ee}
        .wcn-page{background:var(--wcn-bg);color:var(--wcn-ink);font-family:var(--font-body,system-ui)}
        .wcn-page h1,.wcn-page h2,.wcn-page h3,.wcn-page b,.wcn-page strong,.wcn-logo{font-family:var(--font-display,system-ui)}
        .wcn-page em{font-style:normal;color:var(--wcn-orange)}
        .wcn-nav{max-width:1100px;margin:auto;padding:26px 24px;display:flex;align-items:center;justify-content:space-between}
        .wcn-logo{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--wcn-ink);font-size:17px;font-weight:800}
        .wcn-back{color:var(--wcn-muted);text-decoration:none;font-size:13px;font-weight:600}
        .wcn-back:hover{color:var(--wcn-orange)}
        .wcn-hero{max-width:760px;margin:0 auto;padding:40px 24px 70px;text-align:center}
        .wcn-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid #ffd6be;background:#fff4ed;border-radius:99px;color:#a84308;text-transform:uppercase;letter-spacing:.07em;font-size:10px;font-weight:800;margin-bottom:22px}
        .wcn-hero h1{font-size:clamp(32px,5vw,50px);line-height:1.08;letter-spacing:-.04em;margin-bottom:18px}
        .wcn-hero p{font-size:16px;line-height:1.7;color:var(--wcn-muted);max-width:600px;margin:0 auto}
        .wcn-actions{display:flex;flex-direction:column;align-items:center;gap:16px;margin:30px 0 12px}
        .wcn-cta{min-height:48px;padding:0 24px;border-radius:9px;background:var(--wcn-orange);color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:10px;font-family:var(--font-display,system-ui);font-size:14px;font-weight:800;box-shadow:0 10px 28px rgba(255,107,26,.22)}
        .wcn-cta.light{background:#fff;color:var(--wcn-navy)}
        .wcn-call{display:flex;align-items:center;gap:6px;color:var(--wcn-ink);font-weight:700;text-decoration:none;font-size:13px}
        .wcn-call svg{color:var(--wcn-orange)}
        .wcn-hero>small{color:#98a2b3;font-size:11px}
        .wcn-triage{max-width:1100px;margin:auto;padding:70px 24px;background:#fff;border-radius:20px}
        .wcn-eyebrow{display:flex;align-items:center;gap:9px;justify-content:center;color:var(--wcn-orange);text-transform:uppercase;font-size:10px;letter-spacing:.15em;font-weight:800;margin-bottom:16px}
        .wcn-eyebrow span{width:20px;height:2px;background:currentColor}
        .wcn-triage>h2{text-align:center;max-width:700px;margin:0 auto 44px;font-size:clamp(24px,3vw,34px);line-height:1.2;letter-spacing:-.03em}
        .wcn-triage-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .wcn-triage-grid article{padding:24px;border:1px solid var(--wcn-line);border-radius:14px;background:var(--wcn-bg)}
        .wcn-triage-grid svg{width:20px;color:#12b76a;margin-bottom:14px}
        .wcn-triage-grid h3{font-size:15px;margin-bottom:8px}
        .wcn-triage-grid p{font-size:12.5px;line-height:1.65;color:var(--wcn-muted)}
        .wcn-included{max-width:820px;margin:auto;padding:80px 24px}
        .wcn-included h2{text-align:center;font-size:clamp(24px,3vw,32px);letter-spacing:-.03em;margin-bottom:36px}
        .wcn-included ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}
        .wcn-included li{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;border:1px solid var(--wcn-line);border-radius:12px;background:#fff}
        .wcn-included svg{width:17px;flex:0 0 17px;color:#12b76a;margin-top:2px}
        .wcn-included span{font-size:13px;font-weight:600;line-height:1.5}
        .wcn-faq{max-width:760px;margin:auto;padding:20px 24px 90px}
        .wcn-faq>h2{text-align:center;font-size:clamp(22px,3vw,30px);letter-spacing:-.03em;margin-bottom:34px}
        .wcn-faq-list{display:grid;gap:10px}
        .wcn-faq-list div{padding:18px 20px;border:1px solid var(--wcn-line);border-radius:12px;background:#fff}
        .wcn-faq-list b{font-size:13px;display:block;margin-bottom:8px}
        .wcn-faq-list p{font-size:12.5px;line-height:1.65;color:var(--wcn-muted);margin:0}
        .wcn-final{background:var(--wcn-navy);color:#fff;padding:70px 24px;text-align:center;border-radius:20px;max-width:1100px;margin:0 auto 40px}
        .wcn-final h2{font-size:clamp(26px,4vw,38px);letter-spacing:-.03em;margin-bottom:14px}
        .wcn-final p{color:#aab3c3;font-size:14px;line-height:1.7;max-width:520px;margin:0 auto 26px}
        .wcn-footer{max-width:1100px;margin:auto;padding:30px 24px 60px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
        .wcn-footer p{font-size:11px;color:var(--wcn-muted);margin:0}
        .wcn-footer>div{margin-left:auto;display:flex;gap:20px}
        .wcn-footer a{color:var(--wcn-muted);text-decoration:none;font-size:12px}
        @media(max-width:720px){.wcn-triage-grid{grid-template-columns:1fr}.wcn-nav{padding:20px}.wcn-hero{padding:24px 20px 50px}}
      `}</style>
    </div>
  )
}
