// Server Component: the footer has no interactivity (hover effects are CSS),
// so it renders on the server. This keeps lib/channels-data.ts (used here only
// for category slugs/names) out of the client JavaScript bundle.
// Footer links prefetch on hover/touch/focus instead of on sight (see IntentLink).
import IntentLink from "./IntentLink";
import { useId } from "react";
import { CONSTANTS } from "@/lib/seo";
import BrandLogo from "./BrandLogo";
import { channelsData } from "@/lib/channels-data";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { optimizedImageUrl } from '@/lib/blog-helpers';

const SOCIAL_LINKS = [
  { href: CONSTANTS.SOCIALS.twitter, label: "Twitter", Icon: Twitter },
  { href: CONSTANTS.SOCIALS.instagram, label: "Instagram", Icon: Instagram },
  { href: CONSTANTS.SOCIALS.facebook, label: "Facebook", Icon: Facebook },
].filter((s) => s.href);

// Lightweight circular Dutch flag. A unique clipPath id per instance (useId)
// avoids duplicate-id hydration issues.
const FlagNL = () => {
  const id = useId();
  return (
    <svg className="w-5 h-5 rounded-full shadow-md shrink-0 border border-white/20" viewBox="0 0 32 32" aria-hidden="true">
      <clipPath id={id}><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill="#AE1C28" d="M0 0h32v10.67H0z" />
        <path fill="#FFF" d="M0 10.67h32v10.66H0z" />
        <path fill="#21468B" d="M0 21.33h32V32H0z" />
      </g>
    </svg>
  );
};

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Prijzen', href: '/prijzen' },
  { name: 'IPTV kopen', href: '/iptv-kopen' },
  { name: 'Installatie', href: '/installatie' },
  { name: 'Veelgestelde vragen', href: '/veelgestelde-vragen' },
  { name: 'Blog', href: '/blog' },
  { name: 'Klantenservice', href: '/klantenservice' },
  { name: 'Resellerprogramma', href: '/reseller' },
  { name: 'Reviews', href: '/reviews' },
];

const legalLinks = [
  { name: 'Over ons', href: '/over-ons' },
  { name: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
  { name: 'Privacybeleid', href: '/privacybeleid' },
  { name: 'Restitutiebeleid', href: '/restitutiebeleid' },
  { name: 'Auteursrecht (DMCA)', href: '/dmca' },
];

export default function Footer() {
  // Rendered on the server; static pages revalidate every 24h (root layout).
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 border-t-4 border-[#39FF14] overflow-hidden">

      {/* 1. Global square-grid background pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* 2. 50% Transparent dark background ON TOP of the pattern */}
      <div className="absolute inset-0 bg-[#09090B]/80 z-0 pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/60 to-transparent z-10" />

      {/* Main Footer Body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12 text-[#F8FAFC]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <IntentLink
                href="/"
                className="flex items-center gap-3 mb-5 group inline-flex cursor-pointer"
                aria-label={`${CONSTANTS.BRAND_NAME} – naar de homepage`}
              >
                <div className="w-auto h-12 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <BrandLogo className="h-full w-[221px]" title="" />
                </div>
              </IntentLink>

              <p className="text-sm md:text-base font-bold text-[#94A3B8] max-w-sm leading-relaxed mb-5">
                <strong className="text-[#39FF14]">{CONSTANTS.BRAND_NAME}</strong> helpt je aan een{" "}
                IPTV abonnement voor live tv, films en series op je eigen apparaten. Eerst gratis
                testen, daarna kiezen voor 3, 6 of 12 maanden – met hulp via WhatsApp.
              </p>

              {/* Coverage Focus Badge (original markup; Netherlands instead of US/CA/UK/AU) */}
              <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 py-1.5 px-3 mb-6 rounded-full bg-[#18181B] border border-[#27272A] backdrop-blur-md w-fit shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#94A3B8] shrink-0">
                  Voor:
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
                  <div className="flex items-center gap-1 group cursor-default" title="Nederland">
                    <FlagNL />
                    <span className="text-[10px] font-black uppercase text-[#F8FAFC] group-hover:text-[#39FF14] transition-colors">
                      NL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons: rendered only for profiles the owner has set in
                CONSTANTS.SOCIALS (empty = not yet confirmed, so no fake links). */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Volg ${CONSTANTS.BRAND_NAME} op ${label}`}
                    className="group w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center hover:bg-[#39FF14] hover:border-[#39FF14] transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-[#94A3B8] group-hover:text-[#09090B] transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <p className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Navigatie
            </p>
            <ul className="space-y-3 text-sm font-bold">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <IntentLink
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </IntentLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Channel Packages */}
          <div className="lg:col-span-3">
            <p className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Zenderpakketten
            </p>
            <ul className="space-y-3 text-sm font-bold">
              {channelsData.map((category) => (
                <li key={category.slug}>
                  <IntentLink
                    href={`/zenders/${category.slug}`}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors block cursor-pointer"
                  >
                    {category.name}
                  </IntentLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <p className="text-[#F8FAFC] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#39FF14] pb-1 inline-block">
              Juridisch
            </p>
            <ul className="space-y-3 text-sm font-bold">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <IntentLink
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </IntentLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* BOTTOM FOOTER BAR                                                   */}
      {/* ------------------------------------------------------------------- */}
      {/* Extra bottom space (mobile) / right space (md+) keeps the payment icons
          clear of the fixed WhatsApp button, which otherwise covered them. */}
      <div className="relative bg-[#121215] border-t border-[#27272A] pt-6 pb-28 md:pb-6 px-6 lg:px-12 shadow-lg z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:pr-20">
          {/* Copyright text */}
          <p className="text-base md:text-sm font-extrabold text-[#F8FAFC] tracking-wide text-center md:text-left">
            © {year}{" "}
            <span className="text-[#39FF14]">{CONSTANTS.BRAND_NAME}</span>. Alle rechten voorbehouden.
          </p>

          {/* Payment cards */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {CONSTANTS.PAYMENT_METHODS.map((item) => (
              <div
                key={item.name}
                className="relative h-10 w-16 shrink-0 rounded-lg border border-[#27272A] bg-[#18181B] p-1 shadow-sm hover:scale-105 hover:border-[#39FF14] transition-all duration-200"
                title={item.name}
              >
              <img
                src={optimizedImageUrl(item.icon, 256)}
                alt={item.name}
                className="object-contain p-1 filter drop-shadow-sm opacity-95"
                loading="lazy"
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}