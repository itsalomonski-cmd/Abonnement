// app/iptv-kopen/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata } from '@/lib/seo';
import { buyFaqs } from '@/lib/page-faqs';
import { faqPlainText } from '@/lib/faq-text';

const PATH = '/iptv-kopen';
const PAGE_URL = absoluteUrl(PATH);
const TITLE = 'IPTV Kopen in Nederland: Zo Werkt Het | IPTVAbonnement';
const DESCRIPTION =
  'IPTV kopen in Nederland? Eerst 24 uur gratis testen, kies je pakket, betaal en start direct op je Smart TV of Fire Stick.';

// Target intent: buying process — "IPTV kopen", "IPTV kopen Nederland",
// "IPTV abonnement kopen". Price comparison lives on /prijzen.
export const metadata: Metadata = generateSEOMetadata(TITLE, DESCRIPTION, PATH);

const BuyPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `${TITLE} | ${CONSTANTS.BRAND_NAME}`,
        description: DESCRIPTION,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${CONSTANTS.SITE_URL}/#website` },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      },
      { ...breadcrumbSchema([{ name: 'IPTV kopen', path: PATH }]), '@id': `${PAGE_URL}#breadcrumb` },
      {
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'Een IPTV abonnement kopen',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Kies je abonnement', text: 'Kies het aantal apparaten (1, 2 of 3) en de looptijd (3, 6 of 12 maanden).' },
          { '@type': 'HowToStep', position: 2, name: 'Ontvang je inloggegevens', text: 'Na betaling ontvang je via WhatsApp je Xtream Codes-gegevens.' },
          { '@type': 'HowToStep', position: 3, name: 'Inloggen en kijken', text: 'Vul je gegevens in een IPTV-app in; de zenderlijst laadt automatisch.' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: buyFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faqPlainText(faq.a) },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="buy-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BuyPageSchema />
      {children}
    </>
  );
}
