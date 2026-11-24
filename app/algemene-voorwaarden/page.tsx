import Link from 'next/link';
import { Scale, Ban, RefreshCw } from 'lucide-react';
import { CONSTANTS, generateSEOMetadata, LEGAL_PAGES_FINAL } from '@/lib/seo';
import LegalPage from '../components/LegalPage';

const BRAND = CONSTANTS.BRAND_NAME;

export const metadata = generateSEOMetadata(
  'Algemene voorwaarden',
  `De algemene voorwaarden van ${BRAND}: afspraken over abonnementen, betalen, gebruik van de dienst en de kwaliteitsgarantie.`,
  '/algemene-voorwaarden',
  { noindex: !LEGAL_PAGES_FINAL }
);

// Adapted from the source project's Terms. The source applied the law of the
// State of Delaware (US); that clause was NOT carried over. Governing law,
// competent court and company identification must be supplied by the owner.
export default function TermsPage() {
  return (
    <LegalPage
      path="/algemene-voorwaarden"
      breadcrumbName="Algemene voorwaarden"
      badge="Juridisch"
      badgeIcon={Scale}
      titleStart="Algemene"
      titleAccent="voorwaarden"
      intro={`Lees deze voorwaarden goed voordat je een abonnement van ${BRAND} afneemt of de website gebruikt.`}
      missing={[
        'Statutaire naam, vestigingsadres en KvK-nummer van de onderneming',
        'Btw-identificatienummer',
        'Toepasselijk recht en bevoegde rechter',
        'Een e-mailadres voor juridische vragen',
        'Toetsing van de herroepings- en restitutieregeling aan het Nederlandse consumentenrecht',
      ]}
      highlight={{
        label: 'Aanvaarding:',
        text: `Door een abonnement af te nemen of de website en diensten van ${BRAND} te gebruiken, ga je akkoord met deze algemene voorwaarden en met ons privacybeleid.`,
      }}
      sections={[
        {
          heading: 'Omschrijving van de dienst',
          paragraphs: [
            `${BRAND} levert een digitale IPTV-dienst waarmee abonnees via internet toegang krijgen tot live tv, films en series on demand. De dienst is uitsluitend bedoeld voor persoonlijk, niet-commercieel gebruik binnen het eigen huishouden.`,
          ],
        },
        {
          heading: 'Wie mag de dienst gebruiken',
          paragraphs: ['Door gebruik te maken van de dienst verklaar je dat:'],
          bullets: [
            'je minimaal 18 jaar oud bent en bevoegd bent een overeenkomst aan te gaan;',
            'je juiste en actuele gegevens verstrekt;',
            'je je inloggegevens en afspeellijstlinks geheimhoudt en niet doorverkoopt;',
            'je de dienst niet gebruikt voor commerciële doorgifte of openbare vertoning;',
            'je beschikt over een geschikte internetverbinding (wij adviseren minimaal 30 Mbit/s voor 4K).',
          ],
          note: { label: 'Accountbeveiliging:', text: 'Je bent zelf verantwoordelijk voor al het gebruik van je account en inloggegevens.' },
        },
        {
          heading: 'Abonnementen, prijzen en betaling',
          paragraphs: [
            <>
              De actuele abonnementen en prijzen staan op de{' '}
              <Link href="/prijzen" className="text-[#39FF14] font-black hover:underline">
                prijzenpagina
              </Link>
              . Bij aankoop geldt het volgende:
            </>,
          ],
          bullets: [
            'Je betaalt vooraf met creditcard, PayPal of crypto.',
            'Abonnementen worden niet automatisch verlengd; je beslist zelf of je verlengt.',
            'Je abonnement wordt geactiveerd na bevestiging van je betaling, met begeleiding via WhatsApp.',
            'Alle prijzen zijn in euro’s.',
          ],
        },
        {
          heading: 'Toegestaan gebruik',
          bulletIcon: Ban,
          paragraphs: ['Het is niet toegestaan om:'],
          bullets: [
            'je toegang door te verkopen, door te streamen of te kopiëren;',
            'op meer apparaten tegelijk te kijken dan je abonnement toestaat;',
            'te proberen de dienst te reverse-engineeren, servers te scrapen of het netwerk te overbelasten;',
            'uitzendingen te downloaden, blijvend op te nemen of te verspreiden;',
            'de dienst te gebruiken in strijd met de wet.',
          ],
          note: {
            label: 'Gevolgen:',
            text: 'Bij overtreding kunnen we je account direct blokkeren. Of je in dat geval recht hebt op terugbetaling, wordt nog juridisch getoetst.',
          },
        },
        {
          heading: 'Kwaliteitsgarantie en terugbetaling',
          paragraphs: [
            'Werkt de dienst niet zoals beloofd en kunnen wij een technisch probleem niet oplossen, dan kun je binnen 7 dagen na aankoop om terugbetaling vragen via onze klantenservice.',
            <>
              De voorwaarden lees je in ons{' '}
              <Link href="/restitutiebeleid" className="text-[#39FF14] font-black hover:underline">
                restitutiebeleid
              </Link>
              .
            </>,
          ],
        },
        {
          heading: 'Beschikbaarheid en wijzigingen',
          bulletIcon: RefreshCw,
          paragraphs: [`Tijdelijk onderhoud of wijzigingen in het aanbod kunnen voorkomen. ${BRAND} behoudt zich het recht voor om:`],
          bullets: [
            'het zender- en on-demandaanbod aan te passen;',
            'kort gepland onderhoud uit te voeren, zoveel mogelijk buiten piekuren;',
            'prijzen voor toekomstige abonnementsperiodes te wijzigen.',
          ],
        },
        {
          heading: 'Intellectueel eigendom en aansprakelijkheid',
          paragraphs: [
            `Merken, logo’s, teksten en software op deze website zijn eigendom van ${BRAND}. Voor zover de wet dat toestaat, is ${BRAND} niet aansprakelijk voor indirecte schade, gegevensverlies of storingen die worden veroorzaakt door internetproviders of apparatuur van de gebruiker.`,
          ],
        },
        {
          heading: 'Toepasselijk recht',
          paragraphs: ['Het toepasselijke recht en de bevoegde rechter worden nog vastgesteld en hier vermeld.'],
        },
        {
          heading: 'Wijzigingen in deze voorwaarden',
          paragraphs: [
            'We kunnen deze voorwaarden wijzigen. Belangrijke wijzigingen maken we bekend op de website of via WhatsApp aan actieve abonnees.',
          ],
        },
        {
          heading: 'Contact',
          contactCard: { label: 'Klantenservice', linkText: 'Neem contact op', href: '/klantenservice' },
          paragraphs: [
            <>
              Vragen over deze voorwaarden of je abonnement? Neem contact op via onze{' '}
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
