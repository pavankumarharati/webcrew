import './blog.css'
import { POSTS, CATEGORIES } from '@/content/blog'
import { BlogNav, BlogCta, BlogFooter } from './chrome'
import { slugify } from '@/lib/blog/render'

export const metadata = {
  title: 'AI Receptionist & Phone Answering Guides for Local Businesses | WebCrew Blog',
  description: 'Plain-English guides on AI receptionists, missed calls, call forwarding, booking, follow-ups and Google reviews for HVAC, plumbing, roofing and other local service businesses.',
  alternates: { canonical: 'https://webcrew.app/blog' },
}

export default function BlogHub() {
  return (
    <div className="bp">
      <BlogNav />
      <header className="bp-hero"><div className="bp-hero-in">
        <div className="bp-eyebrow">WebCrew blog</div>
        <h1>Answer every call. Book every job.<br />Plain-English guides for local businesses.</h1>
        <p>How AI receptionists actually work, what they cost, how to set up call forwarding, and how to turn more calls into booked jobs and reviews. Written for owners who are on a roof or under a sink when the phone rings.</p>
        <div className="bp-cats">{CATEGORIES.map(c => <a key={c} href={`#${slugify(c)}`}>{c}</a>)}</div>
      </div></header>
      <main className="bp-grid">
        {CATEGORIES.map(cat => {
          const posts = POSTS.filter(p => p.category === cat)
          if (!posts.length) return null
          return (
            <section key={cat} id={slugify(cat)}>
              <h2>{cat}</h2>
              <div className="bp-cards">{posts.map(p => (
                <a key={p.slug} className="bp-card" href={`/blog/${p.slug}`}><b>{p.title}</b><span>{p.description}</span><small>{p.date}</small></a>
              ))}</div>
            </section>
          )
        })}
        <div style={{ maxWidth: 760 }}><BlogCta /></div>
      </main>
      <BlogFooter />
    </div>
  )
}
