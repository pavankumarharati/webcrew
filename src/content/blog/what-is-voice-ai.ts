import type { BlogPost } from '@/lib/blog/types'

export const post: BlogPost = {
  slug: 'what-is-voice-ai',
  title: 'What Is Voice AI? How It Works on a Phone Call, Explained Simply',
  description: 'A no-jargon explanation of voice AI: how it hears a caller, decides what to say, and takes actions like booking, with the honest limits.',
  date: '2026-10-18',
  category: 'Phone basics',
  imageQuery: 'voice assistant sound wave',
  keywords: ['what is voice AI', 'how does voice AI work', 'conversational AI phone', 'AI voice agent explained'],
  body: `
## The simple answer

Voice AI is software that can hold a spoken conversation. On a phone line it listens to the caller, understands what they mean, decides what to say or do, and talks back in a natural voice, all within a second or two.

## What happens in the background

1. **Listening.** The caller's voice is streamed to the AI as they speak.
2. **Understanding.** The AI works out what the caller wants, even if they ramble, change topic, or interrupt.
3. **Deciding.** It follows your business rules: answer a question, ask a follow-up, check the calendar, or transfer.
4. **Acting.** It can use tools, such as looking up open times, booking an appointment, or saving a message.
5. **Speaking.** It replies in a natural voice and keeps listening, so the caller can cut in at any time.

Newer systems do listening, thinking and speaking in one continuous stream rather than separate steps. That is why modern voice AI feels like a conversation instead of a phone menu.

## What it is good at

- Answering every call instantly, many at the same time.
- Following the same rules on every call.
- Collecting details accurately and reading them back.
- Booking into a real calendar.

## Its honest limits

- It only knows what you tell it about your business. It should not invent anything else.
- Very noisy lines or heavy background noise can make it ask callers to repeat themselves.
- It is not a replacement for you on sensitive conversations. Those should be transferred or turned into a message.

## Where you would use it in a small business

The most common use is an AI receptionist: answering calls you cannot pick up, booking jobs, and sending you a summary. The same AI can also talk to visitors on your website.

WebCrew uses voice AI to run a full front desk for local service businesses, on the phone and on your website.
`,
}
