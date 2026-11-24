// @/lib/channels-data.ts

// ===========================================================================
// COUNTRY CODE TYPE
// ===========================================================================
export type CountryCode = 'US' | 'UK' | 'CA' | 'AU' | 'EU' | 'CN' | 'IN' | 'PK' | 'JP' | 'KR' | 'ME' | 'PH' | 'TH' | 'VN' | 'ID' | 'MY' | 'NZ';

// ===========================================================================
// CHANNEL INTERFACE
// ===========================================================================
export interface Channel {
  name: string;
  quality: '4K UHD' | 'FHD 60FPS' | 'HD';
  genre?: string;
  description: string;
  whyWatch?: string;
  country?: CountryCode;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChannelCategory {
  slug: string;
  name: string;
  totalChannels: number;
  description: string;
  longDescription: string;
  keywords: string[];
  channels: Channel[];
  faqs: FAQItem[];
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export const channelsData: ChannelCategory[] = [
  // =========================================================================
  // 1. SPORT — Mondiaal
  // =========================================================================
  {
    slug: 'sports',
    name: 'Alle sportzenders',
    totalChannels: 3000,
    description:
      'Elke grote sport ter wereld in vloeiende 60FPS. Inclusief ESPN, Fox Sports, NFL Network, NBA TV, MLB Network, NHL Network, UFC Fight Pass, DAZN, Sky Sports, plus elke NFL-, NBA-, MLB-, NHL-, UFC-, Premier League-, AFL-, NRL- en Formule 1-wedstrijd.',
    longDescription:
      'Traditionele kabelproviders dwingen sportfans in dure pakketten met lange contracten. Met onze IPTV-dienst krijg je toegang tot het complete mondiale sportuniversum. ESPN, Fox Sports, NFL Network, NBA TV, MLB Network, NHL Network, UFC Fight Pass, DAZN, Sky Sports, plus elke NFL-, NBA-, MLB-, NHL-, UFC-, Premier League-, La Liga-, AFL-, NRL-, Formule 1- en college football-wedstrijd voor een fractie van de kosten. Onze dedicated edge-servers op meerdere continenten zijn geoptimaliseerd voor 60FPS high bitrate levering, zodat je zonder buffering kijkt tijdens de Super Bowl, NBA Finals, World Series, Stanley Cup Final, Premier League-derby\'s, AFL Grand Final of elk ander piekmoment.',
    keywords: [
      'beste iptv provider sport',
      'iptv provider live sport',
      'espn iptv',
      'fox sports iptv',
      'nfl iptv',
      'nba iptv',
      'mlb iptv',
      'nhl iptv',
      'ufc iptv',
      'premier league iptv',
      'afl iptv',
      'nrl iptv',
      'formule 1 iptv',
      'ufc ppv iptv',
      'college football iptv',
      'live sport iptv',
    ],
    channels: [
      // Amerikaanse sport
      { name: 'ESPN HD', quality: 'FHD 60FPS', genre: 'Amerikaanse sport', country: 'US', description: 'De wereldwijde sportleider met NFL-, NBA-, MLB- en UFC-verslaggeving.', popular: true },
      { name: 'ESPN 2 HD', quality: 'FHD 60FPS', genre: 'Amerikaanse sport', country: 'US', description: 'Extra Amerikaanse sportprogrammering waaronder college football, NBA en MLB.', popular: true },
      { name: 'ESPNU HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'Collegesport met NCAA football, basketbal en meer.' },
      { name: 'ESPN News HD', quality: 'FHD 60FPS', genre: 'Sportnieuws', country: 'US', description: '24/7 sportnieuws, highlights en analyses van ESPN.' },
      { name: 'FS1 HD', quality: 'FHD 60FPS', genre: 'Amerikaanse sport', country: 'US', description: 'Fox Sports 1 met MLB, NASCAR, UFC Fight Nights en meer.', popular: true },
      { name: 'FS2 HD', quality: 'FHD 60FPS', genre: 'Amerikaanse sport', country: 'US', description: 'Fox Sports 2 met internationaal voetbal en extra sportverslaggeving.' },
      { name: 'NFL Network HD', quality: 'FHD 60FPS', genre: 'NFL', country: 'US', description: '24/7 NFL-verslaggeving, Thursday Night Football en NFL RedZone-replays.', popular: true },
      { name: 'NFL RedZone HD', quality: 'FHD 60FPS', genre: 'NFL', country: 'US', description: 'Elke touchdown van elke zondagmiddagwedstrijd, live op het moment dat het gebeurt.', popular: true },
      { name: 'NBA TV HD', quality: 'FHD 60FPS', genre: 'NBA', country: 'US', description: 'Rond de klok NBA-verslaggeving, klassieke wedstrijden en live analyses.', popular: true },
      { name: 'MLB Network HD', quality: 'FHD 60FPS', genre: 'MLB', country: 'US', description: 'Major League Baseball-verslaggeving met live wedstrijden en analyses.', popular: true },
      { name: 'NHL Network HD', quality: 'FHD 60FPS', genre: 'NHL', country: 'US', description: 'National Hockey League-verslaggeving met live wedstrijden en spelersanalyses.' },
      { name: 'TNT Sports US HD', quality: 'FHD 60FPS', genre: 'NBA & MLB', country: 'US', description: 'TNT NBA-verslaggeving plus MLB playoff-wedstrijden en internationale sport.' },
      { name: 'TBS Sports HD', quality: 'FHD 60FPS', genre: 'MLB & NBA', country: 'US', description: 'TBS MLB playoff-verslaggeving en NBA-wedstrijden in het reguliere seizoen.' },
      { name: 'Big Ten Network HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'NCAA Big Ten conference football, basketbal en andere sporten.' },
      { name: 'PAC-12 Network HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'PAC-12 conference football en basketbalverslaggeving.' },
      { name: 'SEC Network HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'Southeastern Conference football en basketbalverslaggeving.' },
      { name: 'ACC Network HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'Atlantic Coast Conference football en basketbalverslaggeving.' },
      { name: 'Longhorn Network HD', quality: 'FHD 60FPS', genre: 'Collegesport', country: 'US', description: 'Texas Longhorns collegesport en originele programmering.' },
      // Vechtsport
      { name: 'UFC Fight Pass Live', quality: 'FHD 60FPS', genre: 'MMA', country: 'US', description: 'Genummerde UFC-evenementen, Fight Nights, Contender Series en volledige PPV-kaarten.', popular: true },
      { name: 'DAZN Boxing & PPV', quality: 'FHD 60FPS', genre: 'Vechtsport', country: 'US', description: 'Matchroom Boxing, Golden Boy Promotions en grote boksen PPV-evenementen wereldwijd.' },
      { name: 'WWE Network', quality: 'FHD 60FPS', genre: 'Worstelen', country: 'US', description: 'WWE Raw, SmackDown, NXT en volledige pay-per-view-evenementen.' },
      { name: 'AEW Plus HD', quality: 'FHD 60FPS', genre: 'Worstelen', country: 'US', description: 'All Elite Wrestling met Dynamite, Rampage en PPV-evenementen.' },
      { name: 'Fight Sports HD', quality: 'FHD 60FPS', genre: 'Vechtsport', country: 'US', description: 'Boksen, kickboksen en MMA van over de hele wereld.' },
      // Tennis / Golf
      { name: 'Tennis Channel HD', quality: 'FHD 60FPS', genre: 'Tennis', country: 'US', description: '24/7 tennis met alle ATP- en WTA-toernooien en Grand Slams.' },
      { name: 'Golf Channel HD', quality: 'FHD 60FPS', genre: 'Golf', country: 'US', description: 'PGA Tour-, LPGA- en Major Championship-verslaggeving 24/7.' },
      { name: 'NBC Sports Network HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'US', description: 'NBC Sports met Premier League, NHL en Olympische verslaggeving.' },
      { name: 'CBS Sports Network HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'US', description: 'CBS Sports Network met collegesport en extra verslaggeving.' },
      // Britse sport
      { name: 'Sky Sports Main Event', quality: 'FHD 60FPS', genre: 'Premier League', country: 'UK', description: 'Volledige Engelse Premier League-verslaggeving met Brits commentaar en analyses.', popular: true },
      { name: 'Sky Sports F1', quality: 'FHD 60FPS', genre: 'Formule 1', country: 'UK', description: 'Dedicated F1-zender met onboard-camera\'s, kwalificaties en raceweekend-verslaggeving.', popular: true },
      { name: 'Sky Sports Premier League', quality: 'FHD 60FPS', genre: 'Voetbal', country: 'UK', description: 'Dedicated Premier League-zender met elke uitgezonden wedstrijd.' },
      { name: 'Sky Sports Football', quality: 'FHD 60FPS', genre: 'Voetbal', country: 'UK', description: 'Championship-, League One- en internationaal voetbal.' },
      { name: 'Sky Sports Cricket', quality: 'FHD 60FPS', genre: 'Cricket', country: 'UK', description: 'Engels cricket, internationale tours en The Ashes-verslaggeving.' },
      { name: 'Sky Sports Golf', quality: 'FHD 60FPS', genre: 'Golf', country: 'UK', description: 'PGA Tour-, DP World Tour- en Major Championship-verslaggeving.' },
      { name: 'Sky Sports Action', quality: 'FHD 60FPS', genre: 'Multisport', country: 'UK', description: 'Rugby, boksen en extra live sportevenementen.' },
      { name: 'Sky Sports Arena', quality: 'FHD 60FPS', genre: 'Multisport', country: 'UK', description: 'Darts, snooker en extra live sportevenementen.' },
      { name: 'TNT Sports 1 HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'UK', description: 'Champions League-voetbal, UFC en MotoGP-verslaggeving.' },
      { name: 'TNT Sports 2 HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'UK', description: 'Extra TNT Sports-feed met Premier League en Europees voetbal.' },
      { name: 'Eurosport 1 HD', quality: 'FHD 60FPS', genre: 'Tennis & wielrennen', country: 'EU', description: 'Grand Slam-tennis, Tour de France en wintersportverslaggeving.' },
      { name: 'Eurosport 2 HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'EU', description: 'Extra Europese sportzender met wielrennen en motorsport.' },
      // Canadese sport
      { name: 'TSN 1 HD', quality: 'FHD 60FPS', genre: 'Canadese sport', country: 'CA', description: 'Canada\'s sportleider met NHL-, NBA- en CFL-verslaggeving.' },
      { name: 'TSN 2 HD', quality: 'FHD 60FPS', genre: 'NFL & NBA', country: 'CA', description: 'NFL Sunday-verslaggeving, Monday Night Football en NBA playoff-wedstrijden.' },
      { name: 'TSN 3 HD', quality: 'FHD 60FPS', genre: 'Voetbal & MLB', country: 'CA', description: 'Premier League-wedstrijden, MLB-verslaggeving en MLB playoff-wedstrijden.' },
      { name: 'TSN 4 HD', quality: 'FHD 60FPS', genre: 'Formule 1 & tennis', country: 'CA', description: 'Formule 1-races, Grand Slam-tennis en internationale sportevenementen.' },
      { name: 'TSN 5 HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'CA', description: 'Extra TSN-feed voor parallelle evenementen en meerdere gelijktijdige wedstrijden.' },
      { name: 'Sportsnet Ontario HD', quality: 'FHD 60FPS', genre: 'Canadese sport', country: 'CA', description: 'Canadees sportnetwerk met NHL-, MLB- en NBA-verslaggeving.' },
      { name: 'Sportsnet West HD', quality: 'FHD 60FPS', genre: 'Canadese sport', country: 'CA', description: 'West-Canadese sport met NHL- en NBA-verslaggeving.' },
      { name: 'Sportsnet East HD', quality: 'FHD 60FPS', genre: 'Canadese sport', country: 'CA', description: 'Oost-Canadese sport met NHL- en regionale verslaggeving.' },
      { name: 'Sportsnet 360 HD', quality: 'FHD 60FPS', genre: 'WWE & UFC', country: 'CA', description: 'WWE Raw en SmackDown, UFC Fight Nights en vechtsportverslaggeving.' },
      { name: 'Sportsnet One HD', quality: 'FHD 60FPS', genre: 'Premier League', country: 'CA', description: 'Premier League-voetbal, internationale voetbaltoernooien en NHL-wedstrijden.' },
      { name: 'NHL Center Ice HD', quality: 'FHD 60FPS', genre: 'Live NHL', country: 'CA', description: 'Elke NHL-wedstrijd buiten de markt live vanuit elke arena.' },
      // Australische sport
      { name: 'Fox Sports Australia HD', quality: 'FHD 60FPS', genre: 'Australische sport', country: 'AU', description: 'Australische sportverslaggeving waaronder cricket, motorsport, AFL en NRL.', popular: true },
      { name: 'Kayo Sports 1 HD', quality: 'FHD 60FPS', genre: 'Multisport', country: 'AU', description: 'Premium Australische sportstreaming waaronder cricket en motorsport.' },
      { name: 'Kayo Sports 2 HD', quality: 'FHD 60FPS', genre: 'AFL & NRL', country: 'AU', description: 'Australian Rules Football en Rugby League live verslaggeving.' },
      { name: 'Optus Sport 1 HD', quality: 'FHD 60FPS', genre: 'Premier League', country: 'AU', description: 'Live Engelse Premier League-wedstrijden, UEFA Champions League en internationaal voetbal.' },
      // Mondiale extra\'s
      { name: 'Red Bull TV HD', quality: 'FHD 60FPS', genre: 'Extreme sport', country: 'EU', description: 'Extreme sport, motorsport en avontuurlijke programmering.' },
      { name: 'Olympic Channel HD', quality: 'FHD 60FPS', genre: 'Olympische Spelen', country: 'EU', description: 'Olympische sportverslaggeving, highlights en atletenprofielen.' },
      { name: 'Fight Sports Max HD', quality: 'FHD 60FPS', genre: 'Vechtsport', country: 'US', description: 'Extra vechtsportfeed met internationale gevechten en evenementen.' },
    ],
    faqs: [
      {
        question: 'Kan ik NFL, NBA, MLB, NHL, UFC, Premier League, AFL, NRL en pay-per-view-evenementen live kijken?',
        answer:
          'Ja. Elk zenderpakket bevat volledige live NFL-, NBA-, MLB-, NHL-, UFC-, Premier League-, AFL-, NRL-, Formule 1- en alle grote boksen- en MMA-pay-per-view-evenementen zonder extra kosten. Wat op traditionele pay-per-view $70 of meer kost, is inbegrepen in je abonnement.',
      },
      {
        question: 'Is er vertraging ten opzichte van traditionele kabel?',
        answer:
          'Nee. Onze dedicated edge-servers op meerdere continenten gebruiken 60FPS high bitrate verbindingen met minimale latency, zodat je live-evenementen in realtime zonder merkbare vertraging bekijkt.',
      },
      {
        question: 'Bieden jullie catch up voor gemiste wedstrijden?',
        answer:
          'Ja. De meeste sportzenders bevatten een 7-daagse catch up-functie en een volledig gesynchroniseerde EPG-gids, zodat je elke gemiste wedstrijd opnieuw kunt bekijken.',
      },
    ],
    featured: true,
  },

  // =========================================================================
  // 2. USA-ZENDERS
  // =========================================================================
  {
    slug: 'usa',
    name: 'Amerikaanse zenders',
    totalChannels: 5000,
    description:
      'Volledige toegang tot elk groot Amerikaans netwerk. ABC, CBS, NBC, FOX, HBO, Showtime, ESPN, CNN en premium streaming-originals in Full HD en 4K.',
    longDescription:
      'Toegang tot het volledige aanbod van Amerikaanse televisie, van grote broadcast-netwerken (ABC, CBS, NBC, FOX, CW) tot premium kabelzenders (HBO, Showtime, Starz, AMC) en dedicated sportnetwerken (ESPN, FS1, NFL Network). Onze Amerikaanse line-up geeft je het complete Amerikaanse entertainmentpakket in Full HD en 4K met volledig gesynchroniseerde EPG en 7-daagse catch up.',
    keywords: [
      'amerikaanse zenders iptv',
      'hbo iptv',
      'showtime iptv',
      'espn iptv',
      'amerikaanse tv zenders iptv',
      'abc cbs nbc iptv',
      'beste iptv provider',
    ],
    channels: [
      // Broadcast-netwerken
      { name: 'ABC East HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Groot Amerikaans netwerk met primetime-hits, live sport en late night-shows.', popular: true },
      { name: 'ABC West HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Westkust-ABC-feed voor kijkers in de Pacific-tijdzone.' },
      { name: 'CBS East HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Amerikaanse dramahits, NFL Sunday-verslaggeving en primetime-entertainment.', popular: true },
      { name: 'CBS West HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Westkust-CBS-feed voor kijkers in de Pacific-tijdzone.' },
      { name: 'NBC East HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Amerikaanse variétéshows, live sport en bekroonde drama\'s.', popular: true },
      { name: 'NBC West HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Westkust-NBC-feed voor kijkers in de Pacific-tijdzone.' },
      { name: 'FOX East HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Amerikaanse primetime-hits, NFL Football en grote entertainmentevenementen.', popular: true },
      { name: 'FOX West HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Westkust-FOX-feed voor kijkers in de Pacific-tijdzone.' },
      { name: 'The CW HD', quality: 'FHD 60FPS', genre: 'Amerikaanse broadcast', country: 'US', description: 'Superheldenseries, tienerdrama\'s en nieuw Amerikaans entertainment.' },
      { name: 'PBS HD', quality: 'FHD 60FPS', genre: 'Amerikaanse publieke omroep', country: 'US', description: 'Amerikaanse publieke omroep met documentaires en educatieve programma\'s.' },
      // Premium kabel
      { name: 'HBO East HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'HBO originele series, blockbuster-films en premium entertainment.', popular: true },
      { name: 'HBO West HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Westkust-HBO-feed met dezelfde premium programmering.' },
      { name: 'HBO 2 HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Tweede HBO-zender met extra films en originals.' },
      { name: 'HBO Signature HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Extra HBO-feed met toporiginele series en films.' },
      { name: 'HBO Family HD', quality: 'FHD 60FPS', genre: 'Premium familie', country: 'US', description: 'Familievriendelijke HBO-programmering inclusief animatiefilms.' },
      { name: 'HBO Comedy HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'US', description: 'HBO komediespecials, stand-up en komische series.' },
      { name: 'Showtime East HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Showtime originals, hitfilms en grote boksevenementen.', popular: true },
      { name: 'Showtime 2 HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Extra Showtime-feed met films en originele series.' },
      { name: 'Showtime Showcase HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Showcase-feed met premium films en drama\'s.' },
      { name: 'Starz East HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Starz originele series, first run-films en premium drama\'s.' },
      { name: 'Starz Encore HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Encore-zender met klassieke films en bibliotheekinhoud.' },
      { name: 'Cinemax HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'Cinemax films, actieseries en late night-programmering.' },
      { name: 'AMC HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'AMC originele series waaronder The Walking Dead-universum en Better Call Saul.', popular: true },
      { name: 'AMC+ HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'AMC Plus streaminginhoud en exclusieve originele series.' },
      { name: 'FX HD', quality: 'FHD 60FPS', genre: 'Premium kabel', country: 'US', description: 'FX originele drama\'s, komedies en anthologieseries.' },
      { name: 'FXX HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'US', description: 'FXX komedies en exclusieve inhoud uit de FX-familie.' },
      // Nieuws
      { name: 'CNN USA HD', quality: 'FHD 60FPS', genre: 'Amerikaans nieuws', country: 'US', description: 'Amerikaanse en internationale nieuwsverslaggeving 24/7 vanuit CNN-hoofdkwartier.', popular: true },
      { name: 'CNN International HD', quality: 'FHD 60FPS', genre: 'Internationaal nieuws', country: 'US', description: 'Mondiale nieuwsverslaggeving van CNN International met wereldwijde bureaus.' },
      { name: 'MSNBC HD', quality: 'FHD 60FPS', genre: 'Amerikaans nieuws', country: 'US', description: 'Progressieve Amerikaanse nieuwsverslaggeving, politieke analyses en commentaar.' },
      { name: 'FOX News HD', quality: 'FHD 60FPS', genre: 'Amerikaans nieuws', country: 'US', description: 'Amerikaans nieuws, politieke debatten en opinieprogrammering.' },
      { name: 'CNBC HD', quality: 'FHD 60FPS', genre: 'Zakelijk nieuws', country: 'US', description: 'Zakelijk nieuws, marktanalyses en financiële programmering.' },
      { name: 'Bloomberg TV HD', quality: 'FHD 60FPS', genre: 'Zakelijk nieuws', country: 'US', description: 'Mondiale zakelijke en financiële marktverslaggeving 24 uur per dag.' },
      // Entertainment
      { name: 'USA Network HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'USA Network originele series, WWE en entertainmentprogrammering.' },
      { name: 'TNT HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'TNT originele drama\'s, films en NBA-verslaggeving.' },
      { name: 'TBS HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'US', description: 'TBS sitcoms, komedie en Major League Baseball-verslaggeving.' },
      { name: 'Bravo HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'US', description: 'Bravo realityshows, Real Housewives-franchise en lifestyle.' },
      { name: 'E! Entertainment HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Celebrity-nieuws, entertainment en popcultuurprogrammering.' },
      { name: 'Comedy Central HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'US', description: 'Comedy Central shows, stand-up specials en satire.' },
      { name: 'Syfy HD', quality: 'FHD 60FPS', genre: 'Sci-fi', country: 'US', description: 'Sciencefiction-, fantasy- en bovennatuurlijke programmering.' },
      { name: 'Paramount Network HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Yellowstone, films en entertainmentprogrammering.' },
      { name: 'MTV HD', quality: 'FHD 60FPS', genre: 'Muziek & reality', country: 'US', description: 'Muziekvideo\'s, realityshows en jeugdentertainment.' },
      { name: 'VH1 HD', quality: 'FHD 60FPS', genre: 'Muziek', country: 'US', description: 'Muziekprogrammering, realityshows en popcultuur.' },
      { name: 'BET HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Black Entertainment Television met muziek, komedie en drama\'s.' },
      { name: 'Food Network HD', quality: 'FHD 60FPS', genre: 'Eten', country: 'US', description: 'Kookprogramma\'s, competities en celebrity-chef-programmering.' },
      { name: 'HGTV HD', quality: 'FHD 60FPS', genre: 'Huis & tuin', country: 'US', description: 'Huisverbetering, renovatie en vastgoedprogrammering.' },
      { name: 'Travel Channel HD', quality: 'FHD 60FPS', genre: 'Reizen', country: 'US', description: 'Reis-, avontuur- en ontdekkingsdocumentaires.' },
      { name: 'History Channel HD', quality: 'FHD 60FPS', genre: 'Geschiedenis', country: 'US', description: 'Historische documentaires, realityshows en educatieve inhoud.' },
      { name: 'Discovery Channel US HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'US', description: 'Discovery-programmering waaronder Gold Rush, Deadliest Catch en meer.' },
      { name: 'National Geographic HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'US', description: 'Natuur-, wetenschaps- en ontdekkingsdocumentaires van Nat Geo.' },
      { name: 'Animal Planet US HD', quality: 'FHD 60FPS', genre: 'Natuur', country: 'US', description: 'Dierendocumentaires, wildlife en huisdierprogrammering.' },
      { name: 'IFC HD', quality: 'FHD 60FPS', genre: 'Independent film', country: 'US', description: 'Independent films, cultkomedie en originele series.' },
      { name: 'Sundance TV HD', quality: 'FHD 60FPS', genre: 'Independent film', country: 'US', description: 'Independent film en originele dramaprogrammering.' },
      { name: 'Oxygen HD', quality: 'FHD 60FPS', genre: 'True crime', country: 'US', description: 'True crime, onderzoek en misdaaddocumentaire-programmering.' },
      { name: 'A&E HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'US', description: 'Reality-tv, documentaire en misdaadprogrammering van A&E.' },
      { name: 'Lifetime HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'US', description: 'Lifetime originele films, drama\'s en realityprogrammering.' },
      { name: 'Hallmark Channel HD', quality: 'FHD 60FPS', genre: 'Familie', country: 'US', description: 'Hallmark originele films, familie-entertainment en feestdagspecials.' },
      { name: 'OWN HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'US', description: 'Oprah Winfrey Network met lifestyle-, reality- en inspiratieshows.' },
      { name: 'Disney Channel US HD', quality: 'FHD 60FPS', genre: 'Kinderen', country: 'US', description: 'Disney Channel originele series en familieprogrammering.' },
      { name: 'Freeform HD', quality: 'FHD 60FPS', genre: 'Jeugd', country: 'US', description: 'Jeugdgerichte drama\'s, komedies en originele series.' },
    ],
    faqs: [
      {
        question: 'Kan ik HBO, Showtime en premium Amerikaanse zenders overal kijken?',
        answer:
          'Ja. Onze Amerikaanse line-up bevat premium Amerikaanse zenders zoals HBO, Showtime, Starz, AMC en meer. Allemaal inbegrepen in je abonnement zonder extra kosten.',
      },
      {
        question: 'Zijn live Amerikaanse sportzenders zoals ESPN en NFL Network inbegrepen?',
        answer:
          'Absoluut. Je krijgt volledige toegang tot ESPN, ESPN 2, FS1, NFL Network, NBA TV en elke grote Amerikaanse sportzender. Perfect om NFL-, NBA-, MLB- en UFC-evenementen te volgen.',
      },
    ],
  },

  // =========================================================================
  // 3. UK & EUROPA-ZENDERS
  // =========================================================================
  {
    slug: 'europe',
    name: 'UK & Europa-zenders',
    totalChannels: 8000,
    description:
      'Elke grote Europese omroep. BBC, ITV, Channel 4, Sky, TF1, France 2, ARD, ZDF, RAI, TVE, RTL en premium zenders uit het Verenigd Koninkrijk, Frankrijk, Duitsland, Spanje, Italië en heel Europa.',
    longDescription:
      'Bekijk televisie uit heel Europa met onze complete UK- en Europa-line-up. Van het Verenigd Koninkrijk (BBC, ITV, Channel 4, Channel 5, Sky) tot Frankrijk (TF1, France 2, Canal+), Duitsland (ARD, ZDF, RTL), Spanje (TVE, Antena 3), Italië (RAI, Mediaset) en elk ander groot Europees land. Perfect voor Europese expats en voor kijkers die van Britse en Europese inhoud houden.',
    keywords: [
      'uk zenders iptv',
      'bbc iptv',
      'itv iptv',
      'sky sports iptv',
      'europese zenders iptv',
      'franse zenders iptv',
      'duitse zenders iptv',
      'beste iptv provider',
    ],
    channels: [
      // UK — BBC
      { name: 'BBC One HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'De Britse publieke vlaggenschipzender met nieuws, toptopdrama en live sport.', popular: true },
      { name: 'BBC Two HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Documentaires, komedie en achtergrondprogrammering uit het VK.' },
      { name: 'BBC Three HD', quality: 'FHD 60FPS', genre: 'Jeugd', country: 'UK', description: 'Jeugdgerichte BBC-zender met nieuwe komedie en drama.' },
      { name: 'BBC Four HD', quality: 'FHD 60FPS', genre: 'Cultuur', country: 'UK', description: 'Kunst-, cultuur- en diepgaande documentaireprogrammering.' },
      { name: 'BBC News HD', quality: 'FHD 60FPS', genre: 'Brits nieuws', country: 'UK', description: 'BBC News met wereldwijde verslaggeving vanuit Londen en over de hele wereld.' },
      { name: 'BBC World News HD', quality: 'FHD 60FPS', genre: 'Internationaal nieuws', country: 'UK', description: 'BBC mondiale nieuwszender met internationale correspondenten.' },
      { name: 'CBBC HD', quality: 'FHD 60FPS', genre: 'Kinderen', country: 'UK', description: 'Britse kinderprogrammering met CBBC-shows.' },
      { name: 'CBeebies HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'UK', description: 'BBC peuterprogrammering met educatieve inhoud voor jonge kijkers.' },
      // UK — ITV
      { name: 'ITV 1 HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Het grootste Britse commerciële netwerk met topentertainment en shows.', popular: true },
      { name: 'ITV 2 HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'ITV2 met reality-tv, entertainment en jeugdgerichte shows.' },
      { name: 'ITV 3 HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'UK', description: 'ITV3 met klassieke Britse drama\'s en misdaadseries.' },
      { name: 'ITV 4 HD', quality: 'FHD 60FPS', genre: 'Sport & factual', country: 'UK', description: 'ITV4 met sport, factual-programmering en mannengerichte inhoud.' },
      { name: 'ITVBe HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'UK', description: 'ITVBe met reality-, lifestyle- en entertainmentprogrammering.' },
      // UK — Channel 4 en 5
      { name: 'Channel 4 HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Britse kwaliteitsfilms, documentaires en bekroonde series.' },
      { name: 'E4 HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'E4 met jeugdentertainment, komedie en Amerikaanse imports.' },
      { name: 'More4 HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'UK', description: 'More4 met documentaires, drama en factual-programmering.' },
      { name: 'Film4 HD', quality: 'FHD 60FPS', genre: 'Films', country: 'UK', description: 'Film4 met independent films, bioscoopklassiekers en premières.' },
      { name: 'Channel 5 HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Brits entertainment, factual-programmering en origineel drama.' },
      { name: '5Star HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'UK', description: 'Drama, Amerikaanse imports en entertainmentprogrammering op 5Star.' },
      // UK — Sky
      { name: 'Sky Witness HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Britse drama\'s, Amerikaanse misdaadshows en premium entertainmentseries.' },
      { name: 'Sky Atlantic HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'HBO-originals en premium drama\'s exclusief op Sky Atlantic.' },
      { name: 'Sky Max HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'Sky Max met premium drama\'s, komedies en entertainment.' },
      { name: 'Sky Comedy HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'UK', description: 'Sky Comedy met sitcoms, stand-up en komedieseries.' },
      { name: 'Sky Cinema Premiere HD', quality: 'FHD 60FPS', genre: 'Verenigd Koninkrijk', country: 'UK', description: 'Britse filmzender met elke week gloednieuwe bioscoopreleases.' },
      { name: 'Sky Cinema Action HD', quality: 'FHD 60FPS', genre: 'Actie', country: 'UK', description: 'Actiefilms, thrillers en blockbusters op Sky Cinema.' },
      { name: 'Sky Cinema Family HD', quality: 'FHD 60FPS', genre: 'Familie', country: 'UK', description: 'Familievriendelijke films en animatiefilms op Sky Cinema.' },
      { name: 'Sky News HD', quality: 'FHD 60FPS', genre: 'Brits nieuws', country: 'UK', description: 'Britse nieuwszender met breaking coverage en analyses.' },
      { name: 'Sky History HD', quality: 'FHD 60FPS', genre: 'Geschiedenis', country: 'UK', description: 'Geschiedenisdocumentaires en factual-programmering op Sky History.' },
      { name: 'Sky Nature HD', quality: 'FHD 60FPS', genre: 'Natuur', country: 'UK', description: 'Natuurdocumentaires en wildlife-programmering.' },
      { name: 'Sky Arts HD', quality: 'FHD 60FPS', genre: 'Kunst', country: 'UK', description: 'Kunst-, muziek- en cultuurprogrammering van Sky Arts.' },
      // UK — Overig
      { name: 'Dave HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'UK', description: 'Dave komediezender met panelshows, komedieseries en Britse humor.' },
      { name: 'Gold HD', quality: 'FHD 60FPS', genre: 'Klassieke komedie', country: 'UK', description: 'Klassieke Britse komedieseries en retro-entertainment.' },
      { name: 'W HD', quality: 'FHD 60FPS', genre: 'Vrouwenlifestyle', country: 'UK', description: 'Vrouwengerichte programmering met drama, reality en lifestyle.' },
      { name: 'Alibi HD', quality: 'FHD 60FPS', genre: 'Misdaaddrama', country: 'UK', description: 'Misdaaddrama\'s, detectivesseries en mysteryprogrammering.' },
      // Frankrijk
      { name: 'TF1 HD', quality: 'FHD 60FPS', genre: 'Frankrijk', country: 'EU', description: 'Frankrijks grootste tv-netwerk met live sport, series en films.', popular: true },
      { name: 'France 2 HD', quality: 'FHD 60FPS', genre: 'Frankrijk', country: 'EU', description: 'Franse publieke omroep met Roland Garros- en Tour de France-verslaggeving.' },
      { name: 'France 3 HD', quality: 'FHD 60FPS', genre: 'Frankrijk', country: 'EU', description: 'Regionale Franse programmering, nieuws en nationaal entertainment.' },
      { name: 'France 5 HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'EU', description: 'Franse documentaire-, cultuur- en educatieve programmering.' },
      { name: 'M6 HD', quality: 'FHD 60FPS', genre: 'Frankrijk', country: 'EU', description: 'Frans entertainmentsnetwerk met realityshows, films en series.' },
      { name: 'Canal+ HD', quality: 'FHD 60FPS', genre: 'Frankrijk', country: 'EU', description: 'Premium Franse zender met films, sport en originele series.' },
      { name: 'Canal+ Sport HD', quality: 'FHD 60FPS', genre: 'Franse sport', country: 'EU', description: 'Premium Franse sportzender met voetbal- en rugbyverslaggeving.' },
      { name: 'Canal+ Cinema HD', quality: 'FHD 60FPS', genre: 'Franse cinema', country: 'EU', description: 'Franse en internationale cinema op premium Canal+ Cinema.' },
      // Duitsland
      { name: 'ARD Das Erste', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duitse publieke vlaggenschipzender met Tagesschau-nieuws en Bundesliga-voetbal.', popular: true },
      { name: 'ZDF HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duitse kwaliteitstelevisie met documentaires en live sport.' },
      { name: 'RTL HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duitse commerciële leider met entertainment, sport en nieuws.' },
      { name: 'Sat.1 HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duits entertainment met films, shows en live sportevenementen.' },
      { name: 'ProSieben HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duits entertainmentsnetwerk met Amerikaanse imports en realityshows.' },
      { name: 'ZDF Neo HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'ZDF Neo met documentaires, komedie en jeugdgerichte programmering.' },
      { name: '3sat HD', quality: 'FHD 60FPS', genre: 'Duitsland', country: 'EU', description: 'Duitstalige cultuurprogrammering, documentaires en wetenschapsshows.' },
      // Spanje
      { name: 'La 1 HD', quality: 'FHD 60FPS', genre: 'Spanje', country: 'EU', description: 'Spaanse nationale zender met nieuws, entertainment en La Liga-verslaggeving.' },
      { name: 'La 2 HD', quality: 'FHD 60FPS', genre: 'Spanje', country: 'EU', description: 'Spaanse publieke zender met documentaires, cultuur en educatie.' },
      { name: 'Antena 3 HD', quality: 'FHD 60FPS', genre: 'Spanje', country: 'EU', description: 'Spaans commercieel netwerk met series, films en realityshows.' },
      { name: 'Telecinco HD', quality: 'FHD 60FPS', genre: 'Spanje', country: 'EU', description: 'Spaans entertainmentsnetwerk met reality-tv en drama\'s.' },
      { name: 'Movistar Plus HD', quality: 'FHD 60FPS', genre: 'Spanje', country: 'EU', description: 'Spaanse premiumzender met films, series en La Liga-voetbal.' },
      { name: 'Movistar Deportes HD', quality: 'FHD 60FPS', genre: 'Spaanse sport', country: 'EU', description: 'Spaanse sportzender met La Liga- en internationale verslaggeving.' },
      // Italië
      { name: 'Rai 1 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Italië\'s publieke vlaggenschipzender met nieuws en entertainment.', popular: true },
      { name: 'Rai 2 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Italiaanse publieke omroep met sport, series en entertainment.' },
      { name: 'Rai 3 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Italiaanse regionale programmering, cultuur en nieuws.' },
      { name: 'Canale 5 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Mediaset-vlaggenschip met Italiaanse drama\'s, realityshows en films.' },
      { name: 'Italia 1 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Italiaanse jeugdgerichte zender met animatie en sport.' },
      { name: 'Rete 4 HD', quality: 'FHD 60FPS', genre: 'Italië', country: 'EU', description: 'Italiaanse zender met films, drama\'s en documentaireprogrammering.' },
      { name: 'Sky Sport Italia HD', quality: 'FHD 60FPS', genre: 'Italiaanse sport', country: 'EU', description: 'Italiaanse sportzender met Serie A, Champions League en Formule 1.' },
      // Overig Europa
      { name: 'RTP 1 HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portugese publieke omroep met nieuws, sport en entertainment.' },
      { name: 'RTP 2 HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portugese culturele en documentaireprogrammering.' },
      { name: 'SIC HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portugees commercieel netwerk met telenovela\'s en entertainment.' },
      { name: 'NPO 1 HD', quality: 'FHD 60FPS', genre: 'Nederland', country: 'EU', description: 'Nederlandse publieke omroep met nieuws en entertainmentprogrammering.' },
      { name: 'RTL 4 HD', quality: 'FHD 60FPS', genre: 'Nederland', country: 'EU', description: 'Nederlands commercieel netwerk met entertainment en realityshows.' },
      { name: 'SVT 1 HD', quality: 'FHD 60FPS', genre: 'Zweden', country: 'EU', description: 'Zweedse publieke omroep met nieuws, drama en cultuurprogrammering.' },
      { name: 'TV4 Sweden HD', quality: 'FHD 60FPS', genre: 'Zweden', country: 'EU', description: 'Zweedse commerciële zender met entertainment en sport.' },
      { name: 'NRK 1 HD', quality: 'FHD 60FPS', genre: 'Noorwegen', country: 'EU', description: 'Noorse publieke omroep met nieuws, cultuur en sport.' },
      { name: 'DR1 HD', quality: 'FHD 60FPS', genre: 'Denemarken', country: 'EU', description: 'Deense publieke omroep met nieuws, drama en entertainment.' },
      { name: 'YLE TV1 HD', quality: 'FHD 60FPS', genre: 'Finland', country: 'EU', description: 'Finse publieke omroep met nieuws en cultuurprogrammering.' },
    ],
    faqs: [
      {
        question: 'Kan ik Britse en Europese zenders overal vandaan kijken?',
        answer:
          'Ja. Onze UK- en Europa-line-up bevat elke grote omroep uit het Verenigd Koninkrijk, Frankrijk, Duitsland, Spanje, Italië en meer. Alles streamt in Full HD vanaf onze Londen-servernode met lage latency wereldwijd.',
      },
      {
        question: 'Is Sky Sports inbegrepen in deze categorie?',
        answer:
          'Sky Sports-zenders verschijnen in de categorie Sport samen met andere mondiale sportnetwerken, maar de standaard Britse entertainmentzenders (Sky Witness, Sky Atlantic, Sky Cinema) staan hier vermeld.',
      },
    ],
  },

  // =========================================================================
  // 4. CANADESE ZENDERS
  // =========================================================================
  {
    slug: 'canadian',
    name: 'Canadese zenders',
    totalChannels: 500,
    description:
      'Complete Canadese omroepline-up. CBC, CTV, Global, Citytv, TSN, Sportsnet, TVA, Radio-Canada en regionale zenders met EPG en catch up.',
    longDescription:
      'Het volledige aanbod van Canadese televisie voor expats en kijkers die van Canadese inhoud houden. CBC, CTV, Global, Citytv, TSN, Sportsnet, plus volledige Franse verslaggeving van TVA en Radio-Canada. Of je nu een expat in Toronto bent of gewoon fan van Canadese programmering, je krijgt de complete line-up in Full HD.',
    keywords: [
      'canadese tv iptv',
      'cbc iptv',
      'ctv iptv',
      'tsn iptv',
      'sportsnet iptv',
      'canadese zenders iptv',
      'beste iptv provider',
    ],
    channels: [
      // CBC-familie
      { name: 'CBC HD', quality: 'FHD 60FPS', genre: 'Nationale publieke omroep', country: 'CA', description: 'CBC News, The National, Hockey Night in Canada en Canadese originals.' },
      { name: 'CBC News Network HD', quality: 'FHD 60FPS', genre: '24/7 nieuws', country: 'CA', description: 'Doorlopende Canadese nieuwsverslaggeving, live politieke evenementen en breaking stories.' },
      { name: 'CBC Gem Originals', quality: 'FHD 60FPS', genre: 'Originele series', country: 'CA', description: 'Canadese originele drama\'s, komedies en documentaires van CBC Gem.' },
      { name: 'Ici Radio-Canada Télé HD', quality: 'FHD 60FPS', genre: 'Franse publieke omroep', country: 'CA', description: 'Franstalige publieke omroep met drama\'s en nieuws.' },
      { name: 'ICI RDI HD', quality: 'FHD 60FPS', genre: 'Frans nieuws', country: 'CA', description: 'Frans-Canadese nieuwszender met continue verslaggeving van nationale evenementen.' },
      { name: 'ICI Explora HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'CA', description: 'Franstalige documentaires, wetenschap en natuurprogrammering.' },
      // CTV-familie
      { name: 'CTV HD', quality: 'FHD 60FPS', genre: 'Nationale commerciële omroep', country: 'CA', description: 'CTV National News, primetime-drama\'s en grote live sportverslaggeving.' },
      { name: 'CTV News Channel HD', quality: 'FHD 60FPS', genre: '24/7 nieuws', country: 'CA', description: 'Doorlopende Canadese en internationale nieuwsverslaggeving met live reportages.' },
      { name: 'CTV 2 HD', quality: 'FHD 60FPS', genre: 'Regionaal entertainment', country: 'CA', description: 'Regionale CTV-programmering, primetime-entertainment en lokaal nieuws.' },
      { name: 'CTV Comedy HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'CA', description: 'Comedy Channel met sitcoms en stand-up specials.' },
      { name: 'CTV Drama HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'CA', description: 'Drama Channel met misdaad-, mystery- en dramaserie\'s.' },
      { name: 'CTV Life HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'CA', description: 'Lifestyle-programmering waaronder huis, eten en reizen.' },
      { name: 'CTV Sci-Fi HD', quality: 'FHD 60FPS', genre: 'Sci-fi', country: 'CA', description: 'Sciencefiction-, fantasy- en bovennatuurlijke programmering.' },
      // Global-familie
      { name: 'Global TV HD', quality: 'FHD 60FPS', genre: 'Nationale commerciële omroep', country: 'CA', description: 'Global National-nieuws, primetime-drama\'s en blockbuster-filmnachten.' },
      { name: 'Global News HD', quality: 'FHD 60FPS', genre: '24/7 nieuws', country: 'CA', description: 'Canadees nieuws, politiek en internationale verslaggeving 24 uur per dag.' },
      { name: 'Global News BC HD', quality: 'FHD 60FPS', genre: 'Regionaal nieuws', country: 'CA', description: 'British Columbia-nieuwsverslaggeving van Global News BC.' },
      { name: 'Global News Toronto HD', quality: 'FHD 60FPS', genre: 'Regionaal nieuws', country: 'CA', description: 'Nieuwsverslaggeving uit de Toronto-regio van Global News Toronto.' },
      // Citytv-familie
      { name: 'Citytv HD', quality: 'FHD 60FPS', genre: 'Urbaan entertainment', country: 'CA', description: 'Citytv originele shows, primetime-entertainment en regionaal ochtendnieuws.' },
      { name: 'CityNews 24/7 HD', quality: 'FHD 60FPS', genre: 'Lokaal nieuws', country: 'CA', description: 'Lokale nieuwsverslaggeving uit Toronto, Vancouver, Calgary en andere Canadese steden.' },
      { name: 'Citytv Vancouver HD', quality: 'FHD 60FPS', genre: 'Regionaal', country: 'CA', description: 'Vancouver regionale programmering en nieuws van Citytv.' },
      // Frans
      { name: 'TVA HD', quality: 'FHD 60FPS', genre: 'Frans-Canadees', country: 'CA', description: 'Het top Franstalige Canadese netwerk met primetime-drama\'s en nieuws.' },
      { name: 'TVA Nouvelles HD', quality: 'FHD 60FPS', genre: 'Frans nieuws', country: 'CA', description: 'Rond de klok Frans-Canadese nieuwsverslaggeving van TVA Nouvelles.' },
      { name: 'V Télé HD', quality: 'FHD 60FPS', genre: 'Frans entertainment', country: 'CA', description: 'Quebec-entertainment, reality-tv en Franstalige series.' },
      { name: 'Noovo HD', quality: 'FHD 60FPS', genre: 'Frans commercieel', country: 'CA', description: 'Populaire Quebec-programmering, talkshows en internationale series.' },
      { name: 'RDS HD', quality: 'FHD 60FPS', genre: 'Franse sport', country: 'CA', description: 'Réseau des Sports met Franstalige sportverslaggeving.' },
      { name: 'TVA Sports HD', quality: 'FHD 60FPS', genre: 'Franse sport', country: 'CA', description: 'Franstalige Canadese sportzender met NHL- en andere verslaggeving.' },
      // Specialty en entertainment
      { name: 'TSN SportsCentre HD', quality: 'FHD 60FPS', genre: 'Sportnieuws', country: 'CA', description: 'Canada\'s vlaggenschip sportnieuwsprogramma en dagelijkse highlights.' },
      { name: 'The Weather Network CA HD', quality: 'FHD 60FPS', genre: 'Weer', country: 'CA', description: 'Canadese weersverwachtingen, stormtracking en klimaatverslaggeving.' },
      { name: 'Slice HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'CA', description: 'Reality-tv, drama en lifestyle-programmering op Slice.' },
      { name: 'HGTV Canada HD', quality: 'FHD 60FPS', genre: 'Huis & tuin', country: 'CA', description: 'Canadese huisverbetering en designprogrammering.' },
      { name: 'Food Network Canada HD', quality: 'FHD 60FPS', genre: 'Eten', country: 'CA', description: 'Canadese kookprogramma\'s en voedselcompetitieprogrammering.' },
      { name: 'W Network HD', quality: 'FHD 60FPS', genre: 'Vrouwenlifestyle', country: 'CA', description: 'Vrouwengerichte programmering met drama, reality en lifestyle.' },
      { name: 'Showcase HD', quality: 'FHD 60FPS', genre: 'Premium drama', country: 'CA', description: 'Premium drama\'s en exclusieve series op Canadese Showcase.' },
      { name: 'Space HD', quality: 'FHD 60FPS', genre: 'Sci-fi', country: 'CA', description: 'Canadese sciencefiction-, fantasy- en bovennatuurlijke programmering.' },
      { name: 'Discovery Canada HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'CA', description: 'Canadese Discovery-programmering met natuur- en factual-shows.' },
      { name: 'History Canada HD', quality: 'FHD 60FPS', genre: 'Geschiedenis', country: 'CA', description: 'Canadese geschiedenisdocumentaires en historische programmering.' },
      { name: 'National Geographic Canada HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'CA', description: 'Natuur-, wetenschaps- en ontdekkingsdocumentaires voor Canadese kijkers.' },
      { name: 'CTV Sci-Fi Channel HD', quality: 'FHD 60FPS', genre: 'Sci-fi', country: 'CA', description: 'Sciencefictionseries en fantasyprogrammering op CTV Sci-Fi.' },
      { name: 'MuchMusic HD', quality: 'FHD 60FPS', genre: 'Muziek', country: 'CA', description: 'Canadese muziekzender met video\'s, hitlijsten en muzieknieuws.' },
      { name: 'MTV Canada HD', quality: 'FHD 60FPS', genre: 'Muziek & reality', country: 'CA', description: 'Canadese MTV met muziek, realityshows en entertainment.' },
      { name: 'Family Channel HD', quality: 'FHD 60FPS', genre: 'Familie', country: 'CA', description: 'Familieprogrammering, kindershows en tienersdrama\'s voor Canadese kijkers.' },
      { name: 'YTV HD', quality: 'FHD 60FPS', genre: 'Jeugd', country: 'CA', description: 'Canadees jeugdnetwerk met animatie en tienerentertainment.' },
      { name: 'Teletoon HD', quality: 'FHD 60FPS', genre: 'Animatie', country: 'CA', description: 'Canadese animatiezender met originele en internationale tekenfilms.' },
      { name: 'Treehouse HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'CA', description: 'Peuterprogrammering in Engels en Frans voor de jongste kijkers.' },
      { name: 'Cartoon Network Canada HD', quality: 'FHD 60FPS', genre: 'Animatie', country: 'CA', description: 'Canadees Cartoon Network met animatie en jeugdprogrammering.' },
      { name: 'CBC News Explore HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'CA', description: 'Documentaire- en onderzoeksprogrammering van CBC News.' },
      { name: 'OutTV HD', quality: 'FHD 60FPS', genre: 'LGBTQ+', country: 'CA', description: 'LGBTQ+-gerichte programmering, drama, komedie en documentaires.' },
      { name: 'Hollywood Suite HD', quality: 'FHD 60FPS', genre: 'Klassieke film', country: 'CA', description: 'Klassieke films, cultfilms en cinema uit de jaren 70 tot 2000.' },
      { name: 'Silver Screen Classics HD', quality: 'FHD 60FPS', genre: 'Klassieke film', country: 'CA', description: 'Hollywoodfilms uit de gouden eeuw, klassiekers en cinemaparels.' },
      { name: 'Rewind HD', quality: 'FHD 60FPS', genre: 'Klassieke tv', country: 'CA', description: 'Klassieke Canadese en internationale televisieseries uit elk decennium.' },
      { name: 'DejaView HD', quality: 'FHD 60FPS', genre: 'Klassieke tv', country: 'CA', description: 'Retro-televisieprogrammering en klassieke Canadese series.' },
      { name: 'Cosmopolitan TV HD', quality: 'FHD 60FPS', genre: 'Vrouwenlifestyle', country: 'CA', description: 'Vrouwengerichte lifestyle-, mode- en entertainmentprogrammering.' },
      { name: 'Gusto TV HD', quality: 'FHD 60FPS', genre: 'Eten & reizen', country: 'CA', description: 'Canadese eten- en reisprogrammering van Gusto.' },
      { name: 'CTV Life Channel HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'CA', description: 'Canadese lifestyle-, kook- en huisprogrammering.' },
      { name: 'Cottage Life HD', quality: 'FHD 60FPS', genre: 'Buitenleven', country: 'CA', description: 'Canadees buitenleven, cottages en lifestyle-programmering.' },
    ],
    faqs: [
      {
        question: 'Kan ik Canadese zenders bekijken terwijl ik in het buitenland woon?',
        answer:
          'Ja. Onze IPTV-streams werken wereldwijd zonder geografische beperkingen. Canadese expats kunnen CBC, CTV, Global en alle Canadese zenders vanaf elke locatie bekijken.',
      },
      {
        question: 'Zijn Frans-Canadese zenders inbegrepen?',
        answer:
          'Absoluut. Onze Canadese line-up bevat volledige Franstalige verslaggeving van TVA, Radio-Canada, ICI RDI en meer, allemaal in Full HD.',
      },
    ],
  },

  // =========================================================================
  // 5. AUSTRALISCHE ZENDERS
  // =========================================================================
  {
    slug: 'australian',
    name: 'Australische zenders',
    totalChannels: 500,
    description:
      'De complete line-up van Australische publieke en commerciële netwerken in Full HD. Nine, Seven, ABC, SBS, Network 10, Fox8 en regionale zenders met 7-daagse catch up en EPG.',
    longDescription:
      'Elk huishouden verdient volledige toegang tot lokaal nieuws, regionale uitzendingen en nationaal entertainment. Onze Australische zenderline-up bevat elke grote omroep. Nine Network, Seven, ABC, SBS, Network 10, Fox8, plus regionale netwerken uit elke staat en territorium. Perfect voor Australische expats die hun thuisnieuws en entertainment in Full HD willen.',
    keywords: [
      'australische tv iptv',
      'nine network iptv',
      'seven network iptv',
      'abc iview iptv',
      'australische zenders iptv',
      'sbs iptv',
      'network 10 iptv',
      'beste iptv provider',
    ],
    channels: [
      { name: 'Nine Network HD', quality: 'FHD 60FPS', genre: 'Nationale commerciële omroep', country: 'AU', description: 'Nine News, 60 Minutes en Australische entertainmentprogrammering.', popular: true },
      { name: '9Go! HD', quality: 'FHD 60FPS', genre: 'Jeugdentertainment', country: 'AU', description: 'Jeugdgericht entertainment, komedie en realityprogrammering.' },
      { name: '9Gem HD', quality: 'FHD 60FPS', genre: 'Drama & sport', country: 'AU', description: 'Klassiek drama, films en Australische sport.' },
      { name: '7 Network HD', quality: 'FHD 60FPS', genre: 'Nationale commerciële omroep', country: 'AU', description: 'Seven News, Home and Away en Australisch entertainment.', popular: true },
      { name: '7TWO HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'AU', description: 'Lifestyle, reality en klassieke Australische tv-series.' },
      { name: '7mate HD', quality: 'FHD 60FPS', genre: 'Multi-entertainment', country: 'AU', description: 'Actie, sport en mannengericht entertainmentprogrammering.' },
      { name: 'Network 10 HD', quality: 'FHD 60FPS', genre: 'Nationale commerciële omroep', country: 'AU', description: 'Masterchef, I\'m a Celebrity, Have You Been Paying Attention en meer.', popular: true },
      { name: '10 Bold HD', quality: 'FHD 60FPS', genre: 'Drama & sport', country: 'AU', description: 'Misdaaddrama\'s, motorsport en internationale series op 10 Bold.' },
      { name: 'ABC TV HD', quality: 'FHD 60FPS', genre: 'Nationale publieke omroep', country: 'AU', description: 'ABC News, Four Corners, Australian Story en kwaliteitsvolle nationale programmering.', popular: true },
      { name: 'ABC News 24 HD', quality: 'FHD 60FPS', genre: '24/7 nieuws', country: 'AU', description: 'Rond de klok Australische en internationale nieuwsverslaggeving van ABC News.' },
      { name: 'SBS HD', quality: 'FHD 60FPS', genre: 'Nationale publieke omroep', country: 'AU', description: 'SBS News, documentaires, wereldcinema en multiculturele programmering.' },
      { name: 'Fox8 HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'AU', description: 'Populaire realityshows, dramaserie\'s en komedie op Australische Fox8.' },
      { name: 'Fox Classics HD', quality: 'FHD 60FPS', genre: 'Klassieke tv', country: 'AU', description: 'Klassieke Australische en internationale televisieseries uit elk tijdperk.' },
      { name: 'Fox Showcase HD', quality: 'FHD 60FPS', genre: 'Premium drama', country: 'AU', description: 'HBO-originals en premium drama\'s op Foxtel Showcase.' },
      { name: 'Fox Crime HD', quality: 'FHD 60FPS', genre: 'Misdaad', country: 'AU', description: 'Misdaaddrama\'s, onderzoeksshows en true crime-series.' },
      { name: 'Fox Comedy HD', quality: 'FHD 60FPS', genre: 'Komedie', country: 'AU', description: 'Komedieseries, stand-up specials en sitcoms van over de hele wereld.' },
      { name: 'BBC First HD', quality: 'FHD 60FPS', genre: 'Brits drama', country: 'AU', description: 'Premium Britse dramaserie\'s rechtstreeks van de BBC.' },
      { name: 'UKTV HD', quality: 'FHD 60FPS', genre: 'Britse komedie', country: 'AU', description: 'Klassieke en moderne Britse komedie, drama en entertainment.' },
      { name: 'LifeStyle HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'AU', description: 'Huis-, eten- en lifestyle-programmering voor Australische kijkers.' },
      { name: 'Sky News Australia HD', quality: 'FHD 60FPS', genre: 'Nieuws', country: 'AU', description: 'Australisch nieuws, politieke analyses en opinieprogrammering.' },
      { name: 'Discovery Channel AU HD', quality: 'FHD 60FPS', genre: 'Documentaire', country: 'AU', description: 'Documentaireprogrammering waaronder Gold Rush, Mythbusters en meer.' },
      { name: 'NITV HD', quality: 'FHD 60FPS', genre: 'First Nations', country: 'AU', description: 'National Indigenous Television met nieuws, sport en cultuurprogrammering.', popular: true },
    ],
    faqs: [
      {
        question: 'Kan ik Australische zenders overal vandaan kijken?',
        answer:
          'Ja. Onze IPTV-streams werken wereldwijd zonder geografische beperkingen. Australische expats kunnen Nine, Seven, ABC, SBS en alle Australische zenders vanaf elke locatie bekijken.',
      },
      {
        question: 'Synchroniseert de EPG-gids correct met Australische tijdzones?',
        answer:
          'Ja. Onze EPG-tv-gids wordt automatisch elke 6 uur gesynchroniseerd en weerspiegelt nauwkeurig de Australische tijdzones van AWST in het westen tot AEDT in het oosten.',
      },
    ],
  },

  // =========================================================================
  // 6. AZIË & MIDDEN-OOSTEN-ZENDERS
  // =========================================================================
  {
    slug: 'asia-middle-east',
    name: 'Azië & Midden-Oosten-zenders',
    totalChannels: 12000,
    description:
      'De grootste selectie Aziatische en Midden-Oosterse televisie. CCTV, Zee TV, Star Plus, PTV, Geo TV, NHK, KBS, Al Jazeera en elke grote omroep uit China, India, Pakistan, Japan, Korea en het Midden-Oosten.',
    longDescription:
      'Onze categorie Azië en Midden-Oosten omvat meer dan 12.000 zenders uit elke grote regio. China (CCTV, CGTN), India (Zee, Star, Sony, Colors), Pakistan (PTV, Geo, ARY), Japan (NHK, Fuji TV), Korea (KBS, SBS, MBC), de Filipijnen (ABS-CBN, GMA), Vietnam, Thailand, Indonesië en het hele Midden-Oosten (Al Jazeera, MBC, Dubai TV, Rotana). Perfect voor expats en voor kijkers die van Aziatische inhoud houden.',
    keywords: [
      'aziatische zenders iptv',
      'indische zenders iptv',
      'chinese zenders iptv',
      'pakistaanse zenders iptv',
      'japanse zenders iptv',
      'koreaanse zenders iptv',
      'midden-oosten iptv',
      'beste iptv provider',
    ],
    channels: [
      // China
      { name: 'CCTV-1 HD', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: 'China\'s vlaggenschip nationale netwerk met nieuws en familie-entertainment.', popular: true },
      { name: 'CCTV-2 HD', quality: 'FHD 60FPS', genre: 'Chinese zaken', country: 'CN', description: 'Chinese zakelijke en financiële nieuwsprogrammering.' },
      { name: 'CCTV-3 HD', quality: 'FHD 60FPS', genre: 'Chinees entertainment', country: 'CN', description: 'Chinees entertainment, muziek en variétéshows.' },
      { name: 'CCTV-4 International', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: 'Internationale Chinese uitzendingen met cultuur, geschiedenis en wereldnieuws.' },
      { name: 'CCTV-5 Sports', quality: 'FHD 60FPS', genre: 'Chinese sport', country: 'CN', description: 'Chinese sportzender met NBA, voetbal en internationale evenementen.' },
      { name: 'CCTV-6 Movies', quality: 'FHD 60FPS', genre: 'Chinese cinema', country: 'CN', description: 'Chinese en internationale filmprogrammering.' },
      { name: 'CCTV-8 Drama', quality: 'FHD 60FPS', genre: 'Chinees drama', country: 'CN', description: 'Chinese drama\'s en serialprogrammering.' },
      { name: 'CCTV-13 News', quality: 'FHD 60FPS', genre: 'Chinees nieuws', country: 'CN', description: 'Chinese nieuwszender met binnenlandse en internationale verslaggeving.' },
      { name: 'CGTN English', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: '24/7 Engelstalig wereldnieuws en economische analyses uit Azië.' },
      { name: 'Phoenix TV Chinese', quality: 'FHD 60FPS', genre: 'Hongkong', country: 'CN', description: 'In Hongkong gevestigde Chinese nieuws- en entertainmentzender.' },
      // India
      { name: 'Zee TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Populair Hindi-entertainment, drama\'s en realityprogrammering.', popular: true },
      { name: 'Zee Cinema HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Rond de klok Bollywood-films en Indiase cinema-klassiekers.' },
      { name: 'Zee News HD', quality: 'FHD 60FPS', genre: 'Indiaas nieuws', country: 'IN', description: 'Indiase nieuwszender met binnenlandse en internationale verslaggeving.' },
      { name: 'Star Plus HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'India\'s topentertainmentnetwerk met serialdrama\'s en shows.', popular: true },
      { name: 'Star Gold HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Bollywood-films en Indiase cinema-programmering.' },
      { name: 'Star Sports India HD', quality: 'FHD 60FPS', genre: 'Indiase sport', country: 'IN', description: 'Live cricket, kabaddi en Indiase sportverslaggeving.', popular: true },
      { name: 'Sony Entertainment TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Indiase drama\'s, realityshows en entertainmentprogrammering.' },
      { name: 'Sony SAB HD', quality: 'FHD 60FPS', genre: 'Indiase komedie', country: 'IN', description: 'Indiase komedie, sitcoms en lichte entertainmentprogrammering.' },
      { name: 'Colors TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Hindi-entertainment met drama\'s, reality en komedieshows.' },
      { name: 'Colors Cineplex HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Hindi-cinema en Bollywood-films van Colors.' },
      { name: 'Sun TV HD', quality: 'FHD 60FPS', genre: 'Tamil', country: 'IN', description: 'Tamilstalig entertainment, drama\'s en komedieprogrammering.' },
      { name: 'KTV HD', quality: 'FHD 60FPS', genre: 'Tamil', country: 'IN', description: 'Tamil-cinema, films en entertainmentprogrammering.' },
      { name: 'Asianet HD', quality: 'FHD 60FPS', genre: 'Malayalam', country: 'IN', description: 'Malayalamstalig entertainment en serialprogrammering.' },
      // Pakistan
      { name: 'PTV Sports HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistan\'s vlaggenschip sportzender met cricket- en PSL-verslaggeving.', popular: true },
      { name: 'PTV Home HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistan Television met drama\'s, nieuws en entertainment.' },
      { name: 'Geo News HD', quality: 'FHD 60FPS', genre: 'Pakistaans nieuws', country: 'PK', description: 'Pakistaanse nieuwszender met nationale en internationale verslaggeving.' },
      { name: 'Geo TV HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistaans entertainment met drama\'s en familieprogrammering.' },
      { name: 'ARY Digital HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistaanse drama\'s, entertainment en familieprogrammering.' },
      { name: 'ARY News HD', quality: 'FHD 60FPS', genre: 'Pakistaans nieuws', country: 'PK', description: 'Pakistaanse nieuwszender met breaking coverage en analyses.' },
      { name: 'Hum TV HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistaans dramanetwerk met populaire serials en shows.' },
      { name: 'Hum Masala HD', quality: 'FHD 60FPS', genre: 'Pakistaanse lifestyle', country: 'PK', description: 'Pakistaanse lifestyle-, kook- en familieprogrammering.' },
      // Japan
      { name: 'NHK World HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanse publieke omroep Engelstalig nieuws en cultuurprogrammering.', popular: true },
      { name: 'NHK General TV HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanse publieke omroep met nieuws, drama en variétéshows.' },
      { name: 'Fuji TV HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japans commercieel netwerk met anime, drama en variétéshows.' },
      { name: 'TV Tokyo HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japans entertainment met anime en jeugdgerichte programmering.' },
      { name: 'TV Asahi HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japans nieuws, entertainment en animatieprogrammering.' },
      { name: 'TBS Japan HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Tokyo Broadcasting System met drama, sport en nieuws.' },
      // Korea
      { name: 'KBS World HD', quality: 'FHD 60FPS', genre: 'Zuid-Korea', country: 'KR', description: 'Koreaanse uitzendingen met drama\'s, K-popshows en cultuurprogrammering.', popular: true },
      { name: 'KBS 1 HD', quality: 'FHD 60FPS', genre: 'Zuid-Korea', country: 'KR', description: 'Koreaanse publieke omroep met nieuws, drama en culturele inhoud.' },
      { name: 'KBS 2 HD', quality: 'FHD 60FPS', genre: 'Zuid-Korea', country: 'KR', description: 'Koreaans entertainment, variétéshows en drama\'s.' },
      { name: 'SBS Korea HD', quality: 'FHD 60FPS', genre: 'Zuid-Korea', country: 'KR', description: 'Koreaans entertainment met K-drama\'s en variétéshows.' },
      { name: 'MBC Korea HD', quality: 'FHD 60FPS', genre: 'Zuid-Korea', country: 'KR', description: 'Koreaans dramanetwerk en entertainmentprogrammering.' },
      { name: 'tvN HD', quality: 'FHD 60FPS', genre: 'Koreaans drama', country: 'KR', description: 'Populaire Koreaanse drama\'s en variétéshows van tvN.' },
      { name: 'Arirang TV HD', quality: 'FHD 60FPS', genre: 'Korea internationaal', country: 'KR', description: 'Koreaanse internationale omroep met Engelstalige inhoud.' },
      // Filipijnen
      { name: 'ABS-CBN HD', quality: 'FHD 60FPS', genre: 'Filipijnen', country: 'PH', description: 'Filipijns entertainment met drama\'s, nieuws en variétéshows.' },
      { name: 'GMA Pinoy TV HD', quality: 'FHD 60FPS', genre: 'Filipijnen', country: 'PH', description: 'Filipijnse programmering voor internationale doelgroepen.' },
      { name: 'GMA News TV HD', quality: 'FHD 60FPS', genre: 'Filipijns nieuws', country: 'PH', description: 'Filipijnse nieuwszender met binnenlandse en internationale verslaggeving.' },
      { name: 'Cinema One HD', quality: 'FHD 60FPS', genre: 'Filipijnse cinema', country: 'PH', description: 'Filipijnse films en cinema-programmering.' },
      // Vietnam, Thailand, Indonesië, Maleisië
      { name: 'VTV1 HD', quality: 'FHD 60FPS', genre: 'Vietnam', country: 'VN', description: 'Vietnamese nationale omroep met nieuws en entertainment.' },
      { name: 'VTV3 HD', quality: 'FHD 60FPS', genre: 'Vietnam', country: 'VN', description: 'Vietnamees entertainment, sport en variétéprogrammering.' },
      { name: 'Thai TV 3 HD', quality: 'FHD 60FPS', genre: 'Thailand', country: 'TH', description: 'Thais entertainment, nieuws en dramaprogrammering.' },
      { name: 'Thai TV 5 HD', quality: 'FHD 60FPS', genre: 'Thailand', country: 'TH', description: 'Thaise nationale omroep met nieuws en sport.' },
      { name: 'RCTI HD', quality: 'FHD 60FPS', genre: 'Indonesië', country: 'ID', description: 'Indonesisch entertainment, drama en nieuwsprogrammering.' },
      { name: 'SCTV HD', quality: 'FHD 60FPS', genre: 'Indonesië', country: 'ID', description: 'Indonesisch entertainmentsnetwerk met drama\'s en shows.' },
      { name: 'Astro Ria HD', quality: 'FHD 60FPS', genre: 'Maleisië', country: 'MY', description: 'Maleisische entertainmentzender met drama\'s en variété.' },
      { name: 'TV3 Malaysia HD', quality: 'FHD 60FPS', genre: 'Maleisië', country: 'MY', description: 'Maleisische nationale omroep met nieuws en entertainment.' },
      // Midden-Oosten
      { name: 'Al Jazeera HD', quality: 'FHD 60FPS', genre: 'Midden-Oosters nieuws', country: 'ME', description: 'Internationale Arabische nieuwszender met wereldwijde verslaggeving.', popular: true },
      { name: 'Al Jazeera English HD', quality: 'FHD 60FPS', genre: 'Midden-Oosters nieuws', country: 'ME', description: 'Al Jazeera English met internationaal nieuws en documentaires.' },
      { name: 'Al Arabiya HD', quality: 'FHD 60FPS', genre: 'Midden-Oosters nieuws', country: 'ME', description: 'Arabische nieuwszender met verslaggeving over het Midden-Oosten en wereldgebeurtenissen.' },
      { name: 'MBC 1 HD', quality: 'FHD 60FPS', genre: 'Midden-Oosten', country: 'ME', description: 'Midden-Oosters entertainment met drama\'s, films en shows.' },
      { name: 'MBC 2 HD', quality: 'FHD 60FPS', genre: 'Arabische films', country: 'ME', description: 'Arabische en internationale films met Arabische ondertitels.' },
      { name: 'MBC 3 HD', quality: 'FHD 60FPS', genre: 'Arabische kinderen', country: 'ME', description: 'Arabischtalige kinderprogrammering en tekenfilms.' },
      { name: 'MBC 4 HD', quality: 'FHD 60FPS', genre: 'Arabisch drama', country: 'ME', description: 'Turkse en Arabische drama\'s nagesynchroniseerd in het Arabisch.' },
      { name: 'MBC Action HD', quality: 'FHD 60FPS', genre: 'Actie', country: 'ME', description: 'Actiefilms, series en mannengericht entertainment.' },
      { name: 'Dubai TV HD', quality: 'FHD 60FPS', genre: 'VAE', country: 'ME', description: 'Arabisch entertainment en nieuwsprogrammering uit Dubai.' },
      { name: 'Abu Dhabi Sports HD', quality: 'FHD 60FPS', genre: 'Arabische sport', country: 'ME', description: 'Midden-Oosterse sportzender met voetbal en internationale verslaggeving.' },
      { name: 'Rotana Cinema HD', quality: 'FHD 60FPS', genre: 'Arabische cinema', country: 'ME', description: 'Arabische films en klassieke Midden-Oosterse cinema.' },
      { name: 'Rotana Khalijia HD', quality: 'FHD 60FPS', genre: 'Golf-entertainment', country: 'ME', description: 'Golfregio-entertainment met drama\'s en shows.' },
      { name: 'LBC HD', quality: 'FHD 60FPS', genre: 'Libanon', country: 'ME', description: 'Libanees entertainment, nieuws en talkshows.' },
      { name: 'Al Kass HD', quality: 'FHD 60FPS', genre: 'Qatarese sport', country: 'ME', description: 'Qatarese sportzender met voetbal en internationale evenementen.' },
      { name: 'Al Ekhbariya HD', quality: 'FHD 60FPS', genre: 'Saoedisch nieuws', country: 'ME', description: 'Saoedische nieuwszender met regionale verslaggeving.' },
      { name: 'Saudi TV 1 HD', quality: 'FHD 60FPS', genre: 'Saoedi-Arabië', country: 'ME', description: 'Saoedische nationale zender met nieuws en entertainment.' },
      // Nieuw-Zeeland
      { name: 'TVNZ 1 HD', quality: 'FHD 60FPS', genre: 'Nieuw-Zeeland', country: 'NZ', description: 'Nieuw-Zeelandse publieke omroep met nieuws, drama en sport.' },
      { name: 'TVNZ 2 HD', quality: 'FHD 60FPS', genre: 'Nieuw-Zeeland', country: 'NZ', description: 'Nieuw-Zeelands entertainment en jeugdgerichte programmering.' },
      { name: 'Three NZ HD', quality: 'FHD 60FPS', genre: 'Nieuw-Zeeland', country: 'NZ', description: 'Nieuw-Zeelands commercieel netwerk met entertainment en sport.' },
      { name: 'Sky Sport NZ HD', quality: 'FHD 60FPS', genre: 'Nieuw-Zeelandse sport', country: 'NZ', description: 'Nieuw-Zeelandse sportzender met rugby- en cricketverslaggeving.' },
    ],
    faqs: [
      {
        question: 'Zijn alle Aziatische en Midden-Oosterse zenders correct gesorteerd?',
        answer:
          'Ja. Onze playlists zijn netjes georganiseerd in alfabetische landcategorieën met vlagpictogrammen voor snel en intuïtief zappen. Je vindt elke Chinese, Indiase, Pakistaanse, Japanse, Koreaanse en Midden-Oosterse zender in zijn eigen groep.',
      },
      {
        question: 'Kan ik ongewenste landgroepen uit mijn zenderlijst verbergen?',
        answer:
          'Ja. Via je IPTV-speler zoals IPTV Smarters Pro of TiviMate, of via ons WhatsApp-supportteam, kun je categorieën die je niet gebruikt verbergen.',
      },
    ],
  },

  // =========================================================================
  // 7. FILMS & VOD
  // =========================================================================
  {
    slug: 'movies-vod',
    name: 'Films & VOD-bibliotheek',
    totalChannels: 500,
    description:
      'Toegang tot 120.000+ bioscoopfilms en complete tv-series van elk groot streamingplatform in Full HD en 4K met Engelse ondertitels en Dolby 5.1-geluid.',
    longDescription:
      'Onze video-on-demand-bibliotheek is een van de grootste ter wereld met meer dan 120.000 films en complete tv-serieboxsets uit elk genre, elk tijdperk en elk streamingplatform. Nieuwe releases worden dagelijks toegevoegd, dus er is altijd iets fris te kijken, of je nu een actieblockbuster, een familiekomedie of de nieuwste bekroonde dramaserie wilt.',
    keywords: [
      'iptv films',
      'vod iptv',
      'netflix iptv',
      'hbo iptv',
      'disney plus iptv',
      'beste iptv provider films',
    ],
    channels: [
      { name: 'Cinema Premiere 4K', quality: '4K UHD', genre: 'Nieuwste releases', description: 'De nieuwste bioscoopreleases in 4K UHD met Dolby 5.1 surround sound.', popular: true },
      { name: 'Cinema Action 4K', quality: '4K UHD', genre: 'Actie & blockbusters', description: 'Blockbuster-actiefilms, Marvel, DC en Fast & Furious-titels.' },
      { name: 'Cinema Action & Thriller', quality: 'FHD 60FPS', genre: 'Actie & thriller', description: 'Rond de klok actiehits, martial arts en psychologische thrillers.' },
      { name: 'Cinema Comedy & Romance', quality: 'FHD 60FPS', genre: 'Komedie & romantiek', description: 'Komedies, romantische klassiekers en feelgood-films.' },
      { name: 'Cinema Sci-Fi & Fantasy', quality: '4K UHD', genre: 'Sci-fi & fantasy', description: 'Ruimteavonturen, superheldenfilms en epische fantasyspektakels.' },
      { name: 'Cinema Horror 4K', quality: '4K UHD', genre: 'Horror', description: 'Horrorfilms in 4K UHD inclusief klassieke en moderne horrorklassiekers.' },
      { name: 'Cinema Drama Premium', quality: 'FHD 60FPS', genre: 'Drama', description: 'Bekroonde drama\'s, biopics en Oscar-winnaars op aanvraag.' },
      { name: 'Cinema Family', quality: 'FHD 60FPS', genre: 'Familie', description: 'Familievriendelijke films, animatie en kindersfilms op aanvraag.' },
      { name: 'Cinema Classics Vault', quality: 'FHD 60FPS', genre: 'Klassieke cinema', description: 'Gerestaureerde bioscoopklassiekers uit de jaren 70, 80 en 90 in HD.' },
      { name: 'Cinema Bollywood', quality: 'FHD 60FPS', genre: 'Bollywood', description: 'Nieuwste en klassieke Bollywood-films met Engelse ondertitels.' },
      { name: 'Cinema Asian Movies', quality: 'FHD 60FPS', genre: 'Aziatische cinema', description: 'Chinese, Japanse, Koreaanse en Thaise films met ondertitels.' },
      { name: 'Cinema World Movies', quality: 'FHD 60FPS', genre: 'Wereldcinema', description: 'Internationale films uit Europa, Latijns-Amerika en het Midden-Oosten.' },
      { name: 'Cinema Documentary', quality: 'FHD 60FPS', genre: 'Documentaire', description: 'Langspeelfilmdocumentaires over natuur, geschiedenis en true crime.' },
      { name: 'Cinema American Films', quality: 'FHD 60FPS', genre: 'Amerikaanse cinema', description: 'Klassieke en moderne Amerikaanse films uit elk tijdperk.' },
      { name: 'Cinema 4K Marvel', quality: '4K UHD', genre: 'Marvel', description: 'Elke MCU-film in 4K UHD inclusief Infinity Saga en Phase 4.' },
      { name: 'Cinema 4K DC', quality: '4K UHD', genre: 'DC Comics', description: 'Alle DC-films in 4K UHD inclusief Batman, Superman en Justice League.' },
      { name: 'Cinema 4K Star Wars', quality: '4K UHD', genre: 'Star Wars', description: 'Complete Star Wars-saga in 4K UHD inclusief The Mandalorian.' },
      { name: 'Cinema 4K Pixar', quality: '4K UHD', genre: 'Pixar', description: 'Elke Pixar-animatiefilm in 4K UHD met Dolby Atmos.' },
      { name: 'HBO Series Central', quality: 'FHD 60FPS', genre: 'HBO originals', description: 'Complete seizoenen van Succession, House of the Dragon, The Last of Us en meer.', popular: true },
      { name: 'HBO Max Originals', quality: 'FHD 60FPS', genre: 'HBO Max', description: 'HBO Max exclusieve inhoud en streaming-originals.' },
      { name: 'Netflix Stream Hub', quality: 'FHD 60FPS', genre: 'Netflix originals', description: 'Elk seizoen van Stranger Things, Squid Game en top Netflix-documentaires.', popular: true },
      { name: 'Netflix Action Hub', quality: 'FHD 60FPS', genre: 'Netflix actie', description: 'Netflix actie-originals en thrillerseries.' },
      { name: 'Netflix Comedy Hub', quality: 'FHD 60FPS', genre: 'Netflix komedie', description: 'Netflix komediespecials en sitcom-originals.' },
      { name: 'Disney & Marvel Vault', quality: '4K UHD', genre: 'Marvel, Star Wars & Pixar', description: 'Alle MCU-films, Star Wars-saga\'s en Pixar-animatie.', popular: true },
      { name: 'Disney+ Originals', quality: '4K UHD', genre: 'Disney Plus', description: 'Disney Plus exclusieve series zoals The Mandalorian, WandaVision en Loki.' },
      { name: 'Paramount Showcase', quality: 'FHD 60FPS', genre: 'Paramount originals', description: 'Yellowstone-universum, Star Trek-series en Paramount-bioscoopreleases.' },
      { name: 'Paramount+ Originals', quality: 'FHD 60FPS', genre: 'Paramount Plus', description: 'Paramount Plus exclusieve series en streaminginhoud.' },
      { name: 'Apple Originals Channel', quality: '4K UHD', genre: 'Apple TV+', description: 'Ted Lasso, Severance, The Morning Show en bekroonde films.' },
      { name: 'Apple TV+ Movies', quality: '4K UHD', genre: 'Apple-films', description: 'Apple TV+ originele films inclusief Oscar-winnaars en premières.' },
      { name: 'Amazon Prime Originals', quality: 'FHD 60FPS', genre: 'Amazon Prime', description: 'The Boys, Reacher, Rings of Power en Prime Video-originals.' },
      { name: 'Hulu Originals', quality: 'FHD 60FPS', genre: 'Hulu', description: 'The Handmaid\'s Tale, Only Murders in the Building en Hulu-exclusives.' },
      { name: 'Peacock Originals', quality: 'FHD 60FPS', genre: 'Peacock', description: 'Peacock exclusieve inhoud en NBC-originals op aanvraag.' },
      { name: 'Showmax Originals', quality: 'FHD 60FPS', genre: 'Showmax', description: 'Showmax originals en Afrikaanse inhoud op aanvraag.' },
      { name: 'Documentary World', quality: 'FHD 60FPS', genre: 'Documentaires', description: 'Hoogwaardige natuur- en true crime-documentaires van over de hele wereld.' },
      { name: 'Horror Nights HD', quality: 'FHD 60FPS', genre: 'Horror', description: 'IJzingwekkende horrorfilms, slashers en paranormale documentaires.' },
      { name: 'Sci-Fi Series Central', quality: 'FHD 60FPS', genre: 'Sci-fi-series', description: 'Complete sci-fi-series zoals Star Trek, The Expanse en meer.' },
      { name: 'Fantasy Series Hub', quality: 'FHD 60FPS', genre: 'Fantasy-series', description: 'Fantasy-series zoals Game of Thrones, The Witcher en Wheel of Time.' },
      { name: 'Crime Drama Series', quality: 'FHD 60FPS', genre: 'Misdaadseries', description: 'Misdaadseries inclusief True Detective, Mindhunter en Line of Duty.' },
      { name: 'British TV Boxsets', quality: 'FHD 60FPS', genre: 'Britse series', description: 'Complete Britse series inclusief Doctor Who, Sherlock en Peaky Blinders.' },
      { name: 'American TV Boxsets', quality: 'FHD 60FPS', genre: 'Amerikaanse series', description: 'Complete Amerikaanse series inclusief Breaking Bad, The Sopranos en The Wire.' },
      { name: 'Kids Animation Vault', quality: 'FHD 60FPS', genre: 'Kinderseries', description: 'Complete kindersanimatieseries inclusief Bluey, Peppa Pig en Paw Patrol.' },
      { name: 'Anime Central', quality: 'FHD 60FPS', genre: 'Anime', description: 'Populaire animeseries inclusief Naruto, One Piece en Attack on Titan.' },
      { name: 'Korean Drama Hub', quality: 'FHD 60FPS', genre: 'K-drama', description: 'Populaire Koreaanse drama\'s inclusief Squid Game, Crash Landing on You en meer.' },
      { name: 'Turkish Drama Hub', quality: 'FHD 60FPS', genre: 'Turks drama', description: 'Populaire Turkse drama\'s met ondertitels in meerdere talen.' },
      { name: 'Indian Series Hub', quality: 'FHD 60FPS', genre: 'Indiase series', description: 'Populaire Indiase series en web-originals van grote platforms.' },
      { name: 'Latin American Series', quality: 'FHD 60FPS', genre: 'Latijns-Amerikaanse series', description: 'Spaans- en Portugeestalige series uit Latijns-Amerika en Spanje.' },
      { name: 'Reality TV Hub', quality: 'FHD 60FPS', genre: 'Reality', description: 'Reality-tv-series inclusief Survivor, Big Brother en The Amazing Race.' },
      { name: 'Food & Cooking Series', quality: 'FHD 60FPS', genre: 'Eten', description: 'Complete kookseries van chefshows tot competitieprogramma\'s.' },
      { name: 'True Crime Vault', quality: 'FHD 60FPS', genre: 'True crime', description: 'True crime-documentaires en onderzoeksseries van over de hele wereld.' },
      { name: 'Classic TV Vault', quality: 'FHD 60FPS', genre: 'Klassieke tv', description: 'Klassieke televisieseries uit de jaren 60 tot 2000.' },
      { name: 'Sitcom Vault', quality: 'FHD 60FPS', genre: 'Sitcom', description: 'Klassieke en moderne sitcoms inclusief Friends, Seinfeld en The Office.' },
      { name: 'Sports Documentaries', quality: 'FHD 60FPS', genre: 'Sportdocumentaires', description: 'Sportdocumentaires inclusief The Last Dance en Formula 1: Drive to Survive.' },
      { name: 'Music Documentaries', quality: 'FHD 60FPS', genre: 'Muziekdocumentaires', description: 'Muziekdocumentaires en concertfilms uit elk genre.' },
      { name: '4K Nature Documentaries', quality: '4K UHD', genre: 'Natuur', description: 'BBC- en National Geographic-natuurdocumentaires in 4K UHD.' },
      { name: '4K Action Movies', quality: '4K UHD', genre: '4K actie', description: 'Actiefilms in 4K UHD met Dolby Atmos surround sound.' },
    ],
    faqs: [
      {
        question: 'Hoe vaak wordt de VOD-filmbibliotheek bijgewerkt?',
        answer:
          'Onze film- en tv-seriecatalogus wordt dagelijks automatisch bijgewerkt met de nieuwste bioscoopreleases en streamingtitels van elk groot platform.',
      },
      {
        question: 'Bevatten alle films Engelse ondertitels?',
        answer:
          'Ja. Meer dan 95% van alle anderstalige films en series bevatten selecteerbare Engelse ondertitels, met extra ondertiteltalen beschikbaar voor de meeste titels.',
      },
    ],
  },

  // =========================================================================
  // 8. KINDEREN & FAMILIE
  // =========================================================================
  {
    slug: 'kids-family',
    name: 'Kinderen & familie',
    totalChannels: 200,
    description:
      'Veilige en leuke kindzenders voor alle leeftijden. Disney Channel, Nickelodeon, Cartoon Network, PBS Kids, CBeebies en educatieve programmering van over de hele wereld.',
    longDescription:
      'Familievriendelijk entertainment dat ouders kunnen vertrouwen. Onze categorie Kinderen en Familie bevat elk groot kindernetwerk. Disney Channel, Disney Junior, Nickelodeon, Nick Jr., Cartoon Network, PBS Kids, CBeebies en meer. Alle programmering is leeftijdsgeschikt en vrij van agressieve inhoud, met ouderlijk toezicht-opties ingebouwd in elke IPTV-speler.',
    keywords: [
      'kinderen iptv',
      'disney channel iptv',
      'nickelodeon iptv',
      'cartoon network iptv',
      'pbs kids iptv',
      'familie iptv',
      'beste iptv provider kinderen',
    ],
    channels: [
      // Nickelodeon-familie
      { name: 'Nickelodeon HD', quality: 'FHD 60FPS', genre: 'Animatie & kinderen', country: 'US', description: 'SpongeBob SquarePants, PAW Patrol, The Loud House en tienerseries.', popular: true },
      { name: 'Nick Jr. HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'US', description: 'Educatieve en leuke programma\'s voor de jongste kijkers.' },
      { name: 'Nicktoons HD', quality: 'FHD 60FPS', genre: 'Animatie', country: 'US', description: 'Rond de klok animatieseries en klassieke tekenfilms.' },
      // Disney-familie
      { name: 'Disney Channel HD', quality: 'FHD 60FPS', genre: 'Disney-series', country: 'US', description: 'Populaire Disney-series, tienershows en originele Disney-films.', popular: true },
      { name: 'Disney Junior HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'US', description: 'Mickey Mouse Clubhouse, Spidey and His Amazing Friends en Bluey.', popular: true },
      { name: 'Disney XD HD', quality: 'FHD 60FPS', genre: 'Actieanimatie', country: 'US', description: 'Actievolle animatieseries en Marvel-tekenfilms voor kinderen.' },
      // Cartoon Network-familie
      { name: 'Cartoon Network HD', quality: 'FHD 60FPS', genre: 'Klassieke tekenfilms', country: 'US', description: 'Teen Titans Go, Gumball, Adventure Time en Scooby Doo.' },
      { name: 'Boomerang HD', quality: 'FHD 60FPS', genre: 'Klassieke animatie', country: 'US', description: 'Tom and Jerry, Looney Tunes, Mr Bean-animatie en peuterseries.' },
      { name: 'Adult Swim HD', quality: 'FHD 60FPS', genre: 'Volwassen animatie', country: 'US', description: 'Adult Swim met Rick and Morty, Family Guy en American Dad.' },
      // PBS Kids
      { name: 'PBS Kids HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'US', description: 'Amerikaanse educatieve kinderprogrammering met STEM-focus.', popular: true },
      { name: 'PBS Kids Sprout HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'US', description: 'PBS Kids peuterprogrammering met educatieve focus.' },
      // Britse kinderen
      { name: 'CBeebies HD', quality: 'FHD 60FPS', genre: 'Peuters VK', country: 'UK', description: 'BBC peuterprogrammering met educatieve inhoud voor jonge kijkers.' },
      { name: 'CBBC HD', quality: 'FHD 60FPS', genre: 'Britse kinderen', country: 'UK', description: 'BBC kinderprogrammering met CBBC-originals en animatie.' },
      { name: 'Cartoonito HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'UK', description: 'Peuteranimatie en educatieve inhoud voor peuters.' },
      // Overige kinderen
      { name: 'Baby TV HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'EU', description: 'Programmering voor baby\'s en peuters met educatieve inhoud.' },
      { name: 'BabyFirst HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'US', description: 'Educatieve programmering voor baby\'s met focus op vroeg leren.' },
      { name: 'Hop! Channel HD', quality: 'FHD 60FPS', genre: 'Kinderen', country: 'UK', description: 'Britse kindzender met educatieve en entertainmentprogrammering.' },
      { name: 'Pop HD', quality: 'FHD 60FPS', genre: 'Kinderen', country: 'UK', description: 'Britse kinderentertainmentzender met populaire animatieseries.' },
      { name: 'Tiny Pop HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'UK', description: 'Peuteranimatieprogrammering voor jonge kinderen.' },
      // Familiezenders
      { name: 'Family Channel HD', quality: 'FHD 60FPS', genre: 'Familie', country: 'CA', description: 'Familieprogrammering, kindershows en tienersdrama\'s voor Canadese kijkers.' },
      { name: 'YTV HD', quality: 'FHD 60FPS', genre: 'Jeugd', country: 'CA', description: 'Canadees jeugdnetwerk met animatie en tienerentertainment.' },
      { name: 'Teletoon HD', quality: 'FHD 60FPS', genre: 'Animatie', country: 'CA', description: 'Canadese animatiezender met originele en internationale tekenfilms.' },
      { name: 'Treehouse HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'CA', description: 'Peuterprogrammering in Engels en Frans voor de jongste kijkers.' },
      { name: 'Disney XD Canada HD', quality: 'FHD 60FPS', genre: 'Animatie', country: 'CA', description: 'Canadees Disney XD met actieanimatie en familieseries.' },
      // Anime en tieners
      { name: 'Anime Central Kids', quality: 'FHD 60FPS', genre: 'Anime kinderen', country: 'JP', description: 'Familievriendelijke animatieprogrammering inclusief Doraemon en Pokemon.' },
      { name: 'Kids Station HD', quality: 'FHD 60FPS', genre: 'Anime', country: 'JP', description: 'Japanse kindzender met populaire animeseries.' },
      // Leren en educatie
      { name: 'Da Vinci Kids HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'EU', description: 'Educatieve inhoud gericht op wetenschap, wiskunde en creativiteit.' },
      { name: 'National Geographic Kids HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'US', description: 'Nat Geo Kids met educatieve natuur- en wetenschapsprogrammering.' },
      { name: 'Discovery Kids HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'US', description: 'Discovery Kids-programmering met ontdekkings- en leersshows.' },
      { name: 'Knowledge Kids HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'CA', description: 'Educatieve programmering voor kinderen van alle leeftijden.' },
      // Specifiek publiek
      { name: 'Universal Kids HD', quality: 'FHD 60FPS', genre: 'Kinderen', country: 'US', description: 'Universal Kids met originele programmering en familie-inhoud.' },
      { name: 'Sprout HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'US', description: 'Peuterprogrammeringsblok met educatieve inhoud.' },
      // Familiefilms
      { name: 'Hallmark Family HD', quality: 'FHD 60FPS', genre: 'Familiefilms', country: 'US', description: 'Hallmark originele familiefilms en feestdagprogrammering.' },
      { name: 'Hallmark Movies & Mysteries HD', quality: 'FHD 60FPS', genre: 'Familiefilms', country: 'US', description: 'Hallmark mystery-films en familie-entertainment.' },
      { name: 'UPtv HD', quality: 'FHD 60FPS', genre: 'Familie', country: 'US', description: 'Familievriendelijk entertainment en originele programmering.' },
      // Meer kinderen
      { name: 'Zoomoo HD', quality: 'FHD 60FPS', genre: 'Natuur kinderen', country: 'US', description: 'Natuur- en diergerichte kinderprogrammering met leuke presentatoren.' },
      { name: 'Duck TV HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'EU', description: 'Eenvoudige animatie voor zeer jonge kinderen met minimale prikkeling.' },
      { name: 'LooLoo Kids HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'US', description: 'Kinderliedjes en educatieve liedjes voor peuters.' },
      { name: 'Moonbug Kids HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'UK', description: 'Cocomelon, Blippi en andere populaire peuterprogrammering.' },
      { name: 'Nick Music HD', quality: 'FHD 60FPS', genre: 'Muziek', country: 'US', description: 'Nick Music met muziekvideo\'s voor kinderen en tieners.' },
      // Tieners
      { name: 'Freeform HD', quality: 'FHD 60FPS', genre: 'Tiener', country: 'US', description: 'Tienerdrama\'s, komedies en originele series voor jonge doelgroepen.' },
      { name: 'The CW Kids HD', quality: 'FHD 60FPS', genre: 'Tiener', country: 'US', description: 'Familievriendelijke programmering van The CW-netwerk.' },
      { name: 'CBBC Extra HD', quality: 'FHD 60FPS', genre: 'Britse jeugd', country: 'UK', description: 'Extra CBBC-feed met jeugdgerichte shows.' },
      // Filmzenders voor kinderen
      { name: 'Disney Junior Movies HD', quality: 'FHD 60FPS', genre: 'Peuterfilms', country: 'US', description: 'Disney Junior-films en speciale programma\'s voor jonge kinderen.' },
      { name: 'Cartoon Network Movies HD', quality: 'FHD 60FPS', genre: 'Animatiefilms', country: 'US', description: 'Animatiefilms van Cartoon Network-studio\'s.' },
      { name: 'Nick Movies HD', quality: 'FHD 60FPS', genre: 'Kinderfilms', country: 'US', description: 'Nickelodeon originele films en familiefilms.' },
      { name: 'PBS Kids Movies HD', quality: 'FHD 60FPS', genre: 'Educatief', country: 'US', description: 'PBS Kids-films met educatieve inhoud.' },
      { name: 'Baby Einstein HD', quality: 'FHD 60FPS', genre: 'Peuter', country: 'US', description: 'Educatieve inhoud voor baby\'s en peuters van Baby Einstein.' },
      { name: 'Sesame Street HD', quality: 'FHD 60FPS', genre: 'Peuters', country: 'US', description: 'Sesame Street en Sesame Workshop-programmering voor jonge kinderen.' },
    ],
    faqs: [
      {
        question: 'Zijn de kindzenders beschikbaar in meerdere talen?',
        answer:
          'Ja. Veel grote kindzenders zenden uit met meerdere audiotracks waaronder Engels, Frans en Spaans, zodat je gezin indien nodig van taal kan wisselen.',
      },
      {
        question: 'Kan ik ouderlijk toezicht instellen in de IPTV-app?',
        answer:
          'Ja. Vrijwel alle IPTV-spelers waaronder IPTV Smarters Pro en TiviMate bieden pincodes voor ouderlijk toezicht, zodat je specifieke zenders of categorieën kunt blokkeren.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export function getChannelCategoryBySlug(slug: string): ChannelCategory | undefined {
  return channelsData.find((category) => category.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return channelsData.map((category) => category.slug);
}