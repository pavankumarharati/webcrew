import { MetadataRoute } from 'next'
import { POSTS } from '@/content/blog'
import { execSync } from 'node:child_process'

export const dynamic = 'force-static'

const BASE = 'https://webcrew.app'

// lastModified = date of the newest git commit touching a route's source files,
// resolved at build time (needs full history — deploy.yml checks out fetch-depth: 0).
// Falls back to the build date if git isn't available.
function lastCommitDate(paths: string[]): string {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${paths.join(' ')}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    if (out) return out
  } catch {
    // not a git checkout — fall through
  }
  return new Date().toISOString().slice(0, 10)
}

const NICHE_LANDING = 'src/components/niche-landing.tsx'

const ROUTES: { path: string; sources: string[] }[] = [
  { path: '', sources: ['src/app/page.tsx', 'src/components'] },
  { path: '/privacy', sources: ['src/app/privacy'] },
  { path: '/terms', sources: ['src/app/terms'] },
  { path: '/affiliate', sources: ['src/app/affiliate', 'src/components/affiliate-apply-form.tsx'] },
  ...['hvac', 'roofing', 'plumbing', 'electricians', 'contractors', 'cleaning', 'auto-services', 'salons', 'spas', 'home-services'].map(
    slug => ({ path: `/${slug}`, sources: [`src/app/${slug}`, NICHE_LANDING] }),
  ),
  { path: '/ai-receptionist', sources: ['src/app/ai-receptionist'] },
  { path: '/google-business-profile-management', sources: ['src/app/google-business-profile-management'] },
  { path: '/blog', sources: ['src/app/blog', 'src/content/blog'] },
  ...POSTS.map(p => ({ path: `/blog/${p.slug}`, sources: [`src/content/blog/${p.slug}.ts`, 'src/app/blog'] })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(r => ({
    url: `${BASE}${r.path}`,
    lastModified: lastCommitDate(r.sources),
  }))
}
