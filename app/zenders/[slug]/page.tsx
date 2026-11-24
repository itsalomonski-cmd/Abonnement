import { channelsData, getCategoryBySlug } from '@/lib/channels-data';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata, whatsappUrl, FREE_TRIAL_WHATSAPP_URL, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Tv,
  ShieldCheck,
  Zap,
  ArrowLeft,
  HelpCircle,
  Activity,
  Cpu,
  MonitorSmartphone,
  MessageCircle,
  Globe,
  Film,
  Trophy,
  Baby,
} from 'lucide-react';
import ShareButtons from '../../components/ShareButtons';

// Visual structure restored from the original template's channel page. The
// named channel grid is replaced by the category's trial checklist rendered
// in the same card style, because no verified channel lineup exists yet
// (see lib/channels-data.ts). Pages stay noindex until it does.

const BRAND = CONSTANTS.BRAND_NAME;

const categoryIcons: Record<string, typeof Tv> = {
  sport: Trophy,
  'films-series': Film,
  'kinderen-familie': Baby,
  internationaal: Globe,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return channelsData.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return generateSEOMetadata(category.title, category.metaDescription, `/zenders/${category.slug}`, {
    noindex: !category.lineupVerified,
  });
}

export default async function ChannelCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const Icon = categoryIcons[category.slug] || Tv;
  const pageUrl = absoluteUrl(`/zenders/${category.slug}`);

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      { ...breadcrumbSchema([{ name: category.name, path: `/zenders/${category.slug}` }]), '@id': `${pageUrl}#breadcrumb` },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: `${category.title} | ${BRAND}`,
        description: category.metaDescription,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${CONSTANTS.SITE_URL}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: category.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC] overflow-hidden">
      <script
        type="application/ld+json"
        id="channel-category-schema"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#39FF14]/10 blur-[140px] rounded-full" />
          {/* Global square-grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#94A3B8] flex-wrap">
            <Link href="/" className="hover:text-[#39FF14] transition-colors inline-block py-2 -my-2">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#F8FAFC]">Zenders</span>
            <span>/</span>
            <span className="text-[#39FF14]">{category.name}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#39FF14]/40">
            <Icon className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
              Zenderaanbod
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none whitespace-normal break-words">
            {category.name} <br className="hidden sm:block" />
            <span className="text-[#39FF14]">kijken</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-3xl mx-auto leading-relaxed mb-6">
            {category.intro}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-[#94A3B8] font-black uppercase tracking-widest mt-6">
            <span className="flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full border border-[#27272A]">
              <Zap className="w-4 h-4 text-[#39FF14]" /> 24 uur gratis testen
            </span>
            <span className="flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full border border-[#27272A]">
              <ShieldCheck className="w-4 h-4 text-[#39FF14]" /> Tv-gids &amp; terugkijken
            </span>
            <span className="flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full border border-[#27272A]">
              <Activity className="w-4 h-4 text-[#39FF14]" /> Hulp via WhatsApp
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/prijzen"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] transition-transform hover:scale-105 shadow-xl border border-[#09090B]/20 cursor-pointer"
            >
              Bekijk de prijzen
            </Link>
            <a
              href={FREE_TRIAL_WHATSAPP_URL}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] border border-[#27272A] font-black text-sm uppercase tracking-widest hover:scale-105 hover:border-[#39FF14] transition-all shadow-xl cursor-pointer"
            >
              Gratis 24 uur testen
            </a>
          </div>
        </div>
      </section>

      {/* CHECKLIST GRID (original channel-card styling) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#F8FAFC] uppercase tracking-tight">
              Zo test je <span className="text-[#39FF14]">{category.name.toLowerCase()}</span>
            </h2>
            <p className="text-[#94A3B8] font-bold text-sm sm:text-base mt-2">
              Het actuele zenderoverzicht ontvang je via WhatsApp. Controleer tijdens de proefperiode of het aanbod bij je past.
            </p>
          </div>
          <div className="text-xs uppercase font-black tracking-widest text-[#94A3B8] bg-[#18181B] px-4 py-2 rounded-xl border border-[#27272A] w-fit">
            Tv-gids (EPG) inbegrepen
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.checklist.map((item, idx) => (
            <div
              key={item}
              className="group relative bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#39FF14] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 p-4 pb-2">
                <span className="px-2.5 py-1 bg-[#39FF14] text-[#09090B] text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm">
                  Tip {idx + 1}
                </span>
              </div>
              <div className="px-4 pb-4 flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#09090B] flex items-center justify-center shrink-0 group-hover:bg-[#39FF14] transition-colors shadow-md">
                  <Tv className="w-5 h-5 text-[#F8FAFC] group-hover:text-[#09090B]" />
                </div>
                <p className="text-[#94A3B8] text-sm font-bold leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY + TRUST + FAQ + CTA */}
      <section className="py-16 bg-[#09090B] border-t border-[#27272A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4">
              {category.name} kijken met {BRAND}
            </h2>
            <div className="text-[#94A3B8] font-medium text-sm sm:text-base leading-relaxed space-y-4">
              <p>{category.intro}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <div className="p-6 bg-[#18181B] border border-[#27272A] rounded-2xl text-center hover:border-[#39FF14] transition-colors">
              <Cpu className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#F8FAFC]">Tot 4K</h3>
              <p className="text-xs text-[#94A3B8] font-bold mt-1">Afhankelijk van apparaat en verbinding</p>
            </div>
            <div className="p-6 bg-[#18181B] border border-[#27272A] rounded-2xl text-center hover:border-[#39FF14] transition-colors">
              <MonitorSmartphone className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#F8FAFC]">Veel apparaten</h3>
              <p className="text-xs text-[#94A3B8] font-bold mt-1">Smart TV, Fire TV Stick, Android, Apple TV en pc</p>
            </div>
            <div className="p-6 bg-[#18181B] border border-[#27272A] rounded-2xl text-center hover:border-[#39FF14] transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#F8FAFC]">Eerst testen</h3>
              <p className="text-xs text-[#94A3B8] font-bold mt-1">24 uur gratis op je eigen apparaat</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-8 text-center">
              Veelgestelde vragen over <span className="text-[#39FF14]">{category.name.toLowerCase()}</span>
            </h2>

            <div className="space-y-4">
              {category.faqs.map((faq) => (
                <div key={faq.question} className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 shadow-xl">
                  <h3 className="text-base sm:text-lg font-black text-[#F8FAFC] uppercase tracking-tight mb-3 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-[#39FF14] shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed pl-7 border-l-4 border-[#39FF14] ml-1 py-1">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] bg-[#18181B] p-8 md:p-10 text-center shadow-2xl mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-4">
                Zelf {category.name.toLowerCase()} testen?
              </h3>
              <p className="text-[#94A3B8] text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Stuur ons een bericht via WhatsApp voor de gratis proefperiode van 24 uur en het actuele zenderoverzicht.
              </p>
              <a
                href={whatsappUrl(`Hallo ${BRAND}, ik wil graag de gratis proefperiode en het actuele zenderoverzicht voor: ${category.name}.`)}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Start via WhatsApp
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center items-center my-10">
            <ShareButtons title={`${category.title} - ${BRAND}`} url={pageUrl} />
          </div>

          <div className="mt-16 pt-10 border-t border-[#27272A]">
            <h3 className="text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-6 text-center">
              Andere categorieën
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {channelsData
                .filter((c) => c.slug !== category.slug)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/zenders/${cat.slug}`}
                    className="p-4 bg-[#18181B] border border-[#27272A] rounded-xl hover:border-[#39FF14] hover:bg-[#27272A]/50 transition-all text-center group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-black uppercase text-[#F8FAFC] group-hover:text-[#39FF14] transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-bold mt-1 block">Bekijk categorie</span>
                  </Link>
                ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest cursor-pointer py-2 -my-2"
            >
              <ArrowLeft className="w-4 h-4" /> Terug naar de homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
