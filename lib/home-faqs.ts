// lib/home-faqs.ts
// Homepage FAQ content. Single source for BOTH the visible FAQ section
// (app/components/FAQ.tsx) and the homepage FAQPage JSON-LD
// (app/components/PageSchemas.tsx), so the structured data always matches
// what visitors can read on the page.
import { CONSTANTS } from '@/lib/seo';
import { formatEUR, LOWEST_PRICE } from '@/lib/pricing';

export const homeFaqs: { q: string; a: string }[] = [
  {
    q: 'Wat is een IPTV abonnement en hoe werkt het?',
    a: 'IPTV staat voor Internet Protocol Television. In plaats van via de kabel of een schotel kijk je tv via je internetverbinding. Met een IPTV abonnement krijg je inloggegevens die je invult in een IPTV-app op je Smart TV, Firestick, telefoon of tablet. Daarna kijk je live tv, films en series in die app.',
  },
  {
    q: `Wat kost een IPTV abonnement bij ${CONSTANTS.BRAND_NAME}?`,
    a: `Prijzen beginnen bij ${formatEUR(LOWEST_PRICE)} voor 3 maanden op 1 apparaat. Je kiest zelf de looptijd (3, 6 of 12 maanden) en het aantal apparaten dat tegelijk kijkt (1, 2 of 3). Hoe langer de looptijd, hoe lager de prijs per maand. Alle prijzen staan op de [prijzenpagina](/prijzen).`,
  },
  {
    q: 'Op welke apparaten werkt het?',
    a: 'Op de meeste apparaten die je al hebt: Samsung en LG Smart TV’s, Android TV en Google TV, Amazon Fire TV Stick, Apple TV, iPhone, iPad, Android-telefoons, Windows-pc’s en Macs, en MAG- en Formuler-boxen. Twijfel je over jouw apparaat? Stuur ons een bericht via WhatsApp voordat je bestelt.',
  },
  {
    q: 'Hoe werkt de installatie en activering?',
    a: 'Na je bestelling ontvang je je inloggegevens. Die vul je in een IPTV-app in, zoals IPTV Smarters, TiviMate of een andere ondersteunde speler. In de [installatiehandleiding](/installatie) staat per apparaat wat je moet doen, en via WhatsApp helpen we je als je ergens niet uitkomt.',
  },
  {
    q: 'Kan ik eerst gratis testen?',
    a: 'Ja, en dat raden we ook aan. Vraag via WhatsApp een [gratis proefperiode van 24 uur](/blog/iptv-gratis-proefperiode) aan. Zo controleer je de beeldkwaliteit, het aanbod en de werking op je eigen apparaat en internetverbinding voordat je betaalt.',
  },
  {
    q: 'Welke betaalmethoden zijn er?',
    a: 'Je kunt betalen met creditcard (Visa, Mastercard), PayPal of crypto (Bitcoin). Alle [prijzen](/prijzen) zijn in euro’s. Je zit niet vast aan een contract.',
  },
  {
    q: 'Kan ik hulp krijgen als er iets niet werkt?',
    a: 'Ja. Via WhatsApp helpen we je met de installatie, het instellen van je app en het oplossen van problemen zoals haperend beeld. Op de pagina [klantenservice](/klantenservice) lees je hoe je contact opneemt.',
  },
];
