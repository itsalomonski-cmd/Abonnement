import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${CONSTANTS.SITE_URL}/sitemap.xml`,
    host: CONSTANTS.SITE_URL,
  };
}
