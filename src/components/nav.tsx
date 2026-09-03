'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Menu, X } from 'lucide-react'
import { SHOW_PUBLIC_PRICING } from '@/lib/features'
import BrandMark from './brand-mark'

const LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase',     href: '#showcase' },
  { label: 'Features',     href: '#features' },
  ...(SHOW_PUBLIC_PRICING ? [{ label: 'Pricing', href: '#pricing' }] : []),
  { label: 'Affiliates',   href: '/affiliate' },
]

export default function Nav() {
  const navRef     = useRef<HTMLElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    gsap.from(navRef.current, { y: -24, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          padding: '0 clamp(20px,5vw,40px)', height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
          background: scrolled ? 'rgba(6,6,12,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
          <BrandMark size={32} />
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#FFFFFF',
          }}>
            WebCrew
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="nav-links-desktop">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="#contact"
            className="btn-primary nav-cta"
            style={{ padding: '10px 22px', fontSize: '0.82rem' }}
            onClick={e => {
              e.preventDefault()
              window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get Free Demo <ArrowRight size={14} />
          </a>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="hamburger-btn"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              width: '40px', height: '40px',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFFFFF',
              transition: 'background 0.2s',
              zIndex: 10,
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Blobs */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(0,194,110,0.1)', filter: 'blur(80px)',
          top: '-10%', right: '-10%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(14,165,233,0.07)', filter: 'blur(80px)',
          bottom: '10%', left: '-5%', pointerEvents: 'none',
        }} />

        {/* Nav links */}
        <nav style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                display: 'block',
                padding: '20px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '-0.02em',
                transition: 'color 0.2s',
                animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00C26F')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', paddingTop: 32 }}>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              closeMenu()
              window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'demo' } }))
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)
            }}
            className="btn-primary"
            style={{ justifyContent: 'center', fontSize: '1rem', padding: '16px 28px', textAlign: 'center', display: 'flex' }}
          >
            Build My FREE Website <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              closeMenu()
              window.dispatchEvent(new CustomEvent('wc:tab', { detail: { tab: 'audit' } }))
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)
            }}
            className="btn-ghost"
            style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Free Growth Audit
          </a>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
            No credit card. No setup fee. See it live first.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 800;
          background: linear-gradient(160deg, #03030D 0%, #07071A 100%);
          display: flex;
          flex-direction: column;
          padding: 96px 32px 48px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        .mobile-menu-overlay.open {
          transform: translateX(0);
        }
      `}</style>
    </>
  )
}
