// app/reseller/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata, webPageNode } from '@/lib/seo';
import { resellerFaqs } from '@/lib/page-faqs';
import { RESELLER_PRICES, formatEUR, schemaPrice } from '@/lib/pricing';
import { faqPlainText } from '@/lib/faq-text';

const BRAND = CONSTANTS.BRAND_NAME;
const PATH = '/reseller';
const PAGE_URL = absoluteUrl(PATH);

export const metadata: Metadata = generateSEOMetadata(
  `IPTV Reseller Worden: Vanaf € 269 | IPTVAbonnement`,
  `Word IPTV reseller bij IPTVAbonnement: 10, 20 of 30 credits, eigen prijzen bepalen en direct klanten activeren.`,
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
        // Digital service: credits are used in the online reseller panel to
        // activate subscriptions; nothing is shipped. Wording as on /reseller.
        description: `Resellerprogramma van ${BRAND}: koop resellercredits en activeer via het resellerpanel direct digitale IPTV abonnementen voor je eigen klanten. Er wordt niets fysiek verzonden.`,
        provider: { '@id': `${CONSTANTS.SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Nederland' },
        url: PAGE_URL,
        offers: packages.map((p) => ({
          '@type': 'Offer',
          name: `${p.name} – ${p.credits} credits`,
          description: `${p.credits} resellercredits (${p.credits} jaar), digitaal te gebruiken in het resellerpanel.`,
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
      webPageNode(PAGE_URL),
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
