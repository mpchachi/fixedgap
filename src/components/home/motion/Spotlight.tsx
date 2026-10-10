'use client';

import { useCallback, useRef, type ReactNode } from 'react';

/*
 * Wraps a dark block and makes its glow follow the cursor. Pattern from the
 * "Spotlight Card" on 21st.dev, reduced to two CSS variables (--sx, --sy)
 * that the module CSS reads in a radial-gradient. No pointer: the glow stays
 * where the CSS default puts it (bottom centre), so touch and reduced motion
 * see the static version.
 */
export default function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number>(0);

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--sx', `${x}%`);
      el.style.setProperty('--sy', `${y}%`);
    });
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty('--sx');
    el.style.removeProperty('--sy');
  }, []);

  return (
    <section ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </section>
  );
}
