'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { m, AnimatePresence } from 'framer-motion';
import { FadeIn, FadeInStagger, FadeInItem } from './AnimatedSection';
import { CONSTANTS, FREE_TRIAL_WHATSAPP_URL, WHATSAPP_AVAILABLE, whatsappUrl } from '@/lib/seo';
import {
  PRICES,
  DEVICE_OPTIONS,
  formatEUR,
  formatEURExact,
  monthlyPrice,
  savingPercent,
  deviceLabel,
  type DeviceCount,
  type PlanMonths,
} from '@/lib/pricing';
import {
  CheckCircle2,
  Zap,
  Crown,
  MonitorPlay,
  Gift,
  Sparkles,
  Flame,
  ShieldCheck,
  Lock,
  Tv2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// Payment Method SVG Icons (dark-shell only, per dark-first design)
// ---------------------------------------------------------------------------
// Defined at module scope (not inside PaymentIcons) so React keeps a stable
// component identity between renders instead of remounting each icon shell.
const PAYMENT_SHELL_BG = '#0F2942';

const PaymentShell = ({ children, border }: { children: ReactNode; border: string }) => (
  <div
    className="flex items-center justify-center h-8 w-12 rounded-md overflow-hidden shrink-0 transition-transform duration-300 hover:scale-110"
    style={{ backgroundColor: PAYMENT_SHELL_BG, border: `1px solid ${border}` }}
  >
    {children}
  </div>
);

const PaymentIcons = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';
  const shellBorder = isDark ? 'rgba(255,215,0,0.45)' : 'rgba(57,255,20,0.30)';

  return (
    <div className="grid grid-cols-4 gap-2 items-center" aria-label="Betaalmethoden: Visa, Mastercard, PayPal en Bitcoin">
      <PaymentShell border={shellBorder}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="24" y="22" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fontStyle="italic" fill="#F8FAFC" letterSpacing="-0.5">VISA</text>
        </svg>
      </PaymentShell>
      <PaymentShell border={shellBorder}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="19" cy="16" r="9" fill="#EB001B" />
          <circle cx="29" cy="16" r="9" fill="#F79E1B" />
          <path d="M24 8.5a9 9 0 000 15 9 9 0 000-15z" fill="#FF5F00" />
        </svg>
      </PaymentShell>
      <PaymentShell border={shellBorder}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="900" fontStyle="italic" fill="#60A5FA">Pay</text>
          <text x="24" y="27" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="800" fontStyle="italic" fill="#93C5FD">Pal</text>
        </svg>
      </PaymentShell>
      <PaymentShell border={shellBorder}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="16" r="10" fill="#F7931A" />
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">₿</text>
        </svg>
      </PaymentShell>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ANIMATED PRICE COMPONENT
// ---------------------------------------------------------------------------
const AnimatedPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <span className={`inline-flex items-baseline ${className ?? ''}`}>
      <AnimatePresence mode="wait">
        <m.span
          key={value}
          initial={{ opacity: 0, y: -25, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.7 }}
          transition={{ duration: 0.35, type: 'spring', stiffness: 200, damping: 18 }}
          className="inline-block"
        >
          {formatEUR(value)}
        </m.span>
      </AnimatePresence>
    </span>
  );
};

// ---------------------------------------------------------------------------
// COLLAPSIBLE FEATURE LIST — shows 3 lines by default, expands on click.
// The circle toggle is rendered OUTSIDE the content flow by the parent card
// so it can sit exactly on the card's bottom border (half in / half out).
// ---------------------------------------------------------------------------
const FeatureList = ({
  features,
  accent,
  open,
}: {
  features: string[];
  accent: 'gold' | 'green';
  open: boolean;
}) => {
  const isGold = accent === 'gold';
  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out ${
        open ? 'max-h-[1000px]' : 'max-h-[5.5rem]' // ~3 full lines
      }`}
    >
      <ul className="w-full space-y-3.5">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-center gap-3 font-semibold text-sm ${
              isGold ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'
            }`}
          >
            {isGold ? (
              <div className="bg-[#FFD700]/20 p-0.5 rounded-full border border-[#FFD700]/40 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
              </div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0" />
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---------------------------------------------------------------------------
// CIRCLE TOGGLE — sits on the card's bottom border (half in / half out)
// Rendered as absolute-positioned element INSIDE the card root.
// ---------------------------------------------------------------------------
const EdgeToggle = ({
  open,
  onClick,
  accent,
  controlsId,
}: {
  open: boolean;
  onClick: () => void;
  accent: 'gold' | 'green';
  controlsId: string;
}) => {
  const isGold = accent === 'gold';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? 'Toon minder kenmerken' : 'Toon alle kenmerken'}
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081425] active:scale-95 ${
        isGold
          ? 'bg-[#FFD700] text-[#081425] hover:bg-[#E6C200] focus-visible:ring-[#FFD700]'
          : 'bg-[#39FF14] text-[#081425] hover:bg-[#2fe010] focus-visible:ring-[#39FF14]'
      }`}
    >
      {open ? (
        <ChevronUp className="w-5 h-5" strokeWidth={3} />
      ) : (
        <ChevronDown className="w-5 h-5" strokeWidth={3} />
      )}
    </button>
  );
};

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function PricingSection() {
  const [devices, setDevices] = useState<DeviceCount>(1);

  // Per-card independent open state — one card opening does NOT open others.
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    starter: false,
    vip: false,
    premium: false,
  });

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Prices come from lib/pricing.ts (single source of truth, EUR).
  const price = (months: PlanMonths) => PRICES[devices][months];
  const perMonth = (months: PlanMonths) => formatEURExact(monthlyPrice(devices, months));
  const saving12 = savingPercent(devices, 12);
  const saving6 = savingPercent(devices, 6);

  const handleWhatsAppRedirect = (months: PlanMonths) => {
    const giftLine = months === 12 ? ' + gratis player-app' : '';
    const message = `Hallo ${BRAND}! Ik wil graag het abonnement van ${months} maanden voor ${deviceLabel(devices)} (${formatEUR(price(months))})${giftLine}.`;
    openContact(whatsappUrl(message));
  };

  const handleFreeTrialRedirect = () => {
    openContact(FREE_TRIAL_WHATSAPP_URL);
  };

  // Notice shown while WhatsApp opens. It carries the same URL as a manual
  // link, because a "noopener" window.open() gives no way to detect a blocked
  // pop-up. The notice only says WhatsApp is being opened, never that an
  // order was placed.
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(noticeTimer.current), []);
  const hasMounted = useHasMounted();

  // Without a verified WhatsApp number whatsappUrl() returns the internal
  // customer-service page: open that in the same tab instead of a new one.
  function openContact(url: string) {
    if (!WHATSAPP_AVAILABLE) {
      window.location.assign(url);
      return;
    }
    // Opened synchronously inside the click so pop-up blockers allow it.
    // wa.me opens the WhatsApp app on phones and WhatsApp Web/Desktop on
    // computers.
    window.open(url, '_blank', 'noopener,noreferrer');
    setRedirectUrl(url);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setRedirectUrl(null), 8000);
  }

  const baseFeatures = [
    `${deviceLabel(devices)} tegelijk`,
    'Live tv in Full HD en 4K (waar beschikbaar)',
    'Films en series on demand',
    '7 dagen terugkijken en tv-gids (EPG)',
  ];

  return (
    <section
     
      className="w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 bg-[#081425] text-[#F8FAFC] overflow-hidden"
    >
      {/* Background decorations — square grid pattern, clearly visible */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#39FF14]/10 blur-[140px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(30,58,82,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,82,0.55) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <FadeIn className="text-center justify-center max-w-4xl mx-auto mb-16 md:mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 border border-[#39FF14]/60 bg-[#0B1F35] px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-[#39FF14]/10">
            <Crown className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
              Abonnementen &amp; prijzen
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tight leading-tight">
            Kies je <span className="text-[#39FF14]">IPTV abonnement</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Kies het aantal apparaten en de looptijd die bij je huishouden past. Hoe langer de looptijd, hoe lager de prijs per maand. Alle prijzen zijn in euro’s.
          </p>

          {/* Device Switcher — TV icon on every button, pointer cursor */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#39FF14]" />
              <span className="text-xs text-[#94A3B8] font-black uppercase tracking-widest">
                Aantal apparaten dat tegelijk kijkt
              </span>
            </div>
            <div className="inline-flex bg-[#0F2942] border border-[#1E3A52] rounded-2xl p-1.5 shadow-2xl relative">
              {DEVICE_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDevices(d)}
                  aria-pressed={devices === d}
                  aria-label={`Abonnement voor ${deviceLabel(d)}`}
                  className={`inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 relative cursor-pointer disabled:cursor-not-allowed ${
                    devices === d
                      ? 'bg-[#39FF14] text-[#081425] shadow-lg shadow-[#39FF14]/40 scale-[1.03] ring-2 ring-[#39FF14]/40'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  <Tv2
                    className={`w-4 h-4 shrink-0 ${
                      devices === d ? 'text-[#081425]' : 'text-[#94A3B8]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{deviceLabel(d)}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Pricing Cards Grid — no items-stretch so cards size to content.
            Extra bottom padding so straddling circles have room. */}
        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-10 gap-y-16 lg:gap-8 max-w-6xl mx-auto mt-12 pb-16 relative z-10">

          {/* ================= CARD 1: 3 MONTHS ================= */}
          <div className="relative">
            <FadeInItem className="relative bg-[#0F2942] text-[#F8FAFC] border-4 border-[#1E3A52] rounded-3xl p-6 sm:p-8 flex flex-col group overflow-visible shadow-xl transition-all duration-500 hover:border-[#39FF14] hover:shadow-[0_25px_60px_rgba(57,255,20,0.18)] hover:-translate-y-3">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#008000]/0 via-[#008000]/0 to-[#008000]/0 group-hover:from-[#008000]/10 group-hover:to-[#008000]/15 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-[#39FF14] uppercase tracking-[0.2em]">Starter</h3>
                  <MonitorPlay className="w-5 h-5 text-[#39FF14] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <div className="text-3xl font-black text-[#F8FAFC] mb-2 tracking-tighter uppercase">3 maanden</div>

                <div className="mt-2 mb-1 inline-flex self-start px-5 py-2 rounded-2xl bg-[#081425] border-2 border-[#39FF14]/20 shadow-md transition-all duration-500 group-hover:border-[#39FF14] group-hover:shadow-lg group-hover:scale-[1.05]">
                  <span className="text-5xl font-black text-[#F8FAFC] tracking-tighter transition-all duration-500 group-hover:text-[#39FF14]">
                    <AnimatedPrice value={price(3)} />
                  </span>
                </div>
                <div className="text-[11px] font-black text-[#39FF14] mb-5 uppercase tracking-widest border border-[#39FF14]/30 self-start px-3 py-1 rounded-full inline-block bg-[#39FF14]/10">
                  {perMonth(3)} per maand
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect(3)}
                  className="w-full text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#FFD700] text-[#081425] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-lg shadow-[#FFD700]/30 active:scale-95 group-hover:scale-105 mb-4 cursor-pointer disabled:cursor-not-allowed"
                >
                  Bestel 3 maanden
                </button>

                <div className="mb-6 pt-3 border-t border-[#1E3A52]">
                  <div className="flex items-center justify-between text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2">
                    <span>Betaalmethoden</span>
                    <Lock className="w-3 h-3 text-[#94A3B8]" />
                  </div>
                  <PaymentIcons variant="light" />
                </div>

                <FeatureList
                  accent="green"
                  open={openCards.starter}
                  features={[
                    ...baseFeatures,
                    'Smart TV, Firestick, Apple TV, iOS, Android en MAG',
                    'Installatiehulp via WhatsApp',
                  ]}
                />

                <div className="p-3 mt-6 bg-[#081425] rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#008000]/15">
                  <Zap className="w-4 h-4 text-[#39FF14] shrink-0" />
                  <span className="text-[11px] font-black text-[#F8FAFC] uppercase tracking-wider">
                    Activering na betaling via WhatsApp
                  </span>
                </div>
              </div>

              {/* Circle toggle — absolute on the card border */}
              <EdgeToggle
                open={openCards.starter}
                onClick={() => toggleCard('starter')}
                accent="green"
                controlsId="features-starter"
              />
            </FadeInItem>
          </div>

          {/* ================= CARD 2: 12 MONTHS VIP ================= */}
          <div className="relative">
            <FadeInItem className="relative bg-[#0B1F35] border-2 border-[#FFD700] rounded-3xl p-6 sm:p-9 flex flex-col group transition-all duration-500 hover:shadow-[0_0_70px_rgba(255,215,0,0.40)] lg:-translate-y-4 hover:-translate-y-6 shadow-[0_0_50px_rgba(255,215,0,0.20)] z-20 overflow-visible">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-auto whitespace-nowrap">
                <div className="bg-[#FFD700] text-[#081425] text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full flex items-center gap-1.5 shadow-xl border border-[#081425]">
                  <Flame className="w-3.5 h-3.5 fill-current text-[#081425]" /> Laagste prijs per maand
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFD700]/0 via-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#FFD700]" /> VIP
                  </h3>
                  <Sparkles className="w-4 h-4 text-[#FFD700] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </div>

                <div className="mb-2 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#39FF14] text-[#081425] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#39FF14]/30">
                  <Flame className="w-3 h-3 fill-current" /> Bespaar {saving12}%
                </div>

                <div className="text-3xl font-black text-[#FFD700] mb-2 tracking-tighter uppercase">
                  12 maanden
                </div>

                <div className="mt-2 mb-1 inline-flex self-start px-5 py-2 rounded-2xl bg-[#081425] border-2 border-[#FFD700]/30 shadow-md transition-all duration-500 group-hover:border-[#FFD700] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.45)] group-hover:scale-[1.05]">
                  <span className="text-6xl font-black text-[#FFD700] tracking-tighter drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">
                    <AnimatedPrice value={price(12)} />
                  </span>
                </div>

                <div className="text-[11px] font-black text-[#FFD700] mb-5 uppercase tracking-widest border border-[#FFD700] self-start px-4 py-1.5 rounded-full inline-block bg-[#FFD700]/10 shadow-sm">
                  {perMonth(12)} per maand
                </div>

                {/* COMPACT FREE GIFT CALLOUT — short, small, stylish */}
                <div className="relative mb-4 rounded-xl border border-dashed border-[#39FF14]/60 bg-[#008000]/15 px-3 py-2 overflow-hidden">
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-[#39FF14] text-[#081425] flex items-center justify-center shadow shadow-[#39FF14]/40">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[#39FF14]">
                        Cadeau
                      </div>
                      <p className="text-[12px] font-extrabold text-[#F8FAFC]">
                        Gratis player-app – 12 maanden inbegrepen
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect(12)}
                  className="w-full text-center whitespace-nowrap px-6 py-4 sm:py-5 rounded-full bg-[#FFD700] text-[#081425] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-xl shadow-[#FFD700]/30 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(255,215,0,0.45)] mb-4 cursor-pointer disabled:cursor-not-allowed"
                >
                  Bestel 12 maanden VIP
                </button>

                <div className="mb-6 pt-3 border-t border-[#FFD700]/20">
                  <div className="flex items-center justify-between text-[10px] font-black text-[#FFD700]/80 uppercase tracking-widest mb-2">
                    <span>Betaalmethoden</span>
                    <Lock className="w-3 h-3 text-[#FFD700]" />
                  </div>
                  <PaymentIcons variant="dark" />
                </div>

                <FeatureList
                  accent="gold"
                  open={openCards.vip}
                  features={[
                    ...baseFeatures,
                    'Aparte VIP-serverlijn',
                    'Smart TV, Firestick, Apple TV, iOS, Android en MAG',
                    'Voorrang bij hulp via WhatsApp',
                  ]}
                />

                <div className="p-3 mt-6 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#FFD700]/20">
                  <Crown className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span className="text-[11px] font-black text-[#FFD700] uppercase tracking-wider">
                    VIP-lijn + gratis player-app
                  </span>
                </div>
              </div>

              <EdgeToggle
                open={openCards.vip}
                onClick={() => toggleCard('vip')}
                accent="gold"
                controlsId="features-vip"
              />
            </FadeInItem>
          </div>

          {/* ================= CARD 3: 6 MONTHS ================= */}
          <div className="relative">
            <FadeInItem className="relative bg-gradient-to-br from-[#0F2942] via-[#0B1F35] to-[#0F2942] border-4 border-[#39FF14]/60 rounded-3xl p-6 sm:p-8 flex flex-col group overflow-visible shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-[#39FF14] hover:shadow-[0_35px_80px_rgba(57,255,20,0.20)] hover:-translate-y-3">
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,_rgba(57,255,20,0.10),_transparent_60%)] pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-[#39FF14] uppercase tracking-[0.2em]">Premium</h3>
                  <MonitorPlay className="w-5 h-5 text-[#39FF14] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <div className="text-3xl font-black text-[#F8FAFC] mb-2 tracking-tighter uppercase">6 maanden</div>

                <div className="mt-2 mb-1 inline-flex self-start px-5 py-2 rounded-2xl bg-[#081425] border-2 border-[#39FF14]/30 shadow-md transition-all duration-500 group-hover:border-[#39FF14] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.45)] group-hover:scale-[1.05]">
                  <span className="text-5xl font-black text-[#F8FAFC] tracking-tighter transition-all duration-500 group-hover:text-[#39FF14]">
                    <AnimatedPrice value={price(6)} />
                  </span>
                </div>
                <div className="text-[11px] font-black text-[#39FF14] mb-5 uppercase tracking-widest border border-[#39FF14]/60 self-start px-3 py-1 rounded-full inline-block bg-[#39FF14]/10">
                  {perMonth(6)} per maand · bespaar {saving6}%
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect(6)}
                  className="w-full text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#FFD700] text-[#081425] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-xl shadow-[#FFD700]/30 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(255,215,0,0.45)] mb-4 cursor-pointer disabled:cursor-not-allowed"
                >
                  Bestel 6 maanden
                </button>

                <div className="mb-6 pt-3 border-t border-[#39FF14]/20">
                  <div className="flex items-center justify-between text-[10px] font-black text-[#39FF14] uppercase tracking-widest mb-2">
                    <span>Betaalmethoden</span>
                    <Lock className="w-3 h-3 text-[#39FF14]" />
                  </div>
                  <PaymentIcons variant="dark" />
                </div>

                <FeatureList
                  accent="green"
                  open={openCards.premium}
                  features={[
                    ...baseFeatures,
                    'Smart TV, Firestick, Apple TV, iOS, Android en MAG',
                    'Installatiehulp via WhatsApp',
                  ]}
                />

                <div className="p-3 mt-6 bg-[#008000]/15 border border-[#39FF14]/30 rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#008000]/25">
                  <Zap className="w-4 h-4 text-[#39FF14] shrink-0" />
                  <span className="text-[11px] font-black text-[#F8FAFC] uppercase tracking-wider">
                    Activering na betaling via WhatsApp
                  </span>
                </div>
              </div>

              <EdgeToggle
                open={openCards.premium}
                onClick={() => toggleCard('premium')}
                accent="green"
                controlsId="features-premium"
              />
            </FadeInItem>
          </div>

        </FadeInStagger>

        {/* Free Trial Banner */}
        <FadeIn className="max-w-2xl mx-auto mt-4 relative z-30">
          <div className="bg-[#0F2942] border border-[#39FF14]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden group hover:border-[#39FF14] transition-all duration-500">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#39FF14]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-4 text-left relative z-10">
              <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 p-3 rounded-xl text-[#39FF14] shrink-0 hidden sm:block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
                  <h3 className="text-base font-black text-[#F8FAFC] uppercase tracking-tight">
                    Gratis 24 uur testen
                  </h3>
                </div>
                <p className="text-xs text-[#94A3B8] font-medium">
                  Probeer het eerst zonder verplichtingen op je tv of telefoon. Via WhatsApp helpen we je met de installatie.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0 relative z-10">
              <button
                onClick={handleFreeTrialRedirect}
                className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-3 rounded-full bg-[#FFD700] text-[#081425] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-lg active:scale-95 hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
              >
                Gratis proberen
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* WhatsApp redirect notice (polite live region: announced, not
          focus-stealing). Portalled to <body> so `fixed` is relative to the
          viewport, not to an animated (transformed) ancestor. */}
      {hasMounted && WHATSAPP_AVAILABLE && createPortal(
      <div
        role="status"
        aria-live="polite"
        className="fixed inset-x-4 bottom-24 md:bottom-28 z-[40] flex justify-center pointer-events-none"
      >
        {redirectUrl && (
          <div className="pointer-events-auto w-full max-w-md bg-[#0F2942] border-2 border-[#39FF14] rounded-2xl shadow-2xl px-5 py-4 flex items-start gap-3">
            <p className="flex-1 text-sm font-bold text-[#F8FAFC] leading-relaxed">
              Je wordt doorgestuurd naar WhatsApp om je abonnement af te ronden.{' '}
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39FF14] underline underline-offset-2 hover:text-[#FFD700]"
              >
                Opent WhatsApp niet? Klik hier.
              </a>
            </p>
            <button
              type="button"
              onClick={() => setRedirectUrl(null)}
              aria-label="Melding sluiten"
              className="shrink-0 text-[#94A3B8] hover:text-[#F8FAFC] text-lg leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>,
      document.body
      )}
    </section>
  );
}