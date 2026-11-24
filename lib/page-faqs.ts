// lib/page-faqs.ts
// Visible FAQ content for /prijzen, /installatie, /iptv-kopen and /reseller.
// Each list is the SINGLE source for both the on-page FAQ section and that
// page's FAQPage JSON-LD, so the structured data always matches the page.
import { CONSTANTS } from '@/lib/seo';
import { RESELLER_PRICES, formatEUR, formatEURExact, savingPercent } from '@/lib/pricing';

const BRAND = CONSTANTS.BRAND_NAME;

export type PageFaq = { q: string; a: string };

const maxSaving12 = Math.max(savingPercent(1, 12), savingPercent(2, 12), savingPercent(3, 12));
const minSaving12 = Math.min(savingPercent(1, 12), savingPercent(2, 12), savingPercent(3, 12));

export const pricingFaqs: PageFaq[] = [
  {
    q: 'Welke betaalmethoden zijn er?',
    a: 'Je betaalt met creditcard (Visa, Mastercard), PayPal of crypto (Bitcoin). Alle prijzen zijn in euro’s.',
  },
  {
    q: 'Kan ik mijn abonnement later uitbreiden?',
    a: 'Ja. Wil je meer apparaten tegelijk laten kijken of een langere looptijd? Stuur ons een bericht via WhatsApp, dan passen we je abonnement aan.',
  },
  {
    q: 'Zit ik vast aan een contract?',
    a: 'Nee. Je betaalt één keer vooraf voor de gekozen looptijd. Na afloop beslis je zelf of je verlengt.',
  },
  {
    q: 'Wat gebeurt er als mijn abonnement afloopt?',
    a: 'Verleng je niet, dan stopt de dienst aan het einde van de looptijd zonder verdere verplichtingen. Verlengen regel je via WhatsApp.',
  },
  {
    q: 'Kan ik eerst gratis testen?',
    a: 'Ja. Vraag via WhatsApp een [gratis proefperiode van 24 uur](/blog/iptv-gratis-proefperiode) aan en test de beeldkwaliteit en het aanbod op je eigen apparaat en internetverbinding.',
  },
  {
    q: 'Kan ik op meerdere apparaten tegelijk kijken?',
    a: 'Ja, afhankelijk van je abonnement. Je kiest bij het bestellen voor 1, 2 of 3 apparaten die tegelijk kunnen kijken.',
  },
  {
    q: 'Is een langere looptijd voordeliger?',
    a: `Ja. Met een abonnement van 12 maanden bespaar je ${minSaving12}% tot ${maxSaving12}% ten opzichte van vier keer het abonnement van 3 maanden, afhankelijk van het aantal apparaten.`,
  },
];

export const setupFaqs: PageFaq[] = [
  {
    q: 'Hoe ontvang ik mijn inloggegevens?',
    a: 'Alles gaat via WhatsApp. Zodra je je abonnement hebt gekozen en betaald, ontvang je je inloggegevens in de chat.',
  },
  {
    q: 'Welke IPTV-app raden jullie aan?',
    a: 'IPTV Smarters Pro is een veelgebruikte app die werkt op Firestick, Smart TV’s, Apple-apparaten en pc of Mac. Op Android TV en Fire TV is TiviMate ook populair. We helpen je via WhatsApp de juiste app voor jouw apparaat te kiezen.',
  },
  {
    q: 'Moet ik IPTV Smarters Pro apart activeren?',
    a: 'Dat hangt af van de versie van de app en je apparaat: sommige app-makers vragen na een proeftijd om een eigen licentie. Je abonnement koppel je via automatische installatie (je stuurt ons de Device Key en wij activeren op afstand) of handmatige installatie (je vult zelf de M3U- of Xtream Codes-gegevens in).',
  },
  {
    q: 'Hoe lang duurt de installatie?',
    a: 'Meestal ben je binnen ongeveer 10 minuten klaar: de app installeren, de inloggegevens invullen en de zenderlijst laten laden.',
  },
  {
    q: 'Kan ik mijn inloggegevens op meerdere apparaten gebruiken?',
    a: 'Je kunt de app op meerdere apparaten installeren. Hoeveel apparaten tegelijk kunnen kijken, hangt af van je abonnement: 1, 2 of 3.',
  },
  {
    q: 'Wat doe ik bij een inlogfout in IPTV Smarters Pro?',
    a: 'Controleer of je de inlogmethode Xtream Codes API hebt gekozen (niet M3U) en of er geen spaties voor of na je gebruikersnaam of wachtwoord staan. Lukt het nog steeds niet, stuur ons dan een bericht via WhatsApp.',
  },
  {
    q: 'Welke internetsnelheid heb ik nodig?',
    a: 'Voor 4K-beeld raden we minimaal 30 Mbit/s aan, voor Full HD minimaal 15 Mbit/s. Kijk je op meerdere apparaten tegelijk, tel de snelheid dan per scherm op.',
  },
];

export const buyFaqs: PageFaq[] = [
  {
    q: 'Hoe kan ik IPTV kopen in Nederland?',
    a: 'Kies op de [prijzenpagina](/prijzen) het aantal apparaten en de looptijd, en stuur ons je keuze via WhatsApp. Na betaling ontvang je je inloggegevens in de chat en helpen we je met de installatie.',
  },
  {
    q: 'Kan ik eerst testen voordat ik koop?',
    a: 'Ja. Vraag via WhatsApp een [gratis proefperiode van 24 uur](/blog/iptv-gratis-proefperiode) aan. Zo weet je zeker dat alles werkt op je eigen apparaat en internetverbinding voordat je betaalt.',
  },
  {
    q: 'Hoe betaal ik?',
    a: 'Je betaalt met creditcard (Visa, Mastercard), PayPal of crypto (Bitcoin). Alle prijzen zijn in euro’s.',
  },
  {
    q: 'Welke IPTV-apps kan ik gebruiken?',
    a: 'De meeste moderne IPTV-apps ondersteunen het Xtream Codes API-formaat, zoals IPTV Smarters Pro, TiviMate, IBO Player Pro en XCIPTV. We helpen je de juiste app voor jouw apparaat te kiezen.',
  },
  {
    q: 'Heb ik technische kennis nodig?',
    a: 'Nee. Je installeert een app, vult de gegevens in die je via WhatsApp ontvangt en de zenderlijst laadt automatisch. Kom je er niet uit, dan helpen we je stap voor stap.',
  },
];

const starterPerCredit = formatEURExact(RESELLER_PRICES.starter.price / RESELLER_PRICES.starter.credits);
const proPerCredit = formatEURExact(RESELLER_PRICES.pro.price / RESELLER_PRICES.pro.credits);

export const resellerFaqs: PageFaq[] = [
  {
    q: 'Wat is een IPTV-resellerpanel?',
    a: `Een resellerpanel is een persoonlijk dashboard waarmee je IPTV abonnementen aanmaakt en beheert voor je eigen klanten. Je koopt credits in bij ${BRAND} en gebruikt die om abonnementen of proefperiodes te activeren voor je klanten.`,
  },
  {
    q: 'Wat kost een credit?',
    a: `Eén credit staat gelijk aan één jaar abonnement. Bij het Starter-pakket (${RESELLER_PRICES.starter.credits} credits voor ${formatEUR(RESELLER_PRICES.starter.price)}) betaal je ${starterPerCredit} per credit, bij het Pro-pakket (${RESELLER_PRICES.pro.credits} credits voor ${formatEUR(RESELLER_PRICES.pro.price)}) ${proPerCredit} per credit. Je verkoopprijs bepaal je zelf.`,
  },
  {
    q: 'Heb ik technische kennis nodig?',
    a: 'Nee. Het panel is eenvoudig te gebruiken. Kun je met WhatsApp en een webbrowser overweg, dan kun je ermee werken. Via WhatsApp begeleiden we je bij de start.',
  },
  {
    q: 'Verlopen de credits?',
    a: 'Nee. Je credits blijven in je account staan en je activeert ze in je eigen tempo. Er is geen maandelijks minimum.',
  },
  {
    q: 'Welke ondersteuning krijg ik als reseller?',
    a: 'Elke reseller krijgt directe ondersteuning via WhatsApp. Het Growth-pakket geeft voorrang bij vragen; het Pro-pakket heeft een eigen supportkanaal en hulp bij het instellen van een white-label omgeving.',
  },
];
