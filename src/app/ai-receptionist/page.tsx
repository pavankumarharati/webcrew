import FeatureLanding, { FeatureContent } from '@/components/feature-landing'

export const metadata = {
  title: 'AI Receptionist for Small Business | WebCrew',
  description: 'A real AI receptionist that answers every call 24/7, qualifies the caller, and books the appointment — not a voicemail replacement. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/ai-receptionist' },
  keywords: ['AI receptionist for small business', 'AI answering service', 'virtual receptionist for local business', '24/7 AI phone answering'],
}

const F: FeatureContent = {
  slug: 'ai-receptionist',
  pill: 'AI Receptionist',
  headline: <>An AI receptionist<br />that actually answers.<br /><em>Not a voicemail with extra steps.</em></>,
  sub: 'WebCrew’s AI receptionist picks up every call, holds a real conversation using Gemini Live voice AI, qualifies the job, and books the appointment — 24 hours a day, including nights and weekends when your phone would otherwise ring out.',
  sectionEyebrow: 'How it actually works',
  sectionTitle: 'It talks like a person, because it’s a real voice conversation — not a phone tree.',
  points: [
    { title: 'Answers on the first ring', body: 'Every call gets picked up immediately, 24/7 — no hold music, no "press 1," no voicemail. The caller talks to a voice, not a menu.' },
    { title: 'Trained on your business, not a generic script', body: 'Services, pricing, hours, and escalation rules are configured to your business before it goes live — so it can actually answer questions, not just take a message.' },
    { title: 'Books the appointment, notifies you instantly', body: 'It checks real availability and books directly on your calendar, then texts you a call summary and transcript the moment the call ends.' },
  ],
  included: [
    'AI receptionist answers every call 24/7, trained on your services and escalation rules',
    'Custom website built overnight, on your own domain',
    'Call transcript and summary sent to you after every call',
    'Missed-call text-back and automatic day-3/day-10 follow-up',
    'Weekly Google Business Profile posts and review replies',
    'One flat price — $0 setup, 2-week free trial, then $299/mo',
  ],
  faq: [
    ['Is this a chatbot or an actual phone call?', 'An actual phone call. Callers dial your real business number and have a live voice conversation — there’s no chat widget or text-only fallback for the phone line itself.'],
    ['Does it sound robotic?', 'It runs on Gemini Live, Google’s native-audio voice model — natural pacing and turn-taking, not a text-to-speech script reader. Call the live demo line and judge for yourself.'],
    ['What happens with calls it can’t handle?', 'It’s configured with your escalation rules — anything outside what it’s trained to resolve gets flagged and routed to you, with the caller’s details already captured.'],
    ['Do I need to change my phone number?', 'No. WebCrew provisions the AI receptionist on its own number, or forwards your existing line — configured during setup based on what you already have.'],
    ['How fast can I go live?', 'Most clients wake up to a text with their live site and AI receptionist link the morning after signing up — about 6 hours, no human involvement on our side.'],
  ],
  finalTitle: 'Stop losing jobs to voicemail.',
  finalBody: 'Same setup as every WebCrew client — tell us about your business, WebCrew builds your AI front office overnight.',
}

export default function AIReceptionistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/ai-receptionist#service',
              name: 'AI Receptionist for Small Business',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'AI Answering Service',
              category: 'Business Communication Services',
              description: 'WebCrew’s AI receptionist answers every business call 24/7 using Gemini Live voice AI, qualifies the caller, and books the appointment.',
              areaServed: { '@type': 'Country', name: 'United States' },
            },
            {
              '@type': 'FAQPage',
              mainEntity: F.faq.map(([q, a]) => ({
                '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ],
        }) }}
      />
      <FeatureLanding f={F} />
    </>
  )
}
