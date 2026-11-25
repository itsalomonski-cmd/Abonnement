// components/PageSchemas.tsx
import React from 'react';
import { CONSTANTS } from '@/lib/seo';
import { homeFaqs } from '@/lib/home-faqs';
import { PRICES, DEVICE_OPTIONS, PLAN_MONTHS, schemaPrice, deviceLabel, monthsLabel } from '@/lib/pricing';
import { faqPlainText } from '@/lib/faq-text';

const SITE_URL = CONSTANTS.SITE_URL;

// NOTE: The site-wide Organization and WebSite schemas are rendered once in
// app/layout.tsx. Do not add duplicates here.

// ---------------------------------------------------------------------------
// PRODUCT SCHEMA
// One Product per plan (1/2/3 devices × 3/6/12 months), each with exactly ONE
// Offer, built from lib/pricing.ts. A single Product carrying 9 Offers with
// different prices is read by Google Merchant listings as one item with
// conflicting prices; each plan is a distinct purchasable product with its
// own price, so it gets its own Product entity.
//
// Rendered only on /prijzen (app/prijzen/layout.tsx), where every one of these
// prices is visible in the static comparison table. No ratings/reviews,
// MerchantReturnPolicy, shippingDetails or priceValidUntil: none of those is
// backed by a confirmed fact (refund policy is a draft; nothing is shipped;
// prices have no announced end date). Add them only once they are real.
//
// DIGITAL SERVICE: each plan is a digital subscription, delivered as login
// details via WhatsApp after payment (stated on /prijzen and /iptv-kopen).
// That is expressed in the description and in additionalProperty, never with
// physical shipping/tracking fields. Every statement below is visible on the
// site: the pricing-card features, the free player-app on 12-month plans
// (PricingSection) and the delivery sentence on /prijzen.
// ---------------------------------------------------------------------------
const DIGITAL_DELIVERY = 'Digitaal: inloggegevens via WhatsApp na betaling';

export const planProducts = () => {
  const pageUrl = `${SITE_URL}/prijzen`;
  const image = `${SITE_URL}${CONSTANTS.OG_IMAGE.url}`;
  return DEVICE_OPTIONS.flatMap((devices) =>
    PLAN_MONTHS.map((months) => ({
      '@type': 'Product',
      '@id': `${pageUrl}#abonnement-${months}m-${devices}`,
      name: `${CONSTANTS.BRAND_NAME} IPTV abonnement – ${monthsLabel(months)}, ${deviceLabel(devices)}`,
      description:
        `Digitaal IPTV abonnement van ${CONSTANTS.BRAND_NAME} voor ${monthsLabel(months)} op ` +
        `${deviceLabel(devices)} tegelijk, met live tv, films en series on demand. ` +
        (months === 12 ? 'Inclusief gratis player-app. ' : '') +
        'Na betaling ontvang je je inloggegevens via WhatsApp; er wordt niets fysiek verzonden.',
      url: pageUrl,
      image,
      brand: { '@type': 'Brand', '@id': `${SITE_URL}/#brand`, name: CONSTANTS.BRAND_NAME },
      category: 'Digitale streamingdienst',
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Looptijd', value: months, unitCode: 'MON', unitText: 'maanden' },
        { '@type': 'PropertyValue', name: 'Apparaten tegelijk', value: devices },
        { '@type': 'PropertyValue', name: 'Levering', value: DIGITAL_DELIVERY },
      ],
      offers: {
        '@type': 'Offer',
        price: schemaPrice(PRICES[devices][months]),
        priceCurrency: CONSTANTS.CURRENCY,
        availability: 'https://schema.org/InStock',
        url: pageUrl,
        eligibleRegion: { '@type': 'Country', name: 'NL' },
        seller: { '@id': `${SITE_URL}/#organization` },
      },
    }))
  );
};

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
