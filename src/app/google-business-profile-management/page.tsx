import FeatureLanding, { FeatureContent } from '@/components/feature-landing'

export const metadata = {
  title: 'Get More Google Reviews Automatically | WebCrew',
  description: 'WebCrew asks every customer for a Google review after their visit, with a direct link to your review page. $0 setup, 30-day free trial, $99/mo founding rate.',
  alternates: { canonical: 'https://webcrew.app/google-business-profile-management' },
  keywords: ['get more Google reviews', 'automated review requests', 'Google review request service', 'local business reviews'],
}

const F: FeatureContent = {
  slug: 'google-business-profile-management',
  pill: 'Google reviews',
  headline: <>More Google reviews,<br />without you<br /><em>having to ask.</em></>,
  sub: 'Most happy customers never leave a review because nobody asks. After each visit WebCrew sends the customer a short thank-you with a direct link to your Google review page. Every customer gets the same request, whatever they might say.',
  sectionEyebrow: 'Automatic, after every visit',
  sectionTitle: 'The ask happens on its own, a few hours after the appointment.',
  points: [
    { title: 'Asked at the right moment', body: 'A thank-you with your Google review link goes out about three hours after the appointment, when the visit is fresh.' },
    { title: 'No review gating', body: 'Everyone gets the same request. We never screen out unhappy customers, because Google doesn’t allow it and it’s the wrong way to build trust.' },
    { title: 'Win back past customers', body: 'Customers who haven’t returned in about two months get a friendly nudge to book again.' },
  ],
  included: [
    'Review request after each appointment booked through your AI receptionist',
    'Direct link to your Google review page (you add it once in your portal)',
    'Win-back message for customers who haven’t returned in about 60 days',
    'AI receptionist answers your calls 24/7',
    'Custom website, live within about a day',
    'Monthly report of calls, leads, bookings and follow-ups',
    'Founding rate — $0 setup, 30-day free trial, then $99/mo locked for life (first 10 clients)',
  ],
  faq: [
    ['Is this a standalone product I can buy separately?', 'No — it’s included in every WebCrew plan alongside the AI receptionist, website, and lead alerts. There’s no separate reviews-only tier.'],
    ['Does it work for every customer?', 'It works for customers who booked through your AI receptionist. Requests go by email, and by text only for customers who agreed to receive texts.'],
    ['Will it post replies to my Google reviews for me?', 'No. WebCrew doesn’t post to your Google profile or reply to reviews on your behalf.'],
    ['Do you filter out unhappy customers?', 'No. Every customer gets the same request. Google prohibits review gating, and so do we.'],
    ['What do I need to set up?', 'Paste your Google review link into your WebCrew portal once. Without it, review requests are skipped.'],
  ],
  finalTitle: 'Turn happy customers into Google reviews.',
  finalBody: 'Same setup as every WebCrew client — tell us about your business and WebCrew builds your AI front office, review requests included.',
}

export default function GBPManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/google-business-profile-management#service',
              name: 'Google Business Profile Management',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'Local SEO / Google Business Profile Management',
              category: 'Local Business Marketing Services',
              description: 'WebCrew asks every customer for a Google review after their visit, with a direct link to your review page, included in every plan.',
              areaServed: { '@type': 'Country', name: 'United States' },
            },
            {
              '@type': 'FAQPage',
              mainEntity: F.faq.map(([q, a]) => ({
                '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ],
        }) }}
      />
      <FeatureLanding f={F} />
    </>
  )
}
