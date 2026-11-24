import type {NextConfig} from 'next';
import { blogPosts } from './lib/blog';
import { channelsData } from './lib/channels-data';
import { blogTotalPages } from './lib/blog-pagination';

// ---------------------------------------------------------------------------
// CACHING (prepared for Cloudflare in front of the host; see
// CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md)
// ---------------------------------------------------------------------------
// Public HTML pages: every URL that exists, listed exactly. All are
// pre-rendered at build time and contain no visitor-specific data. Header
// rules match paths, not status codes, so wildcards such as /blog/:slug would
// also mark 404 responses as cacheable; exact URLs prevent that. Article,
// category and archive URLs come from the same data the pages are built from,
// so a new article is covered automatically.
const PUBLIC_HTML_ROUTES = [
  '/',
  '/prijzen',
  '/iptv-kopen',
  '/installatie',
  '/veelgestelde-vragen',
  '/reseller',
  '/blog',
  '/klantenservice',
  '/over-ons',
  '/reviews',
  '/algemene-voorwaarden',
  '/privacybeleid',
  '/restitutiebeleid',
  '/dmca',
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...channelsData.map((category) => `/zenders/${category.slug}`),
  ...Array.from({ length: blogTotalPages(blogPosts.length) - 1 }, (_, i) => `/blog/pagina/${i + 2}`),
];
const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;

// Next.js client navigation fetches the same URLs with an `RSC: 1` header and
// a `_rsc` query parameter (React Server Component payload, not HTML). Those
// responses must never be edge-cached as the page, so the edge-cache header is
// only sent when both are absent.
const NOT_AN_RSC_REQUEST = [
  { type: 'header' as const, key: 'rsc' },
  { type: 'query' as const, key: '_rsc' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint runs during `next build`; ESLint errors fail the build (warnings do not).
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // No remote image hosts: every optimized image (/_next/image) is a local
  // file under /public. Allowing remote hosts would let anyone use this
  // site's image optimizer as a proxy for third-party images.
  images: {
    // Optimized images change only when the source file changes (replace an
    // image under a NEW file name). A 31-day cache means each variant is
    // transformed at most about once a month instead of every 60 seconds.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Allow-lists = exactly the widths and quality the site requests
    // (lib/blog-helpers.ts; widths 256-1920, quality 75). Any other width or
    // quality is rejected instead of creating new billable transformations.
    // Add a width here before using it in responsiveImageProps().
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
    qualities: [75],
    formats: ['image/webp'],
  },
  output: 'standalone',
  // Next.js also serves the homepage at "/index"; send it to the one real
  // homepage URL so it cannot be crawled or shared as a duplicate.
  async redirects() {
    return [
      // Canonical host is https://iptvabonnement.plus (non-www). If the www
      // host is routed to this app, send it to the canonical host in one hop.
      // (HTTP -> HTTPS must be enforced by the hosting/proxy layer.)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.iptvabonnement.plus' }],
        destination: 'https://iptvabonnement.plus/:path*',
        permanent: true,
      },
      { source: '/index', destination: '/', permanent: true },
      // Archive page 1 is /blog itself; never serve it under a second URL.
      { source: '/blog/pagina/1', destination: '/blog', permanent: true },
    ];
  },
  // Indexing protection for NON-production deployments only. A build is
  // treated as non-production when it is a Vercel preview/development build
  // or when SITE_ENV=staging is set explicitly. Production builds (the
  // default, nothing set) send NO X-Robots-Tag header, so this can never
  // noindex the live site by accident.
  //
  // Edge caching: `Cloudflare-CDN-Cache-Control` is read only by Cloudflare
  // (it takes precedence over Cache-Control there and is not forwarded to
  // browsers). It does not change how the host or browsers cache. Non-
  // production builds tell Cloudflare never to cache anything.
  async headers() {
    const isNonProduction =
      process.env.VERCEL_ENV === 'preview' ||
      process.env.VERCEL_ENV === 'development' ||
      process.env.SITE_ENV === 'staging';
    if (isNonProduction) {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
            { key: 'Cloudflare-CDN-Cache-Control', value: 'no-store' },
          ],
        },
      ];
    }
    return [
      // Public HTML: 24 hours at the Cloudflare edge. Browsers keep
      // revalidating (they never see this header), so a purge at Cloudflare
      // reaches visitors immediately.
      ...PUBLIC_HTML_ROUTES.map((source) => ({
        source,
        missing: NOT_AN_RSC_REQUEST,
        headers: [{ key: 'Cloudflare-CDN-Cache-Control', value: `public, max-age=${ONE_DAY}` }],
      })),
      // Files in /public/img keep their name when replaced, so no "immutable":
      // 1 day in browsers, 7 days at the edge (purge the URL after replacing a
      // file, or better, use a new file name).
      {
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_DAY}` },
          { key: 'Cloudflare-CDN-Cache-Control', value: `public, max-age=${ONE_WEEK}` },
        ],
      },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;