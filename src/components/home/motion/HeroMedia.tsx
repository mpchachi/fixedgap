'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/*
 * Wraps the hero media. As the user scrolls past it, the frame eases back
 * (scale 1 -> 0.94), its corners round and it dims, which hands the eye to the
 * content below instead of cutting the video off at the viewport edge.
 */
export default function HeroMedia({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 20%', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const radius = useTransform(scrollYProgress, [0, 1], [6, 22]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { scale, borderRadius: radius, transformOrigin: 'center top' }}
      initial={{ opacity: 0, y: 36, clipPath: 'inset(8% 6% round 6px)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% round 6px)' }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
