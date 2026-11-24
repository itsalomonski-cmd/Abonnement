// app/klantenservice/layout.tsx
// The support page is a client component and cannot export metadata itself,
// so its metadata lives here.
import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata(
  'Klantenservice',
  'Neem contact op met onze klantenservice via WhatsApp voor vragen over je IPTV abonnement, de installatie, de gratis proefperiode en betalen.',
  '/klantenservice'
);

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
