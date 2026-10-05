'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SignalHome.module.css';
import SplitText from './motion/SplitText';
import CountUp from './motion/CountUp';
import HandLandmarks from './motion/HandLandmarks';
import LogoMarquee from './motion/LogoMarquee';
import TiltCard from './motion/TiltCard';
import PipelineRail from './motion/PipelineRail';
import Sparkline from './motion/Sparkline';
import MagneticLink from './motion/MagneticLink';
import AwardsMedia, { type Award, type PressItem } from './motion/AwardsMedia';
import { Reveal, Visual, type Media } from '@/components/site/Editorial';

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


const partners = [
  { name: 'AWS', logo: '/logos/aws.png' },
  { name: 'Bosch', logo: '/logos/BoschDefinitivo.png' },
  { name: 'Universidad Complutense', logo: '/logos/Universidad_Complutense.png' },
  { name: 'Real Colegio Complutense', logo: '/logos/Real_Colegio_Complutense.png' },
  { name: 'Comunidad de Madrid', logo: '/logos/ComunidadMadrid.png' },
  { name: 'Saturno Labs', logo: '/logos/saturno.png' },
  { name: 'Hospital General Universitario Gregorio Marañón', logo: '/logos/gregorio-maranon.png' },
];

const pillars: Array<{ media: Media | null; title: string; body: string }> = [
  {
    media: media.pillarHome,
    title: 'The patient plays at home.',
    body: 'Short guided tasks in the browser, under five minutes, in front of a standard webcam. Nothing to install, nothing to wear.',
  },
  {
    media: null,
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
  { name: 'Dexterity', body: 'Pinch precision, finger extension and hand-opening speed.', trend: [0.2, 0.28, 0.25, 0.4, 0.46, 0.44, 0.58, 0.66, 0.72] },
  { name: 'Range of motion', body: 'Reach distance, wrist rotation and pronation-supination range.', trend: [0.3, 0.32, 0.38, 0.36, 0.45, 0.52, 0.5, 0.6, 0.68] },
  { name: 'Movement quality', body: 'Smoothness, endpoint overshoot and execution speed.', trend: [0.15, 0.22, 0.3, 0.28, 0.42, 0.48, 0.55, 0.62, 0.7] },
  { name: 'Symmetry', body: 'Differences between hands and change from one session to the next.', trend: [0.4, 0.38, 0.45, 0.5, 0.48, 0.58, 0.63, 0.7, 0.78] },
];

const exercises = [
  { media: media.exercisePills, name: 'Pill Organizer', target: 'Pinch and fine motor control' },
  { media: media.exerciseSwitch, name: 'Light Switch', target: 'Finger extension and left-right asymmetry' },
  { media: media.exerciseJug, name: 'Water Jug', target: 'Wrist rotation, pronation and supination' },
];

/* Event name for the September 2026 awards: confirm the official name. */
const awards: Award[] = [
  {
    year: '2026',
    event: 'Madrid entrepreneurship awards',
    title: 'Best project for scientific impact',
    detail: 'First prize, 2,000 €.',
    featured: true,
  },
  {
    year: '2026',
    event: 'Harvard HSIL Hackathon, global final',
    title: '2nd place worldwide',
    detail: 'Final held at Pillar VC in Boston, judged by Boston investors and Harvard T.H. Chan faculty.',
    featured: true,
  },
  {
    year: '2026',
    event: 'Harvard HSIL Hackathon, Madrid hub',
    title: '1st place',
    detail: 'Among 190 participants at Universidad Complutense de Madrid.',
    featured: true,
  },
  {
    year: '2026',
    event: 'Cámara de Comercio de Madrid',
    title: 'Best project with local growth potential',
  },
  {
    year: '2026',
    event: 'Spain Startup',
    title: 'Best project with international potential',
  },
  {
    year: '2026',
    event: 'Netmentora Madrid',
    title: 'Best project for job creation potential',
  },
  {
    year: '2026',
    event: 'Fundación madri+d',
    title: 'Technology-based project with the highest development potential',
  },
  {
    year: '2026',
    event: 'Innpar, Ayuntamiento de Pozuelo de Alarcón',
    title: 'Best technology entrepreneurship project',
  },
];

const press: PressItem[] = [
  {
    outlet: 'Tribuna Complutense',
    date: 'June 2026',
    title: 'El equipo de la UCM, segundo en el Harvard Health Systems Innovation Lab Hackathon 2026',
    url: 'https://tribuna.ucm.es/news/el-equipo-de-la-ucm-segundo-en-el-harvard-health-systems-innovation-lab-hackathon-2026',
  },
  {
    outlet: 'The Objective',
    date: 'April 2026',
    title: 'Seis emprendedores crean un guante para evaluar la recuperación después de un ictus',
    url: 'https://theobjective.com/sociedad/ciencia/2026-04-21/seis-emprendedores-guante-recuperacion-ictus/',
  },
  {
    outlet: 'Tribuna Complutense',
    date: 'April 2026',
    title: 'Cuatro complutenses, núcleo del equipo ganador del hackathon de la Universidad de Harvard celebrado en la UCM',
    url: 'https://tribuna.ucm.es/news/cuatro-complutenses-equipo-ganador-hackathon-universidad-harvard-celebrado-ucm',
  },
];

const evidence: Array<{ value: number; prefix?: string; suffix?: string; text: string }> = [
  { value: 69, suffix: '%', text: 'of stroke patients are not doing the rehabilitation prescribed at home.' },
  { value: 44, suffix: '%', text: 'receive no home health or outpatient therapy after discharge.' },
  { value: 3, prefix: '1 in ', text: 'stops rehabilitating before recovery is complete.' },
];

export default function SignalHome() {
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroVisualRef,
    offset: ['start end', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 0.5, 1], [1.02, 1, 0.96]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -40]);
  const { scrollYProgress: dashProgress } = useScroll({
    target: dashboardRef,
    offset: ['start end', 'center center'],
  });
  const dashRotate = useTransform(dashProgress, [0, 1], [8, 0]);
  const dashScale = useTransform(dashProgress, [0, 1], [0.9, 1]);
  const dashY = useTransform(dashProgress, [0, 1], [80, 0]);

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
            <SplitText as="h1" text={'Motor recovery,\nmeasured between visits.'} onMount delay={0.1} />
            <p className={styles.lead}>
              Patients do short upper-limb tasks at home in front of a standard webcam.
              FixedGap measures the movement and shows the care team how each patient is
              changing between appointments.
            </p>
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonPrimary} href="/contact">
                Book a clinical demo
              </MagneticLink>
              <Link className={styles.buttonText} href="/product#demo">
                See how it works <span>›</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            ref={heroVisualRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ scale: heroScale, y: heroY }}>
              <Visual item={media.heroSession} className={styles.heroVisual} sizes="(max-width: 900px) 100vw, 1200px" />
            </motion.div>
          </motion.div>

          <div className={styles.heroFacts}>
            <div>
              <CountUp value={21} />
              <span>hand landmarks tracked per frame</span>
            </div>
            <div>
              <CountUp value={1} />
              <span>standard webcam, no extra hardware</span>
            </div>
            <div>
              <CountUp value={5} prefix="<" suffix=" min" />
              <span>per session, from home</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.logos}>
        <div className={styles.shell}>
          <p>Supported by</p>
          <LogoMarquee items={partners} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <SplitText text="One camera. Three people who benefit." />
          </Reveal>
          <div className={styles.pillars}>
            {pillars.map((pillar, index) => (
              <Reveal className={styles.pillar} delay={index * 0.08} key={pillar.title}>
                <TiltCard className={styles.tilt}>
                  {pillar.media ? (
                    <Visual item={pillar.media} sizes="(max-width: 900px) 100vw, 400px" />
                  ) : (
                    <div className={`${styles.visual} ${styles.handStage}`} style={{ aspectRatio: '1 / 1' }}>
                      <HandLandmarks className={styles.hand} />
                    </div>
                  )}
                </TiltCard>
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
            <SplitText text="The first version was a glove." />
            <p className={styles.sectionLead}>
              Built in 36 hours at a hackathon, the glove combined motion sensors, flex
              sensors and muscle signals. It proved the measurements were possible. It
              also showed that nobody would wear it at home every day. So we rebuilt the
              whole thing around a camera.
            </p>
          </Reveal>
          <div className={styles.twoUp}>
            <Reveal>
              <TiltCard className={styles.card} max={4}>
                <Visual item={media.gloveSketch} sizes="(max-width: 900px) 100vw, 600px" />
                <div className={styles.cardCopy}>
                  <span>2025 prototype</span>
                  <h3>Glove with nine sensors</h3>
                  <p>Accurate, and impossible to scale. Every patient needed hardware shipped, charged and calibrated.</p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.1}>
              <TiltCard className={styles.card} max={4}>
                <Visual item={media.cameraSketch} sizes="(max-width: 900px) 100vw, 600px" />
                <div className={styles.cardCopy}>
                  <span>Today</span>
                  <h3>A webcam and a browser</h3>
                  <p>The same measurements, from the laptop the patient already owns. Nothing to install.</p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>How it works</p>
            <SplitText text="Four steps from a webcam to data a clinician can review." />
          </Reveal>
          <Reveal>
            <Visual item={media.pipelineDiagram} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1200px" />
          </Reveal>
          <PipelineRail steps={steps} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.shell}>
          <div className={styles.split}>
            <Reveal className={styles.splitCopy}>
              <p className={styles.kicker}>What we measure</p>
              <SplitText text="Each task isolates a movement." />
              <p className={styles.sectionLead}>
                The same measurements are taken on every session, so a clinician can
                compare today with last week instead of relying on memory or on what the
                patient reports.
              </p>
            </Reveal>
            <div className={styles.measureList}>
              {measurements.map((item, index) => (
                <Reveal className={styles.measureItem} delay={index * 0.06} key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.body}</p>
                  </div>
                  <Sparkline values={item.trend} className={styles.spark} />
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
            <SplitText text="Simple tasks for patients. Consistent measurements for clinicians." />
          </Reveal>
          <div className={styles.exercises}>
            {exercises.map((exercise, index) => (
              <Reveal delay={index * 0.08} key={exercise.name}>
                <TiltCard className={styles.card}>
                  <Visual item={exercise.media} sizes="(max-width: 900px) 100vw, 400px" />
                  <div className={styles.cardCopy}>
                    <h3>{exercise.name}</h3>
                    <p>{exercise.target}</p>
                    <Link href="/product#exercises">See the exercise <span>›</span></Link>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>For the care team</p>
            <SplitText text="See who is improving, and who needs a call." />
            <p className={styles.sectionLead}>
              Session results, adherence and alerts for every patient in one view,
              ordered by who needs attention first.
            </p>
          </Reveal>
          <motion.div ref={dashboardRef} style={{ rotateX: dashRotate, scale: dashScale, y: dashY, transformPerspective: 1400 }}>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <i /><i /><i />
                <span>FixedGap Clinical</span>
              </div>
              <video autoPlay muted loop playsInline preload="metadata">
                <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>Why it matters</p>
            <SplitText text="The monitoring gap begins after discharge." />
          </Reveal>
          <div className={styles.evidence}>
            {evidence.map((item, index) => (
              <Reveal className={styles.evidenceItem} delay={index * 0.06} key={item.text}>
                <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link className={styles.buttonText} href="/science#evidence">
              Read the clinical evidence <span>›</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`} id="awards">
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>Awards and media</p>
            <SplitText text="Recognised in Madrid, Boston and the press." />
          </Reveal>
          <AwardsMedia awards={awards} press={press} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal>
            <Visual item={media.team} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1200px" />
          </Reveal>
          <Reveal className={styles.teamCopy}>
            <p className={styles.kicker}>The team</p>
            <SplitText text="Built in Madrid. Presented at Harvard. Preparing for clinical validation." />
            <p className={styles.sectionLead}>
              FixedGap is built by a team across computer science, biomedical engineering,
              medicine and product, with clinical advisors from neurology.
            </p>
            <Link className={styles.buttonText} href="/company#story">
              Read our story <span>›</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.shell}>
          <Reveal className={styles.ctaCopy}>
            <SplitText text="Evaluate FixedGap with your clinical team." />
            <p>
              We are looking for neurologists, rehabilitation clinics and hospitals
              interested in evaluating the product and taking part in clinical validation.
            </p>
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonLight} href="/contact">
                Discuss a pilot
              </MagneticLink>
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
