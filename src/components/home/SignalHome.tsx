'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SignalHome.module.css';

/*
 * Every visual on this page is declared here. `src: null` renders a labelled
 * placeholder that says what image goes there and in which format. To ship an
 * image, drop the file in /public/home/ and set `src` to its path.
 * The full brief with prompts lives in /public/home/IMAGES.md.
 */
const media = {
  heroSession: {
    src: null as string | null,
    ratio: '16 / 9',
    label: 'Patient session at home',
    note: 'A person at a kitchen table doing a hand exercise in front of a laptop, soft daylight, editorial photo.',
  },
  pillarHome: {
    src: null as string | null,
    ratio: '1 / 1',
    label: 'Hand and webcam',
    note: 'Close-up of a hand mid-exercise seen by a laptop camera, neutral background.',
  },
  pillarLandmarks: {
    src: null as string | null,
    ratio: '1 / 1',
    label: '21 hand landmarks',
    note: 'A hand with 21 small dots and thin connecting lines, flat technical style on white.',
  },
  pillarClinician: {
    src: null as string | null,
    ratio: '1 / 1',
    label: 'Clinician reviewing trends',
    note: 'A clinician at a desk looking at patient trend charts on a monitor.',
  },
  gloveSketch: {
    src: null as string | null,
    ratio: '4 / 3',
    label: 'Glove prototype, technical sketch',
    note: 'Ink-and-pencil flow sketch of the 2025 glove: IMU, flex sensors, EMG pads, wiring to a microcontroller, annotated.',
  },
  cameraSketch: {
    src: null as string | null,
    ratio: '4 / 3',
    label: 'Camera version, technical sketch',
    note: 'Same sketch style: a bare hand, a laptop camera, dashed sight lines, 21 landmark dots. Nothing on the hand.',
  },
  pipelineDiagram: {
    src: null as string | null,
    ratio: '21 / 9',
    label: 'Pipeline schematic',
    note: 'Clean line diagram, left to right: webcam, hand landmarks, measurement table, clinician dashboard.',
  },
  exercisePills: {
    src: null as string | null,
    ratio: '4 / 3',
    label: 'Pill Organizer exercise',
    note: 'Studio 3D render of a weekly pill organizer with coloured pills, soft shadows, cream background.',
  },
  exerciseSwitch: {
    src: null as string | null,
    ratio: '4 / 3',
    label: 'Light Switch exercise',
    note: 'Studio 3D render of a desk with two lamps and wall switches, same style and background.',
  },
  exerciseJug: {
    src: null as string | null,
    ratio: '4 / 3',
    label: 'Water Jug exercise',
    note: 'Studio 3D render of a clay jug pouring water into a glass, same style and background.',
  },
  team: {
    src: null as string | null,
    ratio: '21 / 9',
    label: 'The team',
    note: 'Wide photo of the team working around a table, plain wall, window light, laptops showing the dashboard.',
  },
};

type Media = (typeof media)[keyof typeof media];

const partners = [
  { name: 'AWS', logo: '/logos/aws.png' },
  { name: 'Bosch', logo: '/logos/BoschDefinitivo.png' },
  { name: 'Universidad Complutense', logo: '/logos/Universidad_Complutense.png' },
  { name: 'Real Colegio Complutense', logo: '/logos/Real_Colegio_Complutense.png' },
  { name: 'Comunidad de Madrid', logo: '/logos/ComunidadMadrid.png' },
  { name: 'Saturno Labs', logo: '/logos/saturno.png' },
];

const pillars = [
  {
    media: media.pillarHome,
    title: 'The patient plays at home.',
    body: 'Short guided tasks in the browser, under five minutes, in front of a standard webcam. Nothing to install, nothing to wear.',
  },
  {
    media: media.pillarLandmarks,
    title: 'The camera does the measuring.',
    body: 'Twenty-one hand landmarks on every frame become a fixed set of motor measurements: dexterity, range, quality, symmetry.',
  },
  {
    media: media.pillarClinician,
    title: 'The clinician sees the trend.',
    body: 'Every session lands in one view, ordered by who needs attention, so the next appointment starts with data instead of memory.',
  },
];

const steps = [
  { title: 'Capture', body: 'The patient does a short task. The webcam records it in the browser.' },
  { title: 'Track', body: 'Twenty-one hand landmarks are located on every frame.' },
  { title: 'Measure', body: 'Landmark trajectories become the same set of measurements, every session.' },
  { title: 'Review', body: 'Clinicians see trends, adherence and alerts for each patient.' },
];

const measurements = [
  { name: 'Dexterity', body: 'Pinch precision, finger extension and hand-opening speed.' },
  { name: 'Range of motion', body: 'Reach distance, wrist rotation and pronation-supination range.' },
  { name: 'Movement quality', body: 'Smoothness, endpoint overshoot and execution speed.' },
  { name: 'Symmetry', body: 'Differences between hands and change from one session to the next.' },
];

const exercises = [
  { media: media.exercisePills, name: 'Pill Organizer', target: 'Pinch and fine motor control' },
  { media: media.exerciseSwitch, name: 'Light Switch', target: 'Finger extension and left-right asymmetry' },
  { media: media.exerciseJug, name: 'Water Jug', target: 'Wrist rotation, pronation and supination' },
];

const evidence = [
  ['69%', 'of stroke patients are not doing the rehabilitation prescribed at home.'],
  ['44%', 'receive no home health or outpatient therapy after discharge.'],
  ['1 in 3', 'stops rehabilitating before recovery is complete.'],
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Visual({ item, className = '', sizes = '100vw' }: { item: Media; className?: string; sizes?: string }) {
  return (
    <div className={`${styles.visual} ${className}`} style={{ aspectRatio: item.ratio }}>
      {item.src ? (
        <Image src={item.src} alt={item.label} fill sizes={sizes} />
      ) : (
        <div className={styles.visualPlaceholder} aria-label={`Image placeholder: ${item.label}`}>
          <span>{item.label}</span>
          <small>{item.note}</small>
          <em>{item.ratio.replace(' ', '').replace(' ', '')}</em>
        </div>
      )}
    </div>
  );
}

export default function SignalHome() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.kicker}>For stroke rehabilitation teams</p>
            <h1>
              Motor recovery,
              <br />
              measured between visits.
            </h1>
            <p className={styles.lead}>
              Patients do short upper-limb tasks at home in front of a standard webcam.
              FixedGap measures the movement and shows the care team how each patient is
              changing between appointments.
            </p>
            <div className={styles.actions}>
              <Link className={styles.buttonPrimary} href="/contact">
                Book a clinical demo
              </Link>
              <Link className={styles.buttonText} href="/demo">
                See how it works <span>›</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Visual item={media.heroSession} className={styles.heroVisual} sizes="(max-width: 900px) 100vw, 1200px" />
          </motion.div>

          <div className={styles.heroFacts}>
            <div>
              <strong>21</strong>
              <span>hand landmarks tracked per frame</span>
            </div>
            <div>
              <strong>1</strong>
              <span>standard webcam, no extra hardware</span>
            </div>
            <div>
              <strong>&lt;5 min</strong>
              <span>per session, from home</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.logos}>
        <div className={styles.shell}>
          <p>Supported by</p>
          <div className={styles.logoRow}>
            {partners.map((partner) => (
              <div key={partner.name}>
                <Image src={partner.logo} alt={partner.name} width={160} height={64} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <h2>One camera. Three people who benefit.</h2>
          </Reveal>
          <div className={styles.pillars}>
            {pillars.map((pillar, index) => (
              <Reveal className={styles.pillar} delay={index * 0.08} key={pillar.title}>
                <Visual item={pillar.media} sizes="(max-width: 900px) 100vw, 400px" />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>How we got here</p>
            <h2>The first version was a glove.</h2>
            <p className={styles.sectionLead}>
              Built in 36 hours at a hackathon, the glove combined motion sensors, flex
              sensors and muscle signals. It proved the measurements were possible. It
              also showed that nobody would wear it at home every day. So we rebuilt the
              whole thing around a camera.
            </p>
          </Reveal>
          <div className={styles.twoUp}>
            <Reveal className={styles.card}>
              <Visual item={media.gloveSketch} sizes="(max-width: 900px) 100vw, 600px" />
              <div className={styles.cardCopy}>
                <span>2025 prototype</span>
                <h3>Glove with nine sensors</h3>
                <p>Accurate, and impossible to scale. Every patient needed hardware shipped, charged and calibrated.</p>
              </div>
            </Reveal>
            <Reveal className={styles.card} delay={0.1}>
              <Visual item={media.cameraSketch} sizes="(max-width: 900px) 100vw, 600px" />
              <div className={styles.cardCopy}>
                <span>Today</span>
                <h3>A webcam and a browser</h3>
                <p>The same measurements, from the laptop the patient already owns. Nothing to install.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>How it works</p>
            <h2>Four steps from a webcam to data a clinician can review.</h2>
          </Reveal>
          <Reveal>
            <Visual item={media.pipelineDiagram} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1200px" />
          </Reveal>
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <Reveal className={styles.step} delay={index * 0.06} key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.shell}>
          <div className={styles.split}>
            <Reveal className={styles.splitCopy}>
              <p className={styles.kicker}>What we measure</p>
              <h2>Each task isolates a movement.</h2>
              <p className={styles.sectionLead}>
                The same measurements are taken on every session, so a clinician can
                compare today with last week instead of relying on memory or on what the
                patient reports.
              </p>
            </Reveal>
            <div className={styles.measureList}>
              {measurements.map((item, index) => (
                <Reveal className={styles.measureItem} delay={index * 0.06} key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>The exercises</p>
            <h2>Simple tasks for patients. Consistent measurements for clinicians.</h2>
          </Reveal>
          <div className={styles.exercises}>
            {exercises.map((exercise, index) => (
              <Reveal className={styles.card} delay={index * 0.08} key={exercise.name}>
                <Visual item={exercise.media} sizes="(max-width: 900px) 100vw, 400px" />
                <div className={styles.cardCopy}>
                  <h3>{exercise.name}</h3>
                  <p>{exercise.target}</p>
                  <Link href="/product/experience">See the exercise <span>›</span></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>For the care team</p>
            <h2>See who is improving, and who needs a call.</h2>
            <p className={styles.sectionLead}>
              Session results, adherence and alerts for every patient in one view,
              ordered by who needs attention first.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <i /><i /><i />
                <span>FixedGap Clinical</span>
              </div>
              <video autoPlay muted loop playsInline preload="metadata">
                <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>Why it matters</p>
            <h2>The monitoring gap begins after discharge.</h2>
          </Reveal>
          <div className={styles.evidence}>
            {evidence.map(([value, text], index) => (
              <Reveal className={styles.evidenceItem} delay={index * 0.06} key={value}>
                <strong>{value}</strong>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link className={styles.buttonText} href="/science/evidence">
              Read the clinical evidence <span>›</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal>
            <Visual item={media.team} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1200px" />
          </Reveal>
          <Reveal className={styles.teamCopy}>
            <p className={styles.kicker}>The team</p>
            <h2>Built in Madrid. Presented at Harvard. Preparing for clinical validation.</h2>
            <p className={styles.sectionLead}>
              FixedGap is built by a team across computer science, biomedical engineering,
              medicine and product, with clinical advisors from neurology.
            </p>
            <Link className={styles.buttonText} href="/company/about">
              Read our story <span>›</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.shell}>
          <Reveal className={styles.ctaCopy}>
            <h2>Evaluate FixedGap with your clinical team.</h2>
            <p>
              We are looking for neurologists, rehabilitation clinics and hospitals
              interested in evaluating the product and taking part in clinical validation.
            </p>
            <div className={styles.actions}>
              <Link className={styles.buttonLight} href="/contact">
                Discuss a pilot
              </Link>
              <a className={styles.ctaMail} href="mailto:contact@fixedgap.com">
                contact@fixedgap.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
