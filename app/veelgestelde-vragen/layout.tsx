// app/veelgestelde-vragen/layout.tsx
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(
  'IPTV Abonnement: Veelgestelde Vragen & Antwoorden | IPTVAbonnement',
  'Antwoorden over je IPTV abonnement: installatie, apparaten, snelheid, betalen en 24u gratis testen.',
  '/veelgestelde-vragen'
);

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
