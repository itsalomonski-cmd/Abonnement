// app/blog/page.tsx — blog archive page 1. The archive itself lives in
// app/components/BlogArchive.tsx (shared with /blog/pagina/[page]).
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';
import BlogArchive, { BLOG_TITLE, BLOG_DESCRIPTION } from '../components/BlogArchive';

export const metadata: Metadata = generateSEOMetadata(BLOG_TITLE, BLOG_DESCRIPTION, '/blog');

export default function BlogListing() {
  return <BlogArchive page={1} />;
}
