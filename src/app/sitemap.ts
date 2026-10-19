import { MetadataRoute } from 'next';
import { services, SITE_URL } from '@/content/services';

// Add the export configuration for static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/services/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/contact/`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
