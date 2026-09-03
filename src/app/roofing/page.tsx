import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Roofing Companies | WebCrew',
  description: 'A 24/7 AI receptionist that prioritizes active leaks and storm damage over routine quotes — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/roofing' },
  keywords: ['roofing company AI website', 'AI answering service for roofers', 'storm damage call answering', 'roofing missed call recovery'],
}

const N: NicheContent = {
  slug: 'roofing',
  formValue: 'Roofers',
  label: 'Roofing',
  adj: 'roofing',
  headline: <>A leak call at midnight,<br />mid-storm, is a signed job —<br /><em>if someone answers.</em></>,
  sub: 'WebCrew answers your roofing calls 24/7, tells an active leak apart from a routine quote request, and books the appointment — so a storm doesn’t bury you in missed calls right when demand peaks.',
  emergencyLabel: 'Built for storm-surge call volume',
  triage: [
    { title: 'Prioritizes active damage', body: 'An active leak, missing shingles after a storm, or visible ceiling damage gets treated differently than a routine estimate request — flagged for faster follow-up.' },
    { title: 'Handles the call spike after a storm', body: 'When everyone in the neighborhood calls at once, none of them hit voicemail. Every caller gets answered and qualified in the order they called.' },
    { title: 'Captures what your estimator needs', body: 'Roof age, storm date, insurance involvement, photos requested — collected up front so your first callback is a scheduling call, not a discovery call.' },
  ],
  faq: [
    ['Can it handle a flood of calls right after a storm hits?', 'Yes — WebCrew answers every call in parallel, it doesn’t queue callers or send overflow to voicemail the way a single receptionist would.'],
    ['Does it know the difference between an active leak and a routine quote?', 'Yes, once configured on your business — active-damage language gets flagged for faster follow-up, routine requests get queued normally.'],
    ['Can it ask about insurance claims?', 'Yes, that’s one of the intake questions configured during setup if that’s part of your process.'],
    ['How fast can I go live?', 'Most roofing clients wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function RoofingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/roofing#service',
              name: 'AI Receptionist & Website for Roofing Companies',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Roofing Business Services',
              description: 'WebCrew answers roofing company calls 24/7, prioritizes active leaks and storm damage over routine quotes, books appointments, and builds a custom website overnight.',
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
