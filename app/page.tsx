import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FAQSchema } from './components/PageSchemas';
import { CONSTANTS, FREE_TRIAL_WHATSAPP_URL, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { LOWEST_PRICE, formatEUR, savingPercent } from '@/lib/pricing';
import { blogPosts } from '@/lib/blog';
import { blogImageProps, getPostReadMinutes, responsiveImageProps } from '@/lib/blog-helpers';
import {
  PlayCircle,
  BookOpen,
  ShieldCheck,
  Zap,
  Download,
  CreditCard,
  CheckCircle2,
  MonitorSmartphone,
  Tv2,
  Cpu,
  ArrowRight,
  Lock,
  ThumbsUp,
  Trophy,
  Medal,
  LifeBuoy,
  Settings,
  Check,
  Smartphone,
  BarChart,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from './components/AnimatedSection';
import AnimatedCounter from './components/AnimatedCounter';
import ShareButtons from './components/ShareButtons';

/* =========================================================
   IPTVABONNEMENT — BRAND COLOR SYSTEM (original template palette)
   Primary Accent : #39FF14 (neon green)
   Secondary      : #008000 (dark green — sparing)
   CTA            : #FFD700 (gold — high-priority conversion)
   Main BG        : #081425
   Surface        : #0B1F35
   Card           : #0F2942
   Border         : #1E3A52 / #223E56
   Text           : #F8FAFC / #94A3B8
   ========================================================= */

// Images inside `hidden lg:block` containers are still downloaded by browsers
// when they are eager. Serving them through <picture> with this media query
// means mobile only receives a 1x1 inline placeholder (never displayed, since
// the container is display:none), while desktop gets the original file.
// 64rem = Tailwind's `lg` breakpoint.
const DESKTOP_ONLY_MEDIA = '(min-width: 64rem)';

// The root layout's relative canonical ('./') can resolve to "/index" for the
// homepage in production builds, so the homepage declares its absolute URL
// explicitly. Everything else is inherited from the root layout.
export const metadata: Metadata = {
  alternates: {
    canonical: CONSTANTS.SITE_URL,
    languages: {
      'nl-NL': CONSTANTS.SITE_URL,
      'x-default': CONSTANTS.SITE_URL,
    },
  },
};
// Highest 12-month saving across the 1/2/3-device plans (lib/pricing.ts).
const MAX_SAVING_12 = Math.max(savingPercent(1, 12), savingPercent(2, 12), savingPercent(3, 12));

const HIDDEN_IMG_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const LoadingSpinner = () => (
  <div className="min-h-[600px] flex items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#39FF14] border-t-transparent" />
  </div>
);

const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => <LoadingSpinner />,
});

const MovieSlider = dynamic(() => import('./components/MovieSlider'), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[2/3] bg-[#0F2942]/60 rounded-2xl animate-pulse" />
      ))}
    </div>
  ),
});

const PartnerSlider = dynamic(() => import('./components/PartnerSlider'), {
  loading: () => <div className="h-32 bg-transparent max-w-7xl mx-auto" />,
});

const GlobalServerMap = dynamic(() => import('./components/GlobalServerMap'), {
  loading: () => (
    <div className="h-[400px] bg-[#0F2942]/60 rounded-3xl animate-pulse max-w-7xl mx-auto" />
  ),
});

const FAQ = dynamic(() => import('./components/FAQ'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#39FF14] border-t-transparent" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#081425] text-[#F8FAFC] overflow-hidden">
      <FAQSchema />

      {/* =========================================================
          HERO SECTION — two-column (content left, transparent image right)
          ========================================================= */}
      <section className="relative px-4 pt-36 pb-12 md:pt-24 md:pb-16 lg:pt-38 lg:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[85vh] lg:min-h-[90vh] w-full bg-[#081425]">
        <div className="absolute inset-0 z-0">
          <img
            {...responsiveImageProps('/img/background.webp', [640, 828, 1080, 1920])}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.28]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081425]/10 via-[#0B1F35]/40 to-[#081425]/85" />
        </div>

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(30,58,82,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,82,0.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="hidden lg:block absolute bottom-0 right-0 w-[80%] h-[90%] z-[2] pointer-events-none">
          {/* Desktop-only decorative art: the file is requested only at the lg
              breakpoint (64rem), matching the container's `hidden lg:block`. */}
          <picture>
            <source
              media={DESKTOP_ONLY_MEDIA}
              srcSet={responsiveImageProps('/img/neon.webp', [1080, 1200, 1920]).srcSet}
              sizes="80vw"
            />
            <img
              src={HIDDEN_IMG_PLACEHOLDER}
              alt=""
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-bottom-right opacity-80"
              aria-hidden="true"
            />
          </picture>
        </div>

        <div className="absolute -top-20 left-1/3 -translate-x-1/2 w-[500px] h-[300px] bg-[#39FF14]/10 blur-[140px] rounded-full pointer-events-none z-[1]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[260px] bg-[#008000]/15 blur-[140px] rounded-full pointer-events-none z-[1]" />

        {/* Phase 5: hero content renders without an entrance animation so it is visible on first paint (LCP); below-the-fold sections keep their animations. */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#0B1F35]/70 border border-[#39FF14]/50 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              <Medal className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#F8FAFC] font-extrabold text-[10px] sm:text-xs uppercase tracking-widest">
                Eerst 24 uur gratis testen
              </span>
            </div>

            <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight uppercase text-[#F8FAFC] mb-5 leading-[1.05]">
              <span className="text-[#39FF14]">IPTV abonnement</span> voor Nederland
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl lg:max-w-lg mx-auto lg:mx-0 mb-8 font-medium leading-relaxed">
              Kijk live tv, films en series op je Smart TV, Fire TV Stick, telefoon of tablet. Kies 3, 6 of 12 maanden, vanaf {formatEUR(LOWEST_PRICE)}. Zonder contract en met hulp bij de installatie via WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start w-full sm:w-auto mb-8">
              <Link
                href="/prijzen"
                className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-full bg-[#FFD700] text-[#081425] font-black text-sm hover:bg-[#E6C200] transition-all hover:scale-105 uppercase tracking-wider shrink-0 shadow-lg shadow-[#FFD700]/30 cursor-pointer"
              >
                Bekijk de prijzen
              </Link>
              <a
                href={FREE_TRIAL_WHATSAPP_URL}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-full bg-[#0B1F35]/70 text-[#F8FAFC] border border-[#39FF14]/40 font-black text-sm hover:bg-[#0F2942] transition-all hover:scale-105 uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 backdrop-blur-md cursor-pointer"
              >
                <PlayCircle className="w-5 h-5 text-[#39FF14] shrink-0" /> Gratis testen
              </a>
            </div>

            <div className="flex flex-nowrap justify-center lg:justify-start gap-3 sm:gap-6 text-[10px] md:text-xs text-[#F8FAFC] font-bold uppercase tracking-widest w-full">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Zap className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> Full HD &amp; 4K
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> Geen contract
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14] shrink-0" /> Hulp via WhatsApp
              </span>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[90%] h-[90%] bg-[#39FF14]/15 blur-[110px] rounded-full" />
            </div>
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4]">
              {/* Desktop-only hero art (parent is `hidden lg:block`): keep high
                  priority on desktop, but never download it on mobile.
                  Restored on the owner's request after the Phase 2 removal.
                  Note: the artwork shows 6 / 12 / 24-month cards (the plans
                  are 3 / 6 / 12 months), English labels, "Abonnemeent" and a
                  "Z" mark; replace the file once corrected artwork exists. */}
              <picture>
                <source media={DESKTOP_ONLY_MEDIA} srcSet="/img/hero.webp" />
                <img
                  src={HIDDEN_IMG_PLACEHOLDER}
                  alt="Tv, mediaspelers, telefoon en tablet met abonnementskaarten"
                  fetchPriority="high"
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-contain scale-110"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PARTNER SLIDER
          ========================================================= */}
      <div className="min-h-[128px] bg-[#081425]">
        <PartnerSlider />
      </div>

      {/* =========================================================
          3-STEP SETUP GUIDE
          ========================================================= */}
      <section className="py-28 bg-[#081425] w-full relative overflow-hidden border-t border-[#1E3A52]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A52_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.15] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 bg-[#0B1F35]/70 border border-[#39FF14]/30 px-4 py-2 rounded-full mb-6 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                  Zo werkt het
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F8FAFC] tracking-tight uppercase leading-[1.05]">
                IN 3 STAPPEN <br className="hidden sm:block" />
                <span className="text-[#39FF14] relative inline-block mt-1">
                  TV KIJKEN
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#39FF14]/70 to-transparent rounded-full" />
                </span>
              </h2>

              <p className="text-[#94A3B8] text-base sm:text-lg mt-6 font-semibold max-w-2xl leading-relaxed">
                Je hebt geen technische kennis nodig. Kies een abonnement, ontvang je inloggegevens via WhatsApp en kijk op het apparaat dat je al hebt: Fire TV Stick, Smart TV, iPhone, Android of pc. Per apparaat lees je de stappen in de{' '}
                <Link href="/installatie" className="text-[#39FF14] font-black hover:underline">installatiehandleiding</Link>; hoe bestellen werkt, lees je bij{' '}
                <Link href="/iptv-kopen" className="text-[#39FF14] font-black hover:underline">IPTV kopen</Link>.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative">
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#0F2942] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border-2 border-[#1E3A52] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.18)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#081425] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#39FF14]/40 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Tv2 className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#081425] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    01
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#081425] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 1
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Kies je abonnement
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Kies het abonnement dat bij je huishouden past: 1, 2 of 3 apparaten tegelijk en een looptijd van 3, 6 of 12 maanden. Alle prijzen zijn in euro’s, zonder verborgen kosten en zonder contract.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> 1, 2 of 3 apparaten
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> 3, 6 of 12 maanden
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Prijzen in euro’s, geen contract
                  </li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#1E3A52] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Eenvoudig kiezen
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#081425] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#081425] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#0F2942] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border-2 border-[#1E3A52] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.18)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#081425] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#39FF14]/40 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Download className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#081425] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    02
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#081425] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 2
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Ontvang je inloggegevens
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Na je bestelling ontvang je je M3U-link of Xtream Codes-gegevens via WhatsApp. Open een app zoals IPTV Smarters Pro, TiviMate of Smart IPTV, vul je gegevens in en je kijkt. Werkt op Fire TV Stick, Android TV, Apple TV, Smart TV’s, telefoons en computers.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> M3U &amp; Xtream Codes via WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Werkt met IPTV Smarters Pro &amp; TiviMate
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Hulp bij de installatie
                  </li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#1E3A52] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Snel geregeld
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#081425] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#081425] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-[#0F2942] text-[#F8FAFC] rounded-[2.5rem] p-8 sm:p-10 border-2 border-[#1E3A52] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-[#39FF14] hover:shadow-[0_25px_50px_rgba(57,255,20,0.18)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#081425] text-[#F8FAFC] shadow-lg shadow-black/40 border border-[#39FF14]/40 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-[#39FF14]" />
                  </div>
                  <span className="text-5xl font-black text-[#081425] bg-[#39FF14] px-4 py-1 rounded-2xl shadow-md tracking-tight">
                    03
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#081425] bg-[#39FF14] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  Stap 3
                </div>

                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
                  Kijken maar
                </h3>

                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed mb-6">
                  Kijk live tv, films en series op het moment dat het jou uitkomt. Loop je ergens tegenaan? Stuur ons een bericht via WhatsApp, dan helpen we je verder.
                </p>

                <ul className="text-xs font-bold text-[#94A3B8] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Live tv &amp; on demand
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Tv-gids &amp; 7 dagen terugkijken
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Hulp via WhatsApp
                  </li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#1E3A52] flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#39FF14] transition-colors">
                  Klaar om te kijken
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#081425] text-[#F8FAFC] flex items-center justify-center shadow-md group-hover:bg-[#39FF14] group-hover:text-[#081425] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          MEDIA GRID / CHANNELS
          ========================================================= */}
      <section
        id="channels"
        className="pt-24 bg-[#081425] max-w-[100vw] overflow-hidden relative min-h-[400px] border-t border-[#1E3A52]"
      >
        <FadeIn className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between items-start mb-12 gap-6 relative z-10 w-full">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight leading-none">
              FILMS, SERIES EN LIVE TV
            </h2>
            <p className="text-[#94A3B8] font-medium text-lg">
              Live tv en een on-demand bibliotheek met films en series, in één app op je eigen apparaat. Het actuele zenderoverzicht ontvang je via WhatsApp; tijdens de gratis proefperiode controleer je zelf of het aanbod bij je past.
            </p>
          </div>
        </FadeIn>
        <MovieSlider />
      </section>

      {/* =========================================================
          PRICING SECTION
          ========================================================= */}
      <div className="min-h-[600px] bg-[#081425]" id="pricing-section">
        <PricingSection />
      </div>

      <section className="w-full max-w-4xl mx-auto px-4 my-8 flex justify-center items-center bg-[#081425]">
        <ShareButtons />
      </section>

      {/* =========================================================
          TRUST BADGES
          ========================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#081425]">
        <div className="bg-[#0F2942] text-[#F8FAFC] border border-[#1E3A52] rounded-3xl p-8 md:p-12 shadow-2xl">
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#081425] border border-[#39FF14]/30 flex items-center justify-center shrink-0">
                <Lock className="w-7 h-7 text-[#39FF14]" />
              </div>
              <div>
                <div className="font-black text-[#F8FAFC] text-lg uppercase tracking-tight">
                  Betaalmethoden
                </div>
                <p className="text-[#94A3B8] font-medium text-xs mt-1">
                  Creditcard, PayPal of crypto
                </p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#081425] border border-[#39FF14]/30 flex items-center justify-center shrink-0">
                <ThumbsUp className="w-7 h-7 text-[#39FF14]" />
              </div>
              <div>
                <div className="font-black text-[#F8FAFC] text-lg uppercase tracking-tight">
                  Eerst gratis testen
                </div>
                <p className="text-[#94A3B8] font-medium text-xs mt-1">
                  Probeer het 24 uur op je eigen apparaat
                </p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#081425] border border-[#39FF14]/30 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-7 h-7 text-[#39FF14]" />
              </div>
              <div>
                <div className="font-black text-[#F8FAFC] text-lg uppercase tracking-tight">
                  Hulp via WhatsApp
                </div>
                <p className="text-[#94A3B8] font-medium text-xs mt-1">
                  Bij installatie en vragen
                </p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#081425] border border-[#39FF14]/30 flex items-center justify-center shrink-0">
                <Medal className="w-7 h-7 text-[#39FF14]" />
              </div>
              <div>
                <div className="font-black text-[#F8FAFC] text-lg uppercase tracking-tight">
                  Prijzen in euro’s
                </div>
                <p className="text-[#94A3B8] font-medium text-xs mt-1">
                  Eenmalig vooraf, geen contract
                </p>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          LIVING ROOM SECTION
          ========================================================= */}
      <section className="w-full bg-[#081425] py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl px-4 text-center mb-8">
          <span className="mb-4 inline-flex rounded-full bg-[#0B1F35] border border-[#39FF14]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#39FF14]">
            Thuis tv kijken
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#F8FAFC] leading-none">
            GEWOON KIJKEN IN JE <span className="text-[#39FF14]">WOONKAMER</span>
          </h2>
        </div>

        <div className="w-full bg-[#081425] py-10 flex justify-center items-center transition-all duration-300">
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
            Met een IPTV abonnement kijk je via je internetverbinding, zonder schotel of kabelaansluiting. Een stabiele verbinding is daarbij het belangrijkst: gebruik waar mogelijk een netwerkkabel of een sterk wifi-signaal.
          </p>
          <div className="w-full flex justify-center mt-8">
            <Link
              href="/prijzen"
              className="bg-[#FFD700] px-8 py-3 text-sm font-black uppercase tracking-widest text-[#081425] hover:bg-[#E6C200] transition-transform hover:scale-105 rounded-full shadow-xl shadow-[#FFD700]/30"
            >
              Kies je abonnement
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          GEANIMEERDE STATISTIEKEN
          ========================================================= */}
      <section className="py-24 bg-[#09090B] relative overflow-hidden border-y border-[#27272A]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight">
              JE ABONNEMENT IN HET KORT
            </h2>
            <p className="text-[#39FF14] text-base font-bold mt-4 uppercase tracking-wider">
              Wat je krijgt bij {CONSTANTS.BRAND_NAME}.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <FadeInItem className="flex flex-col items-center p-6 bg-[#18181B] text-[#F8FAFC] rounded-3xl border border-[#27272A] shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#39FF14] mb-2">
                <AnimatedCounter value={25} suffix="K+" />
              </span>
              <span className="text-xs text-[#94A3B8] font-extrabold uppercase tracking-widest mt-2">
                Actieve abonnees
              </span>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center p-6 bg-[#18181B] text-[#F8FAFC] rounded-3xl border border-[#27272A] shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#39FF14] mb-2">
                <AnimatedCounter value={55} suffix="K+" />
              </span>
              <span className="text-xs text-[#94A3B8] font-extrabold uppercase tracking-widest mt-2">
                Live zenders
              </span>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center p-6 bg-[#18181B] text-[#F8FAFC] rounded-3xl border border-[#27272A] shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#39FF14] mb-2">
                <AnimatedCounter value={150} suffix="K+" />
              </span>
              <span className="text-xs text-[#94A3B8] font-extrabold uppercase tracking-widest mt-2">
                On-demand titels
              </span>
            </FadeInItem>

            <FadeInItem className="flex flex-col items-center p-6 bg-[#18181B] text-[#F8FAFC] rounded-3xl border border-[#27272A] shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#39FF14] mb-2">
                <AnimatedCounter value={99.9} decimals={1} suffix="%" />
              </span>
              <span className="text-xs text-[#94A3B8] font-extrabold uppercase tracking-widest mt-2">
                Server uptime
              </span>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          BENEFITS SECTION
          ========================================================= */}
      <section className="py-24 bg-[#081425] relative overflow-hidden border-t border-[#1E3A52]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A52_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#0B1F35] border border-[#39FF14]/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Wat je krijgt
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight leading-none">
              WAT ZIT ER IN EEN <span className="text-[#39FF14]">IPTV ABONNEMENT?</span>
            </h2>
            <p className="text-[#94A3B8] font-semibold text-lg max-w-3xl mx-auto leading-relaxed">
              Elk abonnement van {CONSTANTS.BRAND_NAME} bevat dezelfde basis. Je kiest de looptijd en het aantal apparaten dat tegelijk kijkt; eventuele extra’s staan per abonnement vermeld.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                ),
                title: 'Films en series on demand',
                desc: 'Naast live tv bekijk je films en series wanneer het jou uitkomt, in dezelfde app.',
              },
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Eerst gratis testen',
                desc: 'Probeer het 24 uur gratis op je eigen apparaat en internetverbinding voordat je betaalt.',
              },
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'HD, Full HD en 4K',
                desc: 'Beeldkwaliteit tot 4K waar beschikbaar, afhankelijk van je apparaat en internetverbinding.',
              },
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Installatiehulp via WhatsApp',
                desc: 'Lukt de installatie niet? Via WhatsApp helpen we je stap voor stap tot je kijkt.',
              },
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Tv-gids en 7 dagen terugkijken',
                desc: 'Met de elektronische programmagids (EPG) zie je wat er op tv is en kijk je programma’s tot 7 dagen terug.',
              },
              {
                iconSvg: (
                  <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Meerdere apparaten',
                desc: 'Eén account voor je Smart TV, Fire TV Stick, telefoon en tablet. Kies 1, 2 of 3 apparaten die tegelijk kijken.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0F2942] text-[#F8FAFC] rounded-[2.5rem] p-8 border-2 border-[#1E3A52] shadow-xl hover:border-[#39FF14] hover:shadow-[0_20px_45px_rgba(57,255,20,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#081425] border border-[#39FF14]/40 flex items-center justify-center mb-6 shadow-lg shadow-black/30">
                    {item.iconSvg}
                  </div>
                  <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] font-medium text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1E3A52] flex items-center justify-between text-xs font-bold text-[#39FF14]">
                  <span className="uppercase tracking-wider">Inbegrepen</span>
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          GLOBAL SERVER MAP
          ========================================================= */}
      <div className="min-h-[400px] bg-[#081425]">
        <GlobalServerMap />
      </div>

      {/* =========================================================
          CHANNEL CATEGORIES
          ========================================================= */}
      <section className="py-24 bg-[#081425] relative border-t border-[#1E3A52]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0B1F35] border border-[#39FF14]/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Wat kun je kijken?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight leading-none">
              ONTDEK DE <span className="text-[#39FF14]">CATEGORIEËN</span>
            </h2>
            <p className="text-[#94A3B8] font-semibold text-lg max-w-3xl mx-auto leading-relaxed">
              Van sport tot films en internationale zenders: het actuele aanbod ontvang je via WhatsApp en test je eerst 24 uur gratis.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                cat: 'Sport',
                channels: 'Live sport stelt de hoogste eisen aan je verbinding. Test het sportaanbod tijdens de gratis proefperiode.',
                footer: ['Live', 'Sport'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                cat: 'Internationaal',
                channels: 'Zenders uit andere landen en in andere talen. Vraag via WhatsApp welke landen beschikbaar zijn.',
                footer: ['HD', 'Live'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
              },
              {
                cat: 'Films & on demand',
                channels: 'Een bibliotheek met films en series die je start wanneer het jou uitkomt.',
                footer: ['On demand', 'Beschikbaar'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                ),
              },
              {
                cat: 'Kinderen & familie',
                channels: 'Programma’s voor het hele gezin. Met 2 of 3 apparaten kijken kinderen op een eigen scherm.',
                footer: ['HD', 'Gezin'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                cat: 'Series',
                channels: 'Complete seizoenen on demand, in dezelfde app als je live zenders.',
                footer: ['On demand', 'Beschikbaar'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                ),
              },
              {
                cat: 'Documentaires',
                channels: 'Programma’s over natuur, wetenschap en geschiedenis voor wie graag iets leert.',
                footer: ['HD', 'Beschikbaar'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                cat: 'Nieuws',
                channels: 'Nieuws uit binnen- en buitenland. Controleer tijdens je proefperiode welke nieuwszenders erbij zitten.',
                footer: ['HD', 'Live'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H17" />
                  </svg>
                ),
              },
              {
                cat: 'Muziek & entertainment',
                channels: 'Muziek, shows en entertainment voor elke smaak.',
                footer: ['HD', 'Beschikbaar'],
                iconSvg: (
                  <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0F2942] text-[#F8FAFC] rounded-3xl p-6 border-2 border-[#1E3A52] shadow-lg hover:border-[#39FF14] hover:shadow-[0_15px_30px_rgba(57,255,20,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#081425] flex items-center justify-center shrink-0 border border-[#39FF14]/40 shadow-md">
                      {item.iconSvg}
                    </div>
                    <h3 className="font-black text-[#F8FAFC] text-base uppercase tracking-wider">
                      {item.cat}
                    </h3>
                  </div>
                  <p className="text-[#94A3B8] font-semibold text-xs leading-relaxed">
                    {item.channels}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#1E3A52] flex items-center justify-between text-[10px] font-extrabold uppercase text-[#39FF14] tracking-widest">
                  <span>{item.footer[0]}</span>
                  <span>{item.footer[1]}</span>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          FEATURE BLOCKS (4K + SPORTS)
          ========================================================= */}
      <section className="bg-[#081425] py-24 border-y border-[#1E3A52] relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#008000]/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#008000]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-1 overflow-hidden rounded-[2.5rem] bg-[#0F2942] border-2 border-[#1E3A52] p-3 shadow-2xl transition-all duration-500 hover:border-[#39FF14]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] sm:aspect-video lg:aspect-[5/4]">
                <img
                  {...responsiveImageProps('/img/image-1.webp', [640, 828])}
                  alt="Gezin kijkt samen tv op de bank"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute left-4 top-4 rounded-full bg-[#081425]/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#F8FAFC] border border-[#1E3A52] shadow-md">
                  Full HD &amp; 4K
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#081425]/95 backdrop-blur-md border border-[#1E3A52] p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px] shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#39FF14] text-[#081425] shrink-0 shadow-lg shadow-[#39FF14]/40">
                      <PlayCircle className="h-6 w-6 text-[#081425]" />
                    </span>
                    <div>
                      <p className="text-base font-black uppercase text-[#F8FAFC]">
                        Scherp beeld
                      </p>
                      <p className="text-xs font-medium text-[#94A3B8] mt-0.5">
                        Kwaliteit tot 4K waar beschikbaar, afhankelijk van je apparaat en verbinding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FadeIn className="order-2">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0B1F35] border border-[#39FF14]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#39FF14]">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                Beeldkwaliteit
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F8FAFC] leading-[1.1] mb-6">
                SCHERP BEELD OP <br />
                <span className="text-[#39FF14] relative inline-block mt-1">
                  JE EIGEN TV
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#008000]/70 rounded-full" />
                </span>
              </h2>

              <p className="text-base leading-relaxed text-[#94A3B8] font-medium">
                Zenders en programma’s zijn beschikbaar in HD, Full HD en waar mogelijk in 4K. De kwaliteit die je ziet hangt ook af van je apparaat en je internetverbinding. Daarom raden we aan om eerst gratis te testen.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] font-medium">
                Je kijkt op je Fire TV Stick, Smart TV, Android TV, Apple TV of telefoon.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'HD, Full HD en 4K',
                  'Tv-gids (EPG)',
                  'Films en series on demand',
                  'Fire TV, Smart TV en mobiel',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#0F2942] text-[#F8FAFC] border border-[#1E3A52] px-4 py-3.5 text-xs font-extrabold uppercase flex items-center gap-3 shadow-md hover:border-[#39FF14] transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#39FF14] text-[#081425] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="w-full flex sm:inline-flex mt-8">
                <Link
                  href="/prijzen"
                  className="w-full sm:w-auto text-center whitespace-nowrap bg-[#FFD700] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#081425] hover:bg-[#E6C200] transition-all hover:scale-105 rounded-full shrink-0 shadow-lg shadow-[#FFD700]/30"
                >
                  Bekijk de prijzen
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn className="order-2 lg:order-1">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0B1F35] border border-[#39FF14]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#39FF14]">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                Sport kijken
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F8FAFC] leading-[1.1] mb-6">
                LIVE SPORT, <br />
                <span className="text-[#39FF14] relative inline-block mt-1">
                  EERST ZELF TESTEN
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#008000]/70 rounded-full" />
                </span>
              </h2>

              <p className="text-base leading-relaxed text-[#94A3B8] font-medium">
                Live sport vraagt het meest van je verbinding. Kijk tijdens de gratis proefperiode naar een live uitzending en vraag via WhatsApp welke sportzenders op dit moment beschikbaar zijn.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] font-medium">
                Gebruik voor het stabielste beeld een netwerkkabel of 5 GHz-wifi.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Eerst 24 uur gratis testen',
                  'Zenderoverzicht via WhatsApp',
                  'Tv-gids en terugkijken',
                  'Hulp bij de installatie',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#0F2942] text-[#F8FAFC] border border-[#1E3A52] px-4 py-3.5 text-xs font-extrabold uppercase flex items-center gap-3 shadow-md hover:border-[#39FF14] transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#39FF14] text-[#081425] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="w-full flex sm:inline-flex mt-8">
                <Link
                  href="/zenders/sports"
                  className="w-full sm:w-auto text-center whitespace-nowrap bg-[#0F2942] border-2 border-[#39FF14] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#F8FAFC] hover:bg-[#0B1F35] transition-all hover:scale-105 rounded-full shrink-0 shadow-lg"
                >
                  Lees meer over sport
                </Link>
              </div>
            </FadeIn>

            <div className="relative order-1 overflow-hidden rounded-[2.5rem] bg-[#0F2942] border-2 border-[#1E3A52] p-3 lg:order-2 shadow-2xl transition-all duration-500 hover:border-[#39FF14]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] sm:aspect-video lg:aspect-[5/4]">
                <img
                  {...responsiveImageProps('/img/bg-1.webp', [640, 828, 1200])}
                  alt="Vrouw met popcorn kijkt tv op de bank"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute left-4 top-4 rounded-full bg-[#081425]/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#F8FAFC] border border-[#1E3A52] shadow-md">
                  Live sport
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#081425]/95 backdrop-blur-md border border-[#1E3A52] p-4 shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#39FF14] text-[#081425] shadow-lg shadow-[#39FF14]/40">
                      <Trophy className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-base font-black uppercase text-[#F8FAFC]">Live sport</p>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#39FF14]">
                        Test het 24 uur gratis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPARISON TABLE
          ========================================================= */}
      <section className="py-24 relative overflow-hidden bg-[#081425]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0B1F35] px-4 py-2 rounded-full border border-[#39FF14]/50 mb-6">
              <BarChart className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#F8FAFC] font-extrabold text-xs uppercase tracking-wider">
                Vergelijking
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight">
              IPTV ABONNEMENT OF TV-PAKKET?
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto font-medium">
              De belangrijkste verschillen op een rij. Wat een traditioneel tv-pakket precies kost en inhoudt, verschilt per aanbieder.
            </p>
          </FadeIn>

          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-3xl border border-[#39FF14]/30 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 gap-0">
                <div className="p-6 border-b border-r border-[#1E3A52] bg-[#0B1F35]">
                  <p className="text-lg font-black uppercase text-[#F8FAFC]">
                    Onderwerp
                  </p>
                </div>
                <div className="p-6 border-b border-r border-[#1E3A52] bg-[#0B1F35]">
                  <p className="text-lg font-black uppercase text-[#39FF14]">
                    {CONSTANTS.BRAND_NAME}
                  </p>
                </div>
                <div className="p-6 border-b border-[#1E3A52] bg-[#0B1F35]">
                  <p className="text-lg font-black uppercase text-[#94A3B8]">
                    Traditioneel tv-pakket
                  </p>
                </div>

                {[
                  { feature: 'Kosten', us: `Vanaf ${formatEUR(LOWEST_PRICE)} per 3 maanden`, cable: 'Maandelijks bedrag, verschilt per aanbieder' },
                  { feature: 'Contract', us: 'Geen contract, eenmalig vooraf', cable: 'Vaak een vaste looptijd' },
                  { feature: 'Apparaten', us: '1, 2 of 3 apparaten tegelijk', cable: 'Extra ontvanger kan extra kosten geven', usIcon: true },
                  { feature: 'Installatie', us: 'App installeren, hulp via WhatsApp', cable: 'Kastje aansluiten of monteur', usIcon: true },
                  { feature: 'Eerst proberen', us: '24 uur gratis testen', cable: 'Verschilt per aanbieder', usIcon: true },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-0 contents">
                    <div className={`p-6 border-r border-b border-[#1E3A52] ${idx % 2 === 0 ? 'bg-[#0B1F35]' : 'bg-[#081425]'}`}>
                      <span className="text-[#F8FAFC] font-bold text-sm">{row.feature}</span>
                    </div>

                    <div className={`p-6 border-r border-b border-[#1E3A52] ${idx % 2 === 0 ? 'bg-[#0B1F35]' : 'bg-[#081425]'}`}>
                      {row.usIcon ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#39FF14]" />
                          <span className="text-[#F8FAFC] font-extrabold text-sm">{row.us}</span>
                        </div>
                      ) : (
                        <span className="text-[#39FF14] font-black text-sm">{row.us}</span>
                      )}
                    </div>

                    <div className={`p-6 border-b border-[#1E3A52] ${idx % 2 === 0 ? 'bg-[#081425]' : 'bg-[#0B1F35]/70'}`}>
                      <span className="text-[#94A3B8] text-sm font-medium">{row.cable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {[
              { feature: 'Kosten', us: `Vanaf ${formatEUR(LOWEST_PRICE)}/3 mnd`, cable: 'Verschilt per aanbieder' },
              { feature: 'Contract', us: 'Geen contract', cable: 'Vaak vaste looptijd' },
              { feature: 'Apparaten', us: '1, 2 of 3 tegelijk', cable: 'Extra ontvanger' },
              { feature: 'Installatie', us: 'App + WhatsApp-hulp', cable: 'Kastje of monteur' },
              { feature: 'Eerst proberen', us: '24 uur gratis', cable: 'Verschilt' },
            ].map((row, idx) => (
              <div key={idx} className="bg-[#0F2942] text-[#F8FAFC] rounded-3xl border border-[#39FF14]/30 p-5 shadow-lg">
                <div className="text-center mb-3">
                  <span className="text-[#39FF14] text-xs font-black uppercase tracking-wider">
                    {row.feature}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="text-left bg-[#0B1F35] p-3 rounded-2xl flex-1 border border-[#39FF14]/50">
                    <div className="text-[#39FF14] font-black text-sm">{row.us}</div>
                    <div className="text-[#F8FAFC] text-[10px] font-bold uppercase">
                      {CONSTANTS.BRAND_NAME}
                    </div>
                  </div>
                  <div className="text-right bg-[#081425] p-3 rounded-2xl flex-1 border border-[#1E3A52]">
                    <div className="text-[#94A3B8] line-through text-sm">{row.cable}</div>
                    <div className="text-[#94A3B8]/70 text-[10px] font-bold uppercase">
                      Traditioneel tv-pakket
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS section removed: it contained unverified testimonials
          (names, stock avatars, US cities). Re-add only with genuine reviews. */}

      {/* =========================================================
          SUPPORTED DEVICES
          ========================================================= */}
      <section className="py-24 bg-[#081425] w-full relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#008000]/20 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A5214_1px,transparent_1px),linear-gradient(to_bottom,#1E3A5214_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0B1F35] px-4 py-2 rounded-full border border-[#39FF14]/50 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-[#39FF14] font-extrabold text-xs uppercase tracking-widest">
                Ondersteunde apparaten
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight max-w-4xl mx-auto leading-tight">
              WERKT OP DE MEESTE APPARATEN
            </h2>

            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Je kijkt via een IPTV-app die M3U-afspeellijsten of Xtream Codes ondersteunt. Die apps zijn er voor Android, iOS, Smart TV’s en computers. Twijfel je over jouw apparaat? Vraag het ons via WhatsApp.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                tag: 'Amazon Fire TV Stick',
                desc: 'Fire TV Stick, Fire TV Stick 4K en Fire TV Cube',
                detail: 'Populaire IPTV-apps werken hier goed, met snel zappen en een overzichtelijke tv-gids.',
                icon: Zap,
                code: '01',
              },
              {
                tag: 'Smart TV’s (Samsung en LG)',
                desc: 'Samsung Tizen en LG webOS',
                detail: 'Installeer een IPTV-app uit de app store van je tv en kijk zonder extra kastje.',
                icon: Tv2,
                code: '02',
              },
              {
                tag: 'Android TV en mediaboxen',
                desc: 'Nvidia Shield, Google TV en Android-boxen',
                detail: 'Veel keuze in apps en vlotte weergave, ook bij live uitzendingen.',
                icon: Cpu,
                code: '03',
              },
              {
                tag: 'Apple TV, iPhone en iPad',
                desc: 'tvOS en iOS',
                detail: 'Kijk via een IPTV-app uit de App Store op je Apple-apparaten.',
                icon: Smartphone,
                code: '04',
              },
              {
                tag: 'Windows-pc en Mac',
                desc: 'Windows 10 en 11, macOS',
                detail: 'Kijk via een mediaspeler of IPTV-app op je computer.',
                icon: MonitorSmartphone,
                code: '05',
              },
              {
                tag: 'MAG en andere settopboxen',
                desc: 'MAG- en Formuler-boxen',
                detail: 'Koppeling via het MAC-adres van je box, inclusief tv-gids.',
                icon: ShieldCheck,
                code: '06',
              },
            ].map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.tag}
                  className="group relative bg-[#0F2942] text-[#F8FAFC] border border-[#1E3A52] rounded-3xl p-7 flex flex-col justify-between gap-5 hover:border-[#39FF14] hover:shadow-[0_12px_35px_rgba(57,255,20,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#39FF14] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#081425] border border-[#39FF14]/50 flex items-center justify-center shrink-0 group-hover:bg-[#0B1F35] group-hover:scale-105 transition-all duration-300 shadow-md">
                        <Icon className="w-7 h-7 text-[#39FF14] transition-all duration-300" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-[#F8FAFC] uppercase tracking-wide leading-tight">
                          {device.tag}
                        </h3>
                        <p className="text-xs font-bold text-[#94A3B8] mt-0.5">{device.desc}</p>
                      </div>
                    </div>

                    <span className="text-xs font-black text-[#081425] bg-[#39FF14] px-2.5 py-1 rounded-xl shrink-0">
                      {device.code}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed pt-2 border-t border-[#1E3A52]">
                    {device.detail}
                  </p>
                </div>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          FAQ
          ========================================================= */}
      <div className="py-24 w-full bg-[#09090B] relative overflow-hidden">
        <FAQ />
      </div>

      {/* =========================================================
          BLOG SECTION
          ========================================================= */}
      <section className="py-24 bg-[#081425] w-full relative overflow-hidden border-t border-[#1E3A52]">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A52_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0B1F35] px-4 py-2 rounded-full border border-[#39FF14]/30 mb-6">
                <BookOpen className="w-4 h-4 text-[#39FF14]" />
                <span className="text-[#39FF14] font-extrabold text-xs uppercase tracking-widest">
                  Uitleg &amp; tips
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight">
                LAATSTE <span className="text-[#39FF14]">ARTIKELEN</span>
              </h2>
              <p className="text-[#94A3B8] text-lg font-medium max-w-2xl leading-relaxed">
                Handleidingen, oplossingen voor haperend beeld en tips om meer uit je IPTV abonnement te halen.
              </p>
            </div>

            <div className="flex shrink-0">
              <Link
                href="/blog"
                className="whitespace-nowrap px-7 py-4 rounded-2xl bg-[#FFD700] text-[#081425] font-black hover:bg-[#E6C200] transition-all duration-300 flex items-center gap-3 group shrink-0 shadow-xl hover:shadow-[0_10px_25px_rgba(255,215,0,0.3)]"
              >
                <span className="uppercase text-xs tracking-wider">Alle artikelen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#081425]" />
              </Link>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="group cursor-pointer h-full">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-[#0F2942] text-[#F8FAFC] rounded-3xl p-4 border-2 border-[#1E3A52] shadow-md hover:border-[#39FF14] hover:shadow-[0_20px_40px_rgba(57,255,20,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full relative">
                    <div>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#081425]">
                        <img
                          {...blogImageProps(post.image, '(max-width: 768px) 100vw, 33vw')}
                          alt={post.imageAlt || post.title}
                          width={800}
                          height={450}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081425]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#39FF14] text-[#081425] text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md">
                            {post.category === 'setup' ? 'Installatie' : 'Tips'}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 bg-[#081425]/80 backdrop-blur-md text-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider rounded-lg border border-[#1E3A52]">
                            {getPostReadMinutes(post)} min lezen
                          </span>
                        </div>
                      </div>

                      <div className="p-4 pt-6">
                        <h3 className="text-lg font-black text-[#F8FAFC] mb-2.5 group-hover:text-[#39FF14] transition-colors tracking-tight line-clamp-2 uppercase leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-[#94A3B8] text-xs font-semibold line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-3 pt-3 border-t border-[#1E3A52] flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-2 text-xs font-black text-[#39FF14] uppercase tracking-wider group-hover:text-[#F8FAFC] transition-colors">
                        Lees artikel
                      </span>

                      <div className="w-9 h-9 rounded-xl bg-[#081425] border border-[#1E3A52] flex items-center justify-center text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-[#081425] group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#081425] w-full">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A52_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border-2 border-[#1E3A52] bg-[#0B1F35] shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#008000]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#39FF14]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="h-2 w-full bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700]" />

            <FadeIn className="relative z-10 px-5 py-10 text-center sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#081425] px-4 py-2 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#39FF14]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#39FF14]">
                  IPTV abonnement in Nederland
                </span>
              </div>

              <h2 className="mx-auto max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#F8FAFC] leading-[1.05] mb-6">
                PROBEER HET EERST <br />
                <span className="text-[#39FF14]">24 UUR GRATIS</span>
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#94A3B8]">
                Test alles op je eigen apparaat en kies daarna pas een abonnement. Geen contract, prijzen in euro’s en hulp via WhatsApp.
              </p>

              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {[
                  [formatEUR(LOWEST_PRICE), 'Vanaf, 3 maanden'],
                  ['24 uur', 'Gratis testen'],
                  ['0', 'Contract'],
                  ['1–3', 'Apparaten'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl sm:rounded-3xl border border-[#1E3A52] bg-[#0F2942] p-4 shadow-sm hover:border-[#39FF14] transition-colors"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-[#39FF14]">{value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#94A3B8]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                <Link
                  href="/prijzen"
                  className="w-full sm:w-auto text-center whitespace-nowrap rounded-2xl bg-[#FFD700] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#081425] hover:bg-[#E6C200] transition-all hover:scale-105 shrink-0 shadow-lg shadow-[#FFD700]/30"
                >
                  Kies je abonnement
                </Link>
                <Link
                  href="/installatie"
                  className="w-full sm:w-auto text-center whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl border border-[#39FF14]/40 bg-[#0F2942] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#F8FAFC] hover:bg-[#081425] transition-all hover:scale-105 shrink-0 shadow-sm"
                >
                  <Settings className="h-4 w-4 text-[#39FF14] shrink-0" /> Installatiehandleiding
                </Link>
              </div>

              <p className="mt-8 text-[11px] sm:text-xs font-black text-[#39FF14] uppercase tracking-wider">
                Eerst gratis testen • Inloggegevens via WhatsApp • Hulp via WhatsApp
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}