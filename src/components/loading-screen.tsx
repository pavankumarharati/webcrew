'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import BrandMark from './brand-mark'

export default function LoadingScreen() {
  const screenRef  = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dismiss = () => {
      gsap.to(screenRef.current, {
        yPercent: -100, duration: 0.75, ease: 'power4.inOut',
        onComplete: () => {
          if (screenRef.current) screenRef.current.style.display = 'none'
          document.body.style.overflow = ''
        },
      })
    }

    const ctx = gsap.context(() => {
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline({ onComplete: dismiss })
      tl.from(logoRef.current,    { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from(taglineRef.current, { opacity: 0, y: 12, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .from(barRef.current,     { opacity: 0, duration: 0.3 }, '-=0.1')
        .to(barFillRef.current,   { width: '100%', duration: 1.0, ease: 'power2.inOut' })
        .to({}, { duration: 0.15 })

      // If tab was hidden on load, resume timeline when it becomes visible
      const onVisible = () => { if (!document.hidden) tl.play() }
      document.addEventListener('visibilitychange', onVisible)

      // Hard cap: skip loading screen after 2.5s regardless of tab focus
      const cap = setTimeout(() => {
        if (tl.progress() < 1) { tl.kill(); dismiss() }
      }, 2500)

      return () => {
        document.removeEventListener('visibilitychange', onVisible)
        clearTimeout(cap)
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={screenRef} id="loading-screen">
      {/* Aurora blobs */}
      <div
        className="aurora-blob"
        style={{
          width: '500px', height: '500px',
          background: 'var(--color-blob-1)',
          top: '10%', left: '20%',
          animation: 'aurora-drift 8s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: '400px', height: '400px',
          background: 'var(--color-blob-2)',
          bottom: '15%', right: '15%',
          animation: 'aurora-drift 10s ease-in-out infinite reverse',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div ref={logoRef} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <BrandMark size={56} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3.2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
            className="gradient-brand"
          >
            WebCrew
          </span>
        </div>
        <div
          ref={taglineRef}
          style={{
            color: 'var(--color-muted)',
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Your AI front office. Answering calls 24/7.
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}>
          Website · Calls · Google · Reviews
        </div>
        <div ref={barRef} style={{ width: '240px', height: '3px', background: 'var(--color-border)', margin: '0 auto', borderRadius: '4px' }}>
          <div
            ref={barFillRef}
            style={{
              width: '0%',
              height: '100%',
              background: 'linear-gradient(90deg, #00C26F, #0EA5E9)',
              boxShadow: '0 0 12px rgba(14, 165, 233, 0.6)',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
