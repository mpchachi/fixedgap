'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GapCalendar.module.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * Three months of a recovery, drawn as a calendar. The section pins while the
 * visitor scrolls: at first only the hospital stay and two follow-up visits
 * carry a measurement; as the scroll advances, the days at home fill in one by
 * one and the counter climbs. Illustrative data, same shape every visit.
 */

const YEAR = 2026;
const MONTHS = [0, 1, 2]; // January to March
const MONTH_NAMES = ['January', 'February', 'March'];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// Day-of-year helpers (1-based within the three months).
const DAYS_IN = MONTHS.map((m) => new Date(YEAR, m + 1, 0).getDate());
const TOTAL_DAYS = DAYS_IN.reduce((a, b) => a + b, 0); // 90

const HOSPITAL = { from: 5, to: 16 }; // Jan 5 to Jan 16, discharge on the 16th
const VISITS = [31 + 13, 31 + 28 + 27]; // Feb 13, Mar 27
// Days at home with no session (illustrative adherence gaps).
const MISSED = new Set([19, 25, 26, 33, 41, 47, 48, 55, 61, 62, 68, 74, 75, 82, 88]);

type Day = { index: number; month: number; date: number; kind: 'none' | 'clinic' | 'home'; discharge: boolean };

function buildDays(): Day[] {
  const days: Day[] = [];
  let index = 1;
  MONTHS.forEach((m, mi) => {
    for (let d = 1; d <= DAYS_IN[mi]; d++) {
      const inHospital = index >= HOSPITAL.from && index <= HOSPITAL.to;
      const visit = VISITS.includes(index);
      const home = index > HOSPITAL.to && !visit && !MISSED.has(index);
      days.push({
        index,
        month: mi,
        date: d,
        kind: inHospital || visit ? 'clinic' : home ? 'home' : 'none',
        discharge: index === HOSPITAL.to,
      });
      index++;
    }
  });
  return days;
}

export default function GapCalendar() {
  const root = useRef<HTMLDivElement>(null);
  const days = useMemo(buildDays, []);
  const clinicCount = days.filter((d) => d.kind === 'clinic').length;
  const finalCount = clinicCount + days.filter((d) => d.kind === 'home').length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = el.querySelector<HTMLElement>(`.${styles.count}`);
    const homeDots = el.querySelectorAll<HTMLElement>(`.${styles.dotHome}`);
    const before = el.querySelector(`.${styles.before}`);
    const after = el.querySelector(`.${styles.after}`);
    const legendHome = el.querySelector(`.${styles.legendHome}`);

    if (reduce) {
      gsap.set(homeDots, { scale: 1, opacity: 1 });
      gsap.set([after, legendHome], { opacity: 1 });
      gsap.set(before, { opacity: 0 });
      if (counter) counter.textContent = String(finalCount);
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: '(min-width: 960px)', mobile: '(max-width: 959px)' },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const tl = gsap.timeline({
            scrollTrigger: desktop
              ? { trigger: el, start: 'top 72px', end: '+=260%', pin: true, scrub: 0.5, anticipatePin: 1 }
              : { trigger: el, start: 'top 75%', end: 'bottom 35%', scrub: 0.5 },
          });

          // Beat 1: hold the "before" state so the gap is seen.
          gsap.set(homeDots, { scale: 0, opacity: 0 });
          gsap.set([after, legendHome], { opacity: 0 });
          const start = 0.14;
          const span = 0.7;

          // Beat 2: days at home fill in, one by one, in date order.
          homeDots.forEach((dot, i) => {
            const at = start + (i / homeDots.length) * span;
            tl.to(dot, { scale: 1, opacity: 1, duration: 0.03, ease: 'back.out(2.5)' }, at);
          });

          // Counter climbs with the dots.
          const num = { v: clinicCount };
          tl.to(
            num,
            {
              v: finalCount,
              duration: span,
              ease: 'none',
              onUpdate: () => {
                if (counter) counter.textContent = String(Math.round(num.v));
              },
            },
            start,
          );

          // Caption swaps halfway through the fill.
          tl.to(before, { opacity: 0, y: -8, duration: 0.08 }, start + span * 0.45);
          tl.to(after, { opacity: 1, y: 0, duration: 0.1 }, start + span * 0.5);
          tl.to(legendHome, { opacity: 1, duration: 0.06 }, start);

          // Beat 3: hold the finished calendar.
          tl.to({}, { duration: 1 - (start + span) });
        },
      );
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [clinicCount, finalCount]);

  return (
    <div className={styles.root} ref={root}>
      <div className={styles.stage}>
        <div className={styles.copy}>
          <div className={styles.copyMain}>
            <p className={styles.kicker}>The gap</p>
            <h2 className={styles.title}>Recovery is measured in hospital. Then it goes home.</h2>
          </div>
          <div className={styles.counter} aria-live="off">
            <span className={styles.count}>{clinicCount}</span>
            <span className={styles.countLabel}>
              days with a hand measurement
              <br />
              out of {TOTAL_DAYS}
            </span>
          </div>
          <div className={styles.captions}>
            <p className={styles.before}>
              After discharge, the next measurement is the follow-up visit, weeks later. Between
              visits, nobody knows whether the hand is improving.
            </p>
            <p className={styles.after}>
              With FixedGap, a short game at home becomes a measurement most days. Same movements,
              same metrics, in the clinician&apos;s dashboard.
            </p>
          </div>
        </div>

        <div className={styles.months} aria-hidden="true">
          {MONTHS.map((m, mi) => {
            const offset = (new Date(YEAR, m, 1).getDay() + 6) % 7; // Monday first
            return (
              <div className={styles.month} key={m}>
                <div className={styles.monthHead}>
                  <span>{MONTH_NAMES[mi]}</span>
                  <span>{YEAR}</span>
                </div>
                <div className={styles.weekdays}>
                  {WEEKDAYS.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </div>
                <div className={styles.grid}>
                  {Array.from({ length: offset }).map((_, i) => (
                    <span className={`${styles.cell} ${styles.cellEmpty}`} key={`e${i}`} />
                  ))}
                  {days
                    .filter((d) => d.month === mi)
                    .map((d) => (
                      <span
                        className={`${styles.cell} ${d.discharge ? styles.cellDischarge : ''}`}
                        key={d.index}
                      >
                        <span className={styles.date}>{d.date}</span>
                        {d.kind === 'clinic' && <span className={`${styles.dot} ${styles.dotClinic}`} />}
                        {d.kind === 'home' && <span className={`${styles.dot} ${styles.dotHome}`} />}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
          <div className={styles.foot}>
          <ul className={styles.legend}>
            <li>
              <i className={`${styles.swatch} ${styles.swatchClinic}`} /> Measured in hospital or at a
              visit
            </li>
            <li className={styles.legendHome}>
              <i className={`${styles.swatch} ${styles.swatchHome}`} /> Measured at home with FixedGap
            </li>
            <li>
              <i className={`${styles.swatch} ${styles.swatchDischarge}`} /> Discharge
            </li>
          </ul>
          <p className={styles.note}>Illustrative data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
