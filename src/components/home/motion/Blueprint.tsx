'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Blueprint.module.css';

/*
 * Technical-drawing overlay for a pinned image: a dashed crosshair through the
 * centre, a dashed measurement frame with square handles at the corners, and
 * up to two mono tags naming what is being measured. Everything redraws when
 * `id` changes, so each step of a story gets its own pass of the pen.
 */
export default function Blueprint({ id, tags = [] }: { id: string | number; tags?: string[] }) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const draw = (delay: number) => ({
    initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 1.1, ease, delay }, opacity: { duration: 0.2, delay } },
  });
  const pop = (delay: number) => ({
    initial: reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.35, ease, delay },
  });

  // Frame inset in viewBox units (0..100 both axes, preserveAspectRatio none).
  const x0 = 14, y0 = 16, x1 = 86, y1 = 84;

  return (
    <div className={styles.root} aria-hidden>
      <motion.svg key={id} className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.line x1="50" y1="0" x2="50" y2="100" className={styles.guide} {...draw(0)} />
        <motion.line x1="0" y1="50" x2="100" y2="50" className={styles.guide} {...draw(0.08)} />
        <motion.rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} className={styles.frame} {...draw(0.18)} />
      </motion.svg>

      <motion.span key={`a-${id}`} className={styles.handle} style={{ left: `${x0}%`, top: `${y0}%` }} {...pop(0.9)} />
      <motion.span key={`b-${id}`} className={styles.handle} style={{ left: `${x1}%`, top: `${y0}%` }} {...pop(0.95)} />
      <motion.span key={`c-${id}`} className={styles.handle} style={{ left: `${x0}%`, top: `${y1}%` }} {...pop(1.0)} />
      <motion.span key={`d-${id}`} className={styles.handle} style={{ left: `${x1}%`, top: `${y1}%` }} {...pop(1.05)} />

      {tags[0] && (
        <motion.span key={`t0-${id}`} className={`${styles.tag} ${styles.tagTop}`} style={{ left: `${x0}%`, top: `${y0}%` }} {...pop(1.1)}>
          {tags[0]}
        </motion.span>
      )}
      {tags[1] && (
        <motion.span key={`t1-${id}`} className={`${styles.tag} ${styles.tagBottom}`} style={{ left: `${x0}%`, top: `${y1}%` }} {...pop(1.2)}>
          {tags[1]}
        </motion.span>
      )}
    </div>
  );
}
