export const metadata = {
  title: 'Terms of Service — WebCrew',
  description: 'WebCrew terms of service.',
}

const EFFECTIVE = 'July 15, 2026'

export default function Terms() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--color-bg)', padding:'120px 32px 80px' }}>
      <div style={{ maxWidth:'720px', margin:'0 auto' }}>
        <a href="/" style={{ color:'var(--color-gold)', textDecoration:'none', fontSize:'0.85rem', display:'block', marginBottom:'32px' }}>
          ← Back to WebCrew
        </a>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'2.5rem', letterSpacing:'-0.02em', marginBottom:'8px' }}>
          Terms of Service
        </h1>
        <p style={{ color:'var(--color-muted)', marginBottom:'48px' }}>Effective: {EFFECTIVE}</p>

        {[
          {
            title: 'Acceptance of Terms',
            body: 'By accessing webcrew.app or engaging our services, you agree to these Terms of Service. If you do not agree, do not use our services.',
          },
          {
            title: 'Services',
            body: `WebCrew provides AI-powered website design and deployment services for local businesses. Our services include:
• Custom website design and development
• Website hosting and maintenance
• SMS and email outreach on behalf of our agency
• Ongoing website updates and SEO optimization

We reserve the right to modify, suspend, or discontinue any part of our services at any time.`,
          },
          {
            title: 'AI Receptionist and Accuracy',
            body: `Our phone and messaging receptionist uses artificial intelligence and identifies itself as AI. Calls are recorded and transcribed after notice for service, quality, internal training and evaluation, follow-up, and security.

AI output may be incomplete, delayed, or incorrect and does not constitute legal, medical, financial, emergency, or other professional advice. Prices, appointments, commitments, and other material terms are binding only when confirmed through WebCrew's authorized systems or by a human team member. If an answer appears incorrect, ask for human follow-up or contact hello@webcrew.app.`,
          },
          {
            title: 'Payment Terms',
            body: `AI Front Office plan: $0 setup fee, 2-week free trial, then $299/month flat. Includes the website, 24/7 AI reception, appointment booking, call transcripts and summaries, lead alerts, weekly Google Business Profile posts, and automatic review replies.
Custom/Enterprise services (multi-location, e-commerce, CRM integrations): only as confirmed in writing by an authorized WebCrew team member.

Monthly fees are billed in advance and plans may be cancelled at any time. Late payments may result in service suspension. During an expressly offered founding-customer program, the AI receptionist may propose only system-authorized pilot prices, usage limits, and scope; the final plan is confirmed during onboarding. All fees are non-refundable except as described in our satisfaction guarantee.`,
          },
          {
            title: 'Satisfaction Guarantee',
            body: 'If you are not satisfied with your demo website before making any payment, you owe us nothing. Once payment is made, we will work with you to revise the site to your satisfaction or provide a full refund within 30 days of delivery.',
          },
          {
            title: 'SMS Communications and TCPA Compliance',
            body: `We send SMS messages only to users who explicitly opt in by checking the SMS consent checkbox on our contact form. Providing your phone number alone does not constitute consent to receive text messages.

You may opt out at any time by replying STOP to any message. After opting out, you will receive one final confirmation message. SMS consent is never a condition of purchase or service. We comply with all applicable laws including the Telephone Consumer Protection Act (TCPA).`,
          },
          {
            title: 'Intellectual Property',
            body: 'Upon full payment, you own the content of your website. WebCrew retains rights to the underlying code templates, systems, and AI-generated frameworks. We may use your website as a portfolio example unless you request otherwise.',
          },
          {
            title: 'Prohibited Use',
            body: `You may not use our services to:
• Engage in illegal activities
• Violate any third-party rights
• Transmit malware or harmful code
• Impersonate any person or entity
• Violate any applicable law or regulation`,
          },
          {
            title: 'Limitation of Liability',
            body: 'To the maximum extent permitted by law, WebCrew shall not be liable for any indirect, incidental, special, or consequential damages arising from use of our services. Our total liability shall not exceed the amount you paid us in the 3 months preceding the claim.',
          },
          {
            title: 'Indemnification',
            body: 'You agree to indemnify and hold harmless WebCrew and its officers, employees, and agents from any claims, damages, or expenses arising from your violation of these terms or misuse of our services.',
          },
          {
            title: 'Governing Law',
            body: 'These terms are governed by the laws of the United States. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.',
          },
          {
            title: 'Changes to Terms',
            body: 'We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.',
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
