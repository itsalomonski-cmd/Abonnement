'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useId, useState } from 'react';
import { CONSTANTS, FREE_TRIAL_WHATSAPP_URL, WHATSAPP_LINK_TARGET, whatsappUrl } from '@/lib/seo';
import { buyFaqs } from '@/lib/page-faqs';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import { useHasMounted } from '@/hooks/use-has-mounted';
import {
  PlayCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Medal,
  Trophy,
  MessageCircle,
  Tv,
  Film,
  Sparkles,
  ChevronDown,
  KeyRound,
  Smartphone,
  CreditCard,
  Star,
  Users,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import { FaqText } from '@/lib/faq-text';
import { responsiveImageProps } from '@/lib/blog-helpers';

const PricingSection = dynamic(() => import('../components/PricingSection'), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#39FF14] border-t-transparent" />
    </div>
  ),
});

const PartnerSlider = dynamic(() => import('../components/PartnerSlider'), {
  loading: () => <div className="h-32 bg-transparent max-w-7xl mx-auto" />,
});

const MovieSlider = dynamic(() => import('../components/MovieSlider'), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[2/3] bg-[#18181B] rounded-2xl animate-pulse" />
      ))}
    </div>
  ),
});

const GlobalServerMap = dynamic(() => import('../components/GlobalServerMap'), {
  loading: () => <div className="h-[400px] bg-[#18181B] rounded-3xl animate-pulse max-w-7xl mx-auto" />,
});

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// FAQ ACCORDION ITEM
// ---------------------------------------------------------------------------
function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // Accessible accordion: heading contains the toggle button; the answer sits
  // outside it (it used to be inside, becoming part of the button's name).
  // Padding is split between header and answer so the card looks the same.
  return (
    <div
      className={`w-full text-left bg-[#18181B] border-2 ${
        isOpen ? 'border-[#39FF14]' : 'border-[#27272A]'
      } rounded-2xl hover:border-[#39FF14]/60 transition-all duration-300 group`}
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
            {q}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
              isOpen
                ? 'rotate-180 text-[#39FF14]'
                : 'text-[#94A3B8] group-hover:text-[#39FF14]/50'
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
          <FaqText text={a} />
        </p>
      </div>
    </div>
  );
}

export default function IptvKopenPage() {
  // false during SSR/hydration, true on the client (same gating as before).
  const isMounted = useHasMounted();

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC] overflow-hidden">

      {/* HERO */}
      <section className="relative px-15 py-24 md:py-40 overflow-hidden flex flex-col items-center justify-center text-center min-h-screen w-full bg-[#09090B]">
        <div className="absolute inset-0 z-0">
          <img
            {...responsiveImageProps('/img/background.webp', [640, 828, 1080, 1920])}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/60 to-[#09090B]/90" />
        </div>

        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Phase 5: hero content renders without an entrance animation so it is visible on first paint (LCP); below-the-fold sections keep their animations. */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center my-auto w-full">
          <div className="inline-flex items-center gap-2 bg-[#18181B]/80 border border-[#39FF14]/40 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
            <Medal className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-extrabold text-xs uppercase tracking-widest flex items-center gap-2">
              Eerst 24 uur gratis testen
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-[#F8FAFC] mb-6 leading-none break-words">
            IPTV KOPEN <br />
            <span className="text-[#39FF14]">IN NEDERLAND</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-10 font-medium leading-relaxed px-2">
            Zo werkt het als je een IPTV abonnement koopt bij {BRAND}: eerst gratis testen, dan je abonnement kiezen, betalen en installeren. Je inloggegevens ontvang je via WhatsApp, met hulp bij elke stap. Prijzen in euro’s, zonder contract.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-xl mx-auto px-4">
            <Link
              href="/prijzen"
              className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm hover:bg-[#E6C200] transition-all hover:scale-105 uppercase tracking-wider shrink-0 shadow-lg shadow-[#FFD700]/30 border border-[#09090B]/20 cursor-pointer"
            >
              Bekijk de prijzen
            </Link>
            <a
              href={FREE_TRIAL_WHATSAPP_URL}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-full bg-[#18181B]/80 text-[#F8FAFC] border border-[#27272A] font-black text-sm hover:bg-[#27272A] transition-all hover:scale-105 uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 backdrop-blur-md cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-[#39FF14] shrink-0" /> Gratis testen
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs md:text-sm text-[#F8FAFC] font-bold uppercase tracking-widest bg-[#18181B]/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-[#27272A] shadow-2xl">
            <span className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#39FF14]" /> Inloggegevens via WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#39FF14]" /> Werkt met Xtream Codes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#39FF14]" /> Voor de meeste IPTV-apps
            </span>
          </div>
        </div>
      </section>

      {/* 3 STEP SETUP */}
      <section className="py-28 bg-[#09090B] w-full relative overflow-hidden border-t border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-2 rounded-full mb-6 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                  Zo koop je IPTV
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F8FAFC] tracking-tight uppercase leading-[1.05]">
                IPTV ABONNEMENT KOPEN <br className="hidden sm:block" />
                <span className="text-[#39FF14] relative inline-block mt-1">
                  IN 3 STAPPEN
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#39FF14]/60 to-transparent rounded-full" />
                </span>
              </h2>

              <p className="text-[#94A3B8] text-base sm:text-lg mt-6 font-semibold max-w-2xl leading-relaxed">
                We houden het simpel. Kies je abonnement, stuur ons een bericht via WhatsApp voor je inloggegevens en we helpen je met de installatie op je apparaat. Wil je eerst testen? Vraag dan de gratis proefperiode van 24 uur aan.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative">
            {/* Step 1 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#18181B] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border border-[#27272A] shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#09090B] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#27272A] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#09090B] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    01
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#09090B] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 1
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Kies je abonnement
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Kies hoeveel apparaten er tegelijk kijken en een looptijd van 3, 6 of 12 maanden. Alle prijzen zijn in euro’s en er is geen contract.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> 1, 2 of 3 apparaten</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> 3, 6 of 12 maanden</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Creditcard, PayPal of crypto</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#27272A] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Eenvoudig kiezen
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#09090B] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#09090B] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            {/* Step 2 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#18181B] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border border-[#27272A] shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#09090B] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#27272A] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#09090B] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    02
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#09090B] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 2
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Ontvang je inloggegevens
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Stuur ons een bericht via WhatsApp en na je betaling ontvang je je inloggegevens in de chat: een serveradres, gebruikersnaam en wachtwoord voor Xtream Codes.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Gegevens via WhatsApp</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Xtream Codes of M3U</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Persoonlijke begeleiding</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#27272A] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Snel geregeld
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#09090B] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#09090B] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            {/* Step 3 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#18181B] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border border-[#27272A] shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#09090B] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#27272A] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <KeyRound className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#09090B] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    03
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#09090B] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 3
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Inloggen en kijken
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Installeer een app zoals IPTV Smarters Pro, TiviMate of IBO Player Pro, vul je gegevens in en de zenderlijst laadt automatisch. Test alles eerst met de{' '}
                  <Link href="/blog/iptv-gratis-proefperiode" className="text-[#39FF14] font-black hover:underline">gratis proefperiode</Link>.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Werkt met populaire apps</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Zenderlijst laadt vanzelf</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Eerst gratis testen</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#27272A] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Klaar om te kijken
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#09090B] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#09090B] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* PARTNER SLIDER */}
      <div className="min-h-[128px]">
        {isMounted ? <PartnerSlider /> : <div className="h-32 bg-transparent" />}
      </div>

      {/* LIVING ROOM */}
      <section className="w-full bg-[#09090B] py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden border-t border-[#27272A]">
        <div className="w-full max-w-7xl px-4 text-center mb-8">
          <span className="mb-4 inline-flex rounded-full bg-[#18181B] border border-[#27272A] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#39FF14]">
            Thuis kijken
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#F8FAFC] leading-none">
            IPTV OP JE <span className="text-[#39FF14]">GROTE SCHERM</span>
          </h2>
        </div>

        <div className="w-full bg-black/40 py-10 flex justify-center items-center transition-all duration-300">
          <div className="w-full max-w-[1100px] px-6 h-auto aspect-[5/2] flex justify-center items-center">
            <img
              {...responsiveImageProps('/img/sofa.webp', [640, 828, 1200])}
              alt="Bank in een moderne woonkamer"
              width={1200}
              height={480}
              loading="lazy"
              className="h-full w-full object-contain"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>

        <div className="w-full max-w-3xl px-4 text-center mt-10">
          <p className="text-base md:text-lg leading-relaxed text-[#94A3B8] font-medium">
            Zodra je inloggegevens in een geschikte app staan, kijk je op je Smart TV, Fire TV Stick of telefoon. Voor het stabielste beeld gebruik je een netwerkkabel of sterk wifi-signaal. In de{' '}
            <Link href="/installatie" className="text-[#39FF14] font-black hover:underline">installatiehandleiding</Link> lees je per apparaat hoe je begint.
          </p>
          <div className="w-full flex justify-center mt-8">
            <Link
              href="/prijzen"
              className="bg-[#FFD700] border border-[#09090B]/20 px-8 py-3 text-sm font-black uppercase tracking-widest text-[#09090B] hover:bg-[#E6C200] transition-transform hover:scale-105 rounded-full shadow-xl shadow-[#FFD700]/30 cursor-pointer"
            >
              Bekijk de prijzen
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-24 bg-[#09090B] relative overflow-hidden border-t border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Wat je krijgt
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tight leading-tight mb-6">
              ÉÉN ACCOUNT, <span className="text-[#39FF14]">ALLES IN ÉÉN APP</span>
            </h2>
            <p className="text-[#94A3B8] font-semibold text-base md:text-lg leading-relaxed">
              Met je inloggegevens kijk je in één app op je eigen apparaat. Dit zit in elk abonnement.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tv,
                title: 'Live tv',
                desc: 'Live zenders met tv-gids (EPG). Het actuele zenderoverzicht ontvang je via WhatsApp.',
              },
              {
                icon: Film,
                title: 'Films en series',
                desc: 'Een on-demand bibliotheek met films en series die je kijkt wanneer het jou uitkomt.',
              },
              {
                icon: Trophy,
                title: 'Sport kijken',
                desc: 'Vraag via WhatsApp welke sportzenders beschikbaar zijn en test het eerst 24 uur gratis.',
              },
              {
                icon: KeyRound,
                title: 'Xtream Codes-inlog',
                desc: 'Serveradres, gebruikersnaam en wachtwoord voor IPTV Smarters Pro, TiviMate, IBO Player Pro en XCIPTV.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeInItem
                  key={idx}
                  className="bg-[#18181B] text-[#F8FAFC] rounded-3xl p-6 md:p-7 border border-[#27272A] hover:border-[#39FF14] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/10 flex items-center justify-center mb-5 shadow-lg">
                    <Icon className="w-7 h-7 text-[#39FF14]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>

          {/* Small trust row */}
          <FadeIn className="mt-14 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Zap, label: 'Snel geregeld' },
                { icon: ShieldCheck, label: 'Geen contract' },
                { icon: Users, label: '1, 2 of 3 apparaten' },
                { icon: Star, label: `Vanaf ${formatEUR(LOWEST_PRICE)}` },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#18181B] text-[#F8FAFC] rounded-2xl p-4 border border-[#27272A]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#09090B] flex items-center justify-center shrink-0 border border-[#27272A]">
                      <Icon className="w-5 h-5 text-[#39FF14]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn className="text-center mt-14">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link
                href="/prijzen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-all border border-[#09090B]/20 cursor-pointer"
              >
                Bekijk de prijzen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={whatsappUrl(`Hallo ${CONSTANTS.BRAND_NAME}! Ik heb een vraag over het kopen van een IPTV abonnement.`)}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-all border border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#39FF14]" />
                Vraag het via WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING SECTION */}
      <div className="min-h-[600px] bg-[#09090B]" id="pricing-section">
        {isMounted ? <PricingSection /> : <div className="h-[600px] bg-transparent" />}
      </div>

      {/* MOVIE SLIDER */}
      <section id="channels" className="pt-24 bg-[#09090B] max-w-[100vw] overflow-hidden relative min-h-[400px] border-t border-[#27272A]">
        <FadeIn className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between items-start mb-12 gap-6 relative z-10 w-full">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight leading-none">
              FILMS, SERIES EN <span className="text-[#39FF14]">LIVE TV</span>
            </h2>
            <p className="text-[#94A3B8] font-medium text-lg">
              Je IPTV abonnement combineert live tv met een on-demand bibliotheek met films en series.
            </p>
          </div>
        </FadeIn>
        {isMounted ? (
          <MovieSlider />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-[#18181B] rounded-2xl" />
            ))}
          </div>
        )}
      </section>

      {/* GLOBAL SERVER MAP */}
      <div className="min-h-[400px] bg-[#09090B]">
        {isMounted ? <GlobalServerMap /> : <div className="h-[400px] bg-transparent" />}
      </div>

      {/* CUSTOM FAQ */}
      <section className="py-24 bg-[#09090B] relative overflow-hidden border-t border-[#27272A]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#39FF14]/5 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Veelgestelde vragen
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight leading-tight">
              VRAGEN OVER <span className="text-[#39FF14]">IPTV KOPEN</span>
            </h2>
            <p className="text-[#94A3B8] font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              De meest gestelde vragen over het kopen, betalen en installeren van een IPTV abonnement.
            </p>
          </FadeIn>

          <FadeInStagger className="space-y-4">
            {buyFaqs.map((faq, i) => (
              <FadeInItem key={i}>
                <FAQItem q={faq.q} a={faq.a} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full">
        <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-[#27272A] bg-[#18181B] shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="h-2 w-full bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700]" />

            <FadeIn className="relative z-10 px-5 py-10 text-center sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#09090B] px-4 py-2 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#39FF14]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#39FF14] flex items-center gap-1.5">
                  IPTV kopen
                </span>
              </div>

              <h2 className="mx-auto max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#F8FAFC] leading-[1.05] mb-6">
                BEGIN MET EEN <br />
                <span className="text-[#39FF14]">GRATIS TEST</span>
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#94A3B8]">
                Stuur ons een bericht via WhatsApp en probeer het 24 uur gratis. Daarna kies je zelf je abonnement en helpen we je stap voor stap met de installatie.
              </p>

              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {[
                  [formatEUR(LOWEST_PRICE), 'Vanaf, 3 maanden'],
                  ['24 uur', 'Gratis testen'],
                  ['0', 'Contract'],
                  ['1–3', 'Apparaten'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl sm:rounded-3xl border border-[#27272A] bg-[#09090B] p-4 shadow-sm hover:border-[#39FF14] transition-colors">
                    <div className="text-2xl sm:text-3xl font-black text-[#39FF14]">{value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#94A3B8]">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                <Link
                  href="/prijzen"
                  className="w-full sm:w-auto text-center whitespace-nowrap rounded-2xl bg-[#FFD700] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#09090B] hover:bg-[#E6C200] transition-all hover:scale-105 shrink-0 shadow-lg shadow-[#FFD700]/25 border border-[#09090B]/20 cursor-pointer"
                >
                  Kies je abonnement
                </Link>
                <a
                  href={FREE_TRIAL_WHATSAPP_URL}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl border border-[#27272A] bg-[#09090B] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#F8FAFC] hover:border-[#39FF14] transition-all hover:scale-105 shrink-0 shadow-sm cursor-pointer"
                >
                  <PlayCircle className="h-4 w-4 text-[#39FF14] shrink-0" /> Gratis 24 uur testen
                </a>
              </div>

              <p className="mt-8 text-[11px] sm:text-xs font-black text-[#39FF14] uppercase tracking-wider">
                Inloggegevens via WhatsApp • Hulp bij de installatie • Geen contract
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}