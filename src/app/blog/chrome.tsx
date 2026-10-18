import BrandMark from '@/components/brand-mark'

export function BlogNav() {
  return (
    <nav className="bp-nav">
      <a href="/" className="bp-logo"><BrandMark size={30} />WebCrew</a>
      <div className="bp-nav-links"><a href="/blog">Blog</a><a href="/pricing">Pricing</a><a href="/#how-it-works">How it works</a><a href="/#faq">FAQ</a><a className="bp-cta" href="/#lead-form">Get a free demo</a></div>
    </nav>
  )
}

export function BlogCta() {
  return (
    <div className="bp-box">
      <h2>Stop losing calls you never heard ring.</h2>
      <p>WebCrew answers your phone and your website 24/7, books jobs into your calendar, follows up, and asks happy customers for reviews. Founding 10: $99/mo locked for life, 250 AI minutes, $0 setup, 30-day free trial.</p>
      <a className="bp-cta" href="/#lead-form">Build my free demo</a>
    </div>
  )
}

export function BlogFooter() {
  return <footer className="bp-foot">© WebCrew · AI front desk for local businesses · <a href="/blog">Blog</a><a href="/pricing">Pricing</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></footer>
}
