import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AffiliateHero from './affiliate-hero'
import AffiliateApplyForm from '@/components/affiliate-apply-form'

export const metadata = {
  title: 'Affiliate Program — WebCrew',
  description: 'Earn 30% recurring commission, for the life of every client you send WebCrew.',
}

export default function AffiliatePage() {
  return (
    <>
      <Nav />
      <AffiliateHero />

      <section id="apply" style={{ background: 'var(--color-bg)', padding: 'clamp(48px,8vw,80px) 32px clamp(80px,12vw,140px)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
              Apply
              <span style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.8rem,4vw,2.6rem)', letterSpacing: '-0.03em', lineHeight: 1.15,
            }}>
              Join the program
            </h2>
          </div>
          <AffiliateApplyForm />
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.82rem', color: 'var(--color-muted)' }}>
            Read the full{' '}
            <a href="/affiliate-terms" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}>
              Affiliate Terms
            </a>{' '}before applying.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
