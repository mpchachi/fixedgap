'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * Page transition. On every route change a sand-coloured curtain lifts from
 * the top while the new page settles in from a few pixels below. The template
 * remounts per pathname, so the enter animation runs on each navigation and
 * never on in-page anchor clicks.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <div key={pathname} style={{ position: 'relative' }}>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'var(--sand, #f3f1ec)',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
