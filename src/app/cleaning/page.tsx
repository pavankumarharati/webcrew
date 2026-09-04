import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Cleaning Companies | WebCrew',
  description: 'A 24/7 AI receptionist that handles recurring bookings and reschedules without tying up your team — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/cleaning' },
  keywords: ['AI receptionist for cleaning companies', 'cleaning service AI answering service', 'cleaning company missed call recovery', 'recurring booking AI scheduling'],
}

const N: NicheContent = {
  slug: 'cleaning',
  formValue: 'Cleaning',
  label: 'Cleaning',
  adj: 'cleaning',
  headline: <>Every reschedule call<br />you miss is a client<br /><em>wondering if you forgot.</em></>,
  sub: 'WebCrew answers your calls 24/7, handles new-booking and reschedule requests without pulling your team off a job, and keeps your calendar accurate — so recurring clients never wonder if you got the message.',
  emergencyLabel: 'Built for recurring-booking businesses',
  triage: [
    { title: 'Handles reschedules without a scramble', body: 'A client moving today’s appointment shouldn’t require your team to stop and answer a call — WebCrew takes it, confirms the new time, and updates you.' },
    { title: 'Books new clients around your real schedule', body: 'Frequency, home size, access instructions, add-ons — captured up front, so first-time bookings come in ready to schedule, not half-answered.' },
    { title: 'Cuts down no-shows and last-minute cancellations', body: 'A missed call from a client trying to cancel or move a visit still gets a fast reply instead of a wasted trip.' },
  ],
  faq: [
    ['Can it manage recurring appointments, not just one-time bookings?', 'Yes — configured to your actual scheduling system and recurrence patterns during setup.'],
    ['Can clients reschedule through it directly?', 'Yes, that’s one of the core flows — it checks availability and confirms the new time.'],
    ['Does it know my service area and pricing structure?', 'Yes, all configured before it goes live based on your actual business.'],
    ['How fast can I go live?', 'Most cleaning businesses wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function CleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/cleaning#service',
              name: 'AI Receptionist & Website for Cleaning Companies',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Cleaning Business Services',
              description: 'WebCrew answers cleaning company calls 24/7, manages recurring bookings and reschedules, and builds a custom website overnight.',
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
