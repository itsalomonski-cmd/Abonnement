'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONSTANTS, whatsappUrl, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { resellerFaqs } from '@/lib/page-faqs';
import { RESELLER_PRICES, formatEUR, formatEURExact } from '@/lib/pricing';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Globe,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Package,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import { FaqText } from '@/lib/faq-text';

const BRAND = CONSTANTS.BRAND_NAME;
// ===========================================================================
// PRICING TIERS (EUR, from lib/pricing.ts)
// ===========================================================================
interface PricingTier {
  name: string;
  tag: string;
  years: number;
  credits: number;
  price: number;
  perCredit: number;
  highlighted: boolean;
  features: string[];
  waMessage: string;
}

const tier = (
  key: keyof typeof RESELLER_PRICES,
  name: string,
  highlighted: boolean,
  features: string[]
): PricingTier => {
  const { credits, price } = RESELLER_PRICES[key];
  return {
    name,
    tag: `${credits} jaar`,
    years: credits,
    credits,
    price,
    perCredit: price / credits,
    highlighted,
    features,
    waMessage: `Hallo! Ik wil het ${name}-resellerpakket (${credits} credits / ${formatEUR(price)}) van ${BRAND}.`,
  };
};

const tiers: PricingTier[] = [
  tier('starter', 'Starter', false, [
    '10 resellercredits (10 jaar)',
    'Volledige toegang tot het resellerpanel',
    'Directe activering per klant',
    'Ondersteuning via WhatsApp',
    'Credits verlopen niet',
    'Proefperiodes aanmaken',
  ]),
  tier('growth', 'Growth', true, [
    '20 resellercredits (20 jaar)',
    'Volledige toegang tot het resellerpanel',
    'Directe activering per klant',
    'Voorrang bij ondersteuning via WhatsApp',
    'Credits verlopen niet',
    'Proefperiodes aanmaken',
    'Eigen prijs per klant',
    'API-toegang',
  ]),
  tier('pro', 'Pro', false, [
    '30 resellercredits (30 jaar)',
    'Volledige toegang tot het resellerpanel',
    'Directe activering per klant',
    'Eigen supportkanaal via WhatsApp',
    'Credits verlopen niet',
    'Proefperiodes aanmaken',
    'Eigen prijs per klant',
    'Volledige API-toegang',
    'Optie voor white-label branding',
  ]),
];

// ===========================================================================
// FAQS
// ===========================================================================
// FAQ content lives in lib/page-faqs.ts (shared with the FAQPage JSON-LD).
const faqs = resellerFaqs;

// ===========================================================================
// STEPS
// ===========================================================================
const steps = [
  {
    icon: Wallet,
    number: '01',
    title: 'Koop je credits',
    description: 'Kies een pakket en ontvang je credits na bevestiging van je betaling.',
  },
  {
    icon: LayoutDashboard,
    number: '02',
    title: 'Open je panel',
    description: 'Log in op je persoonlijke resellerpanel. Maak abonnementen en proefperiodes aan en beheer je klanten op één plek.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Verkoop aan klanten',
    description: 'Je bepaalt zelf je verkoopprijs. Een credit gebruik je pas op het moment dat je een klant activeert.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Groei verder',
    description: 'Bij een groter pakket betaal je minder per credit. Extra credits bestel je via WhatsApp.',
  },
];

// ===========================================================================
// VALUE CARDS
// ===========================================================================
const valueCards = [
  {
    icon: BadgeDollarSign,
    title: 'Lage instap',
    description: `Begin met het Starter-pakket van ${formatEUR(RESELLER_PRICES.starter.price)}. Geen contract en geen maandelijkse kosten.`,
  },
  {
    icon: Users,
    title: 'Je eigen klanten',
    description: 'Je beheert je eigen klanten en bepaalt zelf hoe je ze bedient en wat ze betalen.',
  },
  {
    icon: Wallet,
    title: 'Vaste inkoop',
    description: `Je inkoop per jaar abonnement ligt tussen ${formatEURExact(RESELLER_PRICES.pro.price / RESELLER_PRICES.pro.credits)} en ${formatEURExact(RESELLER_PRICES.starter.price / RESELLER_PRICES.starter.credits)}, afhankelijk van je pakket.`,
  },
  {
    icon: Server,
    title: 'Hulp via WhatsApp',
    description: 'Bij de start en daarna helpen we je via WhatsApp met het panel en je klanten.',
  },
];

// ===========================================================================
// PANEL FEATURES
// ===========================================================================
const panelFeatures = [
  { icon: LayoutDashboard, label: 'Resellerdashboard' },
  { icon: Zap, label: 'Directe activering' },
  { icon: Package, label: 'Credits verlopen niet' },
  { icon: Bot, label: 'Proefperiodes aanmaken' },
  { icon: BarChart3, label: 'Overzicht verkopen' },
  { icon: CreditCard, label: 'Eigen prijzen' },
  { icon: Globe, label: 'Prijzen in euro’s' },
  { icon: Headphones, label: 'Hulp via WhatsApp' },
  { icon: ShieldCheck, label: 'Beveiligd panel' },
  { icon: Rocket, label: 'API-koppeling' },
];

// ===========================================================================
// PRICING CARD
// ===========================================================================
function PricingCard({ tier }: { tier: PricingTier }) {
  const orderUrl = whatsappUrl(tier.waMessage);

  const wholesalePrice = formatEUR(tier.price);
  const perYearPrice = formatEURExact(tier.perCredit);

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 md:p-8 transition-all duration-500 ${
        tier.highlighted
          ? 'bg-[#18181B] border-2 border-[#39FF14] shadow-[0_25px_60px_rgba(57,255,20,0.15)] lg:-translate-y-4 z-20'
          : 'bg-[#18181B] border-2 border-[#27272A] hover:border-[#39FF14]/60 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)]'
      }`}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border-2 whitespace-nowrap ${
            tier.highlighted
              ? 'bg-[#39FF14] text-[#09090B] border-[#39FF14]'
              : 'bg-[#27272A] text-[#94A3B8] border-[#09090B]'
          }`}
        >
          {tier.highlighted && <Sparkles className="w-3 h-3 shrink-0" />}
          {tier.tag}
        </div>
      </div>

      <div className="pt-4">
        <h3
          className={`text-xs font-black uppercase tracking-[0.2em] mb-3 ${
            tier.highlighted ? 'text-[#39FF14]' : 'text-[#94A3B8]'
          }`}
        >
          {tier.name}
        </h3>

        <div
          className={`text-2xl font-black uppercase tracking-tight mb-4 ${
            tier.highlighted ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]'
          }`}
        >
          {tier.years} jaar
        </div>

        <div className="mb-4">
          <div
            className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 ${
              tier.highlighted ? 'text-[#39FF14]' : 'text-[#F8FAFC]'
            }`}
          >
            {wholesalePrice}
          </div>
          <div
            className={`text-xs font-bold tracking-wide ${
              tier.highlighted ? 'text-[#94A3B8]' : 'text-[#94A3B8]'
            }`}
          >
            {tier.credits} credits in totaal
          </div>
        </div>

        <div
          className={`text-[11px] font-black uppercase tracking-widest mb-6 inline-block px-3 py-1 rounded-full border whitespace-nowrap ${
            tier.highlighted
              ? 'text-[#39FF14] border-[#39FF14]/40 bg-[#39FF14]/10'
              : 'text-[#94A3B8] border-[#27272A] bg-[#09090B]'
          }`}
        >
          {perYearPrice} per credit
        </div>

        <div
          className={`rounded-2xl p-4 mb-6 ${
            tier.highlighted
              ? 'bg-[#09090B] border border-[#39FF14]/30'
              : 'bg-[#09090B] border border-[#27272A]'
          }`}
        >
          <div
            className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
              tier.highlighted ? 'text-[#39FF14]/80' : 'text-[#94A3B8]'
            }`}
          >
            Jouw verkoopprijs
          </div>
          <div
            className={`text-xs font-bold mb-1 ${
              tier.highlighted ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]'
            }`}
          >
            1 credit = 1 jaar abonnement voor een klant
          </div>
          <div
            className={`text-base font-black uppercase mt-2 ${
              tier.highlighted ? 'text-[#39FF14]' : 'text-[#39FF14]'
            }`}
          >
            Je bepaalt zelf je prijs
          </div>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-2.5 text-xs font-bold ${
                tier.highlighted ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  tier.highlighted ? 'text-[#39FF14]' : 'text-[#39FF14]'
                }`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={orderUrl}
          target={WHATSAPP_LINK_TARGET}
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 whitespace-nowrap cursor-pointer ${
            tier.highlighted
              ? 'bg-[#FFD700] text-[#09090B] hover:bg-[#E6C200] shadow-2xl'
              : 'bg-[#27272A] text-[#F8FAFC] hover:bg-[#39FF14] hover:text-[#09090B] shadow-lg'
          }`}
        >
          <span>Kies dit pakket</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}

// ===========================================================================
// FAQ ITEM
// ===========================================================================
function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
        isOpen
          ? 'border-[#39FF14] shadow-[0_20px_50px_rgba(57,255,20,0.15)]'
          : 'border-[#27272A] hover:border-[#39FF14]/60'
      } bg-[#18181B]`}
    >
      {/* Accessible accordion with an unchanged layout: the heading contains a
          real button for the question; its ::after overlay stretches over the
          whole card so clicking anywhere still toggles. The answer is no longer
          inside the button (it used to become part of the button's name). */}
      <div className="w-full text-left p-6 md:p-7 flex items-start gap-5">
        <div
          aria-hidden="true"
          className="shrink-0 w-14 h-14 rounded-2xl bg-[#27272A] flex items-center justify-center text-[#39FF14] font-black text-lg shadow-lg"
        >
          {num}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-[#F8FAFC] text-base md:text-lg uppercase tracking-tight leading-snug mb-1">
            <button
              type="button"
              id={`reseller-faq-q-${index}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls={`reseller-faq-a-${index}`}
              className="text-left uppercase cursor-pointer after:absolute after:inset-0"
            >
              {faq.q}
            </button>
          </h3>
          {/* Always rendered (hidden while closed) so the answer is present in
              the server HTML for crawlers. Visually identical. */}
          <p
            id={`reseller-faq-a-${index}`}
            hidden={!isOpen}
            className="text-[#94A3B8] font-medium leading-relaxed text-sm md:text-base mt-3 pl-4 border-l-4 border-[#39FF14]"
          >
            <FaqText text={faq.a} />
          </p>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`shrink-0 w-5 h-5 text-[#39FF14] transition-transform duration-300 mt-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </div>
  );
}

// ===========================================================================
// MAIN PAGE
// ===========================================================================
export default function ResellerPage() {

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">

      {/* HERO — dark */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#27272A]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#18181B] px-5 py-2.5 rounded-full mb-8 shadow-lg border border-[#39FF14]/40">
              <BadgeDollarSign className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Resellerprogramma
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.05] text-[#F8FAFC] mb-6 max-w-4xl mx-auto">
              WORD <br className="hidden sm:block" />
              <span className="text-[#39FF14]">IPTV RESELLER</span> <br className="hidden sm:block" />
              BIJ {BRAND.toUpperCase()}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-3xl mx-auto leading-relaxed mb-10">
              Koop credits in en activeer daarmee IPTV abonnementen voor je eigen klanten. Pakketten vanaf {formatEUR(RESELLER_PRICES.starter.price)} voor {RESELLER_PRICES.starter.credits} credits; je verkoopprijs bepaal je zelf.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-12">
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:bg-[#E6C200] hover:scale-105 transition-transform whitespace-nowrap border border-[#09090B]/20 cursor-pointer"
              >
                Bekijk de pakketten
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
              <a
                href={whatsappUrl(
                  `Hallo! Ik wil meer weten over reseller worden bij ${BRAND}.`
                )}
                target={WHATSAPP_LINK_TARGET}
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:scale-105 hover:border-[#39FF14] transition-transform whitespace-nowrap border border-[#27272A] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0 text-[#39FF14]" />
                Stel je vraag
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Zap className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                Directe activering
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                Credits verlopen niet
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Headphones className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                Hulp via WhatsApp
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUE CARDS — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
              <TrendingUp className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Waarom resellen
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
              ZO WERKT <span className="text-[#39FF14]">RESELLEN</span>
            </h2>
            <p className="text-base md:text-lg text-[#94A3B8] font-bold leading-relaxed">
              Je koopt credits in tegen een vaste prijs, activeert abonnementen voor je eigen klanten en bepaalt zelf je verkoopprijs.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <FadeInItem
                  key={card.title}
                  className="group bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-7 hover:border-[#39FF14] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/10 group-hover:bg-[#39FF14] flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-7 h-7 text-[#39FF14] group-hover:text-[#09090B] transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                    {card.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PROFIT MATH — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] border-y border-[#27272A]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
              <BarChart3 className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Kosten per credit
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
              WAT KOST <span className="text-[#39FF14]">EEN CREDIT</span>?
            </h2>
            <p className="text-base md:text-lg text-[#94A3B8] font-bold max-w-3xl mx-auto">
              Een rekenvoorbeeld met het Starter-pakket. Eén credit staat gelijk aan één jaar abonnement voor een klant.
            </p>
          </FadeIn>

          <FadeIn className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-3">
                  Starter-pakket
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#39FF14] tracking-tighter mb-2">
                  {formatEUR(RESELLER_PRICES.starter.price)}
                </div>
                <div className="text-xs font-bold text-[#94A3B8]">
                  10 credits (10 jaar)
                </div>
              </div>
              <div className="md:border-x-2 border-[#27272A] md:px-8">
                <div className="text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-3">
                  Inkoop per credit
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tighter mb-2">
                  {formatEURExact(RESELLER_PRICES.starter.price / RESELLER_PRICES.starter.credits)}
                </div>
                <div className="text-xs font-bold text-[#94A3B8]">
                  per jaar abonnement
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-3">
                  Pro-pakket
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#39FF14] tracking-tighter mb-2">
                  {formatEURExact(RESELLER_PRICES.pro.price / RESELLER_PRICES.pro.credits)}
                </div>
                <div className="text-xs font-bold text-[#94A3B8]">
                  per credit bij 30 credits
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t-2 border-[#27272A] mt-6 md:mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-2">
                    Verkoopprijs
                  </div>
                  <div className="text-sm font-bold text-[#94A3B8]">
                    Wat je klanten betalen, bepaal je zelf
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs font-black uppercase tracking-widest text-[#39FF14] mb-1">
                    Jouw keuze
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-[#39FF14] tracking-tighter">
                    Vrij
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="text-[#94A3B8] font-bold text-base md:text-lg leading-relaxed">
              Bij het Growth- en Pro-pakket betaal je minder per credit: <span className="text-[#39FF14] font-black">{formatEURExact(RESELLER_PRICES.growth.price / RESELLER_PRICES.growth.credits)}</span> en <span className="text-[#39FF14] font-black">{formatEURExact(RESELLER_PRICES.pro.price / RESELLER_PRICES.pro.credits)}</span> per credit.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PRICING — DARK */}
      <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <FadeIn className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
            <Package className="w-4 h-4 text-[#39FF14] shrink-0" />
            <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
              Resellerpakketten
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
            KIES JE <span className="text-[#39FF14]">PAKKET</span>
          </h2>
          <p className="text-base md:text-lg text-[#94A3B8] font-bold max-w-3xl mx-auto">
            Elk pakket bevat toegang tot het resellerpanel, directe activering per klant en ondersteuning via WhatsApp. Credits verlopen niet.
          </p>
        </FadeIn>

        {/* Currency switcher (USD/GBP/AUD) removed: all prices are in EUR. */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto mt-8">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-[#94A3B8] text-sm font-bold">
            Meer credits nodig? Stuur ons een bericht via WhatsApp.
          </p>
        </FadeIn>
      </section>

      {/* HOW IT WORKS — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] border-y border-[#27272A]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
              <Rocket className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Zo werkt het
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
              STARTEN IN <span className="text-[#39FF14]">VIER STAPPEN</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <FadeInItem
                  key={step.number}
                  className="relative bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-7 hover:border-[#39FF14] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)] transition-all duration-500"
                >
                  <div className="absolute -top-4 -right-3 w-12 h-12 rounded-2xl bg-[#39FF14] flex items-center justify-center text-[#09090B] font-black text-sm shadow-lg shadow-[#39FF14]/30 border border-[#39FF14]/40">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#39FF14]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                    {step.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PANEL FEATURES — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#39FF14]/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
              <LayoutDashboard className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Het panel
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
              ALLES IN <span className="text-[#39FF14]">ÉÉN DASHBOARD</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {panelFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <FadeInItem
                  key={feature.label}
                  className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#39FF14] transition-colors duration-300 shadow-lg"
                >
                  <Icon className="w-6 h-6 text-[#39FF14] mb-2" />
                  <span className="text-[#F8FAFC] font-black text-[11px] md:text-xs uppercase tracking-wide leading-tight">
                    {feature.label}
                  </span>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] w-full border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-5">
              <MessageCircle className="w-4 h-4 text-[#39FF14] shrink-0" />
              <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Vragen
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5">
              VRAGEN OVER <span className="text-[#39FF14]">RESELLEN</span>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] max-w-5xl mx-auto w-full">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-8 md:p-14 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-5 py-2 rounded-full mb-6 shadow-lg">
                <UserPlus className="w-4 h-4 shrink-0" />
                <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">
                  Klaar om te starten
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-tight mb-5 max-w-3xl mx-auto">
                START ALS RESELLER
              </h2>

              <p className="text-[#94A3B8] font-bold text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Stuur ons een bericht via WhatsApp, kies je pakket en we helpen je met het instellen van je panel.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <a
                  href={whatsappUrl(
                    `Hallo! Ik wil reseller worden bij ${BRAND}. Kunnen jullie me op weg helpen?`
                  )}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-xl whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  Start via WhatsApp
                </a>
                <Link
                  href="/prijzen"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#27272A] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:bg-[#39FF14] hover:text-[#09090B] hover:scale-105 transition-all shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Prijzen voor klanten
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}