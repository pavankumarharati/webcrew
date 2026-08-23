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
        email: 'hello@webcrew.app',
        availableLanguage: 'English',
        url: 'https://webcrew.app/#contact',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '12',
        bestRating: '5',
        worstRating: '1',
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
            text: 'WebCrew is an AI front office for local businesses in the United States. It answers inbound calls 24/7, qualifies leads, captures customer details, supports appointment booking, follows up, and keeps the business owner informed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the demo really free? What\'s the catch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. No credit card, deposit, or setup fee is required to see WebCrew working for your business. You review the experience before deciding whether to continue.',
          },
        },
        {
          '@type': 'Question',
          name: 'What 5 AI agents does WebCrew provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every WebCrew client gets 5 AI agents that run 24/7: (1) AI Reception uses Gemini Live voice AI to answer every inbound call, handling bookings, pricing questions, and hours — trained on your specific business. (2) Revenue Alert sends you an instant SMS the moment any lead submits your contact form, so you never miss a hot lead. (3) GBP Post Agent writes and publishes a Google Business Profile update every week, keeping your profile active and signaling relevance to Google\'s local algorithm. (4) Review Reply Agent writes and posts contextual AI replies to every new Google review within hours, showing responsiveness to future customers and boosting review velocity. (5) Weekly Report emails you a Google Search Console summary every Monday showing your top keywords, impressions, clicks, and position trends.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast does WebCrew build a website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WebCrew builds and deploys a complete custom website in approximately 6 hours with no human involvement. The AI pipeline runs the moment you submit the form: Firecrawl scans your brand, Gemini AI generates city-specific copy, fal.ai Flux Pro creates custom hero images, and Cloudflare Pages deploys the live Next.js site. Most clients wake up to a text with their live URL the morning after submitting. Sites score an average of 97/100 on Google PageSpeed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What niches does WebCrew serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WebCrew serves 25+ local business niches across the United States: HVAC, Roofing, Plumbing, Cleaning, Landscaping, Junk Removal, Remodeling, Auto Detailing, Pressure Washing, Epoxy Flooring, Foundation Repair, Septic Services, Tree Services, Dentist, Med Spa, Skin Clinic, IV Therapy, Nail Studio, Salon, Barbershop, Daycare, Restaurant, Law Firm, Real Estate, and more. Every niche gets a fully custom design — different layout, copy, imagery, and local SEO signals, not a swapped-name template.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the website rank on Google and appear in AI search results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every WebCrew site launches with LocalBusiness schema markup, FAQPage schema, AggregateRating schema, Service schema, a sitemap.xml, and robots.txt optimized for Google and AI crawler indexing (GPTBot, ClaudeBot, PerplexityBot all allowed). Every plan includes weekly Google Business Profile posts that signal local relevance and automated review replies that increase review velocity — two of the strongest local ranking factors. Most clients receive their first Google-sourced lead within 7 days. Sites also get an llms.txt file so AI systems like ChatGPT, Perplexity, and Gemini can accurately describe the business when users ask local queries.',
          },
        },
        {
          '@type': 'Question',
          name: 'What if I already have a website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the "Upgrade My Site" tab in the contact form at webcrew.app. WebCrew builds a complete redesign as a free demo while your current site stays live — zero risk, zero downtime, no DNS changes needed. You compare both versions. If the WebCrew site is better, you switch. If not, you keep yours and pay nothing. The AI pipeline scans your current site for brand signals, colors, and copy, then builds an improved version with better PageSpeed score, richer schema markup, and stronger local SEO signals.',
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
