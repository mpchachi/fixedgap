'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AwardsBoard.module.css';

export type Prize = {
  event: string;
  year: string;
  title: string;
  detail: string;
  figure?: string;
};

export type Mention = { by: string; title: string };

export type PressItem = { outlet: string; date: string; title: string; url: string; image?: string };

export type AwardPhoto = { src: string; alt: string; caption: string };

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.6, delay: 0.06 * i, ease },
});

/*
 * Awards laid out as a ledger: a mono label column on the left, content on the
 * right, one hairline between every row. Three blocks: prizes, special
 * mentions, press.
 */
export default function AwardsBoard({
  prizes,
  mentions,
  press,
  photos,
}: {
  prizes: Prize[];
  mentions: Mention[];
  press: PressItem[];
  photos?: AwardPhoto[];
}) {
  return (
    <div className={styles.board}>
      {/* Prizes ------------------------------------------------------- */}
      <div className={styles.block}>
        <p className={styles.label}>Awards</p>
        <div className={styles.prizes}>
          {prizes.map((p, i) => (
            <motion.article key={p.title} className={styles.prize} {...rise(i)}>
              <p className={styles.meta}>
                <span>{p.event}</span>
                <span>{p.year}</span>
              </p>
              <h3>{p.title}</h3>
              <p className={styles.detail}>{p.detail}</p>
              {p.figure && <p className={styles.figure}>{p.figure}</p>}
            </motion.article>
          ))}
        </div>
      </div>

      {photos && photos.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>&nbsp;</p>
          <div className={styles.photos}>
            {photos.map((ph, i) => (
              <motion.figure key={ph.src} className={styles.photo} {...rise(i)}>
                <div className={styles.photoFrame}>
                  <Image src={ph.src} alt={ph.alt} fill sizes="(max-width: 900px) 100vw, 480px" />
                </div>
                <figcaption>{ph.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      )}

      {/* Mentions ------------------------------------------------------ */}
      <div className={styles.block}>
        <p className={styles.label}>Special mentions</p>
        <ul className={styles.list}>
          {mentions.map((m, i) => (
            <motion.li key={m.by} className={styles.row} {...rise(i)}>
              <span className={styles.rowBy}>{m.by}</span>
              <span className={styles.rowTitle}>{m.title}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Press --------------------------------------------------------- */}
      <div className={styles.block}>
        <p className={styles.label}>In the press</p>
        <ul className={styles.list}>
          {press.map((item, i) => (
            <motion.li key={item.url} className={item.image ? styles.pressCardItem : undefined} {...rise(i)}>
              {item.image ? (
                <a className={styles.pressCard} href={item.url} target="_blank" rel="noreferrer">
                  <span className={styles.pressPhoto}>
                    <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 400px" />
                  </span>
                  <span className={styles.pressMeta}>
                    <span>{item.outlet}</span>
                    <span>{item.date}</span>
                  </span>
                  <span className={styles.pressTitle}>{item.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : (
                <a className={`${styles.row} ${styles.rowLink}`} href={item.url} target="_blank" rel="noreferrer">
                  <span className={styles.rowBy}>
                    {item.outlet}
                    <em>{item.date}</em>
                  </span>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
