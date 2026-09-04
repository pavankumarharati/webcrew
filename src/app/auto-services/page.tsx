import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Auto Service Shops | WebCrew',
  description: 'A 24/7 AI receptionist that handles drop-off scheduling and "is my car ready" calls without pulling a tech off a bay — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/auto-services' },
  keywords: ['AI receptionist for auto repair shops', 'auto service AI answering service', 'auto shop missed call recovery', 'auto repair appointment scheduling AI'],
}

const N: NicheContent = {
  slug: 'auto-services',
  formValue: 'Auto services',
  label: 'Auto Service',
  adj: 'auto service',
  headline: <>&ldquo;Is my car ready?&rdquo;<br />shouldn&rsquo;t pull a tech<br /><em>off the lift to answer.</em></>,
  sub: 'WebCrew answers your calls 24/7, books drop-offs, and handles status-check calls — so your bay stays productive instead of your team running back and forth to the phone.',
  emergencyLabel: 'Built for shop floor reality',
  triage: [
    { title: 'Books drop-offs around your actual bay schedule', body: 'Vehicle info, service needed, preferred time — captured before they arrive, so your morning isn’t reshuffled by a walk-in nobody expected.' },
    { title: 'Handles status-check calls without interrupting a job', body: '"Is it ready yet?" is one of the most common calls a shop gets — WebCrew can relay status updates you provide, without pulling someone off a repair.' },
    { title: 'Never lets a quote request go cold', body: 'A caller asking about a repair cost who gets voicemail usually just calls the next shop. WebCrew answers, captures the details, and gets you the callback.' },
  ],
  faq: [
    ['Can it tell customers pricing over the phone?', 'It can relay estimate ranges if you want that configured — final pricing and any diagnosis stays with your team.'],
    ['Can it check my actual bay availability before booking?', 'Yes, it’s configured against how you schedule so it doesn’t overbook.'],
    ['Can it handle both walk-in and appointment-based scheduling?', 'Yes — configured to match how your shop actually operates.'],
    ['How fast can I go live?', 'Most shops wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function AutoServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/auto-services#service',
              name: 'AI Receptionist & Website for Auto Service Shops',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Auto Service Business Services',
              description: 'WebCrew answers auto service shop calls 24/7, books drop-offs, handles status-check calls, and builds a custom website overnight.',
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
