import Link from 'next/link';
import { Copyright } from 'lucide-react';
import { CONSTANTS, generateSEOMetadata, LEGAL_PAGES_FINAL } from '@/lib/seo';
import LegalPage from '../components/LegalPage';

const BRAND = CONSTANTS.BRAND_NAME;

export const metadata = generateSEOMetadata(
  'Auteursrecht en meldingen',
  `Hoe je bij ${BRAND} een melding doet van mogelijke inbreuk op auteursrecht of andere intellectuele-eigendomsrechten.`,
  '/dmca',
  { noindex: !LEGAL_PAGES_FINAL }
);

// The source project's DMCA page was written for US law (17 U.S.C. § 512) and
// asserted that the service "only indexes publicly available streams" and
// "hosts no content". Those statements could not be verified and were NOT
// carried over. This page only describes a neutral notice-and-takedown route.
export default function CopyrightPage() {
  return (
    <LegalPage
      path="/dmca"
      breadcrumbName="Auteursrecht"
      badge="Intellectueel eigendom"
      badgeIcon={Copyright}
      titleStart="Auteursrecht"
      titleAccent="& meldingen"
      intro={`${BRAND} respecteert de intellectuele-eigendomsrechten van anderen. Op deze pagina lees je hoe je een melding doet.`}
      missing={[
        'Een e-mailadres of formulier voor meldingen van rechthebbenden',
        'Statutaire naam en adres van de onderneming',
        'Juridische toetsing van de meldprocedure',
      ]}
      sections={[
        {
          heading: 'Melding van inbreuk',
          paragraphs: [
            'Ben je rechthebbende (of treed je namens een rechthebbende op) en meen je dat via onze dienst inbreuk wordt gemaakt op jouw rechten? Stuur ons dan een melding. Na ontvangst van een volledige melding beoordelen we deze en nemen we zo snel mogelijk passende maatregelen.',
          ],
        },
        {
          heading: 'Wat moet een melding bevatten?',
          bullets: [
            'je naam, adres, telefoonnummer en e-mailadres;',
            'een omschrijving van het werk waarop volgens jou inbreuk wordt gemaakt;',
            'een zo precies mogelijke omschrijving van waar de inbreuk plaatsvindt;',
            'een verklaring dat je te goeder trouw meent dat het gebruik niet is toegestaan door de rechthebbende of de wet;',
            'een verklaring dat de gegevens in je melding juist zijn en dat je bevoegd bent namens de rechthebbende op te treden.',
          ],
        },
        {
          heading: 'Herhaalde inbreuk',
          paragraphs: [
            'Gebruikers of resellers die herhaaldelijk inbreuk maken op rechten van anderen, kunnen we de toegang tot de dienst ontzeggen.',
          ],
        },
        {
          heading: 'Contact',
          contactCard: { label: 'Klantenservice', linkText: 'Neem contact op', href: '/klantenservice' },
          paragraphs: [
            <>
              Tot het meldadres beschikbaar is, kun je contact opnemen via onze{' '}
              <Link href="/klantenservice" className="text-[#39FF14] font-black hover:underline">
                klantenservice
              </Link>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
