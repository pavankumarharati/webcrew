import IntroSplash from '@/components/intro-splash'
import MissedCallLanding from '@/components/missed-call-landing'
import WebsitePreviewLanding from '@/components/website-preview-landing'
import Pricing from '@/components/pricing'
import { SHOW_PUBLIC_PRICING, SHOW_NEW_LANDING } from '@/lib/features'

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
      description: 'WebCrew builds your website and runs your AI front office: AI reception (24/7 calls), appointment booking, lead alerts, follow-ups, and Google review requests.',
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
        'Custom website, live within about a day; we connect your own domain on request',
        'AI receptionist that answers your calls 24/7, in a voice tuned to your business, with a fallback that rings your phone if anything fails',
        'Appointment booking into your Google Calendar, with confirmation and reminders',
        'Transcript and summary of every real customer call',
        'Instant SMS and email alert the moment the AI captures a lead',
        'Missed-call text-back for callers who agreed to receive texts',
        'Automatic follow-up at day 3 and day 10 for leads who haven\'t booked yet',
        'Google review requests after each visit, sent to every customer alike',
        'Monthly report of calls, leads, bookings and follow-ups; SSL and a mobile-friendly site',
        'Founding rate — $0 setup, 30-day free trial, then $99/mo, locked for life (first 10 clients; $149/mo after), 250 AI minutes a month included; over that, calls ring your cell so no customer is missed',
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
            text: 'WebCrew is an AI front office for local businesses in the United States. It answers your inbound calls 24/7, qualifies leads, books appointments into your calendar, sends you a summary of every real customer call, follows up with leads who haven’t booked, and requests Google reviews after visits — plus a custom website, all in one monthly plan.',
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
            text: '$0 setup fee and a 30-day free trial. Our first 10 clients pay a founding rate of $99/month (250 AI minutes), locked for as long as they stay; after that it is $149/month (500 AI minutes). The website, AI receptionist, booking, lead alerts, follow-ups, and review requests are all included, no add-ons. If you use all your minutes, calls ring your cell, so there are never surprise charges. Multiple locations or heavy call volume: custom quote.',
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
      <IntroSplash />
      {SHOW_NEW_LANDING ? <WebsitePreviewLanding /> : <MissedCallLanding showPricing={SHOW_PUBLIC_PRICING} />}
      {!SHOW_NEW_LANDING && SHOW_PUBLIC_PRICING && <Pricing />}
    </>
  )
}
