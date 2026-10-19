'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BellRing, CalendarCheck, Check, CheckCircle2, ChevronDown,
  Loader2, Menu, MessageSquareText, PhoneCall, Plus, Sparkles, UserCheck, X, Zap,
} from 'lucide-react'
import BrandMark from './brand-mark'
import { getReferralCode } from '@/lib/referral'

// "Paste your URL" landing page — native.no / lindaria style. A visitor pastes
// their EXISTING website, watches a staged AI-progress UI, and gets a live,
// talkable AI SalesPerson preview of their own business built from it. This
// intentionally coexists with missed-call-landing.tsx rather than replacing
// it — see lib/features.ts's SHOW_NEW_LANDING flag for the switch.

// Window.turnstile is declared globally in avatar-widget.tsx (both components
// load the same Cloudflare Turnstile script, so the shape must match exactly).

const RECEPTION_URL = process.env.NEXT_PUBLIC_RECEPTION_URL ?? 'https://ai-reception-459352382653.us-central1.run.app'
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const AI_RECEPTION_PHONE = '+19182555151'

type Stage = 'idle' | 'reading' | 'needs_input' | 'understanding' | 'building' | 'ready' | 'failed'

/** Mirrors pipeline/src/reception/preview-clarify.ts ClarifyQuestion. */
type ClarifyQuestion = {
  key: string
  label: string
  kind: 'text' | 'list' | 'choice'
  options?: Array<{ value: string; label: string }>
  hint?: string
  why: string
}

/** Mirrors pipeline/src/reception/preview-sources.ts. FB/IG are never fetched — the owner pastes About text. */
type SourceType = 'website' | 'facebook' | 'instagram' | 'text'
type SourceDraft = { type: SourceType; url: string; text: string }
const MAX_SOURCES = 4
const SOURCE_TABS: Array<{ type: SourceType; label: string }> = [
  { type: 'website', label: 'My website' },
  { type: 'facebook', label: 'Facebook Page' },
  { type: 'instagram', label: 'Instagram' },
  { type: 'text', label: 'Describe my business' },
]
const emptySource = (type: SourceType): SourceDraft => ({ type, url: '', text: '' })
function sourceFilled(s: SourceDraft): boolean {
  return s.type === 'website' ? !!s.url.trim() : !!s.text.trim()
}

const STAGE_COPY: Record<Exclude<Stage, 'idle'>, string> = {
  reading: 'Reading your business info…',
  needs_input: 'A few quick questions',
  understanding: 'Understanding your business…',
  building: 'Building your AI SalesPerson…',
  ready: 'Ready!',
  failed: "Couldn't build a preview",
}
const STAGE_ORDER: Stage[] = ['reading', 'understanding', 'building', 'ready']

const solutionCards = [
  { icon: PhoneCall, title: 'Talks to every visitor', body: 'Not a chatbot script — a real AI SalesPerson that knows your services, hours, and pricing.' },
  { icon: UserCheck, title: 'Qualifies them', body: 'Understands what a visitor needs before they ever fill out a form.' },
  { icon: CalendarCheck, title: 'Books them', body: 'Checks your calendar and locks in the appointment, day or night.' },
  { icon: MessageSquareText, title: 'Never drops the ball', body: "If they're not ready to book, it captures them as a lead instead of letting them leave empty-handed." },
  { icon: BellRing, title: 'Keeps you in the loop', body: 'Every conversation, every lead, sent straight to you.' },
]

const industries = ['Contractors', 'Plumbers', 'Electricians', 'HVAC', 'Roofers', 'Cleaning', 'Auto services', 'Salons', 'Spas', 'Home services']
const styleOptions = [
  { id: 'editorial', name: 'Editorial', tagline: 'Bold, magazine-style, content-forward' },
  { id: 'zigzag', name: 'Professional', tagline: 'Clean, structured, classic local-business layout' },
] as const

const faqs = [
  ['Do you touch my actual website?', "No. Your current site stays exactly as it is — untouched, unchanged. What you're seeing here is a preview of an AI SalesPerson we can add to it, or a fresh site if you'd rather start over."],
  ['Is the chat bubble in the preview actually AI, or a demo script?', "It's the real thing — live Google Gemini running against what we just read from your site. Ask it about your own services or hours and it'll answer correctly."],
  ['What happens if I claim it?', "We add this AI SalesPerson to your existing website with one line of code — no rebuild, no downtime, nothing to migrate. If you'd rather have a brand new site instead, we build that overnight too."],
  ['What does this cost?', "$0 setup fee and a 30-day free trial. Our first 10 clients get a founding rate of $99/month (250 AI minutes), locked for life; after that it's $149/month (500 AI minutes). No add-ons, no surprise charges: over the limit, calls ring your cell. Need something outside that — multiple locations, e-commerce, custom integrations — we quote that separately."],
  ['How is this different from a chatbot plugin?', "A chatbot plugin answers FAQs from a script. This is a full AI front office: it talks, qualifies, checks your real calendar, books real appointments, and follows up automatically if someone doesn't convert."],
]

export default function WebsitePreviewLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [sources, setSources] = useState<SourceDraft[]>([emptySource('website')])
  const urlInput = sources.find(s => s.type === 'website')?.url.trim() ?? ''
  const hasWebsite = sources.some(s => s.type === 'website')
  // Chosen BEFORE the demo so the demo matches it. No website → new site only.
  const [experience, setExperience] = useState<'upgrade' | 'new'>('upgrade')
  const effectiveExperience: 'upgrade' | 'new' = hasWebsite ? experience : 'new'
  const [stage, setStage] = useState<Stage>('idle')
  const [progressPct, setProgressPct] = useState(0)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [configId, setConfigId] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState('')
  const [questions, setQuestions] = useState<ClarifyQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [answering, setAnswering] = useState(false)
  const [ctaDismissed, setCtaDismissed] = useState(false)

  const [claim, setClaim] = useState({
    name: '', business: '', email: '', phone: '', smsConsent: false,
    mode: 'existing' as 'existing' | 'new', niche: '', city: '', state: '', style: 'editorial' as (typeof styleOptions)[number]['id'],
  })
  const [claimState, setClaimState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current) }, [])

  useEffect(() => {
    if (businessName && !claim.business) setClaim(c => ({ ...c, business: businessName }))
  }, [businessName]) // eslint-disable-line react-hooks/exhaustive-deps

  async function getTurnstileToken(): Promise<string> {
    if (!TURNSTILE_SITE_KEY) return ''
    if (!window.turnstile) {
      await new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.async = true
        script.onload = () => resolve()
        document.head.appendChild(script)
      })
    }
    return new Promise((resolve) => {
      const container = document.createElement('div')
      document.body.appendChild(container)
      window.turnstile?.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'invisible',
        callback: (token: string) => { resolve(token); container.remove() },
      })
      setTimeout(() => resolve(''), 8000)
    })
  }

  function pollStatus(id: string) {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${RECEPTION_URL}/preview/status/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong.')
        setStage(data.stage)
        setProgressPct(data.progressPct ?? 0)
        if (data.stage === 'needs_input') {
          setQuestions(Array.isArray(data.questions) ? data.questions : [])
          if (data.businessName) setBusinessName(data.businessName)
          if (pollRef.current) clearInterval(pollRef.current)
        } else if (data.stage === 'ready') {
          setConfigId(data.configId ?? null)
          if (data.businessName) setBusinessName(data.businessName)
          if (pollRef.current) clearInterval(pollRef.current)
        } else if (data.stage === 'failed') {
          setErrorMsg(data.error || "We couldn't reach that site — check the URL or try a different page.")
          if (pollRef.current) clearInterval(pollRef.current)
        }
      } catch (e: any) {
        setErrorMsg(e.message || 'Something went wrong.')
        setStage('failed')
        if (pollRef.current) clearInterval(pollRef.current)
      }
    }, 1500)
  }

  async function startPreview(e: React.FormEvent) {
    e.preventDefault()
    const filled = sources.filter(sourceFilled)
    if (filled.length === 0) return
    setErrorMsg('')
    setStage('reading')
    setProgressPct(5)
    try {
      const turnstileToken = await getTurnstileToken()
      const res = await fetch(`${RECEPTION_URL}/preview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sources: filled.map(s => s.type === 'website'
            ? { type: s.type, url: s.url.trim() }
            : { type: s.type, url: s.url.trim() || undefined, text: s.text.trim() }),
          experience: effectiveExperience,
          turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setPreviewId(data.previewId)
      setClaim(c => ({ ...c, mode: effectiveExperience === 'new' ? 'new' : 'existing' }))
      pollStatus(data.previewId)
    } catch (e: any) {
      setErrorMsg(e.message || 'Something went wrong. Please try again.')
      setStage('failed')
    }
  }

  async function submitAnswers(skipAll = false) {
    if (!previewId) return
    setAnswering(true)
    setErrorMsg('')
    try {
      const res = await fetch(`${RECEPTION_URL}/preview/answer/${previewId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: skipAll ? {} : answers }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setQuestions([])
      setStage('understanding')
      setProgressPct(55)
      pollStatus(previewId)
    } catch (e: any) {
      setErrorMsg(e.message || 'Something went wrong. Please try again.')
    } finally {
      setAnswering(false)
    }
  }

  function updateSource(i: number, patch: Partial<SourceDraft>) {
    setSources(prev => prev.map((s, j) => j === i ? { ...s, ...patch } : s))
  }
  function addSource() {
    setSources(prev => {
      if (prev.length >= MAX_SOURCES) return prev
      // Next unused type; only one website allowed.
      const used = new Set(prev.map(s => s.type))
      const next = SOURCE_TABS.find(t => !used.has(t.type))?.type ?? 'text'
      return [...prev, emptySource(next)]
    })
  }
  function removeSource(i: number) {
    setSources(prev => prev.length > 1 ? prev.filter((_, j) => j !== i) : prev)
  }

  function setAnswer(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function resetPreview() {
    if (pollRef.current) clearInterval(pollRef.current)
    setStage('idle'); setProgressPct(0); setPreviewId(null); setConfigId(null); setBusinessName(''); setErrorMsg(''); setCtaDismissed(false)
    setQuestions([]); setAnswers({})
  }

  const sourcesSummary = sources.filter(sourceFilled).map(s => s.type === 'website' ? s.url.trim() : s.type === 'text' ? 'description' : s.type).join(' + ')

  async function submitClaim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setClaimState('sending')
    const consentLanguage = 'I agree to receive recurring SMS messages from WebCrew about my enquiry, requested demo, and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe or HELP for help. Privacy: https://webcrew.app/privacy. Terms: https://webcrew.app/terms.'
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'https://api.webcrew.app'}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: claim.name.trim().split(' ')[0],
          lastName: claim.name.trim().split(' ').slice(1).join(' '),
          businessName: claim.business || businessName || 'Not provided',
          businessNiche: claim.mode === 'new' ? (claim.niche || 'Other local business') : 'AI SalesPerson preview claim',
          phone: claim.phone,
          email: claim.email,
          currentWebsite: urlInput || undefined,
          interestOnly: claim.mode === 'existing',
          templateStyle: claim.mode === 'new' ? claim.style : undefined,
          city: claim.mode === 'new' ? claim.city : undefined,
          state: claim.mode === 'new' ? claim.state : undefined,
          previewConfigId: configId ?? undefined,
          service: 'AI SalesPerson preview claim',
          message: claim.mode === 'new'
            ? `Saw their AI SalesPerson preview (${sourcesSummary}) and asked for a brand-new site instead (style: ${claim.style}).`
            : `Claimed their AI SalesPerson preview (${sourcesSummary}) — add AI to existing site, no rebuild.`,
          smsConsent: claim.smsConsent,
          consentTimestamp: claim.smsConsent ? new Date().toISOString() : undefined,
          consentLanguage: claim.smsConsent ? consentLanguage : undefined,
          source: 'webcrew.app/preview',
          submittedAt: new Date().toISOString(),
          referredBy: getReferralCode() || undefined,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setClaimState('sent')
    } catch {
      setClaimState('error')
    }
  }

  const links = [['How it works', '#how-it-works'], ['FAQ', '#faq']]
  const showProgress = stage !== 'idle' && stage !== 'failed' && stage !== 'needs_input'
  const showPreview = stage === 'ready' && configId && previewId

  return (
    <div className="wpl-page">
      <div className="wpl-topbar"><span className="wpl-pulse" />Free preview · No card required · Your real site untouched</div>
      <nav className="wpl-nav">
        <a href="#top" className="wpl-logo" aria-label="WebCrew home"><BrandMark size={32} className="wpl-logo-pop" />WebCrew</a>
        <div className="wpl-navlinks">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <a className="wpl-cta" href="#url-form"><span>Try it free</span><ArrowRight size={17} strokeWidth={2.5} /></a>
        <button className="wpl-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="wpl-mobile-nav">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#url-form" onClick={() => setMenuOpen(false)}>Try it free →</a></div>}

      <main id="top">
        <section className={`wpl-hero${stage === 'idle' ? ' has-visual' : ''}`} id="url-form">
          <div className="wpl-hero-grid">
            <div className="wpl-hero-copy">
              <div className="wpl-pill"><Zap size={14} /> Website, Facebook, Instagram — or just tell us about it.</div>
              <h1>Turn your website into an <em>AI SalesPerson.</em><span className="wpl-h1-alt">Or get a brand-new website that grows your business.</span></h1>
              <p>No website? No problem. Start from your website, your Facebook or Instagram page, or a few sentences about your business. We&rsquo;ll show you a live, talking AI SalesPerson built from it. Nothing on your real pages changes.</p>

              {stage === 'idle' || stage === 'failed' ? (
                <form className="wpl-sources" onSubmit={startPreview}>
                  <p className="wpl-sources-q">How does your business show up online?</p>
                  {sources.map((src, i) => (
                    <div className="wpl-source" key={i}>
                      <div className="wpl-source-tabs" role="radiogroup" aria-label={`Source ${i + 1} type`}>
                        {SOURCE_TABS.map(t => {
                          const taken = t.type === 'website' && src.type !== 'website' && sources.some(s => s.type === 'website')
                          return (
                            <button
                              type="button" key={t.type} role="radio" aria-checked={src.type === t.type} disabled={taken}
                              className={src.type === t.type ? 'on' : ''}
                              onClick={() => updateSource(i, { type: t.type, url: '' })}
                            >{t.label}</button>
                          )
                        })}
                        {sources.length > 1 && (
                          <button type="button" className="wpl-source-remove" aria-label={`Remove source ${i + 1}`} onClick={() => removeSource(i)}><X size={14} /></button>
                        )}
                      </div>
                      {src.type === 'website' ? (
                        <input type="text" value={src.url} onChange={e => updateSource(i, { url: e.target.value })} placeholder="yourbusiness.com" aria-label="Your website URL" />
                      ) : (
                        <>
                          {src.type !== 'text' && (
                            <input type="text" value={src.url} onChange={e => updateSource(i, { url: e.target.value })}
                              placeholder={src.type === 'facebook' ? 'facebook.com/yourpage (optional)' : 'instagram.com/yourprofile (optional)'}
                              aria-label={`${src.type === 'facebook' ? 'Facebook' : 'Instagram'} link (optional)`} />
                          )}
                          <textarea rows={4} value={src.text} onChange={e => updateSource(i, { text: e.target.value })}
                            aria-label={src.type === 'text' ? 'Describe your business' : 'Paste your About text'}
                            placeholder={src.type === 'text'
                              ? 'What you do, where you work, your hours, and the number customers call. E.g. "Family HVAC shop in Tracy, CA. AC repair and furnace installs. Mon–Fri 8–5. (209) 555-0100."'
                              : `Paste the About section from your ${src.type === 'facebook' ? 'Facebook Page' : 'Instagram profile'}: services, area, hours, phone.`} />
                          {src.type !== 'text' && <small className="wpl-source-note">We don&rsquo;t log in to or read your profile. We only use what you paste here.</small>}
                        </>
                      )}
                    </div>
                  ))}
                  <p className="wpl-sources-q">What would you like to see?</p>
                  <div className="wpl-experience" role="radiogroup" aria-label="What would you like to see?">
                    {hasWebsite && (
                      <button type="button" role="radio" aria-checked={effectiveExperience === 'upgrade'} className={effectiveExperience === 'upgrade' ? 'on' : ''} onClick={() => setExperience('upgrade')}>
                        <b>Keep my website, add AI</b>
                        <span>Your site, brand and domain stay the same. We add AI chat + voice that answers, qualifies and books.</span>
                      </button>
                    )}
                    <button type="button" role="radio" aria-checked={effectiveExperience === 'new'} className={effectiveExperience === 'new' ? 'on' : ''} onClick={() => setExperience('new')}>
                      <b>{hasWebsite ? 'Build me a new AI-ready website' : 'Build me an AI-ready website'}</b>
                      <span>A modern site built from your info{hasWebsite ? ', keeping your name and branding' : ''}, with AI chat + voice built in.</span>
                    </button>
                  </div>
                  <small className="wpl-source-note">Either way, AI phone answering can be added to your business number.</small>
                  <div className="wpl-sources-actions">
                    {sources.length < MAX_SOURCES && (
                      <button type="button" className="wpl-source-add" onClick={addSource}><Plus size={15} /> Add another source</button>
                    )}
                    <button type="submit" className="wpl-source-go" disabled={!sources.some(sourceFilled)}><span>See my AI SalesPerson</span><ArrowRight size={17} strokeWidth={2.5} /></button>
                  </div>
                </form>
              ) : null}

              {stage === 'failed' && errorMsg && <p className="wpl-error"><X size={14} /> {errorMsg}</p>}

              {stage === 'needs_input' && (
                <form className="wpl-questions" onSubmit={e => { e.preventDefault(); submitAnswers() }}>
                  <p className="wpl-questions-intro">
                    We read {businessName ? <b>{businessName}</b> : 'your site'}, but couldn&rsquo;t confirm a few things. Your AI only says what you confirm &mdash; skip anything you&rsquo;re not sure about and it won&rsquo;t mention it.
                  </p>
                  {questions.map(q => (
                    <fieldset key={q.key} className="wpl-q">
                      <legend>{q.label}</legend>
                      <small>{q.why}</small>
                      {q.kind === 'choice' ? (
                        <div className="wpl-q-options" role="radiogroup" aria-label={q.label}>
                          {q.options?.map(o => (
                            <button
                              type="button" key={o.value} role="radio" aria-checked={answers[q.key] === o.value}
                              className={answers[q.key] === o.value ? 'on' : ''}
                              onClick={() => setAnswer(q.key, answers[q.key] === o.value ? '' : o.value)}
                            >{o.label}</button>
                          ))}
                        </div>
                      ) : q.kind === 'list' ? (
                        <textarea rows={2} value={answers[q.key] ?? ''} onChange={e => setAnswer(q.key, e.target.value)} placeholder={q.hint ? `e.g. ${q.hint}` : 'Separate with commas'} />
                      ) : (
                        <input type={q.key === 'phone' ? 'tel' : 'text'} value={answers[q.key] ?? ''} onChange={e => setAnswer(q.key, e.target.value)} placeholder={q.hint} />
                      )}
                      {q.key === 'hours' && answers.hours === 'other' && (
                        <input type="text" value={answers.hours_other ?? ''} onChange={e => setAnswer('hours_other', e.target.value)} placeholder="e.g. Tue–Sat 7am–3pm" aria-label="Your hours" />
                      )}
                    </fieldset>
                  ))}
                  {errorMsg && <p className="wpl-error"><X size={14} /> {errorMsg}</p>}
                  <div className="wpl-q-actions">
                    <button type="submit" disabled={answering}>{answering ? <Loader2 size={16} className="wpl-spin" /> : null}<span>Build my preview</span><ArrowRight size={17} strokeWidth={2.5} /></button>
                    <button type="button" className="wpl-q-skip" disabled={answering} onClick={() => submitAnswers(true)}>Skip all</button>
                  </div>
                </form>
              )}

              {showProgress && (
                <div className="wpl-progress">
                  <div className="wpl-progress-stages">
                    {STAGE_ORDER.map((s) => {
                      const idx = STAGE_ORDER.indexOf(s)
                      const currentIdx = STAGE_ORDER.indexOf(stage)
                      const done = idx < currentIdx || stage === 'ready'
                      const active = s === stage
                      return (
                        <div key={s} className={`wpl-progress-step${done ? ' done' : ''}${active ? ' active' : ''}`}>
                          <span>{done ? <Check size={13} /> : active ? <Loader2 size={13} className="wpl-spin" /> : idx + 1}</span>
                          {STAGE_COPY[s as Exclude<Stage, 'idle' | 'failed'>]}
                        </div>
                      )
                    })}
                  </div>
                  <div className="wpl-progress-bar"><div style={{ width: `${progressPct}%` }} /></div>
                </div>
              )}

              <div className="wpl-trust-row"><span><CheckCircle2 /> Free, no card required</span><span><CheckCircle2 /> Your real site is never touched</span><span><CheckCircle2 /> Talk to it live, right now</span></div>
            </div>

            {stage === 'idle' && (
              <div className="wpl-hero-visual" aria-hidden="true">
                <div className="wpl-mock-browser">
                  <div className="wpl-mock-bar"><span /><span /><span /><em>yourbusiness.com</em></div>
                  <div className="wpl-mock-nav"><b>Your Business</b><div><span>Home</span><span>Services</span><span>About</span><span>Contact</span></div></div>
                  <div className="wpl-mock-banner">
                    <small>OPEN NOW</small>
                    <h4>Quality service,<br />every time.</h4>
                    <p>Fast, reliable, and affordable — right in your neighborhood.</p>
                    <div className="wpl-mock-btns"><span className="primary">Book Now</span><span>Our Services</span></div>
                  </div>
                  <div className="wpl-mock-cards"><div /><div /><div /><div /></div>
                </div>
                <div className="wpl-mock-widget">
                  <div className="wpl-mock-widget-top"><i />AI on site</div>
                  <div className="wpl-mock-widget-name"><span className="wpl-mock-avatar" />Hi! I&rsquo;m your AI SalesPerson 👋</div>
                  <ul>
                    <li><Check size={11} /> Answers questions</li>
                    <li><Check size={11} /> Checks availability</li>
                    <li><Check size={11} /> Books appointments</li>
                  </ul>
                  <div className="wpl-mock-widget-input">Type a message…<Zap size={12} /></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {showPreview && (
          <section className="wpl-reveal" data-avatar-caption="That's a real, live AI SalesPerson — try talking to it.">
            <Eyebrow>Your preview is ready</Eyebrow>
            <h2>Meet {businessName || 'your business'}&rsquo;s <em>new AI SalesPerson.</em></h2>
            <p>This is live — try the chat bubble in the bottom corner of the preview below. It knows your services, hours, and pricing because it just read your site.</p>
            <div className="wpl-iframe-wrap">
              <iframe src={`${RECEPTION_URL}/preview/${previewId}`} title="Your AI SalesPerson preview" loading="lazy" />
            </div>
            <button className="wpl-try-another" onClick={resetPreview}>Try a different website</button>
          </section>
        )}

        <section className="wpl-section wpl-solution" id="how-it-works" data-avatar-caption="This is what your AI SalesPerson actually does for every visitor.">
          <Eyebrow>What it actually does</Eyebrow>
          <div className="wpl-split-head"><h2>Every visitor gets<br /><em>a real conversation.</em></h2><p>Not a script. Not a form. A real AI SalesPerson that knows your business and works the room for you, 24/7.</p></div>
          <div className="wpl-card-grid">{solutionCards.map(({ icon: Icon, title, body }, i) => <article key={title}><span className="wpl-card-num">0{i + 1}</span><div className="wpl-icon"><Icon /></div><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="wpl-dark wpl-live-demo" data-avatar-caption="Not a mockup — call the number and hear it live.">
          <div className="wpl-dark-inner">
            <div><Eyebrow light>Live product proof</Eyebrow><h2>Don&rsquo;t take our word for it — <em>test it yourself.</em></h2><p>Call our live WebCrew AI Reception line and see how a real conversation with your AI SalesPerson goes.</p><a className="wpl-live-call" href={`tel:${AI_RECEPTION_PHONE}`}><PhoneCall size={18} /> <span>Call <strong>(918) 255-5151</strong><small>Live AI Reception · test it now</small></span><ArrowRight size={17} /></a></div>
            <div className="wpl-dark-feed">{['Visitor pastes their URL', 'AI reads + understands the business', 'Live AI SalesPerson preview appears', 'Visitor talks to it directly', 'Lead captured automatically'].map((x, i) => <div key={x}><i>{i + 1}</i><b>{x}</b><CheckCircle2 /></div>)}</div>
          </div>
        </section>

        <section className="wpl-section wpl-faq" id="faq"><Eyebrow>FAQ</Eyebrow><h2>Everything practical. <em>Answered.</em></h2><div className="wpl-faq-list">{faqs.map(([q, a], i) => <button key={q} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span><b>{q}</b><p style={{ display: openFaq === i ? 'block' : 'none' }}>{a}</p></span><ChevronDown className={openFaq === i ? 'open' : ''} /></button>)}</div></section>

        <section className="wpl-final" id="claim"><div className="wpl-final-glow" /><div className="wpl-final-grid"><div className="wpl-final-copy"><div className="wpl-pill dark"><Sparkles size={14} /> $0 setup · 30-day free trial</div><h2>Ready to make it <em>real?</em></h2><p>We&rsquo;ll add this exact AI SalesPerson to your existing website — one line of code, no rebuild, no downtime. Or if you&rsquo;d rather have a brand-new site instead, we build that overnight too.</p></div>
          {claimState === 'sent' ? <div className="wpl-claim-success"><CheckCircle2 /><h3>Got it.</h3><p>{claim.mode === 'new' ? "We're building your brand-new site now — you'll get a text with the live link." : "We'll follow up to get your AI SalesPerson live on your real site."} {claim.smsConsent ? 'Watch for a text from WebCrew.' : "We'll reach out by email or phone."}</p></div> :
          <form className="wpl-claim-form" onSubmit={submitClaim}>
            <div className="wpl-form-head"><b>Claim this AI SalesPerson</b><small>Takes under a minute</small></div>
            <div className="wpl-mode-toggle">
              {urlInput && <button type="button" className={claim.mode === 'existing' ? 'active' : ''} onClick={() => setClaim({ ...claim, mode: 'existing' })}>Add AI to my current site</button>}
              <button type="button" className={claim.mode === 'new' ? 'active' : ''} onClick={() => setClaim({ ...claim, mode: 'new' })}>Build me a brand-new site</button>
            </div>
            <div className="wpl-field-grid"><label><span>Your name *</span><input required autoComplete="name" value={claim.name} onChange={e => setClaim({ ...claim, name: e.target.value })} placeholder="Jordan Smith" /></label><label><span>Business name *</span><input required autoComplete="organization" value={claim.business} onChange={e => setClaim({ ...claim, business: e.target.value })} placeholder="Smith Plumbing" /></label></div>
            <div className="wpl-field-grid"><label><span>Work email *</span><input required type="email" autoComplete="email" value={claim.email} onChange={e => setClaim({ ...claim, email: e.target.value })} placeholder="jordan@business.com" /></label><label><span>Mobile phone *</span><input required type="tel" autoComplete="tel" value={claim.phone} onChange={e => setClaim({ ...claim, phone: e.target.value })} placeholder="(555) 555-0123" /></label></div>
            {claim.mode === 'new' && (
              <>
                <div className="wpl-field-grid"><label><span>City *</span><input required value={claim.city} onChange={e => setClaim({ ...claim, city: e.target.value })} placeholder="Tracy" /></label><label><span>State *</span><input required maxLength={2} value={claim.state} onChange={e => setClaim({ ...claim, state: e.target.value.toUpperCase() })} placeholder="CA" /></label></div>
                <div className="wpl-field-grid">
                  <label><span>Business type *</span><select required value={claim.niche} onChange={e => setClaim({ ...claim, niche: e.target.value })}><option value="">Select one</option>{industries.map(x => <option key={x}>{x}</option>)}<option>Other local business</option></select></label>
                  <label><span>Website style *</span><select required value={claim.style} onChange={e => setClaim({ ...claim, style: e.target.value as typeof claim.style })}>{styleOptions.map(s => <option key={s.id} value={s.id}>{s.name} — {s.tagline}</option>)}</select></label>
                </div>
              </>
            )}
            <label className="wpl-consent"><input type="checkbox" required checked={claim.smsConsent} onChange={e => setClaim({ ...claim, smsConsent: e.target.checked })} /><span><strong>Yes, I agree to receive recurring SMS messages from WebCrew</strong> about my enquiry and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for help. <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> &amp; <a href="/terms" target="_blank" rel="noreferrer">Terms</a>.</span></label>
            {claimState === 'error' && <p className="wpl-form-error">We couldn&rsquo;t submit this. Please try again or email hello@webcrew.app.</p>}
            <button className="wpl-submit" disabled={claimState === 'sending'}>{claimState === 'sending' ? 'Sending…' : claim.mode === 'new' ? <>Build my new site <ArrowRight size={17} /></> : <>Claim my AI SalesPerson <ArrowRight size={17} /></>}</button>
            <small className="wpl-form-note">SMS consent is required to submit this, but is never a condition of any purchase.</small>
          </form>}
        </div></section>
      </main>

      <footer className="wpl-footer"><a href="#top" className="wpl-logo"><BrandMark size={32} />WebCrew</a><p>AI front office for local businesses.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@webcrew.app">Contact</a></div></footer>

      {showPreview && !ctaDismissed && (
        <div className="wpl-sticky-cta">
          <span><strong>{businessName || 'This business'}&rsquo;s</strong> AI SalesPerson is live above — claim it and go live this week.</span>
          <a href="#claim">Claim this site<ArrowRight size={15} /></a>
          <button aria-label="Dismiss" onClick={() => setCtaDismissed(true)}><X size={15} /></button>
        </div>
      )}
      {showPreview && ctaDismissed && (
        <button className="wpl-sticky-pill" onClick={() => setCtaDismissed(false)}><Sparkles size={14} /> Claim this AI SalesPerson</button>
      )}

      <style>{`
        :root{--wc-navy:#0d172b;--wc-navy2:#172238;--wc-orange:#ff6b1a;--wc-bg:#f6f7f9;--wc-ink:#10182b;--wc-muted:#667085;--wc-line:#e5e8ee}
        .wpl-page{visibility:visible;background:var(--wc-bg);color:var(--wc-ink);font-family:var(--font-body);overflow:hidden}.wpl-page h1,.wpl-page h2,.wpl-page h3,.wpl-page b,.wpl-page strong,.wpl-page .wpl-logo{font-family:var(--font-display)}
        .wpl-page em{font-style:normal;color:var(--wc-orange)}.wpl-topbar{height:30px;background:var(--wc-navy);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;gap:8px}.wpl-pulse{width:7px;height:7px;border-radius:50%;background:#32d583;box-shadow:0 0 0 4px rgba(50,213,131,.12)}
        .wpl-nav{height:72px;max-width:1220px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}.wpl-logo{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--wc-ink);font-size:18px;font-weight:800}.wpl-navlinks{display:flex;gap:30px}.wpl-navlinks a,.wpl-footer a{color:var(--wc-muted);text-decoration:none;font-size:13px;font-weight:600}.wpl-navlinks a:hover{color:var(--wc-orange)}.wpl-menu,.wpl-mobile-nav{display:none}
        .wpl-cta{min-height:40px;padding:0 17px;border-radius:9px;background:var(--wc-orange);color:#fff;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--font-display);font-size:13px;font-weight:800;box-shadow:0 10px 28px rgba(255,107,26,.22);transition:.2s}.wpl-cta:hover{transform:translateY(-2px);background:#ed5d0b}
        .wpl-mobile-nav{position:absolute;z-index:20;top:102px;left:16px;right:16px;padding:18px;background:#fff;border:1px solid var(--wc-line);border-radius:12px;box-shadow:0 20px 40px rgba(15,23,42,.15);flex-direction:column}.wpl-mobile-nav a{padding:12px;color:var(--wc-ink);font-weight:700;text-decoration:none}
        .wpl-hero{max-width:1160px;margin:auto;padding:64px 24px 90px}.wpl-hero-grid{display:grid;grid-template-columns:1fr}
        .wpl-hero:not(.has-visual) .wpl-hero-grid{max-width:760px;margin:auto;text-align:center}
        .wpl-hero.has-visual .wpl-hero-grid{grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;text-align:left}
        .wpl-hero.has-visual .wpl-trust-row{justify-content:flex-start}.wpl-hero.has-visual .wpl-hero-copy>p{margin:0 0 34px}
        .wpl-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border:1px solid #ffd6be;background:#fff4ed;border-radius:99px;color:#a84308;text-transform:uppercase;letter-spacing:.06em;font-size:10px;font-weight:800;margin-bottom:22px}.wpl-pill.dark{color:#fff;border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.07)}
        .wpl-hero h1{font-size:clamp(38px,6vw,60px);line-height:1.04;letter-spacing:-.05em;margin:0 0 20px}.wpl-hero-copy>p{font-size:16px;line-height:1.7;color:var(--wc-muted);max-width:560px;margin:0 auto 34px}
        .wpl-hero-visual{position:relative}
        .wpl-mock-browser{background:#fff;border:1px solid var(--wc-line);border-radius:16px;overflow:hidden;box-shadow:0 30px 70px -20px rgba(13,23,43,.18)}
        .wpl-mock-bar{height:32px;background:#f3f4f6;display:flex;align-items:center;gap:6px;padding:0 12px}.wpl-mock-bar span{width:8px;height:8px;border-radius:50%;background:#d7dbe3}.wpl-mock-bar em{flex:1;text-align:center;font-style:normal;font-size:10px;color:#98a2b3}
        .wpl-mock-nav{height:46px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--wc-line)}.wpl-mock-nav b{font-size:12px;color:var(--wc-ink)}.wpl-mock-nav div{display:flex;gap:12px;font-size:9px;color:#98a2b3;font-weight:600}
        .wpl-mock-banner{padding:24px 20px;background:linear-gradient(135deg,var(--wc-navy),var(--wc-navy2));color:#fff}.wpl-mock-banner small{display:inline-block;background:rgba(255,255,255,.1);color:#9fe8c0;font-size:8px;font-weight:800;letter-spacing:.08em;padding:3px 8px;border-radius:99px;margin-bottom:10px}.wpl-mock-banner h4{margin:0 0 8px;font-size:18px;line-height:1.25;font-family:var(--font-display)}.wpl-mock-banner p{margin:0 0 14px;font-size:10px;color:#c3cadb;max-width:220px;line-height:1.5}
        .wpl-mock-btns{display:flex;gap:8px}.wpl-mock-btns span{font-size:9px;font-weight:800;padding:7px 12px;border-radius:99px}.wpl-mock-btns .primary{background:var(--wc-orange);color:#fff}.wpl-mock-btns span:not(.primary){border:1px solid rgba(255,255,255,.3);color:#fff}
        .wpl-mock-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:14px 18px 18px}.wpl-mock-cards div{height:34px;background:var(--wc-bg);border-radius:8px}
        .wpl-mock-widget{position:absolute;top:-18px;right:-18px;width:172px;background:#fff;border:1px solid var(--wc-line);border-radius:13px;padding:12px;box-shadow:0 20px 44px rgba(13,23,43,.22)}
        .wpl-mock-widget-top{display:flex;align-items:center;gap:6px;font-size:9px;font-weight:800;color:#18a874;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px}.wpl-mock-widget-top i{width:6px;height:6px;border-radius:50%;background:#18a874;display:inline-block}
        .wpl-mock-widget-name{display:flex;align-items:center;gap:7px;font-size:10px;font-weight:700;color:var(--wc-ink);margin-bottom:8px}.wpl-mock-avatar{width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,var(--wc-orange),#ffb37a);flex:0 0 22px}
        .wpl-mock-widget ul{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-direction:column;gap:5px}.wpl-mock-widget li{display:flex;align-items:center;gap:6px;font-size:9px;color:#475467}.wpl-mock-widget li svg{color:#18a874;flex:0 0 auto}
        .wpl-mock-widget-input{display:flex;align-items:center;justify-content:space-between;gap:6px;background:var(--wc-bg);border:1px solid var(--wc-line);border-radius:7px;padding:7px 8px;font-size:9px;color:#98a2b3}.wpl-mock-widget-input svg{color:var(--wc-orange);flex:0 0 auto}
        .wpl-url-form{display:flex;gap:10px;max-width:520px;margin:0 auto}.wpl-url-form input{flex:1;height:56px;padding:0 18px;border:2px solid var(--wc-line);border-radius:12px;font-size:15px;background:#fff;color:var(--wc-ink)}.wpl-url-form input:focus{outline:none;border-color:var(--wc-orange)}.wpl-url-form button{height:56px;padding:0 22px;border:0;border-radius:12px;background:var(--wc-orange);color:#fff;font-family:var(--font-display);font-weight:800;font-size:14px;display:flex;align-items:center;gap:9px;cursor:pointer;white-space:nowrap;box-shadow:0 10px 28px rgba(255,107,26,.22)}.wpl-url-form button:hover{background:#ed5d0b}
        .wpl-error{display:flex;align-items:center;justify-content:center;gap:6px;color:#b42318;font-size:13px;margin-top:16px}
        .wpl-h1-alt{display:block;font-size:.42em;line-height:1.25;margin-top:14px;color:#475467;font-weight:700;letter-spacing:0}.wpl-experience{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.wpl-experience button{text-align:left;border:2px solid var(--wc-line);background:#fff;border-radius:14px;padding:14px;font:inherit;cursor:pointer;display:grid;gap:4px}.wpl-experience button b{font-size:15px;color:var(--wc-ink)}.wpl-experience button span{font-size:13px;color:#667085;line-height:1.4}.wpl-experience button.on{border-color:var(--wc-orange);background:#fff8f3}
        .wpl-sources{max-width:560px;margin:0 auto;display:grid;gap:12px;text-align:left}.wpl-sources-q{margin:0;font-weight:700;font-size:15px;color:var(--wc-ink)}.wpl-source{display:grid;gap:8px;background:#fff;border:1px solid var(--wc-line);border-radius:14px;padding:12px}.wpl-source-tabs{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.wpl-source-tabs button{border:1px solid var(--wc-line);background:#fff;border-radius:999px;padding:7px 12px;font:inherit;font-size:13px;font-weight:600;color:#344054;cursor:pointer}.wpl-source-tabs button.on{border-color:var(--wc-orange);background:#fff4ed;color:var(--wc-ink)}.wpl-source-tabs button:disabled{opacity:.4;cursor:not-allowed}.wpl-source-tabs .wpl-source-remove{margin-left:auto;border:0;padding:6px;display:grid;place-items:center;color:#667085}.wpl-source input,.wpl-source textarea{width:100%;box-sizing:border-box;border:2px solid var(--wc-line);border-radius:10px;padding:12px 14px;font:inherit;font-size:15px;color:var(--wc-ink);background:#fff}.wpl-source input:focus,.wpl-source textarea:focus{outline:none;border-color:var(--wc-orange)}.wpl-source textarea{resize:vertical}.wpl-source-note{color:#667085;font-size:12px}.wpl-sources-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between}.wpl-source-add{display:inline-flex;align-items:center;gap:6px;border:1px dashed #c4cad6;background:none;border-radius:999px;padding:10px 14px;font:inherit;font-size:13.5px;font-weight:700;color:#344054;cursor:pointer}.wpl-source-go{height:52px;padding:0 22px;border:0;border-radius:12px;background:var(--wc-orange);color:#fff;font-family:var(--font-display);font-weight:800;font-size:14px;display:flex;align-items:center;gap:9px;cursor:pointer;box-shadow:0 10px 28px rgba(255,107,26,.22);margin-left:auto}.wpl-source-go:disabled{opacity:.5;cursor:default}
        .wpl-questions{max-width:560px;margin:0 auto;display:grid;gap:14px;text-align:left}.wpl-questions-intro{font-size:14px;color:#475467;margin:0}.wpl-q{border:1px solid var(--wc-line);border-radius:14px;padding:14px 16px;margin:0;background:#fff;display:grid;gap:8px;min-width:0}.wpl-q legend{font-weight:700;font-size:15px;color:var(--wc-ink);padding:0}.wpl-q small{color:#667085;font-size:12.5px}.wpl-q input,.wpl-q textarea{width:100%;box-sizing:border-box;border:1px solid var(--wc-line);border-radius:10px;padding:10px 12px;font:inherit;font-size:15px;color:var(--wc-ink);background:#fff}.wpl-q-options{display:flex;flex-wrap:wrap;gap:8px}.wpl-q-options button{border:1px solid var(--wc-line);background:#fff;border-radius:999px;padding:8px 14px;font:inherit;font-size:13.5px;font-weight:600;color:#344054;cursor:pointer}.wpl-q-options button.on{border-color:var(--wc-orange);background:#fff4ed;color:var(--wc-ink)}.wpl-q-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.wpl-q-actions button[type=submit]{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:13px 22px;background:var(--wc-orange);color:#fff;font:inherit;font-weight:700;cursor:pointer}.wpl-q-actions button:disabled{opacity:.6;cursor:default}.wpl-q-skip{border:0;background:none;color:#667085;font:inherit;font-weight:600;text-decoration:underline;cursor:pointer}
        .wpl-progress{max-width:520px;margin:0 auto}.wpl-progress-stages{display:grid;gap:10px;margin-bottom:16px;text-align:left}.wpl-progress-step{display:flex;align-items:center;gap:12px;font-size:13px;color:#98a2b3;font-weight:600}.wpl-progress-step.done{color:#079455}.wpl-progress-step.active{color:var(--wc-ink)}.wpl-progress-step span{width:24px;height:24px;border-radius:50%;background:var(--wc-line);color:#98a2b3;display:grid;place-items:center;font-size:11px;font-weight:800;flex:0 0 24px}.wpl-progress-step.done span{background:#edfdf7;color:#079455}.wpl-progress-step.active span{background:#fff4ed;color:var(--wc-orange)}.wpl-spin{animation:wpl-spin 1s linear infinite}@keyframes wpl-spin{to{transform:rotate(360deg)}}
        .wpl-progress-bar{height:6px;border-radius:99px;background:var(--wc-line);overflow:hidden}.wpl-progress-bar>div{height:100%;background:var(--wc-orange);transition:width .4s ease}
        .wpl-trust-row{display:flex;gap:20px;margin-top:34px;flex-wrap:wrap;justify-content:center}.wpl-trust-row span{display:flex;align-items:center;gap:5px;font-size:11px;color:#475467;font-weight:600}.wpl-trust-row svg{width:14px;color:#18a874}
        .wpl-reveal{max-width:900px;margin:0 auto 90px;padding:0 24px;text-align:center}.wpl-reveal h2{font-size:clamp(28px,3.6vw,42px);letter-spacing:-.04em;margin:14px 0}.wpl-reveal>p{color:var(--wc-muted);font-size:14px;max-width:560px;margin:0 auto 28px}
        .wpl-iframe-wrap{border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(15,23,42,.18);border:1px solid var(--wc-line)}.wpl-iframe-wrap iframe{width:100%;height:640px;border:0;display:block}
        .wpl-try-another{margin-top:20px;background:none;border:0;color:var(--wc-muted);font-size:12px;font-weight:700;text-decoration:underline;cursor:pointer}
        .wpl-section{padding:100px max(24px,calc((100vw - 1172px)/2))}.wpl-eyebrow{display:flex;align-items:center;gap:9px;color:var(--wc-orange);text-transform:uppercase;font-size:10px;letter-spacing:.15em;font-weight:800;margin-bottom:18px;justify-content:center}.wpl-eyebrow span{width:20px;height:2px;background:currentColor}.wpl-eyebrow.light{color:#ff8e4d}
        .wpl-solution{background:#fff;text-align:center}.wpl-split-head{max-width:640px;margin:0 auto 50px}.wpl-split-head h2{font-size:clamp(30px,4vw,46px);line-height:1.08;letter-spacing:-.045em}.wpl-split-head p{color:var(--wc-muted);font-size:15px;line-height:1.75;margin-top:16px}
        .wpl-card-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;text-align:left}.wpl-card-grid article{padding:24px 20px;background:var(--wc-bg);border:1px solid var(--wc-line);border-radius:14px;min-height:220px;position:relative}.wpl-card-num{position:absolute;right:17px;top:15px;color:#dfe3ea;font-size:20px;font-weight:800}.wpl-icon{width:39px;height:39px;border-radius:10px;background:#fff0e7;color:var(--wc-orange);display:grid;place-items:center;margin:28px 0 20px}.wpl-icon svg{width:19px}.wpl-card-grid h3{font-size:16px;margin-bottom:8px}.wpl-card-grid p{font-size:12px;line-height:1.6;color:var(--wc-muted)}
        .wpl-dark{background:var(--wc-navy);color:#fff}.wpl-dark-inner{max-width:1172px;margin:auto;padding:100px 0;display:grid;grid-template-columns:.82fr 1fr;gap:90px;align-items:center}.wpl-dark-inner h2{font-size:clamp(30px,4vw,46px);line-height:1.08;letter-spacing:-.045em}.wpl-dark-inner>div:first-child>p{color:#aab3c3;line-height:1.75;font-size:14px;margin:18px 0 26px}.wpl-live-call{display:inline-flex;align-items:center;gap:12px;padding:14px 17px;border-radius:11px;background:#fff;color:var(--wc-navy);text-decoration:none;font-family:var(--font-display);font-weight:800}.wpl-live-call>svg:first-child,.wpl-live-call>svg:last-child{color:var(--wc-orange)}.wpl-live-call span{display:flex;flex-direction:column;font-size:12px}.wpl-live-call small{font:500 9px var(--font-body);color:#667085;margin-top:3px}
        .wpl-dark-feed{background:var(--wc-navy2);border:1px solid #273249;border-radius:15px;padding:15px}.wpl-dark-feed>div{display:grid;grid-template-columns:28px 1fr 20px;gap:13px;align-items:center;padding:16px 8px;border-bottom:1px solid #29344a}.wpl-dark-feed>div:last-child{border:0}.wpl-dark-feed i{width:25px;height:25px;border-radius:7px;background:#29344a;color:var(--wc-orange);display:grid;place-items:center;font-size:9px;font-style:normal;font-weight:800}.wpl-dark-feed b{font-size:11px}.wpl-dark-feed svg{width:15px;color:#29c486}
        .wpl-faq{text-align:center;background:#fff}.wpl-faq h2{font-size:clamp(30px,4vw,46px);letter-spacing:-.045em}.wpl-faq-list{max-width:800px;margin:40px auto 0;text-align:left}.wpl-faq-list button{width:100%;border:1px solid var(--wc-line);background:var(--wc-bg);border-radius:10px;padding:17px 18px;margin-bottom:9px;display:flex;justify-content:space-between;text-align:left;cursor:pointer;color:var(--wc-ink)}.wpl-faq-list b{font-size:12px}.wpl-faq-list p{font-size:11px;line-height:1.65;color:var(--wc-muted);font-weight:400;margin-top:11px;max-width:680px}.wpl-faq-list svg{width:16px;transition:.2s}.wpl-faq-list svg.open{transform:rotate(180deg)}
        .wpl-final{position:relative;background:var(--wc-navy);color:#fff;padding:100px 24px;overflow:hidden}.wpl-final>*{position:relative}.wpl-final-glow{position:absolute;width:800px;height:500px;left:20%;top:35%;transform:translate(-50%,-50%);background:radial-gradient(ellipse,rgba(255,107,26,.16),transparent 68%)}.wpl-final-grid{max-width:1172px;margin:auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:80px;align-items:start}.wpl-final-copy h2{font-size:clamp(34px,5vw,54px);line-height:1.08;letter-spacing:-.045em;margin:20px 0 14px}.wpl-final-copy>p{color:#aab3c3;line-height:1.75;font-size:14px}
        .wpl-claim-form{background:#fff;color:var(--wc-ink);border-radius:17px;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.25)}.wpl-form-head{display:flex;flex-direction:column;padding-bottom:16px;margin-bottom:18px;border-bottom:1px solid var(--wc-line)}.wpl-form-head b{font-size:16px}.wpl-form-head small{color:var(--wc-muted);font-size:10px;margin-top:4px}
        .wpl-mode-toggle{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}.wpl-mode-toggle button{padding:11px 8px;border-radius:8px;border:2px solid var(--wc-line);background:var(--wc-bg);color:var(--wc-muted);font-size:11px;font-weight:800;cursor:pointer;text-align:center}.wpl-mode-toggle button.active{border-color:var(--wc-orange);background:#fff7f2;color:var(--wc-ink)}
        .wpl-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.wpl-claim-form label{display:block;margin-bottom:14px}.wpl-claim-form label>span{display:block;font-size:10px;font-weight:700;color:#475467;margin-bottom:7px}.wpl-claim-form input:not([type=checkbox]),.wpl-claim-form select{width:100%;height:44px;padding:0 12px;border:1px solid #d9dee7;border-radius:8px;background:#fff;color:var(--wc-ink);font:12px var(--font-body);outline:none}.wpl-claim-form input:focus,.wpl-claim-form select:focus{border-color:var(--wc-orange);box-shadow:0 0 0 3px rgba(255,107,26,.1)}
        .wpl-consent{display:flex!important;gap:10px;padding:13px;background:#f8f9fb;border:1px solid var(--wc-line);border-radius:8px}.wpl-consent input{width:17px;height:17px;flex:0 0 17px;margin-top:2px;accent-color:var(--wc-orange)}.wpl-consent>span{font-size:9px!important;line-height:1.55!important;font-weight:400!important;margin:0!important}.wpl-consent a{color:#c74e08}
        .wpl-submit{width:100%;height:auto;min-height:50px;padding:12px 18px;border:0;border-radius:9px;background:var(--wc-orange);color:#fff;font-family:var(--font-display);font-weight:800;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;line-height:1.25}.wpl-submit:disabled{opacity:.65;cursor:wait}.wpl-form-note{display:block;text-align:center;color:#98a2b3;font-size:8px;margin-top:11px}.wpl-form-error{color:#b42318;font-size:10px;margin:10px 0}
        .wpl-claim-success{background:#fff;color:var(--wc-ink);border-radius:17px;padding:50px;text-align:center}.wpl-claim-success>svg{width:48px;height:48px;color:#12a36f}.wpl-claim-success h3{font-size:25px;margin:18px 0 10px}.wpl-claim-success p{color:var(--wc-muted);font-size:13px;line-height:1.7}
        .wpl-footer{background:#080f1e;color:#fff;min-height:95px;display:flex;align-items:center;gap:30px;padding:0 max(24px,calc((100vw - 1172px)/2));border-top:1px solid #202b3f}.wpl-footer .wpl-logo{color:#fff}.wpl-footer p{font-size:10px;color:#667085}.wpl-footer>div{margin-left:auto;display:flex;gap:22px}
        .wpl-sticky-cta{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--wc-navy);color:#fff;padding:16px 24px;display:flex;align-items:center;justify-content:center;gap:20px;box-shadow:0 -10px 30px rgba(0,0,0,.15);flex-wrap:wrap}.wpl-sticky-cta span{font-size:13px;color:#c4cad5}.wpl-sticky-cta strong{color:#fff}.wpl-sticky-cta a{display:inline-flex;align-items:center;gap:7px;background:var(--wc-orange);color:#fff;padding:10px 16px;border-radius:9px;text-decoration:none;font-weight:800;font-size:13px;font-family:var(--font-display)}.wpl-sticky-cta button{background:none;border:0;color:#8490a5;cursor:pointer;padding:6px}
        .wpl-sticky-pill{position:fixed;right:24px;bottom:24px;z-index:30;display:flex;align-items:center;gap:8px;background:var(--wc-orange);color:#fff;border:0;padding:12px 18px;border-radius:99px;font-weight:800;font-size:12px;font-family:var(--font-display);cursor:pointer;box-shadow:0 14px 34px rgba(255,107,26,.3)}
        @media(prefers-reduced-motion:reduce){.wpl-page *{transition:none!important}.wpl-spin{animation:none}}
        @media(max-width:960px){.wpl-hero-visual{display:none}.wpl-hero.has-visual .wpl-hero-grid{grid-template-columns:1fr;max-width:760px;margin:auto;text-align:center}.wpl-hero.has-visual .wpl-trust-row{justify-content:center}}
        @media(max-width:900px){.wpl-navlinks,.wpl-nav>.wpl-cta{display:none}.wpl-menu{display:grid;place-items:center;border:0;background:none;color:var(--wc-ink)}.wpl-mobile-nav{display:flex}.wpl-card-grid{grid-template-columns:repeat(2,1fr)}.wpl-card-grid article:last-child{grid-column:span 2}.wpl-dark-inner{grid-template-columns:1fr;gap:40px;padding:80px 24px}.wpl-final-grid{grid-template-columns:1fr;gap:35px}}
        @media(max-width:600px){.wpl-topbar{font-size:9px}.wpl-nav{height:64px}.wpl-hero{padding:40px 20px 70px}.wpl-url-form{flex-direction:column}.wpl-card-grid{grid-template-columns:1fr}.wpl-card-grid article:last-child{grid-column:auto}.wpl-section{padding:70px 20px}.wpl-iframe-wrap iframe{height:520px}.wpl-final{padding:70px 20px}.wpl-field-grid{grid-template-columns:1fr}.wpl-claim-form{padding:20px}.wpl-footer{padding:28px 20px;align-items:flex-start;flex-wrap:wrap}.wpl-footer>div{width:100%;margin:0}.wpl-sticky-cta{flex-direction:column;text-align:center}}
      `}</style>
    </div>
  )
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`wpl-eyebrow${light ? ' light' : ''}`}><span />{children}</div>
}
