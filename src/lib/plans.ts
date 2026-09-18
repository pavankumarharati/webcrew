// Canonical WebCrew plan/pricing table for the marketing site (pricing.tsx +
// the budget slider). Mirrors api/src/index.ts's PLAN_CATALOG and
// admin/src/lib/plans.ts exactly (no shared package across these three
// separate repos/runtimes) — keep all copies in sync by hand when a price
// changes. The resolver here is read-only display math for the slider; the
// real charge is always computed server-side by Sofia/checkout.

export type PlanKey = 'website_only' | 'website_hosted' | 'ai_front_office' | 'ai_reception_only'

export interface PlanDef {
  key: PlanKey
  name: string
  price: number         // list price, cents
  floor?: number         // never sell below this, cents
  ladder?: number[]      // negotiation steps, cents, first entry = list price
  billing: 'one_time' | 'subscription'
  available: boolean
  tagline: string
  features: string[]
}

export const PLAN_CATALOG: Record<PlanKey, PlanDef> = {
  website_only: {
    key: 'website_only', name: 'Website only', price: 39900, floor: 19900, ladder: [39900, 29900, 19900], billing: 'one_time', available: true,
    tagline: 'A custom website, yours outright — no monthly commitment.',
    features: ['Custom website built to your brand', 'Custom domain, yours forever', 'Hosting + SSL included', 'PageSpeed 97/100 · mobile-perfect'],
  },
  website_hosted: {
    key: 'website_hosted', name: 'Website, hosted + maintained', price: 4900, floor: 2900, ladder: [4900, 2900],
    billing: 'subscription', available: true,
    tagline: 'Your site, kept live and working for you — no AI reception.',
    features: ['Everything in Website only', 'Hosting, SSL, performance maintenance', 'Weekly traffic + ranking report'],
  },
  ai_front_office: {
    key: 'ai_front_office', name: 'AI Front Office', price: 29700, floor: 17900, ladder: [29700, 22900, 17900],
    billing: 'subscription', available: true,
    tagline: 'Website + AI receptionist that answers every call, books appointments, and runs your front office end to end.',
    features: ['Everything in hosted website', 'AI Reception — answers calls 24/7', 'Appointment booking via AI (auto-confirms)', 'Call transcripts + summary after every call', 'Instant lead SMS + email alerts', 'Lead nurture, follow-ups, revenue recovery'],
  },
  ai_reception_only: {
    key: 'ai_reception_only', name: 'AI Reception only', price: 19900, floor: 12900, ladder: [19900, 15900, 12900],
    billing: 'subscription', available: true,
    tagline: 'Already have a website? Just add 24/7 AI phone reception.',
    features: ['AI Reception — answers calls 24/7', 'Appointment booking via AI (auto-confirms)', 'Call transcripts + summary after every call', 'Instant lead SMS + email alerts', 'No website included'],
  },
}

export const PLAN_LIST = Object.values(PLAN_CATALOG)

export function priceLabel(plan: PlanDef, cents: number = plan.price): string {
  return plan.billing === 'one_time' ? `$${(cents / 100).toFixed(0)}` : `$${(cents / 100).toFixed(0)}/mo`
}

/** Read-only display math for the budget slider — mirrors resolveOffer() in api/src/index.ts. */
export function resolveOffer(planKey: PlanKey, statedBudgetCents: number, pushbackCount = 0): { amountCents: number; atFloor: boolean } | null {
  const plan = PLAN_CATALOG[planKey]
  if (!plan.available) return null
  const ladder = plan.ladder ?? [plan.price]
  const rung = Math.min(Math.max(pushbackCount, 0), ladder.length - 1)
  let amountCents = ladder[rung]
  const floor = plan.floor ?? plan.price
  if (statedBudgetCents > 0 && statedBudgetCents < amountCents) {
    if (statedBudgetCents < floor) return null
    amountCents = Math.max(statedBudgetCents, floor)
  }
  return { amountCents, atFloor: amountCents <= floor }
}

/** Every available plan whose floor fits at or under a stated budget, cheapest-fit first. */
export function plansUnderBudget(statedBudgetCents: number): PlanDef[] {
  return PLAN_LIST
    .filter(p => p.available && (p.floor ?? p.price) <= statedBudgetCents)
    .sort((a, b) => (b.floor ?? b.price) - (a.floor ?? a.price))
}
