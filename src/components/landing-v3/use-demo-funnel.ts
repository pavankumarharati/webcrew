'use client'

import { useEffect, useRef, useState } from 'react'
import { SHOW_SOCIAL_SOURCES } from '@/lib/features'
import { ADMIN_URL, useFoundingSeats, type PlanChoice } from '../landing/sections'

// State + network logic for the free-demo → go-live funnel. Same endpoints and
// behaviour as website-preview-landing.tsx (kept untouched so the current page
// can be restored by flag). Reception: /preview/start, /preview/status/:id,
// /preview/answer/:id. Admin: /api/public/checkout (Stripe, 30-day trial).

export const RECEPTION_URL = process.env.NEXT_PUBLIC_RECEPTION_URL ?? 'https://ai-reception-459352382653.us-central1.run.app'
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export type Stage = 'idle' | 'reading' | 'needs_input' | 'understanding' | 'building' | 'ready' | 'failed'

/** Mirrors pipeline/src/reception/preview-clarify.ts ClarifyQuestion. */
export type ClarifyQuestion = {
  key: string
  label: string
  kind: 'text' | 'list' | 'choice'
  options?: Array<{ value: string; label: string }>
  hint?: string
  why: string
}

/** Mirrors pipeline/src/reception/preview-sources.ts. FB/IG are never fetched — the owner pastes About text. */
export type SourceType = 'website' | 'facebook' | 'instagram' | 'text'
export type SourceDraft = { type: SourceType; url: string; text: string }
/** Full site rebuild queue (api/src/signature-queue.ts → built on our side in a few minutes). */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.webcrew.app'
export type SiteBuild = { id: string; status: 'queued' | 'building' | 'ready' | 'failed'; url?: string; reason?: string; code?: string; position?: number; previewId?: string; kind?: 'site' | 'listing' }
export type ListingDraft = { name: string; phone: string; city: string; state: string; mapsUrl?: string; noGoogle?: boolean }

export const MAX_SOURCES = SHOW_SOCIAL_SOURCES ? 4 : 1
export const SOURCE_TABS: Array<{ type: SourceType; label: string }> = ([
  { type: 'website', label: 'My website' },
  { type: 'facebook', label: 'Facebook Page' },
  { type: 'instagram', label: 'Instagram' },
  { type: 'text', label: 'Describe my business' },
] as Array<{ type: SourceType; label: string }>).filter(t => SHOW_SOCIAL_SOURCES || t.type === 'website')
export const emptySource = (type: SourceType): SourceDraft => ({ type, url: '', text: '' })
export function sourceFilled(s: SourceDraft): boolean {
  return s.type === 'website' ? !!s.url.trim() : !!s.text.trim()
}

export const STAGE_COPY: Record<Exclude<Stage, 'idle'>, string> = {
  reading: 'Reading your business info…',
  needs_input: 'A few quick questions',
  understanding: 'Understanding your business…',
  building: 'Building your AI SalesPerson…',
  ready: 'Ready!',
  failed: "Couldn't build a preview",
}
export const STAGE_ORDER: Stage[] = ['reading', 'understanding', 'building', 'ready']

const CONSENT_LANGUAGE = 'I agree to receive recurring SMS messages from WebCrew about my account, setup and related services. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe or HELP for help. Privacy: https://webcrew.app/privacy. Terms: https://webcrew.app/terms.'

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

export function useDemoFunnel() {
  const [sources, setSources] = useState<SourceDraft[]>([emptySource('website')])
  const hasWebsite = sources.some(s => s.type === 'website')
  // A business with a website keeps it and sees the AI on it. A new site is only for businesses without one.
  const [experience, setExperience] = useState<'upgrade' | 'new'>('upgrade')
  const effectiveExperience: 'upgrade' | 'new' = hasWebsite ? experience : 'new'
  const [stage, setStage] = useState<Stage>('idle')
  const [progressPct, setProgressPct] = useState(0)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [configId, setConfigId] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [questions, setQuestions] = useState<ClarifyQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [answering, setAnswering] = useState(false)

  const [claim, setClaim] = useState({ name: '', email: '', phone: '', smsConsent: false })
  const [plan, setPlan] = useState<PlanChoice>('site_ai')
  const [checkoutState, setCheckoutState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [checkoutError, setCheckoutError] = useState('')
  const seatsLeft = useFoundingSeats()

  const [siteBuild, setSiteBuild] = useState<SiteBuild | null>(null)
  const sitePollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stopSitePoll = () => { if (sitePollRef.current) clearInterval(sitePollRef.current); sitePollRef.current = null }

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stopPolling = () => { if (pollRef.current) clearInterval(pollRef.current); pollRef.current = null }

  useEffect(() => () => { stopPolling(); stopSitePoll() }, [])

  // Back from a cancelled Stripe checkout (?preview=<id>): reopen that demo instead of starting over.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('preview')
    if (id && /^[0-9a-f-]{36}$/i.test(id)) { setPreviewId(id); setStage('reading'); pollStatus(id) }
    const site = new URLSearchParams(window.location.search).get('site')
    if (site && /^[0-9a-f-]{36}$/i.test(site)) pollSite(site)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (seatsLeft === 0) setPlan(p => p === 'founding' ? 'standard' : p) }, [seatsLeft])

  function pollStatus(id: string) {
    stopPolling()
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
          stopPolling()
        } else if (data.stage === 'ready') {
          setConfigId(data.configId ?? null)
          if (data.businessName) setBusinessName(data.businessName)
          stopPolling()
        } else if (data.stage === 'failed') {
          setErrorMsg(data.error || "We couldn't reach that site — check the URL or try a different page.")
          stopPolling()
        }
      } catch (e: any) {
        setErrorMsg(e.message || 'Something went wrong.')
        setStage('failed')
        stopPolling()
      }
    }, 1500)
  }

  function pollSite(id: string) {
    stopSitePoll()
    const tick = async () => {
      try {
        const res = await fetch(`${API_URL}/signature/status/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'lost')
        setSiteBuild(prev => ({ ...prev, id, ...data }))
        if (data.status === 'ready' || data.status === 'failed') stopSitePoll()
        // The rebuilt site carries its own AI salesperson + a checkout-ready preview: going live claims THAT site.
        if (data.status === 'ready' && data.previewId) {
          stopPolling(); setQuestions([])
          setPreviewId(data.previewId); setConfigId(c => c ?? 'site'); setStage('ready')
        }
      } catch { stopSitePoll(); setSiteBuild(prev => prev ? { ...prev, status: 'failed', reason: 'We lost track of your site build. Please try again.' } : prev) }
    }
    tick()
    sitePollRef.current = setInterval(tick, 5000)
  }

  /** The full rebuild runs next to the instant AI preview; failures here never block the AI demo. */
  async function requestSite(target: string | ListingDraft) {
    try {
      const body = typeof target === 'string' ? { url: target } : { listing: target }
      const res = await fetch(`${API_URL}/signature/request`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.id) { setSiteBuild({ id: '', status: 'failed', reason: data.error || 'We could not start your new website.' }); return }
      setSiteBuild({ id: data.id, status: 'queued', position: data.position, kind: typeof target === 'string' ? 'site' : 'listing' })
      const u = new URL(window.location.href); u.searchParams.set('site', data.id); window.history.replaceState(null, '', u)
      pollSite(data.id)
    } catch { setSiteBuild({ id: '', status: 'failed', reason: 'We could not start your new website.' }) }
  }

  /** No website: build from their Google listing (found by phone on the Mac). No instant AI preview here;
   *  the rebuilt site arrives with its AI salesperson. */
  const [listing, setListing] = useState<ListingDraft>({ name: '', phone: '', city: '', state: '' })
  function startListing(e: React.FormEvent | null, opts: { noGoogle?: boolean } = {}) {
    e?.preventDefault()
    setErrorMsg('')
    const { mapsUrl, ...rest } = listing
    requestSite({ ...rest, state: listing.state.trim().toUpperCase(), ...(mapsUrl?.trim() ? { mapsUrl: mapsUrl.trim() } : {}), ...(opts.noGoogle ? { noGoogle: true } : {}) })
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
      pollStatus(data.previewId)
      const site = filled.find(s => s.type === 'website')
      if (site && effectiveExperience === 'new') requestSite(site.url.trim())
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
    stopPolling()
    setStage('idle'); setProgressPct(0); setPreviewId(null); setConfigId(null); setBusinessName(''); setErrorMsg('')
    setQuestions([]); setAnswers({})
    stopSitePoll(); setSiteBuild(null)
  }

  // Paywall: going live always goes through Stripe Checkout (card on file, 30-day trial, $0 today).
  // Nothing billable happens before the Stripe webhook confirms it.
  async function startCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!previewId) return
    setCheckoutState('sending'); setCheckoutError('')
    try {
      const turnstileToken = await getTurnstileToken()
      const res = await fetch(`${ADMIN_URL}/api/public/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previewId, plan, name: claim.name, email: claim.email, phone: claim.phone, business: businessName,
          smsConsent: claim.smsConsent, consentLanguage: claim.smsConsent ? CONSENT_LANGUAGE : undefined, turnstileToken,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 409 && data.foundingFull) { setPlan('standard'); throw new Error(data.error) }
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error || 'Could not open checkout.')
      window.location.href = data.checkoutUrl
    } catch (err: any) {
      setCheckoutError(err.message || 'Something went wrong. Please try again.')
      setCheckoutState('error')
    }
  }

  const showProgress = stage !== 'idle' && stage !== 'failed' && stage !== 'needs_input'
  const showPreview = !!(stage === 'ready' && configId && previewId)

  return {
    sources, hasWebsite, experience: effectiveExperience, setExperience,
    stage, progressPct, previewId, businessName, errorMsg, questions, answers, answering,
    claim, setClaim, plan, setPlan, checkoutState, checkoutError, seatsLeft,
    showProgress, showPreview, siteBuild, listing, setListing, startListing,
    startPreview, submitAnswers, updateSource, addSource, removeSource, setAnswer, resetPreview, startCheckout,
  }
}

export type DemoFunnel = ReturnType<typeof useDemoFunnel>
