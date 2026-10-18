import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'ai-receptionist-roi',
  title: 'How to Measure the ROI of an AI Receptionist (A Simple Monthly Check)',
  description: 'A plain monthly check to see if your AI receptionist is paying for itself, using numbers from your own dashboard, not vendor claims.',
  date: '2026-10-18',
  category: 'Pricing & comparisons',
  imageQuery: 'business growth chart',
  keywords: ['AI receptionist ROI', 'is an AI receptionist worth it', 'answering service ROI', 'measure call answering ROI'],
  body: `
## The only ROI that matters is yours

Vendors love big percentages. Ignore them. After one month, your own numbers will tell you whether it is working.

## The monthly check

Look at four numbers at the end of each month:

1. **Calls and chats handled.** How many conversations did the AI handle?
2. **After-hours conversations.** How many came in outside your working hours? These were almost certainly going to voicemail before.
3. **Jobs booked by the AI.** Appointments it put in your calendar.
4. **Average job value.** Your typical ticket.

### The math

Revenue from AI bookings = jobs booked by the AI × average job value

ROI = (revenue from AI bookings − monthly cost) ÷ monthly cost

**Example (made-up numbers):** 6 jobs booked × $400 = $2,400. Monthly cost $99. ROI = ($2,400 − $99) ÷ $99, roughly 23 times the cost.

Be conservative: only count jobs you would have actually lost. A fair rule of thumb is to count bookings that came in after hours or while you were on another call.

## What to look at besides bookings

- **Leads captured but not booked.** Did your team call them back?
- **Urgent calls transferred.** Each of these was a customer who got help fast.
- **Reviews gained.** More reviews tend to bring more calls over time.

## Where to find these numbers

WebCrew emails you a monthly report with calls handled, after-hours calls, leads, urgent calls, bookings and follow-ups sent, all from your own data. Your dashboard also shows how many of your plan's minutes you have used, so there are no surprises.
`,
}
