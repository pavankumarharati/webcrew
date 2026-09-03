import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import AvatarWidget from '@/components/avatar-widget'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

const TITLE = 'WebCrew — 24/7 AI Front Office for Local Businesses'
const DESC  = 'WebCrew answers calls, qualifies leads, follows up, and helps book customers 24/7—so missed calls do not become lost revenue.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'AI agency for local businesses',
    'AI receptionist for small business',
    'AI answering service local business',
    'local business AI front office',
    'website built overnight free',
    'HVAC AI receptionist',
    'roofing company AI website',
    'dental practice AI answering service',
    'med spa AI marketing',
    'Google Business Profile management service',
    'automated review replies local business',
    'AI call answering service',
    'local SEO AI agency',
    'AI front office local business',
    'Cloudflare Pages website local business',
  ],
  metadataBase: new URL('https://webcrew.app'),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://webcrew.app',
    siteName: 'WebCrew',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WebCrew — AI agency for local businesses. Calls, Google, Reviews, Website — all done for you.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://webcrew.app' },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://webcrew.app/#organization',
      name: 'WebCrew',
      url: 'https://webcrew.app',
      description: 'WebCrew is an AI front office for local businesses. It answers calls, qualifies leads, follows up, and helps book customers 24/7.',
      foundingDate: '2024',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webcrew.app/logo.png',
        width: 512,
        height: 512,
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+1-918-255-5151',
        email: 'hello@webcrew.app',
        availableLanguage: 'English',
        url: 'https://webcrew.app/#contact',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://webcrew.app/#website',
      url: 'https://webcrew.app',
      name: 'WebCrew',
      inLanguage: 'en-US',
      publisher: { '@id': 'https://webcrew.app/#organization' },
    },
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
      dateModified: new Date().toISOString().split('T')[0],
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
      '@type': 'HowTo',
      name: 'How to Get an AI Front Office for Your Local Business with WebCrew',
      description: 'WebCrew sets up your AI front office overnight — website built, calls answered, Google managed, reviews replied.',
      totalTime: 'PT6H',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Submit Your Business',
          text: 'Fill out the form at webcrew.app with your business name, niche, and city. No credit card required. Takes 2 minutes.',
          url: 'https://webcrew.app/#contact',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'AI Builds Overnight',
          text: 'WebCrew AI scans your brand using Firecrawl, generates city-specific copy using Gemini AI, creates custom hero images using fal.ai Flux Pro, and deploys a live Next.js website to Cloudflare Pages — all within 6 hours, no human involvement.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wake Up to Your AI Team',
          text: 'You receive a text with your live site link and a walkthrough of your AI front office. You can review how calls, lead details, follow-up, and booking work before deciding to continue.',
        },
      ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <AvatarWidget />
      </body>
    </html>
  )
}
