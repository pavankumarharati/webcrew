'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'
import { PLAN_LIST, priceLabel, type PlanDef } from '@/lib/plans'
import BudgetSlider from './budget-slider'
import CountdownBanner from './countdown-banner'

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger) }

// Card color per plan, and which one gets the "Most Popular" treatment —
// visual-only, doesn't belong in the shared plan data.
const PLAN_COLOR: Record<PlanDef['key'], string> = {
  website_only: '#0EA5E9', website_hosted: '#6366F1', ai_front_office: '#00C26F',
  ai_reception_only: '#F59E0B',
}
const POPULAR_KEY: PlanDef['key'] = 'ai_front_office'

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
            Setup usually costs $499–$999+ — it's $0 today. Every plan starts with a 30-day free trial, full access — card required, no charge until the trial ends.
          </p>

          {/* Social proof pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,194,110,0.06)', border: '1px solid rgba(0,194,110,0.2)',
            borderRadius: 100, padding: '10px 20px', marginTop: 24,
          }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)' }}>
              $0 setup (usually $499–$999+) + a free trial for every new customer during the founding window.
            </span>
          </div>
        </div>

        <CountdownBanner />

        {/* How it works — price journey */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0', marginBottom: '40px',
        }} className="price-journey">
          {[
            { step: '1', label: 'Demo site', price: '$0', note: 'built overnight, no card' },
            { step: '2', label: 'Setup', price: '$0', note: 'usually $499–$999+ · free today' },
            { step: '3', label: 'Free trial', price: '30 days', note: 'card required, no charge yet' },
            { step: '4', label: 'AI team', price: '$297/mo', note: 'after your trial ends' },
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

        {/* 6-SKU card grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
            gap: '20px',
            alignItems: 'stretch',
            maxWidth: '1180px',
            margin: '0 auto',
          }}
          className="pricing-grid"
        >
          {PLAN_LIST.map((plan) => {
            const popular = plan.key === POPULAR_KEY
            const color = PLAN_COLOR[plan.key]
            return (
            <div
              key={plan.key}
              className="pricing-card"
              style={{
                background: popular
                  ? `linear-gradient(175deg, ${color}08 0%, var(--color-bg) 100%)`
                  : 'var(--color-bg)',
                border: popular
                  ? `1.5px solid ${color}50`
                  : '1px solid var(--color-border)',
                borderRadius: '20px',
                padding: '26px 22px',
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                boxShadow: popular ? `0 0 60px ${color}12` : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = `0 20px 60px ${color}20`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = popular ? `0 0 60px ${color}12` : 'none'
              }}
            >
              {popular && (
                <div style={{
                  position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${color}, #0EA5E9)`,
                  color: '#fff', fontWeight: 700, fontSize: '0.62rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '5px 16px', borderRadius: '100px', whiteSpace: 'nowrap',
                }}>
                  ✦ Most Popular
                </div>
              )}

              {popular && (
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              )}

              {/* Plan name */}
              <div style={{
                fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase', color, marginBottom: 12,
                marginTop: popular ? 8 : 0,
              }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '2.4rem', letterSpacing: '-0.04em',
                  color: popular ? color : 'var(--color-text)',
                }}>
                  {priceLabel(plan)}
                </span>
                {plan.billing === 'one_time' && <span style={{ color: 'var(--color-muted)', fontSize: '0.78rem' }}>one-time</span>}
              </div>

              {/* Tagline */}
              <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', lineHeight: 1.55, marginBottom: 18 }}>
                {plan.tagline}
              </p>

              {/* CTA */}
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={popular ? 'btn-primary' : 'btn-ghost'}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7,
                  textDecoration: 'none', marginBottom: 22,
                  fontSize: '0.85rem', padding: '13px 20px',
                  ...(popular ? {} : { borderColor: `${color}40`, color }),
                  ...(popular ? { background: `linear-gradient(135deg, ${color}, #0EA5E9)` } : {}),
                }}
              >
                Get Started <ArrowRight size={14} />
              </a>

              {/* Feature list */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      background: `${color}15`, border: `1px solid ${color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                    }}>
                      <Check size={10} color={color} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-text)', lineHeight: 1.45 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )})}
        </div>

        <BudgetSlider />

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
            {', '}<strong style={{ color: 'var(--color-text)' }}>$0 setup</strong> (usually $499–$999+),
            {' '}and a <strong style={{ color: 'var(--color-text)' }}>30-day free trial</strong> — card required, no charge until the trial ends.
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
