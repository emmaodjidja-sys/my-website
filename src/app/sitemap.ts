import type { MetadataRoute } from 'next'

const BASE = 'https://www.emmanuelneneodjidja.org'

const articleSlugs = [
  'the-evaluation-gap',
  'evidence-in-fragile-settings',
  'when-data-meets-context',
  'cop28-climate-funding',
  'rethinking-nutrition-surveillance',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                     lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/publications`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/writing`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...articleSlugs.map((slug) => ({
      url: `${BASE}/writing/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
