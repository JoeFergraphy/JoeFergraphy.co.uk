import { MetadataRoute } from 'next';

// Add the export configuration for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://joefergraphy.co.uk/sitemap.xml',
    host: 'https://joefergraphy.co.uk',
  };
} 