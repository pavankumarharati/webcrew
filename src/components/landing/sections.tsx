'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight, CalendarCheck, Check, MessageSquareText, PhoneCall, RefreshCw, ShieldCheck, Star,
} from 'lucide-react'

// Presentational sections for the "paste your URL" landing. State/fetch logic stays in
// website-preview-landing.tsx. Rule for every claim here: only what the product does today.
// Anything that looks like UI with names/numbers is labelled "Example".

export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.webcrew.app'

/* ── Hero visual: a real WebCrew-built site + an example AI chat ───────────── */
export function HeroVisual() {
  return (
    <div className="lp-hero-visual" aria-hidden="true">
      <div className="lp-browser">
        <div className="lp-browser-bar"><i /><i /><i /><span>Your free demo · built in about a minute</span></div>
        <img src="/product/demo-preview.jpg" alt="" width={1400} height={875} />
      </div>
      <div className="lp-chat">
        <div className="lp-chat-head"><span className="lp-dot" /> AI SalesPerson <em>Example</em></div>
        <p className="lp-bubble them">My AC stopped blowing cold. Can someone come tomorrow?</p>
        <p className="lp-bubble me">Sorry about that! I have 9:00 or 1:30 tomorrow. Which works?</p>
        <p className="lp-bubble them">1:30 please.</p>
        <p className="lp-bubble me ok"><Check size={14} /> Booked for 1:30. You&rsquo;ll get a text confirmation.</p>
      </div>
    </div>
  )
}

/* ── How a missed call becomes a booking (3 steps, with images) ─────────────── */
export function HowItWorks() {
  return (
    <section className="lp-section" id="how-it-works">
      <p className="lp-eyebrow">How it works</p>
      <h2>A customer reaches out. <em>Your AI handles it.</em></h2>
      <p className="lp-lede">Phone call or website visit, day or night. You stay on the job.</p>
      <div className="lp-steps">
        <article>
          <figure><img src="/product/scene-ringing.jpg" alt="A phone ringing on a kitchen counter at night" loading="lazy" /></figure>
          <span className="lp-step-n">1</span>
          <h3>Customer calls or visits your site</h3>
          <p>9pm, Sunday, or while you&rsquo;re up in an attic. Your AI answers in your business name, right away.</p>
        </article>
        <article>
          <figure className="lp-ui-fig">
            <div className="lp-ui-card">
              <div className="lp-ui-row"><PhoneCall size={16} /> <strong>Incoming call</strong><em>Example</em></div>
              <div className="lp-ui-line">Asks what&rsquo;s wrong and where they are</div>
              <div className="lp-ui-line">Checks your Google Calendar</div>
              <div className="lp-ui-line ok"><CalendarCheck size={15} /> Books Tue 1:30 PM</div>
              <div className="lp-ui-line">Emergency? Rings your cell</div>
            </div>
          </figure>
          <span className="lp-step-n">2</span>
          <h3>It answers, qualifies and books</h3>
          <p>Knows your services, hours and area. Books into your calendar, or takes a clear message.</p>
        </article>
        <article>
          <figure><img src="/product/scene-on-job.jpg" alt="A technician reading a booking notification on his phone" loading="lazy" /></figure>
          <span className="lp-step-n">3</span>
          <h3>You get the summary</h3>
          <p>A text and email with who called, what they need, and what was booked. One tap to call back.</p>
        </article>
      </div>
    </section>
  )
}

/* ── HVAC call types it handles (true today; see client-tools.ts rules) ─────── */
const HVAC_CALLS: Array<[string, string, string]> = [
  ['No heat / no AC', 'Urgent job', 'Asks what failed and where. Rings your cell if you set a transfer number, otherwise sends you an urgent message right away.'],
  ['Tune-ups & maintenance', 'Booked', 'Offers real open times from your Google Calendar and books the visit. Reminder goes out before the day.'],
  ['“How much do you charge?”', 'Your prices only', 'Answers with the fees you give it, like your diagnostic fee. Never invents a price.'],
  ['Outside your area', 'No wasted trips', 'Asks for the city or ZIP. If you don’t serve it, it takes a message instead of booking.'],
  ['After hours & weekends', 'Answered', '9pm or Sunday, it answers in your business name. You get a summary of every real customer call.'],
  ['Website visitors', 'Lead captured', 'The same AI talks and chats on your website, so a quote request at midnight still reaches you.'],
]

export function HvacCalls() {
  return (
    <section className="lp-section" id="hvac">
      <p className="lp-eyebrow">Built for HVAC</p>
      <h2>It knows the calls <em>your shop actually gets.</em></h2>
      <p className="lp-lede">Set up for heating and cooling from day one. Plumbers: the same rules work for no-water and leak calls.</p>
      <div className="lp-hvac">
        {HVAC_CALLS.map(([title, tag, body]) => (
          <article key={title}>
            <div className="lp-hvac-head"><h3>{title}</h3><span>{tag}</span></div>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── The four things you get ───────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: PhoneCall, title: 'AI phone receptionist', plan: '$99 plan',
    body: 'Forward your business line. It answers every call 24/7 and rings your cell when a caller needs you.',
    ui: <><div className="lp-mini-row"><strong>Call summary</strong><em>Example</em></div><p>Maria G. · AC not cooling · Tracy, CA</p><p className="ok">Booked Tue 1:30 PM</p></>,
  },
  {
    icon: MessageSquareText, title: 'Website that talks', plan: 'Both plans',
    body: 'A chat and voice assistant on your site that answers questions and captures the lead.',
    ui: <><div className="lp-mini-row"><strong>Website chat</strong><em>Example</em></div><p>&ldquo;Do you do furnace tune-ups?&rdquo;</p><p className="ok">Yes. Want a time this week?</p></>,
  },
  {
    icon: RefreshCw, title: 'Follow-ups', plan: '$99 plan',
    body: 'Appointment reminders, and a nudge on day 3 and day 10 to leads who didn’t book.',
    ui: <><div className="lp-mini-row"><strong>Reminder</strong><em>Example</em></div><p>Your visit is tomorrow at 1:30 PM.</p><p>Reply C to confirm, R to reschedule.</p></>,
  },
  {
    icon: Star, title: 'Review requests', plan: '$99 plan',
    body: 'After each visit, every customer gets a polite ask with your Google review link.',
    ui: <><div className="lp-mini-row"><strong>Email</strong><em>Example</em></div><p>Thanks for choosing us!</p><p className="ok">★★★★★ Leave a review</p></>,
  },
]

export function Pillars() {
  return (
    <section className="lp-section lp-tint" id="features">
      <p className="lp-eyebrow">What you get</p>
      <h2>One AI front office. <em>Four jobs done.</em></h2>
      <div className="lp-pillars">
        {PILLARS.map(p => (
          <article key={p.title}>
            <div className="lp-mini">{p.ui}</div>
            <div className="lp-pillar-head"><p.icon size={18} /><h3>{p.title}</h3><span>{p.plan}</span></div>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── Real sites ─────────────────────────────────────────────────────────────── */
const EXAMPLES = [
  ['/examples/hvac.jpg', 'HVAC'], ['/examples/roofing.jpg', 'Roofing'],
]
export function Examples() {
  return (
    <section className="lp-section" id="examples">
      <p className="lp-eyebrow">Websites we build</p>
      <h2>Need a new site? <em>It comes with the AI built in.</em></h2>
      <p className="lp-lede">Sample designs from our templates. Yours uses your name, services, photos and reviews.</p>
      <div className="lp-examples">
        {EXAMPLES.map(([src, label]) => (
          <figure key={src}><img src={src} alt={`Sample ${label} website design`} loading="lazy" /><figcaption>{label}</figcaption></figure>
        ))}
      </div>
    </section>
  )
}

/* ── Plans ─────────────────────────────────────────────────────────────────── */
export type PlanChoice = 'site_ai' | 'founding' | 'standard'

export function useFoundingSeats(): number | null {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    fetch(`${ADMIN_URL}/api/public/checkout`).then(r => r.json()).then(d => {
      if (typeof d?.foundingSeatsLeft === 'number') setLeft(d.foundingSeatsLeft)
    }).catch(() => {})
  }, [])
  return left
}

export function Plans({ seatsLeft, onPick }: { seatsLeft: number | null; onPick: (p: PlanChoice) => void }) {
  const foundingOpen = seatsLeft === null || seatsLeft > 0
  return (
    <section className="lp-section" id="plans">
      <p className="lp-eyebrow">Pricing</p>
      <h2>Try it free for 30 days. <em>$0 setup.</em></h2>
      <p className="lp-lede">See your demo first. Card needed to go live; nothing is charged for 30 days. Cancel anytime.</p>
      <div className="lp-plans">
        <article className="lp-plan">
          <h3>Website + AI SalesPerson</h3>
          <div className="lp-price"><strong>$49</strong>/mo</div>
          <p className="lp-plan-sub">For owners who want their website to sell.</p>
          <ul>
            <li><Check size={16} /> AI chat + voice on your website</li>
            <li><Check size={16} /> 60 AI minutes a month</li>
            <li><Check size={16} /> Every lead texted and emailed to you</li>
            <li><Check size={16} /> New website if you need one</li>
            <li className="no">No phone line</li>
          </ul>
          <button type="button" className="lp-btn ghost" onClick={() => onPick('site_ai')}>Start with $49 <ArrowRight size={16} /></button>
        </article>
        <article className="lp-plan featured">
          <div className="lp-badge">{foundingOpen ? (seatsLeft !== null ? `Founding 10 · ${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} left` : 'Founding 10') : 'Most popular'}</div>
          <h3>Full AI Front Office</h3>
          <div className="lp-price">{foundingOpen ? <><strong>$99</strong>/mo <s>$149</s></> : <><strong>$149</strong>/mo</>}</div>
          <p className="lp-plan-sub">{foundingOpen ? 'Founding price locked for as long as you stay.' : 'Founding seats are full.'}</p>
          <ul>
            <li><Check size={16} /> Everything in $49</li>
            <li><Check size={16} /> AI answers your phone 24/7</li>
            <li><Check size={16} /> Books into your Google Calendar</li>
            <li><Check size={16} /> Reminders, follow-ups, review requests</li>
            <li><Check size={16} /> {foundingOpen ? '250' : '500'} AI minutes a month</li>
          </ul>
          <button type="button" className="lp-btn" onClick={() => onPick(foundingOpen ? 'founding' : 'standard')}>Start free trial <ArrowRight size={16} /></button>
        </article>
      </div>
      <p className="lp-plan-note"><ShieldCheck size={16} /> No surprise charges: if you use all your minutes, calls ring your cell. Several locations or heavy call volume? <a href="mailto:hello@webcrew.app">Ask for a custom quote</a>.</p>
    </section>
  )
}

/* ── Shared styles ─────────────────────────────────────────────────────────── */
export function LandingStyles() {
  return <style>{`
    .lp-section{max-width:1180px;margin:0 auto;padding:96px 24px;text-align:center}
    .lp-tint{max-width:none;background:#f5f6f8}.lp-tint>*{max-width:1132px;margin-left:auto;margin-right:auto}
    .lp-eyebrow{color:var(--wc-orange);font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin:0 0 14px}
    .lp-section h2{font-family:var(--font-display,inherit);font-size:clamp(30px,4vw,46px);line-height:1.08;letter-spacing:-.02em;color:var(--wc-navy);margin:0 auto 14px;max-width:760px}
    .lp-section h2 em{font-style:normal;color:var(--wc-orange)}
    .lp-lede{color:#5b6475;font-size:17px;line-height:1.6;max-width:620px;margin:0 auto 48px}
    .lp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;text-align:left}
    .lp-steps article{position:relative}
    .lp-steps figure{margin:0 0 20px;aspect-ratio:16/10;border-radius:18px;overflow:hidden;background:#eef0f4}
    .lp-steps img{width:100%;height:100%;object-fit:cover;display:block}
    .lp-step-n{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--wc-navy);color:#fff;font-weight:800;font-size:13px;margin-bottom:10px}
    .lp-steps h3,.lp-pillars h3,.lp-plan h3{color:var(--wc-navy);font-size:19px;margin:0 0 8px}
    .lp-steps p,.lp-pillars p{color:#5b6475;font-size:15px;line-height:1.6;margin:0}
    .lp-ui-fig{display:grid;place-items:center;background:linear-gradient(135deg,#0d172b,#1d2b4a)!important}
    .lp-ui-card{background:#fff;border-radius:14px;padding:16px 18px;width:78%;box-shadow:0 20px 50px rgba(0,0,0,.3);font-size:13.5px;color:#273042}
    .lp-ui-row{display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid #eef0f4;margin-bottom:8px;color:var(--wc-navy)}
    .lp-ui-row em,.lp-mini-row em,.lp-chat-head em{margin-left:auto;font-style:normal;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#98a1b2}
    .lp-ui-line{padding:5px 0;display:flex;align-items:center;gap:6px}.lp-ui-line:before{content:'';width:6px;height:6px;border-radius:50%;background:#c7ccd6;flex:none}
    .lp-ui-line.ok{color:#0f8a4b;font-weight:700}.lp-ui-line.ok:before{display:none}
    .lp-pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:left;margin-top:40px}
    .lp-pillars article{background:#fff;border:1px solid #e6e8ee;border-radius:18px;padding:18px}
    .lp-mini{background:#f5f6f8;border-radius:12px;padding:12px 14px;margin-bottom:16px;font-size:13px;min-height:96px}
    .lp-mini p{margin:4px 0 0!important;color:#273042!important;font-size:13px!important}.lp-mini .ok{color:#0f8a4b!important;font-weight:700}
    .lp-mini-row{display:flex;align-items:center;color:var(--wc-navy)}
    .lp-pillar-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;color:var(--wc-orange)}.lp-pillar-head h3{margin:0;font-size:17px}
    .lp-pillar-head span{margin-left:auto;font-size:11px;font-weight:700;color:#5b6475;background:#eef0f4;border-radius:99px;padding:3px 8px}
.lp-hvac{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;text-align:left}
    .lp-hvac article{background:#fff;border:1px solid #e6e8ee;border-radius:18px;padding:20px}
    .lp-hvac-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}.lp-hvac-head h3{margin:0;color:var(--wc-navy);font-size:17px}
    .lp-hvac-head span{margin-left:auto;font-size:11px;font-weight:800;color:#0f8a4b;background:#e9f8f0;border-radius:99px;padding:3px 9px}
    .lp-hvac p{color:#5b6475;font-size:15px;line-height:1.6;margin:0}
    .lp-examples{display:grid;grid-template-columns:repeat(2,minmax(0,520px));justify-content:center;gap:24px}
    .lp-examples figure{margin:0;border-radius:14px;overflow:hidden;border:1px solid #e6e8ee;background:#fff;box-shadow:0 12px 30px rgba(13,23,43,.08)}
    .lp-examples img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top center;display:block}
    .lp-examples figcaption{padding:10px;font-weight:700;font-size:14px;color:var(--wc-navy)}
    .lp-plans{display:grid;grid-template-columns:repeat(2,minmax(0,380px));justify-content:center;gap:24px;text-align:left}
    .lp-plan{position:relative;background:#fff;border:1px solid #e1e4ea;border-radius:22px;padding:30px}
    .lp-plan.featured{border:2px solid var(--wc-orange);box-shadow:0 24px 60px rgba(255,107,26,.15)}
    .lp-badge{position:absolute;top:-13px;left:30px;background:var(--wc-orange);color:#fff;font-size:12px;font-weight:800;padding:5px 12px;border-radius:99px}
    .lp-price{color:#5b6475;margin:6px 0 4px}.lp-price strong{font-size:44px;color:var(--wc-navy);letter-spacing:-.02em}.lp-price s{margin-left:8px;color:#98a1b2}
    .lp-plan-sub{color:#5b6475;font-size:14px;margin:0 0 18px}
    .lp-plan ul{list-style:none;padding:0;margin:0 0 24px;display:grid;gap:10px}
    .lp-plan li{display:flex;gap:8px;align-items:center;color:#273042;font-size:15px}.lp-plan li svg{color:#0f8a4b;flex:none}
    .lp-plan li.no{color:#98a1b2;padding-left:24px;text-decoration:line-through}
    .lp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px 18px;border-radius:12px;border:0;background:var(--wc-orange);color:#fff;font-weight:800;font-size:15px;cursor:pointer}
    .lp-btn.ghost{background:#fff;color:var(--wc-navy);border:1.5px solid var(--wc-navy)}
    .lp-btn:disabled{opacity:.6;cursor:wait}
    .lp-plan-note{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;color:#5b6475;font-size:14px;margin-top:28px}.lp-plan-note a{color:var(--wc-navy);font-weight:700}
    .lp-hero-visual{position:relative;padding:10px 40px 40px 0}
    .lp-browser{border-radius:14px;overflow:hidden;box-shadow:0 30px 80px rgba(13,23,43,.2);border:1px solid #e1e4ea;background:#fff}
    .lp-browser-bar{display:flex;align-items:center;gap:6px;padding:10px 12px;background:#f5f6f8;border-bottom:1px solid #e6e8ee}
    .lp-browser-bar i{width:9px;height:9px;border-radius:50%;background:#d6d9e0}.lp-browser-bar span{margin-left:10px;font-size:11px;color:#98a1b2}
    .lp-browser img{width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;display:block}
    .lp-chat{position:absolute;right:0;bottom:0;width:290px;background:#fff;border-radius:18px;padding:14px;box-shadow:0 24px 60px rgba(13,23,43,.25);border:1px solid #e6e8ee;text-align:left}
    .lp-chat-head{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:var(--wc-navy);margin-bottom:10px}
    .lp-dot{width:8px;height:8px;border-radius:50%;background:#22c55e}
    .lp-bubble{margin:6px 0;padding:8px 11px;border-radius:12px;font-size:12.5px;line-height:1.45;max-width:88%}
    .lp-bubble.them{background:#f1f3f6;color:#273042}.lp-bubble.me{background:var(--wc-navy);color:#fff;margin-left:auto}
    .lp-bubble.ok{display:flex;gap:6px;align-items:flex-start;background:#e9f8f0;color:#0f6b3b}
    .lp-golive{max-width:760px;margin:0 auto;background:#fff;border:2px solid var(--wc-orange);border-radius:22px;padding:28px;text-align:left}
    .lp-golive h3{margin:0 0 6px;color:var(--wc-navy);font-size:22px}.lp-golive>p{color:#5b6475;margin:0 0 18px}
    .lp-plan-toggle{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
    .lp-plan-toggle button{border:1.5px solid #e1e4ea;background:#fff;border-radius:12px;padding:12px;text-align:left;cursor:pointer;color:#273042}
    .lp-plan-toggle button strong{display:block;color:var(--wc-navy)}.lp-plan-toggle button.on{border-color:var(--wc-orange);background:#fff6f0}
    .lp-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .lp-fields label{display:grid;gap:5px;font-size:13px;font-weight:700;color:#273042}
    .lp-fields input{border:1.5px solid #e1e4ea;border-radius:10px;padding:12px;font-size:15px}
    .lp-consent{display:flex;gap:10px;font-size:12px;line-height:1.5;color:#5b6475;margin:6px 0 16px}.lp-consent a{color:inherit}
    .lp-err{color:#b42318;font-size:14px;margin:0 0 12px}
    .lp-fine{color:#98a1b2;font-size:12px;text-align:center;margin:10px 0 0}
    @media(max-width:1000px){.lp-pillars,.lp-hvac{grid-template-columns:1fr 1fr}}
    @media(max-width:760px){.lp-section{padding:64px 16px}.lp-steps,.lp-plans,.lp-fields,.lp-plan-toggle,.lp-examples,.lp-hvac{grid-template-columns:1fr}.lp-pillars{grid-template-columns:1fr}.lp-hero-visual{padding:0 0 60px}.lp-chat{width:240px;right:-4px}}
  `}</style>
}

