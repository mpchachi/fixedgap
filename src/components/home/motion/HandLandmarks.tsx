'use client';

import { motion } from 'framer-motion';

/*
 * The 21 MediaPipe hand landmarks on a 100x100 grid, open hand, palm to viewer.
 * Lines draw in on scroll, dots pop, fingertips keep a slow breathing pulse.
 */
const points: Array<[number, number]> = [
  [50, 94], // 0 wrist
  [39, 85], [29, 74], [22, 63], [16, 54], // thumb
  [41, 58], [38, 42], [36, 30], [35, 19], // index
  [51, 56], [51, 38], [51, 24], [51, 12], // middle
  [61, 58], [63, 42], [64, 29], [65, 20], // ring
  [70, 62], [74, 50], [76, 40], [78, 32], // pinky
];

const edges: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];

const tips = new Set([4, 8, 12, 16, 20]);

export default function HandLandmarks({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      aria-label="Twenty-one hand landmarks tracked by FixedGap"
      role="img"
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
          stroke="#1d1d1f"
          strokeOpacity={0.35}
          strokeWidth={0.7}
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.6, delay: 0.15 + i * 0.045, ease: 'easeOut' },
            },
          }}
        />
      ))}
      {points.map(([x, y], i) => (
        <g key={i}>
          {tips.has(i) && (
            <motion.circle
              cx={x}
              cy={y}
              r={3.6}
              fill="#2457e6"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: [0.18, 0, 0.18], transition: { delay: 1.4, duration: 2.6, repeat: Infinity, ease: 'easeInOut' } } }}
            />
          )}
          <motion.circle
            cx={x}
            cy={y}
            r={tips.has(i) ? 1.9 : 1.4}
            fill={tips.has(i) || i === 0 ? '#2457e6' : '#1d1d1f'}
            style={{ transformOrigin: `${x}px ${y}px` }}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.3 + i * 0.04 },
              },
            }}
          />
        </g>
      ))}
    </motion.svg>
  );
}
