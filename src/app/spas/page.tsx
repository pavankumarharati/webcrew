import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Spas | WebCrew',
  description: 'A 24/7 AI receptionist that books treatments around real room and practitioner availability — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/spas' },
  keywords: ['AI receptionist for spas', 'day spa AI answering service', 'spa appointment booking AI', 'spa missed call recovery'],
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
  faq: [
    ['Can it book against specific practitioners and rooms?', 'Yes — configured to your actual staff, rooms, and treatment menu during setup.'],
    ['Can it handle gift certificate or package inquiries?', 'It can capture the request and route it appropriately if you want that configured as part of your intake flow.'],
    ['Does it match the tone of my brand?', 'Yes — voice, pacing, and phrasing are configured before it goes live so it fits your spa’s actual experience.'],
    ['How fast can I go live?', 'Most spas wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
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
