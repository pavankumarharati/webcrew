'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check, Minus } from 'lucide-react'

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger) }

const FREE_ITEMS = [
  'Custom website built overnight — real brand, real photos, real copy',
  'Hosted on yourname.webcrew.app — fast, worldwide, always on',
  'Mobile-perfect · SSL · PageSpeed 90+',
  'Contact form — leads emailed to you instantly',
  'Local SEO on-page — Google knows you exist from day 1',
  'Indexed by Google within 48 hours — no setup fee, ever',
]

const PAID_ITEMS = [
  { label: 'Custom domain (yourdomain.com)', tier: '$49/mo' },
  { label: 'Instant SMS + email lead alerts', tier: '$49/mo' },
  { label: 'Weekly Google Business Profile posts', tier: '$49/mo' },
  { label: 'Auto-reply to Google reviews', tier: '$49/mo' },
  { label: 'Weekly traffic + ranking report', tier: '$49/mo' },
  { label: 'AI Reception — 24/7 call answering + booking', tier: '$199/mo' },
  { label: 'Full AI Front Office (site + reception + booking + lead nurture)', tier: '$297/mo' },
]

export default function AfterYouJoin() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll('.word-inner') ?? [], {
        yPercent: 115, opacity: 0, stagger: 0.04, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      gsap.from(cardsRef.current?.querySelectorAll('.ff-card') ?? [], {
        y: 48, opacity: 0, stagger: 0.15, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
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
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>FREE FOREVER</div>
          <div ref={headingRef}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem,4.5vw,3.8rem)',
              letterSpacing: '-0.04em', lineHeight: 1.08,
            }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>{split('Start free.')}</div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
                <span style={{ background: 'linear-gradient(135deg,#00C26F,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {split('No card. No catch.')}
                </span>
              </div>
            </h2>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: '1rem', maxWidth: '520px', margin: '20px auto 0', lineHeight: 1.7 }}>
            We build your site overnight at zero cost. You see it, use it, get leads from it. Pay only when you want to unlock growth features — and only if you love it.
          </p>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 24,
            alignItems: 'stretch',
          }}
          className="ff-grid"
        >
          {/* FREE card */}
          <div className="ff-card" style={{
            background: 'linear-gradient(160deg, rgba(0,194,110,0.05) 0%, var(--color-bg) 100%)',
            border: '1.5px solid rgba(0,194,110,0.3)',
            borderRadius: 22, padding: '36px 32px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,194,110,0.06)',
          }}>
            {/* Top glow line */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, #00C26F, transparent)' }} />

            {/* Price badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'baseline', gap: 4,
              marginBottom: 8,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '4rem', letterSpacing: '-0.06em', color: '#00C26F', lineHeight: 1 }}>$0</span>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>/forever</span>
            </div>

            <div style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00C26F', marginBottom: 12 }}>
              Free Plan — No Credit Card
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 24, maxWidth: 340 }}>
              A real, professional website for your business — completely free, forever. See leads coming in before you spend a cent.
            </p>

            <a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary"
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                textDecoration: 'none', marginBottom: 28, fontSize: '0.95rem',
              }}
            >
              Build My FREE Site Tonight <ArrowRight size={16} />
            </a>

            <div style={{ borderTop: '1px solid rgba(0,194,110,0.15)', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                Included free — always
              </div>
              {FREE_ITEMS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    background: 'rgba(0,194,110,0.1)', border: '1px solid rgba(0,194,110,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                  }}>
                    <Check size={11} color="#00C26F" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text)', lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Value note */}
            <div style={{
              marginTop: 22, padding: '12px 16px',
              background: 'rgba(0,194,110,0.06)', border: '1px solid rgba(0,194,110,0.15)',
              borderRadius: 10,
            }}>
              <div style={{ fontSize: '0.75rem', color: '#00C26F', fontWeight: 600, lineHeight: 1.5 }}>
                🔒 Worth $1,200+ at any web agency. Yours free. Keep it forever even if you never upgrade.
              </div>
            </div>
          </div>

          {/* UPGRADE card */}
          <div className="ff-card" style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 22, padding: '36px 32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.6rem', letterSpacing: '-0.04em', color: 'var(--color-text)', lineHeight: 1 }}>$49</span>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>/mo to start</span>
            </div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: 12 }}>
              Upgrade when you&apos;re ready
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 24 }}>
              Already getting leads from your free site? Unlock the full AI team — calls, reviews, posts, reports, ads — all automatic.
            </p>

            <a
              href="#pricing"
              onClick={e => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-ghost"
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                textDecoration: 'none', marginBottom: 28, fontSize: '0.9rem',
                color: 'var(--color-text)', borderColor: 'var(--color-border)',
              }}
            >
              See all plans →
            </a>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 22 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                Unlock with paid plan
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PAID_ITEMS.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                    }}>
                      <Minus size={10} color="#9CA3AF" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>{item.label}</span>
                      <span style={{
                        fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-accent)',
                        background: 'rgba(0,194,110,0.07)', border: '1px solid rgba(0,194,110,0.2)',
                        borderRadius: 6, padding: '1px 7px', whiteSpace: 'nowrap', flexShrink: 0,
                      }}>{item.tier}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lock in note */}
            <div style={{
              marginTop: 22, padding: '12px 16px',
              background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)',
              borderRadius: 10,
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-blue)', fontWeight: 600, lineHeight: 1.5 }}>
                ⚡ Founding members lock $49/mo forever — price raises at public launch.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', marginTop: 28, fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
          No credit card to start. No contract. No setup fee. The free site is yours to keep even if you never pay a cent.
        </p>

      </div>

      <style>{`
        @media (max-width: 760px) {
          .ff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
