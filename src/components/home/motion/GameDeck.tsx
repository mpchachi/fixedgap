'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './GameDeck.module.css';

export type GameShot = { src: string; alt: string };

/* Resting pose of each card in the stack: a loose fan, last one on top. */
const POSE = [
  { x: -22, y: 12, rotate: -6 },
  { x: 0, y: 0, rotate: 1.5 },
  { x: 18, y: -8, rotate: 5 },
];

export default function GameDeck({ shots }: { shots: GameShot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  return (
    <div className={styles.deck} ref={ref} aria-label="Screenshots of the games">
      {shots.map((shot, i) => {
        const pose = POSE[i % POSE.length];
        const dealt = { opacity: 1, x: pose.x, y: pose.y, rotate: pose.rotate, scale: 1 };
        return (
          <motion.div
            className={styles.card}
            key={shot.src}
            style={{ zIndex: i + 1 }}
            initial={reduce ? dealt : { opacity: 0, x: pose.x * 0.4, y: 160, rotate: pose.rotate * 2.2, scale: 0.92 }}
            animate={inView ? dealt : undefined}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 30,
              mass: 0.9,
              delay: 0.12 * i,
            }}
          >
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 760px) 100vw, 520px" />
          </motion.div>
        );
      })}
    </div>
  );
}
