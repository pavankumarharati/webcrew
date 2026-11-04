import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'stop-spam-robocalls-business-line',
  title: 'How to Stop Spam and Robocalls on Your Business Line (Without Blocking Customers)',
  description: 'How to block spam calls and prevent robocalls on your business line without missing real customer calls — free steps from your carrier plus an AI option.',
  date: '2026-10-18',
  category: 'Phone basics',
  imageQuery: 'spam call phone',
  keywords: ['stop spam calls business', 'how to block spam calls business', 'how to prevent spam calls to my business', 'Google listing robocall', 'block robocalls small business', 'spam call filter'],
  body: `
To block spam calls on your business line without blocking real customers: use your carrier free spam filter, never press a number on a robocall, and report repeat callers to the FTC. An AI receptionist is the most complete option — it answers every call first and only surfaces real conversations to you.

## The "verify your Google listing" call

If your number is on Google, you have probably heard it: a recording saying customers cannot find you and you must "press 1 to verify your listing." Google does not make these calls. They are sales or scam calls, and they target numbers listed online.

## Free steps first

1. **Never press a number on a robocall.** It confirms your line is live and often brings more calls.
2. **Use your carrier spam filter.** AT&T (Call Protect), Verizon (Call Filter), and T-Mobile (Scam Shield) all offer free spam labeling in their apps.
3. **Report spam** to the FTC at reportfraud.ftc.gov and add your number to the National Do Not Call Registry (it does not stop scammers, but it helps reporting).
4. **Block repeat numbers,** but expect spammers to change numbers often.
5. **Ask your carrier about STIR/SHAKEN.** On newer VoIP or cloud phone systems, verified caller IDs get through spam filters more reliably, so real customers are less likely to be mislabeled.

## The trap: blocking real customers

Aggressive call screening ("state your name and the reason for your call") stops some robocalls but also annoys real customers, and many will hang up. For a business that lives on new-customer calls, that is a bad trade.

## A better approach with an AI receptionist

- The AI answers every call, so a robocall wastes only machine time, not yours.
- Recorded messages and phone menus are detected and the call is ended quickly.
- Real customers talk to the AI normally with no extra steps.
- You only get notified about real conversations, not spam.

WebCrew labels every call (real person, website chat, suspected robocall, no speech) so your call history shows real customers clearly, and robocalls do not clutter your leads.
`,
  faq: [
    ['How do I block spam calls on my business phone?', 'Start with the free spam filter from your carrier: AT&T Call Protect, Verizon Call Filter, or T-Mobile Scam Shield. Block repeat numbers as they appear. Report persistent callers to the FTC at reportfraud.ftc.gov. Never press a number on a robocall — it confirms your line is live and brings more.'],
    ['How do I prevent spam calls to my business without blocking real customers?', 'Avoid aggressive call screening like name-announcement prompts, which frustrate real callers. Use your carrier spam labeling, which shows "Spam Likely" on your screen but still rings. An AI receptionist handles this best: it answers every call first and only forwards real conversations to you.'],
    ['Is the "verify your Google listing" call really from Google?', 'No. Google does not call businesses to verify their listings. These robocalls target numbers listed on Google Maps. Hang up without pressing any number and report the caller to the FTC at reportfraud.ftc.gov.'],
  ],
}
