import Link from 'next/link';
import { CONSTANTS, absoluteUrl, breadcrumbSchema, generateSEOMetadata, whatsappUrl, FREE_TRIAL_WHATSAPP_URL, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { reviews, REVIEW_FAQS, type Review } from '@/lib/reviews';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import { Star, ShieldCheck, MessageCircle, MapPin, PlayCircle, Quote, ChevronDown, ThumbsUp, Sparkles, Users, Zap, Headphones, Award, ArrowRight } from 'lucide-react';
import { FaqText } from '@/lib/faq-text';

const BRAND = CONSTANTS.BRAND_NAME;
const PATH = '/reviews';
const PAGE_URL = absoluteUrl(PATH);
const HAS_REVIEWS = reviews.length > 0;

// noindex while there are no genuine reviews (an empty review page is thin
// content). No Review/AggregateRating markup is published.
export const metadata = generateSEOMetadata(
  'Reviews en ervaringen',
  `Ervaringen van klanten met ${BRAND}. Wij publiceren alleen echte reviews, met toestemming van de klant.`,
  PATH,
  { noindex: !HAS_REVIEWS }
);

const ReviewsPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `Reviews en ervaringen | ${BRAND}`,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${CONSTANTS.SITE_URL}/#website` },
      },
      { ...breadcrumbSchema([{ name: 'Reviews', path: PATH }]), '@id': `${PAGE_URL}#breadcrumb` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      id="reviews-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#39FF14] text-[#39FF14]' : 'text-[#94A3B8]/30'}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <article className="relative bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] rounded-3xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-[#39FF14]/10 rotate-180" aria-hidden="true" />
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#27272A] flex items-center justify-center text-[#F8FAFC] font-black text-base uppercase shadow-md shrink-0">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-[#F8FAFC] text-sm uppercase tracking-tight">{review.name}</h3>
          {review.city && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#94A3B8]">
              <MapPin className="w-3 h-3 text-[#39FF14]" />
              <span>{review.city}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={review.rating} />
        <span className="text-[10px] font-black uppercase tracking-wider text-[#94A3B8]">
          {new Date(review.date).toLocaleDateString('nl-NL', { timeZone: 'UTC', month: 'short', year: 'numeric' })}
        </span>
      </div>
      <h4 className="font-black text-[#F8FAFC] text-base uppercase tracking-tight leading-tight mb-3 line-clamp-2">{review.title}</h4>
      <p className="text-[#94A3B8] text-sm font-medium leading-relaxed line-clamp-6 flex-1 mb-4">{review.text}</p>
      {review.device && (
        <div className="pt-4 border-t border-[#27272A]">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#94A3B8]">
            <PlayCircle className="w-3.5 h-3.5 text-[#39FF14]" />
            {review.device}
          </span>
        </div>
      )}
    </article>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#39FF14] transition-colors">
      <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-[#F8FAFC] flex items-start gap-3 text-left">
          <span className="text-[#39FF14] font-black text-xl shrink-0" aria-hidden="true">V.</span>
          <span>{q}</span>
        </h3>
        <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#39FF14] transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6">
        <p className="text-[#94A3B8] font-medium leading-relaxed text-sm md:text-base pl-9 border-l-4 border-[#39FF14] ml-1 py-1">
          <FaqText text={a} />
        </p>
      </div>
    </details>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <ReviewsPageSchema />

      <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">
        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none" />

          {/* Global square-grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#39FF14]/40">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                Alleen echte reviews
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#F8FAFC] mb-6">
              {BRAND.toUpperCase()} <br />
              <span className="text-[#39FF14]">REVIEWS & ERVARINGEN</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Op deze pagina publiceren we ervaringen van klanten van {BRAND}, alleen als zij daar toestemming voor geven.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-[#39FF14] fill-[#39FF14]" />
                Echte klanten
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#39FF14]" />
                Met toestemming
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5 text-[#39FF14]" />
                Eerst zelf testen
              </span>
            </div>
          </div>
        </section>

        {/* OVERALL RATING CARD removed: it only showed unverified statistics
            (average rating, review count, customer count). */}

        {/* REVIEWS GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Ervaringen
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight">
              Wat klanten <span className="text-[#39FF14]">zeggen</span>
            </h2>
          </div>

          {HAS_REVIEWS ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-10 text-center shadow-2xl">
              <ThumbsUp className="w-12 h-12 text-[#39FF14] mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">Nog geen reviews gepubliceerd</h3>
              <p className="text-[#94A3B8] font-bold leading-relaxed">
                We plaatsen hier alleen echte ervaringen van klanten. Wil je zelf beoordelen of {BRAND} bij je past?
                Probeer het dan 24 uur gratis op je eigen apparaat.
              </p>
            </div>
          )}
        </section>

        {/* TRUST BADGES */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: ShieldCheck, title: 'Geen contract', desc: 'Eenmalig vooraf betalen' },
              { icon: Zap, title: 'Tot 4K', desc: 'Afhankelijk van apparaat en verbinding' },
              { icon: Headphones, title: 'Hulp via WhatsApp', desc: 'Bij installatie en vragen' },
              { icon: Award, title: 'Eerst gratis testen', desc: '24 uur op je eigen apparaat' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] rounded-2xl p-5 text-center transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="text-sm font-black text-[#F8FAFC] uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#94A3B8] font-bold leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] bg-[#18181B] p-8 md:p-10 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-4 py-2 rounded-full mb-5 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Deel je ervaring
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-4">
                Begin met een gratis proefperiode van 24 uur
              </h3>
              <p className="text-[#94A3B8] text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Stuur ons een bericht via WhatsApp. We helpen je met IPTV Smarters Pro en daarna hoor je graag wat je ervan vindt.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={FREE_TRIAL_WHATSAPP_URL}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl border border-[#09090B]/20 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Gratis testen
                </a>
                <a
                  href={whatsappUrl(`Hallo ${BRAND}, ik wil graag een review achterlaten.`)}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl border-2 border-[#27272A] hover:border-[#39FF14] cursor-pointer"
                >
                  Review achterlaten <ArrowRight className="w-5 h-5 text-[#39FF14]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-16 relative">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-[#39FF14]/5 blur-[130px] rounded-full pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
                Vragen
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight">
              Vragen over{' '}
              <span className="text-[#39FF14]">onze reviews</span>
            </h2>
          </div>

          <div className="space-y-4 relative z-10">
            {REVIEW_FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#18181B] rounded-3xl p-8 md:p-12 border border-[#27272A] text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#F8FAFC] leading-tight mb-4">
              Klaar om het zelf{' '}
              <span className="text-[#39FF14]">te proberen?</span>
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Kies 3, 6 of 12 maanden, vanaf {formatEUR(LOWEST_PRICE)}. Eerst 24 uur gratis testen en hulp via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/prijzen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg border border-[#09090B]/20 cursor-pointer"
              >
                Bekijk de prijzen <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/installatie"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all border border-[#27272A] hover:border-[#39FF14] cursor-pointer"
              >
                Installatiehandleiding
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
