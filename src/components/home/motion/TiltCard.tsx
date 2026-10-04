'use client';

import type { PointerEvent, ReactNode } from 'react';
import { animated, to, useSpring } from '@react-spring/web';

/*
 * Tilts the card toward the pointer and moves a soft highlight with it.
 * Max tilt is small on purpose so it reads as depth, not as a gimmick.
 */
export default function TiltCard({
  children,
  className = '',
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const [spring, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    s: 1,
    gx: 50,
    gy: 50,
    go: 0,
    config: { mass: 1, tension: 220, friction: 24 },
  }));

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    api.start({
      ry: (px - 0.5) * max * 2,
      rx: -(py - 0.5) * max * 2,
      s: 1.015,
      gx: px * 100,
      gy: py * 100,
      go: 1,
    });
  };

  const leave = () => api.start({ rx: 0, ry: 0, s: 1, go: 0 });

  return (
    <animated.div
      className={className}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{
        transform: to([spring.rx, spring.ry, spring.s], (rx, ry, s) => `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`),
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      {children}
      <animated.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: spring.go.to((o) => o * 0.9),
          background: to(
            [spring.gx, spring.gy],
            (gx, gy) => `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.55), transparent 60%)`,
          ),
          mixBlendMode: 'soft-light',
        }}
      />
    </animated.div>
  );
}
