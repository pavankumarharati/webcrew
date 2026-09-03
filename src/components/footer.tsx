'use client'
import { SHOW_PUBLIC_PRICING } from '@/lib/features'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(160deg, #04040E 0%, #080820 100%)',
      padding: '80px 32px 40px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.5fr) 1fr 1fr 1fr',
          gap: '48px',
          paddingBottom: '64px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '40px',
        }}
        className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #00C26F, #0EA5E9)',
                borderRadius: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.1rem', color: '#FFFFFF',
              }}>W</span>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '1.3rem', letterSpacing: '-0.02em', color: '#FFFFFF',
              }}>WebCrew</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem',
              lineHeight: 1.75, maxWidth: 280, marginBottom: 28,
            }}>
              Helping local businesses get more customers through better websites, SEO and continuous growth.
            </p>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #00C26F, #0EA5E9)',
                color: '#fff', fontWeight: 700, fontSize: '0.82rem',
                borderRadius: 100, padding: '10px 22px',
                textDecoration: 'none', letterSpacing: '0.01em',
              }}
            >
              Get My FREE Site →
            </a>
          </div>

          {/* Product col */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
              Product
            </div>
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Showcase',     href: '#showcase' },
              { label: 'Features',     href: '#features' },
              ...(SHOW_PUBLIC_PRICING ? [{ label: 'Pricing', href: '#pricing' }] : []),
              { label: 'Affiliates',   href: '/affiliate' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{
                display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem',
                textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{l.label}</a>
            ))}
          </div>

          {/* Niches col */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
              Industries
            </div>
            {['HVAC', 'Roofing', 'Dentist', 'Med Spa', 'Landscaping', 'Auto Detail', 'Cleaning', 'Law Firm'].map(n => (
              <div key={n} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 12 }}>{n}</div>
            ))}
          </div>

          {/* Legal col */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
              Legal
            </div>
            {[
              { label: 'Privacy Policy',    href: '/privacy' },
              { label: 'Terms of Service',  href: '/terms' },
              { label: 'Affiliate Terms',   href: '/affiliate-terms' },
              { label: 'Contact Us',        href: '#contact' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{
                display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem',
                textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{l.label}</a>
            ))}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.78rem', color: '#10B981' }}>All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>
            © {year} WebCrew · AI-powered websites for local businesses
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>
            Built with Next.js · Deployed on Cloudflare Pages · 99.9% uptime
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
