export const metadata = {
  title: 'Privacy Policy — WebCrew',
  description: 'WebCrew privacy policy — how we collect and use your information.',
  alternates: { canonical: 'https://webcrew.app/privacy' },
}

const EFFECTIVE = 'July 15, 2026'

export default function Privacy() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--color-bg)', padding:'120px 32px 80px' }}>
      <div style={{ maxWidth:'720px', margin:'0 auto' }}>
        <a href="/" style={{ color:'var(--color-blue)', textDecoration:'none', fontSize:'0.85rem', display:'block', marginBottom:'32px' }}>
          ← Back to WebCrew
        </a>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'2.5rem', letterSpacing:'-0.02em', marginBottom:'8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color:'var(--color-muted)', marginBottom:'48px' }}>Effective: {EFFECTIVE}</p>

        {[
          {
            title: 'Who We Are',
            body: 'WebCrew ("we", "us", "our") operates webcrew.app, an AI-powered website agency that builds and deploys websites for local businesses. Our contact email is hello@webcrew.app.',
          },
          {
            title: 'Information We Collect',
            body: `We collect information you provide directly (name, business name, phone number, email address, industry) when you submit our contact form or respond to our outreach.

We also collect usage data automatically (IP address, browser type, pages visited, time on site) via standard server logs and analytics tools. We do not use third-party advertising trackers.`,
          },
          {
            title: 'AI Receptionist, Calls, and Recordings',
            body: `When you call or interact with our receptionist, you are communicating with an artificial-intelligence system. We provide notice at the beginning of the call. Calls are recorded and transcribed for service, quality, internal training and evaluation, lead follow-up, appointment handling, security, and improvement.

Call information may include your telephone number, audio, transcript, name, email, business details, requests, appointment preferences, SMS replies, and conversation summaries. Please do not provide sensitive personal information that is not needed for your request.

AI-generated responses can be incomplete or incorrect. Do not rely on the receptionist for legal, medical, financial, emergency, or other professional advice. You may ask for human follow-up, and you may request correction or deletion of eligible information by emailing hello@webcrew.app.`,
          },
          {
            title: 'How We Use Your Information',
            body: `We use the information we collect to:
• Build and deliver your demo website
• Contact you about your demo site via SMS and email
• Respond to your inquiries
• Improve our services
• Comply with legal obligations

We do not sell your personal information to third parties.`,
          },
          {
            title: 'SMS Communications',
            body: `End-users provide explicit consent by visiting webcrew.app and entering their phone number into our contact or website audit request form. By checking the consent checkbox, users opt into receiving text messages from WebCrew regarding website design and related services. We do not engage in unsolicited cold texting.

Message and data rates may apply. Message frequency varies. Consent is not a condition of purchase.

To opt out, reply STOP to any SMS message. To get help, reply HELP. For more information, email hello@webcrew.app.

Carriers are not liable for delayed or undelivered messages.`,
          },
          {
            title: 'Data Sharing',
            body: `We share your information only with:
• Service providers who help us operate (hosting and AI processing through Google Cloud/Vertex AI, calls and SMS through Twilio, email through Resend, scheduling, database, analytics, and security providers)
• Law enforcement when required by law

All service providers are bound by confidentiality agreements.

No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.`,
          },
          {
            title: 'Data Retention',
            body: 'We retain contact, call, recording, transcript, scheduling, and service information only for as long as reasonably necessary for the purposes described above, dispute resolution, security, and legal obligations. Retention periods vary by record type and account relationship. We delete or de-identify information when it is no longer needed, subject to legal and operational exceptions. You may request deletion of eligible data at any time by emailing hello@webcrew.app.',
          },
          {
            title: 'Your Rights',
            body: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information
• Opt out of SMS communications at any time by replying STOP

To exercise these rights, contact us at hello@webcrew.app.`,
          },
          {
            title: 'Security',
            body: 'We implement appropriate technical and organizational measures to protect your information. However, no internet transmission is 100% secure. We encourage you to use strong passwords and notify us immediately of any unauthorized access.',
          },
          {
            title: 'Cookies',
            body: 'Our website uses minimal cookies for basic functionality (session management). We do not use advertising or tracking cookies.',
          },
          {
            title: 'Changes to This Policy',
            body: 'We may update this policy occasionally. We will notify you of significant changes via email or prominent notice on our website.',
          },
          {
            title: 'Contact Us',
            body: 'Questions about this privacy policy? Email us at hello@webcrew.app or write to: WebCrew, United States.',
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
