'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, BellRing, CalendarCheck, Check, CheckCircle2, ChevronDown,
  Clock3, Headphones, Menu, MessageSquareText, PhoneCall, ShieldCheck,
  Sparkles, TrendingUp, UserCheck, X,
} from 'lucide-react'
import BrandMark from './brand-mark'
import { getReferralCode } from '@/lib/referral'

const ORANGE = '#ff6b1a'
const AI_RECEPTION_PHONE = '+19182555151'

const solutionCards = [
  { icon: PhoneCall, title: 'Answers every call', body: 'Customers get an immediate response—even after hours, on weekends, or while you are busy.' },
  { icon: UserCheck, title: 'Qualifies the lead', body: 'WebCrew learns what they need, captures the important details, and filters real opportunities.' },
  { icon: CalendarCheck, title: 'Books the customer', body: 'When they are ready to schedule, WebCrew helps turn the conversation into an appointment.' },
  { icon: MessageSquareText, title: 'Follows up', body: 'No more leads disappearing because nobody remembered to call them back.' },
  { icon: BellRing, title: 'Keeps you informed', body: 'Know who called, what they wanted, and exactly what happened next.' },
]

const included = [
  'Custom website, built overnight, on your own domain — yours to keep',
  'AI receptionist that answers every call 24/7, in a voice tuned to your business',
  'Automatic appointment booking with confirmation',
  'Call transcript + summary sent after every call',
  'Instant SMS + email alert the moment a lead comes in',
  'Missed-call text-back — a caller who can\'t reach you still gets a reply in seconds',
  'Automatic lead follow-up (day 3, day 10) so a warm lead never goes cold',
  'Weekly Google Business Profile posts (52 a year) and auto-replies to every Google review',
  'Monthly traffic + ranking report, 97+ PageSpeed, SSL, mobile-perfect out of the box',
  'One flat price — $0 setup, 2-week free trial, then $299/mo, everything above included',
]

const industries = ['Contractors', 'Plumbers', 'Electricians', 'HVAC', 'Roofers', 'Cleaning', 'Auto services', 'Salons', 'Spas', 'Home services']
const industryPages: Record<string, string> = { Contractors: '/contractors', Plumbers: '/plumbing', Electricians: '/electricians', HVAC: '/hvac', Roofers: '/roofing', Cleaning: '/cleaning', 'Auto services': '/auto-services', Salons: '/salons', Spas: '/spas', 'Home services': '/home-services' }

const faqs = [
  ['What is WebCrew?', 'WebCrew is an AI front office for local businesses in the United States. It answers every inbound call 24/7, qualifies leads, books appointments, sends you a summary after every call, and follows up automatically — plus a custom website built overnight, weekly Google Business Profile posts, and automatic review replies, all in one flat monthly plan.'],
  ['Will WebCrew replace my phone number?', 'No. We work with your existing business flow and configure how calls should be answered, routed, summarized, and followed up.'],
  ['Can it answer after hours and on weekends?', 'Yes. WebCrew is designed to respond 24/7, so callers are not pushed into voicemail when your team is unavailable.'],
  ['How does WebCrew know what to say?', 'We learn your services, hours, service area, common questions, booking preferences, and escalation rules before you go live.'],
  ['How fast does WebCrew build a website?', 'Most clients wake up to a text with their live site link the morning after submitting the form — the AI pipeline builds and deploys a complete custom website in about 6 hours with no human involvement, averaging 97/100 on Google PageSpeed.'],
  ['What does WebCrew cost?', '$0 setup fee and a 2-week free trial. After that it is a flat $299/month — the website, AI receptionist, booking, lead alerts, weekly Google Business Profile posts, and review replies are all included, no add-ons or tiers.'],
  ['Can I see it work before committing?', 'Yes. Call the live AI Reception line at (918) 255-5151 to test it yourself, or request a walkthrough tailored to your business. No credit card or setup fee is required to see it working.'],
]

function Cta({ children = 'See what I’m losing', dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return (
    <a className={`wc2-cta${dark ? ' wc2-cta-dark' : ''}`} href="#lead-form">
      <span>{children}</span><ArrowRight size={17} strokeWidth={2.5} />
    </a>
  )
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`wc2-eyebrow${light ? ' light' : ''}`}><span />{children}</div>
}

export default function MissedCallLanding({ showPricing = false }: { showPricing?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [calls, setCalls] = useState(5)
  const [jobValue, setJobValue] = useState(500)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [lead, setLead] = useState({ name: '', business: '', email: '', phone: '', website: '', niche: '', pain: '', missedCalls: '', urgency: '', notes: '', smsConsent: false })
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const monthlyLeak = useMemo(() => calls * jobValue * 4, [calls, jobValue])

  useEffect(() => {
    const niche = new URLSearchParams(window.location.search).get('niche')
    if (niche && industries.includes(niche)) setLead(f => ({ ...f, niche }))
  }, [])

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLeadState('sending')
    const consentLanguage = 'I agree to receive recurring SMS messages from WebCrew about my enquiry, requested demo, and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe or HELP for help. Privacy: https://webcrew.app/privacy. Terms: https://webcrew.app/terms.'
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'https://api.webcrew.app'}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: lead.name.trim().split(' ')[0],
          lastName: lead.name.trim().split(' ').slice(1).join(' '),
          businessName: lead.business,
          businessNiche: lead.niche,
          phone: lead.phone,
          email: lead.email,
          currentWebsite: lead.website || undefined,
          service: 'AI front office enquiry',
          message: `Pain point: ${lead.pain || 'Not provided'} | Missed calls/week: ${lead.missedCalls || 'Not provided'} | Urgency: ${lead.urgency || 'Not provided'} | Prospect notes: ${lead.notes || 'Not provided'}`,
          painPoints: lead.pain,
          missedCalls: lead.missedCalls,
          urgency: lead.urgency,
          additionalNotes: lead.notes,
          smsConsent: lead.smsConsent,
          consentTimestamp: lead.smsConsent ? new Date().toISOString() : undefined,
          consentLanguage: lead.smsConsent ? consentLanguage : undefined,
          source: 'webcrew.app/missed-call-landing',
          submittedAt: new Date().toISOString(),
          referredBy: getReferralCode() || undefined,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setLeadState('sent')
    } catch {
      setLeadState('error')
    }
  }

  const links = [
    ['The problem', '#problem'], ['How it works', '#how-it-works'], ['What’s included', '#included'], ['Who it’s for', '#industries'], ['FAQ', '#faq'],
    ...(showPricing ? [['Pricing', '#pricing']] : []),
  ]

  return (
    <div className="wc2-page">
      <div className="wc2-topbar"><span className="wc2-pulse" />Available 24/7 · Answers instantly · Never forgets to follow up</div>
      <nav className="wc2-nav">
        <a href="#top" className="wc2-logo" aria-label="WebCrew home"><BrandMark size={32} />WebCrew</a>
        <div className="wc2-navlinks">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <Cta>See it in action</Cta>
        <button className="wc2-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="wc2-mobile-nav">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#lead-form" onClick={() => setMenuOpen(false)}>See it in action →</a></div>}

      <main id="top">
        <section className="wc2-hero" data-avatar-caption="Hey — I'm WebCrew's AI. I'll show you around, or just ask me anything.">
          <div className="wc2-hero-copy">
            <div className="wc2-pill"><Headphones size={14} /> AI front office · available 24/7</div>
            <h1>You miss the call.<br />They call your competitor.<br /><em>We fix that.</em></h1>
            <p>WebCrew answers your calls, follows up with leads, and books customers 24/7—so missed calls don’t become lost revenue.</p>
            <div className="wc2-actions"><Cta /><a href={`tel:${AI_RECEPTION_PHONE}`} className="wc2-call-demo"><PhoneCall size={15} /> Call the live AI: <strong>(918) 255-5151</strong></a></div>
            <a className="wc2-live-number" href={`tel:${AI_RECEPTION_PHONE}`}><span className="wc2-number-dot" />Test WebCrew yourself — call <strong>(918) 255-5151</strong></a>
            <small>No credit card. No setup fee. See it working first.</small>
            <div className="wc2-trust-row"><span><CheckCircle2 /> Answers instantly</span><span><CheckCircle2 /> Works after hours</span><span><CheckCircle2 /> Built for local business</span></div>
          </div>

          <div className="wc2-dashboard" aria-label="Example WebCrew call activity dashboard">
            <div className="wc2-dash-head"><div className="wc2-avatar">AI</div><div><strong>WebCrew Front Office</strong><small>Live call activity</small></div><span className="wc2-live"><i /> ACTIVE</span></div>
            <div className="wc2-caller"><span className="wc2-call-icon"><PhoneCall /></span><div><small>INCOMING CALL</small><strong>New customer · HVAC repair</strong></div><b>6:42 PM</b></div>
            <div className="wc2-timeline">
              {[
                ['6:42', 'Call answered', 'Customer needs service this evening'],
                ['6:43', 'Lead qualified', 'Service area and job details confirmed'],
                ['6:44', 'Appointment requested', 'Tomorrow · 9:00–11:00 AM'],
                ['6:44', 'Owner notified', 'Summary and contact details sent'],
              ].map(([time, title, body], i) => <div className="wc2-event" key={title}><span>{i < 3 ? <Check size={12} /> : <BellRing size={12} />}</span><div><b>{title}</b><small>{body}</small></div><time>{time}</time></div>)}
            </div>
            <div className="wc2-dash-stats"><div><b>9</b><small>calls handled</small></div><div><b>$4.1K</b><small>potential revenue</small></div><div><b>0</b><small>missed leads</small></div></div>
          </div>
        </section>

        <section className="wc2-section wc2-problem" id="problem" data-avatar-caption="Every missed call like this is money walking to your competitor.">
          <Eyebrow>The problem</Eyebrow>
          <div className="wc2-split-head"><h2>How much money did your voicemail <em>lose you this week?</em></h2><p>You’re working. Driving. With a customer. On a job. The phone rings, you can’t answer—and they call the next business on Google.</p></div>
          <div className="wc2-problem-grid">
            <div><strong>01</strong><PhoneCall /><h3>Missed call</h3><p>You’re doing the actual work and can’t reach the phone.</p></div>
            <div><strong>02</strong><Clock3 /><h3>No voicemail</h3><p>Most callers don’t wait. They want an answer now.</p></div>
            <div className="hot"><strong>03</strong><TrendingUp /><h3>Lost customer</h3><p>The next business on Google gets the job—and the revenue.</p></div>
          </div>
          <div className="wc2-inline-cta"><b>Missed call. Missed customer. Lost revenue.</b><Cta>Find my revenue leak</Cta></div>
        </section>

        <section className="wc2-section wc2-solution" id="solution" data-avatar-caption="This is the fix — a 24/7 front office that never misses one.">
          <Eyebrow>The solution</Eyebrow>
          <div className="wc2-split-head"><h2>Your next customer is calling.<br /><em>WebCrew answers.</em></h2><p>WebCrew works like a 24/7 front office for your business. You do the work. We make sure you don’t lose the customer.</p></div>
          <div className="wc2-card-grid">{solutionCards.map(({ icon: Icon, title, body }, i) => <article key={title}><span className="wc2-card-num">0{i + 1}</span><div className="wc2-icon"><Icon /></div><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="wc2-section wc2-explainer" data-avatar-caption="Here's what an AI front office actually is, in plain terms.">
          <div className="wc2-explainer-inner">
            <h2>What is an AI front office?</h2>
            <p>An AI front office is a system that answers your business&rsquo;s calls, texts, and website inquiries the way a trained receptionist would — greeting the caller, understanding what they need, checking availability, and booking the appointment, without a human standing by around the clock. WebCrew builds one specifically for your business: it learns your services, hours, service area, and booking rules before it ever answers a call, so it sounds like your business instead of a generic voice assistant. Every call gets a transcript and summary sent to you afterward, every lead gets an instant SMS or email alert, and every missed conversation gets an automatic follow-up on day 3 and day 10. It doesn&rsquo;t replace your team — it makes sure no call, text, or website visitor is ever the one that got away because nobody was free to answer.</p>
          </div>
        </section>

        <section className="wc2-dark wc2-live-demo" data-avatar-caption="Not a mockup — call the number and hear it live.">
          <div className="wc2-dark-inner">
            <div><Eyebrow light>Live product proof</Eyebrow><h2>See what happens when you stop <em>missing customers.</em></h2><p>Call our live WebCrew AI Reception and test the experience yourself. It will ask about your business, capture your needs, and can help book a follow-up.</p><a className="wc2-live-call" href={`tel:${AI_RECEPTION_PHONE}`}><PhoneCall size={18} /> <span>Call <strong>(918) 255-5151</strong><small>Live AI Reception · test it now</small></span><ArrowRight size={17} /></a></div>
            <div className="wc2-dark-feed">{['Incoming call received', 'Customer asks about availability', 'Lead qualified', 'Appointment requested', 'Business owner notified'].map((x, i) => <div key={x}><span>{i === 0 ? '6:42 PM' : i < 3 ? '6:43 PM' : '6:44 PM'}</span><i>{i + 1}</i><b>{x}</b><CheckCircle2 /></div>)}</div>
          </div>
        </section>

        <section className="wc2-section wc2-calculator" id="calculator" data-avatar-caption="Drag the sliders — that's real revenue slipping through today.">
          <div className="wc2-calc-copy"><Eyebrow>Revenue leak calculator</Eyebrow><h2>What is one missed customer <em>worth to you?</em></h2><p>Not because customers aren’t calling. Because nobody is answering.</p></div>
          <div className="wc2-calc-card">
            <label><span>Missed calls each week <b>{calls}</b></span><input type="range" min="1" max="30" value={calls} onChange={e => setCalls(Number(e.target.value))} /></label>
            <label><span>Average job value <b>${jobValue.toLocaleString()}</b></span><input type="range" min="100" max="5000" step="100" value={jobValue} onChange={e => setJobValue(Number(e.target.value))} /></label>
            <div className="wc2-result"><small>Potential business slipping away each month</small><strong>${monthlyLeak.toLocaleString()}<span>/mo</span></strong><p>Estimate based on your inputs. Actual results vary.</p></div>
            <Cta>See how WebCrew fixes this</Cta>
          </div>
        </section>

        <section className="wc2-section wc2-how" id="how-it-works" data-avatar-caption="No new software, no new hire — just answered calls.">
          <Eyebrow>How it works</Eyebrow><div className="wc2-split-head"><h2>From missed calls to <em>booked customers.</em></h2><p>No complicated software. No new employee to train. No customer sitting in voicemail.</p></div>
          <div className="wc2-steps">{[
            ['1', 'Tell us about your business', 'Your services, hours, service area, and how you prefer to handle customers.'],
            ['2', 'WebCrew learns how you work', 'We configure your response, qualification, and booking flow around your business.'],
            ['3', 'Go live', 'WebCrew starts answering, qualifying, following up, and helping book customers.'],
          ].map(([n, title, body]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          <div className="wc2-center"><Cta>Set up my WebCrew</Cta></div>
        </section>

        <section className="wc2-section wc2-included" id="included" data-avatar-caption="Here's the full list — nothing hidden, nothing upsold later.">
          <Eyebrow>What&apos;s included</Eyebrow>
          <div className="wc2-split-head"><h2>One plan. <em>Everything your front office needs.</em></h2><p>No add-ons to discover later. Every WebCrew plan includes all ten of these from day one.</p></div>
          <ul className="wc2-included-grid">{included.map(x => <li key={x}><CheckCircle2 /><span>{x}</span></li>)}</ul>
        </section>

        <section className="wc2-section wc2-compare" data-avatar-caption="Voicemail loses the lead. WebCrew keeps it.">
          <Eyebrow>Why WebCrew</Eyebrow><h2>Your voicemail isn’t <em>working for you.</em></h2>
          <div className="wc2-table"><div className="head"><b>What happens next?</b><b>Voicemail</b><b className="brand">WebCrew</b></div>{[
            ['Answers instantly', 'No', 'Yes'], ['Available after hours', 'Takes a message', 'Yes'], ['Qualifies customers', 'No', 'Yes'], ['Helps book appointments', 'No', 'Yes'], ['Follows up', 'No', 'Yes'], ['Keeps you informed', 'No', 'Yes'],
          ].map(row => <div key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><span className="yes"><CheckCircle2 /> {row[2]}</span></div>)}</div>
          <p className="wc2-compare-line">Voicemail records the customer you lost. <strong>WebCrew helps you keep them.</strong></p>
        </section>

        <section className="wc2-dark wc2-industries" id="industries" data-avatar-caption="Sound like your business? This was built for exactly that."><div className="wc2-dark-inner stacked"><Eyebrow light>Built for local businesses</Eyebrow><h2>Built for businesses that can’t stop working to <em>answer every call.</em></h2><div className="wc2-industry-grid">{industries.map((x, i) => industryPages[x] ? <a key={x} href={industryPages[x]}><span>{String(i + 1).padStart(2, '0')}</span>{x}</a> : <div key={x}><span>{String(i + 1).padStart(2, '0')}</span>{x}</div>)}</div><p>For local teams where <b>one missed call can mean one lost job.</b></p><Cta dark>See if WebCrew fits my business</Cta></div></section>

        <section className="wc2-section wc2-proof" data-avatar-caption="We only show verified results — no fake case studies.">
          <Eyebrow>Customer proof</Eyebrow><div className="wc2-split-head"><h2>Real businesses. Real calls. <em>Real results.</em></h2><p>We only publish verified customer outcomes. No fabricated companies, inflated numbers, or illustrative results presented as fact.</p></div>
          <div className="wc2-proof-placeholder"><ShieldCheck /><div><h3>Verified customer stories are being prepared.</h3><p>Results will appear here after customer approval and verification.</p></div><span>Proof-first policy</span></div>
        </section>

        <section className="wc2-section wc2-faq" id="faq" data-avatar-caption="Got questions? I can probably answer them faster than reading."><Eyebrow>FAQ</Eyebrow><h2>Everything practical. <em>Answered.</em></h2><div className="wc2-faq-list">{faqs.map(([q, a], i) => <button key={q} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span><b>{q}</b><p style={{ display: openFaq === i ? 'block' : 'none' }}>{a}</p></span><ChevronDown className={openFaq === i ? 'open' : ''} /></button>)}</div></section>

        <section className="wc2-final" id="contact" data-avatar-caption="Ready? Tell me about your business and I'll take it from here."><div className="wc2-final-glow" /><div className="wc2-final-grid"><div className="wc2-final-copy"><div className="wc2-pill dark"><Sparkles size={14} /> $0 setup fee · 2-week trial</div><h2>Tell us where calls are <em>slipping through.</em></h2><p>Share the pressure points in your business. WebCrew will use them to prepare the right call-answering and follow-up workflow for you.</p><div className="wc2-form-benefits"><span><CheckCircle2 /> $0 setup fee — everything included, one flat plan</span><span><CheckCircle2 /> 2-week free trial, full access — card required, no charge until trial ends</span><span><CheckCircle2 /> Personalized front-office walkthrough</span><span><CheckCircle2 /> Clear missed-revenue diagnosis</span><span><CheckCircle2 /> Human review before automation begins</span></div></div>
          {leadState === 'sent' ? <div className="wc2-lead-success" id="lead-form"><CheckCircle2 /><h3>Enquiry received.</h3><p>We’ll review your pain points and prepare the most useful next step. {lead.smsConsent ? 'Watch for a confirmation text from WebCrew.' : 'We’ll respond by email or phone without enrolling you in SMS.'}</p><a href="#top">Back to the top</a></div> :
          <form className="wc2-lead-form" id="lead-form" onSubmit={submitLead}>
            <div className="wc2-form-head"><div><b>Build my WebCrew plan</b><small>Usually takes under 2 minutes</small></div><span>Step 1 of 1</span></div>
            <div className="wc2-field-grid"><label><span>Your name *</span><input required autoComplete="name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} placeholder="Jordan Smith" /></label><label><span>Business name *</span><input required autoComplete="organization" value={lead.business} onChange={e => setLead({ ...lead, business: e.target.value })} placeholder="Smith Plumbing" /></label></div>
            <div className="wc2-field-grid"><label><span>Work email *</span><input required type="email" autoComplete="email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} placeholder="jordan@business.com" /></label><label><span>Mobile phone *</span><input required type="tel" autoComplete="tel" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} placeholder="(555) 555-0123" /></label></div>
            <label><span>Current website <small>(optional)</small></span><input type="url" autoComplete="url" value={lead.website} onChange={e => setLead({ ...lead, website: e.target.value })} placeholder="https://yourbusiness.com" /></label>
            <div className="wc2-field-grid"><label><span>Business type *</span><select required value={lead.niche} onChange={e => setLead({ ...lead, niche: e.target.value })}><option value="">Select one</option>{industries.map(x => <option key={x}>{x}</option>)}<option>Other local business</option></select></label><label><span>Calls missed each week</span><select value={lead.missedCalls} onChange={e => setLead({ ...lead, missedCalls: e.target.value })}><option value="">Not sure</option><option>1–3</option><option>4–7</option><option>8–15</option><option>16+</option></select></label></div>
            <label><span>What is costing you the most right now? *</span><select required value={lead.pain} onChange={e => setLead({ ...lead, pain: e.target.value })}><option value="">Choose your biggest pain point</option><option>Not getting enough qualified leads</option><option>Ad campaigns are not producing customers</option><option>Missing calls while on jobs</option><option>Calls going unanswered after hours</option><option>Slow lead follow-up</option><option>Not qualifying callers before booking</option><option>Too much time spent answering repeat questions</option><option>Leads disappearing before they schedule</option><option>Other</option></select></label>
            <label><span>How soon do you want this fixed?</span><select value={lead.urgency} onChange={e => setLead({ ...lead, urgency: e.target.value })}><option value="">Select timing</option><option>As soon as possible</option><option>Within 30 days</option><option>Just researching</option><option>Other</option></select></label>
            <label><span>Tell us what is happening in your business {lead.pain === 'Other' || lead.niche === 'Other local business' || lead.urgency === 'Other' ? '*' : <small>(optional)</small>}</span><textarea required={lead.pain === 'Other' || lead.niche === 'Other local business' || lead.urgency === 'Other'} maxLength={1200} value={lead.notes} onChange={e => setLead({ ...lead, notes: e.target.value })} placeholder="What are you losing time or customers on? What have you tried? What would a good result look like for you?" /><small className="wc2-field-help">We use this to prepare useful recommendations before we call, text, or email you.</small></label>
            <label className="wc2-consent"><input type="checkbox" required checked={lead.smsConsent} onChange={e => setLead({ ...lead, smsConsent: e.target.checked })} /><span><strong>Yes, I agree to receive recurring SMS messages from WebCrew</strong> about my enquiry, requested demo, and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for help. <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> &amp; <a href="/terms" target="_blank" rel="noreferrer">Terms</a>.</span></label>
            {leadState === 'error' && <p className="wc2-form-error">We couldn’t submit the form. Please try again or email hello@webcrew.app.</p>}
            <button className="wc2-submit" disabled={leadState === 'sending'}>{leadState === 'sending' ? 'Sending…' : <>Show me my revenue leak <ArrowRight size={17} /></>}</button>
            <small className="wc2-form-note">SMS consent is required to submit this enquiry, but is never a condition of any purchase.</small>
          </form>}
        </div></section>
      </main>

      <footer className="wc2-footer"><a href="#top" className="wc2-logo"><BrandMark size={32} />WebCrew</a><p>AI front office for local businesses.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@webcrew.app">Contact</a></div></footer>

      <style>{`
        :root{--wc-navy:#0d172b;--wc-navy2:#172238;--wc-orange:${ORANGE};--wc-bg:#f6f7f9;--wc-ink:#10182b;--wc-muted:#667085;--wc-line:#e5e8ee}
        .wc2-page{visibility:visible;background:var(--wc-bg);color:var(--wc-ink);font-family:var(--font-body);overflow:hidden}.wc2-page h1,.wc2-page h2,.wc2-page h3,.wc2-page b,.wc2-page strong,.wc2-page .wc2-logo{font-family:var(--font-display)}
        .wc2-page em{font-style:normal;color:var(--wc-orange)}.wc2-topbar{height:30px;background:var(--wc-navy);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;gap:8px}.wc2-pulse{width:7px;height:7px;border-radius:50%;background:#32d583;box-shadow:0 0 0 4px rgba(50,213,131,.12)}
        .wc2-nav{height:72px;max-width:1220px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;background:#fff0}.wc2-logo{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--wc-ink);font-size:18px;font-weight:800}.wc2-logo-mark{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:var(--wc-navy);color:var(--wc-orange)}.wc2-navlinks{display:flex;gap:30px}.wc2-navlinks a,.wc2-footer a{color:var(--wc-muted);text-decoration:none;font-size:13px;font-weight:600}.wc2-navlinks a:hover{color:var(--wc-orange)}.wc2-menu,.wc2-mobile-nav{display:none}
        .wc2-cta{min-height:46px;padding:0 22px;border-radius:9px;background:var(--wc-orange);color:#fff;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--font-display);font-size:13px;font-weight:800;box-shadow:0 10px 28px rgba(255,107,26,.22);transition:.2s}.wc2-cta:hover{transform:translateY(-2px);background:#ed5d0b}.wc2-nav>.wc2-cta{min-height:40px;padding:0 17px}.wc2-cta-dark{background:#fff;color:var(--wc-navy);box-shadow:none}.wc2-cta-dark:hover{background:#fff;color:var(--wc-orange)}.wc2-call-demo{display:flex;align-items:center;gap:6px;color:var(--wc-ink);font-weight:700;text-decoration:none;font-size:13px}.wc2-call-demo svg{color:var(--wc-orange)}.wc2-live-number{display:inline-flex;align-items:center;gap:8px;color:#c24e0d;background:#fff4ed;border:1px solid #ffd6be;border-radius:99px;padding:8px 12px;text-decoration:none;font-size:11px}.wc2-number-dot{width:7px;height:7px;border-radius:50%;background:#12b76a;box-shadow:0 0 0 4px #12b76a1c}.wc2-live-call{display:inline-flex;align-items:center;gap:12px;padding:14px 17px;border-radius:11px;background:#fff;color:var(--wc-navy);text-decoration:none;font-family:var(--font-display);font-weight:800}.wc2-live-call>svg:first-child{color:var(--wc-orange)}.wc2-live-call span{display:flex;flex-direction:column;font-size:12px}.wc2-live-call small{font:500 9px var(--font-body);color:#667085;margin-top:3px}.wc2-live-call>svg:last-child{color:var(--wc-orange)}
        .wc2-hero{max-width:1220px;min-height:650px;margin:auto;padding:70px 24px 100px;display:grid;grid-template-columns:1.02fr .98fr;gap:76px;align-items:center}.wc2-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border:1px solid #ffd6be;background:#fff4ed;border-radius:99px;color:#a84308;text-transform:uppercase;letter-spacing:.08em;font-size:10px;font-weight:800}.wc2-pill.dark{color:#fff;border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.07)}.wc2-hero h1{font-size:clamp(44px,5vw,68px);line-height:1.02;letter-spacing:-.055em;margin:22px 0}.wc2-hero-copy>p{font-size:17px;line-height:1.75;color:var(--wc-muted);max-width:590px}.wc2-actions{display:flex;align-items:center;gap:22px;margin:28px 0 15px}.wc2-actions.center{justify-content:center}.wc2-text-link{display:flex;align-items:center;gap:6px;color:var(--wc-ink);font-weight:700;text-decoration:none;font-size:13px}.wc2-hero-copy>small{color:#98a2b3;font-size:11px}.wc2-trust-row{display:flex;gap:20px;margin-top:27px;flex-wrap:wrap}.wc2-trust-row span{display:flex;align-items:center;gap:5px;font-size:11px;color:#475467;font-weight:600}.wc2-trust-row svg{width:14px;color:#18a874}
        .wc2-dashboard{background:#fff;border:1px solid var(--wc-line);border-radius:18px;padding:21px;box-shadow:0 28px 70px rgba(15,23,42,.12);position:relative}.wc2-dashboard:before{content:'';position:absolute;inset:-35px;z-index:-1;background:radial-gradient(circle at 70% 30%,rgba(255,107,26,.12),transparent 62%)}.wc2-dash-head{display:flex;align-items:center;gap:10px;padding-bottom:17px;border-bottom:1px solid #edf0f4}.wc2-avatar{width:36px;height:36px;border-radius:10px;background:var(--wc-navy);color:var(--wc-orange);display:grid;place-items:center;font-size:11px;font-weight:900}.wc2-dash-head>div:nth-child(2){display:flex;flex-direction:column}.wc2-dash-head strong{font-size:12px}.wc2-dash-head small{font-size:9px;color:#98a2b3;margin-top:2px}.wc2-live{margin-left:auto;font-size:9px;color:#07875e;font-weight:800;display:flex;align-items:center;gap:5px}.wc2-live i{width:6px;height:6px;border-radius:50%;background:#12b76a}.wc2-caller{margin:17px 0;padding:13px;border-radius:11px;background:#fff7f2;border:1px solid #ffe4d5;display:flex;align-items:center;gap:12px}.wc2-call-icon{width:31px;height:31px;display:grid;place-items:center;border-radius:8px;background:var(--wc-orange);color:#fff}.wc2-call-icon svg{width:15px}.wc2-caller>div{display:flex;flex-direction:column}.wc2-caller small{font-size:8px;color:#c24e0d;font-weight:800;letter-spacing:.1em}.wc2-caller strong{font-size:11px;margin-top:3px}.wc2-caller>b{margin-left:auto;font-size:9px;color:#98a2b3}.wc2-timeline{display:grid;gap:8px}.wc2-event{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid #edf0f4;border-radius:9px}.wc2-event>span{width:24px;height:24px;border-radius:7px;background:#edfdf7;color:#079455;display:grid;place-items:center}.wc2-event>div{display:flex;flex-direction:column}.wc2-event b{font-size:10px}.wc2-event small{font-size:8px;color:#98a2b3;margin-top:3px}.wc2-event time{margin-left:auto;font-size:8px;color:#98a2b3}.wc2-dash-stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #edf0f4;margin-top:17px;padding-top:17px}.wc2-dash-stats div{text-align:center;border-right:1px solid #edf0f4}.wc2-dash-stats div:last-child{border:0}.wc2-dash-stats b{display:block;font-size:18px}.wc2-dash-stats div:nth-child(2) b{color:#079455}.wc2-dash-stats div:nth-child(3) b{color:var(--wc-orange)}.wc2-dash-stats small{font-size:8px;color:#98a2b3}
        .wc2-section{padding:110px max(24px,calc((100vw - 1172px)/2))}.wc2-eyebrow{display:flex;align-items:center;gap:9px;color:var(--wc-orange);text-transform:uppercase;font-size:10px;letter-spacing:.15em;font-weight:800;margin-bottom:18px}.wc2-eyebrow span{width:20px;height:2px;background:currentColor}.wc2-eyebrow.light{color:#ff8e4d}.wc2-split-head{display:grid;grid-template-columns:1.1fr .7fr;gap:100px;align-items:end;margin-bottom:50px}.wc2-section h2,.wc2-dark h2{font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-.045em}.wc2-split-head p,.wc2-calc-copy p{color:var(--wc-muted);font-size:15px;line-height:1.75}.wc2-problem{background:#fff}.wc2-problem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.wc2-problem-grid>div{padding:28px;border:1px solid var(--wc-line);border-radius:14px;background:var(--wc-bg);position:relative}.wc2-problem-grid strong{position:absolute;right:20px;top:16px;color:#d9dde5;font-size:30px}.wc2-problem-grid svg{width:24px;color:var(--wc-orange);margin-bottom:38px}.wc2-problem-grid h3,.wc2-card-grid h3{font-size:17px;margin-bottom:9px}.wc2-problem-grid p,.wc2-card-grid p{font-size:12px;line-height:1.65;color:var(--wc-muted)}.wc2-problem-grid .hot{background:var(--wc-navy);color:#fff;border-color:var(--wc-navy)}.wc2-problem-grid .hot p{color:#aab3c3}.wc2-problem-grid .hot strong{color:#29354b}.wc2-inline-cta{display:flex;align-items:center;justify-content:space-between;margin-top:28px;padding:24px 28px;border-radius:13px;background:#fff7f2;border:1px solid #ffe1d0}.wc2-inline-cta b{font-size:18px}
        .wc2-solution{background:var(--wc-bg)}.wc2-card-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.wc2-card-grid article{padding:24px 20px;background:#fff;border:1px solid var(--wc-line);border-radius:14px;min-height:230px;position:relative}.wc2-card-num{position:absolute;right:17px;top:15px;color:#dfe3ea;font-size:20px;font-weight:800}.wc2-icon{width:39px;height:39px;border-radius:10px;background:#fff0e7;color:var(--wc-orange);display:grid;place-items:center;margin:28px 0 22px}.wc2-icon svg{width:19px}
        .wc2-explainer{background:#fff;padding-top:0}.wc2-explainer-inner{max-width:760px;margin:auto;text-align:center}.wc2-explainer h2{font-size:clamp(26px,3.4vw,38px);letter-spacing:-.03em;margin-bottom:22px}.wc2-explainer p{font-size:15px;line-height:1.85;color:var(--wc-muted)}
        .wc2-dark{background:var(--wc-navy);color:#fff}.wc2-dark-inner{max-width:1172px;margin:auto;padding:110px 0;display:grid;grid-template-columns:.82fr 1fr;gap:90px;align-items:center}.wc2-dark-inner>div:first-child>p{color:#aab3c3;line-height:1.75;font-size:14px;margin:20px 0 28px}.wc2-dark-feed{background:var(--wc-navy2);border:1px solid #273249;border-radius:15px;padding:15px}.wc2-dark-feed>div{display:grid;grid-template-columns:65px 28px 1fr 20px;gap:13px;align-items:center;padding:16px 8px;border-bottom:1px solid #29344a}.wc2-dark-feed>div:last-child{border:0}.wc2-dark-feed span{font-size:9px;color:#8490a5}.wc2-dark-feed i{width:25px;height:25px;border-radius:7px;background:#29344a;color:var(--wc-orange);display:grid;place-items:center;font-size:9px;font-style:normal;font-weight:800}.wc2-dark-feed b{font-size:11px}.wc2-dark-feed svg{width:15px;color:#29c486}
        .wc2-calculator{display:grid;grid-template-columns:.85fr 1fr;gap:100px;align-items:center;background:#fff}.wc2-calc-copy p{margin-top:20px;max-width:440px}.wc2-calc-card{background:var(--wc-bg);border:1px solid var(--wc-line);border-radius:17px;padding:30px}.wc2-calc-card label{display:block;margin-bottom:27px}.wc2-calc-card label span{display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:13px}.wc2-calc-card label b{color:var(--wc-orange);font-size:15px}.wc2-calc-card input{width:100%;accent-color:var(--wc-orange)}.wc2-result{padding:22px;border-radius:12px;background:var(--wc-navy);color:#fff;margin-bottom:20px}.wc2-result small{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#aab3c3}.wc2-result strong{display:block;font-size:42px;color:var(--wc-orange);margin:7px 0}.wc2-result strong span{font-size:14px;color:#aab3c3}.wc2-result p{font-size:9px;color:#8490a5}
        .wc2-how{background:var(--wc-bg)}.wc2-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.wc2-steps article{background:#fff;border:1px solid var(--wc-line);border-radius:14px;padding:27px;display:flex;gap:18px}.wc2-steps article>span{flex:0 0 39px;height:39px;border-radius:10px;background:var(--wc-orange);color:#fff;display:grid;place-items:center;font-weight:900}.wc2-steps h3{font-size:16px;margin:2px 0 8px}.wc2-steps p{font-size:12px;color:var(--wc-muted);line-height:1.6}.wc2-center{text-align:center;margin-top:36px}
        .wc2-included{background:#fff}.wc2-included-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;list-style:none;padding:0;margin:0}.wc2-included-grid li{display:flex;align-items:flex-start;gap:12px;padding:18px 20px;border:1px solid var(--wc-line);border-radius:12px;background:var(--wc-bg)}.wc2-included-grid svg{width:18px;flex:0 0 18px;color:#12b76a;margin-top:2px}.wc2-included-grid span{font-size:13px;line-height:1.55;font-weight:600;color:var(--wc-ink)}
        .wc2-compare{background:#fff}.wc2-compare>h2{text-align:center;margin-bottom:40px}.wc2-compare>.wc2-eyebrow{justify-content:center}.wc2-table{max-width:880px;margin:auto;border:1px solid var(--wc-line);border-radius:15px;overflow:hidden}.wc2-table>div{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:center;padding:15px 22px;border-bottom:1px solid var(--wc-line);font-size:12px}.wc2-table>div:last-child{border:0}.wc2-table .head{background:var(--wc-bg);font-size:11px}.wc2-table .brand{color:var(--wc-orange)}.wc2-table span{color:#98a2b3}.wc2-table .yes{display:flex;align-items:center;gap:6px;color:#07875e;font-weight:700}.wc2-table svg{width:14px}.wc2-compare-line{text-align:center;margin-top:28px;font-size:15px}.wc2-compare-line strong{color:var(--wc-orange)}
        .wc2-dark-inner.stacked{display:block;text-align:center}.wc2-dark-inner.stacked>.wc2-eyebrow{justify-content:center}.wc2-industries h2{max-width:800px;margin:0 auto 45px}.wc2-industry-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.wc2-industry-grid div,.wc2-industry-grid a{display:block;background:var(--wc-navy2);border:1px solid #28344c;border-radius:11px;padding:20px;text-align:left;font-family:var(--font-display);font-weight:700;font-size:13px;color:#fff;text-decoration:none;transition:border-color .2s}.wc2-industry-grid a:hover{border-color:var(--wc-orange)}.wc2-industry-grid span{display:block;color:var(--wc-orange);font-size:9px;margin-bottom:20px}.wc2-industries .stacked>p{color:#aab3c3;margin:30px 0 25px;font-size:13px}
        .wc2-proof{background:var(--wc-bg)}.wc2-proof-placeholder{display:flex;align-items:center;gap:18px;padding:28px;background:#fff;border:1px dashed #cdd3dd;border-radius:14px}.wc2-proof-placeholder>svg{width:38px;height:38px;color:var(--wc-orange)}.wc2-proof-placeholder h3{font-size:15px}.wc2-proof-placeholder p{font-size:11px;color:var(--wc-muted);margin-top:5px}.wc2-proof-placeholder>span{margin-left:auto;padding:7px 10px;border-radius:99px;background:#ecfdf3;color:#07875e;font-size:9px;font-weight:800;text-transform:uppercase}
        .wc2-faq{text-align:center;background:#fff}.wc2-faq-list{max-width:800px;margin:40px auto 0;text-align:left}.wc2-faq-list button{width:100%;border:1px solid var(--wc-line);background:var(--wc-bg);border-radius:10px;padding:17px 18px;margin-bottom:9px;display:flex;justify-content:space-between;text-align:left;cursor:pointer;color:var(--wc-ink)}.wc2-faq-list b{font-size:12px}.wc2-faq-list p{font-size:11px;line-height:1.65;color:var(--wc-muted);font-weight:400;margin-top:11px;max-width:680px}.wc2-faq-list svg{width:16px;transition:.2s}.wc2-faq-list svg.open{transform:rotate(180deg)}.wc2-faq>.wc2-eyebrow{justify-content:center}
        .wc2-final{position:relative;background:var(--wc-navy);color:#fff;padding:110px 24px;overflow:hidden}.wc2-final>*{position:relative}.wc2-final-glow{position:absolute;width:800px;height:500px;left:20%;top:35%;transform:translate(-50%,-50%);background:radial-gradient(ellipse,rgba(255,107,26,.16),transparent 68%)}.wc2-final-grid{max-width:1172px;margin:auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:80px;align-items:start}.wc2-final-copy h2{font-size:clamp(38px,5vw,60px);line-height:1.08;letter-spacing:-.045em;margin:24px 0 18px}.wc2-final-copy>p{color:#aab3c3;line-height:1.75;font-size:14px}.wc2-form-benefits{display:grid;gap:11px;margin-top:28px}.wc2-form-benefits span{display:flex;align-items:center;gap:8px;color:#c4cad5;font-size:12px}.wc2-form-benefits svg{width:15px;color:#2ac486}.wc2-lead-form{background:#fff;color:var(--wc-ink);border-radius:17px;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.25)}.wc2-form-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid var(--wc-line)}.wc2-form-head>div{display:flex;flex-direction:column}.wc2-form-head b{font-size:16px}.wc2-form-head small{color:var(--wc-muted);font-size:10px;margin-top:4px}.wc2-form-head>span{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:var(--wc-orange);font-weight:800}.wc2-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.wc2-lead-form>label,.wc2-field-grid label{display:block;margin-bottom:14px}.wc2-lead-form label>span{display:block;font-size:10px;font-weight:700;color:#475467;margin-bottom:7px}.wc2-lead-form input:not([type=checkbox]),.wc2-lead-form select,.wc2-lead-form textarea{width:100%;height:44px;padding:0 12px;border:1px solid #d9dee7;border-radius:8px;background:#fff;color:var(--wc-ink);font:12px var(--font-body);outline:none}.wc2-lead-form textarea{height:108px;padding:12px;resize:vertical;line-height:1.55}.wc2-lead-form input:focus,.wc2-lead-form select:focus,.wc2-lead-form textarea:focus{border-color:var(--wc-orange);box-shadow:0 0 0 3px rgba(255,107,26,.1)}.wc2-field-help{display:block;color:#7d8798;font-size:9px;line-height:1.5;margin-top:6px}.wc2-consent{display:flex!important;gap:10px;padding:13px;background:#f8f9fb;border:1px solid var(--wc-line);border-radius:8px}.wc2-consent input{width:17px;height:17px;flex:0 0 17px;margin-top:2px;accent-color:var(--wc-orange)}.wc2-consent>span{font-size:9px!important;line-height:1.55!important;font-weight:400!important;margin:0!important}.wc2-consent a{color:#c74e08}.wc2-submit{width:100%;height:48px;border:0;border-radius:9px;background:var(--wc-orange);color:#fff;font-family:var(--font-display);font-weight:800;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer}.wc2-submit:disabled{opacity:.65;cursor:wait}.wc2-form-note{display:block;text-align:center;color:#98a2b3;font-size:8px;margin-top:11px}.wc2-form-error{color:#b42318;font-size:10px;margin:10px 0}.wc2-lead-success{background:#fff;color:var(--wc-ink);border-radius:17px;padding:50px;text-align:center}.wc2-lead-success>svg{width:48px;height:48px;color:#12a36f}.wc2-lead-success h3{font-size:25px;margin:18px 0 10px}.wc2-lead-success p{color:var(--wc-muted);font-size:13px;line-height:1.7}.wc2-lead-success a{display:inline-block;margin-top:20px;color:var(--wc-orange);font-weight:700;font-size:12px}.wc2-footer{background:#080f1e;color:#fff;min-height:95px;display:flex;align-items:center;gap:30px;padding:0 max(24px,calc((100vw - 1172px)/2));border-top:1px solid #202b3f}.wc2-footer .wc2-logo{color:#fff}.wc2-footer p{font-size:10px;color:#667085}.wc2-footer>div{margin-left:auto;display:flex;gap:22px}
        #lead-form{scroll-margin-top:24px}.wc2-submit{height:auto;min-height:50px;padding:12px 18px;line-height:1.25;white-space:normal}.wc2-submit svg{flex:0 0 auto}
        @media(max-width:900px){.wc2-navlinks,.wc2-nav>.wc2-cta{display:none}.wc2-menu{display:grid;place-items:center;border:0;background:none;color:var(--wc-ink)}.wc2-mobile-nav{display:flex;position:absolute;z-index:20;top:102px;left:16px;right:16px;padding:18px;background:#fff;border:1px solid var(--wc-line);border-radius:12px;box-shadow:0 20px 40px rgba(15,23,42,.15);flex-direction:column}.wc2-mobile-nav a{padding:12px;color:var(--wc-ink);font-weight:700;text-decoration:none}.wc2-hero{grid-template-columns:1fr;padding-top:45px;gap:55px}.wc2-split-head,.wc2-calculator,.wc2-dark-inner,.wc2-final-grid{grid-template-columns:1fr;gap:35px}.wc2-card-grid{grid-template-columns:repeat(2,1fr)}.wc2-card-grid article:last-child{grid-column:span 2}.wc2-dark-inner{padding:90px 24px}.wc2-problem-grid,.wc2-steps{grid-template-columns:1fr}.wc2-industry-grid{grid-template-columns:repeat(2,1fr)}.wc2-included-grid{grid-template-columns:1fr}}
        @media(max-width:600px){.wc2-topbar{font-size:9px}.wc2-nav{height:64px}.wc2-hero{padding:38px 20px 75px}.wc2-hero h1{font-size:42px}.wc2-actions{align-items:flex-start;flex-direction:column}.wc2-dashboard{padding:14px}.wc2-section{padding:78px 20px}.wc2-split-head{gap:18px;margin-bottom:32px}.wc2-section h2,.wc2-dark h2{font-size:35px}.wc2-problem-grid,.wc2-card-grid{grid-template-columns:1fr}.wc2-card-grid article:last-child{grid-column:auto}.wc2-inline-cta{align-items:flex-start;flex-direction:column;gap:20px}.wc2-dark-feed>div{grid-template-columns:52px 25px 1fr}.wc2-dark-feed svg{display:none}.wc2-calculator{gap:35px}.wc2-calc-card{padding:21px}.wc2-result strong{font-size:34px}.wc2-table{overflow-x:auto}.wc2-table>div{min-width:610px}.wc2-industry-grid{grid-template-columns:1fr 1fr}.wc2-proof-placeholder{align-items:flex-start}.wc2-proof-placeholder>span{display:none}.wc2-final{padding:85px 20px}.wc2-field-grid{grid-template-columns:1fr;gap:0}.wc2-lead-form{padding:20px}.wc2-footer{padding:28px 20px;align-items:flex-start;flex-wrap:wrap}.wc2-footer>div{width:100%;margin:0}.wc2-trust-row{gap:10px}}
        @media(prefers-reduced-motion:reduce){.wc2-page *{scroll-behavior:auto!important;transition:none!important}}
      `}</style>
    </div>
  )
}
