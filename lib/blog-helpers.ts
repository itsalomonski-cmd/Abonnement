// Shared, data-free helpers for blog UI.
// IMPORTANT: only a *type* import from ./blog is allowed here. This module is
// used by a client component (ArticleScrollSidebar); importing the blogPosts
// data at runtime would ship every article's HTML to the browser.
import type { BlogPost } from './blog';

export const BLOG_CATEGORY_LABELS: Record<NonNullable<BlogPost['category']>, string> = {
  setup: 'Installatie',
  review: 'Review',
  sports: 'Sport',
  tips: 'Tips',
  news: 'Nieuws',
};

/** Category label for a post: mapped category, else first keyword, else `fallback`. */
export function getPostCategoryLabel(post: BlogPost, fallback: string): string {
  if (post.category) return BLOG_CATEGORY_LABELS[post.category] || post.category;
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return fallback;
}

/** Average Dutch reading speed used for every reading-time estimate. */
export const WORDS_PER_MINUTE = 200;

/** Visible words of an article: the embedded <style> block and HTML tags are not counted. */
export function getPostWordCount(post: Pick<BlogPost, 'content'>): number {
  return (post.content || '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Reading time in minutes. The ONLY reading-time calculation on the site
 * (blog index, article page, sidebar, homepage cards and the article's
 * schema timeRequired): visible words / 200 wpm, rounded up, at least 1.
 */
export function getPostReadMinutes(post: Pick<BlogPost, 'content'>): number {
  return Math.max(1, Math.ceil(getPostWordCount(post) / WORDS_PER_MINUTE));
}

/** "2 nov 2026"-style date (nl-NL); returns the input unchanged if it is not a valid date. */
export function formatPostDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    // UTC: a date-only string is UTC midnight; keep the stored calendar day.
    return d.toLocaleDateString('nl-NL', {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// Blog image optimization
// Blog covers and article-body images are plain <img> tags, so they bypass
// next/image. Several source files are 5000-8000px wide (up to ~0.9 MB), so
// local images are requested through the same Next.js image optimizer that
// next/image uses (resized + modern format). The files in /public are not
// modified. Widths must be in Next's default deviceSizes.
// ---------------------------------------------------------------------------
const BLOG_IMAGE_WIDTHS = [640, 828, 1200, 1920] as const;

function isLocalImage(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//');
}

/** URL of `src` resized to `width` by the Next.js image optimizer. */
export function optimizedImageUrl(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * src + srcSet for any local image through the same optimizer (Phase 5).
 * Only the downloaded file changes (resized WebP instead of the full-size
 * original); the <img> element, its classes, sizes and layout stay the same,
 * and the original files in /public are not modified. Widths must be Next.js
 * image widths (deviceSizes 640..3840 or imageSizes 16..384).
 */
export function responsiveImageProps(src: string, widths: readonly number[]): { src: string; srcSet: string } {
  return {
    src: optimizedImageUrl(src, widths[widths.length - 1]),
    srcSet: widths.map((w) => `${optimizedImageUrl(src, w)} ${w}w`).join(', '),
  };
}

/** src/srcSet/sizes props for an <img>; remote images are returned as-is. */
export function blogImageProps(
  src: string,
  sizes: string
): { src: string; srcSet?: string; sizes?: string } {
  if (!isLocalImage(src)) return { src };
  return {
    src: optimizedImageUrl(src, 1200),
    srcSet: BLOG_IMAGE_WIDTHS.map((w) => `${optimizedImageUrl(src, w)} ${w}w`).join(', '),
    sizes,
  };
}

/**
 * Rewrites local <img src="/img/..."> tags in article HTML to use the image
 * optimizer with a srcset, lazy loading and async decoding.
 */
export function optimizeArticleImages(html: string, sizes: string): string {
  return html.replace(
    /<img\s+src="(\/img\/[^"?#]+\.(?:webp|png|jpe?g))"/gi,
    (_match, src: string) => {
      const amp = (u: string) => u.replace(/&/g, '&amp;');
      const srcset = BLOG_IMAGE_WIDTHS.map((w) => `${amp(optimizedImageUrl(src, w))} ${w}w`).join(', ');
      return `<img loading="lazy" decoding="async" sizes="${sizes}" srcset="${srcset}" src="${amp(optimizedImageUrl(src, 1200))}"`;
    }
  );
}
