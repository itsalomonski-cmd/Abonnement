'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Makes every Framer Motion animation on the site honour the operating-system
// "reduce motion" preference (transform/layout animations such as the infinite
// poster and partner tickers are skipped; opacity fades remain).
// Users without that preference see exactly the same animations as before.
export default function MotionProvider({ children }: { children: ReactNode }) {
  // Phase 5 (B3): LazyMotion + `m` components load only the DOM animation features
  // the site uses (animations, variants, whileInView, exit/AnimatePresence) instead of
  // the full `motion` bundle. Same animations, timing and reduced-motion behaviour.
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
