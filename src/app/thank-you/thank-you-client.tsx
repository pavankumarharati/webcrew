'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.webcrew.app'
const POLL_INTERVAL_MS = 2000
const POLL_TIMEOUT_MS = 60_000

type DashboardState = 'pending' | 'ready' | 'timed_out' | 'no_session'

export function ThankYouClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState<DashboardState>(sessionId ? 'pending' : 'no_session')
  const [authUrl, setAuthUrl] = useState<string | null>(null)

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
        if (data.status === 'ready' && data.authUrl) {
          setAuthUrl(data.authUrl)
          setState('ready')
          return
        }
      } catch {
        // Provisioning is likely still in progress — keep polling until timeout.
      }
      if (Date.now() - startedAt >= POLL_TIMEOUT_MS) {
        setState('timed_out')
        return
      }
      setTimeout(poll, POLL_INTERVAL_MS)
    }

    poll()
    return () => { cancelled = true }
  }, [sessionId])

  const steps: [string, string, string][] = [
    ['1', 'Provisioning', state === 'pending' ? 'Creating your workspace and reception configuration…' : 'Workspace and reception configuration created.'],
    ['2', 'Secure access', state === 'ready' ? 'Your one-click dashboard link is ready below.' : 'Your one-click dashboard link is being prepared.'],
    ['3', 'Go live', 'Confirm business details, then test your AI Reception.'],
  ]

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-6 py-20 text-[var(--color-text)]">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-dim)] text-2xl text-[var(--color-accent)]" aria-hidden="true">✓</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-blue)]" style={{ fontFamily: 'var(--font-display)' }}>WebCrew AI Front Office</p>
          <h1 className="gradient-brand text-4xl font-black tracking-tight sm:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>Your trial checkout is complete.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            We are preparing your workspace and AI Reception. Your secure dashboard link and setup details will arrive by email and, when you consented to texts, by SMS.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(([number, title, copy], i) => {
              const active = (i === 0 && state === 'pending') || (i === 1 && state === 'pending')
              return (
                <div key={number} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-blue-dim)] p-5">
                  <span className={`text-sm font-bold ${active ? 'text-[var(--color-blue)]' : 'text-[var(--color-accent)]'}`}>{number}</span>
                  <h2 className="mt-3 font-bold" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{copy}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {state === 'ready' && authUrl ? (
              <a href={authUrl} className="btn-primary justify-center"><span>Open client dashboard</span></a>
            ) : state === 'timed_out' || state === 'no_session' ? (
              <a href="https://admin.webcrew.app/client/login" className="btn-primary justify-center"><span>Open client dashboard</span></a>
            ) : (
              <button type="button" disabled className="btn-primary justify-center opacity-60" style={{ cursor: 'wait' }}>
                <span>Preparing your dashboard…</span>
              </button>
            )}
            <a href="mailto:hello@webcrew.app" className="btn-ghost justify-center">Need help?</a>
          </div>
        </div>
      </section>
    </main>
  )
}
