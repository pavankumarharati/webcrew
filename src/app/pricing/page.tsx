import '../blog/blog.css'
import TierPricing from '@/components/tier-pricing'
import { BlogNav, BlogFooter } from '../blog/chrome'

export const metadata = {
  title: 'Pricing: AI Receptionist from $99/mo | WebCrew',
  description: 'WebCrew pricing: Founding 10 at $99/mo locked for life, Standard at $149/mo, or a custom quote for multi-location. $0 setup, 30-day free trial.',
  alternates: { canonical: 'https://webcrew.app/pricing' },
}

const FAQ: [string, string][] = [
  ['What happens if I run out of AI minutes?', 'Calls ring your cell instead of the AI until your month resets. We never bill overage, so there are no surprise charges.'],
  ['Is there a setup fee or contract?', 'No. Setup is $0, there is no contract, and you can cancel anytime.'],
  ['How does the free trial work?', 'Every plan starts with a 30-day free trial with full access. A card is needed to start it, and nothing is charged until the trial ends.'],
  ['What is the Founding 10 rate?', 'The first 10 clients pay $99 a month for as long as they stay, with 250 AI minutes. After those spots fill, new clients pay $149 a month with 500 AI minutes.'],
  ['When do I need a custom quote?', 'If you have more than one location, very high call volume, or special call routing. It is the same product, sized to your volume.'],
]

export default function PricingPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
  return (
    <div className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <TierPricing ctaHref="/#lead-form" />
      <section className="bp-article" style={{ paddingTop: 0 }}>
        <section className="bp-faq"><h2>Pricing questions</h2>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      </section>
      <BlogFooter />
    </div>
  )
}
