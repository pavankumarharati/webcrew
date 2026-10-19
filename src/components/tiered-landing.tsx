'use client'

import { useState } from 'react'
import { ArrowRight, Check, CheckCircle2, ChevronDown, Link2, Sparkles, MessageSquareText, Rocket, Building2 } from 'lucide-react'
import BrandMark from './brand-mark'
import { getReferralCode } from '@/lib/referral'

// Layout/feel copied from native.no and lindaria.com (owner's pick): centered serif headline, one input +
// button, a row of real examples, four plain steps, one clear pricing block, plain FAQ rows. Palette = WebCrew
// brand (navy + orange) on warm off-white. Content ideas from the Stitch landing (hero mockup, 4 steps).
// Three-tier landing. Only Tier 1 (a free-to-build website) is live; Tiers 2 and 3
// are "coming soon" with a waitlist so nothing is sold that isn't delivered yet.
// Switch: NEXT_PUBLIC_TIERED_LANDING=true (see lib/features.ts). The other two
// homepages stay in the repo as the rollback path.

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.webcrew.app'
const industries = ['HVAC', 'Plumbers', 'Electricians', 'Roofers', 'Contractors', 'Cleaning', 'Auto services', 'Salons', 'Spas', 'Dentists', 'Home services']
const CONSENT = 'I agree to receive recurring SMS messages from WebCrew about my enquiry, requested demo, and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe or HELP for help. Privacy: https://webcrew.app/privacy. Terms: https://webcrew.app/terms.'

const faqs: [string, string][] = [
  ['Is the website really free to build?', 'Yes. We build it first and send you the link. You pay the one-time $500 only if you want to keep it. No card needed to see it.'],
  ['What is the $49/mo hosting plan?', 'Optional. We host the site on Cloudflare, keep it fast and secure, and handle small updates. You can also take the site and host it yourself.'],
  ['What does the AI sales agent do?', 'It lives on your site and talks with visitors by voice or text — answers questions from your real business info, qualifies the lead, captures contact details and books appointments.'],
  ['When are the AI plans available?', 'Soon. Join the waitlist on the plan you want and we’ll email you first. Waitlist members get founding pricing locked in.'],
  ['I already have a website — can you add the AI to it?', 'That is plan 3. It adds one line of code to your current site, no rebuild. It’s coming soon — join the waitlist.'],
]

type Tier = 'tier2' | 'tier3'

export default function TieredLanding() {
  const [form, setForm] = useState({ name: '', business: '', niche: '', city: '', state: '', phone: '', email: '', mapsLink: '', consent: false })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [wait, setWait] = useState<{ tier: Tier | null; email: string; state: 'idle' | 'sending' | 'sent' | 'error' }>({ tier: null, email: '', state: 'idle' })
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  async function post(body: Record<string, unknown>) {
    const res = await fetch(`${API}/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!res.ok) throw new Error('failed')
  }

  async function submitBuild(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    try {
      await post({
        firstName: form.name.trim().split(' ')[0], lastName: form.name.trim().split(' ').slice(1).join(' '),
        businessName: form.business, businessNiche: form.niche, phone: form.phone, email: form.email,
        city: form.city, state: form.state, googleMapsLink: form.mapsLink || undefined,
        templateStyle: 'auto', // rotate designs — never the same look for neighbouring clients
        service: 'Tier 1 — free website build', message: 'Tier 1: free website build, $500 one-time if they keep it',
        smsConsent: form.consent, consentTimestamp: form.consent ? new Date().toISOString() : undefined,
        consentLanguage: form.consent ? CONSENT : undefined,
        source: 'webcrew.app/tiered-landing', submittedAt: new Date().toISOString(), referredBy: getReferralCode() || undefined,
      })
      setState('sent')
    } catch { setState('error') }
  }

  async function submitWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!wait.tier) return
    setWait(w => ({ ...w, state: 'sending' }))
    try {
      await post({
        firstName: 'Waitlist', businessName: 'Waitlist', businessNiche: 'waitlist', email: wait.email,
        interestOnly: true, // capture only — never triggers a build or an SMS
        service: `WAITLIST: ${wait.tier === 'tier2' ? 'Website + AI sales agent ($99/mo)' : 'AI sales person for existing site ($99/mo)'}`,
        message: `WAITLIST ${wait.tier}`, source: 'webcrew.app/tiered-landing-waitlist', submittedAt: new Date().toISOString(),
      })
      setWait(w => ({ ...w, state: 'sent' }))
    } catch { setWait(w => ({ ...w, state: 'error' })) }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value })
  const [heroName, setHeroName] = useState('')
  function goBuild(e: React.FormEvent) {
    e.preventDefault()
    if (heroName.trim()) setForm(f => ({ ...f, business: heroName.trim() }))
    document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })
  }
  const steps = [
    [Building2, 'Tell us your business', 'Name, trade and city. Two minutes.'],
    [Sparkles, 'We build it overnight', 'A complete, fast, mobile-ready site in its own look.'],
    [MessageSquareText, 'You see it free', 'We send you the link. No card needed.'],
    [Rocket, 'Keep it, or add AI', 'Keep it for $500 once, or add an AI sales agent.'],
  ] as const
  const examples = [['/examples/hvac.jpg', 'Heating & air', 'ArcticFlow'], ['/examples/dental.jpg', 'Dental', 'Bright Smile'], ['/examples/medspa.jpg', 'Med spa', 'Lumière'], ['/examples/roofing.jpg', 'Roofing', 'Summit']]
  // plain function (not a component): a nested component would remount on every keystroke and drop input focus
  const heroForm = () => (
    <form className="tl-pill" onSubmit={goBuild}>
      <Link2 size={16} /><input value={heroName} onChange={e => setHeroName(e.target.value)} placeholder="Your business name" aria-label="Your business name" />
      <button className="tl-go">Build my free website <ArrowRight size={15} /></button>
    </form>
  )

  return (
    <>
      <style>{css}</style>
      <header className="tl-nav"><div className="tl-wrap tl-nav-in">
        <a href="#top" className="tl-logo" aria-label="WebCrew home"><BrandMark size={28} /><span>WebCrew</span></a>
        <nav><a href="#how">How it works</a><a href="#plans">Plans</a><a href="#faq">FAQ</a></nav>
        <a className="tl-link" href="https://admin.webcrew.app/client/login">Log in</a>
        <a className="tl-btn tl-btn-sm" href="#build">Build my website</a>
      </div></header>

      <main id="top">
        <section className="tl-hero"><div className="tl-wrap">
          <h1>A website for your business,<br /><span className="tl-u">built free.</span></h1>
          <p className="tl-sub">See it first. Keep it only if you love it.</p>
          <div className="tl-start"><span className="tl-hand">Start here!</span>{heroForm()}</div>
          <p className="tl-micro"><span><Check size={13} />Free to see</span><span><Check size={13} />No credit card</span><span><Check size={13} />Ready overnight</span></p>
        </div></section>

        <section className="tl-sec tl-examples"><div className="tl-wrap">
          <p className="tl-label">Examples of sites you’ll get</p>
          <div className="tl-ex-row">{examples.map(([src, k, n]) => (
            <figure key={n}><div className="tl-frame"><div className="tl-dots"><i /><i /><i /></div><img src={src} alt={`${n} sample website`} loading="lazy" /></div><figcaption><b>{n}</b> · {k}</figcaption></figure>))}</div>
          <p className="tl-fine">Sample designs. Every site gets its own look and your real business details.</p>
        </div></section>

        <section className="tl-sec" id="how"><div className="tl-wrap">
          <h2 className="tl-h2">How it works</h2>
          <div className="tl-steps">{steps.map(([Icon, t, d], i) => (
            <article key={t}><span className="tl-ico"><Icon size={20} /><b>{i + 1}</b></span><h3>{t}</h3><p>{d}</p></article>))}</div>
        </div></section>

        <section className="tl-sec tl-band" id="plans"><div className="tl-wrap">
          <h2 className="tl-h2">Pick your plan</h2>
          <p className="tl-sub2">Start with the website. Add the AI when you’re ready.</p>
          <div className="tl-tiers">
            <article className="tl-tier tl-tier-live">
              <span className="tl-badge live">Available now</span>
              <h3>Website</h3>
              <p className="tl-price"><strong>$500</strong> one-time</p>
              <p className="tl-note">We build it free. Pay only if you keep it.</p>
              <ul><li><Check size={15} />Custom modern website</li><li><Check size={15} />Mobile-ready, fast, SEO basics</li><li><Check size={15} />Your own look — never a copy</li><li><Check size={15} />Yours to keep or host anywhere</li></ul>
              <p className="tl-opt">Optional hosting + updates (Cloudflare): <b>$49/mo</b></p>
              <a className="tl-btn" href="#build">Build my free website <ArrowRight size={15} /></a>
            </article>
            <article className="tl-tier">
              <span className="tl-badge">Coming soon</span>
              <h3>Website + AI sales agent</h3>
              <p className="tl-price"><strong>$99</strong>/mo</p>
              <p className="tl-note">Hosting included.</p>
              <ul><li><Check size={15} />Everything in Website</li><li><Check size={15} />AI that talks to visitors, voice + text</li><li><Check size={15} />Qualifies leads, books appointments</li><li><Check size={15} />Lead dashboard</li></ul>
              <button className="tl-btn tl-btn-ghost" onClick={() => setWait({ tier: 'tier2', email: wait.email, state: 'idle' })}>Notify me</button>
            </article>
            <article className="tl-tier">
              <span className="tl-badge">Coming soon</span>
              <h3>AI sales person</h3>
              <p className="tl-price"><strong>$99</strong>/mo <small>Starter</small></p>
              <p className="tl-note">For businesses that already have a website.</p>
              <ul><li><Check size={15} />One line added to your site</li><li><Check size={15} />Answers from your real business info</li><li><Check size={15} />Captures leads, books appointments</li><li><Check size={15} />No rebuild, no downtime</li></ul>
              <button className="tl-btn tl-btn-ghost" onClick={() => setWait({ tier: 'tier3', email: wait.email, state: 'idle' })}>Notify me</button>
            </article>
          </div>
          {wait.tier && (
            <div className="tl-wait" id="waitlist">
              {wait.state === 'sent'
                ? <p><CheckCircle2 size={18} /> You’re on the list — we’ll email you the moment it’s ready.</p>
                : <form onSubmit={submitWaitlist}>
                    <label>Email me when <strong>{wait.tier === 'tier2' ? 'Website + AI sales agent' : 'AI sales person'}</strong> opens
                      <span><input type="email" required placeholder="you@business.com" value={wait.email} onChange={e => setWait({ ...wait, email: e.target.value })} /><button className="tl-btn" disabled={wait.state === 'sending'}>{wait.state === 'sending' ? 'Saving…' : 'Join waitlist'}</button></span>
                    </label>
                    {wait.state === 'error' && <p className="tl-err">Couldn’t save that — please try again.</p>}
                  </form>}
            </div>
          )}
        </div></section>

        <section className="tl-sec" id="build"><div className="tl-wrap tl-narrow">
          <h2 className="tl-h2">Get your free website</h2>
          <p className="tl-sub2">Two minutes now, a finished site in your inbox. No card, no obligation.</p>
          {state === 'sent'
            ? <div className="tl-form tl-done"><CheckCircle2 size={28} /><h3>Got it — we’re on it.</h3><p>We’ll build your website and send the link{form.consent ? ' by text and email' : ' by email'}. Usually by tomorrow morning.</p></div>
            : <form className="tl-form" onSubmit={submitBuild}>
                <label>Your name<input required value={form.name} onChange={set('name')} placeholder="First and last name" /></label>
                <label>Business name<input required value={form.business} onChange={set('business')} placeholder="e.g. Tracy Heating & Air" /></label>
                <div className="tl-row"><label>Type of business<select required value={form.niche} onChange={set('niche')}><option value="" disabled>Select…</option>{industries.map(i => <option key={i}>{i}</option>)}</select></label>
                  <label>Phone<input required type="tel" value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000" /></label></div>
                <div className="tl-row"><label>City<input required value={form.city} onChange={set('city')} /></label><label>State<input required maxLength={2} value={form.state} onChange={set('state')} placeholder="CA" /></label></div>
                <label>Email<input required type="email" value={form.email} onChange={set('email')} placeholder="you@business.com" /></label>
                <label>Google Maps link <em>(optional — helps us get it right)</em><input value={form.mapsLink} onChange={set('mapsLink')} placeholder="https://maps.app.goo.gl/…" /></label>
                <label className="tl-consent"><input type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} /><span>Text me my website link and updates. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe. <a href="/privacy" target="_blank" rel="noreferrer">Privacy</a> &amp; <a href="/terms" target="_blank" rel="noreferrer">Terms</a>.</span></label>
                <button className="tl-btn tl-btn-wide" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Build my free website'} <ArrowRight size={15} /></button>
                {state === 'error' && <p className="tl-err">Something went wrong — please try again.</p>}
              </form>}
        </div></section>

        <section className="tl-sec" id="faq"><div className="tl-wrap tl-narrow">
          <h2 className="tl-h2">Frequently asked questions</h2>
          <div className="tl-faq">{faqs.map(([q, a], i) => (
            <button key={q} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
              <span><b>{q}</b>{openFaq === i && <p>{a}</p>}</span><ChevronDown size={18} className={openFaq === i ? 'open' : ''} />
            </button>))}</div>
        </div></section>

        <section className="tl-cta"><div className="tl-wrap tl-cta-in">
          <div><h2>Ready to see your website?</h2><p>Free to see. Pay only if you keep it.</p></div>
          {heroForm()}
        </div></section>
      </main>

      <footer className="tl-foot"><div className="tl-wrap"><span className="tl-logo"><BrandMark size={24} /> WebCrew</span><span>© {new Date().getFullYear()} WebCrew is a product/DBA of Mind Solutions Inc. · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span></div></footer>
    </>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#faf8f4;--ink:#0d172b;--mut:#5d6677;--line:#e7e2d8;--card:#fff;--o:#ff6b1a;--navy:#0d172b}
body{background:var(--bg)}
.tl-nav,main,.tl-foot{font-family:Inter,system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.tl-wrap{width:min(1120px,100% - 2.5rem);margin-inline:auto}.tl-narrow{width:min(680px,100% - 2.5rem)}
.tl-nav{position:sticky;top:0;z-index:50;background:rgba(250,248,244,.88);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.tl-nav-in{display:flex;align-items:center;gap:1.6rem;height:64px}
.tl-logo{display:flex;align-items:center;gap:.55rem;font-weight:700;font-size:1.1rem;color:var(--ink);text-decoration:none;margin-right:auto}
.tl-nav nav{display:flex;gap:1.8rem;position:absolute;left:50%;transform:translateX(-50%)} .tl-nav nav a,.tl-link{color:var(--mut);font-size:.92rem;text-decoration:none} .tl-nav nav a:hover,.tl-link:hover{color:var(--ink)}
@media(max-width:860px){.tl-nav nav,.tl-link{display:none}}
.tl-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;background:var(--navy);color:#fff;border:1px solid var(--navy);padding:.95rem 1.5rem;border-radius:.7rem;font-weight:600;font-size:.95rem;cursor:pointer;text-decoration:none;font-family:inherit;transition:transform .2s,box-shadow .2s}
.tl-btn:hover{transform:translateY(-2px);box-shadow:0 12px 26px -14px rgba(13,23,43,.6)} .tl-btn:disabled{opacity:.6;cursor:wait}
.tl-btn-sm{padding:.6rem 1.05rem;font-size:.86rem} .tl-btn-wide{width:100%} .tl-btn-ghost{background:transparent;color:var(--ink);border-color:#cfc9bb;box-shadow:none} .tl-btn-ghost:hover{border-color:var(--ink);box-shadow:none}
.tl-hero{text-align:center;padding:clamp(3.5rem,8vw,6.5rem) 0 clamp(2.5rem,5vw,4rem)}
.tl-hero h1,.tl-h2,.tl-cta h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;letter-spacing:-.02em;color:var(--ink);margin:0}
.tl-hero h1{font-size:clamp(2.7rem,6.4vw,5rem);line-height:1.02}
.tl-u{position:relative;display:inline-block}.tl-u:after{content:"";position:absolute;left:2%;right:2%;bottom:-.08em;height:.09em;background:var(--o);border-radius:99px}
.tl-sub{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(1.2rem,2.2vw,1.6rem);color:var(--mut);margin:1.4rem 0 0}
.tl-start{position:relative;margin:2.2rem auto 0;max-width:640px}
.tl-hand{position:absolute;left:-4.2rem;top:-1.6rem;font-family:Caveat,cursive;font-weight:700;font-size:1.5rem;color:var(--o);transform:rotate(-8deg)} @media(max-width:820px){.tl-hand{display:none}}
.tl-pill{display:flex;align-items:center;gap:.6rem;background:#fff;border:1px solid var(--line);border-radius:99px;padding:.45rem .45rem .45rem 1.2rem;box-shadow:0 20px 40px -26px rgba(13,23,43,.45);color:var(--mut);text-align:left}
.tl-pill input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;font-size:1rem;color:var(--ink);padding:.6rem .2rem}
.tl-go{display:inline-flex;align-items:center;gap:.45rem;border:0;background:var(--navy);color:#fff;font:inherit;font-weight:600;font-size:.92rem;padding:.8rem 1.2rem;border-radius:99px;cursor:pointer;white-space:nowrap}
@media(max-width:560px){.tl-pill{flex-wrap:wrap;border-radius:1.2rem;padding:.8rem}.tl-go{width:100%;justify-content:center}}
.tl-micro{display:flex;justify-content:center;flex-wrap:wrap;gap:1.4rem;margin:1.1rem 0 0;font-size:.85rem;color:var(--mut)} .tl-micro span{display:inline-flex;align-items:center;gap:.4rem} .tl-micro svg{color:var(--navy)}
.tl-sec{padding:clamp(3rem,6vw,5rem) 0} .tl-band{background:#f3efe7;border-block:1px solid var(--line)}
.tl-h2{font-size:clamp(2rem,4vw,3rem);text-align:center;line-height:1.08} .tl-sub2{text-align:center;color:var(--mut);margin:.9rem 0 0}
.tl-label{text-align:center;font-weight:600;font-size:.92rem;margin:0 0 1.6rem}
.tl-ex-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem} @media(max-width:900px){.tl-ex-row{grid-template-columns:1fr 1fr}} @media(max-width:520px){.tl-ex-row{grid-template-columns:1fr}}
.tl-ex-row figure{margin:0} .tl-frame{background:#fff;border:1px solid var(--line);border-radius:.8rem;overflow:hidden;box-shadow:0 22px 40px -28px rgba(13,23,43,.5);transition:transform .25s} .tl-ex-row figure:hover .tl-frame{transform:translateY(-4px)}
.tl-dots{display:flex;gap:5px;padding:.5rem .7rem;background:#f4f1ea} .tl-dots i{width:7px;height:7px;border-radius:50%;background:#d6d0c2}
.tl-frame img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}
.tl-ex-row figcaption{text-align:center;font-size:.82rem;color:var(--mut);margin-top:.7rem} .tl-ex-row figcaption b{color:var(--ink)}
.tl-fine{text-align:center;color:#8a8f9b;font-size:.8rem;margin:1.2rem 0 0}
.tl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:2.6rem;position:relative} @media(max-width:900px){.tl-steps{grid-template-columns:1fr 1fr}} @media(max-width:520px){.tl-steps{grid-template-columns:1fr}}
.tl-steps article{text-align:center} .tl-ico{position:relative;display:grid;place-items:center;width:54px;height:54px;margin:0 auto 1rem;border-radius:50%;background:#fff;border:1px solid var(--line);color:var(--navy);box-shadow:0 10px 24px -16px rgba(13,23,43,.5)}
.tl-ico b{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:var(--o);color:#fff;font-size:.7rem;display:grid;place-items:center}
.tl-steps h3{margin:0 0 .3rem;font-size:1rem;font-weight:600} .tl-steps p{margin:0;color:var(--mut);font-size:.9rem;line-height:1.55}
.tl-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;margin-top:2.6rem;align-items:stretch} @media(max-width:980px){.tl-tiers{grid-template-columns:1fr;max-width:520px;margin-inline:auto}}
.tl-tier{background:var(--card);border:1px solid var(--line);border-radius:1.1rem;padding:1.7rem;display:flex;flex-direction:column;gap:.5rem}
.tl-tier-live{border:2px solid var(--navy);box-shadow:0 30px 50px -34px rgba(13,23,43,.5)}
.tl-badge{align-self:flex-start;font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.28rem .65rem;border-radius:99px;background:#efeadf;color:var(--mut)} .tl-badge.live{background:var(--navy);color:#fff}
.tl-tier h3{margin:.5rem 0 0;font-size:1.15rem} .tl-price{margin:0;color:var(--mut)} .tl-price strong{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:3rem;color:var(--ink);letter-spacing:-.02em} .tl-price small{font-size:.75rem;color:var(--o);font-weight:700}
.tl-note{margin:0;color:#7a8090;font-size:.9rem}
.tl-tier ul{list-style:none;padding:0;margin:1rem 0;display:grid;gap:.55rem;flex:1} .tl-tier li{display:flex;gap:.55rem;color:#2c3548;font-size:.9rem} .tl-tier li svg{color:var(--o);flex:none;margin-top:.2rem}
.tl-opt{margin:0 0 .8rem;font-size:.86rem;color:var(--mut);background:#f6f3ec;border-radius:.6rem;padding:.65rem .85rem}
.tl-wait{margin-top:1.3rem;background:#fff;border:1px solid var(--line);border-radius:1rem;padding:1.3rem;max-width:620px;margin-inline:auto} .tl-wait label{display:grid;gap:.7rem;font-size:.93rem} .tl-wait label>span{display:flex;gap:.7rem;flex-wrap:wrap} .tl-wait input{flex:1;min-width:200px}
.tl-wait p{display:flex;gap:.6rem;align-items:center;margin:0;font-weight:600}
.tl-form{background:#fff;border:1px solid var(--line);border-radius:1.2rem;padding:clamp(1.3rem,3vw,2rem);display:grid;gap:1rem;margin-top:2rem;box-shadow:0 30px 50px -36px rgba(13,23,43,.4)}
.tl-form label{display:grid;gap:.4rem;font-size:.85rem;font-weight:600} .tl-form label em{font-weight:400;color:#8a8f9b;font-style:normal}
.tl-form input,.tl-form select,.tl-wait input{font:inherit;color:var(--ink);background:#faf8f4;border:1px solid var(--line);border-radius:.6rem;padding:.8rem .9rem;width:100%}
.tl-form input:focus,.tl-form select:focus,.tl-wait input:focus{outline:2px solid var(--o);outline-offset:1px}
.tl-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem} @media(max-width:520px){.tl-row{grid-template-columns:1fr}}
.tl-consent{grid-template-columns:auto 1fr!important;align-items:start;gap:.7rem!important;font-weight:400!important;font-size:.78rem!important;color:#7a8090!important} .tl-consent input{width:auto;margin-top:.2rem} .tl-consent a{color:var(--ink)}
.tl-done h3{margin:.4rem 0} .tl-done svg{color:var(--o)} .tl-err{color:#c0392b;margin:0;font-size:.9rem}
.tl-faq{margin-top:2rem;display:grid;gap:.7rem}
.tl-faq button{display:flex;justify-content:space-between;gap:1rem;width:100%;text-align:left;background:#fff;border:1px solid var(--line);border-radius:.9rem;padding:1.1rem 1.3rem;cursor:pointer;font:inherit;color:var(--ink)}
.tl-faq b{font-weight:500} .tl-faq p{margin:.6rem 0 0;color:var(--mut);font-size:.95rem} .tl-faq svg{flex:none;transition:transform .2s;color:#8a8f9b} .tl-faq svg.open{transform:rotate(180deg)}
.tl-cta{background:var(--navy);color:#fff;padding:clamp(2rem,4vw,3rem) 0;margin:0 0 0}
.tl-cta-in{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center} @media(max-width:860px){.tl-cta-in{grid-template-columns:1fr}}
.tl-cta h2{color:#fff;font-size:clamp(1.8rem,3.2vw,2.5rem);text-align:left} .tl-cta p{margin:.5rem 0 0;color:#aab3c6}
.tl-cta .tl-pill{border-color:transparent} .tl-cta .tl-go{background:var(--o)}
.tl-foot{background:var(--navy);color:#aab3c6;border-top:1px solid #1d2a47;padding:1.6rem 0;font-size:.86rem} .tl-foot .tl-wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem} .tl-foot a{color:inherit} .tl-foot .tl-logo{color:#fff;margin:0;font-size:1rem}
`
