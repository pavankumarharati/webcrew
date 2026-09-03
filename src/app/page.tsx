import MissedCallLanding from '@/components/missed-call-landing'
import Pricing from '@/components/pricing'
import { SHOW_PUBLIC_PRICING } from '@/lib/features'

// Homepage-only structured data. Scoped here (not root layout) so it doesn't
// render on /privacy, /terms, or any future non-homepage route.
const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://webcrew.app/#webpage',
      url: 'https://webcrew.app',
      name: 'WebCrew — AI Agency for Local Businesses | Calls, Google, Reviews',
      description: 'WebCrew builds your website overnight and runs 5 AI agents: AI reception (24/7 calls), GBP posts, review replies, lead alerts, weekly traffic reports.',
      isPartOf: { '@id': 'https://webcrew.app/#website' },
      about: { '@id': 'https://webcrew.app/#service' },
      publisher: { '@id': 'https://webcrew.app/#organization' },
      inLanguage: 'en-US',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2'],
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://webcrew.app/#service',
      name: 'AI Agency for Local Businesses',
      provider: { '@id': 'https://webcrew.app/#organization' },
      serviceType: 'AI Digital Agency',
      category: 'Business Services',
      description: 'WebCrew answers calls, qualifies leads, follows up, and helps local businesses book customers 24/7. No credit card or setup fee is required to see it working.',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
        sameAs: 'https://www.wikidata.org/wiki/Q30',
      },
    },
    {
      '@type': 'ItemList',
      '@id': 'https://webcrew.app/#whats-included',
      name: "What's Included in Every WebCrew Plan",
      description: 'The complete list of what every WebCrew local-business client gets, included in one flat monthly price.',
      numberOfItems: 10,
      itemListElement: [
        'Custom website, built overnight, on your own domain — yours to keep',
        'AI receptionist that answers every call 24/7, in a voice tuned to your business',
        'Automatic appointment booking with confirmation',
        'Call transcript and summary sent after every call',
        'Instant SMS and email alert the moment a lead comes in',
        'Missed-call text-back — a caller who can\'t reach you still gets a reply in seconds',
        'Automatic lead follow-up (day 3, day 10) so a warm lead never goes cold',
        'Weekly Google Business Profile posts (52 a year) and auto-replies to every Google review',
        'Monthly traffic and ranking report, 97+ PageSpeed, SSL, mobile-perfect out of the box',
        'One flat price — $0 setup, 2-week free trial, then $299/mo, everything above included',
      ].map((text, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: text,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://webcrew.app/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is WebCrew?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WebCrew is an AI front office for local businesses in the United States. It answers every inbound call 24/7, qualifies leads, books appointments, sends you a summary after every call, and follows up automatically — plus a custom website built overnight, weekly Google Business Profile posts, and automatic review replies, all in one flat monthly plan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will WebCrew replace my phone number?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. We work with your existing business flow and configure how calls should be answered, routed, summarized, and followed up.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can it answer after hours and on weekends?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. WebCrew is designed to respond 24/7, so callers are not pushed into voicemail when your team is unavailable.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does WebCrew know what to say?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We learn your services, hours, service area, common questions, booking preferences, and escalation rules before you go live.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast does WebCrew build a website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most clients wake up to a text with their live site link the morning after submitting the form — the AI pipeline builds and deploys a complete custom website in about 6 hours with no human involvement, averaging 97/100 on Google PageSpeed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does WebCrew cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '$0 setup fee and a 2-week free trial. After that it is a flat $299/month — the website, AI receptionist, booking, lead alerts, weekly Google Business Profile posts, and review replies are all included, no add-ons or tiers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I see it work before committing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Call the live AI Reception line at (918) 255-5151 to test it yourself, or request a walkthrough tailored to your business. No credit card or setup fee is required to see it working.',
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_SCHEMA) }}
      />
      <MissedCallLanding showPricing={SHOW_PUBLIC_PRICING} />
      {SHOW_PUBLIC_PRICING && <Pricing />}
    </>
  )
}
