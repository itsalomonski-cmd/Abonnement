# Vercel usage optimisation report: IPTVAbonnement

24 November 2026.

All findings below come from the code and a local production build. **No traffic, bandwidth, cost or savings figures are given**, because none can be known before the site is live. What *can* be verified is which kinds of server work and transfer the site can cause, and which of those were removed or bounded.

Vercel billing facts quoted below come from Vercel's documentation pages "Image Optimization: limits and pricing", "Managing image optimization costs", "Cache-Control headers" and "CDN cache", read on 24 Nov 2026.

---

## 1. Baseline (before this round)

| Area | Finding (verified) |
|---|---|
| Page rendering | Every page used **ISR** with `revalidate = 86400` (from `app/layout.tsx`). Baseline production build: `Cache-Control: s-maxage=86400, stale-while-revalidate=31449600`; build table "Revalidate 1d". |
| Data sources | **None at request time.** No `fetch`, no cookies/headers, no search params on the server, no database, no CMS. All content (pages, 6 articles, prices) is in the repository. |
| API routes / middleware / route handlers | None. |
| Unknown article URLs (`/blog/<anything>`) | `dynamicParams` was not disabled, so each unknown slug was **rendered on the server on request**, returning a 404. (`/zenders/*` and `/blog/pagina/*` were already static-only.) |
| Image delivery | 69 local source images (6.5 MB of originals) reach visitors through the Next.js optimizer at **216 distinct width variants** (widths 256–1920, quality 75), counted from the rendered HTML of all 24 routes. Only small icons/avatars (33 KB) and the desktop hero/neon artwork (via `<picture>`) are served as files. |
| Optimizer cache | `minimumCacheTTL` = Next default, **60 s**. Any width 16–3840 and any quality 1–100 was accepted, so arbitrary URLs could create new variants. |
| `/public/img` files | Next.js default browser caching (`public, max-age=0`, per Next.js defaults; not re-measured). |
| Hashed build assets (`/_next/static/*`) | Already `public, max-age=31536000, immutable` (Next.js). |
| Third-party requests | None on page load. The YouTube player loads only when the visitor clicks (`youtube-nocookie.com`). Fonts are self-hosted. |
| Client polling / intervals | None (`setInterval` is not used; timers are one-shot UI timers). |
| JS per route (local measurement) | 200–216 KB transferred; unchanged by this round (§4). |

## 2. Changes and what they remove

| # | Change | File(s) | Usage it removes or bounds | Verified how | Status |
|---|---|---|---|---|---|
| 1 | Removed the time-based ISR (`revalidate = 86400`); all pages are now fully static | `app/layout.tsx` | ISR regeneration: re-rendering identical HTML in a function, plus a cache write, per page per period, for no content change. Now content changes only through a deployment | Production build table: no "Revalidate" column; HTML `Cache-Control: s-maxage=31536000`; crawl of all 24 routes identical to the accepted SEO crawl | **Verified** (mechanism). The number of regenerations avoided depends on traffic, so no figure |
| 2 | `dynamicParams = false` on `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Server render per request for nonexistent article URLs (bots, typos). They are now served as the static 404 | Production server: `/blog/bestaat-niet` → 404, `no-store`; all 6 articles 200 | **Verified** (behaviour); invocation count not measurable locally |
| 3 | `images.minimumCacheTTL` 60 s → **31 days** | `next.config.ts` | Re-transformation after expiry. Vercel: "Image transformations are billed for every cache MISS and STALE"; Vercel recommends `minimumCacheTTL: 2678400` | Production server: `/_next/image` → `Cache-Control: public, max-age=2678400` | **Verified** (header) |
| 4 | Allow-lists: `deviceSizes [640, 828, 1080, 1200, 1920]`, `imageSizes [256, 384]`, `qualities [75]`, `formats ['image/webp']` | `next.config.ts` | Unbounded variants: any width or quality can no longer create a new (billable) transformation. Vercel recommends exactly these allow-lists. Upper bound now = **216 variants of 69 images**, independent of traffic | Production server: `w=750` → 400, `q=90` → 400, `w=640&q=75` → 200 WebP | **Verified** |
| 5 | `/img/*`: browser 1 day, Cloudflare edge 7 days | `next.config.ts` | Repeat downloads of the same original images by returning visitors; and, with Cloudflare, origin requests for them | Production server headers | **Verified** (headers); effect needs live traffic |
| 6 | Public HTML marked cacheable for 24 h **at Cloudflare only** (`Cloudflare-CDN-Cache-Control`); 404s, RSC data and staging excluded | `next.config.ts` (+ `lib/blog-pagination.ts`, `app/components/BlogArchive.tsx` for the exact URL list) | With Cloudflare proxying (your plan): HTML served from Cloudflare stops counting as Vercel edge requests and data transfer | Production server headers on 200 / 404 / RSC / preview config | **Prepared**; active only after deploy + Cloudflare rules |

**Not changed, and why:**
- **Pre-generating all 216 image variants as static files** (bypassing the optimizer completely) was considered and rejected:
  - it adds ~216 files and a build step;
  - with a 31-day cache, the transformations are bounded to at most 216 per cache period, far below the Hobby plan's documented 5,000 transformations/month.
  - The fixed allow-lists achieve the cost control without new files.
- **The desktop hero (`hero.webp`, 218 KB) and neon artwork:** the hero is approved artwork served directly in a desktop-only `<picture>`. Re-encoding it through the optimizer could change it visibly.
- **AVIF:** not added. Vercel notes AVIF increases transformations, and WebP is already served.
- **Middleware, edge functions, cron jobs:** none exist and none were added.

## 3. Verified vs. estimated

| Claim | Type |
|---|---|
| No ISR regeneration can happen any more | Verified (build output) |
| Unknown article URLs no longer render on the server | Verified (behaviour) |
| Image variants limited to 216 (69 sources × used widths) | Verified (HTML inventory + 400 for others) |
| Optimizer cache lifetime 31 days | Verified (header) |
| Lower Vercel edge requests / data transfer once Cloudflare caches HTML and images | **Estimate**, depends on Cloudflare hit rate; check in the Vercel Usage and Cloudflare Analytics dashboards (Cloudflare guide §7.7) |
| Any € amount | Not estimated |

## 4. Did performance change?

Client-side code was not changed (apart from moving one constant), so the page weight and JS are unchanged. Measurements are in `FINAL_PRE_DEPLOYMENT_AUDIT.md` §D.
