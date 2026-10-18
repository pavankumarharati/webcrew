import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'ai-receptionist-for-small-business',
  title: 'What Is an AI Receptionist? A Plain-English Guide for Local Service Businesses',
  description: 'What an AI receptionist actually does on a real call, what it can and cannot handle, and how to tell if your business is ready for one.',
  date: '2026-10-18',
  category: 'Guides',
  imageQuery: 'small business owner answering phone',
  keywords: ['AI receptionist', 'AI receptionist for small business', 'virtual receptionist AI', 'AI phone answering'],
  body: `
## The short version

An AI receptionist is software that answers your business phone in a natural voice, understands what the caller needs, and does something useful with it: books an appointment, takes a detailed message, transfers an urgent call to you, or answers a common question. It works at 2pm and at 2am, and it never puts a customer on hold because it is busy with another call.

It is not the old "press 1 for sales" phone menu. Callers talk normally, interrupt, change their mind, and the AI keeps up.

## What happens on a real call

Picture a homeowner calling an HVAC company at 9:40pm because the furnace stopped working.

1. The AI answers by name: "Thanks for calling Smith Heating, how can I help?"
2. The caller explains the problem in their own words.
3. The AI recognizes it as urgent, asks the questions your tech needs (system type, how long it has been out, anyone vulnerable at home), and checks your calendar.
4. If there is an opening soon, it books it. If not, it offers to connect the caller to your on-call phone or takes an urgent message.
5. You get a text and email summary within a minute: who called, what they need, how urgent it is, and the callback number.

The customer feels handled. You did not have to pick up the phone in the middle of dinner.

## What a good AI receptionist should do

- **Answer every call, including after hours and when you are on another line.**
- **Book appointments into your real calendar**, not a separate system you have to check.
- **Spot urgent calls** and route them to a human fast.
- **Take complete messages** with name, number, address or service area, and what the job is.
- **Send you a summary of every call** so nothing lives only in voicemail.
- **Never make things up.** If it does not know your price for a specific job, it should say so and take a message, not invent a number.

That last point matters more than any feature list. A receptionist that confidently quotes the wrong price creates problems you have to clean up later.

## What it cannot (and should not) do

- Diagnose a problem over the phone or promise a repair outcome.
- Quote prices it has not been given.
- Replace you on sensitive conversations: angry customers, billing disputes, warranty arguments. Those should be transferred or handed to you as a message.

## Is your business ready for one?

You are a good fit if any of these sound familiar:

- You are on job sites most of the day and calls go to voicemail.
- After-hours calls go unanswered until the next morning.
- You have tried an answering service but it costs too much or the operators do not know your business.
- You lose track of who called and who still needs a callback.

If you get very few calls and answer almost all of them yourself, you probably do not need one yet.

## How WebCrew does it

WebCrew is an AI front desk built for local service businesses. It answers your phone and the chat on your website 24/7, books jobs into your Google Calendar, follows up with leads who did not book, sends appointment reminders, and asks happy customers for a Google review. If you do not have a website, we build one for you as part of the plan.

> Founding 10 pricing: $99/month, locked for life, with 250 AI minutes, $0 setup and a 30-day free trial. If you ever use all your minutes, calls ring your cell instead, so there are no surprise charges and no missed customers.
`,
  faq: [
    ['Will callers know they are talking to an AI?', 'Modern AI voices sound natural, but you should never hide it. A good AI receptionist answers honestly if a caller asks, and many businesses mention it in the greeting.'],
    ['Can it transfer a call to me?', 'Yes. Urgent calls or callers who ask for a person can be transferred to your cell phone. If you do not answer, the AI takes a detailed message.'],
    ['Do I need a new phone number?', 'No. You keep your number and forward calls to the AI, either all the time or only when you do not pick up.'],
  ],
}
