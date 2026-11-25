// lib/seo.ts
import { Metadata } from 'next';

// ---------------------------------------------------------------------------
// CORE BRAND & DOMAIN CONFIGURATION (NEDERLAND)
// ---------------------------------------------------------------------------
const DOMAIN = 'iptvabonnement.plus';
const BRAND_NAME = 'IPTVAbonnement';
const SITE_URL = `https://${DOMAIN}`;

// Focus keywords. Each page targets its own keyword (see the keyword map in
// the migration report); this is only the site-wide primary term.
const FOCUS_KEYWORD = 'IPTV abonnement';

const LOCALE = 'nl_NL';
const LANGUAGE = 'nl-NL';
const ADDRESS_COUNTRY = 'NL';
const CURRENCY = 'EUR';

// Stable Organization @id used to link brand entities across JSON-LD blocks
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Social-share and brand images that exist in /public, with their real pixel
// dimensions.
const OG_IMAGE = {
  url: `/img/og-image.jpg`,
  width: 1200,
  height: 630,
  type: 'image/jpeg',
} as const;

const LOGO_IMAGE = {
  url: `/img/iptvabonnement-logo.png`,
  width: 600,
  height: 120,
} as const;

// ---------------------------------------------------------------------------
// EXPORTED CONSTANTS
// ---------------------------------------------------------------------------
export const CONSTANTS = {
  DOMAIN,
  BRAND_NAME,
  SITE_URL,
  FOCUS_KEYWORD,

  LOCALE,
  LANGUAGE,
  ADDRESS_COUNTRY,
  CURRENCY,
  ORGANIZATION_ID,
  OG_IMAGE,
  LOGO_IMAGE,

  // Business contact details.
  // ⚠️ OWNER INPUT REQUIRED: no IPTVAbonnement mailbox or phone number has
  // been confirmed yet, so both stay empty and the UI hides them.
  //
  // whatsappUrl: the WhatsApp destination of the original template,
  // https://support-tv.online, restored at the owner's explicit instruction
  // (24 Nov 2026). Checked 24 Nov 2026: it 302-redirects to
  // https://wa.me/212723870095/ and forwards the `?text=` query, so prefilled
  // order messages arrive intact. The redirect is controlled by whoever runs
  // that domain: if it ever stops working, replace it with the direct
  // https://wa.me/<number> link. Only those two forms are accepted by
  // WHATSAPP_AVAILABLE below.
  CONTACT: {
    email: '', // ⚠️ Add a verified IPTVAbonnement email address
    phone: '', // ⚠️ Add a verified phone number
    whatsappUrl: 'https://support-tv.online',
    supportHours: 'Klantenservice via WhatsApp',
  },

  // Social media profiles (Footer only renders non-empty URLs).
  SOCIALS: {
    twitter: '',
    instagram: '',
    facebook: '',
  } as { twitter: string; instagram: string; facebook: string },

  // Payment methods as listed by the existing site. iDEAL / Bancontact are
  // NOT listed because their availability has not been confirmed.
  PAYMENT_METHODS: [
    { name: 'Mastercard', icon: '/img/payment/1.png' },
    { name: 'Visa', icon: '/img/payment/2.png' },
    { name: 'Bitcoin & crypto', icon: '/img/payment/3.png' },
    { name: 'PayPal', icon: '/img/payment/4.png' },
  ],
};

// ---------------------------------------------------------------------------
// WHATSAPP CTA DESTINATION
// Every WhatsApp button on the site goes through whatsappUrl(). Accepted
// destinations: a direct https://wa.me/<number> link, or the owner-approved
// redirect https://support-tv.online (see CONSTANTS.CONTACT). Any other value
// makes all WhatsApp buttons lead to the customer-service page instead of to
// an unverified destination.
//
// `message` is URL-encoded here. Site-generated texts (e.g. "Ik wil graag het
// abonnement van 3 maanden") are passed everywhere. The one exception is the
// floating WhatsApp widget, which prefills the visitor's own typed message at
// the owner's request (24 Nov 2026); that text then passes through the
// destination's redirect. The /klantenservice contact form still keeps typed
// text out of URLs: see lib/whatsapp-handoff.ts.
// ---------------------------------------------------------------------------
export const WHATSAPP_AVAILABLE = /^https:\/\/(wa\.me\/\d{8,15}|support-tv\.online)$/.test(
  CONSTANTS.CONTACT.whatsappUrl
);

/** Page that explains the contact options while WhatsApp is not configured. */
export const CONTACT_FALLBACK_PATH = '/klantenservice';

export const whatsappUrl = (message?: string): string => {
  if (!WHATSAPP_AVAILABLE) return CONTACT_FALLBACK_PATH;
  const base = CONSTANTS.CONTACT.whatsappUrl;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/**
 * `target` for WhatsApp links: a new tab for the real WhatsApp chat, but the
 * same tab while links fall back to the internal customer-service page.
 */
export const WHATSAPP_LINK_TARGET: '_blank' | undefined = WHATSAPP_AVAILABLE ? '_blank' : undefined;

/** The free 24-hour trial is requested over WhatsApp everywhere on the site. */
export const FREE_TRIAL_WHATSAPP_URL = whatsappUrl(
  'Hallo! Ik wil graag de gratis proefperiode van 24 uur proberen.'
);

// ---------------------------------------------------------------------------
// LEGAL PAGES — INDEXING GATE
// The legal pages are drafts: company name, address, KvK/VAT number, contact
// e-mail, governing law and the refund/withdrawal terms are still missing and
// the texts have not been legally reviewed. Until that is done they stay
// reachable for visitors (footer links, with a visible draft notice) but are
// noindex and left out of the sitemap. Set to true only after the owner has
// supplied the missing details and the texts have been reviewed.
// ---------------------------------------------------------------------------
export const LEGAL_PAGES_FINAL = false;

export const LEGAL_PATHS = ['/algemene-voorwaarden', '/privacybeleid', '/restitutiebeleid', '/dmca'] as const;

/** Absolute URL on the canonical domain for a site path. */
export const absoluteUrl = (path: string = '/') =>
  path === '/' || path === '' ? SITE_URL : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// ---------------------------------------------------------------------------
// SEO METADATA GENERATOR
// ---------------------------------------------------------------------------
export const generateSEOMetadata = (
  pageName: string,
  description?: string,
  path: string = '/',
  options: { noindex?: boolean } = {}
): Metadata => {
  const defaultDescription =
    description ||
    `${BRAND_NAME}: een IPTV abonnement voor Nederland met live tv, films en series op je Smart TV, Firestick, telefoon of tablet. Hulp bij installatie via WhatsApp.`;

  // "{Page} | IPTVAbonnement"; a page name that already contains the brand is
  // used as-is. Returned as an absolute title so the root layout's template is
  // not appended a second time.
  const formattedTitle = pageName;
  const canonical = absoluteUrl(path);
  const index = !options.noindex;

  return {
    title: { absolute: formattedTitle },
    description: defaultDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        'nl-NL': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      title: formattedTitle,
      description: defaultDescription,
      url: canonical,
      siteName: BRAND_NAME,
      locale: LOCALE,
      type: 'website',
      images: [{ ...OG_IMAGE, alt: `${BRAND_NAME} logo met de tekst “Jouw IPTV abonnement in Nederland”` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: defaultDescription,
      images: [OG_IMAGE.url],
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: BRAND_NAME, url: SITE_URL }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    applicationName: BRAND_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};

/** BreadcrumbList JSON-LD for a page. `trail` excludes the homepage. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/**
 * `primaryImageOfPage` reference for pages whose og:image is the site-wide
 * share image (CONSTANTS.OG_IMAGE). It points at the ImageObject
 * `${SITE_URL}/#primaryimage` declared once in the Organization schema
 * (app/layout.tsx), which is rendered on every page. Pages with their own
 * image (blog articles) declare their own ImageObject instead.
 */
export const SITE_PRIMARY_IMAGE_REF = { '@id': `${SITE_URL}/#primaryimage` } as const;

/**
 * Minimal WebPage node for pages whose main schema entity is something else
 * (Product, Service, HowTo, FAQ). No name/description on purpose: those stay
 * defined only by the page's meta title and description.
 */
export const webPageNode = (pageUrl: string, { breadcrumb = true }: { breadcrumb?: boolean } = {}) => ({
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  inLanguage: LANGUAGE,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  ...(breadcrumb ? { breadcrumb: { '@id': `${pageUrl}#breadcrumb` } } : {}),
  primaryImageOfPage: SITE_PRIMARY_IMAGE_REF,
});
