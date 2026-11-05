'use client'

/**
 * Landing v4 — one offer, light editorial look (2026-11-05).
 * Offer: Founding 10 at $99/mo (then $149): AI Reception for the phone + a rebuilt website with an AI
 * salesperson. The free preview (paste your website → rebuilt site + live AI) is the hook.
 * Demo/rebuild/checkout logic is the shared hook in ../landing-v3/use-demo-funnel.ts; only the page differs.
 * Every claim here must match what the product does today (see CLAUDE.md promise audit).
 */
import { useEffect, useRef, useState } from 'react'
import { Fraunces, Instrument_Sans } from 'next/font/google'
import {
  ArrowRight, ArrowUpRight, CalendarCheck, Check, CheckCircle2, ChevronDown, Globe, Loader2, Mail,
  MessageSquareText, PhoneCall, PhoneIncoming, ShieldCheck, X,
} from 'lucide-react'
import BrandMark from '../brand-mark'
import { useDemoFunnel, RECEPTION_URL, STAGE_COPY, STAGE_ORDER, sourceFilled, type DemoFunnel, type Stage } from '../landing-v3/use-demo-funnel'
import { L4Styles } from './styles'

const display = Fraunces({ subsets: ['latin'], variable: '--l4-display', axes: ['opsz', 'SOFT'], display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--l4-body', display: 'swap' })

const PHONE = '+14156873555'
const PHONE_LABEL = '(415) 687-3555'

const INCLUDED: Array<[string, string]> = [
  ['AI Reception on your phone line', 'Answers every call, day and night. Forward your business number when you miss a call, or all the time.'],
  ['Books jobs into your Google Calendar', 'Offers real open times from your calendar and books the visit. Customers can text to confirm, reschedule or cancel.'],
  ['A new website with an AI salesperson', 'Rebuilt from your current site, with your services, photos and reviews. Visitors can type or talk to it.'],
  ['Every lead sent to you', 'Name, number and what they need, by text and email, the moment the call or chat ends. Urgent calls are flagged.'],
  ['Follow-ups and review requests', 'Reminders before appointments, follow-up emails to leads who did not book, and review requests after the job.'],
  ['250 AI minutes a month', 'If you ever use them all, calls ring your cell instead. No surprise charges.'],
]

const FAQS: Array<[string, string]> = [
  ['Is the preview really free?', 'Yes. Paste your website and we build the preview at no cost, with no card. You only pay if you decide to go live.'],
  ['What exactly do I pay?', '$99 a month for our first 10 HVAC and home-service companies, locked for as long as you stay. After those 10 seats it is $149 a month. Setup is $0 and the first 30 days are free. A card is needed to start the trial; you can cancel any time before day 30 and pay nothing.'],
  ['Do I have to change my phone number?', 'No. You keep your number. You set your phone to forward calls to your AI line, either only when you can’t pick up or all the time. We show you the forwarding code for your carrier.'],
  ['I don’t have a website. Can I still use it?', 'Yes. Choose “I don’t have one”, enter your business name, phone and city, and we build your website from your Google listing and reviews. Or just call us.'],
  ['Do I have to replace my website?', 'No. We can rebuild it for you, or add the AI salesperson to your current site with one line of code. Your domain stays yours.'],
  ['Will the AI make things up?', 'It only uses what is on file for your business: your services, hours, service area and any prices you choose to share. If it doesn’t know, it takes the caller’s details and sends them to you.'],
  ['What happens with emergencies?', 'Calls about no heat, no cooling in extreme weather or a leak are flagged urgent. It can transfer the caller to your cell, or take an urgent message and alert you right away.'],
  ['Does it work with ServiceTitan, Housecall Pro or Jobber?', 'Not directly yet. Today it books into Google Calendar and sends every lead to you by text and email.'],
  ['What if I have several locations?', 'Tell us about your setup and we’ll send a custom quote.'],
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.l4-reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

export default function LandingV4() {
  const f = useDemoFunnel()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const previewRef = useRef<HTMLElement>(null)
  useReveal()
  // One offer on this page: the founding plan (the hook falls back to $149 when the 10 seats are gone).
  useEffect(() => { f.setPlan(f.seatsLeft === 0 ? 'standard' : 'founding') }, [f.seatsLeft]) // eslint-disable-line react-hooks/exhaustive-deps
  const showResult = f.showPreview || f.siteBuild?.status === 'ready'
  useEffect(() => { if (showResult) previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [showResult])
  const founding = f.seatsLeft !== 0
  const price = founding ? 99 : 149

  return (
    <div className={`l4 ${display.variable} ${body.variable}`}>
      <L4Styles />
      <header className="l4-nav">
        <a className="l4-topbar" href={`tel:${PHONE}`}>
          <PhoneCall size={16} /> <strong>CALL {PHONE_LABEL} FOR YOUR FREE 30-DAY TRIAL</strong><span className="l4-topbar-sub"> &middot; our AI answers 24/7</span>
        </a>
        <div className="l4-wrap l4-nav-in">
          <a href="/" className="l4-logo" aria-label="WebCrew home"><BrandMark size={30} /> WebCrew</a>
          <nav aria-label="Main">
            <a href="#included">What you get</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="l4-nav-call" href={`tel:${PHONE}`}><PhoneCall size={15} /> <span className="l4-hide-sm">Free trial: </span>{PHONE_LABEL}</a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="l4-hero" id="demo">
          <div className="l4-wrap l4-hero-grid">
            <div className="l4-hero-copy">
              <p className="l4-eyebrow">For HVAC and home-service companies</p>
              <h1>Never miss another <em>service call.</em></h1>
              <p className="l4-lede">WebCrew answers your phone 24/7, books the job into your calendar and rebuilds your website with an AI salesperson that turns visitors into calls. You get every lead by text and email.</p>
              <div className="l4-funnel"><Funnel f={f} /></div>
              {!f.showPreview && <SiteBuildNote f={f} />}
              <CallCta where="form" />
              <ul className="l4-trust">
                <li><Check size={15} /> Free preview, no card</li>
                <li><Check size={15} /> $0 setup</li>
                <li><Check size={15} /> 30 days free</li>
              </ul>
            </div>
            <div className="l4-hero-side">
              <CallCta where="side" />
              <HeroVisual />
            </div>
          </div>
        </section>

        {showResult && (
          <section className="l4-result" ref={previewRef}>
            <div className="l4-wrap">
              <Result f={f} />
            </div>
          </section>
        )}

        {/* ── Strip ───────────────────────────────────────────────────────── */}
        <section className="l4-strip" aria-label="Highlights">
          <div className="l4-wrap l4-strip-in">
            <span><PhoneIncoming size={18} /> Answers day and night</span>
            <span><CalendarCheck size={18} /> Books into Google Calendar</span>
            <span><MessageSquareText size={18} /> Texts you every lead</span>
            <span><Globe size={18} /> Built from your own website</span>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────────────────── */}
        <section className="l4-sec">
          <div className="l4-wrap l4-two">
            <div className="l4-reveal">
              <p className="l4-eyebrow">The problem</p>
              <h2>When you can&rsquo;t pick up, they call the next company.</h2>
            </div>
            <div className="l4-reveal l4-prose">
              <p>You&rsquo;re on a roof, under a house or driving between jobs. The phone rings, goes to voicemail, and the customer moves down the list. At night and on weekends it&rsquo;s worse.</p>
              <p>Your website has the same problem. Someone lands on it at 9pm with a question, finds a contact form, and leaves.</p>
              <p><b>WebCrew puts a trained AI front desk on both:</b> it picks up, answers from your real business info, takes the details and books the visit.</p>
            </div>
          </div>
        </section>

        {/* ── Included ────────────────────────────────────────────────────── */}
        <section className="l4-sec l4-paper" id="included">
          <div className="l4-wrap">
            <div className="l4-head l4-reveal">
              <p className="l4-eyebrow">One plan, everything included</p>
              <h2>Your AI front office, for ${price} a month.</h2>
            </div>
            <ol className="l4-included">
              {INCLUDED.map(([t, d], i) => (
                <li key={t} className="l4-reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                  <span className="l4-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Call example ───────────────────────────────────────────────── */}
        <section className="l4-sec l4-dark">
          <div className="l4-wrap l4-two l4-center">
            <div className="l4-reveal">
              <p className="l4-eyebrow light">2:14 a.m., example call</p>
              <h2>A no-heat call, handled while you sleep.</h2>
              <p className="l4-muted-light">The AI asks what&rsquo;s wrong and where they are, checks how urgent it is, offers a time from your calendar and sends you the details. You wake up to a booked job instead of a voicemail.</p>
              <a className="l4-call" href={`tel:${PHONE}`}>
                <PhoneCall size={18} />
                <span><small>Our own line runs on it. Ask it anything.</small>Call {PHONE_LABEL}</span>
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="l4-transcript l4-reveal" aria-label="Example of a call handled by the AI">
              {[
                ['caller', 'Hi, our furnace stopped working and it’s freezing in here.'],
                ['ai', 'I’m sorry, let’s get that sorted. What city are you in, and is anyone at home at risk from the cold?'],
                ['caller', 'Tracy. We have a baby at home.'],
                ['ai', 'Understood, I’m marking this urgent. The first opening is 7:30 tomorrow morning. Should I book it, or connect you to the owner now?'],
                ['caller', 'Book 7:30, please.'],
                ['ai', 'You’re booked for 7:30 a.m. You’ll get a text confirmation in a moment.'],
              ].map(([who, text], i) => <p key={i} className={`l4-bubble ${who}`}>{text}</p>)}
              <div className="l4-after">
                <span><Mail size={14} /> Owner alerted: urgent, no heat, Tracy</span>
                <span><CalendarCheck size={14} /> Booked 7:30 a.m.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section className="l4-sec" id="how">
          <div className="l4-wrap">
            <div className="l4-head l4-reveal">
              <p className="l4-eyebrow">How it works</p>
              <h2>Live in a day, not a month.</h2>
            </div>
            <ol className="l4-steps">
              <li className="l4-reveal"><b>1</b><h3>See your free preview</h3><p>Paste your website, or give us your business name if you don&rsquo;t have one. In a few minutes you get your new site with the AI salesperson on it. Talk to it.</p></li>
              <li className="l4-reveal"><b>2</b><h3>Start your 30 free days</h3><p>$0 setup. You get your AI phone line, your new site and a checklist: hours, services, calendar, call forwarding.</p></li>
              <li className="l4-reveal"><b>3</b><h3>Forward your calls</h3><p>Dial one code on your phone. Missed calls (or all calls) go to your AI. Leads start arriving by text and email.</p></li>
            </ol>
            <figure className="l4-shot l4-reveal">
              <div className="l4-browser"><span /><span /><span /><em>Example: a site rebuilt by WebCrew</em></div>
              <img src="/product/sample-site.jpg" alt="Example of a rebuilt HVAC website with call and service buttons" loading="lazy" width={1440} height={900} />
            </figure>
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────────────── */}
        <section className="l4-sec l4-paper" id="pricing">
          <div className="l4-wrap l4-price-wrap">
            <div className="l4-reveal">
              <p className="l4-eyebrow">Pricing</p>
              <h2>One plan. No setup fee. No contract.</h2>
              <p className="l4-lede">Founding pricing is for our first 10 companies and stays locked for as long as you&rsquo;re a customer. Several locations or very high call volume? <a href="mailto:hello@webcrew.app?subject=Custom%20quote">Ask for a custom quote.</a></p>
            </div>
            <div className="l4-price l4-reveal">
              {founding && <p className="l4-badge">Founding 10{f.seatsLeft !== null ? ` · ${f.seatsLeft} of 10 seats left` : ''}</p>}
              <p className="l4-amount"><span>${price}</span>/month{founding && <s>$149</s>}</p>
              <p className="l4-price-sub">{founding ? 'Locked for life. $149/month after the 10 founding seats.' : 'Includes everything below.'}</p>
              <ul>
                {INCLUDED.map(([t]) => <li key={t}><Check size={16} /> {t}</li>)}
                <li><Check size={16} /> $0 setup, 30 days free, cancel anytime</li>
              </ul>
              <a className="l4-btn" href="#demo">Start with a free preview <ArrowRight size={16} /></a>
              <p className="l4-fine"><ShieldCheck size={14} /> Card needed to start the trial. Nothing is charged for 30 days.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="l4-sec" id="faq">
          <div className="l4-wrap l4-two">
            <div className="l4-reveal">
              <p className="l4-eyebrow">FAQ</p>
              <h2>Straight answers.</h2>
              <p className="l4-muted">Still unsure? Call our AI at <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a> or email <a href="mailto:hello@webcrew.app">hello@webcrew.app</a>.</p>
            </div>
            <div className="l4-faq">
              {FAQS.map(([q, a], i) => (
                <div key={q} className={openFaq === i ? 'open' : ''}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>{q}<ChevronDown size={18} /></button>
                  <p hidden={openFaq !== i}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Go live / final CTA ─────────────────────────────────────────── */}
        <section className="l4-sec l4-final" id="claim">
          <div className="l4-wrap">
            {f.showPreview ? <GoLive f={f} price={price} /> : (
              <div className="l4-final-in l4-reveal">
                <h2>See it on your business first.</h2>
                <p>Paste your website, or tell us your business name if you don&rsquo;t have one. Your free preview is ready in a few minutes.</p>
                <div className="l4-row l4-final-row">
                  <a className="l4-btn" href="#demo">Build my free preview <ArrowRight size={16} /></a>
                  <a className="l4-btn ghost" href={`tel:${PHONE}`}><PhoneCall size={16} /> Call {PHONE_LABEL}</a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="l4-foot">
        <div className="l4-wrap l4-foot-in">
          <a href="/" className="l4-logo"><BrandMark size={26} /> WebCrew</a>
          <span>AI front office for HVAC and home-service companies.</span>
          <nav><a href="/blog">Blog</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@webcrew.app">Contact</a></nav>
        </div>
      </footer>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="l4-visual" aria-hidden="true">
      <div className="l4-frame">
        <div className="l4-browser"><span /><span /><span /><em>northline-heating.com</em></div>
        <img src="/product/sample-site.jpg" alt="" width={1440} height={900} fetchPriority="high" />
      </div>
      <div className="l4-card l4-card-chat">
        <p className="l4-card-h"><MessageSquareText size={14} /> Website chat</p>
        <p className="l4-q">Do you service Manteca?</p>
        <p className="l4-a">Yes, Manteca is in our area. What&rsquo;s going on with your system?</p>
      </div>
      <div className="l4-card l4-card-call">
        <p className="l4-card-h"><PhoneIncoming size={14} /> Call answered · 2:14 a.m.</p>
        <p className="l4-strong">No heat, Tracy</p>
        <p className="l4-tag"><CheckCircle2 size={14} /> Booked 7:30 a.m.</p>
      </div>
      <p className="l4-example">Example business</p>
    </div>
  )
}

function SiteTabs({ noSite, setNoSite }: { noSite: boolean; setNoSite: (v: boolean) => void }) {
  return (
    <div className="l4-tabs" role="tablist" aria-label="Do you have a website?">
      <button type="button" role="tab" aria-selected={!noSite} className={!noSite ? 'on' : ''} onClick={() => setNoSite(false)}>I have a website</button>
      <button type="button" role="tab" aria-selected={noSite} className={noSite ? 'on' : ''} onClick={() => setNoSite(true)}>I don&rsquo;t have one</button>
    </div>
  )
}

/** The other way in: call. Our own line runs on the product and can text the trial signup link. */
/** where="side": big card above the hero picture (desktop). where="form": under the form (phones only). */
function CallCta({ where }: { where: 'side' | 'form' }) {
  return (
    <a className={`l4-callcta l4-callcta-${where}`} href={`tel:${PHONE}`}>
      {where === 'form' && <span className="l4-or">or</span>}
      <span className="l4-callcta-in">
        <PhoneCall size={22} />
        <span><strong>Call {PHONE_LABEL} for your free 30-day trial</strong><small>Our AI answers. Ask it anything, then it texts you the signup link.</small></span>
      </span>
    </a>
  )
}

function SiteBuildNote({ f }: { f: DemoFunnel }) {
  const b = f.siteBuild
  if (!b || b.status === 'ready') return null
  return (
    <p className="l4-note" role="status" aria-live="polite">
      {b.status === 'failed' ? b.reason : <><Loader2 size={15} className="l4-spin" /> {b.kind === 'listing' ? 'Building your website from your Google listing' : 'Rebuilding your full website'} now, about 3&ndash;5 minutes{b.status === 'queued' && b.position && b.position > 1 ? ` (#${b.position} in line)` : ''}. It will appear on this page.</>}
    </p>
  )
}

function Funnel({ f }: { f: DemoFunnel }) {
  const { sources, stage } = f
  const [noSite, setNoSite] = useState(false)
  if (stage === 'needs_input') {
    return (
      <form className="l4-questions" onSubmit={e => { e.preventDefault(); f.submitAnswers() }}>
        <p>We read {f.businessName ? <b>{f.businessName}</b> : 'your site'}, but couldn&rsquo;t confirm a few things. Your AI only says what you confirm. Skip anything you&rsquo;re unsure about.</p>
        {f.questions.map(q => (
          <fieldset key={q.key}>
            <legend>{q.label}</legend>
            {q.kind === 'choice' ? (
              <div className="l4-chips" role="radiogroup" aria-label={q.label}>
                {q.options?.map(o => (
                  <button type="button" key={o.value} role="radio" aria-checked={f.answers[q.key] === o.value} className={f.answers[q.key] === o.value ? 'on' : ''}
                    onClick={() => f.setAnswer(q.key, f.answers[q.key] === o.value ? '' : o.value)}>{o.label}</button>
                ))}
              </div>
            ) : q.kind === 'list' ? (
              <textarea rows={2} value={f.answers[q.key] ?? ''} onChange={e => f.setAnswer(q.key, e.target.value)} placeholder={q.hint ? `e.g. ${q.hint}` : 'Separate with commas'} />
            ) : (
              <input type={q.key === 'phone' ? 'tel' : 'text'} value={f.answers[q.key] ?? ''} onChange={e => f.setAnswer(q.key, e.target.value)} placeholder={q.hint} />
            )}
            {q.key === 'hours' && f.answers.hours === 'other' && (
              <input type="text" value={f.answers.hours_other ?? ''} onChange={e => f.setAnswer('hours_other', e.target.value)} placeholder="e.g. Tue–Sat 7am–3pm" aria-label="Your hours" />
            )}
          </fieldset>
        ))}
        {f.errorMsg && <p className="l4-error"><X size={14} /> {f.errorMsg}</p>}
        <div className="l4-row">
          <button type="submit" className="l4-btn" disabled={f.answering}>{f.answering && <Loader2 size={16} className="l4-spin" />}Continue <ArrowRight size={16} /></button>
          <button type="button" className="l4-btn ghost" disabled={f.answering} onClick={() => f.submitAnswers(true)}>Skip all</button>
        </div>
      </form>
    )
  }

  if (f.showProgress) {
    const currentIdx = STAGE_ORDER.indexOf(stage)
    return (
      <div className="l4-progress" role="status" aria-live="polite">
        {STAGE_ORDER.map((s, idx) => {
          const done = idx < currentIdx || stage === 'ready'
          const active = s === stage
          return (
            <div key={s} className={`l4-pstep${done ? ' done' : ''}${active ? ' active' : ''}`}>
              <span>{done ? <Check size={12} /> : active ? <Loader2 size={12} className="l4-spin" /> : idx + 1}</span>
              {STAGE_COPY[s as Exclude<Stage, 'idle'>]}
            </div>
          )
        })}
        <div className="l4-pbar"><div style={{ width: `${f.progressPct}%` }} /></div>
      </div>
    )
  }

  if (stage === 'ready') return <p className="l4-ready"><CheckCircle2 size={18} /> Your preview is ready below.</p>

  const src = sources[0]
  if (noSite) {
    const l = f.listing
    const set = (k: keyof typeof l) => (e: React.ChangeEvent<HTMLInputElement>) => f.setListing({ ...l, [k]: e.target.value })
    const building = f.siteBuild && f.siteBuild.status !== 'failed' && f.siteBuild.kind === 'listing'
    return (
      <form className="l4-form" onSubmit={f.startListing}>
        <SiteTabs noSite={noSite} setNoSite={setNoSite} />
        <p className="l4-sub">We find your business on Google Maps and build your new website from your listing and reviews.</p>
        <div className="l4-grid">
          <label>Business name<input required value={l.name} onChange={set('name')} placeholder="Northline Heating & Air" autoComplete="organization" /></label>
          <label>Business phone<input required type="tel" value={l.phone} onChange={set('phone')} placeholder="(209) 555-0142" autoComplete="tel" /></label>
          <label>City<input required value={l.city} onChange={set('city')} placeholder="Tracy" autoComplete="address-level2" /></label>
          <label>State<input required maxLength={2} value={l.state} onChange={set('state')} placeholder="CA" autoComplete="address-level1" /></label>
        </div>
        <button type="submit" className="l4-btn l4-wide" disabled={!!building}>{building ? <><Loader2 size={16} className="l4-spin" /> Building your website…</> : <>Build my free website <ArrowRight size={16} /></>}</button>
      </form>
    )
  }
  return (
    <form className="l4-form" onSubmit={f.startPreview}>
      <SiteTabs noSite={noSite} setNoSite={setNoSite} />
      <div className="l4-input">
        <Globe size={18} />
        <input id="l4-url" type="text" inputMode="url" autoComplete="url" value={src?.url ?? ''} onChange={e => f.updateSource(0, { url: e.target.value })} placeholder="yourbusiness.com" />
        <button type="submit" className="l4-btn" disabled={!sources.some(sourceFilled)}>See my free preview <ArrowRight size={16} /></button>
      </div>
      {stage === 'failed' && f.errorMsg && <p className="l4-error"><X size={14} /> {f.errorMsg}</p>}
    </form>
  )
}

function Result({ f }: { f: DemoFunnel }) {
  const site = f.siteBuild?.status === 'ready' ? f.siteBuild.url : undefined
  return (
    <div className="l4-result-in">
      <div className="l4-result-head">
        <div>
          <p className="l4-eyebrow">{site ? 'Your new website is ready' : 'Your AI salesperson is ready'}</p>
          <h2>{site ? <>{f.businessName || f.listing.name || 'Your business'}{f.siteBuild?.kind === 'listing' ? '’s new website.' : ', rebuilt.'}</> : <>Talk to {f.businessName ? `${f.businessName}’s` : 'your'} AI.</>}</h2>
          <p className="l4-muted">{site
            ? 'Click around, then use the chat bubble or tap the mic and talk to it like a customer would.'
            : 'Ask it about your services, hours or service area, by typing or with the mic.'}</p>
        </div>
        <div className="l4-row">
          {site && <a className="l4-btn ghost" href={site} target="_blank" rel="noopener">Open full screen <ArrowUpRight size={15} /></a>}
          {f.showPreview && <a className="l4-btn" href="#claim">Go live free for 30 days <ArrowRight size={16} /></a>}
        </div>
      </div>
      {!site && <SiteBuildNote f={f} />}
      <div className="l4-iframe">
        <div className="l4-browser"><span /><span /><span /><em>{site ? new URL(site).host : 'AI salesperson preview'}</em></div>
        <iframe src={site ?? `${RECEPTION_URL}/preview/${f.previewId}`} title={site ? 'Your new website' : 'Your AI salesperson preview'} loading="lazy" allow="microphone; autoplay" />
      </div>
      {!f.showPreview && f.stage === 'needs_input' && <p className="l4-note">Answer the quick questions above so your AI knows what to say, then you can go live.</p>}
    </div>
  )
}

function GoLive({ f, price }: { f: DemoFunnel; price: number }) {
  const { claim, setClaim } = f
  return (
    <form className="l4-golive" onSubmit={f.startCheckout}>
      <div>
        <p className="l4-eyebrow">Go live</p>
        <h2>Start your 30 free days.</h2>
        <p className="l4-muted">${price}/month after the trial{price === 99 ? ', locked for life' : ''}. $0 today. {f.experience === 'new' ? 'We finish your new website after you start.' : 'We add the AI to your current website.'} Cancel anytime before day 30 and pay nothing.</p>
        <ul className="l4-mini">
          <li><Check size={15} /> AI phone line set up for you</li>
          <li><Check size={15} /> New website + AI salesperson</li>
          <li><Check size={15} /> Setup checklist by email</li>
        </ul>
      </div>
      <div className="l4-golive-form">
        <label>Your name<input required autoComplete="name" value={claim.name} onChange={e => setClaim({ ...claim, name: e.target.value })} placeholder="Jordan Smith" /></label>
        <label>Mobile phone<input required type="tel" autoComplete="tel" value={claim.phone} onChange={e => setClaim({ ...claim, phone: e.target.value })} placeholder="(555) 555-0123" /></label>
        <label>Work email<input required type="email" autoComplete="email" value={claim.email} onChange={e => setClaim({ ...claim, email: e.target.value })} placeholder="jordan@business.com" /></label>
        <label className="l4-consent"><input type="checkbox" checked={claim.smsConsent} onChange={e => setClaim({ ...claim, smsConsent: e.target.checked })} /><span>Text me setup updates. Recurring messages from WebCrew; frequency varies; msg &amp; data rates may apply. Not required to buy. Reply STOP to opt out, HELP for help. <a href="/privacy" target="_blank" rel="noreferrer">Privacy</a> · <a href="/terms" target="_blank" rel="noreferrer">Terms</a></span></label>
        {f.checkoutError && <p className="l4-error">{f.checkoutError}</p>}
        <button className="l4-btn" disabled={f.checkoutState === 'sending'}>{f.checkoutState === 'sending' ? <><Loader2 size={16} className="l4-spin" /> Opening secure checkout…</> : <>Continue to secure checkout <ArrowRight size={16} /></>}</button>
        <p className="l4-fine"><ShieldCheck size={14} /> Payments by Stripe. Your card is not charged until the trial ends.</p>
      </div>
    </form>
  )
}

