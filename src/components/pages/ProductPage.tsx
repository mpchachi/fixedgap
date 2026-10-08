'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cta, home, page, PageHero, Reveal, SectionHead, Visual, type Media } from '@/components/site/Editorial';
import TiltCard from '@/components/home/motion/TiltCard';
import MagneticLink from '@/components/home/motion/MagneticLink';

/* Visuals for this page. Brief in /public/home/IMAGES.md (Product section).
   The games change often, so no visual shows a specific game: they show the
   patient and the movement. */
const media: Record<string, Media> = {
  pinch: {
    src: '/home/product-pinch.webp',
    ratio: '4 / 3',
    label: 'Playing from home: a pinch in front of the laptop',
    note: '',
  },
  open: {
    src: '/home/product-open.webp',
    ratio: '4 / 3',
    label: 'Playing from home: opening the hand toward the camera',
    note: '',
  },
  wrist: {
    src: '/home/product-wrist.webp',
    ratio: '4 / 3',
    label: 'Playing from home: rotating the wrist in front of the laptop',
    note: '',
  },
  tracking: {
    src: '/about/about-4.jpeg',
    ratio: '1536 / 736',
    label: 'What the camera sees: live hand tracking and the metrics panel',
    note: 'Real screenshot of the current build.',
  },
};

const movements = [
  {
    index: '01',
    name: 'Pinch and fine motor control',
    media: media.pinch,
    text: 'The game asks for a pinch: thumb and index closing and opening on cue. Precision, speed and smoothness are captured frame by frame.',
    measures: 'Pinch precision, reach precision, endpoint overshoot, movement smoothness (SPARC)',
    why: 'Pinch grip is what buttoning, writing and picking things up depend on. It degrades immediately after stroke and its recovery is a milestone the FMA-UE scale tracks.',
  },
  {
    index: '02',
    name: 'Finger extension and left-right asymmetry',
    media: media.open,
    text: 'The game asks the hand to open and the index to extend, alternating sides. The system captures how far, how fast, and the gap between both hands.',
    measures: 'Index extension accuracy, hand opening speed, reach precision, smoothness (SPARC), inter-hand asymmetry',
    why: 'Losing isolated finger extension is one of the most common and disabling consequences of stroke. Alternating sides reveals the asymmetry between the affected and unaffected hand.',
  },
  {
    index: '03',
    name: 'Wrist rotation',
    media: media.wrist,
    text: 'The game is steered by rotating the wrist. The rotation captures pronation and supination range, one of the most clinically relevant movements after stroke.',
    measures: 'Rotation range of motion, pronation and supination speed, smoothness (SPARC)',
    why: 'Wrist rotation is among the first movements affected and the last to recover. Measured most days, it draws a recovery curve instead of a point per visit.',
  },
];

type Metric = { name: string; code: string; text: string; insight: string; spark: number[] };

const categories: Array<{ id: string; label: string; subtitle: string; metrics: Metric[] }> = [
  {
    id: 'pinch',
    label: 'Pinch',
    subtitle: 'Fine motor control',
    metrics: [
      {
        name: 'Pinch precision',
        code: 'M1 pinch_precision',
        text: 'Normalised distance between thumb tip and index tip relative to palm width. Accuracy and consistency of the pinch.',
        insight: 'Core marker of distal hand function after stroke. Maps directly to the FMA-UE pinch item.',
        spark: [38, 41, 40, 46, 52, 55, 61, 64],
      },
      {
        name: 'Reach precision',
        code: 'reach_precision',
        text: 'Distance between where the reach ends and the target, plus transit time. Visuomotor coordination and spatial accuracy.',
        insight: 'Integration of vision and hand movement is one of the first functions to degrade after stroke.',
        spark: [30, 34, 33, 39, 44, 49, 53, 58],
      },
      {
        name: 'Endpoint overshoot',
        code: 'endpoint_overshoot',
        text: 'Distance between the stopping position and the intended target. The tendency to overshoot or undershoot (dysmetria).',
        insight: 'Dysmetria signals cerebellar and motor cortex damage. Session by session it shows recovery of motor planning.',
        spark: [70, 66, 64, 58, 52, 50, 44, 40],
      },
      {
        name: 'Movement smoothness',
        code: 'M11 SPARC',
        text: 'Spectral arc length of the velocity profile. Healthy movement is smooth; after a stroke it turns fragmented.',
        insight: 'One of the most sensitive kinematic markers of motor recovery, and it correlates with FMA-UE scores.',
        spark: [28, 31, 36, 38, 45, 51, 56, 63],
      },
    ],
  },
  {
    id: 'open',
    label: 'Hand opening',
    subtitle: 'Finger extension and asymmetry',
    metrics: [
      {
        name: 'Index extension accuracy',
        code: 'index_extension_acc',
        text: 'Angle at the metacarpophalangeal joint as the index extends toward the target. Isolated finger extension.',
        insight: 'Recovering isolated finger extension is a sign of cortical reorganisation.',
        spark: [22, 26, 31, 33, 40, 46, 50, 57],
      },
      {
        name: 'Hand opening speed',
        code: 'M2',
        text: 'Speed at which all five fingers separate from the palm centroid. How quickly the hand opens voluntarily.',
        insight: 'Drops sharply after stroke and recovers in a predictable pattern, which makes it a reliable longitudinal marker.',
        spark: [34, 36, 41, 43, 48, 55, 58, 62],
      },
      {
        name: 'Reach precision',
        code: 'reach_precision',
        text: 'Endpoint distance and transit time during the reach toward the switch.',
        insight: 'Measuring the same metric across tasks shows whether a deficit is task-specific or general.',
        spark: [31, 35, 34, 40, 45, 48, 54, 57],
      },
      {
        name: 'Movement smoothness',
        code: 'M11 SPARC',
        text: 'Smoothness of the reach toward the switch. Fragmented movement indicates impaired motor control.',
        insight: 'Identified as the gold standard smoothness metric in a systematic review of 32 kinematic metrics.',
        spark: [29, 33, 35, 41, 44, 50, 57, 61],
      },
    ],
  },
  {
    id: 'wrist',
    label: 'Wrist',
    subtitle: 'Rotation, pronation and supination',
    metrics: [
      {
        name: 'Rotation range of motion',
        code: 'M4 range_of_motion',
        text: 'Maximum wrist rotation angle, normalised by the patient’s own baseline. How far the wrist rotates in a pouring motion.',
        insight: 'Among the first movements affected and the last to recover. Daily tracking captures the recovery curve precisely.',
        spark: [40, 42, 47, 49, 55, 58, 64, 69],
      },
      {
        name: 'Pronation and supination speed',
        code: 'pronosup_speed',
        text: 'Mean angular velocity of the repeated rotation. How quickly the forearm pronates and supinates.',
        insight: 'A direct proxy for motor fluency and muscle coordination in the upper limb.',
        spark: [33, 37, 38, 44, 47, 53, 56, 60],
      },
      {
        name: 'Movement smoothness',
        code: 'M11 SPARC',
        text: 'Smoothness of the rotation velocity profile during the pour.',
        insight: 'Fragmented rotation, even with adequate range, indicates persisting motor control impairment.',
        spark: [30, 32, 37, 40, 46, 49, 55, 60],
      },
    ],
  },
  {
    id: 'derived',
    label: 'Derived',
    subtitle: 'Across both hands and over time',
    metrics: [
      {
        name: 'Inter-hand asymmetry index',
        code: 'asymmetry_index',
        text: 'Ratio of the affected hand to the unaffected hand for velocity, precision and smoothness. The performance gap between both hands.',
        insight: 'Post-stroke impairment is almost always asymmetric. How the gap closes over time is one of the most meaningful recovery indicators.',
        spark: [72, 70, 66, 61, 58, 52, 47, 43],
      },
      {
        name: 'Recovery gap',
        code: 'recovery_gap',
        text: 'Absolute difference between unaffected and affected hand performance, session by session.',
        insight: 'How far the affected hand is from the other one, and whether that distance is shrinking.',
        spark: [68, 65, 63, 57, 54, 49, 45, 41],
      },
    ],
  },
];

const report = [
  {
    title: 'Clinical recovery index',
    text: 'A single score per session that summarises the core metrics, so the trend is visible at a glance.',
  },
  {
    title: 'Hand kinematics',
    text: 'Pinch precision, reach accuracy, endpoint overshoot, wrist rotation range and smoothness, tracked session by session.',
  },
  {
    title: 'Inter-hand asymmetry',
    text: 'The gap between the affected and unaffected hand, and whether it is closing.',
  },
  {
    title: 'Adherence and consistency',
    text: 'Which days the patient showed up, how long each session lasted, and when they stopped.',
  },
];

export default function ProductPage() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <main className={home.page}>
      <PageHero
        kicker="Product"
        title={'Three short games at home,\none report before the next visit.'}
        lead="Patients play three short arcade games in front of the webcam they already have. FixedGap measures the hand in every frame and turns the session into a report the neurologist reads before the next appointment."
      >
        <div className={page.heroFacts}>
          <div><strong>3</strong><span>short games per session</span></div>
          <div><strong>&lt;5 min</strong><span>of play per session</span></div>
          <div><strong>21</strong><span>hand landmarks tracked</span></div>
        </div>
      </PageHero>

      <section className={`${home.section} ${page.anchor}`} id="demo">
        <div className={home.shell}>
          <SectionHead
            kicker="Walkthrough"
            title="A full session, start to finish."
            lead="Recorded on the current build. This is what the patient does at home and what the clinician receives afterwards."
          />
          <Reveal>
            <div className={page.video}>
              <video controls playsInline preload="metadata" poster="/clinical/dashboard.png">
                <source src="/DemoTecnica.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className={page.video} style={{ marginTop: 28 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/UqnF2CcWmIo"
                title="FixedGap: Meet Maria"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className={page.videoCaption}>Meet Maria: a patient&apos;s story, two minutes.</p>
          </Reveal>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor} ${page.onTint}`} id="exercises">
        <div className={home.shell}>
          <SectionHead
            kicker="The games"
            title="Games people already know how to play, steered by the movements we need to measure."
            lead="Three short retro arcade games, familiar enough to need no instructions. The games will keep changing over time; the three movements they are built around will not."
          />
          {movements.map((exercise, index) => (
            <Reveal key={exercise.name}>
              <div className={`${page.feature} ${index % 2 === 1 ? page.featureReverse : ''}`}>
                <TiltCard className={home.tilt}>
                  <Visual item={exercise.media} sizes="(max-width: 760px) 100vw, 540px" />
                </TiltCard>
                <div className={page.featureCopy}>
                  <div className={page.featureIndex}>
                    <em>{exercise.index}</em>
                    <span>Movement</span>
                  </div>
                  <h3>{exercise.name}</h3>
                  <p>{exercise.text}</p>
                  <div className={page.featureMeta}>
                    <span>What it measures</span>
                    <p>{exercise.measures}</p>
                  </div>
                  <div className={page.featureWhy}>
                    <p>{exercise.why}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${home.section} ${page.anchor}`} id="biomarkers">
        <div className={home.shell}>
          <SectionHead
            kicker="Biomarkers"
            title="What the games measure, and why it matters clinically."
            lead="Every metric comes from the 21 hand landmarks the camera tracks, without wearables or calibration. They are grouped by movement and named as in the clinical literature."
          />
          <Reveal>
            <Visual item={media.tracking} className={home.wideVisual} sizes="1120px" />
          </Reveal>
          <Reveal>
            <div className={page.tabs} role="tablist">
              {categories.map((category) => (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={active === category.id}
                  className={active === category.id ? page.tabActive : ''}
                  onClick={() => setActive(category.id)}
                >
                  <strong>{category.label}</strong>
                  <small>{category.subtitle}</small>
                </button>
              ))}
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={page.metricGrid}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.metrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  className={page.metricCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <h3>{metric.name}</h3>
                  <code>{metric.code}</code>
                  <p>{metric.text}</p>
                  <div className={page.insight}>
                    <span>Clinical insight</span>
                    <p>{metric.insight}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor}`} id="dashboard">
        <div className={home.shell}>
          <SectionHead
            kicker="For the care team"
            title="One view for the care team, ordered by who needs a call."
            lead="After every session the report writes itself, with nothing to type in. Patients are ordered by who needs attention first."
          />
          <Reveal>
            <div className={home.browser}>
              <div className={home.browserBar}>
                <i /><i /><i />
                <span>app.fixedgap.com / patients</span>
              </div>
              <video autoPlay muted loop playsInline poster="/clinical/dashboard.png">
                <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
          <div className={page.reportGrid} style={{ marginTop: 64 }}>
            {report.map((item, index) => (
              <Reveal className={page.reportItem} delay={index * 0.06} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className={home.actions}>
            <MagneticLink className={home.buttonPrimary} href="/contact">
              Book a clinical demo
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      <Cta
        title="See what your patients are doing between appointments."
        text="We run demos for neurologists, rehabilitation clinics and hospitals, and we are looking for partners for the first clinical validation."
        action="Book a demo"
      />
    </main>
  );
}
