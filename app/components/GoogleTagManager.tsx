import Script from 'next/script';

// ---------------------------------------------------------------------------
// GOOGLE TAG MANAGER
// The ONLY tracking script on the site. GA4 (G-HB5P7R4S6X) is configured
// inside this GTM container, so there is deliberately no direct gtag.js
// install anywhere in the codebase; adding one would double-count every hit.
//
// Page views: GTM/GA4 track the first load, and client-side (App Router)
// navigations are picked up by GA4 Enhanced Measurement ("page changes based
// on browser history events"). Do NOT push page_view events from code or add
// a History Change page_view tag in GTM, or navigations will be counted twice.
//
// Loads only on production builds: not in `next dev`, Vercel preview /
// development deployments or SITE_ENV=staging (same rule as next.config.ts),
// so test traffic never reaches the GA4 property.
// ---------------------------------------------------------------------------
const GTM_ID = 'GTM-MPRNJH35';

const isTrackingEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV !== 'preview' &&
  process.env.VERCEL_ENV !== 'development' &&
  process.env.SITE_ENV !== 'staging';

export default function GoogleTagManager() {
  if (!isTrackingEnabled) return null;

  // Rendered once from the root layout, which never remounts during
  // navigation; the fixed `id` also lets next/script de-duplicate it.
  // afterInteractive: GTM starts after hydration, so it does not compete with
  // the page's own resources for LCP.
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}
