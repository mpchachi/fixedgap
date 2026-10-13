'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import styles from './MeasureStory.module.css';

/*
 * Scroll-driven explainer. The section is as tall as four screens; inside it
 * a viewport-high frame stays pinned. The left column is a numbered list
 * where only the active step is open; the right column is a sand stage with
 * a dotted grid on which one diagram is built up step by step: the webcam
 * frame, the 21 landmarks, the measurements drawn between them, and finally
 * the number placed on a trend against the clinical scale.
 */

export type MeasureStep = {
  index: string;
  title: string;
  text: string;
};

const steps: MeasureStep[] = [
  {
    index: '01',
    title: 'The camera sees a hand',
    text: 'A standard laptop webcam, at 30 frames per second. No gloves, no markers, nothing to calibrate. The patient only sees the game.',
  },
  {
    index: '02',
    title: 'Twenty-one points are tracked',
    text: 'On every frame, a hand-tracking model places 21 landmarks on the wrist, knuckles and fingertips. The image itself is never stored; only these coordinates leave the frame.',
  },
  {
    index: '03',
    title: 'Three movements become numbers',
    text: 'Distances and angles between landmarks turn each movement into a measurement: how close thumb and index get, how wide the hand opens, how far the wrist rotates.',
  },
  {
    index: '04',
    title: 'The number is placed on a trend',
    text: 'Every session adds a point. The curve is what the neurologist reads before the next visit, and what we are validating against the Fugl-Meyer scale.',
  },
];

// MediaPipe hand landmark layout for an open right hand, palm to the camera.
const P: Array<[number, number]> = [
  [300, 505],
  [245, 470], [200, 425], [168, 382], [142, 345],
  [245, 355], [232, 280], [224, 222], [218, 172],
  [292, 345], [290, 258], [288, 190], [286, 130],
  [340, 352], [347, 270], [352, 208], [356, 152],
  [385, 372], [405, 310], [418, 265], [428, 225],
];

const BONES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];

const TREND: Array<[number, number]> = [
  [110, 440], [160, 425], [210, 430], [260, 395], [310, 380], [360, 350], [410, 345], [460, 310],
];

const ease = [0.22, 1, 0.36, 1] as const;

function Tag({
  x,
  y,
  label,
  code,
  tone = 'ink',
  delay = 0,
}: {
  x: number;
  y: number;
  label: string;
  code: string;
  tone?: 'ink' | 'blue';
  delay?: number;
}) {
  return (
    <motion.div
      className={`${styles.tag} ${tone === 'blue' ? styles.tagBlue : ''}`}
      style={{ left: `${(x / 600) * 100}%`, top: `${(y / 600) * 100}%` }}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <span>{label}</span>
      <code>{code}</code>
    </motion.div>
  );
}

function Stage({ step, reduce }: { step: number; reduce: boolean }) {
  const dur = (d: number) => (reduce ? 0 : d);
  const showFrame = step <= 2;
  const showHand = step >= 1;
  const handDim = step === 3;
  const showMeasures = step === 2;
  const showTrend = step === 3;

  return (
    <div className={styles.stage}>
      <div className={styles.stageInner}>
        <svg className={styles.svg} viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <filter id="ms-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>

          {/* 01 · the webcam frame */}
          <motion.g
            initial={false}
            animate={{ opacity: showFrame ? 1 : 0 }}
            transition={{ duration: dur(0.6), ease }}
          >
            <rect x="60" y="80" width="480" height="460" rx="10" className={styles.frame} />
            {[
              [60, 80, 1, 1],
              [540, 80, -1, 1],
              [60, 540, 1, -1],
              [540, 540, -1, -1],
            ].map(([x, y, sx, sy], i) => (
              <path
                key={i}
                d={`M${x + sx * 26} ${y} H${x} V${y + sy * 26}`}
                className={styles.corner}
              />
            ))}
            <motion.polygon
              points={[4, 8, 12, 16, 20, 17, 0, 1].map((i) => P[i].join(',')).join(' ')}
              className={styles.blob}
              filter="url(#ms-blur)"
              initial={false}
              animate={{ opacity: step === 0 ? 1 : 0 }}
              transition={{ duration: dur(0.7), ease }}
            />
          </motion.g>

          {/* 02 · landmarks and bones */}
          <motion.g
            initial={false}
            animate={{ opacity: showHand ? (handDim ? 0.07 : 1) : 0 }}
            transition={{ duration: dur(0.7), ease }}
          >
            {BONES.map(([a, b], i) => (
              <motion.line
                key={`${a}-${b}`}
                x1={P[a][0]}
                y1={P[a][1]}
                x2={P[b][0]}
                y2={P[b][1]}
                className={styles.bone}
                initial={false}
                animate={{ pathLength: showHand ? 1 : 0, opacity: showHand ? 1 : 0 }}
                transition={{ duration: dur(0.5), delay: dur(0.02 * i), ease }}
                style={{ pathLength: 0 }}
              />
            ))}
            {P.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={i === 0 ? 6 : 4.5}
                className={styles.dot}
                initial={false}
                animate={{ scale: showHand ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24, delay: dur(0.015 * i) }}
                style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'fill-box' }}
              />
            ))}
          </motion.g>

          {/* 03 · measurements */}
          <motion.g initial={false} animate={{ opacity: showMeasures ? 1 : 0 }} transition={{ duration: dur(0.5), ease }}>
            {/* pinch: thumb tip to index tip */}
            <motion.line
              x1={P[4][0]} y1={P[4][1]} x2={P[8][0]} y2={P[8][1]}
              className={styles.measure}
              initial={false}
              animate={{ pathLength: showMeasures ? 1 : 0 }}
              transition={{ duration: dur(0.6), delay: dur(0.1), ease }}
              style={{ pathLength: 0 }}
            />
            {/* aperture: arc from index tip to little-finger tip around the middle knuckle */}
            <motion.path
              d={`M${P[8][0]} ${P[8][1]} A 135 135 0 0 1 ${P[20][0]} ${P[20][1]}`}
              className={styles.measureDash}
              initial={false}
              animate={{ pathLength: showMeasures ? 1 : 0 }}
              transition={{ duration: dur(0.7), delay: dur(0.3), ease }}
              style={{ pathLength: 0 }}
            />
            {/* rotation: arc around the wrist */}
            <motion.path
              d={`M${P[0][0] - 64} ${P[0][1] - 4} A 66 66 0 0 0 ${P[0][0] + 64} ${P[0][1] - 4}`}
              className={styles.measureDash}
              initial={false}
              animate={{ pathLength: showMeasures ? 1 : 0 }}
              transition={{ duration: dur(0.6), delay: dur(0.5), ease }}
              style={{ pathLength: 0 }}
            />
            {[4, 8, 20, 0].map((i) => (
              <motion.circle
                key={i}
                cx={P[i][0]}
                cy={P[i][1]}
                r={7}
                className={styles.dotBlue}
                initial={false}
                animate={{ scale: showMeasures ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22, delay: dur(0.15) }}
                style={{ transformOrigin: `${P[i][0]}px ${P[i][1]}px`, transformBox: 'fill-box' }}
              />
            ))}
          </motion.g>

          {/* 04 · trend */}
          <motion.g initial={false} animate={{ opacity: showTrend ? 1 : 0 }} transition={{ duration: dur(0.6), ease }}>
            {[150, 230, 310, 390, 470].map((y) => (
              <line key={y} x1="90" x2="520" y1={y} y2={y} className={styles.gridLine} />
            ))}
            <motion.rect
              x="90" y="300" width="430" height="60"
              className={styles.band}
              initial={false}
              animate={{ opacity: showTrend ? 1 : 0 }}
              transition={{ duration: dur(0.6), delay: dur(0.6) }}
            />
            <motion.path
              d={`M${TREND.map((p) => p.join(' ')).join(' L')}`}
              className={styles.trend}
              initial={false}
              animate={{ pathLength: showTrend ? 1 : 0 }}
              transition={{ duration: dur(1.1), delay: dur(0.15), ease }}
              style={{ pathLength: 0 }}
            />
            {TREND.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={i === TREND.length - 1 ? 7 : 4.5}
                className={i === TREND.length - 1 ? styles.dotBlue : styles.dot}
                initial={false}
                animate={{ scale: showTrend ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24, delay: dur(0.15 + i * 0.12) }}
                style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'fill-box' }}
              />
            ))}
          </motion.g>
        </svg>

        <AnimatePresence mode="popLayout">
          {step === 0 && (
            <Tag key="cam" x={80} y={96} label="Webcam" code="30 fps" delay={0.2} />
          )}
          {step === 1 && (
            <>
              <Tag key="l4" x={70} y={300} label="Thumb tip" code="L04" delay={0.35} />
              <Tag key="l8" x={300} y={120} label="Middle tip" code="L12" delay={0.45} />
              <Tag key="l0" x={330} y={515} label="Wrist" code="L00" delay={0.55} />
            </>
          )}
          {step === 2 && (
            <>
              <Tag key="m1" x={70} y={150} label="Pinch distance" code="M1" tone="blue" delay={0.3} />
              <Tag key="m3" x={380} y={110} label="Hand aperture" code="M3" tone="blue" delay={0.5} />
              <Tag key="m5" x={350} y={538} label="Wrist rotation" code="M5" tone="blue" delay={0.7} />
            </>
          )}
          {step === 3 && (
            <>
              <Tag key="t1" x={90} y={110} label="Pinch distance, 8 sessions" code="M1" delay={0.2} />
              <Tag key="t2" x={370} y={270} label="Fugl-Meyer range" code="FMA-UE" tone="blue" delay={0.8} />
              <Tag key="t3" x={420} y={480} label="Week 6" code="S08" delay={1.2} />
            </>
          )}
        </AnimatePresence>

        <div className={styles.counter}>
          <span>{steps[step].index}</span>
          <span>/ 04</span>
        </div>
      </div>
    </div>
  );
}

export default function MeasureStory() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (next !== active) setActive(next);
  });

  return (
    <div className={styles.root} ref={root} style={{ height: `${steps.length * 100}vh` }}>
      <div className={styles.pin}>
        <div className={styles.grid}>
          <div className={styles.list}>
            <p className={styles.eyebrow}>From a webcam frame to a clinical number, in four steps:</p>
            <ol>
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.index} className={`${styles.item} ${on ? styles.itemOn : ''}`}>
                    <button type="button" className={styles.itemHead} onClick={() => setActive(i)} aria-expanded={on}>
                      <span className={styles.num}>{s.index}</span>
                      <span className={styles.title}>{s.title}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          className={styles.body}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.5, ease }}
                        >
                          <p>{s.text}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>
          <Stage step={active} reduce={reduce} />
        </div>
      </div>
    </div>
  );
}
