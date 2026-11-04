import type { Metadata } from 'next'
import LandingV3 from '@/components/landing-v3/landing-v3'

// Review route for the 3D landing rebuild. Not in the sitemap, never indexed.
// Becomes the homepage only when NEXT_PUBLIC_LANDING_V3=true (see lib/features.ts).
export const metadata: Metadata = {
  title: 'WebCrew — Your website, with an AI salesperson built in',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webcrew.app' },
}

export default function V3Page() {
  return <LandingV3 />
}
