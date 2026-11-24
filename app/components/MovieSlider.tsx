'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useState, useMemo, useRef } from 'react';
import { usePauseWhenOffscreen } from '@/hooks/use-pause-offscreen';
import { responsiveImageProps } from '@/lib/blog-helpers';

// ---------------------------------------------------------------------------
// IMAGE COUNTS
// ---------------------------------------------------------------------------
const MOVIES_COUNT = 16;
const SERIES_COUNT = 16;
const SPORTS_COUNT = 14;

// ---------------------------------------------------------------------------
// UNIQUE TITLES + UNIQUE ALTS (one per image, no duplicates)
// ---------------------------------------------------------------------------


const MOVIE_ALTS = Array.from({ length: MOVIES_COUNT }, (_, i) => `Filmposter ${i + 1}`);



const SERIES_ALTS = Array.from({ length: SERIES_COUNT }, (_, i) => `Serieposter ${i + 1}`);



const SPORTS_ALTS = Array.from({ length: SPORTS_COUNT }, (_, i) => `Sportafbeelding ${i + 1}`);

// ---------------------------------------------------------------------------
// DATA ARRAYS
// ---------------------------------------------------------------------------
type SliderItem = { id: string; imagePath: string; alt: string };

const movies: SliderItem[] = Array.from({ length: MOVIES_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `movie-${i}`,
    imagePath: `/img/sliders/movies/media-movies-${number}`,
    alt: MOVIE_ALTS[i],
  };
});

const series: SliderItem[] = Array.from({ length: SERIES_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `series-${i}`,
    imagePath: `/img/sliders/series/media-serie-${number}`,
    alt: SERIES_ALTS[i],
  };
});

const sports: SliderItem[] = Array.from({ length: SPORTS_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `sport-${i}`,
    imagePath: `/img/sliders/sports/media-sports-${number}`,
    alt: SPORTS_ALTS[i],
  };
});

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing-section');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ---------------------------------------------------------------------------
// INFINITE SLIDER
// ---------------------------------------------------------------------------
const InfiniteSlider = ({
  items,
  direction = 'left',
  speed = 50,
  fadeBgColor = '#09090B',
  cardBorderColor = 'rgba(255,255,255,0.08)',
}: {
  items: SliderItem[];
  direction?: 'left' | 'right';
  speed?: number;
  fadeBgColor?: string;
  cardBorderColor?: string;
}) => {
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});
  const infiniteItems = useMemo(() => [...items, ...items], [items]);
  const duration = (items.length * speed) / 10;
  // Phase 5.2 (B1): the ticker animates `transform` instead of `x`. Framer Motion
  // can hand a `transform` animation to the browser (Web Animations API), so the
  // loop no longer has to be updated from JavaScript on every frame. Keyframes,
  // duration, easing and looping are unchanged. With reduced motion the original
  // `x` animation is kept on purpose: Framer's reducedMotion="user" only skips
  // positional keys such as `x`, so the track keeps resting at its final keyframe
  // exactly as before.
  const reduceMotion = useReducedMotion();
  // Phase 5 (B2): pause the ticker while it is off-screen (resumes where it stopped).
  const trackRef = useRef<HTMLDivElement>(null);
  usePauseWhenOffscreen(trackRef, !reduceMotion);

  return (
    <div className="relative w-full overflow-hidden py-3" aria-hidden="true">
      {/* Side Fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 md:w-36 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${fadeBgColor}, transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 md:w-36 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${fadeBgColor}, transparent)` }}
      />

      <m.div
        ref={trackRef}
        className="flex w-max gap-4 md:gap-6 px-4"
        animate={
          reduceMotion
            ? { x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }
            : { transform: direction === 'left' ? ['translateX(0%)', 'translateX(-50%)'] : ['translateX(-50%)', 'translateX(0%)'] }
        }
        transition={{ repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' }}
      >
        {infiniteItems.map((item, idx) => {
          const key = `${item.id}-${idx}`;
          const isDuplicate = idx >= items.length;
          const altText = isDuplicate ? '' : item.alt;

          return (
            <button
              key={key}
              onClick={scrollToPricing}
              // The ticker is decorative (aria-hidden), so its posters must not be
              // keyboard tab stops either; mouse/touch clicks still scroll to pricing.
              tabIndex={-1}
              aria-hidden="true"
              className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-52 block cursor-pointer group text-left bg-transparent border-none p-0 transition-transform duration-300 hover:-translate-y-2"
            >
              <div
                className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#18181B] border shadow-lg group-hover:shadow-2xl transition-all duration-300"
                style={{ borderColor: cardBorderColor }}
              >
                {!failedImages[key] ? (
                  <img
                    {...responsiveImageProps(`${item.imagePath}.webp`, [256, 384, 640])}
                    alt={altText}
                    width={208}
                    height={312}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // The slider always sits below the hero, so no poster is
                    // above the fold; lazy-load all of them.
                    loading="lazy"
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 208px"                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [key]: true }))
                    }
                  />
                ) : (
                  <div className="w-full h-full bg-[#18181B]" />
                )}
              </div>
            </button>
          );
        })}
      </m.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN SECTION
// ---------------------------------------------------------------------------
export default function MovieSlider() {
  return (
    <section className="w-full relative" aria-label="Overzicht films, series en sport">
      {/* 1. Global square-grid background pattern covering all 3 rows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* ROW 1: Movies (Dark) */}
      <div className="relative z-10 w-full py-12 sm:py-16 bg-[#09090B]/80 backdrop-blur-sm border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#39FF14] text-[#09090B] text-xs font-black uppercase tracking-wider">
              Films in 4K
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight">
              Nieuwste films
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm mt-2 font-semibold hidden md:block max-w-2xl">
            Films on demand in de bibliotheek van je IPTV abonnement, te bekijken op het apparaat dat je al hebt.
          </p>
        </div>
        <InfiniteSlider
          items={movies}
          direction="left"
          speed={45}
          fadeBgColor="#09090B"
          cardBorderColor="rgba(255,255,255,0.08)"
        />
      </div>

      {/* ROW 2: Series (Dark Surface) */}
      <div className="relative z-10 w-full py-12 sm:py-16 bg-[#18181B]/90 backdrop-blur-sm border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#39FF14] text-[#09090B] text-xs font-black uppercase tracking-wider">
              Series on demand
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight">
              Populaire series
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm mt-2 font-medium hidden md:block max-w-2xl">
            Kijk complete seizoenen wanneer het jou uitkomt, in dezelfde app als je live zenders.
          </p>
        </div>
        <InfiniteSlider
          items={series}
          direction="right"
          speed={40}
          fadeBgColor="#18181B"
          cardBorderColor="rgba(255,255,255,0.12)"
        />
      </div>

      {/* ROW 3: Sports (Dark) */}
      <div className="relative z-10 w-full py-12 sm:py-16 bg-[#09090B]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#39FF14] text-[#09090B] text-xs font-black uppercase tracking-wider">
              Live sport
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight">
              Sport live kijken
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm mt-2 font-semibold hidden md:block max-w-2xl">
            Vraag via WhatsApp welke sportzenders beschikbaar zijn en test het eerst 24 uur gratis.
          </p>
        </div>
        <InfiniteSlider
          items={sports}
          direction="left"
          speed={50}
          fadeBgColor="#09090B"
          cardBorderColor="rgba(255,255,255,0.08)"
        />
      </div>
    </section>
  );
}