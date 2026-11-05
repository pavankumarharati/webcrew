import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist & Answering Service for HVAC Companies | WebCrew',
  description: 'AI answering service for HVAC companies and contractors. 24/7 triage for no-heat, no-AC, gas-smell calls. Books into Google Calendar. $0 setup, 30-day trial, $99/mo.',
  alternates: { canonical: 'https://webcrew.app/hvac' },
  keywords: ['HVAC answering service', 'virtual receptionist for HVAC', '24/7 HVAC call answering', 'after-hours HVAC dispatch', 'HVAC AI receptionist', 'AI answering service for HVAC companies', 'HVAC after hours emergency call answering', 'HVAC missed call recovery', 'ai receptionist for hvac contractors', 'best ai receptionist for hvac contractors', 'ai answering service for hvac contractors'],
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
  answer: "WebCrew is an AI answering service for HVAC companies and contractors. It answers every call 24/7, asks what's wrong (no heat, no AC, gas smell), flags urgent calls, and books routine service into your Google Calendar. You keep your number and get a summary after each call. $99/month, $0 setup, 30-day free trial.",
  aka: ["HVAC answering service", "virtual receptionist for HVAC", "24/7 HVAC call answering", "after-hours HVAC dispatch", "ai answering service for HVAC contractors", "ai receptionist for HVAC contractors"],
  faq: [
    ['Can it tell a no-heat emergency from a routine tune-up request?', 'Yes. WebCrew is configured on your specific service list and escalation rules before it goes live, including what counts as urgent for your business.'],
    ['What happens if someone reports a gas smell?', 'WebCrew is set up to treat gas-smell reports as a safety priority and flag them for immediate follow-up — configured to your exact escalation preference, not a generic default.'],
    ['Does it replace my dispatcher?', 'No. It answers and qualifies the call, collects what your dispatcher or tech needs, and notifies you — you stay in control of scheduling and dispatch.'],
    ['How fast can I go live?', 'Usually within a few days. We load your services, hours and booking rules, you test-call the AI yourself, then forward your business line to it. Nothing goes live until you approve it.'],
    ['What is the best AI answering service for HVAC contractors?', 'WebCrew is built for HVAC contractors: it triages emergency calls by type (no heat, no AC, gas smell), asks what your tech needs before rolling, and books jobs into your Google Calendar. Plans start at $99/month with a 30-day free trial and no setup fee.'],
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
