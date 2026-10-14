'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './StickyStory.module.css';
import Blueprint from './Blueprint';
import type { Media } from '@/components/site/Editorial';

export type StoryStep = {
  index: string;
  name: string;
  text: string;
  measures: string;
  media: Media;
};

/* First two measures of a step, trimmed of parentheses, for the blueprint tags. */
function tagsFor(step?: StoryStep): string[] {
  if (!step) return [];
  return step.measures
    .split(',')
    .map((s) => s.replace(/\(.*?\)/g, '').trim())
    .filter(Boolean)
    .slice(0, 2);
}

/*
 * Left column pinned while the right column scrolls. Each text block, when it
 * reaches the middle of the viewport, becomes the active step and its photo
 * crossfades in with a slow settle. On narrow screens the layout stacks and
 * each step shows its own photo.
 */
export default function StickyStory({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<Array<HTMLDivElement | null>>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = blocks.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute('data-step')));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.stage}>
        <div className={styles.stageInner}>
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              className={styles.slide}
              style={{ aspectRatio: step.media.ratio }}
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
              transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={active !== i}
            >
              {step.media.src && (
                <Image src={step.media.src} alt={step.media.label} fill sizes="(max-width: 900px) 100vw, 560px" />
              )}
            </motion.div>
          ))}
          <Blueprint id={active} tags={tagsFor(steps[active])} />
          <div className={styles.counter}>
            <span>{steps[active]?.index}</span>
            <span>/ {String(steps.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`${styles.block} ${active === i ? styles.blockActive : ''}`}
            data-step={i}
            ref={(el) => {
              blocks.current[i] = el;
            }}
          >
            <div className={styles.mobileMedia} style={{ aspectRatio: step.media.ratio }}>
              {step.media.src && <Image src={step.media.src} alt="" fill sizes="100vw" />}
            </div>
            <div className={styles.index}>
              <em>{step.index}</em>
              <span>Movement</span>
            </div>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
            <div className={styles.meta}>
              <span>What it measures</span>
              <p>{step.measures}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
