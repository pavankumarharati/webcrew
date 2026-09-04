import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Contractors | WebCrew',
  description: 'A 24/7 AI receptionist that captures the project details you need before a walk-through — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/contractors' },
  keywords: ['AI receptionist for contractors', 'general contractor AI answering service', 'contractor missed call recovery', 'contractor lead qualification AI'],
}

const N: NicheContent = {
  slug: 'contractors',
  formValue: 'Contractors',
  label: 'Contractors',
  adj: 'contractor',
  headline: <>A vague voicemail wastes<br />your whole walk-through.<br /><em>A qualified lead doesn&rsquo;t.</em></>,
  sub: 'WebCrew answers your calls 24/7, asks the questions that actually shape a quote, and books the walk-through — so you show up already knowing the scope instead of finding out on-site.',
  emergencyLabel: 'Built to qualify before you show up',
  triage: [
    { title: 'Asks the questions that shape a quote', body: 'Project type, rough size, timeline, budget range — captured up front, so you’re not spending the first 15 minutes on-site just figuring out what the job even is.' },
    { title: 'Filters the tire-kickers from the real jobs', body: 'Not every call is a job worth driving to. WebCrew qualifies before it books, so your calendar fills with leads worth your time.' },
    { title: 'Never lets a callback slip', body: 'Between job sites, supply runs, and client calls, someone always slips through. WebCrew makes sure it isn’t the next signed contract.' },
  ],
  faq: [
    ['Can it handle different project types differently?', 'Yes — configured on your actual service list, so a kitchen remodel call and a fence repair call get qualified with the right questions for each.'],
    ['Will it try to quote a price on the phone?', 'No. It captures scope and details so you can quote accurately — pricing decisions stay with you.'],
    ['Can it schedule the walk-through directly on my calendar?', 'Yes, appointment booking is built in and syncs to how you already schedule.'],
    ['How fast can I go live?', 'Most contractors wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function ContractorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/contractors#service',
              name: 'AI Receptionist & Website for Contractors',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Contractor Business Services',
              description: 'WebCrew answers contractor calls 24/7, qualifies project scope and budget before booking, and builds a custom website overnight.',
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
