'use client';

import { FadeIn } from './AnimatedSection';
import { Wifi, Server, ShieldCheck, Zap } from 'lucide-react';
import { CONSTANTS } from '@/lib/seo';
import { responsiveImageProps } from '@/lib/blog-helpers';

export default function GlobalServerMap() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#09090B] py-16 sm:py-20 lg:py-28"
      aria-label="Kijken via internet"
    >
      {/* Global square-grid background pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.05),_transparent_65%)] pointer-events-none z-0" />

      <FadeIn className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#39FF14]">
            <Wifi className="h-4 w-4 text-[#39FF14]" />
            Tv via internet
          </div>

          <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-[#F8FAFC] sm:text-4xl md:text-5xl">
            Kijken via je <span className="text-[#39FF14]">internetverbinding</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#94A3B8] sm:text-base font-medium">
            Met {CONSTANTS.BRAND_NAME} komt het tv-signaal via internet binnen, zonder schotel of kabelaansluiting. Een stabiele verbinding thuis is het belangrijkst voor vloeiend beeld; test het daarom eerst 24 uur gratis.
          </p>
        </div>

        {/* Medium-Sized Map Graphic */}
        <div className="relative mx-auto my-8 max-w-5xl px-4">
          <img
            {...responsiveImageProps('/img/global.png', [640, 828, 1080, 1920])}
            alt="Wereldkaart met vlaggen van verschillende landen"
            width={1400}
            height={787}
            className="w-full h-auto max-h-[600px] object-contain block mx-auto opacity-95"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="bg-[#18181B] p-6 rounded-xl border border-[#27272A] shadow-sm hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300">
            <div className="flex justify-center mb-3">
              <Zap className="h-6 w-6 text-[#39FF14]" />
            </div>
            <h3 className="text-base font-black uppercase text-[#F8FAFC]">Netwerkkabel of 5 GHz</h3>
            <p className="text-xs text-[#94A3B8] mt-1 font-medium">
              Een bekabelde verbinding of sterk 5 GHz-wifisignaal geeft het stabielste beeld, vooral bij live uitzendingen.
            </p>
          </div>

          <div className="bg-[#18181B] p-6 rounded-xl border border-[#27272A] shadow-sm hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300">
            <div className="flex justify-center mb-3">
              <Server className="h-6 w-6 text-[#39FF14]" />
            </div>
            <h3 className="text-base font-black uppercase text-[#F8FAFC]">Voldoende snelheid</h3>
            <p className="text-xs text-[#94A3B8] mt-1 font-medium">
              We raden minimaal 15 Mbit/s aan voor Full HD en 30 Mbit/s voor 4K, per scherm dat tegelijk kijkt.
            </p>
          </div>

          <div className="bg-[#18181B] p-6 rounded-xl border border-[#27272A] shadow-sm hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300">
            <div className="flex justify-center mb-3">
              <ShieldCheck className="h-6 w-6 text-[#39FF14]" />
            </div>
            <h3 className="text-base font-black uppercase text-[#F8FAFC]">Hulp via WhatsApp</h3>
            <p className="text-xs text-[#94A3B8] mt-1 font-medium">
              Hapert het beeld of lukt de installatie niet? Stuur ons een bericht, dan zoeken we het samen uit.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}