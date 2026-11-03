import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Answering Service for Salons, Barbers & Tattoo Studios | WebCrew',
  description: 'AI answering service for salons, barbers, and tattoo and piercing studios. Books by stylist or artist 24/7, handles cancellations and no-shows. $0 setup, 30-day free trial.',
  alternates: { canonical: 'https://webcrew.app/salons' },
  keywords: ['salon answering service', 'virtual receptionist for salons', 'AI receptionist for tattoo and piercing shops', 'barbershop call answering', 'AI receptionist for salons', 'salon AI answering service', 'salon no-show booking AI', 'salon appointment scheduling AI', 'ai answering service for tattoo studios', 'tattoo studio answering service', 'tattoo shop AI receptionist'],
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
  answer: "WebCrew is an AI answering service for salons, barbershops, and tattoo and piercing studios. It answers every call 24/7, books by artist or stylist and service type, and handles cancellations while you are with a client. You keep your number. Costs $99/month for the first 10 clients, 30-day free trial.",
  aka: ["salon answering service", "virtual receptionist for salons", "AI receptionist for tattoo and piercing shops", "barbershop call answering", "ai answering service for tattoo studios", "tattoo studio answering service"],
  faq: [
    ['Can it book with a specific stylist?', 'Yes — configured against your actual stylists, services, and availability during setup.'],
    ['Can it handle color and specialty-service bookings that take longer?', 'Yes, appointment length and service type are part of the booking configuration.'],
    ['Will it try to describe or recommend services?', 'It can share your service menu and pricing if configured — style and technique recommendations stay with your team.'],
    ['How fast can I go live?', 'Usually within a few days. We load your services, hours and booking rules, you test-call the AI yourself, then forward your business line to it. Nothing goes live until you approve it.'],
    ['What does an AI answering service do for a tattoo studio?', 'It answers calls 24/7, books appointments by artist and service type, confirms details, and sends reminders. When you are mid-session, calls are answered and booked instead of going to voicemail.'],
    ['Can WebCrew handle tattoo and piercing bookings separately?', 'Yes. During setup we load your artists, services, and booking rules. Tattoo consultations and piercings can be configured with different durations and booking steps if you treat them differently.'],
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
