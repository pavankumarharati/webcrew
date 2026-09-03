'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Link2, Users, Wallet } from 'lucide-react'

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger) }

const STEPS = [
  { icon: Link2, title: 'Get your link', body: 'Apply below — once approved, you get a unique referral link to share however you promote.' },
  { icon: Users, title: 'They subscribe', body: 'A local business you refer signs up for the AI Front Office plan at $299/mo.' },
  { icon: Wallet, title: 'You earn, monthly', body: '30% of what they pay — $89.70/mo per active client — for as long as they stay subscribed.' },
]

export default function AffiliateHero() {
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)
  const bandRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll('.word-inner') ?? [], {
        yPercent: 115, opacity: 0, stagger: 0.045, duration: 0.75, ease: 'power3.out',
      })
      gsap.from(stepsRef.current?.querySelectorAll('.affiliate-step') ?? [], {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 82%' },
      })
      gsap.from(bandRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: bandRef.current, start: 'top 82%' },
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
    <>
      {/* Dark hero band */}
      <section style={{
        background: 'linear-gradient(160deg, #04040E 0%, #080820 55%, #0D0B28 100%)',
        padding: 'clamp(140px,16vw,180px) 32px clamp(60px,8vw,90px)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div className="aurora-blob" style={{ width: '500px', height: '500px', background: 'rgba(0,194,110,0.1)', top: '-20%', left: '-10%', animation: 'aurora-drift 18s ease-in-out infinite' }} />
        <div className="aurora-blob" style={{ width: '400px', height: '400px', background: 'rgba(14,165,233,0.08)', bottom: '-10%', right: '-5%', animation: 'aurora-drift 22s ease-in-out infinite reverse' }} />
        <div className="noise-overlay" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20, color: '#00C26F' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(0,194,110,0.5)' }} />
            Affiliate Program
            <span style={{ width: 24, height: 1, background: 'rgba(0,194,110,0.5)' }} />
          </div>
          <div ref={headingRef}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2.2rem,5.5vw,3.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#FFFFFF', marginBottom: '20px',
            }}>
              {split('Earn 30% recurring —')}
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #00C26F, #0EA5E9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {split('for the life of every client you send us.')}
              </span>
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 32px' }}>
            No cap, no clawback games. A client you refer pays $299/mo — you earn $89.70/mo for as long as they stay a customer.
          </p>
          <a
            href="#apply"
            onClick={e => { e.preventDefault(); document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            Apply to the Program <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: 'clamp(60px,10vw,100px) 32px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
              How It Works
              <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', letterSpacing: '-0.03em' }}>
              Three steps, no strings
            </h2>
          </div>

          <div ref={stepsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '24px' }} className="affiliate-steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.title} className="affiliate-step card-glow" style={{ padding: '32px 28px' }}>
                <div style={{
                  fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-accent)', marginBottom: 16,
                }}>
                  Step {i + 1}
                </div>
                <div className="icon-gradient" style={{ marginBottom: 16 }}>
                  <s.icon size={22} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Commission example — dark band */}
          <div ref={bandRef} style={{
            marginTop: '48px',
            background: 'linear-gradient(160deg, #04040E 0%, #080820 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: 'clamp(28px,5vw,40px) clamp(24px,5vw,40px)',
          }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>
              Example
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              Refer 5 clients who stay subscribed
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.4rem,6vw,3.2rem)', letterSpacing: '-0.03em', color: '#00C26F' }}>
                $448.50/mo
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                5 × $89.70 — paid every month they stay
              </span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .affiliate-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
