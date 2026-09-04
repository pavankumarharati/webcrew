import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Home Service Businesses | WebCrew',
  description: 'A 24/7 AI receptionist for local home service businesses — answers every call, qualifies the job, and books the appointment. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/home-services' },
  keywords: ['AI receptionist for home service businesses', 'home services AI answering service', 'local business missed call recovery'],
}

const N: NicheContent = {
  slug: 'home-services',
  formValue: 'Home services',
  label: 'Home Services',
  adj: 'home service',
  headline: <>Every missed call is a<br />job walking to whichever<br /><em>business answered first.</em></>,
  sub: 'WebCrew answers your calls 24/7, qualifies what the customer needs, and books the appointment — so a busy day on the job never costs you the next one.',
  emergencyLabel: 'Built for teams that are always out on a job',
  triage: [
    { title: 'Answers when your hands are full', body: 'You’re on a ladder, under a sink, mid-install — WebCrew takes the call so the customer gets an answer instead of your voicemail.' },
    { title: 'Captures what you need before you call back', body: 'Job type, location, timing, and details — collected up front, so your callback is a scheduling call, not a discovery call.' },
    { title: 'Follows up so a warm lead doesn’t go cold', body: 'Automatic day-3 and day-10 follow-up means a customer who didn’t book right away doesn’t just disappear.' },
  ],
  faq: [
    ['Can it be configured for my specific type of business?', 'Yes — WebCrew is set up on your actual services, hours, service area, and booking preferences before it goes live.'],
    ['Does it replace my team?', 'No. It answers, qualifies, and books — your team still does the work and stays in control of scheduling.'],
    ['Can it text customers back if I miss a call?', 'Yes, missed-call text-back is included so a caller who can’t reach you still gets a reply in seconds.'],
    ['How fast can I go live?', 'Most clients wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function HomeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/home-services#service',
              name: 'AI Receptionist & Website for Home Service Businesses',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Home Service Business Services',
              description: 'WebCrew answers home service business calls 24/7, qualifies the job, books the appointment, and builds a custom website overnight.',
              areaServed: { '@type': 'Country', name: 'United States' },
            },
            {
              '@type': 'FAQPage',
              mainEntity: N.faq.map(([q, a]) => ({
                '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ],
        }) }}
      />
      <NicheLanding n={N} />
    </>
  )
}
