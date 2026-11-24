// app/prijzen/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata } from '@/lib/seo';
import { pricingFaqs } from '@/lib/page-faqs';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import { planOffers } from '../components/PageSchemas';
import { faqPlainText } from '@/lib/faq-text';

const BRAND = CONSTANTS.BRAND_NAME;
const PATH = '/prijzen';
const PAGE_URL = absoluteUrl(PATH);

// Target intent: price comparison / "goedkoop IPTV abonnement".
export const metadata: Metadata = generateSEOMetadata(
  `IPTV abonnement prijzen – vanaf ${formatEUR(LOWEST_PRICE)}`,
  `Wat kost een IPTV abonnement? Alle prijzen voor 3, 6 of 12 maanden op 1, 2 of 3 apparaten, vanaf ${formatEUR(LOWEST_PRICE)}. Hoe langer de looptijd, hoe goedkoper per maand.`,
  PATH
);

const PricingPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${PAGE_URL}#product`,
        name: `${BRAND} IPTV abonnement`,
        url: PAGE_URL,
        image: absoluteUrl(CONSTANTS.OG_IMAGE.url),
        description: `IPTV abonnementen van ${BRAND} voor 3, 6 of 12 maanden op 1, 2 of 3 apparaten, vanaf ${formatEUR(LOWEST_PRICE)}.`,
        brand: { '@type': 'Brand', '@id': `${CONSTANTS.SITE_URL}/#brand`, name: BRAND },
        category: 'Streamingdienst',
        offers: planOffers(),
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: pricingFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faqPlainText(faq.a) },
        })),
      },
      { ...breadcrumbSchema([{ name: 'Prijzen', path: PATH }]), '@id': `${PAGE_URL}#breadcrumb` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="pricing-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[#09090B] text-[#F8FAFC]">
      <PricingPageSchema />
      {/* div, not <main>: the root layout already provides the single <main> landmark */}
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}
