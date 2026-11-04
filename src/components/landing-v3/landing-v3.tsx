'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, CalendarCheck, Check, CheckCircle2, ChevronDown, Clock3, Loader2, Menu,
  MessageSquareText, MicVocal, PhoneCall, Plus, Sparkles, Star, UserCheck, X,
} from 'lucide-react'
import BrandMark from '../brand-mark'
import { Plans, LandingStyles } from '../landing/sections'
import { createSceneState } from './scene-state'
import {
  useDemoFunnel, RECEPTION_URL, MAX_SOURCES, SOURCE_TABS, STAGE_COPY, STAGE_ORDER, sourceFilled,
  type DemoFunnel, type Stage,
} from './use-demo-funnel'
import { V3Styles } from './styles'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// The 3D stage is client-only and loaded after first paint (LCP = the headline).
const MorphScene = dynamic(() => import('./morph-scene'), { ssr: false })

const AI_RECEPTION_PHONE = '+19182555151'
const AI_RECEPTION_PHONE_LABEL = '(918) 255-5151'
// Real product recording. Null until a recording is in public/landing-v3/.
const DEMO_VIDEO: { mp4: string; webm?: string; poster: string } | null = null

const faqs: Array<[string, string]> = [
  ['What do I actually get for $49?', 'A new, fast website built from your current site, Google listing or Facebook page, with an AI salesperson on every page. Visitors can type or talk to it; it answers from your real services and hours and sends every lead to your phone and email. 60 AI minutes a month are included.'],
  ['Do I have to give up my current website?', 'No. You can keep your site and we add the AI salesperson to it with one line of code, or let us rebuild it. Your domain and branding stay yours either way.'],
  ['What is AI Reception, and do I need it?', 'It is the same AI answering your business phone 24/7: it books jobs into your Google Calendar, sends reminders and follow-ups and asks happy customers for reviews. Start with the $49 website and add it any time. It is $99/mo for the first 10 founding customers, then $149/mo.'],
  ['Will the AI make things up?', 'It only uses what you give it and what it read from your business info: services, hours, the prices you list. If it doesn’t know, it takes the details and you get them by text and email.'],
  ['Is the demo real or a script?', 'Real. The preview you build above runs the live AI against your own business info. Ask it about your services or hours.'],
  ['What does it cost to start?', '$0 setup and a 30-day free trial. A card is needed to go live; nothing is charged for 30 days, and you can cancel anytime before that.'],
  ['Does it work with ServiceTitan, Housecall Pro or Jobber?', 'Not directly yet. Today it books into Google Calendar and sends every lead to you by text and email.'],
]

function useSceneMode() {
  // 'pending' on the server and first paint, then 'webgl' or 'static'.
  const [mode, setMode] = useState<'pending' | 'webgl' | 'static'>('pending')
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as any).connection
    const slow = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ''))
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2
    // No GPU (software rasteriser) = seconds of main-thread work for the scene: use the CSS stage.
    let gl = false
    try {
      const c = document.createElement('canvas')
      const ctx = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null
      if (ctx) {
        const info = ctx.getExtension('WEBGL_debug_renderer_info')
        const renderer = String(info ? ctx.getParameter(info.UNMASKED_RENDERER_WEBGL) : ctx.getParameter(ctx.RENDERER))
        gl = !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)
        ctx.getExtension('WEBGL_lose_context')?.loseContext()
      }
    } catch { /* no webgl */ }
    setMobile(window.matchMedia('(max-width: 860px)').matches)
    if (reduced || slow || weak || !gl) { setMode('static'); return }
    // Wait until the page is idle so the 3D chunk never competes with the headline.
    const go = () => setMode('webgl')
    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, o?: object) => number)
    if (ric) ric(go, { timeout: 1500 }); else setTimeout(go, 600)
  }, [])
  return { mode, mobile }
}

export default function LandingV3() {
  const f = useDemoFunnel()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [ctaDismissed, setCtaDismissed] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [stageActive, setStageActive] = useState(true)
  const { mode, mobile } = useSceneMode()
  const sceneState = useRef(createSceneState()).current
  const wrapRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLElement>(null)

  // Scene position: right of the copy on desktop, centred + dimmed behind it on phones.
  useEffect(() => {
    sceneState.shift = mobile ? 0 : 1.55
    sceneState.lift = mobile ? 0.85 : 0
    sceneState.dim = mobile ? 0.7 : 1
  }, [mobile, sceneState])

  // Only render frames while the story section is on screen.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setStageActive(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Scroll → scene. Each segment reports its own 0..1 progress; the scene values are a
  // fixed function of all of them, so segments can't fight and inserted content (the
  // live preview) can't desync anything. The shader eases toward these targets.
  useGSAP(() => {
    const p = [0, 0, 0, 0] // hero leaving, ch1, ch2, ch3
    const apply = () => {
      sceneState.morph = 0.15 * p[0] + 0.85 * p[1] + p[3]
      sceneState.talk = p[2] * (1 - p[3]) + 0.45 * p[3]
    }
    const track = (i: number, el: Element, start: string, end: string) =>
      ScrollTrigger.create({ trigger: el, start, end, onUpdate: (s) => { p[i] = s.progress; apply() }, onRefresh: (s) => { p[i] = s.progress; apply() } })

    const hero = document.querySelector<HTMLElement>('[data-hero]')
    if (hero) track(0, hero, 'top top', 'bottom top')
    const ch = gsap.utils.toArray<HTMLElement>('[data-chapter]')
    ch.forEach((el) => {
      const n = Number(el.dataset.chapter)
      track(n, el, 'top 85%', 'top 25%')
      ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setChapter(n) })
    })
    if (hero) ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom 55%', onToggle: (s) => s.isActive && setChapter(0) })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Hero entrance. The headline and lede are never hidden (they are the LCP text);
    // only the pill, form and badges animate in.
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.v3-hero .v3-pill', { opacity: 0, y: -14, duration: 0.45 })
      .from('.v3-hero .v3-funnel', { opacity: 0, y: 16, duration: 0.55 }, '-=0.2')
      .from('.v3-hero .v3-trust span', { opacity: 0, y: 8, stagger: 0.06, duration: 0.4 }, '-=0.3')

    // Chapter copy + light sections.
    gsap.utils.toArray<HTMLElement>('.v3-chapter-card, .v3-reveal-up').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
    })
    gsap.utils.toArray<HTMLElement>('.v3-stagger').forEach((grid) => {
      gsap.from(grid.children, { opacity: 0, y: 36, scale: 0.97, stagger: 0.07, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: grid, start: 'top 82%', once: true } })
    })
  }, { scope: pageRef })

  // New content changes the page height: re-measure triggers, then show the preview.
  useEffect(() => {
    ScrollTrigger.refresh()
    if (f.showPreview) revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [f.showPreview, f.stage])

  const links: Array<[string, string]> = [['How it works', '#how'], ['Pricing', '#plans'], ['FAQ', '#faq']]

  function pickPlan(p: Parameters<typeof f.setPlan>[0]) {
    f.setPlan(p)
    document.getElementById(f.showPreview ? 'claim' : 'demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="v3-page" ref={pageRef}>
      <nav className="v3-nav">
        <a href="#top" className="v3-logo" aria-label="WebCrew home"><BrandMark size={30} />WebCrew</a>
        <div className="v3-navlinks">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div>
        <a className="v3-nav-cta" href="#demo">Build my free demo <ArrowRight size={16} /></a>
        <button className="v3-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="v3-mobile-nav">{links.map(([l, h]) => <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>)}<a href="#demo" onClick={() => setMenuOpen(false)}>Build my free demo →</a></div>}

      <main id="top">
        {/* ── Story: one sticky 3D stage behind the hero and three chapters ── */}
        <div className="v3-story" ref={wrapRef}>
          <div className="v3-stage" aria-hidden="true">
            {mode === 'webgl' && <MorphScene state={sceneState} active={stageActive} mobile={mobile} />}
            {mode === 'static' && <StaticStage chapter={chapter} />}
            <div className="v3-stage-glow" />
          </div>

          <section className="v3-hero" data-hero id="demo">
            <div className="v3-hero-copy">
              <div className="v3-pill"><Sparkles size={14} /> For HVAC, plumbing and home-service businesses</div>
              <h1 aria-label="Your website just sits there. Make it sell.">
                {'Your website just sits there.'.split(' ').map((w, i) => <span className="v3-wm" key={i}><span className="v3-w">{w}</span></span>)}
                <br />
                {'Make it '.split(' ').filter(Boolean).map((w, i) => <span className="v3-wm" key={`b${i}`}><span className="v3-w">{w}</span></span>)}
                <span className="v3-wm"><span className="v3-w"><em>sell.</em></span></span>
              </h1>
              <p className="v3-lede">We rebuild your site with an <b>AI salesperson</b> built in. It talks to every visitor, answers from your real services and hours, and sends you every lead. When you&rsquo;re ready, it answers your phone too.</p>
              <div className="v3-funnel"><Funnel f={f} /></div>
              <div className="v3-trust"><span><CheckCircle2 /> Free demo, no card</span><span><CheckCircle2 /> $0 setup</span><span><CheckCircle2 /> 30-day free trial</span></div>
            </div>
          </section>

          {f.showPreview && (
            <section className="v3-preview" ref={revealRef}>
              <p className="v3-eyebrow">Your preview is ready</p>
              <h2>Meet {f.businessName || 'your business'}&rsquo;s <em>AI salesperson.</em></h2>
              <p>It&rsquo;s live. Use the chat bubble in the corner of the preview: ask about your services or hours, or tap the mic and talk.</p>
              <div className="v3-iframe"><iframe src={`${RECEPTION_URL}/preview/${f.previewId}`} title="Your AI salesperson preview" loading="lazy" /></div>
              <div className="v3-preview-actions">
                <a className="v3-btn" href="#claim">Go live free for 30 days <ArrowRight size={16} /></a>
                <button className="v3-btn ghost" onClick={f.resetPreview}>Try a different business</button>
              </div>
            </section>
          )}

          <Chapter n={1} kicker="01 · We rebuild it" title={<>Your old site, <em>rebuilt.</em></>}>
            We read your current website, Google listing or Facebook page and build a fast, modern site that keeps your name, services and phone number. You see a free preview in about a minute, before you pay anything.
          </Chapter>
          <Chapter n={2} kicker="02 · It starts selling" title={<>A salesperson on <em>every page.</em></>}>
            Visitors type or talk. The AI answers from your real services and hours, asks what they need and where they are, and sends the lead to your phone and email right away. It never makes up prices.
          </Chapter>
          <Chapter n={3} kicker="03 · Add the phone line" title={<>Ready for more? <em>It answers your phone.</em></>}>
            Upgrade to AI Reception and the same AI answers your calls 24/7, books jobs into your Google Calendar, sends reminders and asks happy customers for reviews.
            <span className="v3-chapter-price">{f.seatsLeft === 0 ? '$149/mo' : <>$99/mo founding price <s>$149</s>{f.seatsLeft !== null && <> · {f.seatsLeft} of 10 seats left</>}</>}</span>
          </Chapter>
        </div>

        {/* ── Light sections ── */}
        <section className="v3-section" id="how">
          <p className="v3-eyebrow v3-reveal-up">Before and after</p>
          <h2 className="v3-reveal-up">Same visitors. <em>More customers.</em></h2>
          <div className="v3-ba v3-stagger">
            <article className="v3-ba-col old">
              <h3>Your website today</h3>
              <ul>
                <li><X size={16} /> Someone visits at 9pm. Nobody is there.</li>
                <li><X size={16} /> A contact form that nobody reads until Monday</li>
                <li><X size={16} /> Questions about price or service area go unanswered</li>
                <li><X size={16} /> The visitor leaves and calls the next company</li>
              </ul>
            </article>
            <article className="v3-ba-col new">
              <h3>Your WebCrew website</h3>
              <ul>
                <li><Check size={16} /> The AI greets them, day or night</li>
                <li><Check size={16} /> Answers from your real services, hours and listed prices</li>
                <li><Check size={16} /> Gets their name, number and what they need</li>
                <li><Check size={16} /> Texts and emails you the lead right away</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="v3-section v3-dark">
          <div className="v3-split">
            <div className="v3-reveal-up">
              <p className="v3-eyebrow light">See it work</p>
              <h2>Don&rsquo;t take our word for it. <em>Call it.</em></h2>
              <p className="v3-muted-light">Our own phone line runs on the same AI. Call and ask it anything you&rsquo;d expect a customer to ask: prices, availability, how it works.</p>
              <a className="v3-call" href={`tel:${AI_RECEPTION_PHONE}`}><PhoneCall size={18} /><span>Call <strong>{AI_RECEPTION_PHONE_LABEL}</strong><small>Live AI, answered 24/7</small></span><ArrowRight size={17} /></a>
            </div>
            <div className="v3-video v3-reveal-up">
              {DEMO_VIDEO ? (
                <DemoVideo src={DEMO_VIDEO} />
              ) : (
                <div className="v3-call-sim" aria-label="Example of a call handled by the AI">
                  <span className="v3-sim-tag">Example</span>
                  {[
                    ['caller', 'Hi, my AC stopped blowing cold air. Can someone come out?'],
                    ['ai', 'Sorry to hear that. I can help. What city are you in, and is anyone at home affected by the heat?'],
                    ['caller', 'Tracy. No, just me.'],
                    ['ai', 'Got it. I have tomorrow at 9am or 1pm open. Which works better?'],
                    ['caller', '9am.'],
                    ['ai', 'You’re booked for 9am. You’ll get a text confirmation shortly.'],
                  ].map(([who, text], i) => <p key={i} className={`v3-bubble ${who}`} style={{ animationDelay: `${i * 1.4}s` }}>{text}</p>)}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="v3-section">
          <p className="v3-eyebrow v3-reveal-up">What your AI salesperson does</p>
          <h2 className="v3-reveal-up">Works every hour <em>you don&rsquo;t.</em></h2>
          <div className="v3-cards v3-stagger">
            {[
              [MessageSquareText, 'Talks to visitors', 'Chat or voice, on every page, in plain English.'],
              [UserCheck, 'Qualifies the job', 'Asks what they need, where they are and how urgent it is.'],
              [Clock3, 'Never off the clock', 'Nights, weekends and holidays, with no hold music.'],
              [MicVocal, 'Sounds like your business', 'Uses your services, hours and the prices you choose to share.'],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof Star
              return <article className="v3-card" key={title as string}><I size={22} /><h3>{title as string}</h3><p>{body as string}</p></article>
            })}
          </div>
        </section>

        <section className="v3-section v3-steps-wrap">
          <p className="v3-eyebrow v3-reveal-up">How it works</p>
          <h2 className="v3-reveal-up">Live in three steps.</h2>
          <ol className="v3-steps v3-stagger">
            <li><b>1</b><h3>Build your free demo</h3><p>Paste your website, Facebook About text or a few lines about your business.</p></li>
            <li><b>2</b><h3>Talk to it</h3><p>Ask it what your customers ask. Change anything you don&rsquo;t like.</p></li>
            <li><b>3</b><h3>Go live</h3><p>$0 setup, 30 days free. Add AI Reception for your phone whenever you&rsquo;re ready.</p></li>
          </ol>
          <div className="v3-upsell v3-reveal-up">
            <CalendarCheck size={22} />
            <p><b>Start with the website. Add the phone later.</b> The $49 plan covers your website. AI Reception adds 24/7 phone answering, calendar booking, reminders, follow-ups and review requests.</p>
          </div>
        </section>

        <Plans seatsLeft={f.seatsLeft} onPick={pickPlan} />

        <section className="v3-section" id="faq">
          <p className="v3-eyebrow">FAQ</p>
          <h2>Straight answers.</h2>
          <div className="v3-faq">{faqs.map(([q, a], i) => (
            <button key={q} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
              <span><b>{q}</b><p style={{ display: openFaq === i ? 'block' : 'none' }}>{a}</p></span>
              <ChevronDown className={openFaq === i ? 'open' : ''} />
            </button>
          ))}</div>
        </section>

        <section className="lp-section" id="claim"><GoLive f={f} /></section>
      </main>

      <footer className="v3-footer"><a href="#top" className="v3-logo"><BrandMark size={28} />WebCrew</a><p>Websites with an AI salesperson, and AI Reception for your phone.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@webcrew.app">Contact</a></div></footer>

      {f.showPreview && !ctaDismissed && (
        <div className="v3-sticky">
          <span><strong>{f.businessName || 'Your'}</strong> AI salesperson is ready. Go live free for 30 days.</span>
          <a href="#claim">Go live <ArrowRight size={15} /></a>
          <button aria-label="Dismiss" onClick={() => setCtaDismissed(true)}><X size={15} /></button>
        </div>
      )}

      <LandingStyles />
      <V3Styles />
    </div>
  )
}

function Chapter({ n, kicker, title, children }: { n: number; kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="v3-chapter" data-chapter={n}>
      <div className="v3-chapter-card">
        <p className="v3-eyebrow light">{kicker}</p>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </section>
  )
}

function StaticStage({ chapter }: { chapter: number }) {
  // No-WebGL / reduced-motion fallback: the same three ideas, drawn in CSS.
  return (
    <div className={`v3-static ch${chapter}`}>
      <div className="v3-static-site"><i /><i /><i /><i /></div>
      <div className="v3-static-orb" />
      <div className="v3-static-phone"><PhoneCall size={34} /></div>
    </div>
  )
}

function DemoVideo({ src }: { src: { mp4: string; webm?: string; poster: string } }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.4 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} muted playsInline loop preload="none" poster={src.poster} controls>
      {src.webm && <source src={src.webm} type="video/webm" />}
      <source src={src.mp4} type="video/mp4" />
    </video>
  )
}

function Funnel({ f }: { f: DemoFunnel }) {
  const { sources, stage } = f
  if (stage === 'needs_input') {
    return (
      <form className="v3-questions" onSubmit={e => { e.preventDefault(); f.submitAnswers() }}>
        <p>We read {f.businessName ? <b>{f.businessName}</b> : 'your info'}, but couldn&rsquo;t confirm a few things. Your AI only says what you confirm. Skip anything you&rsquo;re unsure about.</p>
        {f.questions.map(q => (
          <fieldset key={q.key}>
            <legend>{q.label}</legend>
            <small>{q.why}</small>
            {q.kind === 'choice' ? (
              <div className="v3-chips" role="radiogroup" aria-label={q.label}>
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
        {f.errorMsg && <p className="v3-error"><X size={14} /> {f.errorMsg}</p>}
        <div className="v3-row">
          <button type="submit" className="v3-btn" disabled={f.answering}>{f.answering && <Loader2 size={16} className="v3-spin" />}Build my preview <ArrowRight size={16} /></button>
          <button type="button" className="v3-btn ghost" disabled={f.answering} onClick={() => f.submitAnswers(true)}>Skip all</button>
        </div>
      </form>
    )
  }

  if (f.showProgress) {
    const currentIdx = STAGE_ORDER.indexOf(stage)
    return (
      <div className="v3-progress" role="status" aria-live="polite">
        {STAGE_ORDER.map((s, idx) => {
          const done = idx < currentIdx || stage === 'ready'
          const active = s === stage
          return (
            <div key={s} className={`v3-pstep${done ? ' done' : ''}${active ? ' active' : ''}`}>
              <span>{done ? <Check size={13} /> : active ? <Loader2 size={13} className="v3-spin" /> : idx + 1}</span>
              {STAGE_COPY[s as Exclude<Stage, 'idle'>]}
            </div>
          )
        })}
        <div className="v3-pbar"><div style={{ width: `${f.progressPct}%` }} /></div>
      </div>
    )
  }

  if (stage === 'ready') return <p className="v3-ready"><CheckCircle2 size={18} /> Your preview is ready below.</p>

  return (
    <form className="v3-form" onSubmit={f.startPreview}>
      {sources.map((src, i) => (
        <div className="v3-source" key={i}>
          <div className="v3-tabs" role="radiogroup" aria-label={`Source ${i + 1} type`}>
            {SOURCE_TABS.map(t => {
              const taken = t.type === 'website' && src.type !== 'website' && sources.some(s => s.type === 'website')
              return <button type="button" key={t.type} role="radio" aria-checked={src.type === t.type} disabled={taken} className={src.type === t.type ? 'on' : ''} onClick={() => f.updateSource(i, { type: t.type, url: '' })}>{t.label}</button>
            })}
            {sources.length > 1 && <button type="button" className="v3-tab-x" aria-label={`Remove source ${i + 1}`} onClick={() => f.removeSource(i)}><X size={14} /></button>}
          </div>
          {src.type === 'website' ? (
            <input type="text" inputMode="url" value={src.url} onChange={e => f.updateSource(i, { url: e.target.value })} placeholder="yourbusiness.com" aria-label="Your website URL" />
          ) : (
            <>
              {src.type !== 'text' && (
                <input type="text" value={src.url} onChange={e => f.updateSource(i, { url: e.target.value })}
                  placeholder={src.type === 'facebook' ? 'facebook.com/yourpage (optional)' : 'instagram.com/yourprofile (optional)'}
                  aria-label={`${src.type === 'facebook' ? 'Facebook' : 'Instagram'} link (optional)`} />
              )}
              <textarea rows={3} value={src.text} onChange={e => f.updateSource(i, { text: e.target.value })}
                aria-label={src.type === 'text' ? 'Describe your business' : 'Paste your About text'}
                placeholder={src.type === 'text'
                  ? 'What you do, where you work, your hours and the number customers call.'
                  : `Paste the About section from your ${src.type === 'facebook' ? 'Facebook Page' : 'Instagram profile'}.`} />
              {src.type !== 'text' && <small>We don&rsquo;t log in to or read your profile. We only use what you paste.</small>}
            </>
          )}
        </div>
      ))}
      {f.hasWebsite && (
        <div className="v3-exp" role="radiogroup" aria-label="What would you like to see?">
          <button type="button" role="radio" aria-checked={f.experience === 'new'} className={f.experience === 'new' ? 'on' : ''} onClick={() => f.setExperience('new')}><b>Rebuild my website</b><span>New site + AI salesperson</span></button>
          <button type="button" role="radio" aria-checked={f.experience === 'upgrade'} className={f.experience === 'upgrade' ? 'on' : ''} onClick={() => f.setExperience('upgrade')}><b>Keep my website</b><span>Just add the AI salesperson</span></button>
        </div>
      )}
      {stage === 'failed' && f.errorMsg && <p className="v3-error"><X size={14} /> {f.errorMsg}</p>}
      <div className="v3-row">
        {sources.length < MAX_SOURCES && <button type="button" className="v3-add" onClick={f.addSource}><Plus size={15} /> Add another source</button>}
        <button type="submit" className="v3-btn" disabled={!sources.some(sourceFilled)}>See my AI salesperson <ArrowRight size={16} /></button>
      </div>
    </form>
  )
}

function GoLive({ f }: { f: DemoFunnel }) {
  if (!f.showPreview) {
    return (
      <>
        <p className="lp-eyebrow">Start here</p>
        <h2>See it on <em>your</em> business first.</h2>
        <p className="lp-lede">Build your free demo in about a minute. Pick a plan only if you like it.</p>
        <a className="lp-btn" style={{ width: 'auto' }} href="#demo">Build my free demo <ArrowRight size={16} /></a>
      </>
    )
  }
  const { claim, setClaim, plan, setPlan, seatsLeft } = f
  return (
    <form className="lp-golive" onSubmit={f.startCheckout}>
      <h3>Put {f.businessName ? `${f.businessName}’s` : 'your'} AI salesperson to work</h3>
      <p>{f.experience === 'new' ? 'We build your new website after you start your trial.' : 'We add it to your current website with one line of code.'} $0 today. Cancel anytime during the 30-day trial.</p>
      <div className="lp-plan-toggle" role="radiogroup" aria-label="Plan">
        <button type="button" role="radio" aria-checked={plan === 'site_ai'} className={plan === 'site_ai' ? 'on' : ''} onClick={() => setPlan('site_ai')}><strong>$49/mo</strong>Website + AI salesperson</button>
        <button type="button" role="radio" aria-checked={plan !== 'site_ai'} className={plan !== 'site_ai' ? 'on' : ''} onClick={() => setPlan(seatsLeft === 0 ? 'standard' : 'founding')}><strong>{seatsLeft === 0 ? '$149/mo' : '$99/mo founding'}</strong>Website + AI Reception (phone)</button>
      </div>
      <div className="lp-fields">
        <label>Your name<input required autoComplete="name" value={claim.name} onChange={e => setClaim({ ...claim, name: e.target.value })} placeholder="Jordan Smith" /></label>
        <label>Mobile phone<input required type="tel" autoComplete="tel" value={claim.phone} onChange={e => setClaim({ ...claim, phone: e.target.value })} placeholder="(555) 555-0123" /></label>
      </div>
      <div className="lp-fields" style={{ gridTemplateColumns: '1fr' }}>
        <label>Work email<input required type="email" autoComplete="email" value={claim.email} onChange={e => setClaim({ ...claim, email: e.target.value })} placeholder="jordan@business.com" /></label>
      </div>
      <label className="lp-consent"><input type="checkbox" checked={claim.smsConsent} onChange={e => setClaim({ ...claim, smsConsent: e.target.checked })} /><span>Text me setup updates. Recurring messages from WebCrew; frequency varies; msg &amp; data rates may apply. Not required to buy. Reply STOP to opt out, HELP for help. <a href="/privacy" target="_blank" rel="noreferrer">Privacy</a> · <a href="/terms" target="_blank" rel="noreferrer">Terms</a></span></label>
      {f.checkoutError && <p className="lp-err">{f.checkoutError}</p>}
      <button className="lp-btn" disabled={f.checkoutState === 'sending'}>{f.checkoutState === 'sending' ? <><Loader2 size={16} className="v3-spin" /> Opening secure checkout…</> : <>Continue to secure checkout <ArrowRight size={16} /></>}</button>
      <p className="lp-fine">Payments by Stripe. Your card is not charged until the 30-day trial ends.</p>
    </form>
  )
}
