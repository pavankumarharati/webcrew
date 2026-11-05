import type { Metadata } from 'next'
import LandingV4 from '@/components/landing-v4/landing-v4'

// Review route for landing v4 (one offer, light editorial). Not in the sitemap, never indexed.
// Becomes the homepage only when NEXT_PUBLIC_LANDING_V4=true (see lib/features.ts).
export const metadata: Metadata = {
  title: 'WebCrew — AI front office for HVAC and home-service companies',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webcrew.app' },
}

export default function V4Page() {
  return <LandingV4 />
}
