'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, useInView } from 'framer-motion';
import { CONSTANTS, FREE_TRIAL_WHATSAPP_URL, whatsappUrl, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { setupFaqs } from '@/lib/page-faqs';
import Link from 'next/link';
import {
  MonitorSmartphone,
  Tv,
  Apple,
  Laptop,
  Sparkles,
  Lock,
  Zap,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  Download,
  KeyRound,
  AlertCircle,
  X,
  ChevronDown,
  Gift,
  Headphones,
  Users,
  ShoppingCart,
  Plug,
  ShieldCheck,
  Globe,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import ShareButtons from '../components/ShareButtons';
import { FaqText } from '@/lib/faq-text';
import { responsiveImageProps } from '@/lib/blog-helpers';

// Official IPTV Smarters website. (The source project linked a different app,
// iboplayer.pro, behind a "Download IPTV Smarters Pro" label.)
const SMARTERS_URL = 'https://www.iptvsmarters.com/';

// ---------------------------------------------------------------------------
// DEVICES
// ---------------------------------------------------------------------------
const devices = [
  { id: 'firestick', name: 'Fire TV Stick / Android TV', icon: MonitorSmartphone, popular: true, steps: 6 },
  { id: 'smarttv', name: 'Smart TV', icon: Tv, popular: false, steps: 6 },
  { id: 'apple', name: 'Apple-apparaten', icon: Apple, popular: false, steps: 6 },
  { id: 'pc', name: 'Pc / Mac', icon: Laptop, popular: false, steps: 6 },
];

// ---------------------------------------------------------------------------
// STEP DATA
// ---------------------------------------------------------------------------
type SetupStepCta =
  | { type: 'internal'; label: string; href: string }
  | { type: 'external'; label: string; href: string }
  | { type: 'whatsapp'; label: string; message: string };

interface SetupStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  chips?: string[];
  methods?: { title: string; subtitle: string; points: string[]; highlighted?: boolean }[];
  stats?: { value: string; label: string }[];
  cta?: SetupStepCta;
  tip?: string;
}

interface SetupDevice {
  title: string;
  icon: LucideIcon;
  steps: SetupStep[];
}

// Shared step builders: the order is identical on every device; only the
// device-specific texts differ.
const choosePlan = (description: string, tip: string): SetupStep => ({
  number: 1,
  title: 'Kies je abonnement',
  description,
  chips: ['3, 6 of 12 maanden', '1, 2 of 3 apparaten', 'Prijzen in euro’s'],
  duration: '1 min',
  icon: ShoppingCart,
  cta: { label: 'Bekijk de prijzen', href: '/prijzen', type: 'internal' },
  tip,
});

const contactSupport = (description: string, message: string, tip: string): SetupStep => ({
  number: 2,
  title: 'Stuur ons een bericht via WhatsApp',
  description,
  chips: ['Creditcard', 'PayPal', 'Crypto'],
  duration: '2-3 min',
  icon: MessageCircle,
  cta: { label: 'Chat via WhatsApp', type: 'whatsapp', message },
  tip,
});

const setupMethod = (description: string, tip: string): SetupStep => ({
  number: 4,
  title: 'Kies je installatiemethode',
  description,
  methods: [
    {
      title: 'Automatisch door ons',
      subtitle: 'Aanbevolen',
      points: ['Stuur ons je Device Key', 'Wij activeren op afstand', 'De zenderlijst laadt vanzelf'],
      highlighted: true,
    },
    {
      title: 'Handmatig',
      subtitle: 'Zelf doen',
      points: ['Je ontvangt M3U- of Xtream Codes-gegevens', 'Je vult ze zelf in de app in', 'De zenders worden geladen'],
      highlighted: false,
    },
  ],
  duration: '2 min',
  icon: KeyRound,
  tip,
});

const loadContent = (description: string, tip: string): SetupStep => ({
  number: 5,
  title: 'Inhoud laden (1 à 2 minuten)',
  description,
  chips: ['1 à 2 min', 'Tv-gids laadt automatisch', 'Favorieten'],
  duration: '1-2 min',
  icon: Plug,
  tip,
});

const startWatching = (description: string, tip: string): SetupStep => ({
  number: 6,
  title: 'Klaar: kijken maar!',
  description,
  stats: [
    { value: 'Live tv', label: 'Zenders' },
    { value: 'On demand', label: 'Films en series' },
    { value: 'Tot 4K', label: 'Beeldkwaliteit' },
    { value: 'WhatsApp', label: 'Hulp' },
  ],
  duration: 'Klaar!',
  icon: PlayCircle,
  tip,
});

const stepData = {
  firestick: {
    title: 'Installatie op Fire TV Stick en Android TV',
    icon: MonitorSmartphone,
    steps: [
      choosePlan(
        'Kies het abonnement dat bij je huishouden past: 3, 6 of 12 maanden voor 1, 2 of 3 apparaten tegelijk.',
        'Wil je eerst testen? Vraag dan via WhatsApp de gratis proefperiode van 24 uur aan.'
      ),
      contactSupport(
        'Laat ons via WhatsApp weten welk abonnement je kiest en voor hoeveel apparaten. Je ontvangt de betaalinstructies in de chat.',
        'Hallo! Ik wil een abonnement afsluiten en hulp bij de installatie op mijn Fire TV Stick.',
        'Houd je apparaat bij de hand voordat je ons een bericht stuurt, dan kunnen we je meteen verder helpen.'
      ),
      {
        number: 3,
        title: 'Installeer IPTV Smarters Pro',
        description:
          'IPTV Smarters Pro is een veelgebruikte IPTV-app voor Fire TV en Android TV, met tv-gids (EPG) en ondersteuning voor 4K.',
        chips: ['Tv-gids (EPG)', '4K', 'Snel zappen'],
        duration: '2 min',
        icon: Download,
        cta: { label: 'Naar IPTV Smarters', type: 'external', href: SMARTERS_URL },
        tip: 'Staat de app niet in de Amazon Appstore? Zet dan “Apps van onbekende bronnen” aan via Instellingen → Mijn Fire TV → Opties voor ontwikkelaars en installeer de app met de Downloader-app.',
      },
      setupMethod(
        'Er zijn twee manieren om je abonnement aan IPTV Smarters Pro te koppelen. Kies wat voor jou het makkelijkst is.',
        'Twijfel je? Kies dan voor automatisch: wij regelen de technische kant en jij hoeft niets in te typen.'
      ),
      loadContent(
        'Na de activering laadt de app je zenders, films, series en de tv-gids. Laat de app open tijdens deze eerste keer laden.',
        'Duurt het langer dan 3 minuten? Controleer of je Fire TV Stick minimaal 1 GB vrije opslag heeft en een stabiele wifi-verbinding.'
      ),
      startWatching(
        'Je bent klaar om te kijken: live tv, films en series in de app op je Fire TV Stick of Android TV.',
        'Zet je favoriete zenders bij je favorieten, dan zap je sneller.'
      ),
    ],
  },
  smarttv: {
    title: 'Installatie op een Smart TV',
    icon: Tv,
    steps: [
      choosePlan(
        'Kies 3, 6 of 12 maanden voor 1, 2 of 3 apparaten tegelijk. Handig als je in meerdere kamers wilt kijken.',
        'Met een abonnement voor 2 of 3 apparaten kunnen gezinsleden tegelijk iets anders kijken.'
      ),
      contactSupport(
        'Stuur ons een bericht via WhatsApp en vertel welk merk tv je hebt (bijvoorbeeld Samsung of LG). Je ontvangt de betaalinstructies en uitleg voor jouw tv.',
        'Hallo! Ik wil IPTV installeren op mijn Smart TV.',
        'Niet elke app staat in de app store van elke tv. Bij oudere modellen is een Fire TV Stick of Android-box vaak de makkelijkste oplossing.'
      ),
      {
        number: 3,
        title: 'Installeer een IPTV-app',
        description:
          'Op Samsung (Tizen), LG (webOS), Android TV en Google TV installeer je een IPTV-app rechtstreeks uit de app store van je tv. Een extra kastje is dan niet nodig.',
        chips: ['Samsung Tizen', 'LG webOS', 'Android TV', 'Google TV'],
        duration: '2 min',
        icon: Download,
        cta: { label: 'Naar IPTV Smarters', type: 'external', href: SMARTERS_URL },
        tip: 'Zoek in de app store van je tv op “IPTV”. Vind je geen geschikte app, stuur ons dan een bericht; we zoeken met je mee.',
      },
      setupMethod(
        'Koppel je abonnement automatisch via ons team of vul zelf je M3U- of Xtream Codes-gegevens in.',
        'Automatische installatie werkt op elke tv met een ondersteunde app: stuur ons de Device Key en wij doen de rest.'
      ),
      loadContent(
        'De app laadt je zenders, films, series en de tv-gids automatisch.',
        'Sluit de app niet tijdens de eerste keer laden.'
      ),
      startWatching(
        'Je Smart TV is klaar. Kijk live tv, films en series rechtstreeks op je tv.',
        'Voor het beste beeld sluit je je tv aan met een netwerkkabel of gebruik je 5 GHz-wifi.'
      ),
    ],
  },
  apple: {
    title: 'Installatie op Apple-apparaten',
    icon: Apple,
    steps: [
      choosePlan(
        'Kies 3, 6 of 12 maanden voor 1, 2 of 3 apparaten tegelijk. Werkt op iPhone, iPad, Apple TV en Mac.',
        'Kijk je op je iPhone én je Apple TV tegelijk? Kies dan een abonnement voor 2 apparaten.'
      ),
      contactSupport(
        'Via WhatsApp bevestig je je abonnement, ontvang je de betaalinstructies en krijg je je inloggegevens in de chat.',
        'Hallo! Ik heb hulp nodig bij de installatie op mijn Apple-apparaat.',
        'Vermeld welke Apple-apparaten je gebruikt, dan helpen we je gerichter.'
      ),
      {
        number: 3,
        title: 'Installeer een IPTV-app',
        description: 'Installeer een IPTV-app uit de App Store op je iPhone, iPad of Apple TV.',
        chips: ['iOS', 'iPadOS', 'tvOS'],
        duration: '2 min',
        icon: Download,
        cta: { label: 'Naar IPTV Smarters', type: 'external', href: SMARTERS_URL },
        tip: 'Op de Apple TV typ je inloggegevens sneller met de Apple TV Remote-functie op je iPhone dan met de afstandsbediening.',
      },
      setupMethod(
        'Laat ons team je abonnement automatisch activeren of vul zelf je M3U- of Xtream Codes-gegevens in.',
        'Automatisch activeren is meestal het snelst.'
      ),
      loadContent(
        'Je zenders, films, series en tv-gids laden automatisch in de app.',
        'Laat de app open tijdens de eerste keer laden.'
      ),
      startWatching(
        'Je Apple-apparaat is klaar om te kijken.',
        'Kijk je liever op een groter scherm? Veel IPTV-apps ondersteunen AirPlay naar je Apple TV.'
      ),
    ],
  },
  pc: {
    title: 'Installatie op pc en Mac',
    icon: Laptop,
    steps: [
      choosePlan(
        'Kies 3, 6 of 12 maanden. Met een abonnement voor meerdere apparaten kijk je op je computer en tegelijk op de tv in een andere kamer.',
        'Kijk je op je computer en op je tv? Kies dan een abonnement voor 2 apparaten.'
      ),
      contactSupport(
        'Stuur ons een bericht via WhatsApp. Je ontvangt de betaalinstructies en daarna je inloggegevens. Vraag om de M3U-link als je met VLC wilt kijken.',
        'Hallo! Ik wil IPTV installeren op mijn pc of Mac.',
        'Met de M3U-link kun je direct in VLC kijken, nog voordat je een andere IPTV-app installeert.'
      ),
      {
        number: 3,
        title: 'Installeer een IPTV-app of VLC',
        description: 'Op Windows 10/11 en macOS gebruik je een IPTV-app of de gratis mediaspeler VLC.',
        chips: ['Windows 10/11', 'macOS', 'VLC'],
        duration: '2 min',
        icon: Download,
        cta: { label: 'Naar IPTV Smarters', type: 'external', href: SMARTERS_URL },
        tip: 'In VLC open je je zenderlijst via Media → Netwerkstream openen en plak je de M3U-link.',
      },
      setupMethod(
        'Laat ons team je abonnement activeren of vul zelf de M3U- of Xtream Codes-gegevens in.',
        'In VLC toon je de afspeellijst met Ctrl+L (Windows) of Cmd+L (Mac).'
      ),
      loadContent(
        'Je zenderlijst, films, series en tv-gids worden automatisch geladen.',
        'Houd de app open tijdens het eerste keer laden; dat gaat het snelst.'
      ),
      startWatching(
        'Je pc of Mac is klaar om te kijken.',
        'Zet hardwareversnelling aan in de instellingen van je app voor soepeler 4K-beeld.'
      ),
    ],
  },
} satisfies Record<string, SetupDevice>;

// ---------------------------------------------------------------------------
// LONG-FORM Q&A
// ---------------------------------------------------------------------------
const longFormFaqs = [
  {
    q: 'Welke apparaten werken het beste?',
    a: 'Een recente Fire TV Stick (bijvoorbeeld de 4K-versie), een Samsung- of LG Smart TV met een geschikte IPTV-app, een Apple TV of een Android TV-box geven doorgaans het beste resultaat. Oudere apparaten werken vaak ook, maar halen niet altijd 4K. Test je eigen apparaat tijdens de gratis proefperiode.',
  },
  {
    q: 'Hoe werkt activering op afstand?',
    a: 'Na je bestelling vragen we via WhatsApp om de Device Key of het MAC-adres dat je app op het startscherm toont. Wij koppelen dat aan je abonnement, waarna je zenderlijst laadt zodra je de app opnieuw opent. Liever zelf doen? Dan ontvang je de M3U-link of Xtream Codes-gegevens om zelf in te vullen.',
  },
  {
    q: 'Mijn Smart TV is te oud voor een IPTV-app. Wat nu?',
    a: 'Sluit dan een Fire TV Stick, Android TV-box of Apple TV aan op een HDMI-poort van je tv. Daarmee maak je ook van een oudere tv een tv waarop je IPTV kunt kijken. Twijfel je welk apparaat je nodig hebt, stuur ons dan een bericht.',
  },
  {
    q: 'Kan ik later van apparaat wisselen?',
    a: 'Ja. Stap je over op een ander apparaat, neem dan contact met ons op via WhatsApp, dan zetten we je abonnement over. Wil je op meer apparaten tegelijk kijken, kies dan een abonnement voor 2 of 3 apparaten.',
  },
];

// ---------------------------------------------------------------------------
// STEP ITEM
// ---------------------------------------------------------------------------
function StepItem({ step, index, isLast }: { step: SetupStep; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative">
      <div className="flex gap-4 md:gap-6">
        <div className="flex flex-col items-center shrink-0">
          <m.div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
              isInView
                ? 'bg-[#39FF14] shadow-[0_0_25px_rgba(57,255,20,0.45)] scale-110'
                : 'bg-[#39FF14]/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, type: 'spring', delay: index * 0.08 }}
          >
            <span className={`text-xl md:text-2xl font-black transition-all duration-300 ${isInView ? 'text-[#09090B]' : 'text-[#39FF14]'}`}>
              {step.number}
            </span>
          </m.div>
          {!isLast && (
            <m.div
              className="relative w-0.5 flex-1 min-h-[60px] my-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: index * 0.12 + 0.3 }}
            >
              <m.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#39FF14] to-[#008000]"
                initial={{ height: 0 }}
                animate={{ height: isInView ? '100%' : 0 }}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
              />
            </m.div>
          )}
        </div>

        <m.div
          className="flex-1 pb-10 md:pb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <div className={`bg-[#18181B] border-2 rounded-2xl p-5 md:p-6 transition-all duration-500 ${isInView ? 'border-[#39FF14] shadow-[0_10px_35px_rgba(57,255,20,0.15)]' : 'border-transparent'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#39FF14]/15">
                  <Icon className="w-5 h-5 text-[#39FF14]" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#F8FAFC]">
                  {step.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#09090B] border border-[#27272A]">
                <Clock className="w-3 h-3 text-[#39FF14]" />
                <span className="text-[#94A3B8] text-[10px] md:text-xs font-bold">{step.duration}</span>
              </div>
            </div>

            <p className="text-[#94A3B8] font-medium leading-relaxed text-sm md:text-base mb-4">
              {step.description}
            </p>

            {step.chips && (
              <div className="flex flex-wrap gap-2 mb-4">
                {step.chips.map((chip: string) => (
                  <span key={chip} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-[10px] md:text-xs font-black uppercase tracking-wider">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {step.methods && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {step.methods.map((m) => (
                  <div key={m.title} className={`rounded-xl p-4 border-2 transition-all ${m.highlighted ? 'bg-[#39FF14]/5 border-[#39FF14]' : 'bg-[#09090B] border-[#27272A]'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${m.highlighted ? 'bg-[#39FF14] text-[#09090B]' : 'bg-[#27272A] text-[#94A3B8]'}`}>
                        {m.subtitle}
                      </span>
                    </div>
                    <h4 className="text-sm font-black uppercase text-[#F8FAFC] mb-2">{m.title}</h4>
                    <ul className="space-y-1">
                      {m.points.map((p: string) => (
                        <li key={p} className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-[#94A3B8]">
                          <CheckCircle2 className="w-3 h-3 text-[#39FF14] shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {step.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {step.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#09090B] text-center py-3 px-2 border border-[#27272A]">
                    <div className="text-base md:text-lg font-black text-[#39FF14] leading-none">{s.value}</div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#94A3B8] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {step.cta && (
              <div className="mb-4">
                {step.cta.type === 'internal' && (
                  <Link href={step.cta.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD700] text-[#09090B] text-xs font-black uppercase tracking-widest hover:bg-[#E6C200] transition-all hover:scale-105 shadow-md border border-[#09090B]/20 cursor-pointer">
                    {step.cta.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {step.cta.type === 'external' && (
                  <a href={step.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181B] border border-[#27272A] text-[#F8FAFC] text-xs font-black uppercase tracking-widest hover:border-[#39FF14] transition-all hover:scale-105 shadow-md cursor-pointer">
                    <Download className="w-4 h-4 text-[#39FF14]" /> {step.cta.label}
                  </a>
                )}
                {step.cta.type === 'whatsapp' && (
                  <a href={whatsappUrl(step.cta.message)} target={WHATSAPP_LINK_TARGET} rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD700] text-[#09090B] text-xs font-black uppercase tracking-widest hover:bg-[#E6C200] transition-all hover:scale-105 shadow-md cursor-pointer">
                    <MessageCircle className="w-4 h-4" /> {step.cta.label}
                  </a>
                )}
              </div>
            )}

            {isInView && step.tip && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] flex gap-2.5"
              >
                <div className="w-6 h-6 rounded-md bg-[#39FF14]/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-[#39FF14] font-black text-[10px] uppercase tracking-wider">Tip</p>
                  <p className="text-[#94A3B8] text-xs font-medium mt-0.5">{step.tip}</p>
                </div>
              </m.div>
            )}
          </div>
        </m.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function SetupPage() {
  const [activeDevice, setActiveDevice] = useState('firestick');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [openFaqIndex, setOpenIndex] = useState<number | null>(0);
  const currentData = stepData[activeDevice as keyof typeof stepData];
  const CurrentIcon = currentData.icon;

  // The iframe is only mounted while the modal is open, so its JSX `src`
  // starts playback on open and unmounting it on close stops playback.
  const closeVideo = () => setIsVideoOpen(false);
  const openVideo = () => setIsVideoOpen(true);

  // Video dialog keyboard support: focus the close button on open, close on
  // Escape, and return focus to the button that opened it.
  // The dialog is rendered directly in <body> (portal) and everything else in
  // <body> is made `inert` while it is open, like a native modal dialog: Tab
  // and Shift+Tab can no longer reach the page behind it (also when focus
  // leaves the cross-origin YouTube iframe, whose key events this page cannot
  // see), and screen readers only expose the dialog.
  const videoTriggerRef = useRef<HTMLButtonElement>(null);
  const videoCloseRef = useRef<HTMLButtonElement>(null);
  const videoDialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isVideoOpen) return;
    const trigger = videoTriggerRef.current;
    const dialog = videoDialogRef.current;
    const background = Array.from(document.body.children).filter(
      (el) => el !== dialog && !el.hasAttribute('inert')
    );
    background.forEach((el) => el.setAttribute('inert', ''));
    videoCloseRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      background.forEach((el) => el.removeAttribute('inert'));
      trigger?.focus();
    };
  }, [isVideoOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B]">

      {/* ==========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            {...responsiveImageProps('/img/bg-1.webp', [640, 828, 1080, 1920])}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-[#09090B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/0" />
        </div>

        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/10 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 pt-24 text-center relative z-10 flex flex-col items-center justify-center">
          {/* Phase 5: hero content renders without an entrance animation so it is visible on first paint (LCP); below-the-fold sections keep their animations. */}
          <div className="flex flex-col items-center justify-center text-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                  Installatiehandleiding
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none text-center">
                IPTV INSTALLEREN <br />
                <span className="text-[#39FF14]">STAP VOOR STAP</span>
              </h1>
            </div>

            <div>
              <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed px-2 text-center mb-6">
                Installeer <strong className="text-[#F8FAFC]">IPTV Smarters Pro</strong> en laat ons team via WhatsApp de rest regelen. Zo installeer je je IPTV abonnement op een Fire TV Stick, Smart TV, Apple-apparaat of computer.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[#94A3B8] text-xs md:text-sm font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#39FF14]" /> Geen technische kennis nodig</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#39FF14]" /> Ongeveer 10 minuten</span>
                <span className="flex items-center gap-2"><Headphones className="w-4 h-4 text-[#39FF14]" /> Hulp via WhatsApp</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#39FF14]" /> 24 uur gratis testen</span>
              </div>
            </div>

            <div className="mt-8 relative flex justify-center">
              <button
                ref={videoTriggerRef}
                onClick={openVideo}
                className="inline-flex items-center justify-center p-2 rounded-full bg-[#18181B] border border-[#27272A] hover:border-[#39FF14]/60 transition-all duration-300 relative z-10 shadow-inner group cursor-pointer"
                aria-label="Bekijk de videohandleiding"
              >
                <div className="flex items-center gap-4 bg-[#09090B] px-6 sm:px-8 py-4 sm:py-5 rounded-full border border-[#27272A] hover:bg-[#27272A] transition-colors">
                  <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#39FF14] shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[#F8FAFC] font-black uppercase tracking-widest text-xs sm:text-sm md:text-base">
                      Videohandleiding
                    </p>
                    <p className="text-[#94A3B8] text-[10px] sm:text-xs font-bold uppercase tracking-wide mt-0.5">
                      Stap voor stap in beeld
                    </p>
                  </div>
                </div>
              </button>
              <div className="absolute inset-0 rounded-full bg-[#39FF14]/15 animate-pulse blur-md scale-110 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          CTA BANNER — Free Trial
      ========================================================== */}
      <section className="w-full bg-gradient-to-r from-[#008000] via-[#09090B] to-[#008000] py-10 px-4 sm:px-6 border-y-4 border-[#39FF14]/30 shadow-[0_0_50px_rgba(57,255,20,0.15)] relative z-20 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-5">
          <div className="relative inline-block">
            <div className="bg-[#39FF14] text-[#09090B] font-black text-xs px-5 py-2 rounded-full uppercase tracking-widest shadow-md animate-bounce">
              GRATIS 24 UUR TESTEN
            </div>
            <div className="absolute inset-0 rounded-full bg-[#39FF14]/30 animate-ping opacity-75 pointer-events-none" />
          </div>
          {/* Promotional call-out, not a section heading (it sat as an h4 directly
              under the h1, breaking the outline). Styling is entirely class-based. */}
          <p className="text-[#F8FAFC] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-md max-w-2xl">
            PROBEER HET EERST GRATIS MET IPTV SMARTERS PRO!
          </p>
          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg font-bold max-w-xl leading-relaxed">
            Live tv, films en series op je eigen apparaat. Vraag de proefperiode aan via WhatsApp.
          </p>
          <div className="w-full sm:w-auto mt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={FREE_TRIAL_WHATSAPP_URL}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFD700] text-[#09090B] hover:bg-[#E6C200] transition-all duration-300 px-8 sm:px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" /> <span>Gratis testen</span>
            </a>
            <Link
              href="/prijzen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#18181B] text-[#F8FAFC] hover:border-[#39FF14] transition-all duration-300 px-8 sm:px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl border-2 border-[#27272A] cursor-pointer"
            >
              Bekijk de prijzen <ArrowRight className="w-5 h-5 text-[#39FF14]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================
          DEVICE SELECTION
      ========================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B]">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter leading-none">
            Kies je <span className="text-[#39FF14]">apparaat</span>
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-bold max-w-2xl mx-auto mt-4">
            Selecteer hieronder je apparaat voor de stappen die voor jou gelden.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = activeDevice === device.id;
            return (
              <button
                key={device.id}
                onClick={() => setActiveDevice(device.id)}
                aria-pressed={isActive}
                className={`relative p-4 sm:p-6 rounded-3xl text-center transition-all duration-300 cursor-pointer group ${
                  isActive
                    ? 'bg-[#18181B] text-[#F8FAFC] border-2 border-[#39FF14] shadow-2xl scale-[1.02]'
                    : 'bg-[#18181B] text-[#F8FAFC] border-2 border-[#27272A] hover:border-[#39FF14]/40'
                }`}
              >
                {device.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#39FF14] text-[#09090B] font-black uppercase text-[10px] tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-md border border-[#09090B]">
                    Veel gebruikt
                  </div>
                )}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors ${isActive ? 'bg-[#39FF14] text-[#09090B]' : 'bg-[#09090B] text-[#94A3B8]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
                </div>
                {/* Button labels, not section headings: spans (block) keep the
                    identical layout while staying valid inside a <button>. */}
                <span className="block text-sm sm:text-base md:text-lg font-black uppercase tracking-wide mb-2">{device.name}</span>
                <span className={`block text-[10px] sm:text-xs font-bold ${isActive ? 'text-[#39FF14]' : 'text-[#94A3B8]'}`}>
                  {device.steps} eenvoudige stappen
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ==========================================================
          TIMELINE
      ========================================================== */}
      <section id="stappen" className="scroll-mt-24 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] text-[#F8FAFC] font-black uppercase text-xs tracking-widest mb-4 shadow-md max-w-full border border-[#27272A]">
            <CurrentIcon className="w-4 h-4 text-[#39FF14] shrink-0" />
            <span className="truncate">{currentData.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
            De stappen <span className="text-[#39FF14]">op een rij</span>
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base font-bold uppercase tracking-widest mt-2">
            Volg de stappen, meestal ben je in ongeveer 10 minuten klaar
          </p>
        </div>

        <div className="relative px-2">
          {currentData.steps.map((step, index) => (
            <StepItem key={step.number} step={step} index={index} isLast={index === currentData.steps.length - 1} />
          ))}
        </div>

        {/* Success Card */}
        <m.div
          className="text-center mt-12 p-6 sm:p-8 md:p-10 rounded-3xl bg-[#18181B] border border-[#27272A] shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
            Installatie voltooid!
          </h3>
          <p className="text-[#94A3B8] font-bold text-sm sm:text-base max-w-md mx-auto mb-8">
            Je bent klaar om te kijken met IPTV Smarters Pro. Loop je toch ergens tegenaan, stuur ons dan een bericht via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link href="/" className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 border border-[#09090B]/20 cursor-pointer">
              Naar de homepage
            </Link>
            <Link href="/prijzen" className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 border-2 border-[#27272A] hover:border-[#39FF14] cursor-pointer">
              Bekijk de prijzen
            </Link>
          </div>
        </m.div>
      </section>

      {/* ==========================================================
          WHY SETUP WITH US
      ========================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B]">
        <FadeIn className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
              Installatiehulp
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
            Hulp nodig bij <span className="text-[#39FF14]">de installatie?</span>
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-bold max-w-3xl mx-auto leading-relaxed">
            Je hoeft het niet alleen te doen. Via WhatsApp helpen we je van je eerste bericht tot de eerste zender op je scherm.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Persoonlijke hulp',
              desc: 'Je vraag wordt beantwoord in de chat, zonder ticketsysteem.',
            },
            {
              icon: Zap,
              title: 'Activering door ons',
              desc: 'Stuur ons je Device Key via WhatsApp en wij koppelen je abonnement. Jij installeert alleen de app.',
            },
            {
              icon: Clock,
              title: 'Snel aan de slag',
              desc: 'De meeste installaties zijn in ongeveer 10 minuten klaar: app installeren, gegevens invullen en de zenderlijst laden.',
            },
            {
              icon: PlayCircle,
              title: 'Bekend met de apps',
              desc: 'We kennen de instellingen van veelgebruikte apps zoals IPTV Smarters Pro en helpen je die goed in te stellen.',
            },
            {
              icon: MessageCircle,
              title: 'Gewoon via WhatsApp',
              desc: 'Stel je vraag in de chat en krijg daar antwoord, ook tijdens de installatie.',
            },
            {
              icon: Lock,
              title: 'Betaalmethoden',
              desc: 'Betaal met creditcard (Visa, Mastercard), PayPal of crypto.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeInItem key={idx} className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 md:p-7 hover:border-[#39FF14] hover:shadow-[0_15px_40px_rgba(57,255,20,0.15)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        <FadeIn className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-[#94A3B8] text-sm sm:text-base font-medium leading-relaxed mb-8">
            IPTV installeren hoeft niet ingewikkeld te zijn. Of je nu een Fire TV Stick, Smart TV, Apple-apparaat, Android-box of computer gebruikt: via WhatsApp helpen we je stap voor stap, ook met het koppelen van je abonnement aan IPTV Smarters Pro. Uitgebreide uitleg per apparaat lees je in onze artikelen over IPTV op een{' '}
            <Link href="/blog/iptv-firestick-installeren" className="text-[#39FF14] font-black hover:underline">Fire TV Stick</Link> en op een{' '}
            <Link href="/blog/iptv-smart-tv-installeren" className="text-[#39FF14] font-black hover:underline">Smart TV</Link>.
          </p>
          <a
            href={whatsappUrl('Hallo! Ik wil hulp bij de installatie van mijn IPTV abonnement.')}
            target={WHATSAPP_LINK_TARGET}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.35)] hover:scale-105 transition-transform border border-[#09090B]/20 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" /> Vraag installatiehulp
          </a>
        </FadeIn>
      </section>

      {/* ==========================================================
          SUPPORT GRID
      ========================================================== */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 sm:p-8 text-center shadow-xl group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#39FF14]/20 transition-colors">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-[#39FF14]" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
              Gratis 24 uur testen
            </h3>
            <p className="text-[#94A3B8] text-sm font-medium mb-5">
              Probeer onze dienst 24 uur gratis in IPTV Smarters Pro. Stuur ons een bericht via WhatsApp.
            </p>
            <a
              href={FREE_TRIAL_WHATSAPP_URL}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#39FF14] font-black uppercase text-xs tracking-widest hover:gap-3 transition-all cursor-pointer py-2 -my-2"
            >
              Proefperiode aanvragen <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 sm:p-8 text-center shadow-xl group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#F8FAFC] mb-2 uppercase tracking-wide">
              Installatiehulp via WhatsApp
            </h3>
            <p className="text-[#94A3B8] text-sm font-medium mb-5">
              Via WhatsApp regelen we alles met je: abonnement, betaling, het koppelen van je abonnement aan de app en de installatie.
            </p>
            <a
              href={whatsappUrl('Hallo! Ik heb hulp nodig bij de installatie.')}
              target={WHATSAPP_LINK_TARGET}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-500 font-black uppercase text-xs tracking-widest hover:gap-3 transition-all cursor-pointer py-2 -my-2"
            >
              Chat via WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Share */}
      <div className="w-full flex justify-center items-center mb-10">
        <ShareButtons />
      </div>

      {/* ==========================================================
          FAQ — Short 8 items
      ========================================================== */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B] relative" aria-label="Veelgestelde vragen over installatie">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

        <FadeIn className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
            <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">Vragen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tighter leading-none">
            Vragen over <span className="text-[#39FF14]">installatie</span>
          </h2>
          <p className="text-[#94A3B8] font-bold text-base md:text-lg max-w-2xl mx-auto mt-4">
            Snel antwoord op de meest gestelde vragen over de installatie.
          </p>
        </FadeIn>

        <FadeInStagger className="space-y-4 relative z-10">
          {setupFaqs.map((faq, i) => (
            <FadeInItem key={i}>
              {/* Accessible accordion: heading contains the toggle; the answer is
                  outside the button. Padding split keeps the card identical. */}
              <div
                className={`w-full text-left bg-[#18181B] border-2 ${openFaqIndex === i ? 'border-[#39FF14]' : 'border-[#27272A]'} rounded-2xl hover:border-[#39FF14]/60 transition-all duration-300 group`}
              >
                <h3>
                  <button
                    type="button"
                    id={`setup-faq-q-${i}`}
                    onClick={() => setOpenIndex(openFaqIndex === i ? null : i)}
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`setup-faq-a-${i}`}
                    className={`w-full text-left px-5 sm:px-6 pt-5 sm:pt-6 ${openFaqIndex === i ? 'pb-4' : 'pb-5 sm:pb-6'} flex justify-between items-center gap-4 transition-all duration-300 cursor-pointer rounded-2xl`}
                  >
                    <span className={`text-base sm:text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${openFaqIndex === i ? 'text-[#39FF14]' : 'text-[#F8FAFC] group-hover:text-[#39FF14]'} flex items-start sm:items-center gap-3 text-left`}>
                      <span className={`${openFaqIndex === i ? 'text-[#39FF14]' : 'text-[#94A3B8]'} font-black text-xl sm:text-2xl shrink-0`} aria-hidden="true">V.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown aria-hidden="true" className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-[#39FF14]' : 'text-[#94A3B8] group-hover:text-[#39FF14]/50'}`} />
                  </button>
                </h3>
                <div
                  id={`setup-faq-a-${i}`}
                  aria-hidden={openFaqIndex !== i}
                  className={`overflow-hidden transition-all duration-300 px-5 sm:px-6 ${openFaqIndex === i ? 'max-h-96 opacity-100 pb-5 sm:pb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[#94A3B8] font-medium leading-relaxed text-sm sm:text-base pl-9 sm:pl-12 border-l-4 border-[#39FF14] ml-1 sm:ml-2 py-2">
                    <FaqText text={faq.a} />
                  </p>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ==========================================================
          LONG-FORM Q&A
      ========================================================== */}
      <section className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090B] relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-[#39FF14]/5 blur-[130px] rounded-full pointer-events-none" />

        <FadeIn className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-4 py-1.5 rounded-full mb-6">
            <Globe className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest">
              Uitgebreide uitleg
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
            Installatie <span className="text-[#39FF14]">uitgelegd</span>
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-bold max-w-3xl mx-auto leading-relaxed">
            Uitgebreidere antwoorden op vragen die we vaak krijgen over de installatie van je IPTV abonnement en IPTV Smarters Pro.
          </p>
        </FadeIn>

        <FadeInStagger className="space-y-6 relative z-10">
          {longFormFaqs.map((item, idx) => (
            <FadeInItem key={idx} className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 md:p-8 hover:border-[#39FF14]/60 transition-colors">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-start gap-3">
                <span className="text-[#39FF14] text-2xl shrink-0" aria-hidden="true">V.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-[#94A3B8] font-medium leading-relaxed text-sm sm:text-base pl-6 sm:pl-8 border-l-4 border-[#39FF14]">
                <FaqText text={item.a} />
              </p>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-12 text-center">
          <a
            href={whatsappUrl('Hallo! Ik heb een vraag over de installatie.')}
            target={WHATSAPP_LINK_TARGET}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#18181B] text-[#F8FAFC] font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(57,255,20,0.15)] border-2 border-[#27272A] hover:border-[#39FF14] cursor-pointer"
          >
            <Phone className="w-5 h-5 text-[#39FF14]" /> Stel je vraag via WhatsApp
          </a>
        </FadeIn>
      </section>

      {/* ==========================================================
          VIDEO MODAL
      ========================================================== */}
      {isVideoOpen && createPortal(
        <div
          ref={videoDialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeVideo(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Videohandleiding installatie"
        >
          <div className="relative w-full max-w-4xl">
            <button ref={videoCloseRef} onClick={closeVideo} className="absolute -top-12 right-0 text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer flex items-center gap-2 text-xs sm:text-sm font-bold z-10 uppercase tracking-widest">
              <X className="w-5 h-5 shrink-0" /> Video sluiten
            </button>
            <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#39FF14] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                // Privacy-enhanced embed: same player, but YouTube sets no
                // cookies when the video is opened (youtube.com sets five).
                src="https://www.youtube-nocookie.com/embed/9pZOoS-1NHg?autoplay=1&rel=0&modestbranding=1"
                title="Videohandleiding: IPTV installeren"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}