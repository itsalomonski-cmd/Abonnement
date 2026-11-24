// app/blog/pagina/[page]/page.tsx — blog archive pages 2..N.
// Only real archive pages are generated (dynamicParams = false): page 1 is
// /blog (/blog/pagina/1 redirects there, see next.config.ts) and every other
// value (0, negative, non-numeric, beyond the last page) returns 404.
// Each page is self-canonical and indexable; pages are reached through the
// crawlable pagination links and are intentionally NOT listed in the sitemap.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo';
import BlogArchive, { BLOG_TITLE, BLOG_TOTAL_PAGES, blogPageHref } from '../../../components/BlogArchive';

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, BLOG_TOTAL_PAGES - 1) }, (_, i) => ({ page: String(i + 2) }));
}

/** Valid archive page number (2..last) or null. "02", "2.5", "+2" etc. are not valid. */
function parsePage(value: string): number | null {
  if (!/^[1-9][0-9]*$/.test(value)) return null;
  const n = Number(value);
  return n >= 2 && n <= BLOG_TOTAL_PAGES ? n : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page) return {};
  return generateSEOMetadata(
    `${BLOG_TITLE} – pagina ${page}`,
    `Pagina ${page} van onze blog met handleidingen en tips over IPTV: installeren op je apparaat, apps kiezen en haperend beeld oplossen.`,
    blogPageHref(page)
  );
}

export default async function BlogArchivePage({ params }: Props) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  return <BlogArchive page={page} />;
}
