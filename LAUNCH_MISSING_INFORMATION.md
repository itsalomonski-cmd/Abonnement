# IPTVAbonnement: missing launch information

Prepared on 24 November 2026. Covers https://iptvabonnement.plus (Netherlands, Dutch).

This register lists every business, legal and contact detail the website needs and does not have yet. Nothing in it has been guessed or filled in. All values must come from you, and where marked, be checked by a legal adviser.

**How to use it**
- Fill in the "Value required from you" column, or send the answers in any format.
- Once the values arrive they can be placed in the code (mostly one file, `lib/seo.ts`, plus the legal pages).
- Until the legal items are complete and reviewed, the legal pages stay **noindex** and show their "Conceptversie" (draft) notice. Adding text alone does not make them indexable; that requires setting `LEGAL_PAGES_FINAL = true` in `lib/seo.ts`, which should only happen after legal review.

**Status key**
- **Missing**: not on the site.
- **Unverified**: on the site, but never confirmed by you.
- **Needs review**: present, but may conflict with law or the facts.

> The legal notes are pointers for a qualified Dutch legal adviser. They are not legal advice.

---

## 1. Required business information

| # | Field | Why it is needed | Where it is used | Current status | Value required from you | Legal review |
|---|---|---|---|---|---|---|
| 1.1 | Registered legal name and trade name(s) of the seller | Consumers must be able to identify who they contract with; the GDPR "controller" must be named. | All 4 legal pages; Organization structured data in `app/layout.tsx` (currently only the brand name); footer | Missing (listed in each page's draft notice) | Exact name as registered, plus any trade name ("handelsnaam") | Recommended |
| 1.2 | Legal form | Determines liability wording and which registrations apply. | Terms (`/algemene-voorwaarden`) | Missing | For example eenmanszaak, VOF or BV; or the foreign equivalent if not Dutch | Recommended |
| 1.3 | Country of establishment | Decides which consumer, VAT and registration rules apply. Everything else assumes a Dutch business, which is unconfirmed. | Terms, privacy policy, VAT handling | Missing | Country where the business is registered | **Necessary** if outside NL |
| 1.4 | KvK number (Dutch Chamber of Commerce) | Dutch businesses registered with the KvK must show their KvK number on their website. | Terms, refund policy, privacy policy, footer or contact page | Missing | 8-digit KvK number, or "not registered in NL" with the foreign registration | Recommended |
| 1.5 | VAT ID (btw-identificatienummer) | Must be shown when the business is VAT-registered; also needed for invoices. | Terms, footer or contact page | Missing | VAT ID, or confirmation that you use the small-business scheme (KOR) or are not VAT-registered | Recommended |
| 1.6 | Registered business address (geographic, not a P.O. box) | Distance-selling and e-commerce rules require a physical address. | Terms, refund policy, privacy policy, `/dmca`, contact page | Missing | Street, number, postcode, city, country | Recommended |
| 1.7 | Governing law and competent court | The terms say this "will be determined later". | `/algemene-voorwaarden`, section "Toepasselijk recht" | Missing (placeholder sentence) | Your choice, decided with your adviser (consumer protections cannot be removed by choice of law) | **Necessary** |

## 2. Required customer contact information

All contact values live in **`lib/seo.ts` → `CONSTANTS.CONTACT`** and **`CONSTANTS.SOCIALS`**. Until a value is set, the site hides that contact method, and every WhatsApp button sends visitors to `/klantenservice`, which honestly says WhatsApp is "nog niet beschikbaar".

| # | Field | Why it is needed | Where it is used | Current status | Value required from you | Legal review |
|---|---|---|---|---|---|---|
| 2.1 | Verified WhatsApp number | Ordering, the free trial, support and refund requests all depend on it. **Without it, customers currently have no way to order or contact you.** | `CONSTANTS.CONTACT.whatsappUrl` drives the following (verified 24 Nov: 30 WhatsApp-labelled links fall back to `/klantenservice`): order buttons and the free-trial button (`PricingSection`); hero and CTA buttons on `/`, `/iptv-kopen`, `/installatie`, `/reseller`, `/reviews`, `/zenders/*`, `/veelgestelde-vragen`, the blog pages and the blog sidebar; the contact-form handoff and chat button on `/klantenservice`; the floating chat widget (hidden until set); the refund-request link on `/restitutiebeleid` | Missing | Number in international format, digits only, which becomes `https://wa.me/<number>` (e.g. 316XXXXXXXX). Must be a number you control, with a WhatsApp Business account | No |
| 2.2 | Customer-service email address | E-commerce rules require an email address that allows quick, direct contact. Also needed for privacy requests, refund requests and copyright notices. | `CONSTANTS.CONTACT.email` → `/klantenservice` contact card (shown only when set); legal pages refer to "klantenservice" | Missing | An address on your own domain is recommended, e.g. info@ or support@iptvabonnement.plus (requires email hosting and MX records) | Recommended |
| 2.3 | Phone number (optional; shown as the WhatsApp label) | Optional contact route. | `CONSTANTS.CONTACT.phone` | Missing | Number or "none" | No |
| 2.4 | Support hours | Sets expectations; the current label is generic. | `CONSTANTS.CONTACT.supportHours` ("Klantenservice via WhatsApp") | Unverified | For example "ma–za 10:00–22:00", or confirm the current text | No |
| 2.5 | Privacy contact | GDPR requests need a contact point. | `/privacybeleid`, "Contact over privacy" | Missing | Email address (can equal 2.2) | Recommended |
| 2.6 | Copyright / notice-and-takedown contact | Rights holders need a reporting address. | `/dmca`, "Contact" | Missing | Email address (can equal 2.2) | Recommended |

## 3. Required commercial and subscription information

These statements are already on the site but were inherited from the template or earlier drafts. You must confirm each one, or tell me to change it.

| # | Field | Why it is needed | Where it is used | Current status | Value required from you | Legal review |
|---|---|---|---|---|---|---|
| 3.1 | Prices (1 device €31/€40/€67; 2 devices €53/€71/€98; 3 devices €67/€99/€134 for 3/6/12 months) | Must match what customers are charged. Verified identical in `lib/pricing.ts` and on `/prijzen`. | `lib/pricing.ts` → `/prijzen`, homepage, Product structured data | Matches your table | Confirm they are final | No |
| 3.2 | VAT included in the prices? | Consumer prices must include VAT. The site only says "Alle prijzen zijn in euro’s". | `/algemene-voorwaarden` ("Abonnementen, prijzen en betaling"); `/prijzen` | Missing | Yes (incl. VAT) / not VAT-registered / other | Recommended |
| 3.3 | Reseller packages (10 credits €269, 20 credits €493, 30 credits €673) and what one credit buys, plus its validity | Resellers need to know exactly what they buy. | `/reseller` | Prices match your table; credit definition and terms unverified | Definition of a credit, validity, reseller terms | Recommended (B2B terms) |
| 3.4 | Payment methods actually available | The site lists Mastercard, Visa, Bitcoin/crypto and PayPal. These must be real, active accounts that permit this product. | `CONSTANTS.PAYMENT_METHODS` (footer icons), `/algemene-voorwaarden` ("creditcard, PayPal of crypto") | Unverified | List of methods you actually accept, and how the customer pays (payment link? via WhatsApp?) | No |
| 3.5 | Ordering and payment flow | Consumers must receive the required information and confirmations before paying. Today the order buttons only open contact. | Pricing buttons → contact | Missing | Step-by-step description of how an order is placed, paid and confirmed (e.g. by email) | Recommended |
| 3.6 | Activation / delivery time | The terms only say "geactiveerd na bevestiging van je betaling". | `/algemene-voorwaarden` | Missing | For example "binnen X uur na betaling" | No |
| 3.7 | Renewal | The site states "Abonnementen worden niet automatisch verlengd". | `/algemene-voorwaarden` | Unverified | Confirm (no auto-renewal), or describe the renewal and cancellation terms | Recommended |
| 3.8 | 24-hour free trial | Promoted on almost every page. | Homepage, `/iptv-kopen`, `/installatie`, `/over-ons`, `/klantenservice`, blog, pricing | Unverified | Confirm the trial exists, plus its conditions (one per person? device? how requested?) | No |
| 3.9 | Service features | Stated as product features: "Live tv in Full HD en 4K (waar beschikbaar)", "7 dagen terugkijken en tv-gids (EPG)", device limits per plan, recommended speeds (15/30 Mbit/s). | `PricingSection`, `/over-ons`, `/installatie`, terms | Unverified | Confirm each, or say which to remove | No |
| 3.10 | Channel line-up | The `/zenders/*` pages are deliberately noindex because the line-up is not verified. | `lib/channels-data.ts` (`lineupVerified: false`) | Unverified | A verified channel list per category, if you want these pages indexed | No |
| 3.11 | Customer reviews | `/reviews` is noindex and shows no reviews because none are genuine yet. | `lib/reviews.ts` (empty) | Missing (correctly) | Genuine, verifiable reviews with permission, or leave empty | No |
| 3.12 | Minimum age 18 | Stated in the terms. | `/algemene-voorwaarden` | Unverified | Confirm | No |

## 4. Required legal documents and policies

The four legal pages exist as **drafts**: `/algemene-voorwaarden`, `/privacybeleid`, `/restitutiebeleid` and `/dmca`. Each shows a visible "Conceptversie" notice listing what is missing, is noindex/follow, and is excluded from the sitemap.

| # | Item | Why it matters | Where | Current status | What you must provide | Legal review |
|---|---|---|---|---|---|---|
| 4.1 | **Rights to the content offered (channel and streaming licences)** | The core legal question for an IPTV service. Under Dutch and EU copyright law, offering or selling access to TV channels, films or series without the rights holders' permission is infringement (see e.g. CJEU C‑527/15 *Filmspeler*, 2017); rights holders and BREIN enforce this actively in the Netherlands. It also determines whether payment providers and hosting providers will accept the service. | Whole site and service | Unknown: no information on content licences | Documentation of the licences or agreements under which the channels and on-demand content are offered | **Necessary** |
| 4.2 | Terms and conditions (algemene voorwaarden) | Contract terms consumers agree to. | `/algemene-voorwaarden` | Draft: company identity, governing law, VAT statement and legal check of the refund clauses missing | Items 1.1–1.7, 3.2–3.7, then a reviewed final text | **Necessary** |
| 4.3 | Right of withdrawal (herroepingsrecht) | Consumers normally have a 14-day withdrawal right for distance contracts. For digital services it can lapse only under specific conditions (express prior consent to start the service and acknowledgement that the right is lost), which must be built into the ordering process. The current policy says no refund if you "change your mind", which may conflict with this. A model withdrawal form is normally required. | `/restitutiebeleid`, `/algemene-voorwaarden` | Needs review | Decision with your adviser on the withdrawal procedure; the consent text for the order flow; a model withdrawal form | **Necessary** |
| 4.4 | Refund / quality guarantee ("7 dagen") | Statutory conformity rights (the service must work as promised) cannot be limited to 7 days or to "after 24 hours of troubleshooting". The refund processing time is "nog bevestigd". | `/restitutiebeleid` | Needs review | Final refund rules, processing time (refunds after withdrawal are normally due within 14 days), refund method | **Necessary** |
| 4.5 | Complaint procedure (klachtenregeling) | Consumers must be told how to complain and how complaints are handled. | Not present | Missing | How complaints are submitted, the response time, and any dispute body you are affiliated with. (The EU online dispute resolution platform was discontinued in July 2025; your adviser should confirm what disclosures still apply.) | Recommended |
| 4.6 | Notice-and-takedown page | The `/dmca` URL refers to US law; in the Netherlands this is usually called a notice-and-takedown (NTD) procedure. The page is a neutral draft. | `/dmca` | Draft: contact address and legal check missing | Items 2.6 and 1.1/1.6; decide whether to keep the `/dmca` URL | Recommended |
| 4.7 | Intellectual-property statement | The terms claim that the brands, logos, texts **and software** on the site belong to IPTVAbonnement. The site is derived from the Zyminex Plus project/template. If any of its code, design, images or posters come from third parties (template licences, stock images, film or series artwork), they are licensed, not owned, and the statement must reflect that. | `/algemene-voorwaarden`, "Intellectueel eigendom" | Needs review | Confirm what you own and what is licensed (template, images, artwork) | Recommended |
| 4.8 | Reseller (B2B) terms | Resellers buy credits for resale; consumer terms do not fit. | `/reseller` | Missing | Reseller conditions | Recommended |

## 5. Privacy and cookie information

| # | Item | Why it matters | Where | Current status | What you must provide | Legal review |
|---|---|---|---|---|---|---|
| 5.1 | Controller identity | The GDPR requires the controller's identity and contact details. | `/privacybeleid` | Missing | Items 1.1, 1.6, 2.5 | Recommended |
| 5.2 | Processors and third parties | The policy names only "betaaldienstverleners en WhatsApp". It does **not** mention the **hosting provider** (receives every visitor's IP address in server logs) or **YouTube/Google** (the installation video on `/installatie`). | `/privacybeleid`, "Diensten van derden" | Incomplete | Final hosting provider; payment providers by name; confirm WhatsApp (Meta) use; YouTube | Recommended |
| 5.3 | International transfers | WhatsApp (Meta), Google/YouTube and possibly the host process data outside the EEA. | `/privacybeleid` | Missing | Your adviser decides the wording, based on 5.2 | Recommended |
| 5.4 | Retention periods | The policy gives only a general description; "Bevestigde bewaartermijnen" is listed as missing. | `/privacybeleid` | Missing | Concrete periods (e.g. customer data X months after the subscription ends; invoices 7 years for tax) | Recommended |
| 5.5 | Cookie / storage statement | Says "Deze website plaatst geen tracking- of advertentiecookies". **Verified true for the site's own code**: no analytics, no ad scripts, no Google Fonts connection; one functional `sessionStorage` key is used, only when WhatsApp is configured. | `/privacybeleid` | Accurate for own code; see 5.6 | Keep the statement in sync if analytics or other tools are ever added (those need consent) | Recommended |
| 5.6 | **YouTube video** | The video uses the privacy-enhanced domain `youtube-nocookie.com` and loads only when the visitor clicks. In tests, opening it set **0 cookies** (the old youtube.com embed set 5, including the tracking cookie `VISITOR_INFO1_LIVE`). Even so, YouTube/Google receives the visitor's IP address when the player loads, and **may store data in the browser (local storage) when playback starts**. Dutch cookie rules (Telecommunicatiewet art. 11.7a) cover all such storage, not only cookies. The privacy policy does not mention YouTube. | `/installatie` video modal; `/privacybeleid` | Needs disclosure and review | Decision with your adviser: disclose only, or show a consent notice before loading the video (would be a small design addition, needs your approval) | Recommended |
| 5.7 | "De website gebruikt een versleutelde verbinding (HTTPS)" | **Not true today**: HTTPS on iptvabonnement.plus currently fails (see `DEPLOYMENT_GUIDE.md`). It becomes true after hosting and SSL are set up. | `/privacybeleid`, "Beveiliging" | Incorrect until launch | Nothing; resolved by the hosting/SSL setup | No |
| 5.8 | Contact form statement | "Het contactformulier ... verstuurt en bewaart zelf geen gegevens": **verified true** (24 Nov: no personal data in any request, nothing sent or stored, text kept in the form). | `/privacybeleid`, `/klantenservice` | Accurate | Nothing | No |

## 6. Optional information

| # | Field | Where it would be used | Current status |
|---|---|---|---|
| 6.1 | Official social media profiles (Instagram, Facebook, X) | `CONSTANTS.SOCIALS` → footer icons and the Organization `sameAs` structured data (both render only when set) | Empty (correctly) |
| 6.2 | Company story / facts for `/over-ons` | About page (kept factual and generic so far) | Generic |
| 6.3 | Logo confirmation | `public/img/iptvabonnement-logo.png` in structured data and Open Graph | Confirm it is final and that you hold the rights to it |
| 6.4 | Google Search Console access | Sitemap submission and indexing monitoring after launch (needs a DNS TXT record at Namecheap) | Not set up |
| 6.5 | Analytics (if wanted) | Not present. Adding it requires a consent mechanism and a privacy-policy update | None (deliberately) |
| 6.6 | Email hosting for the domain | Needed if 2.2 uses an @iptvabonnement.plus address (MX/SPF/DKIM records at Namecheap) | None observed |
