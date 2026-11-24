// Shared layout for the legal pages (algemene voorwaarden, privacybeleid,
// restitutiebeleid, auteursrecht). Every element reuses the exact markup and
// classes of the original template's legal pages (hero, acceptance box, icon
// note boxes, centred contact card, back link, copyright line).
//
// The draft notice is rendered in the original note-box style: these texts are
// adapted from the source project, have NOT been reviewed by a Dutch lawyer,
// and the company's legal details are still missing.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CheckCircle, FileText, AlertCircle, MessageSquare, type LucideIcon } from 'lucide-react';
import { CONSTANTS, absoluteUrl, breadcrumbSchema } from '@/lib/seo';

/** Date on which the Dutch versions of the legal texts were drafted. */
export const LEGAL_LAST_UPDATED = '23 november 2026';

export type LegalSection = {
  heading: string;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
  /** List icon (original pages used Ban / RefreshCw for some lists). */
  bulletIcon?: LucideIcon;
  note?: { label: string; text: ReactNode; icon?: LucideIcon };
  /** Centred contact card (original style). */
  contactCard?: { label: string; linkText: string; href: string };
};

type LegalPageProps = {
  path: string;
  breadcrumbName: string;
  badge: string;
  badgeIcon: LucideIcon;
  titleStart: string;
  titleAccent: string;
  /** Render titleStart and titleAccent as one word (e.g. Privacy|beleid). */
  compoundTitle?: boolean;
  intro: string;
  highlight?: { label: string; text: ReactNode };
  sections: LegalSection[];
  /** Missing information the owner must supply before publication. */
  missing: string[];
};

function NoteBox({ label, text, icon: Icon = FileText }: { label: string; text: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 my-6 shadow-xl">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#39FF14]" />
          </div>
        </div>
        <div>
          <div className="text-[#F8FAFC] text-sm font-bold leading-relaxed">
            <span className="text-[#39FF14] font-black uppercase tracking-wide block mb-0.5">{label}</span>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalPage({
  path,
  breadcrumbName,
  badge,
  badgeIcon: BadgeIcon,
  titleStart,
  titleAccent,
  compoundTitle = false,
  intro,
  highlight,
  sections,
  missing,
}: LegalPageProps) {
  const pageUrl = absoluteUrl(path);
  const BRAND = CONSTANTS.BRAND_NAME;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${titleStart}${compoundTitle ? '' : ' '}${titleAccent} | ${BRAND}`.replace(/\s+/g, ' '),
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${CONSTANTS.SITE_URL}/#website` },
        about: { '@id': `${CONSTANTS.SITE_URL}/#organization` },
      },
      { ...breadcrumbSchema([{ name: breadcrumbName, path }]), '@id': `${pageUrl}#breadcrumb` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(57,255,20,0.05),_transparent_50%)] pointer-events-none" />

        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
            <BadgeIcon className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">{badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-none mb-6">
            {titleStart}
            {compoundTitle ? '' : ' '}
            <span className="text-[#39FF14]">{titleAccent}</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed">{intro}</p>

          <p className="text-xs text-[#94A3B8]/60 mt-4 font-bold uppercase tracking-wider">
            Laatst bijgewerkt: {LEGAL_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        {highlight && (
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#39FF14]" />
                </div>
              </div>
              <div>
                <p className="text-[#F8FAFC] font-bold text-sm md:text-base leading-relaxed">
                  <span className="text-[#39FF14] font-black uppercase tracking-wide block mb-1">{highlight.label}</span>
                  {highlight.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DRAFT NOTICE (placeholder until the owner supplies the missing details) */}
        <NoteBox
          label="Conceptversie:"
          icon={AlertCircle}
          text={
            <>
              Deze tekst is nog niet juridisch gecontroleerd. De volgende gegevens worden nog aangevuld:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[#94A3B8]">
                {missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </>
          }
        />

        {/* Legal Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => {
            const BulletIcon = section.bulletIcon ?? CheckCircle;
            return (
            <section key={section.heading}>
              <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((p, j) => {
                const last = j === (section.paragraphs?.length ?? 0) - 1 && !section.bullets && !section.note && !section.contactCard;
                return (
                  <p key={j} className={`text-[#94A3B8] text-base font-medium leading-relaxed${last ? '' : ' mb-4'}`}>
                    {p}
                  </p>
                );
              })}
              {section.bullets && (
                <ul className="space-y-3 mb-6">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-[#94A3B8] font-bold text-sm md:text-base">
                      <BulletIcon className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && <NoteBox label={section.note.label} text={section.note.text} icon={section.note.icon} />}
              {section.contactCard && (
                <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 my-6 text-center shadow-xl">
                  <MessageSquare className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
                  <p className="text-xs uppercase font-black text-[#94A3B8] tracking-widest mb-1">
                    {section.contactCard.label}
                  </p>
                  <Link
                    href={section.contactCard.href}
                    className="text-[#F8FAFC] font-black text-xl md:text-2xl hover:text-[#39FF14] transition-colors break-all"
                  >
                    {section.contactCard.linkText}
                  </Link>
                </div>
              )}
            </section>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#27272A] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest py-2 -my-2"
          >
            ← Terug naar de homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#94A3B8]/60 text-xs font-bold">
            © {new Date().getFullYear()} {BRAND}. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </div>
  );
}
