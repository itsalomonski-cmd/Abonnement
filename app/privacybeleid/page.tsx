import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { CONSTANTS, generateSEOMetadata, LEGAL_PAGES_FINAL } from '@/lib/seo';
import LegalPage from '../components/LegalPage';

const BRAND = CONSTANTS.BRAND_NAME;

export const metadata = generateSEOMetadata(
  'Privacybeleid',
  `Het privacybeleid van ${BRAND}: welke persoonsgegevens we verwerken, waarvoor, hoe lang we ze bewaren en welke rechten je hebt onder de AVG.`,
  '/privacybeleid',
  { noindex: !LEGAL_PAGES_FINAL }
);

// Adapted from the source project's privacy policy. Claims that could not be
// verified (specific security infrastructure, CCPA/US/Australian compliance)
// were not carried over. The controller's identity and a privacy contact
// address must be supplied by the owner.
export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacybeleid"
      breadcrumbName="Privacybeleid"
      badge="Privacy"
      badgeIcon={ShieldCheck}
      titleStart="Privacy"
      titleAccent="beleid"
      compoundTitle
      intro={`Hoe ${BRAND} omgaat met je persoonsgegevens.`}
      missing={[
        'Naam, adres en KvK-nummer van de verwerkingsverantwoordelijke',
        'Een e-mailadres voor privacyverzoeken',
        'Bevestigde lijst van verwerkers (betaaldienstverleners, communicatiediensten) en eventuele doorgifte buiten de EER',
        'Bevestigde bewaartermijnen',
      ]}
      sections={[
        {
          heading: 'Welke gegevens we verwerken',
          paragraphs: ['We verwerken alleen de gegevens die nodig zijn om je abonnement te leveren:'],
          bullets: [
            'je WhatsApp-nummer en eventueel je e-mailadres (om je inloggegevens en informatie over je abonnement te sturen);',
            'betaalgegevens, voor zover nodig om je betaling te verwerken (afgehandeld door betaaldienstverleners);',
            'IP-adres en apparaattype (voor de verbinding met de dienst en het voorkomen van misbruik);',
            'je gekozen looptijd en het aantal apparaten;',
            'je berichten aan onze klantenservice.',
          ],
          note: {
            label: 'Contactformulier:',
            text: 'Het contactformulier op deze website verstuurt en bewaart zelf geen gegevens. Je bericht wordt alleen naar het klembord van je eigen apparaat gekopieerd, zodat je het zelf in WhatsApp kunt plakken en versturen.',
          },
        },
        {
          heading: 'Waarvoor we je gegevens gebruiken',
          bullets: [
            'het activeren en instellen van je abonnement;',
            'het verwerken van betalingen;',
            'het geven van ondersteuning via WhatsApp;',
            'het informeren over onderhoud of wijzigingen in de dienst;',
            'het voorkomen van misbruik van de dienst.',
          ],
        },
        {
          heading: 'Beveiliging',
          paragraphs: [
            'We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies en onrechtmatig gebruik. De website gebruikt een versleutelde verbinding (HTTPS).',
          ],
          note: { label: 'Geen verkoop van gegevens:', text: 'We verkopen je persoonsgegevens niet aan derden.' },
        },
        {
          heading: 'Cookies en lokale opslag',
          paragraphs: [
            'Deze website plaatst geen tracking- of advertentiecookies. We gebruiken alleen functionele opslag in je browser, bijvoorbeeld om te onthouden dat je de melding van de WhatsApp-chat al hebt gezien.',
          ],
        },
        {
          heading: 'Je rechten',
          paragraphs: ['Op grond van de Algemene verordening gegevensbescherming (AVG) heb je onder meer het recht om:'],
          bullets: [
            'je gegevens in te zien;',
            'onjuiste gegevens te laten corrigeren;',
            'je gegevens te laten verwijderen;',
            'de verwerking te laten beperken of bezwaar te maken tegen de verwerking;',
            'je gegevens over te laten dragen;',
            'een klacht in te dienen bij de Autoriteit Persoonsgegevens.',
          ],
        },
        {
          heading: 'Diensten van derden',
          paragraphs: [
            'Voor betalingen en communicatie maken we gebruik van externe dienstverleners, zoals betaaldienstverleners en WhatsApp. Zij verwerken gegevens alleen voor zover dat nodig is voor hun dienst.',
          ],
        },
        {
          heading: 'Minderjarigen',
          paragraphs: [
            'Onze diensten zijn niet bedoeld voor kinderen. Denk je dat een minderjarige ons persoonsgegevens heeft gegeven, neem dan contact met ons op, zodat we die kunnen verwijderen.',
          ],
        },
        {
          heading: 'Bewaartermijn',
          paragraphs: [
            'We bewaren je gegevens zolang je abonnement actief is en daarna zo lang als nodig is voor wettelijke, fiscale en administratieve verplichtingen. Daarna verwijderen of anonimiseren we ze.',
          ],
        },
        {
          heading: 'Contact over privacy',
          contactCard: { label: 'Klantenservice', linkText: 'Neem contact op', href: '/klantenservice' },
          paragraphs: [
            <>
              Vragen over dit privacybeleid of een verzoek over je gegevens? Neem contact op via onze{' '}
              <Link href="/klantenservice" className="text-[#39FF14] font-black hover:underline">
                klantenservice
              </Link>
              .
            </>,
          ],
        },
        {
          heading: 'Wijzigingen',
          paragraphs: ['We kunnen dit privacybeleid aanpassen. De meest actuele versie staat altijd op deze pagina.'],
        },
      ]}
    />
  );
}
