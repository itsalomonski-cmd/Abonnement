import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { CONSTANTS, generateSEOMetadata, whatsappUrl, LEGAL_PAGES_FINAL, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import LegalPage from '../components/LegalPage';

const BRAND = CONSTANTS.BRAND_NAME;

export const metadata = generateSEOMetadata(
  'Restitutiebeleid',
  `Het restitutiebeleid van ${BRAND}: wanneer je binnen 7 dagen om terugbetaling kunt vragen en hoe je dat doet.`,
  '/restitutiebeleid',
  { noindex: !LEGAL_PAGES_FINAL }
);

// Adapted from the source project's "7 day quality guarantee". Whether these
// conditions are compatible with Dutch distance-selling rules (herroepingsrecht)
// has not been reviewed.
export default function RefundPolicyPage() {
  return (
    <LegalPage
      path="/restitutiebeleid"
      breadcrumbName="Restitutiebeleid"
      badge="Kwaliteitsgarantie"
      badgeIcon={RefreshCw}
      titleStart="Restitutie"
      titleAccent="beleid"
      compoundTitle
      intro="Werkt de dienst niet zoals beloofd en kunnen wij het probleem niet oplossen? Dan kun je binnen 7 dagen na aankoop om terugbetaling vragen."
      missing={[
        'Statutaire naam en contactgegevens van de onderneming',
        'Toetsing van deze regeling aan het herroepingsrecht voor consumenten (koop op afstand)',
        'Een e-mailadres voor schriftelijke verzoeken',
      ]}
      highlight={{
        label: 'Onze kwaliteitsgarantie:',
        text: 'De garantie geldt voor echte technische problemen aan onze kant die ons team niet kan oplossen. Ze geldt niet als je van gedachten verandert, voor persoonlijke voorkeur of voor problemen met je eigen apparaat of internetverbinding.',
      }}
      sections={[
        {
          heading: 'Wanneer heb je recht op terugbetaling?',
          paragraphs: ['Je komt in aanmerking voor terugbetaling als aan alle volgende voorwaarden is voldaan:'],
          bullets: [
            'je meldt het probleem binnen 7 kalenderdagen na de aankoopdatum;',
            'er is sprake van een aanhoudende storing aan onze kant waardoor de dienst niet werkt zoals beschreven;',
            'ons team heeft minimaal 24 uur de gelegenheid gehad om het probleem op te lossen;',
            'je hebt de gevraagde basisstappen uitgevoerd, zoals je router herstarten en de cache van je app wissen.',
          ],
        },
        {
          heading: 'Wanneer niet?',
          paragraphs: ['In de volgende situaties is terugbetaling niet mogelijk:'],
          bullets: [
            'Je bent van gedachten veranderd of hebt het abonnement niet meer nodig.',
            'Haperend beeld door je eigen wifi- of internetverbinding (bijvoorbeeld een snelheid lager dan aanbevolen).',
            'Problemen door een verouderd apparaat, niet-ondersteunde apps of verkeerde instellingen aan jouw kant.',
            'Tijdelijke wijzigingen in individuele zenders.',
            'Een account dat is geblokkeerd omdat er op meer apparaten tegelijk werd gekeken dan toegestaan.',
          ],
        },
        {
          heading: 'Eerst samen oplossen',
          paragraphs: [
            'Voordat we een terugbetaling goedkeuren, proberen we het probleem samen met je op te lossen: we controleren je account, passen waar nodig de verbinding aan en lopen de instellingen met je door. Lukt het daarna nog steeds niet, dan behandelen we je verzoek.',
          ],
        },
        {
          heading: 'Zo dien je een verzoek in',
          contactCard: { label: 'Klantenservice', linkText: 'Neem contact op', href: '/klantenservice' },
          paragraphs: [
            <>
              Stuur je verzoek via{' '}
              <a
                href={whatsappUrl(`Hallo ${BRAND}, ik wil een probleem melden en een terugbetaling aanvragen.`)}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="text-[#39FF14] font-black hover:underline"
              >
                WhatsApp
              </a>{' '}
              met je bestelgegevens, een korte omschrijving van het probleem en zo mogelijk een schermafbeelding van de
              foutmelding.
            </>,
            'Na goedkeuring betalen we het bedrag terug via de oorspronkelijke betaalmethode. De verwerkingstijd wordt nog bevestigd.',
          ],
        },
        {
          heading: 'Hulp bij de installatie',
          paragraphs: [
            <>
              Veel problemen zijn snel opgelost. Bekijk de{' '}
              <Link href="/installatie" className="text-[#39FF14] font-black hover:underline">
                installatiehandleiding
              </Link>{' '}
              of neem contact op met onze{' '}
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
