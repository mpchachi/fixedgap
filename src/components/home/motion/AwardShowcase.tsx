'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './AwardShowcase.module.css';

export type FeaturedAward = {
  id: string;
  tab: string;
  event: string;
  title: string;
  detail: string;
  photo?: string;
  photoAlt?: string;
  figure?: string;
  figureLabel?: string;
};

export type Mention = { by: string; title: string };

export type PressItem = {
  outlet: string;
  date: string;
  title: string;
  url: string;
};

export default function AwardShowcase({
  featured,
  mentions = [],
  press = [],
  quote = false,
}: {
  featured: FeaturedAward[];
  mentions?: Mention[];
  press?: PressItem[];
  /* Quote mode: the title reads as a statement, the event line sits under it as attribution. */
  quote?: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = featured[active];

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist">
        {featured.map((award, i) => (
          <button
            key={award.id}
            role="tab"
            aria-selected={i === active}
            className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
            onClick={() => setActive(i)}
          >
            {award.tab}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <i className={styles.markTl} aria-hidden="true" />
        <i className={styles.markTr} aria-hidden="true" />
        <i className={styles.markBl} aria-hidden="true" />
        <i className={styles.markBr} aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={styles.inner}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`${styles.copy} ${quote ? styles.copyQuote : ''}`}>
              {!quote && <p className={styles.event}>{current.event}</p>}
              <h3>{quote ? `\u201C${current.title}\u201D` : current.title}</h3>
              <p className={styles.detail}>{current.detail}</p>
              {quote && <p className={styles.attribution}>{current.event}</p>}
            </div>
            {current.photo ? (
              <div className={styles.photo}>
                <Image src={current.photo} alt={current.photoAlt ?? ''} fill sizes="(max-width: 900px) 100vw, 420px" />
              </div>
            ) : (
              <div className={styles.figure}>
                <strong>{current.figure}</strong>
                <span>{current.figureLabel}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {mentions.length > 0 && (
      <div className={styles.mentions}>
        {mentions.map((m) => (
          <div className={styles.mention} key={m.by}>
            <span className={styles.mentionBy}>{m.by}</span>
            <p>{m.title}</p>
          </div>
        ))}
      </div>
      )}

      {press.length > 0 && (
      <div className={styles.press}>
        {press.map((item) => (
          <a className={styles.pressItem} href={item.url} target="_blank" rel="noreferrer" key={item.url}>
            <span className={styles.pressMeta}>
              {item.outlet} <em>{item.date}</em>
            </span>
            <span className={styles.pressTitle}>{item.title}</span>
            <span className={styles.pressArrow} aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
      )}
    </div>
  );
}
