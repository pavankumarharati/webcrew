/**
 * Public marketing feature flags.
 *
 * Pricing is intentionally opt-in so unfinished tiers can never be exposed by
 * a missing environment variable. Set NEXT_PUBLIC_SHOW_PRICING=true at build
 * time when the agency is ready to publish plans.
 */
export const SHOW_PUBLIC_PRICING =
  process.env.NEXT_PUBLIC_SHOW_PRICING === 'true'

/**
 * Which homepage layout renders — the original 15-field form
 * (missed-call-landing.tsx) or the "paste your URL, get an instant AI
 * SalesPerson preview" flow (website-preview-landing.tsx). Both components
 * stay in the repo indefinitely; this flag is the entire switch. Reverting
 * to the old page is a Cloudflare Pages env-var change + redeploy, never a
 * code edit or git revert.
 */
export const SHOW_NEW_LANDING =
  process.env.NEXT_PUBLIC_NEW_LANDING === 'true'

/**
 * Three-tier landing (tiered-landing.tsx): Tier 1 website build is live, Tiers
 * 2 and 3 are "coming soon" + waitlist. Takes precedence over SHOW_NEW_LANDING.
 * Rollback = unset NEXT_PUBLIC_TIERED_LANDING and redeploy.
 */
export const SHOW_TIERED_LANDING =
  process.env.NEXT_PUBLIC_TIERED_LANDING === 'true'
