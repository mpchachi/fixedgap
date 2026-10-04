'use client';

import { motion } from 'framer-motion';

/*
 * Small trend line that draws in when it scrolls into view.
 * `values` are 0..1; the line goes left to right and ends with a dot.
 */
export default function Sparkline({ values, className = '' }: { values: number[]; className?: string }) {
  const w = 120;
  const h = 36;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * (w - 4) + 2,
    h - 4 - v * (h - 8),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const [lx, ly] = pts[pts.length - 1];

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="#2457e6"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: 'easeInOut' } },
        }}
      />
      <motion.circle
        cx={lx}
        cy={ly}
        r={2.6}
        fill="#2457e6"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 1.05, type: 'spring', stiffness: 300, damping: 16 } },
        }}
        style={{ transformOrigin: `${lx}px ${ly}px` }}
      />
    </motion.svg>
  );
}
