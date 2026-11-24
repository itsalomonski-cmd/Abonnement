// app/sitemap.ts
import { MetadataRoute } from 'next';
import { absoluteUrl, LEGAL_PAGES_FINAL, LEGAL_PATHS } from '@/lib/seo';
import { blogPosts } from '@/lib/blog';
import { channelsData } from '@/lib/channels-data';
import { reviews } from '@/lib/reviews';

// lastModified is only emitted where a real content date exists (blog posts,
// and the blog index = its newest post). URLs without a known date omit it.
// Pages that are noindex (the reviews page while it has no genuine reviews,
// legal pages until they are final) are left out so the sitemap never lists a
// URL that asks not to be indexed. Every channel category is indexable
// (app/zenders/[slug]/page.tsx), so all of them are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const newestPostDate = blogPosts
    .map((post) => new Date(post.date))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const corePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/prijzen'), changeFrequency: 'weekly', priority: 0.95 },
    { url: absoluteUrl('/iptv-kopen'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/installatie'), changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/veelgestelde-vragen'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/reseller'), changeFrequency: 'monthly', priority: 0.7 },
    {
      url: absoluteUrl('/blog'),
      ...(newestPostDate ? { lastModified: newestPostDate } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: absoluteUrl('/klantenservice'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/over-ons'), changeFrequency: 'monthly', priority: 0.5 },
    ...(reviews.length > 0
      ? [{ url: absoluteUrl('/reviews'), changeFrequency: 'weekly' as const, priority: 0.6 }]
      : []),
  ];

  // Legal pages are noindex drafts until LEGAL_PAGES_FINAL is true (lib/seo.ts);
  // a noindex URL must never be submitted in the sitemap.
  const legalPages: MetadataRoute.Sitemap = LEGAL_PAGES_FINAL
    ? LEGAL_PATHS.map((path) => ({ url: absoluteUrl(path), changeFrequency: 'yearly' as const, priority: 0.3 }))
    : [];

  const channelPages: MetadataRoute.Sitemap = channelsData.map((category) => ({
    url: absoluteUrl(`/zenders/${category.slug}`),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...corePages, ...channelPages, ...blogPostPages, ...legalPages];
}
