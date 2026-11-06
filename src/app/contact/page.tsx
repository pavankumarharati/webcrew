import '../blog/blog.css'
import { BlogNav, BlogFooter } from '../blog/chrome'

export const metadata = {
  title: 'Contact WebCrew',
  description: 'Contact WebCrew by phone or email. Call (415) 687-3555 to talk to our AI, or email hello@webcrew.app.',
  alternates: { canonical: 'https://webcrew.app/contact' },
}

const WAYS: [string, string, string][] = [
  ['Sales and free trial', '(415) 687-3555', 'tel:+14156873555'],
  ['General questions', 'hello@webcrew.app', 'mailto:hello@webcrew.app'],
  ['Customer support', 'support@webcrew.app', 'mailto:support@webcrew.app'],
  ['Billing', 'billing@webcrew.app', 'mailto:billing@webcrew.app'],
]

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://webcrew.app/contact#page',
    url: 'https://webcrew.app/contact',
    name: 'Contact WebCrew',
    about: { '@id': 'https://webcrew.app/#organization' },
  }
  return (
    <div className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <article className="bp-article">
        <h1>Contact WebCrew</h1>
        <div className="bp-body">
        <p>The fastest way to reach us is to call. Our AI answers 24/7 and can take a message for the team.</p>
        <div className="bp-table"><table>
          <tbody>{WAYS.map(([k, v, href]) => <tr key={k}><th scope="row">{k}</th><td><a href={href}>{v}</a></td></tr>)}</tbody>
        </table></div>
        <p>Already a client? Sign in at <a href="https://admin.webcrew.app/client/login">your client portal</a> and open Help.</p>
        <p>WebCrew is part of Mind Solutions Inc.</p>
        </div>
      </article>
      <BlogFooter />
    </div>
  )
}
