'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, DollarSign, Phone, TrendingUp, Shield, Zap } from 'lucide-react'

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger) }

const REASONS = [
  {
    icon: Clock,
    color: '#00C26F',
    title: 'Not in 6 weeks. Tonight.',
    pain: 'Every week without a site = missed calls, missed jobs, money handed to competitors who rank above you.',
    solution: 'Submit tonight. Wake up to a live, Google-indexed site. AI team active from minute one.',
  },
  {
    icon: DollarSign,
    color: '#0EA5E9',
    title: 'Agencies charge $8K–$20K upfront.',
    pain: '"It\'ll take 3 months and $15,000." Meanwhile your competitor\'s site is ranking and taking your calls.',
    solution: 'We build it free. You only pay $49/mo if you want to grow. No contract. No setup fee. Cancel anytime.',
  },
  {
    icon: Phone,
    color: '#8B5CF6',
    title: 'You miss calls. AI never does.',
    pain: '62% of calls to small businesses go unanswered. Every unanswered call is a lost job — often $500–$2,000.',
    solution: 'Your AI receptionist answers your calls, 24/7 — books appointments, answers FAQs, sends you a summary.',
  },
  {
    icon: TrendingUp,
    color: '#F59E0B',
    title: 'Sites don\'t grow. AI-managed ones do.',
    pain: 'A static website from 2021 isn\'t growing. Your competitors who post to GBP weekly rank above you.',
    solution: '52 GBP posts/yr, review replies, SEO improvements, and weekly reports — all running automatically.',
  },
  {
    icon: Shield,
    color: '#EF4444',
    title: 'Wix/Squarespace own your site. You don\'t.',
    pain: 'Cancel Wix = lose your site. They own the template, the hosting, and your data. You\'re renting, not owning.',
    solution: 'You own your WebCrew site outright. Cancel hosting anytime — the code is yours to keep, forever.',
  },
  {
    icon: Zap,
    color: '#10B981',
    title: 'One subscription. Eight AI employees.',
    pain: 'Hiring: Web designer $4k/mo. SEO agency $1.5k/mo. Receptionist $3k/mo. Social manager $2.5k/mo.',
    solution: 'WebCrew replaces all of them for $99/mo. AI doesn\'t call in sick. It doesn\'t take weekends off.',
  },
]

export default function WhyWebcrew() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll('.word-inner') ?? [], {
        yPercent: 115, opacity: 0, stagger: 0.04, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      gsap.from(gridRef.current?.querySelectorAll('.why-card') ?? [], {
        y: 44, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })

      gridRef.current?.querySelectorAll('.why-card').forEach(card => {
        const el = card as HTMLElement
        const setRX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power2.out' })
        const setRY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power2.out' })
        gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
          const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
          setRY(dx * 6); setRX(-dy * 4)
        }
        const onLeave = () => { setRX(0); setRY(0) }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    return () => ctx.revert()
  }, [])

  const split = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="word-wrap" style={{ display: 'inline-block', marginRight: '0.22em' }}>
        <span className="word-inner">{w}{' '}</span>
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>WHY WEBCREW</div>
          <div ref={headingRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem,4.2vw,3.6rem)',
              letterSpacing: '-0.035em', lineHeight: 1.1,
            }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.12em' }}>{split('The problems every')}</div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.12em' }}>
                <span style={{ background: 'linear-gradient(135deg,#00C26F,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {split('local business has.')}
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.12em' }}>{split('We solve them all.')}</div>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 300, paddingBottom: 6 }}>
              Six real problems. Six AI-powered solutions. One subscription.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
            gap: '18px',
          }}
          className="why-grid"
        >
          {REASONS.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="why-card"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 18, padding: '28px 24px',
                  cursor: 'default',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = `${r.color}35`
                  el.style.boxShadow = `0 16px 48px ${r.color}10`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'var(--color-border)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${r.color}10`, border: `1.5px solid ${r.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon size={18} color={r.color} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '1rem', letterSpacing: '-0.02em',
                  color: 'var(--color-text)', marginBottom: 12, lineHeight: 1.3,
                }}>
                  {r.title}
                </h3>

                {/* Pain */}
                <div style={{
                  padding: '10px 12px', borderRadius: 8, marginBottom: 12,
                  background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)',
                }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#EF4444', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>The Problem</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>{r.pain}</div>
                </div>

                {/* Solution */}
                <div style={{
                  padding: '10px 12px', borderRadius: 8,
                  background: `${r.color}08`, border: `1px solid ${r.color}20`,
                }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: r.color, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Our Fix</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text)', lineHeight: 1.55 }}>{r.solution}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 580px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
