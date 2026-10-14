'use client';

import { useRef, type ElementType } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/*
 * A paragraph whose words fill from a pale grey to full ink as the reader
 * scrolls through it, so the eye is led word by word. The progress is driven
 * by the element's own position in the viewport: the first word fills when the
 * block is in the lower part of the screen, the last one when it reaches the
 * middle. With reduced motion the text is simply rendered in ink.
 */
export default function ScrollInk({
  text,
  as: Tag = 'p',
  className,
  from = 'rgba(29, 29, 31, 0.22)',
  to = '#1d1d1f',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) {
    return (
      <Tag ref={ref} className={className} style={{ color: to }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} word={word} index={i} total={words.length} progress={scrollYProgress} from={from} to={to} />
      ))}
    </Tag>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  from,
  to,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  from: string;
  to: string;
}) {
  // Each word owns a slice of the progress; the slices overlap slightly so the
  // fill reads as a wave rather than a hard step.
  const start = index / total;
  const end = Math.min(1, start + 1.6 / total);
  const color = useTransform(progress, [start, end], [from, to]);
  return (
    <motion.span aria-hidden style={{ color, display: 'inline' }}>
      {word}{' '}
    </motion.span>
  );
}
