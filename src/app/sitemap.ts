import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://webcrew.app',
      lastModified: '2026-06-29',
    },
    {
      url: 'https://webcrew.app/privacy',
      lastModified: '2026-05-19',
    },
    {
      url: 'https://webcrew.app/terms',
      lastModified: '2026-05-19',
    },
    {
      url: 'https://webcrew.app/hvac',
      lastModified: '2026-09-03',
    },
    {
      url: 'https://webcrew.app/roofing',
      lastModified: '2026-09-03',
    },
    {
      url: 'https://webcrew.app/plumbing',
      lastModified: '2026-09-03',
    },
    {
      url: 'https://webcrew.app/electricians',
      lastModified: '2026-09-03',
    },
  ]
}
