import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'is-ai-phone-answering-safe',
  title: 'Is AI Phone Answering Safe? Privacy, Recordings and the Questions to Ask',
  description: "What happens to your customers' calls when an AI answers, what to ask any vendor about data and recordings, and the honest limits of compliance claims.",
  date: '2026-10-18',
  category: 'Guides',
  imageQuery: 'data security lock',
  keywords: ['is AI receptionist safe', 'AI phone answering privacy', 'call recording AI', 'AI receptionist data security'],
  body: `
## Your customers trust you with their details

A call to a plumber or HVAC company includes names, addresses, phone numbers and sometimes details about who is at home. Before you put an AI on your phone, ask how that information is handled.

## Questions to ask any AI receptionist vendor

1. **Where is call data stored, and who can see it?**
2. **Are calls recorded and transcribed? Can I turn that off or delete them?**
3. **Is my customers' data used to train AI models?**
4. **Can my customers be texted without their permission?** (The answer should be no.)
5. **What happens if the AI is unsure?** (It should take a message, not guess.)
6. **What happens when I cancel?** Can I export my data?

## Be careful with compliance claims

You will see vendors say "HIPAA compliant" or "SOC 2 compliant." Those terms mean specific things:

- **SOC 2** is an audit of a company's own security controls. Using cloud providers that have SOC 2 reports does not make the vendor itself SOC 2 compliant.
- **HIPAA** applies to health information and requires signed agreements (business associate agreements) with every service that handles that information.

If a vendor makes these claims, ask to see the audit report or the signed agreement. If you are in healthcare, do not rely on marketing language.

## How WebCrew handles it

- WebCrew runs on SOC 2-audited infrastructure (Google Cloud, Neon, Cloudflare and Twilio). WebCrew itself has not completed its own SOC 2 audit, and we do not claim HIPAA compliance.
- Customers are only texted after they agree, and anyone can reply STOP.
- The AI only uses facts you give it about your business.
- Your call summaries and leads are visible in your own dashboard, scoped to your business.
`,
}
