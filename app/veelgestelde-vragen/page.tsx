'use client';

import { useState, useMemo } from 'react';
import { CONSTANTS, whatsappUrl, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import Link from 'next/link';
import {
  HelpCircle,
  Tv,
  Zap,
  CreditCard,
  Smartphone,
  Search,
  ChevronDown,
  LifeBuoy,
  Wrench,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { FaqText, faqPlainText } from '@/lib/faq-text';

type FaqCategoryFilter = 'all' | 'general' | 'watching' | 'devices' | 'billing';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/veelgestelde-vragen`;

// ---------------------------------------------------------------------------
// TYPES + FAQ DATA
// ---------------------------------------------------------------------------
interface FAQItem {
  id: string;
  category: 'general' | 'watching' | 'devices' | 'billing';
  q: string;
  a: string;
}

const faqList: FAQItem[] = [
  // ALGEMEEN
  { id: 'gen-1', category: 'general', q: 'Wat is IPTV en wat is het verschil met gewone tv?', a: 'IPTV staat voor Internet Protocol Television. In plaats van via de kabel, een glasvezelontvanger of een schotel komt het tv-signaal via je internetverbinding binnen. Je kijkt in een IPTV-app op je Smart TV, Fire TV Stick, telefoon of tablet, zonder extra kastje van een tv-aanbieder.' },
  { id: 'gen-2', category: 'general', q: 'Hoe snel kan ik kijken na het betalen?', a: 'Na je betaling ontvang je je inloggegevens via WhatsApp en helpen we je in dezelfde chat met de installatie. Meestal ben je in ongeveer 10 minuten klaar.' },
  { id: 'gen-3', category: 'general', q: 'Kan ik op meerdere tv’s tegelijk kijken?', a: 'Ja, afhankelijk van je abonnement. Je kiest bij het bestellen voor 1, 2 of 3 apparaten die tegelijk kunnen kijken.' },
  { id: 'gen-4', category: 'general', q: 'Hoe werkt de gratis proefperiode?', a: 'Stuur ons een bericht via WhatsApp, dan krijg je 24 uur gratis toegang. Zo test je de beeldkwaliteit, het aanbod en de werking op je eigen apparaat en internetverbinding. Pas als je tevreden bent, kies je een abonnement.' },
  { id: 'gen-5', category: 'general', q: 'Zit ik vast aan een contract of automatische verlenging?', a: 'Nee. Je betaalt vooraf voor 3, 6 of 12 maanden. Aan het einde van de looptijd stopt de dienst vanzelf; er wordt niets automatisch verlengd of afgeschreven.' },

  // KIJKEN
  { id: 'watch-1', category: 'watching', q: 'Welke zenders zitten erin?', a: 'Het actuele zenderoverzicht ontvang je via WhatsApp. Controleer tijdens de gratis proefperiode of de zenders die jij belangrijk vindt erbij zitten voordat je een abonnement kiest.' },
  { id: 'watch-2', category: 'watching', q: 'Werken de tv-gids en terugkijken?', a: 'Ja. Je app toont een elektronische programmagids (EPG). Bij zenders die het ondersteunen kun je tot 7 dagen terugkijken.' },
  { id: 'watch-3', category: 'watching', q: 'Kan ik zendergroepen die ik niet gebruik verbergen?', a: 'Ja. In apps zoals IPTV Smarters Pro of TiviMate kun je groepen verbergen. Daarnaast kunnen we op verzoek je account aanpassen zodat je alleen de groepen ziet die je gebruikt.' },
  { id: 'watch-4', category: 'watching', q: 'Hoe stabiel is het beeld bij live sport?', a: 'Dat hangt ook af van je internetverbinding en apparaat. Test daarom tijdens de proefperiode een live uitzending. Een netwerkkabel of 5 GHz-wifi geeft meestal het stabielste beeld.' },
  { id: 'watch-5', category: 'watching', q: 'Hebben films en series ondertitels?', a: 'Dat verschilt per titel. Controleer tijdens de proefperiode of de titels die jij wilt kijken de gewenste ondertitels hebben.' },

  // APPARATEN
  { id: 'dev-1', category: 'devices', q: 'Op welke apparaten kan ik kijken?', a: 'Op Smart TV’s (Samsung Tizen, LG webOS, Android TV, Google TV), Amazon Fire TV Stick, Apple TV, Nvidia Shield, MAG-boxen, Windows-pc, Mac, iPhone, iPad en Android-telefoons.' },
  { id: 'dev-2', category: 'devices', q: 'Welke IPTV-apps raden jullie aan?', a: 'Op Android TV en Fire TV Stick werkt IPTV Smarters Pro of TiviMate goed. Op Samsung en LG Smart TV’s kun je IPTV Smarters Pro of IBO Player Pro gebruiken. Op Apple-apparaten zijn IPTVX en GSE Smart IPTV veelgebruikte keuzes.' },
  { id: 'dev-3', category: 'devices', q: 'Welke internetsnelheid heb ik nodig?', a: 'We raden minimaal 15 Mbit/s aan voor Full HD en 30 Mbit/s voor 4K, per scherm. Een netwerkkabel of 5 GHz-wifi geeft de stabielste verbinding.' },
  { id: 'dev-4', category: 'devices', q: 'Wat doe ik als een zender hapert of bevriest?', a: 'Haperend beeld komt vaak door storing op je wifi of een volle app-cache. Herstart je router en modem, herstart je IPTV-app of wissel in de instellingen van je app het streamformaat tussen HLS en TS. Lees ook ons [artikel over haperend beeld](/blog/iptv-haperend-beeld-oplossen) in de blog.' },
  { id: 'dev-5', category: 'devices', q: 'Heb ik technische kennis nodig?', a: 'Nee. Je installeert een app uit de app store van je apparaat, vult de inloggegevens in die je van ons krijgt en de zenders laden automatisch. Via WhatsApp helpen we je als het niet lukt.' },

  // BETALEN
  { id: 'pay-1', category: 'billing', q: 'Welke betaalmethoden zijn er?', a: 'Je betaalt met creditcard (Visa, Mastercard), PayPal of crypto (Bitcoin). Alle [prijzen](/prijzen) zijn in euro’s.' },
  { id: 'pay-2', category: 'billing', q: 'Heb ik een VPN nodig?', a: 'Nee, een VPN is niet nodig om te kijken.' },
  { id: 'pay-3', category: 'billing', q: 'Hoe gaan jullie om met mijn gegevens?', a: 'Hoe we persoonsgegevens verwerken, lees je in ons [privacybeleid](/privacybeleid).' },
  { id: 'pay-4', category: 'billing', q: 'Ik ben mijn inloggegevens kwijt. Wat nu?', a: 'Stuur ons een bericht via WhatsApp vanaf het nummer waarmee je hebt besteld, dan sturen we je gegevens opnieuw.' },
  { id: 'pay-5', category: 'billing', q: 'Zijn er verborgen kosten?', a: 'Nee. De prijs op de [prijzenpagina](/prijzen) is wat je betaalt: één keer vooraf voor de gekozen looptijd, zonder extra kosten.' },
];

const countBy = (cat: FAQItem['category']) => faqList.filter((f) => f.category === cat).length;

const FAQ_TABS: { id: FaqCategoryFilter; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: `Alle vragen (${faqList.length})`, icon: HelpCircle },
  { id: 'general', label: `Algemeen (${countBy('general')})`, icon: Tv },
  { id: 'watching', label: `Kijken & zenders (${countBy('watching')})`, icon: Zap },
  { id: 'devices', label: `Apparaten & apps (${countBy('devices')})`, icon: Smartphone },
  { id: 'billing', label: `Betalen & privacy (${countBy('billing')})`, icon: CreditCard },
];

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FaqCategoryFilter>('all');
  const [openAccordion, setOpenAccordion] = useState<string | null>('gen-1');

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faqPlainText(item.a).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  // ------------------- JSON-LD SCHEMAS (inline) -------------------
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: faqList.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faqPlainText(f.a),
          },
        })),
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Veelgestelde vragen', item: PAGE_URL },
        ],
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `Veelgestelde vragen | ${BRAND}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: CONSTANTS.LANGUAGE,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_URL}${CONSTANTS.OG_IMAGE.url}`,
          width: CONSTANTS.OG_IMAGE.width,
          height: CONSTANTS.OG_IMAGE.height,
        },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC] overflow-hidden">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        id="faq-page-schema"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ==========================================================
          HERO
      ========================================================== */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] overflow-hidden">
        {/* Ambient glow & Global pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#39FF14]/10 blur-[140px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#39FF14]/40">
            <HelpCircle className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
              Hulp &amp; antwoorden
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none">
            Veelgestelde <br className="hidden sm:block" />
            <span className="text-[#39FF14]">vragen</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed mb-8">
            Antwoorden op vragen over je <span className="text-[#39FF14]">IPTV abonnement</span>: kijken, apparaten,
            installatie en betalen.
          </p>

          {/* Search */}
          <div className="w-full max-w-xl relative mt-2 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#39FF14] to-[#008000] rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="relative">
              <Search className="w-5 h-5 text-[#39FF14] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Zoek in de veelgestelde vragen"
                placeholder="Zoek een vraag (bijv. Smarters, PayPal, haperend beeld)..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] placeholder-[#94A3B8]/50 font-bold border-2 border-[#27272A] focus:border-[#39FF14] focus:outline-none shadow-2xl transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          FAQ ACCORDION
      ========================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {FAQ_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md border ${
                  active
                    ? 'bg-[#39FF14] text-[#09090B] border-[#39FF14] scale-105 shadow-lg shadow-[#39FF14]/30'
                    : 'bg-[#18181B] text-[#94A3B8] border-[#27272A] hover:border-[#39FF14] hover:text-[#F8FAFC] hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openAccordion === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`group relative bg-[#18181B] rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                    isOpen
                      ? 'border-[#39FF14] shadow-[0_20px_50px_rgba(57,255,20,0.15)]'
                      : 'border-[#27272A] hover:border-[#39FF14]/60 hover:shadow-[0_15px_35px_rgba(57,255,20,0.1)]'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                      isOpen ? 'bg-[#39FF14]' : 'bg-transparent'
                    }`}
                  />

                  {/* Heading wraps the toggle (questions are h2: this list sits
                      directly under the page h1). */}
                  <h2>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${faq.id}`}
                    >
                      <span className="flex items-start gap-3 pr-2 flex-1">
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isOpen ? 'bg-[#39FF14] text-[#09090B]' : 'bg-[#27272A] text-[#94A3B8]'
                          }`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </span>
                        <span className="font-black text-[#F8FAFC] text-base sm:text-lg uppercase tracking-tight leading-snug">
                          {faq.q}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-[#39FF14] text-[#09090B]'
                            : 'bg-[#27272A] text-[#94A3B8] group-hover:bg-[#39FF14]/10 group-hover:text-[#39FF14]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                  </h2>

                  <div
                    id={`faq-a-${faq.id}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#94A3B8] text-sm sm:text-base font-medium leading-relaxed px-5 sm:px-6 pl-15 sm:pl-16 border-l-4 border-[#39FF14] ml-4 sm:ml-5 py-1">
                        <FaqText text={faq.a} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-10 text-center shadow-xl">
            <AlertCircle className="w-10 h-10 text-[#39FF14] mx-auto mb-3" />
            <p className="font-black text-lg uppercase tracking-tight mb-1 text-[#F8FAFC]">
              Geen resultaten gevonden
            </p>
            <p className="text-sm font-bold text-[#94A3B8] mb-6">
              Probeer een andere zoekterm of stel je vraag via WhatsApp.
            </p>
            <a
              href={whatsappUrl(`Hallo ${BRAND}, ik kon het antwoord op mijn vraag niet vinden.`)}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-lg border border-[#09090B]/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" /> Vraag het via WhatsApp
            </a>
          </div>
        )}
      </section>

      {/* ==========================================================
          RECOMMENDED DEVICES
      ========================================================== */}
      <section className="py-16 bg-[#09090B] border-y border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Aanbevolen
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
              Apparaten <span className="text-[#39FF14]">&amp; apps</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] font-bold max-w-xl mx-auto">
              Veelgebruikte IPTV-apps per apparaat en de aanbevolen internetsnelheid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                title: 'Android TV & Fire TV',
                desc: 'Veel keuze in apps en vlot zappen.',
                apps: ['IPTV Smarters Pro', 'TiviMate', 'IBO Player Pro'],
                speed: 'Full HD: min. 15 Mbit/s · 4K: min. 30 Mbit/s',
              },
              {
                icon: Tv,
                title: 'Samsung & LG Smart TV',
                desc: 'Kijken zonder extra kastje.',
                apps: ['IPTV Smarters Pro (webOS / Tizen)', 'Smart IPTV (SIPTV)', 'IBO Player Pro'],
                speed: 'Full HD: min. 15 Mbit/s · 4K: min. 30 Mbit/s',
              },
              {
                icon: Cpu,
                title: 'Apple TV & iOS',
                desc: 'Apps uit de App Store voor iPhone, iPad en Apple TV.',
                apps: ['IPTVX (tvOS)', 'GSE Smart IPTV', 'IPTV Smarters Player Lite'],
                speed: 'Full HD: min. 15 Mbit/s · 4K: min. 30 Mbit/s',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between hover:border-[#39FF14] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-500"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-4 group-hover:bg-[#39FF14] transition-colors">
                      <Icon className="w-6 h-6 text-[#39FF14] group-hover:text-[#09090B] transition-colors" />
                    </div>
                    <h3 className="text-lg font-black text-[#F8FAFC] uppercase mb-1">{card.title}</h3>
                    <p className="text-xs text-[#94A3B8] font-bold mb-4">{card.desc}</p>
                    <ul className="space-y-2 text-xs font-bold text-[#F8FAFC]">
                      {card.apps.map((app) => (
                        <li key={app} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#27272A] text-[11px] font-black text-[#39FF14]">
                    {card.speed}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================
          TROUBLESHOOTING
      ========================================================== */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#39FF14] flex items-center justify-center">
              <Wrench className="w-6 h-6 text-[#09090B]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight">
              Zelf kleine storingen oplossen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: 1, title: 'Herstart je router', desc: 'Zet je modem en tv 30 seconden uit om de verbinding opnieuw op te bouwen.' },
              { n: 2, title: 'Ververs de afspeellijst', desc: 'Kies in je IPTV-app voor “Afspeellijst bijwerken” of “Portal herladen” om zenders en tv-gids opnieuw te laden.' },
              { n: 3, title: 'Wissel van streamformaat', desc: 'Zet in de instellingen van je app het streamtype van TS op HLS (of andersom).' },
            ].map((step) => (
              <div key={step.n} className="p-5 bg-[#09090B] rounded-2xl border border-[#27272A] shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#39FF14] text-[#09090B] font-black text-sm flex items-center justify-center mb-3">
                  {step.n}
                </span>
                <h3 className="font-black text-sm uppercase mb-1 text-[#F8FAFC]">{step.title}</h3>
                <p className="text-xs font-bold text-[#94A3B8] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share */}
      <div className="w-full flex justify-center items-center my-10">
        <ShareButtons />
      </div>

      {/* ==========================================================
          SUPPORT CTA
      ========================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="relative rounded-3xl overflow-hidden border border-[#27272A] bg-[#18181B] p-8 md:p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1),_transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-4 py-2 rounded-full mb-4 shadow-md">
              <LifeBuoy className="w-4 h-4" />
              <span className="font-black text-xs uppercase tracking-widest">Persoonlijke hulp</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
              Staat je vraag er niet bij?
            </h2>

            <p className="text-[#94A3B8] font-bold text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Stuur ons een bericht via WhatsApp voor installatiehulp, vragen over het aanbod of een gratis proefperiode van 24 uur.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={whatsappUrl(`Hallo ${BRAND}, ik heb een vraag over mijn IPTV abonnement.`)}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all hover:scale-105 shadow-xl border border-[#09090B]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Hulp via WhatsApp
              </a>
              <Link
                href="/prijzen"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl border border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                Bekijk de prijzen
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest cursor-pointer py-2 -my-2"
          >
            ← Terug naar de homepage
          </Link>
        </div>
      </section>
    </div>
  );
}