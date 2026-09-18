import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ThankYouClient } from './thank-you-client'

export const metadata: Metadata = {
  title: 'Welcome to WebCrew',
  description: 'Your WebCrew trial checkout is complete and your AI Front Office is being prepared.',
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouClient />
    </Suspense>
  )
}
