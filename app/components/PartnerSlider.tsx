'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { usePauseWhenOffscreen } from '@/hooks/use-pause-offscreen';

// Phase 2 (trust): the brand-logo row (LaLiga, HBO, AMC+, Premier League, NBA,
// Netflix, ESPN, Hulu, Disney, Sky Sports) is hidden. These logos suggest a
// partnership or licensed content that has not been verified. The image files
// in /public/img/partners are untouched; set this to true only after the
// owner has confirmed the right to show them.
const SHOW_BRAND_LOGO_ROW = false;

export default function PartnerSlider() {
  // -------------------------------------------------------------------------
  // PARTNER LOGOS (Row 1) — Apps & Platforms
  // -------------------------------------------------------------------------
  const partners = [
    // Alt text describes the logo actually shown in each image file.
    { name: 'LaLiga', alt: 'Logo LaLiga' },
    { name: 'HBO', alt: 'Logo HBO' },
    { name: 'AMC+', alt: 'Logo AMC+' },
    { name: 'Premier League', alt: 'Logo Premier League' },
    { name: 'NBA', alt: 'Logo NBA' },
    { name: 'Netflix', alt: 'Logo Netflix' },
    { name: 'ESPN', alt: 'Logo ESPN' },
    { name: 'Hulu', alt: 'Logo Hulu' },
    { name: 'Disney', alt: 'Logo Disney' },
    { name: 'Sky Sports', alt: 'Logo Sky Sports' },
  ].map((p, i) => {
    const number = String(i + 1).padStart(2, '0');
    return {
      ...p,
      imagePath: `/img/partners/media-partners-${number}.png`,
      width: 128,
      height: 128,
    };
  });

  // -------------------------------------------------------------------------
  // DEVICE LOGOS (Row 2 - Reverse Slider) — Hardware Devices
  // -------------------------------------------------------------------------
  const devices = [
    { name: 'Samsung Smart TV', imagePath: '/img/devices/samsung.webp', alt: 'Samsung Smart TV' },
    { name: 'Apple TV', imagePath: '/img/devices/appletv.webp', alt: 'Apple TV' },
    { name: 'Windows-pc', imagePath: '/img/devices/windows.webp', alt: 'Windows-pc' },
    { name: 'Amazon Fire TV', imagePath: '/img/devices/firetv.webp', alt: 'Amazon Fire TV Stick' },
    { name: 'Android TV', imagePath: '/img/devices/android.webp', alt: 'Android TV' },
    { name: 'Google TV', imagePath: '/img/devices/googletv.webp', alt: 'Google TV' },
    { name: 'LG Smart TV', imagePath: '/img/devices/lg.webp', alt: 'LG Smart TV (webOS)' },
    { name: 'Sony Smart TV', imagePath: '/img/devices/sonny.webp', alt: 'Sony Smart TV' },
  ].map((d) => ({
    ...d,
    width: 128,
    height: 128,
  }));

  // Duplicate arrays for seamless infinity looping
  const sliderItems = useMemo(() => [...partners, ...partners], [partners]);
  const deviceItems = useMemo(() => [...devices, ...devices], [devices]);

  // Total animation travel distances
  const animationDistancePartners = partners.length * 150;
  const animationDistanceDevices = devices.length * 150;

  // Phase 5.2 (B1): the ticker animates `transform` instead of `x`. Framer Motion
  // can hand a `transform` animation to the browser (Web Animations API), so the
  // loop no longer has to be updated from JavaScript on every frame. Keyframes,
  // duration, easing and looping are unchanged. With reduced motion the original
  // `x` animation is kept on purpose: Framer's reducedMotion="user" only skips
  // positional keys such as `x`, so the track keeps resting at its final keyframe
  // exactly as before.
  const reduceMotion = useReducedMotion();
  // Phase 5 (B2): pause each ticker row while it is off-screen (resumes where it stopped).
  const brandTrackRef = useRef<HTMLDivElement>(null);
  const deviceTrackRef = useRef<HTMLDivElement>(null);
  usePauseWhenOffscreen(brandTrackRef, !reduceMotion);
  usePauseWhenOffscreen(deviceTrackRef, !reduceMotion);

  return (
    // MAIN BG COLOR: Neon Green (#39FF14)
    <div className="w-full relative py-12 bg-[#39FF14] overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        {/* Text is dark to contrast against the bright neon green background */}
        <p className="text-sm text-[#081425] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <span>Ondersteunde apps &amp; apparaten</span>
        </p>
      </div>

      {/* Row 1: Forward Slider (Upper Row - Dark Surface) */}
      {SHOW_BRAND_LOGO_ROW && (
      <div className="relative z-10 bg-[#0B1F35] border-y border-[#081425]/20 overflow-hidden mb-8 pt-11 pb-6 shadow-xl">
        {/* Blended dark gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0B1F35] via-[#0B1F35]/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0B1F35] via-[#0B1F35]/60 to-transparent z-10 pointer-events-none" />

        <m.div
          ref={brandTrackRef}
          className="flex gap-12 md:gap-16 items-center w-max"
          animate={
            reduceMotion
              ? { x: [0, -animationDistancePartners] }
              : { transform: ['translateX(0px)', `translateX(-${animationDistancePartners}px)`] }
          }
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          }}
        >
          {sliderItems.map((partner, idx) => {
            const isDuplicate = idx >= partners.length;
            const halfLabel = isDuplicate ? 'Herhaling' : 'Logo';
            const position = isDuplicate ? idx - partners.length + 1 : idx + 1;
            const altText = `${partner.alt} – ${halfLabel} ${position} van ${partners.length}`;

            return (
              <div
                key={`partner-${partner.name}-${idx}`}
                className="flex items-center justify-center min-w-[120px] md:min-w-[150px] opacity-90 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                <div className="relative w-20 h-20 md:w-28 md:h-28">
                  <img
                    src={partner.imagePath}
                    alt={altText}
                    width={partner.width}
                    height={partner.height}
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, 112px"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </m.div>
      </div>
      )}

      {/* Row 2: Reverse Slider (Lower Row - WHITE Background) */}
      <div className="relative z-10 w-full bg-white py-6 overflow-hidden shadow-xl">
        {/* Blended white gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <m.div
          ref={deviceTrackRef}
          className="flex gap-12 md:gap-16 items-center w-max"
          animate={
            reduceMotion
              ? { x: [-animationDistanceDevices, 0] }
              : { transform: [`translateX(-${animationDistanceDevices}px)`, 'translateX(0px)'] }
          }
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear',
          }}
        >
          {deviceItems.map((device, idx) => {
            const isDuplicate = idx >= devices.length;
            const halfLabel = isDuplicate ? 'Herhaling' : 'Logo';
            const position = isDuplicate ? idx - devices.length + 1 : idx + 1;
            const altText = `${device.alt} – ${halfLabel} ${position} van ${devices.length}`;

            return (
              <div
                key={`device-${device.name}-${idx}`}
                className="flex items-center justify-center min-w-[120px] md:min-w-[150px] transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                  <img
                    src={device.imagePath}
                    alt={altText}
                    width={device.width}
                    height={device.height}
                    // drop-shadow-sm keeps it subtle against the white bg
                    className="object-contain w-full h-full drop-shadow-sm"
                    sizes="(max-width: 768px) 80px, 112px"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </m.div>
      </div>
    </div>
  );
}