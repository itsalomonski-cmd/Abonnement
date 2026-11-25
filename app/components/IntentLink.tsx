'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, FocusEvent, MouseEvent, TouchEvent } from 'react';

// ---------------------------------------------------------------------------
// IntentLink: a next/link that prefetches on user intent instead of on sight.
//
// A default <Link> prefetches its destination as soon as it scrolls into view.
// For site-wide navigation (header nav, footer, category grids) that means
// every page downloads the data of 20+ other pages that the visitor will
// almost never open (measured: 21-25 prefetch requests, 2.5-3.1 MB
// uncompressed per page after scrolling).
//
// IntentLink renders exactly the same <a> element (same href, classes, text
// and attributes), disables viewport prefetching, and prefetches the
// destination the moment the visitor shows intent: mouse hover, touch start
// (mobile) or keyboard focus. Navigation therefore stays fast, while links that
// are never used cost nothing.
//
// Use it for repeated navigation links. Keep a plain <Link> where prefetching
// on sight is worth it (e.g. the primary "order" CTA to /prijzen).
// ---------------------------------------------------------------------------
type IntentLinkProps = Omit<ComponentProps<typeof Link>, 'prefetch'>;

export default function IntentLink({ href, onMouseEnter, onTouchStart, onFocus, ...rest }: IntentLinkProps) {
  const router = useRouter();

  const prefetch = () => {
    const url = typeof href === 'string' ? href : (href.pathname ?? null);
    // Only internal routes can be prefetched; the router de-duplicates
    // repeated calls for the same URL.
    if (url && url.startsWith('/')) router.prefetch(url);
  };

  return (
    <Link
      {...rest}
      href={href}
      prefetch={false}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        prefetch();
        onMouseEnter?.(e);
      }}
      onTouchStart={(e: TouchEvent<HTMLAnchorElement>) => {
        prefetch();
        onTouchStart?.(e);
      }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
        prefetch();
        onFocus?.(e);
      }}
    />
  );
}
