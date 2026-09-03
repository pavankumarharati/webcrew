export const metadata = {
  title: 'Affiliate Terms — WebCrew',
  description: 'WebCrew affiliate program terms — commission structure, attribution, and payout terms.',
}

const EFFECTIVE = 'September 3, 2026'

export default function AffiliateTerms() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--color-bg)', padding:'120px 32px 80px' }}>
      <div style={{ maxWidth:'720px', margin:'0 auto' }}>
        <a href="/" style={{ color:'var(--color-blue)', textDecoration:'none', fontSize:'0.85rem', display:'block', marginBottom:'32px' }}>
          ← Back to WebCrew
        </a>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'2.5rem', letterSpacing:'-0.02em', marginBottom:'8px' }}>
          Affiliate Terms
        </h1>
        <p style={{ color:'var(--color-muted)', marginBottom:'48px' }}>Effective: {EFFECTIVE}</p>

        {[
          {
            title: 'Acceptance of Terms',
            body: 'By applying to or participating in the WebCrew Affiliate Program, you agree to these Affiliate Terms in addition to our general Terms of Service. If you do not agree, do not apply or participate.',
          },
          {
            title: 'Commission Structure',
            body: `Approved affiliates earn 30% of the recurring revenue collected from each client they refer who subscribes to the AI Front Office plan (currently $299/month) — that's $89.70/month per active referred client.

Commission is recurring for the lifetime of that client's subscription, for as long as they remain an active, paying customer. There is no commission on setup fees or one-time charges. Commission is calculated on amounts actually collected, not list price — a discounted or refunded payment earns a proportionally lower or zero commission.`,
          },
          {
            title: 'Referral Attribution',
            body: `A referral is attributed using your unique referral link (webcrew.app/?ref=YOURCODE). Attribution uses last-click logic within a 90-day window — the most recent referral link a prospect clicked before submitting a form is the one credited, and attribution expires after 90 days of inactivity.

We are not responsible for lost attribution due to browser privacy settings, ad blockers, or a prospect clearing their browser storage.`,
          },
          {
            title: 'Payment Terms',
            body: `Commissions accrue monthly as tracked in WebCrew's internal system and are visible to you on request. Payouts are issued manually — via PayPal, Venmo, or bank transfer — on a net-30 basis after the referred client's payment has cleared.

WebCrew reserves the right to withhold or reverse commission on a payment that is later refunded, disputed, or charged back.`,
          },
          {
            title: 'Prohibited Conduct',
            body: `You may not:
• Refer yourself, your own businesses, or any business you have an undisclosed financial interest in
• Bid on "WebCrew," "webcrew.app," or confusingly similar terms in paid search advertising
• Send unsolicited cold SMS, cold email, or spam to promote your referral link — this creates real TCPA liability for both you and WebCrew
• Make false, misleading, or unauthorized claims about WebCrew's product, pricing, or results
• Use deceptive means (cookie stuffing, incentivized clicks without disclosure, etc.) to generate referral attribution`,
          },
          {
            title: 'Termination',
            body: 'WebCrew may terminate any affiliate\'s participation at any time for violating these terms or at our discretion. Commissions already earned on clients referred before termination remain payable under the terms above; no further commission accrues after termination.',
          },
          {
            title: 'Governing Law',
            body: 'These terms are governed by the laws of the United States. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.',
          },
          {
            title: 'Changes to Terms',
            body: 'We may update these terms at any time. Continued participation in the Affiliate Program after changes constitutes acceptance of the updated terms.',
          },
          {
            title: 'Contact',
            body: 'Questions? Email us at hello@webcrew.app.',
          },
        ].map(s => (
          <div key={s.title} style={{ marginBottom:'36px' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.2rem', marginBottom:'10px', color:'var(--color-text)' }}>
              {s.title}
            </h2>
            <p style={{ color:'var(--color-muted)', lineHeight:1.8, whiteSpace:'pre-line', fontSize:'0.95rem' }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
