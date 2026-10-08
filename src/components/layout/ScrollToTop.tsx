'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
 * Every route change starts at the top of the new page. Two things fight
 * that: the document uses smooth scrolling (so the browser animates the jump)
 * and GSAP ScrollTrigger remembers the previous scroll position and restores
 * it on its next refresh. We clear that memory, jump instantly, and re-assert
 * the top once the new page's own ScrollTriggers have refreshed.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    ScrollTrigger.clearScrollMemory('manual');
  }, []);

  useEffect(() => {
    if (window.location.hash) return; // deep links keep their anchor
    const jump = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    ScrollTrigger.clearScrollMemory('manual');
    jump();
    const raf = requestAnimationFrame(jump);
    const timers = [60, 160, 400].map((ms) => window.setTimeout(jump, ms));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
