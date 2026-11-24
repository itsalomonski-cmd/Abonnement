# Cloudflare cache configuration guide: IPTVAbonnement

Written for the site owner, who will set up Cloudflare by hand. Prepared 24 November 2026.

**Nothing in Cloudflare, Vercel, Namecheap or DNS has been changed. Caching is NOT active** until you deploy the site, put the domain on Cloudflare and create the rules below.

Each step is marked:
- 🟩 **Done in code** (already in the project)
- 🟦 **You configure** (Cloudflare / Vercel / Namecheap dashboards)
- 🟨 **Test after deployment** (cannot be tested before the site is live)

---

## 0. Read this first: Vercel's position on a proxy in front of it

Vercel's own guidance (KB "Can I use a proxy on top of my Vercel deployment?") is:
- **"We recommend connecting directly where possible, but you can place a proxy in front of Vercel."**
- **"Start with external caching disabled unless you have a specific requirement for it."**

What you accept when Cloudflare proxies (orange cloud) in front of Vercel:

| Effect | Consequence for this site |
|---|---|
| Two independent caches | A Vercel deployment **does not** clear Cloudflare's cache. **You must purge Cloudflare after each deploy** (§6). |
| Vercel Bot Protection | "The Bot Protection managed ruleset does not work when a reverse proxy is placed in front of Vercel." |
| Client IP / geolocation | Vercel sees Cloudflare's addresses. The site has no analytics or geo features, so nothing breaks. |
| SSL mode | Must be **Full (strict)**. "Flexible mode can cause a redirect loop." |

**The alternative** is Cloudflare in **DNS-only** mode (grey cloud): Cloudflare only does DNS, and Vercel's own CDN serves and caches everything.
- This is simpler and is what Vercel recommends.
- After this round's code changes, every page is fully static, so Vercel serves the HTML from its CDN either way.
- The only extra benefit of the Cloudflare proxy is that cached HTML and images stop counting toward Vercel's edge requests and data transfer.

If you go ahead with the proxy (your stated plan), follow the rest of this guide exactly.

---

## 1. 🟩 What the code now sends (verified on a local production build)

The code decides **what** may be cached and for how long. Cloudflare only needs to be told to respect it. The header used for this is `Cloudflare-CDN-Cache-Control`:
- Cloudflare gives it priority over `Cache-Control` (Cloudflare docs: "Cloudflare-CDN-Cache-Control > CDN-Cache-Control > Cache-Control").
- Cloudflare does not pass it on to browsers.
- It does not change how Vercel or browsers cache.

| Response | `Cloudflare-CDN-Cache-Control` | `Cache-Control` (to Vercel / browser) | Meaning at Cloudflare |
|---|---|---|---|
| The 24 public HTML pages: `/`, `/prijzen`, `/iptv-kopen`, `/installatie`, `/veelgestelde-vragen`, `/reseller`, `/blog`, `/klantenservice`, `/over-ons`, `/reviews`, 4 legal pages, 6 blog articles, 4 `/zenders/*` | `public, max-age=86400` (**24 h**) | Next.js default for static pages | Cache 24 h |
| The same URL requested by Next.js client navigation (`RSC: 1` header or `?_rsc=` parameter; React data, not HTML) | **not sent** | — | Must not be cached as the page (rule 5 bypasses it) |
| Any 404 (unknown article, unknown page, `/blog/pagina/2`) | **not sent** | `private, no-cache, no-store` | Not cached |
| Redirects (`/index`, trailing slash, `www`) | not sent | — | Cloudflare decides (308s are permanent anyway) |
| `/_next/static/*` (JS, CSS, fonts; file names contain a content hash) | — | `public, max-age=31536000, immutable` (Next.js) | Cache 1 year; safe, because a new deploy produces new file names |
| `/_next/image?url=…&w=…&q=75` (optimised images) | — | `public, max-age=2678400, must-revalidate` (31 days) | Cache 31 days |
| `/img/*` (original images; names do **not** change when a file is replaced) | `public, max-age=604800` (**7 days**) | `public, max-age=86400` (1 day) | Cache 7 days; purge after replacing an image (§6) |
| `/robots.txt`, `/sitemap.xml` | — | `public, max-age=0, must-revalidate` | Effectively always fresh |
| Any URL of a **preview/staging** build (`VERCEL_ENV=preview`/`development` or `SITE_ENV=staging`) | `no-store` | + `X-Robots-Tag: noindex, nofollow` | Never cached, never indexed |

**How new content stays covered:** the list of cacheable HTML URLs is generated from the same data as the pages (`lib/blog.ts`, `lib/channels-data.ts`, `lib/blog-pagination.ts`). A new article is covered automatically on the next deploy.

---

## 2. 🟦 Put the domain on Cloudflare (DNS)

1. In Cloudflare: **Add a site** → `iptvabonnement.plus` → choose the **Free** plan.
2. Cloudflare scans the existing records. **Remove** the Namecheap parking/redirect records it imports (the A record `192.64.119.221` and the `www` CNAME `parkingpage.namecheap.com`).
3. In **Namecheap** → Domain → **Nameservers** → "Custom DNS", enter the two Cloudflare nameservers Cloudflare shows you. (On the Free plan Cloudflare must be the DNS provider; this replaces the Namecheap-DNS steps in `DEPLOYMENT_GUIDE.md` §9.)
4. **In Vercel first:** add `iptvabonnement.plus` (primary) and `www.iptvabonnement.plus` (redirect to primary). Vercel shows the A and CNAME values to use.
5. In **Cloudflare DNS**, create:
   - `A` `@` → the A value Vercel shows;
   - `CNAME` `www` → the CNAME value Vercel shows.

   **Start both as "DNS only" (grey cloud)** until Vercel's Domains page says **Valid Configuration** and the certificate is issued. Then switch both to **Proxied (orange cloud)**.

   This order is a recommendation that avoids certificate validation problems while Cloudflare proxies. It is not a quote from Vercel.
6. **SSL/TLS → Overview → Full (strict).** Edge Certificates → **Always Use HTTPS: On**.
7. If you add CAA records, include `0 issue "letsencrypt.org"` (Vercel's certificates).

## 3. 🟦 Cloudflare settings to switch OFF (they rewrite HTML or JavaScript)

These features change the HTML or scripts on the way through. That can break React hydration, the page becoming interactive.
- **Rocket Loader:** Off (Speed → Optimization).
- **Email Address Obfuscation:** Off (Scrape Shield). It rewrites e-mail addresses in the HTML, and the site will show an e-mail address once you add one.
- **Development Mode:** Off, except while debugging; it bypasses the cache.
- Do not use **"Under Attack" mode** as a permanent setting: it challenges every visitor, including crawlers.

## 4. 🟦 Cache Rules (Caching → Cache Rules)

The Free plan allows **10** cache rules; this setup uses **5**.

**Order matters.** Every matching rule applies, and **a later rule overrides an earlier one for the same setting**. Create them in this order, so the bypass rule (rule 5) is last and always wins.

Use **"Edit expression"** and paste each expression exactly.

### Rule 1: Public HTML pages (24 h, decided by the code)
- **Expression:**
  ```
  (http.host eq "iptvabonnement.plus" and not starts_with(http.request.uri.path, "/_next/") and not starts_with(http.request.uri.path, "/img/") and not http.request.uri.path in {"/robots.txt" "/sitemap.xml"})
  ```
- **Cache eligibility:** Eligible for cache
- **Edge TTL:** **Use cache-control header if present, bypass cache if not**
  - This caches only what the code marks: the 24 pages for 24 h. 404s (`no-store`) are not cached.
- **Browser TTL:** Respect origin
  - Browsers revalidate HTML on each visit (Vercel sends them `max-age=0`). A purge therefore reaches visitors immediately, while the HTML itself still comes from the Cloudflare edge.
- **Cache key:** default (query string included)

### Rule 2: Next.js build assets
- **Expression:** `(http.host eq "iptvabonnement.plus" and starts_with(http.request.uri.path, "/_next/static/"))`
- **Cache eligibility:** Eligible for cache
- **Edge TTL:** Use cache-control header if present, use default Cloudflare caching behavior if not (origin says 1 year, immutable)
- **Browser TTL:** Respect origin

### Rule 3: Optimised images
- **Expression:** `(http.host eq "iptvabonnement.plus" and http.request.uri.path eq "/_next/image")`
- **Cache eligibility:** Eligible for cache
- **Edge TTL:** Use cache-control header if present, use default Cloudflare caching behavior if not (origin says 31 days)
- **Browser TTL:** Respect origin
- **Cache key:** keep the query string. `url`, `w` and `q` identify the image; this is the default, so do not ignore query strings here.

### Rule 4: Original image files
- **Expression:** `(http.host eq "iptvabonnement.plus" and starts_with(http.request.uri.path, "/img/"))`
- **Cache eligibility:** Eligible for cache
- **Edge TTL:** Use cache-control header if present, use default Cloudflare caching behavior if not (code says 7 days at the edge)
- **Browser TTL:** Respect origin (1 day)

### Rule 5 (LAST): Never cache React navigation data, APIs or anything outside production
- **Expression:**
  ```
  (http.request.uri.query contains "_rsc=") or (any(http.request.headers["rsc"][*] eq "1")) or starts_with(http.request.uri.path, "/api/") or (http.host ne "iptvabonnement.plus")
  ```
- **Cache eligibility:** **Bypass cache**
- Notes:
  - Next.js adds `_rsc` to every client-navigation request, so if the rule editor on your plan does not accept the `http.request.headers` field, drop that part. The `_rsc` condition alone covers it.
  - `/api/` does not exist today; it is included as a safety net.
  - `www` is excluded because Vercel redirects it to the apex.

### What is deliberately NOT cached
- **404s:** rule 1 only caches when the response has a cache header, and 404s send `no-store`.
- **`robots.txt` and `sitemap.xml`:** excluded from rule 1; the origin says `max-age=0`.
- **React navigation data:** rule 5.
- **Preview/staging:** `*.vercel.app` preview URLs never pass through Cloudflare. Any other host is bypassed by rule 5, and non-production builds also send `no-store`.

### Fallback (only if test 7.2 shows Vercel does not forward `Cloudflare-CDN-Cache-Control`)
In rule 1:
- change **Edge TTL** to **"Ignore cache-control header and use this TTL" → 1 day**;
- add **Status code TTL**: `400-599` → **No cache** (so 404s are never stored).

Everything else stays the same.

## 5. 🟦 Browser TTL summary

| Content | Browser TTL | Why |
|---|---|---|
| HTML | Respect origin (= revalidate every visit) | Updates and purges are visible immediately; HTML still comes from the edge, so it is fast |
| `/_next/static/*` | Respect origin (1 year, immutable) | File names change on every deploy |
| `/_next/image` | Respect origin (31 days) | Image variants are stable |
| `/img/*` | Respect origin (1 day) | Files can be replaced under the same name |

## 6. 🟦 Purging after publishing or changing content

**Important:** changing a header or deploying to Vercel does **not** remove what Cloudflare already cached (Vercel KB: a deployment "does not automatically update that external cache").

All content (articles, prices, pages) lives in the code, so **every content change is a deployment**. After every **production** deployment:

1. Wait until Vercel shows the deployment as **Ready** (Production).
2. Cloudflare → Caching → Configuration → **Purge Cache**:
   - **Simplest and recommended:** **Purge Everything.** The site is small, and the hashed assets are re-fetched once. The Free plan allows this ("URL, Hostname, Tag, Prefix, and Purge Everything" are available on all plans; rate limit 5 requests/minute).
   - **Targeted alternative** ("Custom Purge → URL", up to 100 URLs per request):
     - the changed page(s);
     - `https://iptvabonnement.plus/`, `/blog`, `/blog/pagina/2`… (archive pages);
     - `/sitemap.xml`;
     - for a new article, also the article URL and the pages that list it (homepage "Laatste artikelen" and the blog archive).
3. After **replacing an image under the same file name**, purge `https://iptvabonnement.plus/img/<file>` too (or better: give the new image a new file name).
4. **Check:** reload the page and look for `cf-cache-status: MISS` on the first request, then `HIT` (§7).

**Not implemented, on purpose:**
- no public purge endpoint, no secret in the code, no scheduled job.
- **Optional, for later:** a Cloudflare API token with only "Cache Purge" permission, stored as a secret in your CI or deploy tooling (never in the repository), which calls Cloudflare's purge API after each deploy.

## 7. 🟨 How to test after deployment

Run these in a terminal (Windows: PowerShell with `curl.exe`, or Git Bash).

**7.1 Cloudflare serves cached HTML**
```bash
curl -sI https://iptvabonnement.plus/prijzen | grep -iE "cf-cache-status|age|cache-control"
curl -sI https://iptvabonnement.plus/prijzen | grep -iE "cf-cache-status|age"
# 1st request: cf-cache-status: MISS (or EXPIRED); 2nd: HIT, with an "age" header that grows
```

`CF-Cache-Status` values (Cloudflare docs):

| Value | Meaning |
|---|---|
| **HIT** | Served from Cloudflare's cache |
| **MISS** | Cacheable, but fetched from Vercel this time |
| **EXPIRED** | Was cached but older than its TTL, so re-fetched |
| **REVALIDATED** | Origin confirmed it unchanged |
| **UPDATING** | Served from cache while refreshing in the background |
| **BYPASS** | A rule said bypass, or the origin said not cacheable |
| **DYNAMIC** | Not eligible for caching; went straight to the origin |
| **NONE/UNKNOWN** | Generated by Cloudflare (e.g. a redirect) |

**7.2 Does Vercel forward the edge header?** Check the origin directly, bypassing Cloudflare, via the project's own production `.vercel.app` address:
```bash
curl -sI https://<your-project>.vercel.app/prijzen | grep -i cloudflare-cdn-cache-control
# expected: Cloudflare-CDN-Cache-Control: public, max-age=86400
```
If it is missing, use the **Fallback** in §4. (Vercel's documentation does not say whether it passes this header through; this is the one thing that can only be tested live.)

**7.3 Things that must NOT be cached**
```bash
curl -sI https://iptvabonnement.plus/blog/bestaat-niet | grep -iE "^HTTP|cf-cache-status"       # 404 and never HIT
curl -sI "https://iptvabonnement.plus/prijzen?_rsc=test" -H "RSC: 1" | grep -i cf-cache-status   # BYPASS or DYNAMIC
curl -sI https://iptvabonnement.plus/sitemap.xml | grep -iE "cf-cache-status|cache-control"     # not a long-lived HIT
```

**7.4 Assets and images**
```bash
curl -sI https://iptvabonnement.plus/img/og-image.jpg | grep -iE "cf-cache-status|cache-control"   # HIT after 1st request; max-age=86400
curl -sI "https://iptvabonnement.plus/_next/image?url=%2Fimg%2Fsofa.webp&w=640&q=75" -H "Accept: image/webp" | grep -iE "cf-cache-status|content-type"   # image/webp, HIT on repeat
```

**7.5 Updates arrive:** change something, deploy, purge (§6). Then `curl -s https://iptvabonnement.plus/<page> | grep "<new text>"` must find the new text, and the first request after the purge shows `MISS`.

**7.6 SEO safety on cached responses:**
```bash
curl -s https://iptvabonnement.plus/ | grep -o '<link rel="canonical"[^>]*>'      # https://iptvabonnement.plus
curl -s https://iptvabonnement.plus/ | grep -o '<meta name="robots"[^>]*>'        # index, follow
curl -sI https://iptvabonnement.plus/ | grep -i x-robots-tag                       # (no output)
```
- Rich Results Test on `/prijzen` (Product with 9 offers).
- Search Console → URL Inspection: "Page fetch: Successful".

**7.7 Is Vercel still receiving requests it shouldn't?**
- Cloudflare dashboard → **Analytics & Logs → Traffic / Caching**: the share of **cached** requests and bandwidth should rise after the first day.
- Vercel dashboard → **Usage** (and Observability): Edge Requests, Fast Data Transfer and Image Optimization transformations should fall over the following days.
- Compare the week before and after switching on the proxy. No figures are predicted here.

## 8. Limitations and plan-dependent points

| Point | Detail |
|---|---|
| Free plan | 10 cache rules (5 used). Query-string cache-key options beyond the defaults are paid features; not needed here |
| `Vary` header | Cloudflare does not split its cache on Next's `Vary: rsc, …`; rule 5 handles that by bypassing those requests. Optimised images are WebP for all modern browsers (Next's `Vary: Accept` is not used by Cloudflare by default) |
| Two caches | Always purge Cloudflare after a Vercel production deploy (§6) |
| Vercel Bot Protection | Does not work behind a proxy (Vercel KB) |
| Googlebot | Not blocked by any rule here. Don't enable "Under Attack" mode site-wide. If you enable Bot Fight Mode, verify in Search Console that fetching still succeeds |
| Staging | Preview URLs (`*.vercel.app`) are not behind Cloudflare and are noindex. Don't put a staging host under this zone without rule 5's host exclusion |
| `Cloudflare-CDN-Cache-Control` through Vercel | Not documented by Vercel; must be tested (7.2), with a fallback provided |
