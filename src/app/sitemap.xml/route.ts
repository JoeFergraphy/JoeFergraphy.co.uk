import { MetadataRoute } from 'next';

export function GET(): Response {
  // Define the base URL of your website
  const baseUrl = 'https://joefergraphy.co.uk';
  
  // List all the routes in your site
  const routes = [
    '',               // Home page
    '/contact',       // Contact page
  ];
  
  // Generate the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>
`;
  
  // Return the sitemap XML with appropriate headers
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
} 