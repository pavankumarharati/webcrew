import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import AvatarWidget from '@/components/avatar-widget'
import ReferralCapture from '@/components/referral-capture'

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
    'plumber AI answering service',
    'AI receptionist for electricians',
    'emergency call answering service local business',
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

// Entity-identity schema only — present on every route (Organization/WebSite
// don't change per page). Homepage-specific nodes (WebPage/Service/ItemList/
// FAQPage) live in app/page.tsx instead, so they stop getting duplicated onto
// /privacy and /terms with the homepage's own name/description/FAQ content.
const SITE_SCHEMA = {
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
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <AvatarWidget />
        <ReferralCapture />
      </body>
    </html>
  )
}
