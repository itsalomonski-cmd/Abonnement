# IPTVAbonnement: final pre-deployment audit

24 November 2026. Cloudflare caching preparation, Vercel usage and regression audit.

**Companion documents:**
- `CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md`: what you configure.
- `VERCEL_USAGE_OPTIMIZATION_REPORT.md`: usage details.
- `DEPLOYMENT_GUIDE.md`: hosting and DNS; updated for this round.

**Backup made before any change:** `C:\Users\Admin\Desktop\Abonnement_backup_pre-cloudflare_2026-11-24_0517` (284 files, hash-verified).

**Not done:** no deploy, commit or push, and no change to DNS, Cloudflare, Vercel, Namecheap or Zyminex Plus.

---

## A. What changed

| File | Change | Why |
|---|---|---|
| `next.config.ts` | Image allow-lists (`deviceSizes [640, 828, 1080, 1200, 1920]`, `imageSizes [256, 384]`, `qualities [75]`, `formats ['image/webp']`) | Only the widths and quality the site actually uses can be optimised. Prevents unbounded, billable image variants |
| `next.config.ts` | `images.minimumCacheTTL`: 60 s → 31 days | Each image variant is transformed at most about once a month (Vercel's recommendation) |
| `next.config.ts` | Production headers: `Cloudflare-CDN-Cache-Control: public, max-age=86400` on the **24 exact public HTML URLs** (not on RSC navigation requests) | Prepares 24 h Cloudflare caching that is decided by the code; 404s and React data are never marked cacheable |
| `next.config.ts` | `/img/*`: `Cache-Control: public, max-age=86400` (browser 1 day) and `Cloudflare-CDN-Cache-Control: public, max-age=604800` (edge 7 days) | Fewer repeat downloads. Not "immutable", because these file names don't change when a file is replaced |
| `next.config.ts` | Preview/staging builds: `Cloudflare-CDN-Cache-Control: no-store` next to the existing `X-Robots-Tag: noindex, nofollow` | Staging can never end up in a Cloudflare cache |
| `next.config.ts` | Imports `lib/blog.ts`, `lib/channels-data.ts`, `lib/blog-pagination.ts` | The cacheable URL list is generated from the same data as the pages, so new articles are covered automatically and no wildcard can match a 404 |
| `app/layout.tsx` | Removed `export const revalidate = 86400` (replaced by an explanatory comment) | All content is in the repository and nothing is fetched at request time, so ISR only re-rendered identical HTML. Pages are now fully static |
| `app/blog/[slug]/page.tsx` | `export const dynamicParams = false` | Unknown article URLs become the static 404 instead of a server render, the same as `/zenders` and `/blog/pagina` already were |
| `lib/blog-pagination.ts` | **New**: `POSTS_PER_PAGE` (6) and `blogTotalPages()` | Shared by the blog archive and `next.config.ts`; one source of truth |
| `app/components/BlogArchive.tsx` | Uses `lib/blog-pagination.ts` instead of its own constant and formula | Same result (verified equivalent: `restPosts.length = n − 1`) |
| `DEPLOYMENT_GUIDE.md` | Rendering row (static), Windows build note (`node-linker=hoisted`), Cloudflare DNS note | Facts changed this round |
| `CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md`, `VERCEL_USAGE_OPTIMIZATION_REPORT.md`, this file | **New** | Required deliverables |

**Unchanged:** all of `public/` and `_original-assets/` (hash-verified); all page content, design, CSS, fonts, images, animations, SEO metadata, structured data, pricing and contact behaviour.

**Deleted:** nothing.

## B. Cloudflare readiness

- **Prepared in code and verified on a local production server:**
  - the 24 public pages carry a 24 h Cloudflare-only cache header;
  - 404s, React navigation (RSC) requests, robots.txt and sitemap.xml do **not**;
  - hashed JS/CSS/fonts are `immutable` for 1 year (Next.js built-in);
  - optimised images are cached 31 days;
  - `/img` files 1 day in browsers, 7 days at the edge;
  - staging builds tell Cloudflare `no-store`.
- **You must still:**
  1. move DNS to Cloudflare (nameservers at Namecheap);
  2. set SSL **Full (strict)**;
  3. switch off Rocket Loader and Email Obfuscation;
  4. create the 5 cache rules in the given order;
  5. purge after every production deploy.

  All of this is in `CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md` §2–§6.
- **Testable only after deployment:**
  - whether Vercel forwards `Cloudflare-CDN-Cache-Control`. Vercel doesn't document it; a fallback rule is provided;
  - `CF-Cache-Status` HIT/MISS behaviour, purge behaviour and dashboard usage.
- **Caching is not active yet.** Vercel's own guidance prefers connecting directly (guide §0); the trade-offs are listed there.

## C. Vercel cost optimisation

| Source of usage | Result | Verified / estimate |
|---|---|---|
| ISR regeneration of unchanged pages | **Removed** (no `revalidate`; build shows no Revalidate column; HTML `s-maxage=31536000`) | Verified mechanism; count depends on traffic |
| Server renders for unknown article URLs | **Removed** (static 404) | Verified behaviour |
| Image transformations after 60 s expiry | **Reduced** (31-day cache) | Verified header |
| Unlimited image variants (any width/quality) | **Bounded** to the 216 variants of 69 images the site uses; others → HTTP 400 | Verified |
| Repeat `/img` downloads | Reduced (browser 1 day) | Verified header |
| Vercel edge requests / data transfer for HTML and images | Reduced **once Cloudflare caches** | Estimate; no figures predicted |
| Middleware, API routes, cron, polling, third-party scripts | None existed; none added | Verified |

## D. Performance

**Test setup:** local lab measurements, not real-user data.
- Mobile profile: 4× CPU, 150 ms RTT, 1.6 Mbit/s. Desktop profile: 40 ms RTT, 10 Mbit/s.
- Local production build served by `node .next/standalone/server.js` (the deployment artefact).

**1. Same-session interleaved A/B, pre-change build vs current build, 8 runs each (12 for the repeat), medians:**

| Route | LCP before → after | TBT before → after | CLS before → after |
|---|---|---|---|
| Mobile `/prijzen` (8 runs) | 1758 → 2122 ms (+21%) | 206 → 252 ms | 0 → 0 |
| Mobile `/prijzen` (repeat, 12 runs) | 1894 → 1792 ms (−5%) | 204 → 252 ms | 0 → 0 |
| Mobile `/iptv-kopen` | 1612 → 1406 ms (−13%) | 309 → 420 ms | 0 → 0 |
| Desktop `/iptv-kopen` | 592 → 632 ms (+7%) | 52 → 49 ms | 0.016 → 0.016 |
| Desktop `/blog` | 612 → 522 ms (−15%) | 35 → 40 ms | 0.007 → 0.007 |

**Reading:**
- The served HTML is **the same size to the byte** on `/`, `/prijzen` and `/iptv-kopen`; JS, CSS and image bytes and request counts are identical.
- The `/prijzen` direction reversed between the two A/Bs, and individual runs vary by up to 2× (e.g. TBT 141–569 ms in one set).
- **Conclusion: no measurable performance change from this round.** The differences are run-to-run variance on this machine.

**2. 5-run medians, current build, all 10 combinations** (vs the accepted post-Phase-7 run; different session and server mode, `next start` then, so **not directly comparable**; listed for completeness):

| Route | LCP | FCP | TBT | CLS | JS KB | Load KB | Requests |
|---|---|---|---|---|---|---|---|
| Mobile `/` | 1780 (was 1552) | 1528 (1552) | 372 (247) | 0 (0) | 202 (201) | 411 (410) | 44 (44) |
| Mobile `/prijzen` | 2164 (1608) | 2164 (1608) | 277 (163) | 0 (0) | 201 (200) | 384 (383) | 34 (34) |
| Mobile `/iptv-kopen` | 2060 (1484) | 2060 (1484) | 395 (335) | 0 (0) | 217 (216) | 386 (385) | 40 (40) |
| Mobile `/installatie` | 1572 (1792) | 1572 (1792) | 282 (197) | 0 (0) | 201 (200) | 375 (375) | 34 (34) |
| Mobile `/blog` | 1500 (1460) | 1448 (1388) | 169 (191) | 0 (0) | 206 (205) | 469 (468) | 38 (38) |
| Desktop `/` | 1008 (920) | 812 (728) | 250 (272) | 0.002 (0.002) | 202 (201) | 781 (780) | 46 (46) |
| Desktop `/prijzen` | 1012 (984) | 1012 (984) | 32 (22) | 0.008 (0.008) | 201 (200) | 440 (440) | 34 (34) |
| Desktop `/iptv-kopen` | 712 (504) | 712 (504) | 99 (34) | 0.016 (0.016) | 217 (216) | 437 (437) | 40 (40) |
| Desktop `/installatie` | 1064 (940) | 1064 (940) | 62 (37) | 0.010 (0.010) | 201 (200) | 409 (408) | 34 (34) |
| Desktop `/blog` | 660 (524) | 660 (524) | 68 (25) | 0.007 (0.007) | 206 (205) | 473 (473) | 40 (40) |

- **The +1 KB JS** is also present in the pre-change build made in the same test environment, so it comes from the environment, not this round's code.
- **INP:** not measured (needs real user interactions; lab tools don't produce it).

## E. SEO

**Intact.** Crawl of all 24 routes on the production server: **identical to the accepted production crawl** in:
- status, `lang`, titles, descriptions, robots, canonicals, hreflang, Open Graph, Twitter, headings, visible text, JSON-LD and internal links.

Also verified:
- 15 indexable pages = 15 sitemap URLs; 9 noindex/follow (4 legal drafts, `/reviews`, 4 `/zenders`);
- JSON-LD has 0 parse errors; Product only on `/prijzen` (9 offers, all prices visible); 0 aggregateRating/shipping/return policy;
- all 24 internal link targets return 200;
- no production `X-Robots-Tag`, and the staging gate is still active (config evaluation);
- redirects: `/index`, trailing slash, and www → `https://iptvabonnement.plus/…` (one hop, query kept); unknown URLs → 404.

**Cache safety for SEO:**
- RSC requests, 404s, robots.txt and sitemap.xml are never edge-cached.
- Canonicals and structured data come from the build, so they change only with a deploy, and the purge step in the guide (§6) makes them visible immediately.
- No rule blocks Googlebot.

## F. Functional checks (production server)

| Check | Result |
|---|---|
| 24 routes × desktop and mobile: console/page errors, hydration errors, horizontal overflow | **None** |
| Navigation menu (open, focus, Esc, navigate, scroll unlock) | Pass |
| Pricing toggles (1/2/3 devices: €31/€40/€67, €53/€71/€98, €67/€99/€134); reseller €269/€493/€673 | Pass |
| Order button | → `/klantenservice`, same tab (no WhatsApp number configured) |
| Contact form | Honest "niet verstuurd" message; input kept; no personal data in any request URL |
| Video modal | Focus to "Video sluiten"; background inert; Tab/Shift+Tab never reach the page; Esc and backdrop close it; focus returns; `youtube-nocookie.com`; 0 cookies on open |
| Tickers B1/B2 | Below-fold rows paused, resume without jump (0.0 px desktop); speed unchanged |
| B3 / fade-ins | All visible after scroll (mobile `/installatie`: 0 hidden in 8 runs on both builds) |
| Reduced motion | No ticker animation; nothing hidden |
| Accessibility tree | Complete; 0 images without alt; 0 focusable elements in `aria-hidden` |
| FAQ keyboard toggle, focus indicator | Pass |
| Image loading | Pass. `/_next/image` returns WebP with a 31-day cache; disallowed widths/qualities → 400; `/img` files 200 |
| Cache headers (200 / 404 / RSC / static / images / robots / sitemap / staging) | As designed (§B) |
| TypeScript / ESLint | `tsc` exit 0 / 0 errors (23 pre-existing `<img>` warnings) |
| Production build | **Exit 0**, 29/29 static pages, standalone server produced. Built in a local copy with `node-linker=hoisted`, which avoids the known Windows symlink issue; project configuration unchanged |
| Lockfile install | `pnpm install --frozen-lockfile` exit 0 (in that copy) |

## G. Remaining limitations (not verified, or failed)

1. **Anchor link from a fresh load, `/#pricing-section` (desktop): CLS 0.15–1.0** in 7 of 8 runs, sometimes ending 1228 px above the target.
   - **Identical on the pre-change build** (7 of 8 runs, same values), so it is **not caused by this round**.
   - It is a pre-existing timing effect of the scroll-to-anchor after load in this environment; earlier sessions measured 0.002.
   - **Not fixed** (would touch scroll/animation behaviour). Recheck on the deployed site.
2. **Linux build / Vercel build:** not run. The first Vercel build is the real test.
3. **Cloudflare behaviour** (HIT/MISS, purge, `Cloudflare-CDN-Cache-Control` passing through Vercel): only testable after deployment and configuration (guide §7).
4. **Real Vercel or Cloudflare usage reductions:** not measurable before traffic exists.
5. **INP:** not measured.
6. **YouTube playback:** automated browsers cannot play it; check manually once.
7. **Static copyright year:** footer, legal pages and "over ons" show the year from the last build. It updates with the next deploy after 1 January.
8. **Environment notes:**
   - Free disk space varied a lot during the session (150 MB to 3.6 GB); tests ran once it was sufficient.
   - The dev server restarted itself after the config change and now serves its JavaScript correctly again (verified 200 on its chunks).

**Still open from earlier rounds:** launch blockers that need you (content rights, business identity, WhatsApp/e-mail, legal review, domain/hosting); see `FINAL_LAUNCH_READINESS_REPORT.md`.

## H. Deployment readiness

### READY WITH LIMITATIONS

**Ready:**
- The code builds (29/29 static pages, exit 0) and keeps every previous SEO, accessibility and functional result.
- It is prepared for 24 h Cloudflare HTML caching and long-lived asset caching, and it has the measurable sources of unnecessary Vercel work removed or bounded.

**Limitations:**
- Caching only works after you configure Cloudflare and deploy, and one header behaviour can only be confirmed live (fallback provided).
- The anchor-link CLS above is pre-existing and unfixed.
- No Linux/Vercel build has been run yet.

**Separately:** public launch still depends on the owner and legal items in `LAUNCH_OWNER_ACTIONS.md`. Those are not technical deployment blockers.
