import type { Metadata, Viewport } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { CONSTANTS } from '@/lib/seo';
import { LOWEST_PRICE, formatEUR } from '@/lib/pricing';
import Loading from './components/loading';
import MotionProvider from './components/MotionProvider';
import GoogleTagManager from './components/GoogleTagManager';


// ---------------------------------------------------------------------------
// RENDERING — every page is fully static (generated at build time).
// All content (pages, blog articles, prices) lives in this repository and no
// page fetches data at request time, so a time-based `revalidate` would only
// re-render identical HTML (server work + cache writes for nothing). Content
// changes go live with the next deployment. Edge caching: next.config.ts.
// ---------------------------------------------------------------------------



const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;

// ---------------------------------------------------------------------------
// OG IMAGE — share image (url, real dimensions, alt) defined once in
// CONSTANTS.OG_IMAGE (lib/seo.ts).
// ---------------------------------------------------------------------------
const OG_IMAGE = CONSTANTS.OG_IMAGE;

// ---------------------------------------------------------------------------
// SEO STRINGS (homepage defaults; every other page sets its own metadata)
// ---------------------------------------------------------------------------
const SEO_TITLE = `IPTV Abonnement Kopen | Live TV, Films & 24u Gratis Test`;
const SEO_DESCRIPTION =
  `Probeer jouw IPTV abonnement eerst 24 uur gratis! Kijk 4K live tv, films en series op elk apparaat. Vanaf € 31 voor 3 maanden.`;

// ---------------------------------------------------------------------------
// VIEWPORT
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#081425',
};

// ---------------------------------------------------------------------------
// GLOBAL METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s`,
  },
  description: SEO_DESCRIPTION,
  authors: [{ name: CONSTANTS.BRAND_NAME }],
  creator: CONSTANTS.BRAND_NAME,
  publisher: CONSTANTS.BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    // Relative values resolve to each page's own URL. Pages that define their
    // own alternates override these.
    canonical: './',
    languages: {
      'nl-NL': './',
      'x-default': './',
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: CONSTANTS.BRAND_NAME,
    locale: CONSTANTS.LOCALE,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/img/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/img/favicons/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/img/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/img/favicons/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/img/favicons/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/img/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/img/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/img/favicons/favicon.ico',
    apple: [
      { url: '/img/favicons/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Served from public/img/favicons/site.webmanifest.
  manifest: '/img/favicons/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: CONSTANTS.BRAND_NAME,
    statusBarStyle: 'default',
  },
  other: {
    'msapplication-TileColor': '#081425',
  },
  category: 'entertainment',
};

// ---------------------------------------------------------------------------
// SITE-WIDE SCHEMAS
// Rendered once in <body> — do NOT import these from PageSchemas.tsx.
// ---------------------------------------------------------------------------
const OrganizationSchema = () => (
  <script
    type="application/ld+json"
    id="organization-schema"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: CONSTANTS.BRAND_NAME,
        alternateName: CONSTANTS.DOMAIN,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}${CONSTANTS.LOGO_IMAGE.url}`,
          contentUrl: `${SITE_URL}${CONSTANTS.LOGO_IMAGE.url}`,
          width: CONSTANTS.LOGO_IMAGE.width,
          height: CONSTANTS.LOGO_IMAGE.height,
          caption: `${CONSTANTS.BRAND_NAME} logo`,
        },
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#primaryimage`,
          url: `${SITE_URL}${OG_IMAGE.url}`,
          contentUrl: `${SITE_URL}${OG_IMAGE.url}`,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          caption: OG_IMAGE.alt,
        },
        description: `${CONSTANTS.BRAND_NAME} biedt digitale IPTV abonnementen voor Nederland. Na betaling ontvang je je inloggegevens via WhatsApp, waar je ook hulp krijgt bij de installatie.`,
        areaServed: { '@type': 'Country', name: 'Nederland' },
        // contactPoint omitted: no verified email address or phone number has
        // been provided yet (see CONSTANTS.CONTACT in lib/seo.ts).
        // sameAs omitted: CONSTANTS.SOCIALS are still marked "Replace" in
        // lib/seo.ts. sameAs asserts those profiles ARE this organization, so
        // re-add it only with confirmed official profile URLs.
      }),
    }}
  />
);

const WebSiteSchema = () => (
  <script
    type="application/ld+json"
    id="website-schema"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CONSTANTS.BRAND_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: CONSTANTS.LANGUAGE,
      }),
    }}
  />
);

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl-NL" suppressHydrationWarning className="scroll-smooth">
      {/* No Google Fonts preconnects: next/font self-hosts Poppins/Montserrat
          from this domain, so the page never contacts Google's font servers. */}
      <body
        className={`${poppins.className} ${montserrat.variable} antialiased min-h-screen bg-[#09090B] text-[#F8FAFC] selection:bg-[#39FF14] selection:text-[#09090B]`}
        suppressHydrationWarning
      >
        <OrganizationSchema />
        <WebSiteSchema />
        <GoogleTagManager />

        {/* Keyboard users can bypass the header; hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-full focus:bg-[#39FF14] focus:px-5 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-wider focus:text-[#09090B]"
        >
          Direct naar inhoud
        </a>

        <MotionProvider>
          <Loading />
          <Header />
          <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
            {children}
          </main>
          <Footer />

          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}