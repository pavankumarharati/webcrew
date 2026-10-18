export type BlogCategory = 'Guides' | 'Pricing & comparisons' | 'By trade' | 'Follow-up & reviews' | 'Phone basics'

export interface BlogPost {
  slug: string
  title: string
  description: string        // meta description, <= 160 chars
  date: string               // YYYY-MM-DD
  category: BlogCategory
  keywords: string[]
  /** Markdown-lite: ## / ### headings, paragraphs, - and 1. lists, | tables, > callouts, **bold**, [link](url). */
  body: string
  faq?: [string, string][]
}
