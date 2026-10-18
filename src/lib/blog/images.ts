import manifest from '@/content/blog/images.json'

export interface BlogImage { src: string; alt: string; credit: string; creditUrl: string; source: string }

/** Hero photo for a post (free stock, downloaded by scripts/blog-images.mjs), or undefined. */
export function blogImage(slug: string): BlogImage | undefined {
  return (manifest as Record<string, BlogImage>)[slug]
}
