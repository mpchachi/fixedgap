'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Awards.module.css';

gsap.registerPlugin(ScrollTrigger);

export type Award = {
  year: string;
  event: string;
  title: string;
  detail?: string;
  featured?: boolean;
};

export type PressItem = {
  outlet: string;
  date: string;
  title: string;
  url: string;
};

/*
 * Awards come in as a stack of cards that fan into place on scroll; the
 * featured ones get a slow light sweep. Press items slide in one by one.
 */
export default function AwardsMedia({ awards, press }: { awards: Award[]; press: PressItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(`.${styles.award}`),
        { y: 40, opacity: 0, rotate: -1.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 75%', once: true },
        },
      );
      gsap.fromTo(
        el.querySelectorAll(`.${styles.pressItem}`),
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el.querySelector(`.${styles.press}`), start: 'top 80%', once: true },
        },
      );
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root}>
      <div className={styles.awards}>
        {awards.map((award) => (
          <article className={`${styles.award} ${award.featured ? styles.featured : ''}`} key={award.title}>
            <div className={styles.awardTop}>
              <span>{award.year}</span>
              <span>{award.event}</span>
            </div>
            <h3>{award.title}</h3>
            {award.detail && <p>{award.detail}</p>}
          </article>
        ))}
      </div>

      <div className={styles.press}>
        <p className={styles.pressLabel}>In the press</p>
        {press.map((item) => (
          <a className={styles.pressItem} href={item.url} target="_blank" rel="noreferrer" key={item.url}>
            <div>
              <span>{item.outlet}</span>
              <span>{item.date}</span>
            </div>
            <h3>{item.title}</h3>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </div>
  );
}
