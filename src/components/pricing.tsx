'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check, Minus } from 'lucide-react'

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger) }

const TIERS = [
  {
    id: 'front-office',
    name: 'AI Front Office',
    price: 299,
    note: 'per month · cancel anytime',
    tagline: 'Website + AI receptionist that answers every call, books appointments, and runs your front office end to end.',
    cta: 'Get Started',
    popular: true,
    color: '#00C26F',
    features: [
      { label: 'Website built overnight — custom to your brand', included: true },
      { label: 'Custom domain (yourdomain.com) — yours forever', included: true },
      { label: 'AI Reception — answers calls 24/7 in your voice', included: true },
      { label: 'Appointment booking via AI (auto-confirms)', included: true },
      { label: 'Call transcripts + summary sent after every call', included: true },
      { label: 'Instant lead SMS + email alerts', included: true },
      { label: 'Weekly Google Business Profile posts (52/yr)', included: true },
      { label: 'Reply to every Google review automatically', included: true },
      { label: 'Monthly GSC traffic + ranking report', included: true },
      { label: 'PageSpeed 97/100 · SSL · Mobile-perfect', included: true },
      { label: 'Social media posts (IG + FB + GBP)', included: false, badge: 'Coming Soon' },
      { label: 'Ads manager (Google + Meta)', included: false },
    ],
    value: '$1,200+/mo at any agency',
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 'Custom',
    note: 'multi-location · e-commerce · integrations',
    tagline: 'Everything in AI Front Office, sized for multi-location and franchise operators.',
    cta: 'Talk to our crew',
    popular: false,
    color: '#8B5CF6',
    features: [
      { label: 'Everything in AI Front Office', included: true },
      { label: 'Multi-location dashboard', included: true },
      { label: 'E-commerce / booking integrations', included: true },
      { label: 'CRM integrations', included: true },
      { label: 'Dedicated onboarding specialist', included: true },
    ],
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll('.word-inner') ?? [], {
        yPercent: 115, opacity: 0, stagger: 0.045, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      gsap.from(cardsRef.current?.querySelectorAll('.pricing-card') ?? [], {
        y: 56, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
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
      id="pricing"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,12vw,140px) clamp(24px,5vw,60px)',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
            Pricing
            <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
          </div>
          <div ref={headingRef}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.2rem,5.5vw,4rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              {split('Hire your AI team')}
              <span className="gradient-brand"> {split('for less than a daily coffee.')}</span>
            </h2>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', maxWidth: '560px', margin: '20px auto 0', lineHeight: 1.65 }}>
            Setup is normally $499 — it's $0 today. Every plan starts with a 2-week free trial, full access, no card required.
          </p>

          {/* Social proof pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,194,110,0.06)', border: '1px solid rgba(0,194,110,0.2)',
            borderRadius: 100, padding: '10px 20px', marginTop: 24,
          }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)' }}>
              $0 setup (normally $499) + 2 weeks free for every new customer, always.
            </span>
          </div>
        </div>

        {/* How it works — price journey */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0', marginBottom: '40px',
        }} className="price-journey">
          {[
            { step: '1', label: 'Demo site', price: '$0', note: 'built overnight, no card' },
            { step: '2', label: 'Setup', price: '$0', note: 'normally $499 · free today' },
            { step: '3', label: 'Free trial', price: '2 weeks', note: 'full access, no card' },
            { step: '4', label: 'AI team', price: '$299/mo', note: 'after your trial ends' },
          ].map((s, i) => (
            <div key={s.step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                textAlign: 'center', padding: '16px 24px',
                background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                borderRadius: 14, minWidth: 160,
              }}>
                <div style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>Step {s.step}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', color: i === 1 || i === 2 ? '#00C26F' : 'var(--color-text)', lineHeight: 1 }}>{s.price}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-muted)', marginTop: 2 }}>{s.note}</div>
              </div>
              {i < 3 && <div style={{ width: 32, height: 1, background: 'var(--color-border)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* 2-column card grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
            gap: '24px',
            alignItems: 'stretch',
            maxWidth: '860px',
            margin: '0 auto',
          }}
          className="pricing-grid"
        >
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className="pricing-card"
              style={{
                background: tier.popular
                  ? `linear-gradient(175deg, ${tier.color}08 0%, var(--color-bg) 100%)`
                  : 'var(--color-bg)',
                border: tier.popular
                  ? `1.5px solid ${tier.color}50`
                  : '1px solid var(--color-border)',
                borderRadius: '20px',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                boxShadow: tier.popular ? `0 0 60px ${tier.color}12` : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
                opacity: (tier as any).comingSoon ? 0.62 : 1,
                filter: (tier as any).comingSoon ? 'grayscale(0.3)' : 'none',
              }}
              onMouseEnter={e => {
                if ((tier as any).comingSoon) return
                const el = e.currentTarget
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = `0 20px 60px ${tier.color}20`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = tier.popular ? `0 0 60px ${tier.color}12` : 'none'
              }}
            >
              {tier.popular && (
                <div style={{
                  position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${tier.color}, #0EA5E9)`,
                  color: '#fff', fontWeight: 700, fontSize: '0.62rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '5px 16px', borderRadius: '100px', whiteSpace: 'nowrap',
                }}>
                  ✦ Most Popular
                </div>
              )}

              {(tier as any).comingSoon && (
                <div style={{
                  position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(156,163,175,0.18)', border: '1px solid rgba(156,163,175,0.3)',
                  color: '#9CA3AF', fontWeight: 700, fontSize: '0.62rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '5px 16px', borderRadius: '100px', whiteSpace: 'nowrap',
                }}>
                  Coming Soon
                </div>
              )}

              {/* Top glow line for popular */}
              {tier.popular && (
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />
              )}

              {/* Tier name */}
              <div style={{
                fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: tier.color, marginBottom: 12,
                marginTop: tier.popular ? 8 : 0,
              }}>
                {tier.name}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '2.8rem', letterSpacing: '-0.04em',
                  color: tier.popular ? tier.color : 'var(--color-text)',
                }}>
                  {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                </span>
                {typeof tier.price === 'number' && <span style={{ color: 'var(--color-muted)', fontSize: '0.78rem' }}>/mo</span>}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginBottom: 10, lineHeight: 1.4 }}>
                {tier.note}
              </div>

              {/* Value comparison */}
              {(tier as any).value && (
                <div style={{
                  fontSize: '0.68rem', fontWeight: 600,
                  color: tier.color,
                  background: `${tier.color}0C`,
                  border: `1px solid ${tier.color}22`,
                  borderRadius: 7, padding: '6px 10px',
                  marginBottom: 16, lineHeight: 1.4,
                }}>
                  {(tier as any).value}
                </div>
              )}

              {/* Tagline */}
              <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem', lineHeight: 1.55, marginBottom: 20 }}>
                {tier.tagline}
              </p>

              {/* CTA */}
              {(tier as any).comingSoon ? (
                <div
                  className="btn-ghost"
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7,
                    marginBottom: 22, fontSize: '0.85rem', padding: '13px 20px',
                    borderColor: 'rgba(156,163,175,0.3)', color: '#9CA3AF',
                    cursor: 'default', pointerEvents: 'none',
                  }}
                >
                  {tier.cta}
                </div>
              ) : (
                <a
                  href="#contact"
                  onClick={e => {
                    e.preventDefault()
                    window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={tier.popular ? 'btn-primary' : 'btn-ghost'}
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7,
                    textDecoration: 'none', marginBottom: 22,
                    fontSize: '0.85rem', padding: '13px 20px',
                    ...(tier.popular ? {} : {
                      borderColor: `${tier.color}40`,
                      color: tier.color,
                    }),
                    ...(tier.popular ? { background: `linear-gradient(135deg, ${tier.color}, #0EA5E9)` } : {}),
                  }}
                >
                  {tier.cta} <ArrowRight size={14} />
                </a>
              )}

              {/* Feature list */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {tier.features.map(f => (
                  <div key={f.label} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', opacity: f.included ? 1 : 0.38 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      background: f.included ? `${tier.color}15` : 'rgba(0,0,0,0.04)',
                      border: f.included ? `1px solid ${tier.color}35` : '1px solid rgba(0,0,0,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 1,
                    }}>
                      {f.included
                        ? <Check size={10} color={tier.color} strokeWidth={2.5} />
                        : <Minus size={9} color="#9CA3AF" />
                      }
                    </div>
                    <span style={{ fontSize: '0.78rem', color: f.included ? 'var(--color-text)' : 'var(--color-muted)', lineHeight: 1.45 }}>
                      {f.label}
                      {(f as any).badge && (
                        <span style={{
                          marginLeft: 6, fontSize: '0.6rem', fontWeight: 700,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: tier.color, background: `${tier.color}15`,
                          border: `1px solid ${tier.color}30`,
                          borderRadius: 4, padding: '1px 5px', verticalAlign: 'middle',
                        }}>
                          {(f as any).badge}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Free tier note */}
        <div style={{
          marginTop: 20, textAlign: 'center',
          padding: '16px 24px',
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
        }}>
          <span style={{ fontSize: '0.84rem', color: 'var(--color-muted)' }}>
            All plans include a{' '}
            <strong style={{ color: 'var(--color-text)' }}>FREE demo website built overnight</strong>
            {', '}<strong style={{ color: 'var(--color-text)' }}>$0 setup</strong> (normally $499),
            {' '}and a <strong style={{ color: 'var(--color-text)' }}>2-week free trial</strong> — no card required.
            {' '}<a href="#contact" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Get started free →</a>
          </span>
        </div>

        {/* Budget objection / crew banner */}
        <div style={{
          marginTop: 14, textAlign: 'center',
          padding: '14px 24px',
          background: 'rgba(0,194,110,0.05)',
          border: '1px solid rgba(0,194,110,0.15)',
          borderRadius: 14,
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            Budget tight? <a href="#contact" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Talk to our crew</a> — we're here to help.
            {' '}<span style={{ color: 'var(--color-text)', fontWeight: 600 }}>Happy Customers. Happy Business. Happy Crew.</span>
          </span>
        </div>

        {/* ── Pricing Roadmap ── */}
        <div style={{
          marginTop: '48px',
          background: 'linear-gradient(160deg, #04040E 0%, #080820 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '22px 32px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 5 }}>
                Pricing Roadmap
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                Price increases at every milestone. Lock founding rates now.
              </div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(0,194,110,0.1)', border: '1px solid rgba(0,194,110,0.28)',
              borderRadius: 100, padding: '7px 15px',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C26F', boxShadow: '0 0 8px rgba(0,194,110,0.8)' }} />
              <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#00C26F' }}>Founding window — open now</span>
            </div>
          </div>

          <div style={{ padding: '0 32px 24px' }}>
            {[
              { phase: '1', label: 'Founding Members',    price: '$299/mo',      note: 'Locked for life on all current features',     current: true,  badge: 'NOW'  },
              { phase: '2', label: 'Public Launch',        price: 'from $199/mo', note: 'Price increases on launch day',               current: false, badge: 'NEXT' },
              { phase: '3', label: 'AI Reception Live',    price: 'from $249/mo', note: 'Reception now default across all plans',      current: false, badge: 'Q3'   },
              { phase: '4', label: 'Business OS v2',       price: 'from $399/mo', note: 'CRM + automations + referral network',        current: false, badge: 'Q4'   },
              { phase: '5', label: 'Agency Suite',         price: '$997+/mo',     note: 'Franchise management + AI white-label',       current: false, badge: '2026' },
            ].map((tier, i, arr) => (
              <div key={tier.label} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 34, flexShrink: 0, paddingTop: 22 }}>
                  <div style={{
                    width: tier.current ? 13 : 9, height: tier.current ? 13 : 9,
                    borderRadius: '50%',
                    background: tier.current ? 'linear-gradient(135deg, #00C26F, #0EA5E9)' : i === 1 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                    border: tier.current ? 'none' : '1.5px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                    boxShadow: tier.current ? '0 0 14px rgba(0,194,110,0.7)' : 'none',
                  }} />
                  {i < arr.length - 1 && (
                    <div style={{ flex: 1, width: 1.5, minHeight: 20, background: tier.current ? 'linear-gradient(to bottom, rgba(0,194,110,0.35), rgba(255,255,255,0.05))' : 'rgba(255,255,255,0.05)' }} />
                  )}
                </div>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                  padding: tier.current ? '16px 18px' : '12px 18px',
                  margin: tier.current ? '10px 0 4px' : '3px 0',
                  borderRadius: 10,
                  background: tier.current ? 'linear-gradient(135deg, rgba(0,194,110,0.08) 0%, rgba(14,165,233,0.05) 100%)' : 'transparent',
                  border: tier.current ? '1px solid rgba(0,194,110,0.18)' : '1px solid transparent',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: tier.current ? '0.95rem' : '0.84rem', fontWeight: tier.current ? 700 : 500, color: tier.current ? '#FFFFFF' : i === 1 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-display)' }}>
                        {tier.label}
                      </span>
                      <span style={{ fontSize: '0.54rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 100, background: tier.current ? 'linear-gradient(135deg, #00C26F, #0EA5E9)' : i === 1 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', color: tier.current ? '#fff' : i === 1 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)' }}>
                        {tier.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: tier.current ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}>{tier.note}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: tier.current ? '1.4rem' : '1rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)', color: tier.current ? '#00C26F' : i === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)' }}>
                      {tier.price}
                    </div>
                    {tier.current && <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>locked for life</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '18px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.28)', margin: 0 }}>
              Founding Members keep their rate <strong style={{ color: 'rgba(255,255,255,0.45)' }}>forever</strong> — regardless of future plan pricing.
            </p>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 700, background: 'linear-gradient(135deg, #00C26F, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}
            >
              Lock founding rate before launch →
            </a>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.82rem', color: 'var(--color-muted)' }}>
          Multiple locations or enterprise?{' '}
          <a href="#contact" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}>
            Contact us — custom pricing available.
          </a>
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .price-journey { flex-direction: column !important; align-items: stretch !important; }
          .price-journey > div { width: 100% !important; }
          .price-journey > div > div[style*="height: 1"] { display: none !important; }
        }
      `}</style>
    </section>
  )
}
