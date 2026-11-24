// lib/blog-pagination.ts
//
// Blog archive pagination numbers, shared by the archive component
// (app/components/BlogArchive.tsx) and next.config.ts (which needs the exact
// list of existing archive URLs for its edge-cache headers). Keep this file
// free of imports so next.config.ts can load it.

/** Grid posts per archive page (the newest post is featured extra on page 1). */
export const POSTS_PER_PAGE = 6;

/** Number of archive pages for `postCount` posts; at least 1 (/blog always exists). */
export function blogTotalPages(postCount: number): number {
  return Math.max(1, Math.ceil(Math.max(0, postCount - 1) / POSTS_PER_PAGE));
}
