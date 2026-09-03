const STORAGE_KEY = 'wc_ref'
const ATTRIBUTION_DAYS = 90

type StoredReferral = { code: string; capturedAt: number }

/** Reads `?ref=CODE` from the current URL and stores it (last-click wins). */
export function captureReferralFromURL(): void {
  if (typeof window === 'undefined') return
  const code = new URLSearchParams(window.location.search).get('ref')
  if (!code) return
  try {
    const stored: StoredReferral = { code, capturedAt: Date.now() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // localStorage unavailable (private mode, etc.) — attribution just won't persist
  }
}

/** Returns the active referral code, or null if none captured or the 90-day window expired. */
export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored: StoredReferral = JSON.parse(raw)
    const ageDays = (Date.now() - stored.capturedAt) / (1000 * 60 * 60 * 24)
    if (ageDays > ATTRIBUTION_DAYS) return null
    return stored.code || null
  } catch {
    return null
  }
}
