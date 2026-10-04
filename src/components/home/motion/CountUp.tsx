'use client';

import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

/*
 * Counts from 0 to `value` the first time it scrolls into view.
 * `prefix`/`suffix` are rendered as plain text around the number.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { n } = useSpring({
    n: seen ? value : 0,
    config: { mass: 1, tension: 60, friction: 22, clamp: true },
  });

  return (
    <strong ref={ref} className={className}>
      {prefix}
      <animated.span>{n.to((v) => v.toFixed(decimals))}</animated.span>
      {suffix}
    </strong>
  );
}
