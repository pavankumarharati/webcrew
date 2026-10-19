import '../blog/blog.css'
import { BlogNav, BlogFooter } from '../blog/chrome'

export const metadata = {
  title: 'About WebCrew: AI Receptionist for Local Service Businesses',
  description: 'WebCrew is a US company, founded in 2026, that builds an AI front desk for local service businesses: 24/7 call answering, booking, follow-ups and review requests.',
  alternates: { canonical: 'https://webcrew.app/about' },
}

const FACTS: [string, string][] = [
  ['What WebCrew is', 'An AI receptionist and front desk for local service businesses in the United States.'],
  ['Founded', '2026'],
  ['Based in', 'United States'],
  ['Who it is for', 'HVAC, plumbing, roofing, electrical, cleaning, contractors, auto services, salons, spas and other appointment-based local businesses.'],
  ['Price', '$99/month for the first 10 clients (locked for life), then $149/month. Custom quotes for multiple locations. $0 setup, 30-day free trial.'],
  ['Technology', 'Google Gemini voice AI, Google Calendar, Twilio phone and texting, Cloudflare hosting.'],
  ['Contact', 'hello@webcrew.app · AI demo line +1 (918) 255-5151'],
]

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://webcrew.app/about#page',
    url: 'https://webcrew.app/about',
    name: 'About WebCrew',
    about: { '@id': 'https://webcrew.app/#organization' },
    mainEntity: { '@id': 'https://webcrew.app/#organization' },
  }
  return (
    <div className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <article className="bp-article">
        <h1>About WebCrew</h1>
        <div className="bp-body">
        <p><strong>WebCrew is an AI front desk for local service businesses.</strong> It answers your business phone and your website chat 24/7, books jobs into your Google Calendar, follows up with leads who did not book, and asks happy customers for a Google review. You keep your own phone number.</p>
        <h2>Why we built it</h2>
        <p>Most local service businesses are run by owners who are on a roof, under a sink or with a client when the phone rings. Calls go to voicemail, and many callers just ring the next company on Google. Answering services cost a lot per call, and hiring a full-time receptionist is out of reach for a small crew. WebCrew gives a small business a front desk that never sleeps, at a flat monthly price.</p>
        <h2>How we work</h2>
        <ul>
          <li>We build a free preview first, so you can test-call the AI before you pay anything.</li>
          <li>The AI only answers from your own business info. When it does not know something, it takes a message instead of guessing.</li>
          <li>Urgent calls are flagged and can be sent to your cell.</li>
          <li>Texts only go to customers who agreed to receive them.</li>
          <li>No overage charges. If you run out of minutes, calls ring your cell until the month resets.</li>
        </ul>
        <h2>Where we are today</h2>
        <p>WebCrew launched in 2026 and is onboarding its first 10 founding clients. We do not publish customer counts or results until we have real ones to share. We do not claim HIPAA or SOC 2 compliance.</p>
        <h2>Quick facts</h2>
        <div className="bp-table"><table>
          <tbody>{FACTS.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
        </table></div>
        <p>Want to hear it? Call the AI demo line at <a href="tel:+19182555151">(918) 255-5151</a>, see <a href="/pricing">pricing</a>, or read our <a href="/blog">guides for service business owners</a>.</p>
        </div>
      </article>
      <BlogFooter />
    </div>
  )
}
