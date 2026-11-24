// app/veelgestelde-vragen/layout.tsx
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(
  'Veelgestelde vragen over IPTV',
  'Antwoorden op veelgestelde vragen over je IPTV abonnement: installatie, apparaten, internetsnelheid, de gratis proefperiode en betalen.',
  '/veelgestelde-vragen'
);

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
