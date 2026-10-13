'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = '0123456789/<>[]{}=+-·';

/*
 * Mono label that resolves from scrambled glyphs into its text when it enters
 * the viewport, left to right, in about half a second. Static text when the
 * user prefers reduced motion.
 */
export default function Kicker({
  text,
  className,
  as: Tag = 'p',
}: {
  text: string;
  className?: string;
  as?: 'p' | 'span';
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [scrambled, setScrambled] = useState('');
  const shown = reduce || !inView ? (reduce ? text : '') : scrambled;

  useEffect(() => {
    if (!inView || reduce) return;
    const total = 520;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const settled = Math.floor(t * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i += 1) {
        const ch = text[i];
        out += ch === ' ' ? ' ' : GLYPHS[(i * 7 + Math.floor(now / 40)) % GLYPHS.length];
      }
      setScrambled(t < 1 ? out : text);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, text]);

  // Reserve the final width so the layout does not shift while decoding.
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span aria-hidden="true" style={{ visibility: 'hidden' }}>{text}</span>
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, whiteSpace: 'pre' }}>{shown}</span>
      </span>
    </Tag>
  );
}
