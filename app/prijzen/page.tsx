'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import PricingSection from '../components/PricingSection';
import ShareButtons from '../components/ShareButtons';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import { CONSTANTS } from '@/lib/seo';
import { pricingFaqs } from '@/lib/page-faqs';
import { PRICES, formatEUR, formatEURExact, monthlyPrice, savingPercent, type DeviceCount } from '@/lib/pricing';
import {
  ShieldCheck,
  Zap,
  ChevronDown,
  CreditCard,
  Award,
  Globe,
  Server,
  Trophy,
  Tv,
  Film,
  MonitorPlay,
  Wifi,
  Calendar,
  Lock,
  ThumbsUp,
  Headphones,
  Sparkles,
} from 'lucide-react';
import { FaqText } from '@/lib/faq-text';
import { responsiveImageProps } from '@/lib/blog-helpers';

// ---------------------------------------------------------------------------
// FAQ Item — Accordion
// ---------------------------------------------------------------------------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // Accessible accordion: the heading contains the toggle button, and the
  // answer sits outside the button (previously the whole card, answer included,
  // was one button, so the answer became part of the button's name and the
  // heading was lost). Padding is split so the card looks exactly as before.
  return (
    <div
      className={`w-full text-left bg-[#18181B] border-2 ${
        isOpen ? 'border-[#39FF14]' : 'border-[#27272A]'
      } rounded-2xl hover:border-[#39FF14]/60 shadow-lg transition-all duration-300 group`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className={`w-full text-left px-6 pt-6 ${isOpen ? 'pb-4' : 'pb-6'} flex justify-between items-center gap-4 transition-all duration-300 cursor-pointer rounded-2xl`}
        >
          <span
            className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
              isOpen ? 'text-[#39FF14]' : 'text-[#F8FAFC] group-hover:text-[#39FF14]'
            } flex items-center gap-3`}
          >
            <span
              className={`${
                isOpen ? 'text-[#39FF14]' : 'text-[#94A3B8]'
              } font-black text-2xl`}
              aria-hidden="true"
            >
              V.
            </span>
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
              isOpen
                ? 'rotate-180 text-[#39FF14]'
                : 'text-[#94A3B8] group-hover:text-[#39FF14]'
            }`}
          />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`overflow-hidden transition-all duration-300 px-6 ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#94A3B8] font-medium leading-relaxed pl-10 md:pl-12 border-l-4 border-[#39FF14] ml-2 py-2">
          <FaqText text={answer} />
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PRICING PAGE
// ---------------------------------------------------------------------------
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">

      {/* ==========================================================
          HERO SECTION — Fully Centered
      ========================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            {...responsiveImageProps('/img/bg-2.webp', [640, 828, 1080, 1920])}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-[#09090B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/0" />
        </div>

        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          {/* Phase 5: hero content renders without an entrance animation so it is visible on first paint (LCP); below-the-fold sections keep their animations. */}
          <div className="flex flex-col items-center justify-center text-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                  Alle prijzen in euro’s
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none text-center">
                IPTV ABONNEMENT <br />
                <span className="text-[#39FF14]">PRIJZEN</span>
              </h1>
            </div>

            <div>
              <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed px-2 text-center mb-6">
                Op zoek naar een goedkoop IPTV abonnement? Kies 3, 6 of 12 maanden voor 1, 2 of 3 apparaten, vanaf {formatEUR(PRICES[1][3])}. Hoe langer de looptijd, hoe lager de prijs per maand.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap justify-center gap-6 text-[#94A3B8] text-xs md:text-sm font-black uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#39FF14]" /> Geen contract
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#39FF14]" /> Installatiehulp
                </span>
                <span className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-[#39FF14]" /> Eerst gratis testen
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          MAIN PRICING CARDS
      ========================================================== */}
      <div className="w-full relative z-20 bg-[#09090B] py-12" id="pricing-section">
        <PricingSection />
      </div>

      {/* ==========================================================
          FEATURES GRID — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter leading-none">
              Dit zit in <span className="text-[#39FF14]">elk abonnement</span>
            </h2>
            <p className="text-[#94A3B8] text-lg font-bold max-w-2xl mx-auto mt-4">
              Je kiest de looptijd en het aantal apparaten. Eventuele extra’s staan per abonnement vermeld. Hoe bestellen en betalen werkt, lees je bij{' '}
              <Link href="/iptv-kopen" className="text-[#39FF14] font-black hover:underline">IPTV kopen</Link>.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tv,
                title: 'Live tv',
                desc: 'Live zenders via je internetverbinding, in de IPTV-app op je eigen apparaat.',
              },
              {
                icon: Film,
                title: 'Films en series',
                desc: 'Een on-demand bibliotheek met films en series die je kijkt wanneer je wilt.',
              },
              {
                icon: MonitorPlay,
                title: 'HD, Full HD en 4K',
                desc: 'Beeldkwaliteit tot 4K waar beschikbaar, afhankelijk van je apparaat en verbinding.',
              },
              {
                icon: Wifi,
                title: 'Eerst gratis testen',
                desc: 'Probeer het 24 uur gratis op je eigen apparaat voordat je betaalt.',
              },
              {
                icon: Calendar,
                title: 'Tv-gids en terugkijken',
                desc: 'Elektronische programmagids (EPG) en tot 7 dagen terugkijken.',
              },
              {
                icon: Trophy,
                title: 'Jouw apparaten',
                desc: 'Smart TV, Fire TV Stick, Android TV, Apple TV, telefoon, tablet, pc en MAG-box.',
              },
              {
                icon: Globe,
                title: 'Hulp via WhatsApp',
                desc: 'Installatiehulp en antwoord op je vragen via WhatsApp.',
              },
              {
                icon: Server,
                title: 'Geen contract',
                desc: 'Je betaalt eenmalig vooraf voor de gekozen looptijd.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <FadeInItem
                  key={idx}
                  className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 hover:border-[#39FF14] shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4 group-hover:bg-[#39FF14]/25 transition-colors">
                    <Icon className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="font-black text-[#F8FAFC] uppercase tracking-wide text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          COMPARISON TABLE — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] border-y border-[#27272A] w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
              Alle prijzen <span className="text-[#39FF14]">op een rij</span>
            </h2>
            <p className="text-[#94A3B8] text-base font-bold uppercase tracking-widest mt-2">
              Totaalprijs per looptijd en aantal apparaten
            </p>
          </FadeIn>

          <div className="overflow-x-auto bg-[#18181B] border border-[#27272A] rounded-3xl p-4 md:p-6 shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#27272A]">
                  <th className="text-left p-4 text-[#F8FAFC] font-black uppercase tracking-wider text-base md:text-lg">
                    Prijzen
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg">
                    3 maanden
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg bg-[#09090B] rounded-t-xl">
                    12 maanden (VIP)
                  </th>
                  <th className="text-center p-4 text-[#39FF14] font-black uppercase tracking-wider text-base md:text-lg">
                    6 maanden
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {[
                  ...([1, 2, 3] as DeviceCount[]).map((d) => ({
                    feature: d === 1 ? '1 apparaat' : `${d} apparaten`,
                    basic: formatEUR(PRICES[d][3]),
                    pro: formatEUR(PRICES[d][12]),
                    premium: formatEUR(PRICES[d][6]),
                  })),
                  {
                    feature: 'Per maand (1 apparaat)',
                    basic: formatEURExact(monthlyPrice(1, 3)),
                    pro: formatEURExact(monthlyPrice(1, 12)),
                    premium: formatEURExact(monthlyPrice(1, 6)),
                  },
                  {
                    feature: 'Besparing (1 apparaat)',
                    basic: '–',
                    pro: `${savingPercent(1, 12)}%`,
                    premium: `${savingPercent(1, 6)}%`,
                  },
                  { feature: 'Tv-gids & terugkijken', basic: 'Ja', pro: 'Ja', premium: 'Ja' },
                  { feature: 'VIP-serverlijn', basic: '–', pro: 'Ja', premium: '–' },
                  { feature: 'Gratis player-app', basic: '–', pro: '12 maanden', premium: '–' },
                  { feature: 'Hulp via WhatsApp', basic: 'Ja', pro: 'Met voorrang', premium: 'Ja' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#27272A]/30 transition-colors">
                    <td className="p-4 text-[#F8FAFC] font-black uppercase text-sm">{row.feature}</td>
                    <td className="p-4 text-center text-[#94A3B8] font-bold text-sm">{row.basic}</td>
                    <td className="p-4 text-center text-[#39FF14] font-black text-sm bg-[#09090B]/50">{row.pro}</td>
                    <td className="p-4 text-center text-[#94A3B8] font-bold text-sm">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================================
          TRUST BADGES — DARK
      ========================================================== */}
      <section className="py-24 bg-[#09090B] w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
              Waarom <span className="text-[#39FF14]">{CONSTANTS.BRAND_NAME}</span>
            </h2>
            <p className="text-[#94A3B8] text-lg font-bold max-w-2xl mx-auto mt-4">
              Duidelijke prijzen, eerst testen en persoonlijke hulp.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Betaalmethoden
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Betaal met creditcard (Visa, Mastercard), PayPal of crypto.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Snel aan de slag
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Na betaling ontvang je je inloggegevens via WhatsApp en helpen we je met de installatie.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Eerst gratis testen
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Test het 24 uur op je eigen apparaat en internetverbinding voordat je betaalt.
              </p>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl hover:-translate-y-1 hover:border-[#39FF14] transition-all">
              <div className="w-16 h-16 rounded-xl bg-[#39FF14]/15 flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
                Hulp via WhatsApp
              </h3>
              <p className="text-[#94A3B8] text-sm font-medium">
                Vragen over installatie, apps of betalen? Stuur ons een bericht via WhatsApp.
              </p>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          FREE TRIAL BANNER — DARK
      ========================================================== */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full">
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-10 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-[#39FF14] px-4 py-2 rounded-full mb-4 shadow-md border border-[#39FF14]/30">
            <Award className="w-4 h-4 text-[#09090B]" />
            <span className="text-[#09090B] font-black text-xs uppercase tracking-widest">
              Eerst proberen
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
            Gratis 24 uur testen
          </h3>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm md:text-base font-bold leading-relaxed">
            Vraag via WhatsApp een gratis proefperiode aan. Controleer de beeldkwaliteit, het aanbod en de werking op je eigen apparaat en internetverbinding. Kies pas daarna een betaald abonnement.
          </p>
        </div>
      </section>

      {/* ==========================================================
          FAQ — DARK
      ========================================================== */}
      <section className="w-full bg-[#09090B] py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tighter">
              Vragen over <span className="text-[#39FF14]">prijzen</span>
            </h2>
            <p className="text-[#94A3B8] font-bold text-lg">
              Antwoorden op de meest gestelde vragen over betalen, looptijden en apparaten.
            </p>
          </FadeIn>

          <FadeInStagger className="space-y-4 relative z-10">
            {pricingFaqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ==========================================================
          SHARE BUTTONS
      ========================================================== */}
      <div className="w-full flex justify-center items-center py-12 bg-[#09090B]">
        <ShareButtons />
      </div>

      {/* ==========================================================
          BOTTOM CTA — DARK
      ========================================================== */}
      <section className="py-20 bg-[#09090B] border-t border-[#27272A] w-full relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight">
              Klaar om te kiezen?
            </h2>
            <p className="text-[#94A3B8] font-bold text-lg mb-8 max-w-2xl mx-auto">
              Kies je abonnement, of lees eerst hoe IPTV kopen stap voor stap werkt. Je kunt altijd eerst 24 uur gratis testen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
              <Link
                href="#pricing-section"
                className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,215,0,0.3)] border-2 border-[#09090B]/30 hover:bg-[#E6C200] cursor-pointer"
              >
                Kies je abonnement
              </Link>
              <Link
                href="/installatie"
                className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 border-2 border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                Installatie
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-[#94A3B8] text-xs font-black uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#39FF14]" /> Hulp via WhatsApp
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#39FF14]" /> Geen contract
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-[#39FF14]" /> Creditcard, PayPal &amp; crypto
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}