// app/reseller/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata } from '@/lib/seo';
import { resellerFaqs } from '@/lib/page-faqs';
import { RESELLER_PRICES, formatEUR, schemaPrice } from '@/lib/pricing';
import { faqPlainText } from '@/lib/faq-text';

const BRAND = CONSTANTS.BRAND_NAME;
const PATH = '/reseller';
const PAGE_URL = absoluteUrl(PATH);

export const metadata: Metadata = generateSEOMetadata(
  `IPTV reseller worden – pakketten vanaf ${formatEUR(RESELLER_PRICES.starter.price)}`,
  `Word IPTV reseller bij ${BRAND}: koop 10, 20 of 30 credits, activeer abonnementen voor je eigen klanten en bepaal zelf je verkoopprijs.`,
  PATH
);

const ResellerSchema = () => {
  const packages = [
    { name: 'Starter', ...RESELLER_PRICES.starter },
    { name: 'Growth', ...RESELLER_PRICES.growth },
    { name: 'Pro', ...RESELLER_PRICES.pro },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${PAGE_URL}#service`,
        name: `${BRAND} resellerprogramma`,
        serviceType: 'IPTV-resellerprogramma',
        provider: { '@id': `${CONSTANTS.SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Nederland' },
        url: PAGE_URL,
        offers: packages.map((p) => ({
          '@type': 'Offer',
          name: `${p.name} – ${p.credits} credits`,
          price: schemaPrice(p.price),
          priceCurrency: CONSTANTS.CURRENCY,
          url: `${PAGE_URL}#pakketten`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: resellerFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faqPlainText(faq.a) },
        })),
      },
      { ...breadcrumbSchema([{ name: 'Resellerprogramma', path: PATH }]), '@id': `${PAGE_URL}#breadcrumb` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="reseller-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function ResellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResellerSchema />
      {children}
    </>
  );
}
