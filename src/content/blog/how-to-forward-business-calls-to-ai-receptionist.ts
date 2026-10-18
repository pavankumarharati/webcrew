import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'how-to-forward-business-calls-to-ai-receptionist',
  title: 'How to Forward Your Business Number to an AI Receptionist (Keep Your Number)',
  description: 'Step-by-step call forwarding for AT&T, Verizon, T-Mobile and most business phone apps, including "forward only when I do not answer."',
  date: '2026-10-18',
  category: 'Phone basics',
  imageQuery: 'smartphone settings hand',
  keywords: ['forward business calls', 'conditional call forwarding', 'call forwarding codes', 'forward calls when no answer'],
  body: `
## You keep your number

Your customers keep calling the same number they always have. You simply tell your phone carrier to send some or all of those calls to your AI receptionist's number. Nothing changes on your Google listing, your trucks, or your business cards.

## Two ways to forward

1. **Forward every call.** The AI answers everything and transfers urgent calls to your cell. Best if you are on jobs most of the day.
2. **Forward only when you do not answer (conditional forwarding).** Your phone rings first. If you do not pick up after a few rings, or you are on another call, the AI answers. Best if you still want to take calls yourself when you can.

Most owners start with option 2.

> Important: if you forward your business line to the AI, set the AI's transfer number to your personal cell, not the business line. Otherwise a transfer would loop back to the AI.

## Mobile carriers

Codes below are the standard ones most carriers use. Replace NUMBER with your AI receptionist number, including the area code. Dial the code like a phone call and wait for the confirmation tone or message. If a code does not work on your plan, your carrier's support line or app can turn the same setting on.

### AT&T and T-Mobile (GSM networks)

- Forward when you do not answer: [[**61*NUMBER#]]
- Forward when you are busy: [[**67*NUMBER#]]
- Forward when your phone is off or out of signal: [[**62*NUMBER#]]
- Forward all calls: [[**21*NUMBER#]]
- Cancel all forwarding: [[##002#]]

### Verizon

- Forward when you do not answer or are busy: dial [[*71]] followed by NUMBER
- Forward all calls: dial [[*72]] followed by NUMBER
- Cancel: [[*73]]

## Business phone apps and VoIP

If you use a business phone app or desk phone service, forwarding is usually in the settings under "call forwarding," "call handling," or "routing." Look for an option like "forward unanswered calls after X rings." Set it to 3 to 4 rings (about 15 to 20 seconds).

## Test it

1. Call your business number from another phone.
2. Do not answer.
3. The AI should pick up and greet callers with your business name.
4. Ask it to book a test appointment, then check your calendar.

## Common problems

- **The AI never answers:** the forwarding code did not take. Check your carrier app or call support.
- **Calls go to voicemail first:** your voicemail picks up before forwarding. Shorten the ring time or turn off carrier voicemail.
- **Caller ID shows your own number:** some carriers show the forwarding line instead of the customer. A good AI receptionist detects this and does not text or book under your own number.

WebCrew shows your exact forwarding steps inside your dashboard after signup, and our team helps you test it during your free trial.
`,
}
