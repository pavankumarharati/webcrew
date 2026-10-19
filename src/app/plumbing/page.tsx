import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist & Answering Service for Plumbers | WebCrew',
  description: 'A 24/7 AI receptionist that prioritizes burst pipes, no water, and sewage backups over routine calls — plus a website live within about a day. $0 setup, 30-day free trial, $99/mo founding rate.',
  alternates: { canonical: 'https://webcrew.app/plumbing' },
  keywords: ['plumbing answering service', 'virtual receptionist for plumbers', '24/7 plumbing call answering', 'plumber call center alternative', 'plumber AI answering service', 'AI receptionist for plumbing companies', 'emergency plumbing call answering', 'plumbing missed call recovery'],
}

const N: NicheContent = {
  slug: 'plumbing',
  formValue: 'Plumbers',
  label: 'Plumbing',
  adj: 'plumbing',
  headline: <>A burst pipe doesn&rsquo;t wait<br />for business hours.<br /><em>Neither should your phone.</em></>,
  sub: 'WebCrew answers your plumbing calls 24/7, tells a burst pipe or sewage backup apart from a routine drain question, and books the appointment — so a 3am emergency doesn’t sit unanswered until you open.',
  emergencyLabel: 'Built for true emergencies',
  triage: [
    { title: 'Recognizes what can’t wait', body: 'Burst pipe, no water, sewage backup, active flooding — these get treated differently than a routine "when can you fit me in" call.' },
    { title: 'Collects what your plumber needs before rolling', body: 'Where the water’s coming from, whether the main shutoff is off, how long it’s been running — captured before dispatch, not radioed in on the way.' },
    { title: 'Never sends an emergency to voicemail', body: 'A call at 3am gets answered at 3am, qualified, and you get the summary the moment you’re up — not a guess at what happened overnight.' },
  ],
  answer: "An AI receptionist for plumbers answers every call 24/7, tells a burst pipe or sewage backup apart from a routine drain job, flags emergencies to your cell, and books regular work into your Google Calendar. You keep your number. WebCrew costs $99/month for the first 10 clients, with a 30-day free trial.",
  aka: ["plumbing answering service", "virtual receptionist for plumbers", "24/7 plumbing call answering", "plumber call center alternative"],
  cities: ["Allen", "Arlington", "Birmingham", "Clearwater", "Columbus", "Coral Springs", "Denver", "Duluth", "Hialeah", "Hollywood", "Indianapolis", "Jersey City", "Los Angeles", "Minneapolis", "Norfolk", "Oklahoma City", "Paterson", "Philadelphia", "Port St. Lucie", "San Diego", "San Jose", "Springfield", "St. Petersburg", "Toledo"],
  faq: [
    ['Can it tell a burst pipe from a slow drain question?', 'Yes — configured on your service list and escalation rules before going live, including exactly what counts as urgent for your business.'],
    ['Can it walk someone through shutting off their water?', 'It can relay your standard shutoff instructions if you want that configured — the goal is to reduce damage while help is on the way, not replace your judgment on the job.'],
    ['Does it replace my on-call rotation?', 'No — it answers, qualifies, and captures the details your on-call plumber needs. You stay in control of who gets dispatched.'],
    ['How fast can I go live?', 'Usually within a few days. We load your services, hours and booking rules, you test-call the AI yourself, then forward your business line to it. Nothing goes live until you approve it.'],
  ],
}

export default function PlumbingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/plumbing#service',
              name: 'AI Receptionist & Website for Plumbing Companies',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Plumbing Business Services',
              description: 'WebCrew answers plumbing company calls 24/7, prioritizes burst pipes and sewage backups over routine calls, books appointments, and builds a custom website overnight.',
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
