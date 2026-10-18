import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'ai-appointment-booking-for-service-businesses',
  title: 'AI Appointment Booking: How an AI Receptionist Books Jobs Into Your Calendar',
  description: 'How AI phone booking works with Google Calendar, how it avoids double-booking, and how customers confirm, reschedule or cancel by text.',
  date: '2026-10-18',
  category: 'Guides',
  imageQuery: 'calendar planner',
  keywords: ['AI appointment booking', 'AI phone scheduling', 'book appointments by phone automatically', 'Google Calendar AI receptionist'],
  body: `
## Why booking on the first call matters

A caller who gets a confirmed time on the first call is far less likely to keep shopping around. A caller who gets "we will call you back" often calls the next company while they wait.

## How it works

1. **You connect your calendar.** One click with Google sign-in. No API keys or technical setup.
2. **You set your bookable hours and job length.** For example, Monday to Friday, 8am to 5pm, one-hour visits.
3. **The AI checks real availability during the call.** It looks at your calendar, finds open slots, and offers a couple of options.
4. **It re-checks right before booking.** If someone else grabbed the slot a second earlier, it offers the next one instead of double-booking.
5. **The appointment lands in your calendar** with the customer's name, phone number, and what the job is.

## Reminders and changes by text

When a customer agrees to texts, they get a confirmation and a reminder before the visit. They can reply:

- **C** to confirm
- **R** to reschedule (the AI offers new times from your calendar)
- **X** to cancel

You get notified of any change, and the calendar updates itself.

## Protecting your schedule

- The AI only sees and changes appointments it created, not your personal events.
- A caller can only move or cancel appointments tied to their own phone number.
- If your calendar ever disconnects, the AI switches to taking messages and tells you how to reconnect. It never pretends to book.

## Urgent calls are different

If a caller has an urgent problem (no heat in freezing weather, an active leak) and your next opening is days away, a good AI should not just book the next routine slot. It should offer to connect the caller to you or flag it as urgent. WebCrew does exactly this.

WebCrew includes calendar booking, reminders and text-to-reschedule on every plan.
`,
}
