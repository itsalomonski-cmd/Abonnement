// lib/faq-text.tsx
//
// FAQ answers are plain strings that feed BOTH the visible FAQ and the
// FAQPage JSON-LD. To allow contextual internal links without duplicating the
// answer text, an answer may contain markdown-style links to INTERNAL paths:
//
//   'Alle prijzen staan op de [prijzenpagina](/prijzen).'
//
// - <FaqText text={...} /> renders the link with the template's existing
//   inline-link style (same classes as the links on the legal pages).
// - faqPlainText(text) strips the markup for JSON-LD, so the structured data
//   contains exactly the visible answer text.
//
// Only paths starting with "/" are turned into links; anything else is left as
// plain text, so external or WhatsApp destinations can never be added here.
import Link from 'next/link';
import type { ReactNode } from 'react';

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

const LINK_CLASS = 'text-[#39FF14] font-black hover:underline';

/** Answer text without link markup (for JSON-LD, search and filtering). */
export function faqPlainText(text: string): string {
  return text.replace(LINK_PATTERN, '$1');
}

/** Visible answer text with internal links rendered. */
export function FaqText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Link key={index} href={match[2]} className={LINK_CLASS}>
        {match[1]}
      </Link>
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
