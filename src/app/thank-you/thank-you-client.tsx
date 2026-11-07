'use client'

import { useEffect, useState } from 'react'
import { trackMeta } from '@/lib/meta-pixel'
import { useSearchParams } from 'next/navigation'

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.webcrew.app'
const POLL_INTERVAL_MS = 2000
const POLL_TIMEOUT_MS = 90_000
const PRICES: Record<string, string> = { site_ai: '$49', founding: '$99', all_in_one: '$149' }

type Ready = { authUrl: string; business?: string; plan?: string; aiPhone?: string; trialEnds?: string }
type State = 'pending' | 'ready' | 'timed_out' | 'no_session'

const pretty = (n?: string) => n?.replace(/^\+?1?(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3')
const longDate = (iso?: string) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null

export function ThankYouClient() {
  const sessionId = useSearchParams().get('session_id')
  const [state, setState] = useState<State>(sessionId ? 'pending' : 'no_session')
  const [info, setInfo] = useState<Ready | null>(null)

  // Stripe only redirects here after a completed checkout, so this is a trial start. eventID = session id lets
  // Meta drop the duplicate if the page is reloaded.
  useEffect(() => {
    if (!sessionId) return
    try {
      const key = `wc-meta-trial-${sessionId}`
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch { /* storage blocked: still fire, Meta dedupes on eventID */ }
    trackMeta('StartTrial', { currency: 'USD', value: 0 }, sessionId)
  }, [sessionId])

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    const startedAt = Date.now()
    async function poll() {
      if (cancelled) return
      try {
        const res = await fetch(`${ADMIN_URL}/api/client/session-login?session_id=${encodeURIComponent(sessionId!)}`)
        const data = await res.json()
        if (cancelled) return
        if (data.status === 'ready' && data.authUrl) { setInfo(data); setState('ready'); return }
      } catch { /* the account is likely still being set up: keep checking */ }
      if (Date.now() - startedAt >= POLL_TIMEOUT_MS) { setState('timed_out'); return }
      setTimeout(poll, POLL_INTERVAL_MS)
    }
    poll()
    return () => { cancelled = true }
  }, [sessionId])

  const price = info?.plan ? PRICES[info.plan] : undefined
  const trialEnds = longDate(info?.trialEnds)

  return (
    <main className="ty">
      <style>{CSS}</style>
      <section className="ty-card">
        <p className="ty-eyebrow">WebCrew</p>
        {state === 'no_session' ? <>
          <h1>Looking for your account?</h1>
          <p className="ty-lede">Sign in to see your AI front office.</p>
          <a className="ty-btn" href={`${ADMIN_URL}/client/login`}>Sign in</a>
        </> : <>
          <h1>{state === 'ready' ? `You're in${info?.business ? `, ${info.business}` : ''}.` : 'Your trial has started.'}</h1>
          <p className="ty-lede">$0 charged today. We are emailing you a setup link too.</p>
          <ul className="ty-list">
            <li className="done"><span>✓</span> Card saved, 30-day free trial started</li>
            <li className={state === 'ready' ? 'done' : ''}><span>{state === 'ready' ? '✓' : '…'}</span> {state === 'ready' ? (info?.aiPhone ? `Your AI number is ${pretty(info.aiPhone)}` : 'Your AI is ready') : 'Setting up your AI'}</li>
            <li><span>3</span> Create a password and finish setup, about 10 minutes</li>
          </ul>
          {state === 'ready' && trialEnds && <p className="ty-note">Your trial runs until {trialEnds}{price ? `, then ${price}/month` : ''}. Cancel any time before then and pay nothing.</p>}
          {state === 'ready' && info && <a className="ty-btn" href={info.authUrl}>Continue to setup</a>}
          {state === 'pending' && <button className="ty-btn" disabled>Getting your account ready…</button>}
          {state === 'timed_out' && <p className="ty-note">This is taking longer than usual. Your trial is safe. We are emailing you a link to create your password and finish setup.</p>}
        </>}
        <p className="ty-help">Need help? <a href="mailto:hello@webcrew.app">hello@webcrew.app</a></p>
      </section>
    </main>
  )
}

const CSS = `
.ty{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f6f3ed;color:#10182b;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}
.ty-card{width:100%;max-width:560px;padding:36px;border-radius:18px;background:#fff;border:1px solid #e5e0d6}
.ty-eyebrow{margin:0 0 14px;font-size:14px;font-weight:700;color:#c2410c}
.ty h1{margin:0 0 8px;font-size:34px;line-height:1.15;letter-spacing:-.02em}
.ty-lede{margin:0 0 22px;font-size:17px;color:#475467}
.ty-list{list-style:none;margin:0 0 20px;padding:0;display:grid;gap:12px;font-size:16px}
.ty-list li{display:flex;align-items:center;gap:12px}
.ty-list span{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;flex-shrink:0;border-radius:50%;background:#f2f4f7;font-size:13px;font-weight:700}
.ty-list li.done span{background:#dcfce7;color:#15803d}
.ty-note{margin:0 0 20px;font-size:15px;line-height:1.5;color:#475467}
.ty-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;border:0;border-radius:11px;background:#c2410c;color:#fff;font:700 16px system-ui;text-decoration:none;cursor:pointer}
.ty-btn:disabled{opacity:.6;cursor:wait}
.ty-help{margin:18px 0 0;font-size:14px;color:#667085}
.ty-help a{color:inherit}
`
