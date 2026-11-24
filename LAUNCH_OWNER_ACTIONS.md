# IPTVAbonnement: actions only you can take

Short checklist. Details are in `LAUNCH_MISSING_INFORMATION.md` (what) and `DEPLOYMENT_GUIDE.md` (how).

## Right now (this computer)
- [ ] **Free disk space on C:.** On 24 Nov it hovered between 0 and ~500 MB free.
  - Windows Storage Sense is deleting temporary files automatically because of it.
  - Your dev server failed to write its files: pages load, but buttons and menus do not work at `localhost:3000`.
  - Aim for at least 10 GB free.
- [ ] **Restart the dev server** once space is free: in its terminal press `Ctrl+C`, then run `pnpm dev`.
  - The current instance was started by Claude in an earlier session and is not interactive.
  - Optional: delete the folder `.next` inside the project before restarting. It is a rebuildable cache.

## 1. Decide and confirm (send the answers in any format)
- [ ] **Content rights:** confirm under which licences/agreements the channels and on-demand content are offered (item 4.1). This decides whether launch is lawful, and whether payment and hosting providers will accept the service.
- [ ] **Business identity:** registered name, legal form, country, KvK number, VAT ID, business address (items 1.1–1.6).
- [ ] **Contact details:**
  - verified WhatsApp number (item 2.1; without it nobody can order);
  - customer-service email (2.2);
  - optional phone, support hours, social profiles.
- [ ] **Commercial terms:**
  - are prices incl. VAT?
  - which payment methods really exist, and how does payment happen?
  - activation time;
  - renewal;
  - the 24 h trial conditions;
  - service features (4K, 7-day catch-up, EPG, device limits);
  - what a reseller credit is (items 3.2–3.12).
- [ ] **Ownership:** confirm the logo, design and images/posters are yours or licensed (items 4.7, 6.3).

## 2. Legal review (by a Dutch legal adviser)
- [ ] Terms and conditions: governing law, consumer rules.
- [ ] Right of withdrawal (14 days) and refund policy, plus the consent wording for the order process.
- [ ] Complaint procedure.
- [ ] Privacy policy: hosting provider, payment providers, WhatsApp, YouTube, international transfers, retention periods.
- [ ] YouTube video: is disclosure enough, or is consent needed before it loads (item 5.6)?
- [ ] Notice-and-takedown page (`/dmca`).
- [ ] When approved: Claude places the texts, then `LEGAL_PAGES_FINAL` is set to `true` so they become indexable.

## 3. Hosting (DEPLOYMENT_GUIDE.md §2–§8)
- [ ] Choose the host. Recommended: **Vercel**; check its terms for commercial use and for your content.
- [ ] Create the account and project, set Node.js 22.x, add `ENABLE_EXPERIMENTAL_COREPACK=1`, deploy.
- [ ] Add the domains `iptvabonnement.plus` (primary) and `www.iptvabonnement.plus` (redirect to primary).
- [ ] Copy the **exact A and CNAME values** the host shows.

## 4. Namecheap DNS (DEPLOYMENT_GUIDE.md §9)
- [ ] Note down the current records first (for rollback).
- [ ] Delete the URL Redirect record on `@` and the `www` CNAME → `parkingpage.namecheap.com`.
- [ ] Add `A @` → host value and `CNAME www` → host value. Leave MX/TXT records alone.

## 5. HTTPS
- [ ] Wait until the host shows the domains as "Valid" with a certificate.
- [ ] Open `https://iptvabonnement.plus` and check that the padlock is shown.

## 6. Final launch verification (DEPLOYMENT_GUIDE.md §13)
- [ ] Run the curl checks: redirects, 404, no `X-Robots-Tag` on production, sitemap has 15 URLs.
- [ ] Click through the site on a phone and a computer; play the installation video once.
- [ ] Search Console: add a Domain property (TXT record at Namecheap), then submit the sitemap. Do this only after steps 1–2 are done.
