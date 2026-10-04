'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Pipeline.module.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * Four steps joined by a rail. As the section scrolls, the rail fills from
 * left to right, each node lights up as the fill reaches it and a small
 * signal dot rides along the rail.
 */
export default function PipelineRail({
  steps,
}: {
  steps: Array<{ title: string; body: string }>;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const fill = el.querySelector(`.${styles.fill}`);
      const dot = el.querySelector(`.${styles.dot}`);
      const nodes = el.querySelectorAll(`.${styles.node}`);
      const cards = el.querySelectorAll(`.${styles.step}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });

      tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
      tl.fromTo(dot, { left: '0%', opacity: 0 }, { left: '100%', opacity: 1, ease: 'none', duration: 1 }, 0);
      nodes.forEach((node, i) => {
        const at = (i / (nodes.length - 1)) * 0.98;
        tl.fromTo(node, { scale: 0.6, backgroundColor: '#d9d9de' }, { scale: 1, backgroundColor: '#2457e6', duration: 0.06 }, at);
        tl.fromTo(cards[i], { opacity: 0.25, y: 14 }, { opacity: 1, y: 0, duration: 0.1 }, at);
      });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.root} ref={root}>
      <div className={styles.rail}>
        <div className={styles.fill} />
        <div className={styles.dot} />
        {steps.map((_, i) => (
          <span className={styles.node} key={i} style={{ left: `${(i / (steps.length - 1)) * 100}%` }} />
        ))}
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div className={styles.step} key={step.title}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
