'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const metrics = [
  'Pinch Precision (M1)',
  'Reach Precision',
  'Endpoint Overshoot',
  'Movement Smoothness: SPARC (M11)',
  'Index Extension Accuracy',
  'Hand Opening Speed (M2)',
  'Rotation Range of Motion (M4)',
  'Pronation/Supination Speed',
  'Inter-hand Asymmetry Index',
  'Recovery Gap',
];

const stakeholders = [
  {
    title: 'For clinicians',
    points: [
      'Continuous visibility into recovery between visits',
      'Data-driven decisions instead of patient recall',
      'Earlier detection of deterioration',
      'Better patient prioritization',
    ],
  },
  {
    title: 'For patients',
    points: [
      'Engaging rehabilitation, not repetitive exercises',
      'Feel supported between appointments',
      'Increased motivation and adherence',
      'Awareness of their own progress',
    ],
  },
  {
    title: 'For health systems',
    points: [
      'More patients monitored, same resources',
      'Reduced long-term costs and complications',
      'Fewer unnecessary check-ins',
      'More efficient use of specialist capacity',
    ],
  },
];

export default function Solution() {
  return (
    <>
      {/* PART 1 - One camera. Hand tracking. */}
      <section className="section-y bg-white">
        <div className="container-fg">
          <div className="mx-auto max-w-5xl">
            {/* SEO headings - invisible */}
            <h2 style={srOnly}>Computer Vision Rehabilitation: No Hardware Required</h2>
            <h3 style={srOnly}>Hand tracking with 21 landmarks in real time</h3>
            <h3 style={srOnly}>Clinical-grade movement analysis through any webcam</h3>

            <span className="eyebrow">What we capture</span>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.1] text-brand-navy md:text-5xl">
              One camera.
              <br />
              Clinical-grade hand tracking.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
              Everything a physiotherapist checks in a 15-minute visit, captured
              automatically every session.
            </p>

            {/* Two-column layout */}
            <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* Left - description + metric chips */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="mb-4 text-2xl font-bold text-brand-navy">
                  21 landmarks tracked per hand.
                </h3>
                <p className="mb-8 text-base leading-relaxed text-brand-muted">
                  MediaPipe detects every joint in real time across three clinical
                  games: pinch, finger extension, and wrist rotation. Each movement
                  maps directly to an item on the Fugl-Meyer Assessment scale,
                  captured automatically every session.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2.5 rounded-lg border border-brand-border/80 bg-brand-cream/60 px-3.5 py-2.5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                      <span className="text-[13px] font-medium leading-snug text-brand-navy">
                        {metric}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right - image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-brand-border/60 shadow-[0_24px_48px_-20px_rgba(26,31,60,0.25)]"
              >
                <Image
                  src="/hand-tracking.jpg"
                  alt="FixedGap hand tracking with computer vision"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2 - Value for every stakeholder */}
      <section className="section-y bg-brand-navy">
        <div className="container-fg">
          <div className="mx-auto max-w-5xl">
            <span className="eyebrow !text-white/40">Value proposition</span>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.1] text-white md:text-5xl">
              Value for every stakeholder.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
              FixedGap creates measurable value across the entire care chain.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {stakeholders.map((stakeholder, index) => (
                <motion.div
                  key={stakeholder.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <h3 className="mb-4 text-[17px] font-bold text-white">
                    {stakeholder.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {stakeholder.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7EA6F4]" />
                        <p className="text-[13px] leading-relaxed text-white/60">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
