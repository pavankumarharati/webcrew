import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'missed-calls-cost-home-service-business',
  title: 'How Much Are Missed Calls Really Costing Your Business? A Simple Way to Work It Out',
  description: 'A five-minute calculation, using your own numbers, that shows what unanswered calls cost a home service business every month.',
  date: '2026-10-18',
  category: 'Guides',
  imageQuery: 'missed call smartphone',
  keywords: ['missed calls cost', 'missed call revenue', 'unanswered calls small business', 'lost leads from missed calls'],
  body: `
## Why your own numbers beat any statistic

You will find plenty of dramatic statistics online about missed calls. Most of them come from vendors selling something, and none of them are about your business. The good news is you do not need them. You can work out what missed calls cost you with four numbers you already know or can find in a week.

## The four numbers

1. **Missed calls per week.** Check your phone's call log or carrier dashboard. Count calls that went to voicemail or rang out, and leave out spam.
2. **Share of those that were real jobs.** Not every call is a customer. Listen to a week of voicemails and estimate how many were genuine new work. Be honest: maybe 3 out of 10, maybe 6.
3. **Close rate.** Of the real job calls you do answer, how many turn into booked work?
4. **Average job value.** Your average ticket for a typical job.

## The formula

Monthly cost of missed calls = missed calls per week × 4.3 × share that were real jobs × close rate × average job value

### Example (made-up numbers, use your own)

- 12 missed calls per week
- 40% were real jobs
- You close 50% of real job calls you answer
- Average job value: $450

12 × 4.3 × 0.40 × 0.50 × $450 = **about $4,640 per month**

Even if you cut that in half to be conservative, it is usually far more than the cost of answering every call.

## The part this formula leaves out

The formula only counts the first job. It ignores:

- **Repeat customers.** A homeowner who books you once often calls you again next season.
- **Referrals and reviews.** A happy first customer tells neighbors and leaves a review.
- **Callers who never leave a voicemail.** Many people hang up and call the next company on Google. They do not show up as voicemails at all, only as missed calls in the log.

## Where missed calls usually come from

- You are on a job and cannot pick up.
- After 5pm and on weekends.
- Two calls at once.
- Lunch, driving, family time.

Look at your call log by time of day. Most owners are surprised by how many calls arrive in the evening and on Saturday.

## What to do about it

You have three realistic options:

1. **Hire someone.** Reliable, but a part-time receptionist costs far more per month than most small shops can justify, and still does not cover nights.
2. **Use an answering service.** Covers more hours, but costs add up per minute and operators rarely know your business well.
3. **Use an AI receptionist.** Answers every call instantly, around the clock, and books jobs directly. Costs a small fixed monthly amount.

WebCrew is built for option three. Run the numbers above first. If the monthly cost of missed calls is bigger than $99, an AI front desk pays for itself with the first saved job.
`,
  faq: [
    ['What counts as a missed call?', 'Any call that rang out, went to voicemail, or hung up before you answered. Leave out obvious spam and robocalls.'],
    ['How do I find my missed call count?', 'Your phone or carrier app shows a call log. Some carriers and VoIP systems also show missed calls by day and hour, which is useful for spotting after-hours patterns.'],
  ],
}
