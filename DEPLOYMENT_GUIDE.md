# IPTVAbonnement: deployment guide

Written for the site owner, or whoever sets up hosting.

Verified on 24 November 2026 against the project as it is now. Nothing has been deployed, and no DNS, hosting or certificate setting has been changed.

---

## 0. Current live state (observed, read-only, 23–24 Nov 2026)

| Check | Result |
|---|---|
| `iptvabonnement.plus` (apex) DNS | A record → `192.64.119.221` (a Namecheap URL-redirect address) |
| `http://iptvabonnement.plus/` | `302` → `http://www.iptvabonnement.plus/` (Namecheap redirect) |
| `www.iptvabonnement.plus` DNS | CNAME → `parkingpage.namecheap.com` (Namecheap parking page) |
| `https://iptvabonnement.plus/` | Fails (connection timeout) |
| `https://www.iptvabonnement.plus/` | Fails (TLS error) |

**The website is not online.** The domain shows a Namecheap parking page, and HTTPS does not work.

---

## 1. What the application needs (checked in the code)

| Property | Value | Consequence |
|---|---|---|
| Framework | Next.js **15.5.29** (App Router), React 19.2 | Needs a host that runs a Next.js **server** |
| `output` | `'standalone'` (`next.config.ts`) | Produces a self-contained Node server in `.next/standalone` (for VPS/Docker). Vercel ignores it and uses its own build output |
| Page rendering | All 29 routes are **fully static** (generated at build time; since 24 Nov there is no time-based `revalidate`, because all content is in the repository). Unknown blog, category and archive URLs are static 404s (`dynamicParams = false`) | Content changes go live with the next deployment. With Cloudflare in front, also purge its cache (`CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md` §6) |
| Image optimisation | `/_next/image` with `sharp`, **local images only** (remote hosts deliberately disabled) | Needs a Node runtime. sharp 0.35 requires Node ≥ 20.9 |
| Redirects | In `next.config.ts`: **www → `https://iptvabonnement.plus/…`** (host-based, keeps path and query, 308), `/index` → `/`, `/blog/pagina/1` → `/blog`; trailing slash → no slash (308) | Must run inside Next (a static host would lose them) |
| Response headers | `X-Robots-Tag: noindex, nofollow` on **every** URL, but only for non-production builds (see §7) | Production gets no such header |
| API routes / middleware / database | None | Single stateless instance is enough |
| Secrets / environment values | **None needed in production** | See `.env.example` |
| Static export (`next export`) | **Not compatible**: it would drop the redirects, the noindex header, the image optimiser and ISR | Do not use static-only hosting |

## 2. Recommended hosting

**Recommended: Vercel** (the company behind Next.js). Reasons:
1. **Zero configuration:** Next.js 15 is supported directly, including ISR, image optimisation and `next.config.ts` redirects/headers.
2. **Preview noindex is automatic:** Vercel sets `VERCEL_ENV`, which the project already uses. Every preview deployment gets `X-Robots-Tag: noindex, nofollow` and production gets none, with no manual step that could be forgotten.
3. **HTTPS is automatic:** certificates are issued once DNS is verified (Vercel docs, "Set up a custom domain").
4. **Rollbacks are instant** (see §11).

**Alternative: a Node.js VPS (EU location)** running the standalone server behind Caddy or Nginx with Let's Encrypt (§12). It gives more control, but you must handle updates, monitoring and certificates yourself.

**Not recommended:**
- Namecheap shared hosting (cPanel "Node.js app" / Passenger): limited and fragile for a Next 15 server with sharp and ISR.
- Any static-only hosting (see §1).

> **Before choosing any provider, read its Terms of Service / Acceptable Use Policy and confirm that it permits this business.**
> - Hosting and payment providers may suspend services that distribute content without licences (see `LAUNCH_MISSING_INFORMATION.md` item 4.1).
> - For Vercel, also check in its Terms of Service whether the free **Hobby** plan allows commercial use. The documentation pages I checked did not state it either way; a commercial site may need the **Pro** plan.

## 3. Node.js version

- **Use Node.js 22 LTS (22.13 or newer).**
- Why: pnpm 11 requires Node ≥ 22.13; sharp 0.35.5 requires Node ≥ 20.9; Next 15.5 requires Node ≥ 18.18.
- Local development currently uses Node 24.19, which also works.
- **On Vercel:** Project → Settings → Build and Deployment → Node.js Version → **22.x**.

## 4. Package manager

- **pnpm 11.23.0**, pinned in `package.json` as `"packageManager": "pnpm@11.23.0"`.
- **Why the pin matters:** the lockfile (`pnpm-lock.yaml`, format 9.0) is shared by pnpm 9, 10 and 11. The workspace settings in `pnpm-workspace.yaml` (`allowBuilds`, `overrides`) were written by pnpm 11. A host that guesses an older pnpm may ignore those settings and reject the lockfile.
- **On Vercel:** add the environment variable `ENABLE_EXPERIMENTAL_COREPACK=1` (all environments) so the pinned pnpm version is used. Then check the first build log for "pnpm 11.23.0". **Not verified on Vercel yet.**

## 5. Commands

| Step | Command | Verified locally? |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | Yes: clean install in an empty copy, exit 0 (24 Nov) |
| Build | `pnpm build` (= `next build`) | Yes, exit 0, 29/29 pages, standalone server produced (24 Nov, local copy). With pnpm's default layout, Windows blocks the symlinks of the final "standalone" step (`EPERM`) unless Developer Mode is enabled. **For local Windows builds only**, installing with `pnpm install --frozen-lockfile --config.node-linker=hoisted` avoids this. It is not needed on Linux hosts or Vercel. **A Linux build has NOT been verified.** |
| Start (Vercel) | none; Vercel runs the build output itself | n/a |
| Start (VPS, recommended) | `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/` then `PORT=3000 HOSTNAME=0.0.0.0 node .next/standalone/server.js` | Not verifiable on this PC (standalone step, see above) |
| Start (VPS, simple) | `pnpm start` (= `next start`). Prints a warning that `output: standalone` is configured, but serves the site; all local tests of earlier phases used it | Yes (earlier phases) |

## 6. Environment variables

| Variable | Production | Staging / preview | Notes |
|---|---|---|---|
| *(none)* | **Nothing required** | — | The site uses no secrets or API keys |
| `SITE_ENV` | **Do not set** | `staging` on any non-Vercel test deployment | Must be present **when `next build` runs**: the noindex header is compiled into the build |
| `VERCEL_ENV` | Set by Vercel (`production`) | Set by Vercel (`preview` / `development`) | Never set manually |
| `ENABLE_EXPERIMENTAL_COREPACK` | `1` (Vercel only) | `1` (Vercel only) | Makes Vercel use the pinned pnpm 11.23.0 |
| `DISABLE_HMR` | not used | not used | Local development switch only |

`.env.example` documents the same variables. No `.env` files with real values exist in the project.

## 7. Production vs. staging noindex (verified)

**What the build sends**, evaluated from the real `next.config.ts` on 24 Nov:

| Environment at build time | `X-Robots-Tag` sent on every URL |
|---|---|
| nothing set (production) | **none** |
| `VERCEL_ENV=production` | **none** |
| `VERCEL_ENV=preview` | `noindex, nofollow` |
| `VERCEL_ENV=development` | `noindex, nofollow` |
| `SITE_ENV=staging` | `noindex, nofollow` |

**Page-level robots settings (production build):**
- **15 indexable pages**, all in `sitemap.xml`.
- **Noindex/follow**, not in the sitemap: `/algemene-voorwaarden`, `/privacybeleid`, `/restitutiebeleid`, `/dmca` (legal drafts); `/reviews` (no genuine reviews yet); `/zenders/sport`, `/zenders/films-series`, `/zenders/kinderen-familie`, `/zenders/internationaal` (line-ups unverified).

## 8. Domain setup: hosting provider side (Vercel)

1. Create the project:
   - Import the repository, or deploy it with the Vercel CLI.
   - Framework: Next.js. Install command: `pnpm install --frozen-lockfile`. Build command: `pnpm build`.
2. Configure the build environment:
   - Set Node.js 22.x (§3).
   - Add `ENABLE_EXPERIMENTAL_COREPACK=1` (§4).
3. Under Project → Settings → **Domains**, add **both** `iptvabonnement.plus` and `www.iptvabonnement.plus`.
4. Set **`iptvabonnement.plus` as the primary domain**. Set `www.iptvabonnement.plus` to **"Redirect to" `iptvabonnement.plus`**. The canonical URLs, sitemap and structured data all use the non-www HTTPS form.
   - Vercel's documentation suggests www as primary, but says the reverse "also works". Keep non-www, because the whole site is built around it.
   - The app also has its own www → apex redirect as a safety net.
5. Note the **exact DNS values Vercel shows** on that Domains page:
   - an **A record** value for the apex;
   - a **CNAME** value for `www`.

   Vercel's documentation says these values are **project-specific** ("don't copy one from another project"). **Use the dashboard values, not values from any guide.**

## 9. Domain setup: Namecheap side

> **If you put Cloudflare in front of the site,** DNS moves to Cloudflare: in Namecheap you only change the **nameservers**, and the A/CNAME records are created in Cloudflare instead. Follow `CLOUDFLARE_CACHE_CONFIGURATION_GUIDE.md` §2 and skip the record steps below.

In Namecheap → Domain List → `iptvabonnement.plus` → **Manage → Advanced DNS** (keep Namecheap BasicDNS; no nameserver change is needed).

1. **Delete** the parking and redirect records:
   - the **URL Redirect Record** for host `@` (it is what answers on `192.64.119.221`);
   - the **CNAME** record `www` → `parkingpage.namecheap.com`.
2. **Add** the records from the hosting dashboard:

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | A Record | `@` | *A value shown by your host (§8 step 5)* | Automatic |
   | CNAME Record | `www` | *CNAME value shown by your host (§8 step 5)* | Automatic |

3. **Leave all other records alone**: MX, TXT (e.g. SPF/verification) and email forwarding, if any.
4. If you ever add **CAA** records, include `0 issue "letsencrypt.org"`, otherwise Vercel cannot issue the certificate (Vercel DNS docs).
5. **Wait for propagation.** Usually minutes; up to 48 h in rare cases. The host's Domains page turns "Valid" when it is done.

## 10. HTTPS / SSL

- **Vercel:** the certificate is provisioned automatically after DNS verification succeeds. Nothing to buy or upload. HTTP requests are redirected to HTTPS by the platform.
- **VPS:** Caddy obtains and renews Let's Encrypt certificates automatically. With Nginx, use certbot. Configure an HTTP → HTTPS redirect (301/308) at the proxy.
- **Do not** buy a separate SSL certificate from Namecheap for this setup; it is not needed.
- **Afterwards:** test with https://www.ssllabs.com/ssltest/. Optionally enable HSTS once everything is stable.

## 11. Rollback procedure

| Situation | Action |
|---|---|
| A new deployment is broken (Vercel) | Project → Deployments → pick the last good deployment → **Promote to Production / Instant Rollback** |
| A new deployment is broken (VPS) | Keep the previous release directory; switch the service or symlink back to it and restart |
| Wrong DNS change | Restore the previous records in Namecheap Advanced DNS (note them down **before** changing anything) |
| Code-level rollback | Restore from the backups next to the project (`Abonnement_backup_*` folders on the Desktop) |

## 12. VPS alternative (summary)

1. Server: an Ubuntu LTS VPS in the EU, Node.js 22 LTS, pnpm 11.23.0 via Corepack (`corepack enable`).
2. Install and build:
   - `pnpm install --frozen-lockfile && pnpm build`
   - then copy `public/` and `.next/static/` into `.next/standalone/` (§5).
3. Run `node .next/standalone/server.js` as a systemd service (or Docker). Use `PORT=3000` and `HOSTNAME=127.0.0.1` behind the proxy.
4. Reverse proxy:
   - Caddy: `iptvabonnement.plus, www.iptvabonnement.plus { reverse_proxy 127.0.0.1:3000 }`. Caddy handles HTTPS; the app redirects www.
5. Namecheap DNS:
   - `A @` → your VPS IPv4.
   - `CNAME www` → `iptvabonnement.plus.` (or `A www` → VPS IPv4).
6. Make sure `.next/cache` is writable, so the image-optimizer cache works.

## 13. Post-deployment verification

Run these after DNS is live. Expected results are given for each.

**Redirects**
```bash
curl -sI http://iptvabonnement.plus/                    # 301/308 -> https://iptvabonnement.plus/
curl -sI "https://www.iptvabonnement.plus/prijzen?x=1"  # 301/308 -> https://iptvabonnement.plus/prijzen?x=1 (path + query kept)
curl -sI https://iptvabonnement.plus/prijzen/           # 308 -> /prijzen
curl -sI https://iptvabonnement.plus/index              # 308 -> /
curl -sI https://iptvabonnement.plus/blog/pagina/1      # 308 -> /blog
curl -sI https://iptvabonnement.plus/bestaat-niet       # 404
```

**Production must NOT be noindex**
```bash
curl -sI https://iptvabonnement.plus/ | grep -i x-robots-tag                          # (no output)
curl -s  https://iptvabonnement.plus/ | grep -o '<meta name="robots"[^>]*>'             # index, follow
curl -s  https://iptvabonnement.plus/privacybeleid | grep -o '<meta name="robots"[^>]*>' # noindex, follow (draft)
curl -s  https://iptvabonnement.plus/robots.txt                                       # Allow: / ; Sitemap line
curl -s  https://iptvabonnement.plus/sitemap.xml | grep -c "<loc>"                     # 15
```

**A preview/staging URL MUST be noindex**
```bash
curl -sI https://<preview-url>/ | grep -i x-robots-tag   # X-Robots-Tag: noindex, nofollow
```

**Manual checks in a browser (desktop and phone)**
- Home, `/prijzen` (device toggles: €31/€40/€67, €53/€71/€98, €67/€99/€134), `/iptv-kopen`, `/installatie` (open the video: it should play), `/blog`, `/klantenservice`, `/reseller` (€269/€493/€673).
- With a WhatsApp number configured: every "WhatsApp"/"Bestellen"/"24 uur gratis" button opens WhatsApp. Without one: they lead to `/klantenservice`.

**External tools**
- https://search.google.com/test/rich-results on `/` and `/prijzen` (Product with 9 offers, only on `/prijzen`).
- SSL Labs.

**Google Search Console**
- Add a **Domain property**: verify it with a TXT record at Namecheap.
- Submit `https://iptvabonnement.plus/sitemap.xml`.
- Do this only **after** the owner information and legal pages are final (`LAUNCH_OWNER_ACTIONS.md`).

**Known edge case**
- `https://www.iptvabonnement.plus/prijzen/` (www **and** trailing slash) takes two redirects: trailing slash first, then www.
- Next.js normalises trailing slashes before custom redirects, so this cannot be reordered in the app.
- Nothing links to such URLs; on Vercel the domain-level www redirect usually handles www first.
