// @/lib/channels-data.ts
//
// Channel categories for /zenders/[slug].
//
// ⚠️ OWNER TO VERIFY: the source project listed hundreds of named broadcasters
// (sports networks, premium film channels, etc.) and channel counts. Their
// distribution rights could not be verified, so no channel names, counts or
// sports rights are published here. The category pages describe what a viewer
// can check during the free trial and are set to `noindex` until a verified,
// authorised channel lineup is supplied (set `lineupVerified: true` and add
// `channels` once that is done).

export interface Channel {
  name: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChannelCategory {
  slug: string;
  /** Short label used in navigation and breadcrumbs. */
  name: string;
  /** H1 / title for the category page. */
  title: string;
  metaDescription: string;
  intro: string;
  /** What to check for this category during the free trial. */
  checklist: string[];
  channels: Channel[];
  lineupVerified: boolean;
  faqs: FAQItem[];
}

const sharedFaq: FAQItem = {
  question: 'Waarom staat hier geen volledige zenderlijst?',
  answer:
    'Het zenderaanbod kan per periode verschillen. Wij publiceren daarom geen lijst die mogelijk niet klopt. Vraag het actuele overzicht op via WhatsApp en controleer het zelf tijdens de gratis proefperiode van 24 uur, voordat je iets betaalt.',
};

export const channelsData: ChannelCategory[] = [
  {
    slug: 'sport',
    name: 'Sport',
    title: 'Sport kijken met je IPTV abonnement',
    metaDescription:
      'Sport kijken via IPTV: waar je op let bij beeldkwaliteit, vertraging en stabiliteit, en hoe je het sportaanbod eerst gratis 24 uur test.',
    intro:
      'Sport stelt de hoogste eisen aan een IPTV verbinding: veel beweging in beeld, live uitzendingen en drukke momenten waarop iedereen tegelijk kijkt. Daarom raden we aan om juist het sportaanbod goed te testen voordat je een abonnement kiest.',
    checklist: [
      'Kijk tijdens de proefperiode naar een live wedstrijd en let op haperingen.',
      'Controleer of de beeldkwaliteit op jouw tv en internetverbinding goed blijft.',
      'Vraag via WhatsApp welke sportzenders op dit moment beschikbaar zijn.',
      'Gebruik bij voorkeur een bekabelde verbinding of sterk wifi-signaal.',
    ],
    channels: [],
    lineupVerified: false,
    faqs: [
      sharedFaq,
      {
        question: 'Hoeveel internetsnelheid heb ik nodig voor sport?',
        answer:
          'We raden minimaal 15 Mbit/s aan voor Full HD en 30 Mbit/s voor 4K. Kijk je op meerdere schermen tegelijk, tel dit dan per scherm op. Een netwerkkabel is stabieler dan wifi.',
      },
    ],
  },
  {
    slug: 'films-series',
    name: 'Films & series',
    title: 'Films en series on demand',
    metaDescription:
      'Films en series on demand via je IPTV abonnement: hoe de bibliotheek werkt in je app en hoe je het aanbod eerst gratis 24 uur bekijkt.',
    intro:
      'Naast live tv bevat een IPTV abonnement meestal een on-demand bibliotheek met films en series. Die bekijk je in dezelfde app als de live zenders, op het moment dat het jou uitkomt.',
    checklist: [
      'Open tijdens de proefperiode de film- en seriebibliotheek in je app.',
      'Controleer of ondertitels en audiotalen beschikbaar zijn die je wilt gebruiken.',
      'Test het afspelen op het apparaat waarop je het meeste kijkt.',
    ],
    channels: [],
    lineupVerified: false,
    faqs: [
      sharedFaq,
      {
        question: 'Zijn er Nederlandse ondertitels?',
        answer:
          'Dat verschilt per titel. Controleer dit tijdens de gratis proefperiode voor de films en series die jij belangrijk vindt.',
      },
    ],
  },
  {
    slug: 'kinderen-familie',
    name: 'Kinderen & familie',
    title: 'Kinder- en familieprogramma’s',
    metaDescription:
      'Kinder- en familieprogramma’s via IPTV: waar je op let, hoe je het aanbod test en hoe je meerdere schermen in huis gebruikt.',
    intro:
      'Kijkt het hele gezin mee? Dan is het handig om vooraf te weten welke kinder- en familieprogramma’s er zijn en of je op meerdere schermen tegelijk wilt kijken.',
    checklist: [
      'Bekijk tijdens de proefperiode het aanbod voor kinderen en familie.',
      'Kies het aantal apparaten dat tegelijk moet kunnen kijken (1, 2 of 3).',
      'Vraag via WhatsApp hoe je in je app een kinderprofiel of slot instelt, als je app dat ondersteunt.',
    ],
    channels: [],
    lineupVerified: false,
    faqs: [
      sharedFaq,
      {
        question: 'Kunnen de kinderen op een ander scherm kijken terwijl ik tv kijk?',
        answer:
          'Ja, als je een abonnement voor 2 of 3 apparaten kiest. Met een abonnement voor 1 apparaat kun je op één scherm tegelijk kijken.',
      },
    ],
  },
  {
    slug: 'internationaal',
    name: 'Internationaal',
    title: 'Internationale zenders',
    metaDescription:
      'Internationale zenders via je IPTV abonnement: zo controleer je of de landen en talen die jij zoekt beschikbaar zijn, eerst 24 uur gratis.',
    intro:
      'Veel kijkers in Nederland zoeken naast lokale programma’s ook zenders uit andere landen en in andere talen. Of de landen en talen die jij zoekt beschikbaar zijn, controleer je het beste vooraf.',
    checklist: [
      'Laat via WhatsApp weten welke landen of talen je zoekt.',
      'Controleer tijdens de proefperiode de zenders die voor jou belangrijk zijn.',
      'Let op de tijdzone in de tv-gids (EPG) van internationale zenders.',
    ],
    channels: [],
    lineupVerified: false,
    faqs: [sharedFaq],
  },
];

export const getCategoryBySlug = (slug: string) => channelsData.find((c) => c.slug === slug);
