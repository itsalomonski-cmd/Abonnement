// app/prijzen/layout.tsx
import type { Metadata } from 'next';
import { absoluteUrl, breadcrumbSchema, generateSEOMetadata, webPageNode } from '@/lib/seo';
import { pricingFaqs } from '@/lib/page-faqs';
import { subscriptionService } from '../components/PageSchemas';
import { faqPlainText } from '@/lib/faq-text';

const PATH = '/prijzen';
const PAGE_URL = absoluteUrl(PATH);

// Target intent: price comparison / "goedkoop IPTV abonnement".
export const metadata: Metadata = generateSEOMetadata(
  `IPTV Abonnement Prijzen: Vanaf € 31 + 24 Uur Gratis Test`,
  `Wat kost een IPTV abonnement? Bekijk pakketten voor 3, 6 of 12 maanden (1–3 apparaten) vanaf € 31. Eerst 24 uur gratis testen!`,
  PATH
);

const PricingPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // The subscription as an online Service; the 9 plans are Offers in its
      // OfferCatalog (see subscriptionService in PageSchemas.tsx).
      subscriptionService(),
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
      webPageNode(PAGE_URL),
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
