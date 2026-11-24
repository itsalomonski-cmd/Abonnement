import { useEffect, type RefObject } from 'react';

/**
 * Phase 5 (B2): pauses the element's own Web Animations (the B1 ticker
 * `transform` animation) while the element is outside the viewport, and
 * resumes them when it comes back into view.
 *
 * - One IntersectionObserver per element; no polling.
 * - Pausing keeps the animation's currentTime, so it resumes exactly where it
 *   stopped: same position, speed, direction and keyframes, no jump or seam.
 * - With reduced motion there is no running animation, so nothing happens.
 */
export function usePauseWhenOffscreen(ref: RefObject<HTMLElement | null>, enabled = true): void {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined') return;

    let visible = true;
    let raf = 0;

    const apply = (): boolean => {
      const animations = el.getAnimations();
      for (const animation of animations) {
        if (visible && animation.playState === 'paused') animation.play();
        else if (!visible && animation.playState === 'running') animation.pause();
      }
      return animations.length > 0;
    };

    // Framer Motion starts the browser animation on its next frame. If the
    // first visibility report arrives before that, retry for a few frames only.
    const applyWhenReady = () => {
      cancelAnimationFrame(raf);
      let attempts = 0;
      const tick = () => {
        if (!apply() && ++attempts < 10) raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        applyWhenReady();
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}
