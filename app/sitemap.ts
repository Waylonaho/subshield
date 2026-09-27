import { MetadataRoute } from 'next';
import { STATE_LIEN_RULES } from '@/lib/statutoryRules';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://subshieldhq.com';

  // Base landing page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Optional: add entries for individual state filters or pages
  const stateRoutes: MetadataRoute.Sitemap = Object.keys(STATE_LIEN_RULES).map((stateCode) => ({
    url: `${baseUrl}?state=${stateCode.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...stateRoutes];
}