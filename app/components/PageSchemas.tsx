// components/PageSchemas.tsx
import React from 'react';
import { CONSTANTS, webPageNode } from '@/lib/seo';
import { homeFaqs } from '@/lib/home-faqs';
import { PRICES, DEVICE_OPTIONS, PLAN_MONTHS, schemaPrice, deviceLabel, monthsLabel } from '@/lib/pricing';
import { faqPlainText } from '@/lib/faq-text';

const SITE_URL = CONSTANTS.SITE_URL;

// NOTE: The site-wide Organization and WebSite schemas are rendered once in
// app/layout.tsx. Do not add duplicates here.

// ---------------------------------------------------------------------------
// IPTV SUBSCRIPTION SERVICE (owner decision: Service, not Product)
// The subscription is an online digital service. It is represented as ONE
// Service provided by the Organization, with the 9 subscription plans
// (1/2/3 devices × 3/6/12 months, from lib/pricing.ts) as Offers in its
// OfferCatalog. There are deliberately no Product entities: the site is not a
// physical-product shop and is not marked up for shopping/Merchant features.
//
// Schema.org relationships used (all valid per schema.org definitions):
//   Service.hasOfferCatalog -> OfferCatalog (an ItemList)
//   OfferCatalog.itemListElement -> Offer (Offer is a Thing)
//   Offer.itemOffered -> Service, Offer.seller -> Organization,
//   Offer.eligibleRegion -> Country, Offer.availability -> ItemAvailability
//
// Rendered only on /prijzen (app/prijzen/layout.tsx), where every one of these
// prices is visible in the static comparison table. Only facts shown on the
// site are used: terms, device counts, live tv/films/series, the free
// player-app on 12-month plans, login details via WhatsApp after payment and
// installation help. No ratings/reviews, MerchantReturnPolicy, shippingDetails,
// priceValidUntil, location or physical-delivery properties: none is backed by
// a confirmed fact (refund policy is a draft; nothing is shipped; prices have
// no announced end date).
// ---------------------------------------------------------------------------
export const subscriptionService = () => {
  const pageUrl = `${SITE_URL}/prijzen`;
  const serviceId = `${SITE_URL}/#iptv-abonnement`;
  return {
    '@type': 'Service',
    '@id': serviceId,
    name: `${CONSTANTS.BRAND_NAME} IPTV abonnement`,
    serviceType: 'IPTV-abonnement (digitale streamingdienst)',
    description:
      'Digitaal IPTV abonnement voor live tv, films en series on demand, voor 3, 6 of 12 maanden op 1, 2 of 3 apparaten tegelijk. ' +
      'Na betaling ontvang je je inloggegevens via WhatsApp, waar je ook hulp krijgt bij de installatie.',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Nederland' },
    url: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IPTV abonnementen',
      itemListElement: DEVICE_OPTIONS.flatMap((devices) =>
        PLAN_MONTHS.map((months) => ({
          '@type': 'Offer',
          '@id': `${pageUrl}#abonnement-${months}m-${devices}`,
          name: `${monthsLabel(months)} – ${deviceLabel(devices)}`,
          description:
            `IPTV abonnement voor ${monthsLabel(months)} op ${deviceLabel(devices)} tegelijk` +
            (months === 12 ? ', inclusief gratis player-app' : '') +
            '. Na betaling ontvang je je inloggegevens via WhatsApp.',
          price: schemaPrice(PRICES[devices][months]),
          priceCurrency: CONSTANTS.CURRENCY,
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          eligibleRegion: { '@type': 'Country', name: 'NL' },
          seller: { '@id': `${SITE_URL}/#organization` },
          itemOffered: { '@id': serviceId },
        }))
      ),
    },
  };
};

// ---------------------------------------------------------------------------
// HOMEPAGE WEBPAGE SCHEMA
// Links the homepage to the WebSite/Organization and to its primary image
// (the site-wide share image, which is also the homepage og:image). No
// breadcrumb: the homepage is the breadcrumb root.
// ---------------------------------------------------------------------------
export function HomeWebPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    ...webPageNode(SITE_URL, { breadcrumb: false }),
    about: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      id="home-webpage-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// FAQ SCHEMA
// ---------------------------------------------------------------------------
export function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    // Built from the same data the visible homepage FAQ renders.
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqPlainText(faq.a),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      id="faq-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
