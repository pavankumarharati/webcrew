import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for HVAC Companies | WebCrew',
  description: 'A 24/7 AI receptionist trained on no-heat, no-AC, and gas-smell triage — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/hvac' },
  keywords: ['HVAC AI receptionist', 'AI answering service for HVAC companies', 'HVAC after hours emergency call answering', 'HVAC missed call recovery'],
}

const N: NicheContent = {
  slug: 'hvac',
  formValue: 'HVAC',
  label: 'HVAC',
  adj: 'HVAC',
  headline: <>Every &ldquo;no heat&rdquo; call<br />at 9pm is a job.<br /><em>If nobody answers, it&rsquo;s your competitor&rsquo;s.</em></>,
  sub: 'WebCrew answers your HVAC calls 24/7, recognizes an emergency when it hears one, and books the appointment window — so a no-heat call at midnight doesn’t sit in voicemail until morning.',
  emergencyLabel: 'Built for emergency triage',
  triage: [
    { title: 'Recognizes emergency language', body: '"No heat," "no AC," "gas smell," "system won’t turn on" — WebCrew is configured to treat these differently than a routine maintenance question, and flag them for faster follow-up.' },
    { title: 'Collects what your tech needs', body: 'System type, how long it’s been out, whether anyone smells gas, access instructions — captured before the truck rolls, not radioed in from the driveway.' },
    { title: 'Never lets an overnight call go cold', body: 'A call that comes in at 2am gets answered at 2am. You get the summary and callback details the moment you’re up, not a guess at what you missed.' },
  ],
  faq: [
    ['Can it tell a no-heat emergency from a routine tune-up request?', 'Yes. WebCrew is configured on your specific service list and escalation rules before it goes live, including what counts as urgent for your business.'],
    ['What happens if someone reports a gas smell?', 'WebCrew is set up to treat gas-smell reports as a safety priority and flag them for immediate follow-up — configured to your exact escalation preference, not a generic default.'],
    ['Does it replace my dispatcher?', 'No. It answers and qualifies the call, collects what your dispatcher or tech needs, and notifies you — you stay in control of scheduling and dispatch.'],
    ['How fast can I go live?', 'Most HVAC clients wake up to a text with their live site and AI receptionist link the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
}

export default function HVACPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/hvac#service',
              name: 'AI Receptionist & Website for HVAC Companies',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'HVAC Business Services',
              description: 'WebCrew answers HVAC company calls 24/7, triages no-heat/no-AC/gas-smell emergencies, books appointments, and builds a custom website overnight.',
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
