import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Salons | WebCrew',
  description: 'A 24/7 AI receptionist that books by stylist and service, and fills the slots no-shows leave behind — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/salons' },
  keywords: ['AI receptionist for salons', 'salon AI answering service', 'salon no-show booking AI', 'salon appointment scheduling AI'],
}

const N: NicheContent = {
  slug: 'salons',
  formValue: 'Salons',
  label: 'Salon',
  adj: 'salon',
  headline: <>A no-show leaves an<br />open chair. A missed call<br /><em>leaves it open twice.</em></>,
  sub: 'WebCrew answers your calls 24/7, books by stylist and service, and catches the reschedule and cancellation calls your front desk can’t always get to between clients.',
  emergencyLabel: 'Built around the chair, not just the calendar',
  triage: [
    { title: 'Books by stylist, not just by time slot', body: 'Client wants their usual stylist, a specific service, a certain length of appointment — WebCrew books against real availability, not a generic calendar slot.' },
    { title: 'Catches cancellations while your desk is with a client', body: 'Front desk can’t always step away mid-service. WebCrew answers the call, handles the reschedule, and lets you try to fill the opening.' },
    { title: 'Turns a missed call into a booked walk-in slot', body: 'A caller who can’t get through usually books somewhere else. WebCrew keeps that appointment on your books instead.' },
  ],
  faq: [
    ['Can it book with a specific stylist?', 'Yes — configured against your actual stylists, services, and availability during setup.'],
    ['Can it handle color and specialty-service bookings that take longer?', 'Yes, appointment length and service type are part of the booking configuration.'],
    ['Will it try to describe or recommend services?', 'It can share your service menu and pricing if configured — style and technique recommendations stay with your team.'],
    ['How fast can I go live?', 'Most salons wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function SalonsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/salons#service',
              name: 'AI Receptionist & Website for Salons',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Salon Business Services',
              description: 'WebCrew answers salon calls 24/7, books by stylist and service, handles cancellations, and builds a custom website overnight.',
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
