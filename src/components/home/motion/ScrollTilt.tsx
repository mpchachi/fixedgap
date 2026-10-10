'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/*
 * A framed mockup that lies tilted back while it is below the fold and comes
 * flat and to full size as it scrolls into the middle of the viewport.
 * Pattern from Aceternity's "Container Scroll Animation", rebuilt on the
 * framer-motion we already ship. With reduced motion it renders flat.
 */
export default function ScrollTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.9, 1]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div className={className} style={{ rotateX, scale, y, opacity, transformOrigin: '50% 100%' }}>
        {children}
      </motion.div>
    </div>
  );
}
