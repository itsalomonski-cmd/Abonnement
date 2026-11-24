import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';
import NotFoundContent from './components/NotFoundContent';

// Server wrapper so the 404 page can export its own metadata instead of
// inheriting the homepage title and canonical. The visible UI lives in
// app/components/NotFoundContent.tsx.
const TITLE = `Pagina niet gevonden | ${CONSTANTS.BRAND_NAME}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: `De pagina die je zoekt bestaat niet (meer) op ${CONSTANTS.BRAND_NAME}.`,
  robots: { index: false, follow: true },
  // Replaces (not merges with) the layout's alternates: no canonical/hreflang
  // on an error page.
  alternates: {},
  openGraph: {
    title: TITLE,
    siteName: CONSTANTS.BRAND_NAME,
    locale: CONSTANTS.LOCALE,
    images: [{ ...CONSTANTS.OG_IMAGE, alt: `${CONSTANTS.BRAND_NAME} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    images: [CONSTANTS.OG_IMAGE.url],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
