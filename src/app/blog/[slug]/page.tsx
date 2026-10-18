import '../blog.css'
import { notFound } from 'next/navigation'
import { POSTS } from '@/content/blog'
import { Markdown, headings } from '@/lib/blog/render'
import { BlogNav, BlogCta, BlogFooter } from '../chrome'

export const dynamicParams = false
export function generateStaticParams() { return POSTS.map(p => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = POSTS.find(x => x.slug === slug)
  if (!p) return {}
  const url = `https://webcrew.app/blog/${p.slug}`
  return {
    title: `${p.title} | WebCrew`, description: p.description, keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: p.title, description: p.description, publishedTime: p.date },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = POSTS.find(x => x.slug === slug)
  if (!p) notFound()
  const toc = headings(p.body)
  const words = p.body.split(/\s+/).length
  const related = POSTS.filter(x => x.slug !== p.slug && x.category === p.category).slice(0, 3)
  const more = related.length < 3 ? POSTS.filter(x => x.slug !== p.slug && !related.includes(x)).slice(0, 3 - related.length) : []
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date,
        author: { '@type': 'Organization', name: 'WebCrew', url: 'https://webcrew.app' },
        publisher: { '@type': 'Organization', name: 'WebCrew', logo: { '@type': 'ImageObject', url: 'https://webcrew.app/logo.png' } },
        mainEntityOfPage: `https://webcrew.app/blog/${p.slug}`, keywords: p.keywords.join(', ') },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://webcrew.app/blog' },
        { '@type': 'ListItem', position: 2, name: p.title, item: `https://webcrew.app/blog/${p.slug}` } ] },
      ...(p.faq?.length ? [{ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] : []),
    ],
  }
  return (
    <div className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <article className="bp-article">
        <div className="bp-meta"><a href="/blog">Blog</a> · {p.category} · {p.date} · {Math.max(3, Math.round(words / 220))} min read</div>
        <h1>{p.title}</h1>
        <p className="bp-lede">{p.description}</p>
        {toc.length > 2 && <nav className="bp-toc"><b>In this guide</b><ol>{toc.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol></nav>}
        <div className="bp-body"><Markdown body={p.body} /></div>
        {p.faq?.length ? <section className="bp-faq"><h2>Questions owners ask</h2>{p.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section> : null}
        <BlogCta />
      </article>
      <section className="bp-related"><h2 style={{ fontSize: 20 }}>Keep reading</h2><div className="bp-cards">
        {[...related, ...more].map(r => <a key={r.slug} className="bp-card" href={`/blog/${r.slug}`}><b>{r.title}</b><span>{r.description}</span></a>)}
      </div></section>
      <BlogFooter />
    </div>
  )
}
