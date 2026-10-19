import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Spas & Massage Businesses | WebCrew',
  description: 'A 24/7 AI receptionist that books treatments around real room and practitioner availability — plus a website live within about a day. $0 setup, 30-day free trial, $99/mo founding rate.',
  alternates: { canonical: 'https://webcrew.app/spas' },
  keywords: ['spa answering service', 'virtual receptionist for spas', 'AI receptionist for massage therapists', 'day spa call answering', 'AI receptionist for spas', 'day spa AI answering service', 'spa appointment booking AI', 'spa missed call recovery'],
}

const N: NicheContent = {
  slug: 'spas',
  formValue: 'Spas',
  label: 'Spa',
  adj: 'spa',
  headline: <>A client calling to book<br />a treatment shouldn&rsquo;t reach<br /><em>a room that&rsquo;s already busy.</em></>,
  sub: 'WebCrew answers your calls 24/7 and books treatments against real room and practitioner availability — so callers get an accurate time the first try, not a guess your desk has to fix later.',
  emergencyLabel: 'Built around room and practitioner availability',
  triage: [
    { title: 'Books against real availability, not just open hours', body: 'A massage, a facial, and a couples treatment each need different rooms and practitioners — WebCrew books to what’s actually free, not a generic slot.' },
    { title: 'Handles the calm, unhurried tone clients expect', body: 'A spa call isn’t an emergency — it’s configured to sound like the relaxed, attentive front desk experience your brand already has.' },
    { title: 'Recovers the callers who’d otherwise book elsewhere', body: 'Someone calling to book a gift treatment or a same-day opening who hits voicemail usually just tries a different spa. WebCrew keeps that booking.' },
  ],
  answer: "An AI receptionist for spas and massage businesses answers every call 24/7, books treatments around your practitioners and rooms, and handles reschedules and cancellations, so the front desk can stay with the guest in front of them. You keep your number. WebCrew costs $99/month for the first 10 clients, with a 30-day free trial.",
  aka: ["spa answering service", "virtual receptionist for spas", "AI receptionist for massage therapists", "day spa call answering"],
  faq: [
    ['Can it book against specific practitioners and rooms?', 'Yes — configured to your actual staff, rooms, and treatment menu during setup.'],
    ['Can it handle gift certificate or package inquiries?', 'It can capture the request and route it appropriately if you want that configured as part of your intake flow.'],
    ['Does it match the tone of my brand?', 'Yes — voice, pacing, and phrasing are configured before it goes live so it fits your spa’s actual experience.'],
    ['How fast can I go live?', 'Usually within a few days. We load your services, hours and booking rules, you test-call the AI yourself, then forward your business line to it. Nothing goes live until you approve it.'],
  ],
}

export default function SpasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/spas#service',
              name: 'AI Receptionist & Website for Spas',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Spa Business Services',
              description: 'WebCrew answers spa calls 24/7, books treatments against real room and practitioner availability, and builds a custom website overnight.',
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
