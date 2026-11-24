// IPTVAbonnement wordmark + icon, as a lightweight inline SVG.
// Rendered inline (not via <img>) so the wordmark uses the site's Montserrat
// webfont. A static copy for structured data / external use lives at
// /img/iptvabonnement-logo.svg.
import { CONSTANTS } from '@/lib/seo';

type BrandLogoProps = {
  className?: string;
  /** Accessible name; pass '' when the surrounding link already names it. */
  title?: string;
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ia-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#39FF14" />
          <stop offset="1" stopColor="#2EE60F" />
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="44" height="31" rx="8" fill="url(#ia-mark)" />
      <rect x="17" y="40" width="14" height="3" rx="1.5" fill="#39FF14" />
      <path d="M20 14.5v14l12-7z" fill="#081425" />
    </svg>
  );
}

export default function BrandLogo({ className, title = CONSTANTS.BRAND_NAME }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 300 48"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g>
        <defs>
          <linearGradient id="ia-logo-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#39FF14" />
            <stop offset="1" stopColor="#2EE60F" />
          </linearGradient>
        </defs>
        <rect x="2" y="6" width="44" height="31" rx="8" fill="url(#ia-logo-mark)" />
        <rect x="17" y="40" width="14" height="3" rx="1.5" fill="#39FF14" />
        <path d="M20 14.5v14l12-7z" fill="#081425" />
      </g>
      <text
        x="58"
        y="33"
        textLength="238"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: 'var(--font-montserrat), Montserrat, Arial, sans-serif', fontWeight: 800, fontSize: 27 }}
      >
        <tspan fill="#F8FAFC">IPTV</tspan>
        <tspan fill="#39FF14">Abonnement</tspan>
      </text>
    </svg>
  );
}
