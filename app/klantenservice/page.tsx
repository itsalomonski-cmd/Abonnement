'use client';

import { useState, useEffect } from 'react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import { CONSTANTS, WHATSAPP_AVAILABLE, whatsappUrl, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { handOffToWhatsApp } from '@/lib/whatsapp-handoff';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Clock,
  Check,
  X,
  Headphones,
  Zap,
  ShieldCheck,
  Users,
  LifeBuoy,
} from 'lucide-react';
import Link from 'next/link';
import { FaqText, faqPlainText } from '@/lib/faq-text';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/klantenservice`;

// ---------------------------------------------------------------------------
// TOAST
// ---------------------------------------------------------------------------
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-4 z-50 max-w-md w-full animate-slide-in">
      <div
        className={`rounded-2xl p-6 shadow-2xl border-2 backdrop-blur-xl ${
          type === 'success' ? 'bg-[#18181B] border-green-500' : 'bg-[#18181B] border-red-500'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {type === 'success' ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[#F8FAFC] font-black uppercase text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Melding sluiten"
            className="flex-shrink-0 text-[#94A3B8] hover:text-[#39FF14] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SUCCESS POPUP
// ---------------------------------------------------------------------------
const SuccessPopup = ({ onClose, copied, text }: { onClose: () => void; copied: boolean; text: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4">
      <div className="bg-[#18181B] border-2 border-[#39FF14] rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl text-center animate-scale-up">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight">
          WhatsApp is geopend
        </h3>

        <p className="text-[#94A3B8] font-bold text-sm leading-relaxed mb-6">
          {copied
            ? 'Je bericht is naar je klembord gekopieerd. Plak het in de WhatsApp-chat en verstuur het daar. Je bericht is pas verstuurd als je het in WhatsApp verzendt.'
            : 'Kopieer je bericht hieronder, plak het in de WhatsApp-chat en verstuur het daar. Je bericht is pas verstuurd als je het in WhatsApp verzendt.'}
        </p>

        {!copied && (
          <textarea
            readOnly
            value={text}
            rows={5}
            aria-label="Je bericht"
            className="w-full mb-6 px-4 py-3 bg-[#09090B] border-2 border-[#27272A] rounded-xl text-[#F8FAFC] text-sm font-bold resize-none outline-none"
          />
        )}

        <div className="bg-[#09090B] rounded-2xl border border-[#27272A] p-5 mb-6 text-left">
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black mb-3">
            Wat gebeurt er nu?
          </p>
          <ul className="space-y-2 text-sm text-[#F8FAFC] font-bold uppercase tracking-wide">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#39FF14] shrink-0" />
              Je plakt en verstuurt het bericht in WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#39FF14] shrink-0" />
              Wij bekijken je vraag
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#39FF14] shrink-0" />
              Je krijgt antwoord via WhatsApp
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] transition-transform hover:scale-105 shadow-md cursor-pointer border border-[#09090B]/20"
        >
          Begrepen
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
// Visible FAQ list; also the single source for this page's FAQPage JSON-LD.
const SUPPORT_FAQS = [
  {
    q: 'Hoe neem ik het snelst contact op?',
    a: 'Stuur ons direct een bericht via WhatsApp. Daar beantwoorden we je vragen over installatie, abonnementen en betalen.',
  },
  {
    q: 'Helpen jullie bij de installatie?',
    a: `Ja. We helpen je stap voor stap met het installeren van je abonnement op je Smart TV, Fire TV Stick, Android-apparaat of Apple TV, handmatig of via activering op afstand.`,
  },
  {
    q: 'Kan ik eerst gratis testen?',
    a: 'Ja. Vraag via WhatsApp een [gratis proefperiode van 24 uur](/blog/iptv-gratis-proefperiode) aan en probeer het eerst op je eigen apparaat.',
  },
  {
    q: 'Hoe snel kan ik kijken?',
    a: 'Na je betaling helpen we je via WhatsApp met de installatie. Meestal ben je in ongeveer 10 minuten klaar.',
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [successPopup, setSuccessPopup] = useState<{ copied: boolean; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // The WhatsApp tab must be opened synchronously inside the submit event:
  // browsers block window.open() calls made after an await (no user gesture).
  // Success is only reported when the tab actually opened; otherwise the form
  // keeps the user's input so nothing typed is lost.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!WHATSAPP_AVAILABLE) {
      setToast({
        message: 'Contact via WhatsApp is nog niet beschikbaar. Je bericht is niet verstuurd.',
        type: 'error',
      });
      return;
    }

    // Personal data (name, e-mail, question) is never put in a URL. The text is
    // copied to the clipboard and the plain WhatsApp chat is opened; the
    // visitor pastes and sends it there (lib/whatsapp-handoff.ts).
    const text = [
      `Hallo ${BRAND},`,
      '',
      `Naam: ${formData.name}`,
      ...(formData.email ? [`E-mail: ${formData.email}`] : []),
      `Onderwerp: ${formData.subject}`,
      `Bericht: ${formData.message}`,
    ].join('\n');

    const { opened, copied } = handOffToWhatsApp(text);

    if (!opened) {
      setToast({ message: 'WhatsApp kon niet worden geopend. Sta pop-ups toe en probeer het opnieuw.', type: 'error' });
      return;
    }

    copied.then((ok) => {
      setSuccessPopup({ copied: ok, text });
      setFormData({ name: '', email: '', subject: '', message: '' });
    });
  };

  const startWhatsAppChat = () => {
    if (!WHATSAPP_AVAILABLE) {
      setToast({ message: 'Contact via WhatsApp is nog niet beschikbaar.', type: 'error' });
      return;
    }
    window.open(
      whatsappUrl(`Hallo ${BRAND}, ik heb een vraag over mijn IPTV abonnement.`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  // ----------------- JSON-LD -----------------
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${PAGE_URL}#contact`,
        url: PAGE_URL,
        name: `Klantenservice | ${BRAND}`,
        description: `Neem contact op met ${BRAND} via WhatsApp voor vragen over je IPTV abonnement, installatie en betalen.`,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Klantenservice', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        // Built from the same list the page renders (SUPPORT_FAQS).
        mainEntity: SUPPORT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faqPlainText(faq.a) },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#09090B] pt-32 pb-16 text-[#F8FAFC]">
      <script
        type="application/ld+json"
        id="support-page-schema"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {successPopup && (
        <SuccessPopup
          copied={successPopup.copied}
          text={successPopup.text}
          onClose={() => setSuccessPopup(null)}
        />
      )}

      {/* HERO */}
      <section className="relative px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(57,255,20,0.05),_transparent_50%)] pointer-events-none" />
        
        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
              <Mail className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
                Klantenservice
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#F8FAFC] tracking-tighter uppercase mb-6 leading-none">
              Contact met <span className="text-[#39FF14]">{BRAND}</span>
            </h1>

            <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed">
              Vragen over je IPTV abonnement, de installatie op je Smart TV of betalen? Stuur ons een bericht via WhatsApp.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-2">
                  Stuur ons een bericht
                </h2>
                <p className="text-[#94A3B8] font-bold text-sm mb-6">
                  Vul het formulier in. Je bericht wordt naar je klembord gekopieerd en WhatsApp wordt geopend; daar plak en verstuur je het zelf. Deze website verstuurt of bewaart je gegevens niet.
                </p>

                {!WHATSAPP_AVAILABLE && (
                  <div role="status" className="flex gap-3 items-start bg-[#09090B] border border-[#FFD700]/40 rounded-xl p-4 mb-6">
                    <AlertCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                    <p className="text-[#F8FAFC] text-sm font-bold leading-relaxed">
                      Contact via WhatsApp is nog niet beschikbaar. Ons WhatsApp-nummer wordt binnenkort op deze pagina vermeld.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-black text-[#F8FAFC] uppercase tracking-wide mb-2"
                    >
                      Naam <span className="text-[#39FF14]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-[#09090B] border-2 border-[#27272A] rounded-xl text-[#F8FAFC] font-bold placeholder-[#94A3B8]/50 focus:border-[#39FF14] transition-colors outline-none"
                        placeholder="bijv. Jan Jansen"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-black text-[#F8FAFC] uppercase tracking-wide mb-2"
                    >
                      E-mailadres <span className="text-[#94A3B8] normal-case font-bold">(optioneel)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#09090B] border-2 border-[#27272A] rounded-xl text-[#F8FAFC] font-bold placeholder-[#94A3B8]/50 focus:border-[#39FF14] transition-colors outline-none"
                        placeholder="naam@voorbeeld.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-black text-[#F8FAFC] uppercase tracking-wide mb-2"
                    >
                      Onderwerp <span className="text-[#39FF14]">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-10 py-3.5 bg-[#09090B] border-2 border-[#27272A] rounded-xl text-[#F8FAFC] font-bold focus:border-[#39FF14] transition-colors outline-none appearance-none"
                      >
                        <option value="" className="bg-[#18181B]">
                          Kies een onderwerp...
                        </option>
                        <option value="Gratis proefperiode" className="bg-[#18181B]">
                          Gratis proefperiode van 24 uur
                        </option>
                        <option value="Installatiehulp" className="bg-[#18181B]">
                          Installatiehulp en apps
                        </option>
                        <option value="Prijzen" className="bg-[#18181B]">
                          Vragen over abonnementen en prijzen
                        </option>
                        <option value="Technische hulp" className="bg-[#18181B]">
                          Technische hulp
                        </option>
                        <option value="Betalen" className="bg-[#18181B]">
                          Betalen (creditcard / PayPal / crypto)
                        </option>
                        <option value="Algemene vraag" className="bg-[#18181B]">
                          Algemene vraag
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-black text-[#F8FAFC] uppercase tracking-wide mb-2"
                    >
                      Bericht <span className="text-[#39FF14]">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3.5 bg-[#09090B] border-2 border-[#27272A] rounded-xl text-[#F8FAFC] font-bold placeholder-[#94A3B8]/50 focus:border-[#39FF14] transition-colors outline-none resize-none"
                        placeholder="Beschrijf je vraag en welk apparaat je gebruikt..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-[#09090B]/20 hover:scale-[1.01] hover:bg-[#E6C200] hover:shadow-xl cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    Openen in WhatsApp
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn>
              <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
                <h3 className="text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-6">
                  Contactgegevens
                </h3>

                {/* Rendered only once a verified email address is set in lib/seo.ts. */}
                {CONSTANTS.CONTACT.email && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">E-mail</p>
                      <a
                        href={`mailto:${CONSTANTS.CONTACT.email}`}
                        className="text-[#F8FAFC] hover:text-[#39FF14] transition-colors text-sm font-bold break-all"
                      >
                        {CONSTANTS.CONTACT.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">WhatsApp</p>
                    {WHATSAPP_AVAILABLE ? (
                      <a
                        href={whatsappUrl()}
                        target={WHATSAPP_LINK_TARGET}
                        rel="noopener noreferrer"
                        className="text-[#F8FAFC] hover:text-[#39FF14] transition-colors text-sm font-bold"
                      >
                        {CONSTANTS.CONTACT.phone || 'Chat via WhatsApp'}
                      </a>
                    ) : (
                      <p className="text-[#F8FAFC] text-sm font-bold">Nog niet beschikbaar</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">
                      Direct contact
                    </p>
                    <p className="text-[#F8FAFC] text-sm font-bold">Stel je vraag in de chat</p>
                    <button
                      onClick={startWhatsAppChat}
                      className="text-[#39FF14] text-xs font-black uppercase tracking-widest hover:text-[#F8FAFC] transition-colors -mt-1 -mb-2 py-2 cursor-pointer block"
                    >
                      Start WhatsApp-chat →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">
                      Bereikbaarheid
                    </p>
                    <p className="text-[#F8FAFC] text-sm font-bold">Via WhatsApp</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="pt-6 border-t border-[#27272A]">
                  <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-black mb-4">
                    Onze service
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#09090B] rounded-xl p-3 text-center border border-[#27272A]">
                      <Headphones className="w-5 h-5 text-[#39FF14] mx-auto mb-1" />
                      <p className="text-[#F8FAFC] text-[9px] uppercase font-black tracking-wider">
                        Hulp via WhatsApp
                      </p>
                    </div>
                    <div className="bg-[#09090B] rounded-xl p-3 text-center border border-[#27272A]">
                      <ShieldCheck className="w-5 h-5 text-[#39FF14] mx-auto mb-1" />
                      <p className="text-[#F8FAFC] text-[9px] uppercase font-black tracking-wider">
                        Geen contract
                      </p>
                    </div>
                    <div className="bg-[#09090B] rounded-xl p-3 text-center border border-[#27272A]">
                      <Zap className="w-5 h-5 text-[#39FF14] mx-auto mb-1" />
                      <p className="text-[#F8FAFC] text-[9px] uppercase font-black tracking-wider">
                        Installatiehulp
                      </p>
                    </div>
                    <div className="bg-[#09090B] rounded-xl p-3 text-center border border-[#27272A]">
                      <Users className="w-5 h-5 text-[#39FF14] mx-auto mb-1" />
                      <p className="text-[#F8FAFC] text-[9px] uppercase font-black tracking-wider">
                        Gratis testen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 w-full">
        <FadeIn>
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-3">
                  <LifeBuoy className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-[#F8FAFC] font-black text-sm uppercase tracking-wide">
                  Via WhatsApp
                </h3>
                <p className="text-[#94A3B8] text-xs font-bold mt-0.5">Gewoon in de chat</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-[#F8FAFC] font-black text-sm uppercase tracking-wide">
                  Installatiehulp
                </h3>
                <p className="text-[#94A3B8] text-xs font-bold mt-0.5">Stap voor stap</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-[#F8FAFC] font-black text-sm uppercase tracking-wide">
                  Proefperiode
                </h3>
                <p className="text-[#94A3B8] text-xs font-bold mt-0.5">24 uur gratis testen</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-[#F8FAFC] font-black text-sm uppercase tracking-wide">
                  Geen contract
                </h3>
                <p className="text-[#94A3B8] text-xs font-bold mt-0.5">Eenmalig vooraf betalen</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 w-full">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#F8FAFC] mb-3 uppercase tracking-tight">
            Veelgestelde <span className="text-[#39FF14]">vragen</span>
          </h2>
          <p className="text-[#94A3B8] font-bold text-base">
            Snel antwoord op de meest gestelde vragen aan onze klantenservice
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORT_FAQS.map((faq, idx) => (
            <FadeInItem
              key={idx}
              className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:border-[#39FF14] hover:shadow-[0_20px_50px_rgba(57,255,20,0.15)]"
            >
              <h3 className="text-[#F8FAFC] font-black text-base uppercase tracking-tight mb-2">
                {faq.q}
              </h3>
              <p className="text-[#94A3B8] text-sm font-bold leading-relaxed"><FaqText text={faq.a} /></p>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* CTA */}
        <FadeIn className="text-center mt-12">
          <Link
            href="/veelgestelde-vragen"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-sm uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-lg border border-[#09090B]/20 cursor-pointer"
          >
            Alle veelgestelde vragen
          </Link>
        </FadeIn>
      </section>

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-up {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}