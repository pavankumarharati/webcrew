import NicheLanding, { NicheContent } from '@/components/niche-landing'

export const metadata = {
  title: 'AI Receptionist for Plumbing Companies | WebCrew',
  description: 'A 24/7 AI receptionist that prioritizes burst pipes, no water, and sewage backups over routine calls — plus a website built overnight. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/plumbing' },
  keywords: ['plumber AI answering service', 'AI receptionist for plumbing companies', 'emergency plumbing call answering', 'plumbing missed call recovery'],
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
  faq: [
    ['Can it tell a burst pipe from a slow drain question?', 'Yes — configured on your service list and escalation rules before going live, including exactly what counts as urgent for your business.'],
    ['Can it walk someone through shutting off their water?', 'It can relay your standard shutoff instructions if you want that configured — the goal is to reduce damage while help is on the way, not replace your judgment on the job.'],
    ['Does it replace my on-call rotation?', 'No — it answers, qualifies, and captures the details your on-call plumber needs. You stay in control of who gets dispatched.'],
    ['How fast can I go live?', 'Most plumbing clients wake up to a text with their live site and AI receptionist the morning after signing up — about 6 hours, no human involvement on our side.'],
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
