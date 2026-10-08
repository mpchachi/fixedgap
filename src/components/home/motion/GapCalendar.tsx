'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GapCalendar.module.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * Three months of one recovery, drawn as a calendar. The section pins while
 * the visitor scrolls. At first only the hospital stay and two follow-up
 * visits carry a measurement (smoked glass tiles). As the scroll advances the
 * days at home fill in one by one with blue glass, a sparkline grows under each
 * month, the weekly totals climb, three days open a photo card, and the
 * counter rolls from 14 to 71. Illustrative data; same shape every visit.
 */

const YEAR = 2026;
const MONTHS = [0, 1, 2];
const MONTH_NAMES = ['January', 'February', 'March'];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const DAYS_IN = MONTHS.map((m) => new Date(YEAR, m + 1, 0).getDate());
const TOTAL_DAYS = DAYS_IN.reduce((a, b) => a + b, 0);

const HOSPITAL = { from: 5, to: 16 }; // Jan 5 to Jan 16, discharge on the 16th
const VISITS = [31 + 13, 31 + 28 + 27]; // Feb 13, Mar 27
const MISSED = new Set([19, 25, 26, 33, 41, 47, 48, 55, 61, 62, 68, 74, 75, 82, 88]);

// Days that open a photo card as the fill reaches them.
const PHOTOS: Record<number, { src: string; label: string; side: 'left' | 'right' }> = {
  20: { src: '/home/product-pinch.webp', label: 'Jan 20 · pinch, 4 min', side: 'right' },
  [31 + 10]: { src: '/home/home-patient.webp', label: 'Feb 10 · open hand, 3 min', side: 'right' },
  [31 + 28 + 18]: { src: '/home/product-open.webp', label: 'Mar 18 · wrist, 3 min', side: 'left' },
};

type Kind = 'none' | 'clinic' | 'home' | 'missed';
type Day = { index: number; month: number; date: number; kind: Kind; discharge: boolean; value: number };

// A plausible recovery curve: fast gains in hospital, slower at home, small wobble.
function valueFor(index: number): number {
  const base = 18 + 54 * (1 - Math.exp(-(index - 4) / 34));
  const wobble = Math.sin(index * 1.7) * 2.2 + Math.cos(index * 0.6) * 1.4;
  return Math.max(10, Math.min(80, base + wobble));
}

function buildDays(): Day[] {
  const days: Day[] = [];
  let index = 1;
  MONTHS.forEach((m, mi) => {
    for (let d = 1; d <= DAYS_IN[mi]; d++) {
      const inHospital = index >= HOSPITAL.from && index <= HOSPITAL.to;
      const visit = VISITS.includes(index);
      const afterDischarge = index > HOSPITAL.to;
      let kind: Kind = 'none';
      if (inHospital || visit) kind = 'clinic';
      else if (afterDischarge) kind = MISSED.has(index) ? 'missed' : 'home';
      days.push({ index, month: mi, date: d, kind, discharge: index === HOSPITAL.to, value: valueFor(index) });
      index++;
    }
  });
  return days;
}

function sparkPath(points: Array<{ x: number; y: number }>): string {
  if (points.length < 2) return '';
  // Smooth with a light Catmull-Rom to Bezier conversion.
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

const SPARK_W = 360;
const SPARK_H = 36;

export default function GapCalendar() {
  const root = useRef<HTMLDivElement>(null);
  const days = useMemo(buildDays, []);
  const clinicCount = days.filter((d) => d.kind === 'clinic').length;
  const finalCount = clinicCount + days.filter((d) => d.kind === 'home').length;

  // Sparkline geometry per month (all measured days, clinic + home).
  const sparks = useMemo(
    () =>
      MONTHS.map((_, mi) => {
        const pts = days
          .filter((d) => d.month === mi && (d.kind === 'clinic' || d.kind === 'home'))
          .map((d) => ({
            x: ((d.date - 0.5) / DAYS_IN[mi]) * SPARK_W,
            y: SPARK_H - 4 - ((d.value - 10) / 70) * (SPARK_H - 8),
            kind: d.kind,
          }));
        const clinicPts = pts.filter((p) => p.kind === 'clinic');
        // Fraction of the line already drawn before FixedGap (hospital stay).
        const initial = pts.length > 1 ? Math.max(0, clinicPts.length - 1) / (pts.length - 1) : 0;
        return { path: sparkPath(pts), clinicPts, initial };
      }),
    [days],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ordered = days.filter((d) => d.kind === 'home' || d.kind === 'missed');
    const tiles = ordered.map((d) => el.querySelector<HTMLElement>(`[data-day="${d.index}"] .${styles.fill}`));
    const rings = ordered.map((d) => el.querySelector<HTMLElement>(`[data-day="${d.index}"] .${styles.ring}`));
    const live = <T,>(list: Array<T | null>): T[] => list.filter((x): x is T => !!x);
    const before = q(`.${styles.before}`);
    const after = q(`.${styles.after}`);
    const legendHome = q(`.${styles.legendHome}`);
    const gain = q(`.${styles.gain}`);
    const sparkLines = MONTHS.map((_, mi) => el.querySelector<SVGPathElement>(`[data-spark="${mi}"] path.${styles.sparkLine}`));
    const cards = live(Object.keys(PHOTOS).map((k) => el.querySelector<HTMLElement>(`[data-card="${k}"]`)));
    const weekTotals = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.weekTotal}`));
    const tens = q(`.${styles.tens}`);
    const ones = q(`.${styles.ones}`);
    const lineIn = el.querySelector<SVGPathElement>(`.${styles.lineIn}`);
    const lineOut = el.querySelector<SVGPathElement>(`.${styles.lineOut}`);

    const setCounter = (v: number) => {
      const o = v % 10;
      const t = Math.floor(v / 10) + Math.max(0, o - 9);
      gsap.set(ones, { y: `${-o}em` });
      gsap.set(tens, { y: `${-t}em` });
    };

    // Connector lines: measured from the DOM, recomputed on refresh.
    const drawLines = () => {
      const stage = el.querySelector<HTMLElement>(`.${styles.stage}`);
      const discharge = el.querySelector<HTMLElement>(`[data-day="${HOSPITAL.to}"]`);
      const months = el.querySelectorAll<HTMLElement>(`.${styles.month}`);
      const firstMonth = months[0];
      const last = months[2];
      const counter = el.querySelector<HTMLElement>(`.${styles.counter}`);
      const svg = el.querySelector<SVGSVGElement>(`.${styles.lines}`);
      if (!stage || !discharge || !firstMonth || !last || !counter || !svg || !lineIn) return;
      const s = stage.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);
      const d = discharge.getBoundingClientRect();
      const c = counter.getBoundingClientRect();
      const l = last.getBoundingClientRect();
      const m = firstMonth.getBoundingClientRect();
      const x1 = d.left - s.left + d.width / 2; // discharge column
      const y1 = m.top - s.top - 10; // just above January's header
      const x2 = c.left - s.left;
      const y2 = c.bottom - s.top + 2;
      const midY = y1 - 26;
      lineIn.setAttribute(
        'd',
        `M ${x2} ${y2} L ${x2} ${midY - 30} C ${x2} ${midY - 6}, ${x2 - 10} ${midY}, ${x2 - 34} ${midY} L ${x1 + 34} ${midY} C ${x1 + 10} ${midY}, ${x1} ${midY + 6}, ${x1} ${midY + 30} L ${x1} ${y1}`,
      );
    };

    if (reduce) {
      gsap.set(live(tiles), { scale: 1, opacity: 1 });
      gsap.set([after, legendHome, gain, ...cards], { opacity: 1 });
      gsap.set(before, { opacity: 0 });
      sparkLines.forEach((p) => p && gsap.set(p, { strokeDashoffset: 0 }));
      weekTotals.forEach((w) => (w.textContent = w.dataset.final ?? ''));
      setCounter(finalCount);
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 960px)', mobile: '(max-width: 959px)' }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        drawLines();
        const tl = gsap.timeline({
          scrollTrigger: desktop
            ? { trigger: el, start: 'top 72px', end: '+=280%', pin: true, scrub: 0.6, anticipatePin: 1, onRefresh: drawLines }
            : { trigger: el, start: 'top 75%', end: 'bottom 30%', scrub: 0.6 },
        });

        // Initial state.
        gsap.set(live(tiles), { scale: 0.6, opacity: 0 });
        gsap.set(live(rings), { scale: 0.8, opacity: 0 });
        gsap.set([after, legendHome, gain], { opacity: 0 });
        gsap.set(cards, { opacity: 0, y: 10, scale: 0.96 });
        sparkLines.forEach((p, mi) => p && gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 - sparks[mi].initial }));
        gsap.set(live([lineIn, lineOut]), { strokeDasharray: 1, strokeDashoffset: 1 });
        setCounter(clinicCount);

        const start = 0.16;
        const span = 0.68;
        const atFor = (i: number) => start + (i / ordered.length) * span;

        // Beat 1: the line from the discharge cell climbs to the counter.
        lineIn && tl.to(lineIn, { strokeDashoffset: 0, duration: start * 0.9, ease: 'none' }, 0.02);

        // Beat 2: the days at home fill in, one by one.
        ordered.forEach((d, i) => {
          const at = atFor(i);
          const tile = tiles[i];
          if (!tile) return;
          if (d.kind === 'home') {
            tl.to(tile, { scale: 1, opacity: 1, duration: 0.028, ease: 'back.out(2.2)' }, at);
            rings[i] && tl.fromTo(rings[i], { scale: 0.8, opacity: 0.55 }, { scale: 1.9, opacity: 0, duration: 0.05, ease: 'power2.out' }, at);
          } else {
            tl.to(tile, { scale: 1, opacity: 1, duration: 0.03, ease: 'power1.out' }, at);
          }
          const card = PHOTOS[d.index] ? el.querySelector<HTMLElement>(`[data-card="${d.index}"]`) : null;
          if (card) tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.05, ease: 'power2.out' }, at + 0.01);
        });

        // Sparklines grow with their month.
        MONTHS.forEach((_, mi) => {
          const idx = ordered.map((d, i) => (d.month === mi && d.kind === 'home' ? i : -1)).filter((i) => i >= 0);
          if (!idx.length || !sparkLines[mi]) return;
          tl.to(sparkLines[mi], { strokeDashoffset: 0, duration: atFor(idx[idx.length - 1]) - atFor(idx[0]) + 0.03, ease: 'none' }, atFor(idx[0]));
        });

        // Weekly totals count up as their row fills.
        weekTotals.forEach((w) => {
          const first = Number(w.dataset.first);
          const last = Number(w.dataset.last);
          const base = Number(w.dataset.base);
          const fin = Number(w.dataset.finalN);
          if (fin === base) return;
          const i0 = ordered.findIndex((d) => d.index >= first);
          const i1 = ordered.findIndex((d) => d.index > last);
          const num = { v: base };
          tl.to(num, {
            v: fin,
            duration: Math.max(0.02, atFor(i1 < 0 ? ordered.length : i1) - atFor(i0)),
            ease: 'none',
            onUpdate: () => {
              w.textContent = `${Math.round(num.v)}/${w.dataset.days}`;
            },
          }, atFor(i0));
        });

        // Counter rolls with the fill.
        const num = { v: clinicCount };
        tl.to(num, { v: finalCount, duration: span, ease: 'none', onUpdate: () => setCounter(num.v) }, start);

        // Caption swaps halfway through.
        tl.to(before, { opacity: 0, y: -8, duration: 0.08 }, start + span * 0.45);
        tl.to(after, { opacity: 1, y: 0, duration: 0.1 }, start + span * 0.5);
        tl.to(legendHome, { opacity: 1, duration: 0.06 }, start);

        // Beat 3: the gain badge and the line down to the dashboard.
        tl.to(gain, { opacity: 1, y: 0, duration: 0.06 }, start + span + 0.02);
        tl.to({}, { duration: 0.04 });
      });
    }, el);

    const ro = new ResizeObserver(() => drawLines());
    ro.observe(el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ctx.revert();
    };
  }, [days, sparks, clinicCount, finalCount]);

  const countFinal = String(finalCount).padStart(2, '0');

  return (
    <div className={styles.root} ref={root}>
      <div className={styles.stage}>
        <div className={styles.ghost} aria-hidden="true" />
        <svg className={styles.lines} aria-hidden="true" preserveAspectRatio="none">
          <path className={styles.lineIn} pathLength={1} />
        </svg>

        <div className={styles.copy}>
          <div className={styles.copyMain}>
            <p className={styles.kicker}>The gap</p>
            <h2 className={styles.title}>Recovery is measured in hospital. Then it goes home.</h2>
          </div>
          <div className={styles.counter}>
            <div className={styles.odometer} aria-label={`${countFinal} days with a hand measurement out of ${TOTAL_DAYS}`}>
              <span className={styles.digit}>
                <span className={`${styles.strip} ${styles.tens}`}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i}>{i}</span>
                  ))}
                </span>
              </span>
              <span className={styles.digit}>
                <span className={`${styles.strip} ${styles.ones}`}>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span key={i}>{i % 10}</span>
                  ))}
                </span>
              </span>
              <span className={styles.gain}>×{(finalCount / clinicCount).toFixed(0)}</span>
            </div>
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
            const monthDays = days.filter((d) => d.month === mi);
            const rows = Math.ceil((offset + monthDays.length) / 7);
            const spark = sparks[mi];
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
                  {Array.from({ length: rows }).map((_, r) => {
                    const cells: Array<Day | null> = [];
                    for (let c = 0; c < 7; c++) {
                      const n = r * 7 + c - offset;
                      cells.push(n >= 0 && n < monthDays.length ? monthDays[n] : null);
                    }
                    const real = cells.filter((d): d is Day => !!d);
                    const base = real.filter((d) => d.kind === 'clinic').length;
                    const fin = base + real.filter((d) => d.kind === 'home').length;
                    return (
                      <div className={styles.row} key={r}>
                        {cells.map((d, c) =>
                          d ? (
                            <span
                              className={`${styles.cell} ${styles[`cell_${d.kind}`]} ${d.discharge ? styles.cellDischarge : ''}`}
                              data-day={d.index}
                              key={d.index}
                            >
                              <span className={styles.fill}>
                                <span className={styles.ring} />
                              </span>
                              <span className={styles.date}>{d.date}</span>
                            </span>
                          ) : (
                            <span className={`${styles.cell} ${styles.cellEmpty}`} key={`e${r}${c}`} />
                          ),
                        )}
                      </div>
                    );
                  })}
                </div>
                <svg className={styles.spark} viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} preserveAspectRatio="none" data-spark={mi}>
                  <path className={styles.sparkLine} d={spark.path} pathLength={1} />
                  {spark.clinicPts.map((p, i) => (
                    <circle className={styles.sparkDot} cx={p.x} cy={p.y} r={1.5} key={i} />
                  ))}
                </svg>
                {monthDays
                  .filter((d) => PHOTOS[d.index])
                  .map((d) => {
                    const photo = PHOTOS[d.index];
                    const n = offset + d.date - 1;
                    const r = Math.floor(n / 7);
                    const c = n % 7;
                    return (
                      <figure
                        className={`${styles.card} ${photo.side === 'left' ? styles.cardLeft : ''}`}
                        data-card={d.index}
                        key={d.index}
                        style={{ '--r': r, '--c': c, '--tilt': photo.side === 'left' ? '0.8deg' : '-0.8deg' } as React.CSSProperties}
                      >
                        <Image src={photo.src} alt="" width={132} height={88} sizes="132px" />
                        <figcaption>{photo.label}</figcaption>
                      </figure>
                    );
                  })}
              </div>
            );
          })}
          <div className={styles.foot}>
            <ul className={styles.legend}>
              <li>
                <i className={`${styles.swatch} ${styles.swatchClinic}`} /> Measured in hospital or at a visit
              </li>
              <li className={styles.legendHome}>
                <i className={`${styles.swatch} ${styles.swatchHome}`} /> Measured at home with FixedGap
              </li>
              <li>
                <i className={`${styles.swatch} ${styles.swatchMissed}`} /> Skipped day
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
