import FeatureLanding, { FeatureContent } from '@/components/feature-landing'

export const metadata = {
  title: 'Google Business Profile Management, Done Automatically | WebCrew',
  description: 'Weekly Google Business Profile posts and AI-written review replies, done automatically — included in every WebCrew plan. $0 setup, 2-week free trial, $299/mo flat.',
  alternates: { canonical: 'https://webcrew.app/google-business-profile-management' },
  keywords: ['Google Business Profile management', 'automated GBP posts', 'AI review reply service', 'Google Business Profile posting service'],
}

const F: FeatureContent = {
  slug: 'google-business-profile-management',
  pill: 'Google Business Profile',
  headline: <>A Google Business Profile<br />that posts itself.<br /><em>And replies to every review.</em></>,
  sub: 'Most local businesses claim their Google Business Profile once and never touch it again. WebCrew keeps yours active automatically — a real weekly post and a reply to every new review, using your actual services and reviews, no login required from you.',
  sectionEyebrow: 'Fully automatic, every week',
  sectionTitle: 'It runs on its own schedule — you don’t have to remember it exists.',
  points: [
    { title: 'A real post, every week', body: 'Written from your actual services and business details, not a generic filler post — published to your live Google Business Profile automatically.' },
    { title: 'Every new review gets a reply', body: 'AI-written responses go out within hours of a new review landing, in a tone that matches your business — not a copy-pasted "thank you."' },
    { title: 'No dashboard to babysit', body: 'This runs in the background alongside your AI receptionist and website. You don’t log in, approve posts, or manage a queue — it just happens.' },
  ],
  included: [
    'Weekly Google Business Profile posts, written from your real services',
    'AI-written replies to every new Google review, posted within hours',
    'AI receptionist answers every call 24/7',
    'Custom website built overnight, on your own domain',
    'Weekly traffic report from Google Search Console',
    'One flat price — $0 setup, 2-week free trial, then $299/mo',
  ],
  faq: [
    ['Is this a standalone product I can buy separately?', 'No — it’s included in every WebCrew plan alongside the AI receptionist, website, and lead alerts, at one flat $299/mo. There’s no separate GBP-only tier.'],
    ['Do I need to give you my Google account password?', 'No. Google Business Profile access is granted through Google’s own manager-access flow — WebCrew never asks for or stores your Google password.'],
    ['Can I review a post before it goes live?', 'Posts publish automatically on the weekly schedule. If you want a specific promotion or announcement featured, you can tell us and it gets worked into that week’s post.'],
    ['What happens with a negative review?', 'It still gets a reply — professional and de-escalating, not defensive — and if it needs your direct attention, you’re notified separately from the automatic reply.'],
    ['Does this work if I already have an existing Google Business Profile?', 'Yes. Most clients already have a profile from before — WebCrew connects to the existing one rather than creating a new one.'],
  ],
  finalTitle: 'Stop letting your Google profile go stale.',
  finalBody: 'Same setup as every WebCrew client — tell us about your business, WebCrew builds your AI front office overnight, Google Business Profile included.',
}

export default function GBPManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': 'https://webcrew.app/google-business-profile-management#service',
              name: 'Google Business Profile Management',
              provider: { '@id': 'https://webcrew.app/#organization' },
              serviceType: 'Local SEO / Google Business Profile Management',
              category: 'Local Business Marketing Services',
              description: 'WebCrew automatically publishes weekly Google Business Profile posts and AI-written replies to new reviews, included in every plan.',
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
