'use client';

import type { PointerEvent, ReactNode } from 'react';
import Link from 'next/link';
import { animated, to, useSpring } from '@react-spring/web';

/*
 * A link that leans toward the pointer while it hovers and springs back on
 * leave. Small displacement (max ~8px) so it feels alive, not slippery.
 */
export default function MagneticLink({
  href,
  className = '',
  children,
  strength = 0.25,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
}) {
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 300, friction: 20 },
  }));

  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    api.start({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  const leave = () => api.start({ x: 0, y: 0 });

  const AnimatedLink = animated(Link);

  return (
    <AnimatedLink
      href={href}
      className={className}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ transform: to([spring.x, spring.y], (x, y) => `translate3d(${x}px, ${y}px, 0)`) }}
    >
      {children}
    </AnimatedLink>
  );
}
