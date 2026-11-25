// app/components/BlogArchive.tsx
//
// The blog archive (moved unchanged from app/blog/page.tsx so that /blog and
// /blog/pagina/[page] share one implementation).
//   /blog                -> page 1: featured article + the first POSTS_PER_PAGE grid posts
//   /blog/pagina/2 ... N -> the following grid posts, POSTS_PER_PAGE per page
//   /blog/pagina/1       -> 308 to /blog (next.config.ts)
// The featured article (newest post) is only shown on page 1, so no article
// appears on more than one archive page.
import Link from 'next/link';
import { blogPosts, type BlogPost } from '@/lib/blog';
import { BLOG_CATEGORY_LABELS, blogImageProps, formatPostDate, getPostReadMinutes } from '@/lib/blog-helpers';
import { CONSTANTS, absoluteUrl, whatsappUrl, WHATSAPP_LINK_TARGET, SITE_PRIMARY_IMAGE_REF } from '@/lib/seo';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import { POSTS_PER_PAGE, blogTotalPages } from '@/lib/blog-pagination';
import {
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Tag,
  MessageCircle,
  BookOpen,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------
const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// METADATA TEXT (used by app/blog/page.tsx and app/blog/pagina/[page]/page.tsx)
// ---------------------------------------------------------------------------
export const BLOG_TITLE = 'IPTV Blog: Uitleg, Tips, Gidsen & Meer | IPTVAbonnement';
export const BLOG_DESCRIPTION =
  'Handleidingen en tips over IPTV: wat IPTV is, installeren op Smart TV en Fire TV Stick, de beste apps en haperend beeld oplossen.';

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: 'all', label: 'Alle artikelen' },
  { id: 'setup', label: 'Installatie' },
  { id: 'tips', label: 'Tips' },
];

function getPostCategory(post: BlogPost): string {
  if (post.category) return post.category;
  const kw = (post.keywords || []).join(' ').toLowerCase();
  const title = (post.title || '').toLowerCase();
  if (title.includes('setup') || title.includes('install') || kw.includes('setup guide')) return 'setup';
  if (title.includes('review') || title.includes('compare') || title.includes('best')) return 'review';
  if (title.includes('sport') || kw.includes('live sports')) return 'sports';
  if (title.includes('tip') || title.includes('troubleshoot')) return 'tips';
  return 'news';
}

function getCategoryLabel(id: string): string {
  return BLOG_CATEGORY_LABELS[id as keyof typeof BLOG_CATEGORY_LABELS] || 'Uitleg';
}

// Same calculation as the article page (lib/blog-helpers.ts); display format "N min".
function getReadTime(post: BlogPost): string {
  return `${getPostReadMinutes(post)} min`;
}

// ---------------------------------------------------------------------------
// SORT POSTS BY DATE DESC
// ---------------------------------------------------------------------------
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const featuredPost = sortedPosts[0];
const restPosts = sortedPosts.slice(1);

// ---------------------------------------------------------------------------
// PAGINATION (grid posts only; the featured post is extra on page 1)
// ---------------------------------------------------------------------------
/** Number of archive pages; at least 1 (/blog always exists). */
export const BLOG_TOTAL_PAGES = blogTotalPages(blogPosts.length);

/** URL of an archive page: page 1 is /blog itself. */
export function blogPageHref(page: number): string {
  return page <= 1 ? '/blog' : `/blog/pagina/${page}`;
}

/** Grid posts shown on a given archive page (no overlap between pages). */
function getGridPosts(page: number): BlogPost[] {
  return restPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
}

// ---------------------------------------------------------------------------
// JSON-LD SCHEMAS
// ---------------------------------------------------------------------------
const BlogSchema = ({ page, posts }: { page: number; posts: BlogPost[] }) => {
  const PAGE_URL = absoluteUrl(blogPageHref(page));
  const BLOG_URL = absoluteUrl('/blog');
  const pageName = page > 1 ? `${BLOG_TITLE} – pagina ${page}` : BLOG_TITLE;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${BLOG_URL}#blog`,
        name: `${BRAND} blog`,
        description: BLOG_DESCRIPTION,
        url: BLOG_URL,
        inLanguage: CONSTANTS.LANGUAGE,
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${post.slug}#article`,
          headline: post.title,
          description: post.description || post.excerpt || '',
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: CONSTANTS.LANGUAGE,
          author: { '@id': `${SITE_URL}/#organization` },
          publisher: { '@id': `${SITE_URL}/#organization` },
          image: {
            '@type': 'ImageObject',
            url: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
          },
          keywords: (post.keywords || []).join(', '),
        })),
      },
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}#collection`,
        url: PAGE_URL,
        name: pageName,
        description: BLOG_DESCRIPTION,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: SITE_PRIMARY_IMAGE_REF,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: BLOG_URL,
          },
          ...(page > 1
            ? [{ '@type': 'ListItem', position: 3, name: `Pagina ${page}`, item: PAGE_URL }]
            : []),
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="blog-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// BLOG CARD COMPONENT
// ---------------------------------------------------------------------------
function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const categoryId = getPostCategory(post);
  const categoryLabel = getCategoryLabel(categoryId);
  const readTime = getReadTime(post);
  const dateStr = formatPostDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col bg-[#18181B] rounded-3xl overflow-hidden border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#09090B]">
        <img
          {...blogImageProps(post.image, '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px')}
          alt={post.imageAlt || post.title}
          width={800}
          height={500}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#39FF14] text-[#09090B] text-[10px] font-black uppercase tracking-wider shadow-lg">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#09090B]/80 backdrop-blur-md text-[#F8FAFC] text-[10px] font-black uppercase tracking-wider border border-[#27272A]">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#94A3B8] mb-3">
          <Calendar className="w-3 h-3 text-[#39FF14]" />
          <span>{dateStr}</span>
          <span className="text-[#39FF14]">•</span>
          <span>{post.author}</span>
        </div>

        <h3 className="text-base md:text-lg font-black text-[#F8FAFC] uppercase tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[#39FF14] transition-colors">
          {post.title}
        </h3>

        <p className="text-[#94A3B8] text-sm font-medium leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.description || post.excerpt || ''}
        </p>

        <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#39FF14] font-black text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all">
            Lees artikel
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#27272A] border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-[#09090B] group-hover:border-[#39FF14] transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// FEATURED CARD COMPONENT
// ---------------------------------------------------------------------------
function FeaturedCard({ post }: { post: BlogPost }) {
  const categoryLabel = getCategoryLabel(getPostCategory(post));
  const readTime = getReadTime(post);
  const dateStr = formatPostDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#18181B] rounded-[2rem] overflow-hidden border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_25px_60px_rgba(57,255,20,0.15)] transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-[#09090B]">
        <img
          {...blogImageProps(post.image, '(max-width: 1024px) 100vw, 640px')}
          alt={post.imageAlt || post.title}
          width={900}
          height={600}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#09090B]/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#39FF14] text-[#09090B] text-[11px] font-black uppercase tracking-widest shadow-xl border border-[#09090B]">
            <Sparkles className="w-3.5 h-3.5" />
            Uitgelicht
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#94A3B8] mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#39FF14]" />
            {dateStr}
          </span>
          <span className="text-[#39FF14]">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#39FF14]" />
            {readTime}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#F8FAFC] uppercase tracking-tight leading-tight mb-4 group-hover:text-[#39FF14] transition-colors">
          {post.title}
        </h2>

        <p className="text-[#94A3B8] text-sm md:text-base font-medium leading-relaxed mb-6 line-clamp-3">
          {post.description || post.excerpt || ''}
        </p>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all shadow-lg border border-[#09090B]/20">
            Lees het artikel
            <ArrowRight className="w-4 h-4" />
          </span>
          <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider">
            door {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// PAGER CLASSES (identical to the former Vorige/Volgende buttons)
// ---------------------------------------------------------------------------
const PAGER_BASE =
  'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all';
const PAGER_ACTIVE =
  'bg-[#18181B] text-[#39FF14] border border-[#27272A] hover:bg-[#39FF14] hover:text-[#09090B] cursor-pointer';
const PAGER_DISABLED = 'bg-[#18181B] text-[#94A3B8]/50 border border-[#27272A] cursor-not-allowed';

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function BlogArchive({ page }: { page: number }) {
  const totalPages = BLOG_TOTAL_PAGES;
  const currentPosts = getGridPosts(page);
  const showFeatured = page === 1 && Boolean(featuredPost);
  const schemaPosts = showFeatured ? [featuredPost, ...currentPosts] : currentPosts;

  const tagCounts: Record<string, number> = {};
  blogPosts.forEach((post) => {
    (post.keywords || []).forEach((kw: string) => {
      const clean = kw.toLowerCase().trim();
      if (clean.length > 2 && clean.length < 40) {
        tagCounts[clean] = (tagCounts[clean] || 0) + 1;
      }
    });
  });
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([tag]) => tag);

  return (
    <>
      <BlogSchema page={page} posts={schemaPosts} />

      <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">

        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none" />
          
          {/* Global square-grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#39FF14]/40">
              <BookOpen className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                {page > 1 ? `Blog · pagina ${page}` : 'Blog'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#F8FAFC] mb-6">
              {BRAND.toUpperCase()} <br />
              <span className="text-[#39FF14]">BLOG & TIPS</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Handleidingen, uitleg en tips om meer uit je IPTV abonnement te halen.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#39FF14]" />
                {blogPosts.length} artikelen
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
                Uitleg &amp; tips
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <MessageCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                Hulp via WhatsApp
              </span>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER CHIPS */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  cat.id === 'all'
                    ? 'bg-[#39FF14] text-[#09090B] border-[#39FF14] shadow-lg shadow-[#39FF14]/30'
                    : 'bg-[#18181B] text-[#94A3B8] border-[#27272A] hover:bg-[#27272A] hover:text-[#F8FAFC] hover:border-[#39FF14]/60'
                } cursor-pointer`}
                aria-label={`Filter op ${cat.label}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED POST */}
        {showFeatured && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-[#39FF14] rounded-full" />
              <h2 className="text-sm font-black uppercase tracking-widest text-[#39FF14]">
                Uitgelicht artikel
              </h2>
            </div>
            <FeaturedCard post={featuredPost} />
          </section>
        )}

        {/* ARTICLES GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-[#39FF14] rounded-full" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[#39FF14]">
              Nieuwste artikelen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} priority={i < 3} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Paginering" className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
              {page > 1 ? (
                <Link
                  href={blogPageHref(page - 1)}
                  rel="prev"
                  className={`${PAGER_BASE} ${PAGER_ACTIVE}`}
                  aria-label="Vorige pagina"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Vorige
                </Link>
              ) : (
                <span className={`${PAGER_BASE} ${PAGER_DISABLED}`} aria-disabled="true">
                  <ChevronLeft className="w-4 h-4" />
                  Vorige
                </span>
              )}

              {Array.from({ length: totalPages }).map((_, idx) => (
                <Link
                  key={idx}
                  href={blogPageHref(idx + 1)}
                  aria-current={idx + 1 === page ? 'page' : undefined}
                  className={`w-10 h-10 inline-flex items-center justify-center rounded-full text-xs font-black transition-all cursor-pointer ${
                    idx + 1 === page
                      ? 'bg-[#39FF14] text-[#09090B] shadow-lg shadow-[#39FF14]/30'
                      : 'bg-[#18181B] text-[#94A3B8] border border-[#27272A] hover:bg-[#27272A] hover:text-[#F8FAFC] hover:border-[#39FF14]/60'
                  }`}
                  aria-label={`Ga naar pagina ${idx + 1}`}
                >
                  {idx + 1}
                </Link>
              ))}

              {page < totalPages ? (
                <Link
                  href={blogPageHref(page + 1)}
                  rel="next"
                  className={`${PAGER_BASE} ${PAGER_ACTIVE}`}
                  aria-label="Volgende pagina"
                >
                  Volgende
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className={`${PAGER_BASE} ${PAGER_DISABLED}`} aria-disabled="true">
                  Volgende
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </nav>
          )}
        </section>

        {/* WHATSAPP CTA STRIP */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] bg-[#18181B] p-8 md:p-10 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-4 py-2 rounded-full mb-5 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Hulp nodig?
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-4">
                Gratis hulp bij de installatie
              </h3>
              <p className="text-[#94A3B8] text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Via WhatsApp helpen we je met de installatie op je Fire TV Stick, Smart TV of ander apparaat.
              </p>
              <a
                href={whatsappUrl(
                  `Hallo ${BRAND}, ik las jullie blog en wil graag hulp bij de installatie.`
                )}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-xl border border-[#09090B]/30 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#18181B] rounded-3xl p-8 md:p-12 border border-[#27272A] text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#F8FAFC] leading-tight mb-4">
              Klaar voor je <span className="text-[#39FF14]">IPTV abonnement?</span>
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Kies 3, 6 of 12 maanden, vanaf {formatEUR(LOWEST_PRICE)}. Eerst 24 uur gratis testen en hulp via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/prijzen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-lg border border-[#09090B]/20 cursor-pointer"
              >
                Bekijk de prijzen <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/installatie"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all border border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                Installatiehandleiding
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}