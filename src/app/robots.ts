import { MetadataRoute } from 'next';

// Add the export configuration for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://joefergraphy.co.uk/sitemap.xml',
  };
} 