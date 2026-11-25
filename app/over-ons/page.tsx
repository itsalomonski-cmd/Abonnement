import { CONSTANTS, breadcrumbSchema, generateSEOMetadata } from '@/lib/seo';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import Link from 'next/link';
import {
  Award,
  Globe,
  Users,
  Server,
  Zap,
  ShieldCheck,
  Trophy,
  Headphones,
  Sparkles,
  Heart,
  Star,
  ArrowRight,
  Tv,
  Film,
  Activity,
} from 'lucide-react';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/over-ons`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'Over ons - IPTV Abonnement',
  `Lees wie er achter IPTVAbonnement zit en hoe we werken: eerst gratis testen, heldere prijzen en snelle hulp via WhatsApp.`,
  '/over-ons'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const AboutPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${PAGE_URL}#about`,
        url: PAGE_URL,
        name: `Over ${BRAND}`,
        description: `Wie ${BRAND} is en hoe we werken.`,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      { ...breadcrumbSchema([{ name: 'Over ons', path: '/over-ons' }]), '@id': `${PAGE_URL}#breadcrumb` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="about-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">

      <AboutPageSchema />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(57,255,20,0.05),_transparent_50%)] pointer-events-none" />
        
        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
              Wie we zijn
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-none mb-6">
            Over <span className="text-[#39FF14]">{BRAND}</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed">
            Wij bieden IPTV abonnementen aan voor kijkers in Nederland: eenvoudig te bestellen, eerst gratis te testen en met hulp via WhatsApp.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" aria-label="Je abonnement in het kort">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '1–3', label: 'Apparaten tegelijk' },
            { icon: Globe, value: '3, 6, 12', label: 'Maanden looptijd' },
            { icon: Server, value: '24 uur', label: 'Gratis testen' },
            { icon: Trophy, value: formatEUR(LOWEST_PRICE), label: 'Vanaf, 3 maanden' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="text-center p-6 bg-[#18181B] border border-[#27272A] rounded-3xl shadow-xl hover:scale-[1.02] hover:border-[#39FF14] hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-[#39FF14] mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[#94A3B8] text-xs font-black uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="w-full bg-[#18181B] py-10 px-4 sm:px-6 border-b border-[#27272A] relative z-20 overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-5">
          <div className="bg-[#39FF14] text-[#09090B] font-black text-xs px-5 py-2 rounded-full uppercase tracking-widest shadow-md">
            EERST GRATIS TESTEN
          </div>
          <h2 className="text-[#F8FAFC] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-md max-w-2xl">
            KLAAR OM HET ZELF TE PROBEREN?
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg font-bold max-w-xl leading-relaxed">
            Live tv, films en series in één app op je eigen apparaat. Test het 24 uur gratis voordat je een abonnement kiest.
          </p>
          <div className="w-full sm:w-auto mt-2">
            <Link
              href="/prijzen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFD700] text-[#09090B] hover:bg-[#E6C200] hover:scale-105 transition-all duration-300 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl border border-[#09090B]/20 cursor-pointer"
            >
              <span>Bekijk de prijzen</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">

        {/* Intro Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#39FF14]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] uppercase tracking-tight mb-2">
                Welkom bij {BRAND}
              </h2>
              <p className="text-[#F8FAFC] font-bold text-base leading-relaxed">
                Ons doel is simpel: tv kijken via internet makkelijk en betaalbaar maken, zonder ingewikkelde contracten. Daarom kun je bij ons altijd eerst testen en helpen we je persoonlijk bij de installatie.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-12">

          {/* Mission */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#39FF14] rounded-full inline-block" />
              Wat we doen
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-medium mb-4">
              Met een IPTV abonnement kijk je live tv, films en series via je internetverbinding, in een app op je eigen apparaat. Je kiest zelf de looptijd (3, 6 of 12 maanden) en het aantal apparaten dat tegelijk kijkt (1, 2 of 3).
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed font-medium">
              Na je bestelling ontvang je je inloggegevens via WhatsApp en helpen we je met het instellen van je app. In de{' '}
              <Link href="/installatie" className="text-[#39FF14] font-black hover:underline">installatiehandleiding</Link> lees je per apparaat hoe het werkt.
            </p>
          </section>

          {/* Feature Grid */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#39FF14] rounded-full inline-block" />
              Hoe we werken
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Eerst testen, dan kopen',
                  desc: 'Je kunt alles 24 uur gratis proberen op je eigen apparaat voordat je een abonnement kiest.',
                },
                {
                  icon: Zap,
                  title: 'Duidelijke prijzen',
                  desc: `Prijzen in euro’s, vanaf ${formatEUR(LOWEST_PRICE)} voor 3 maanden. Je betaalt één keer vooraf, zonder contract.`,
                },
                {
                  icon: Server,
                  title: 'Je eigen apparaten',
                  desc: 'Je kijkt op de apparaten die je al hebt: Smart TV, Fire TV Stick, telefoon, tablet of computer.',
                },
                {
                  icon: Headphones,
                  title: 'Persoonlijke hulp via WhatsApp',
                  desc: 'Vragen over installatie, apps of betalen beantwoorden we via WhatsApp.',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-6 bg-[#18181B] rounded-3xl border border-[#27272A] shadow-lg hover:-translate-y-1 hover:border-[#39FF14] hover:shadow-[0_20px_40px_rgba(57,255,20,0.15)] transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#39FF14] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-[#F8FAFC] text-base uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-[#94A3B8] text-xs font-bold mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Infrastructure */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#39FF14] rounded-full inline-block" />
              Hoe IPTV werkt
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-medium mb-6">
              Bij IPTV komt het tv-signaal via je internetverbinding binnen, zonder schotel of kabelaansluiting. Een stabiele verbinding thuis is daarbij het belangrijkst: we raden minimaal 15 Mbit/s aan voor Full HD en 30 Mbit/s voor 4K. Meer uitleg lees je in{' '}
              <Link href="/blog/wat-is-iptv" className="text-[#39FF14] font-black hover:underline">Wat is IPTV en hoe werkt het?</Link>
            </p>
            <div className="bg-[#09090B] border border-[#27272A] rounded-3xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#39FF14] transition-all">
                  <Activity className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#F8FAFC]">Via internet</div>
                  <p className="text-xs text-[#94A3B8] font-bold mt-1">
                    Geen schotel of kabel nodig
                  </p>
                </div>
                <div className="p-4 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#39FF14] transition-all">
                  <Film className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#F8FAFC]">Tot 4K</div>
                  <p className="text-xs text-[#94A3B8] font-bold mt-1">
                    Afhankelijk van apparaat en verbinding
                  </p>
                </div>
                <div className="p-4 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#39FF14] transition-all">
                  <Tv className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#F8FAFC]">Veel apparaten</div>
                  <p className="text-xs text-[#94A3B8] font-bold mt-1">
                    Smart TV, Fire TV, mobiel en pc
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Content Catalog */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#39FF14] rounded-full inline-block" />
              Wat zit er in je abonnement?
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-medium mb-6">
              Elk abonnement bevat <strong className="text-[#F8FAFC]">live tv</strong> en een{' '}
              <strong className="text-[#F8FAFC]">on-demand bibliotheek</strong>. Het actuele zenderoverzicht ontvang je via WhatsApp:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Live tv in HD, Full HD en waar beschikbaar 4K',
                'Films en series on demand',
                'Elektronische programmagids (EPG) en tot 7 dagen terugkijken',
                'Kijken op 1, 2 of 3 apparaten tegelijk, afhankelijk van je abonnement',
                'Installatiehulp via WhatsApp',
                'Eerst 24 uur gratis testen',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#94A3B8] font-bold text-sm md:text-base"
                >
                  <Star className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Free Trial */}
          <section>
            <div className="bg-[#18181B] border border-green-500/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-green-500 font-black text-lg md:text-xl uppercase tracking-tight mb-2">
                    Zo werkt de proefperiode
                  </h3>
                  <p className="text-[#F8FAFC] text-sm md:text-base font-bold leading-relaxed">
                    Stuur ons een bericht via WhatsApp en probeer het 24 uur gratis. Controleer de beeldkwaliteit, het aanbod en de werking op je eigen apparaat en internetverbinding. Pas daarna kies je een abonnement.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
              Probeer het zelf
            </h2>
            <p className="text-[#39FF14] font-bold text-base max-w-lg mx-auto mb-8">
              Bekijk de prijzen of lees de installatiehandleiding voor jouw apparaat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto px-4">
              <Link
                href="/prijzen"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-md border border-[#09090B]/20 cursor-pointer"
              >
                Bekijk de prijzen
              </Link>
              <Link
                href="/installatie"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest border border-[#27272A] hover:border-[#39FF14] transition-transform hover:scale-105 cursor-pointer"
              >
                Installatie
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-[#27272A] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest cursor-pointer py-2 -my-2"
          >
            ← Terug naar de homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#94A3B8]/60 text-xs font-bold">
            © {new Date().getFullYear()} {BRAND}. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </div>
  );
}