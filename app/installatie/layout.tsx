// app/installatie/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata, webPageNode } from '@/lib/seo';
import { setupFaqs } from '@/lib/page-faqs';
import { faqPlainText } from '@/lib/faq-text';

const PATH = '/installatie';
const PAGE_URL = absoluteUrl(PATH);
// Wording matches the H1 ("IPTV installeren stap voor stap") and page text.
const TITLE = 'IPTV Installeren: Stap voor Stap per Apparaat | IPTVAbonnement';
const DESCRIPTION =
  'IPTV installeren op Smart TV, Fire Stick, Apple TV, iPhone of pc? Volg de handleiding met IPTV Smarters Pro of vraag hulp via WhatsApp.';

export const metadata: Metadata = generateSEOMetadata(TITLE, DESCRIPTION, PATH);

const SetupSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'IPTV installeren op je apparaat',
        description: DESCRIPTION,
        inLanguage: CONSTANTS.LANGUAGE,
        totalTime: 'PT10M',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Kies je abonnement', text: 'Kies 3, 6 of 12 maanden voor 1, 2 of 3 apparaten.', url: `${PAGE_URL}#stappen` },
          { '@type': 'HowToStep', position: 2, name: 'Stuur ons een bericht via WhatsApp', text: 'Bevestig je keuze en ontvang de betaalinstructies.', url: `${PAGE_URL}#stappen` },
          { '@type': 'HowToStep', position: 3, name: 'Installeer IPTV Smarters Pro', text: 'Installeer bijvoorbeeld IPTV Smarters Pro op je apparaat.', url: `${PAGE_URL}#stappen` },
          { '@type': 'HowToStep', position: 4, name: 'Kies je installatiemethode', text: 'Laat ons op afstand activeren of vul zelf je M3U- of Xtream Codes-gegevens in.', url: `${PAGE_URL}#stappen` },
          { '@type': 'HowToStep', position: 5, name: 'Inhoud laden (1 à 2 minuten)', text: 'Wacht 1 à 2 minuten tot zenders en tv-gids zijn geladen.', url: `${PAGE_URL}#stappen` },
          { '@type': 'HowToStep', position: 6, name: 'Klaar: kijken maar!', text: 'Je kunt nu live tv, films en series kijken.', url: `${PAGE_URL}#stappen` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: setupFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faqPlainText(faq.a) },
        })),
      },
      { ...breadcrumbSchema([{ name: 'Installatie', path: PATH }]), '@id': `${PAGE_URL}#breadcrumb` },
      webPageNode(PAGE_URL),
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="setup-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetupSchema />
      {children}
    </>
  );
}
