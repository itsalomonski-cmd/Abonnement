// components/PageSchemas.tsx
import React from 'react';
import { CONSTANTS } from '@/lib/seo';
import { homeFaqs } from '@/lib/home-faqs';
import { PRICES, DEVICE_OPTIONS, PLAN_MONTHS, schemaPrice, deviceLabel } from '@/lib/pricing';
import { faqPlainText } from '@/lib/faq-text';

const SITE_URL = CONSTANTS.SITE_URL;

// NOTE: The site-wide Organization and WebSite schemas are rendered once in
// app/layout.tsx. Do not add duplicates here.

/** One Offer per plan (1/2/3 devices × 3/6/12 months), built from lib/pricing.ts. */
export const planOffers = () =>
  DEVICE_OPTIONS.flatMap((devices) =>
    PLAN_MONTHS.map((months) => ({
      '@type': 'Offer',
      name: `${months} maanden – ${deviceLabel(devices)}`,
      price: schemaPrice(PRICES[devices][months]),
      priceCurrency: CONSTANTS.CURRENCY,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/prijzen`,
      eligibleRegion: { '@type': 'Country', name: 'NL' },
    }))
  );

// ---------------------------------------------------------------------------
// PRODUCT SCHEMA
// The single Product entity (with all 9 plan offers) lives on /prijzen
// (app/prijzen/layout.tsx), the only page where every offered price is
// visible. It is intentionally NOT rendered on the homepage, which only shows
// the 1-device prices by default. No ratings/reviews (none are verified) and
// no MerchantReturnPolicy / shippingDetails (refund policy not confirmed;
// shipping does not apply to a digital service).
// ---------------------------------------------------------------------------

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
