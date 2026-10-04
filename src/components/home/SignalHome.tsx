'use client';

import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SignalHome.module.css';

const partners = [
  { name: 'AWS', logo: '/logos/aws.png' },
  { name: 'Bosch', logo: '/logos/BoschDefinitivo.png' },
  { name: 'Universidad Complutense', logo: '/logos/Universidad_Complutense.png' },
  { name: 'Real Colegio Complutense', logo: '/logos/Real_Colegio_Complutense.png' },
  { name: 'Comunidad de Madrid', logo: '/logos/ComunidadMadrid.png' },
  { name: 'Saturno Labs', logo: '/logos/saturno.png' },
];

const measurements = [
  {
    name: 'Dexterity',
    signal: 'Pinch precision, finger extension and hand-opening speed.',
  },
  {
    name: 'Range of motion',
    signal: 'Reach distance, wrist rotation and pronation-supination range.',
  },
  {
    name: 'Movement quality',
    signal: 'Smoothness, endpoint overshoot and execution speed.',
  },
  {
    name: 'Symmetry',
    signal: 'Differences between hands and change from one session to the next.',
  },
];

const pipeline = [
  {
    id: '01',
    title: 'Capture',
    body: 'The patient does a short guided task in the browser. A standard webcam records it.',
  },
  {
    id: '02',
    title: 'Track',
    body: 'Twenty-one hand landmarks are located on every frame.',
  },
  {
    id: '03',
    title: 'Measure',
    body: 'Landmark trajectories become a fixed set of motor measurements.',
  },
  {
    id: '04',
    title: 'Review',
    body: 'Clinicians see trends, adherence and alerts for their patients in one place.',
  },
];

const games = [
  {
    number: '01',
    name: 'Pill Organizer',
    target: 'Pinch and fine motor control',
    image: '/juegos/Pill-org.jpeg',
  },
  {
    number: '02',
    name: 'Light Switch',
    target: 'Finger extension and left-right asymmetry',
    image: '/juegos/Light Switches.jpeg',
  },
  {
    number: '03',
    name: 'Water Jug',
    target: 'Wrist rotation, pronation and supination',
    image: '/juegos/water-jug.jpeg',
  },
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
      initial={{ y: 35 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function updateSpotlight(event: ReactPointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
}

export default function SignalHome() {
  const [comparison, setComparison] = useState(52);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const { scrollYProgress: comparisonProgress } = useScroll({
    target: comparisonRef,
    offset: ['start end', 'center center'],
  });
  const { scrollYProgress: dashboardProgress } = useScroll({
    target: dashboardRef,
    offset: ['start end', 'center center'],
  });
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamRef,
    offset: ['start end', 'end start'],
  });

  const comparisonRotate = useTransform(comparisonProgress, [0, 1], [7, 0]);
  const comparisonScale = useTransform(comparisonProgress, [0, 1], [0.9, 1]);
  const comparisonY = useTransform(comparisonProgress, [0, 1], [110, 0]);
  const dashboardRotate = useTransform(dashboardProgress, [0, 1], [10, 0]);
  const dashboardScale = useTransform(dashboardProgress, [0, 1], [0.82, 1]);
  const dashboardY = useTransform(dashboardProgress, [0, 1], [165, 0]);
  const teamImageY = useTransform(teamProgress, [0, 1], ['-5%', '5%']);
  const heroLines = ['Motor recovery,', 'measured', 'between visits.'];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.shell}>
          <div className={styles.heroLayout}>
            <motion.div
              className={styles.heroCopy}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              <motion.div
                className={styles.signalLabel}
                variants={{
                  hidden: { opacity: 0, x: -14 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.65 } },
                }}
              >
                <i />
                Camera-based monitoring for stroke rehabilitation
              </motion.div>

              <h1>
                {heroLines.map((line, index) => (
                  <span className={index === 2 ? styles.accentLine : ''} key={line}>
                    <motion.i
                      variants={{
                        hidden: { y: '110%' },
                        visible: {
                          y: 0,
                          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {line}
                    </motion.i>
                  </span>
                ))}
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
              >
                Patients do short upper-limb tasks at home in front of a standard
                webcam. FixedGap measures the movement and shows the care team how
                each patient is changing between appointments.
              </motion.p>

              <motion.div
                className={styles.heroActions}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
              >
                <Link className={styles.primaryButton} href="/contact">
                  Book a clinical demo <span>↗</span>
                </Link>
                <Link className={styles.textLink} href="/demo">
                  See how it works <span>›</span>
                </Link>
              </motion.div>

              <motion.div
                className={styles.heroMeta}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8 } },
                }}
              >
                <div>
                  <strong>21</strong>
                  <span>landmarks per hand</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>standard webcam</span>
                </div>
                <div>
                  <strong>&lt;5</strong>
                  <span>minutes per session</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.heroMedia}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <video autoPlay muted loop playsInline preload="metadata">
                <source src="/about/demo.mp4" type="video/mp4" />
              </video>
              <div className={styles.heroMediaCaption}>
                <span>Live session</span>
                <strong>A patient controls the exercise with their hand. No gloves, no sensors.</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.logoSection}>
        <p>Supported by</p>
        <div className={styles.logoMask}>
          <div className={styles.logoTrack}>
            {[...partners, ...partners].map((partner, index) => (
              <div data-logo={partner.name} key={`${partner.name}-${index}`}>
                <Image
                  src={partner.logo}
                  alt={index < partners.length ? partner.name : ''}
                  width={160}
                  height={64}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={`${styles.shell} ${styles.manifestoLayout}`}>
          <div className={styles.manifestoSticky}>
            <Reveal>
              <div className={styles.sectionIndex}>
                <span>01</span>
                What we measure
              </div>
              <h2>
                Each task isolates a movement.
                <span>Every session adds to the patient&apos;s motor profile.</span>
              </h2>
              <p className={styles.manifestoText}>
                The same measurements are taken on every session, so a clinician
                can compare today with last week instead of relying on memory or
                on what the patient reports.
              </p>
            </Reveal>
          </div>

          <div className={styles.instrumentGrid}>
            {measurements.map((measurement, index) => (
              <motion.article
                className={styles.instrument}
                initial={{ y: 55, scale: 0.97 }}
                whileInView={{ y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                key={measurement.name}
              >
                <div>
                  <i>{String(index + 1).padStart(2, '0')}</i>
                </div>
                <strong>{measurement.name}</strong>
                <p>{measurement.signal}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rebuildSection}>
        <div className={styles.shell}>
          <Reveal className={styles.rebuildHeader}>
            <div className={styles.sectionIndex}>
              <span>02</span>
              How we got here
            </div>
            <h2>
              The first version was a glove.
              <span>The current one is a camera.</span>
            </h2>
            <p>
              The glove prototype proved the measurements were possible. Rebuilding
              it on computer vision removed the hardware a patient would have to
              receive, charge and calibrate at home.
            </p>
          </Reveal>

          <motion.div
            ref={comparisonRef}
            className={styles.comparison}
            style={{
              rotateX: comparisonRotate,
              scale: comparisonScale,
              y: comparisonY,
            }}
          >
            <div className={styles.comparisonImage}>
              <Image
                src="/GUANTE.jpeg"
                alt="The first FixedGap sensor glove prototype"
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
                className={styles.prototypeImage}
              />
              <div className={styles.comparisonShade} />
              <div className={styles.versionLabel}>
                <span>2025 prototype</span>
                <strong>Glove with sensors</strong>
              </div>
            </div>

            <div
              className={`${styles.comparisonImage} ${styles.comparisonSoftware}`}
              style={{ clipPath: `inset(0 0 0 ${comparison}%)` }}
            >
              <Image
                src="/hand-tracking.jpg"
                alt="FixedGap computer vision hand tracking"
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
                className={styles.softwareImage}
              />
              <div className={`${styles.versionLabel} ${styles.versionLabelRight}`}>
                <span>Today</span>
                <strong>One webcam</strong>
              </div>
            </div>

            <div className={styles.comparisonDivider} style={{ left: `${comparison}%` }}>
              <span>‹ ›</span>
            </div>
            <input
              aria-label="Compare the glove prototype with the camera-based version"
              type="range"
              min="18"
              max="82"
              value={comparison}
              onChange={(event) => setComparison(Number(event.target.value))}
            />
          </motion.div>

          <div className={styles.rebuildStats}>
            <div><span>Prototype</span><strong>9</strong><p>sensors and a glove</p></div>
            <div><span>Today</span><strong>1</strong><p>standard webcam</p></div>
            <div><span>Patient</span><strong>0</strong><p>hardware to install</p></div>
          </div>
        </div>
      </section>

      <section className={styles.pipelineSection}>
        <div className={styles.shell}>
          <Reveal className={styles.pipelineHeader}>
            <div className={styles.sectionIndex}>
              <span>03</span>
              How it works
            </div>
            <h2>
              Four steps from a webcam
              <span>to data a clinician can review.</span>
            </h2>
          </Reveal>

          <div className={styles.pipelineSteps}>
            <div className={styles.pipelineBeam} />
            {pipeline.map((step, index) => (
              <Reveal className={styles.pipelineStep} delay={index * 0.1} key={step.id}>
                <span>{step.id}</span>
                <i />
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gamesSection}>
        <div className={styles.shell}>
          <Reveal className={styles.gamesHeader}>
            <div>
              <div className={styles.sectionIndex}>
                <span>04</span>
                The exercises
              </div>
              <h2>
                Simple tasks for patients.
                <span>Consistent measurements for clinicians.</span>
              </h2>
            </div>
            <p>
              Each exercise targets one upper-limb movement and produces the same
              set of measurements every time it is played.
            </p>
          </Reveal>

          <div className={styles.gameGrid}>
            {games.map((game, index) => (
              <motion.article
                className={styles.gameCard}
                initial={{ y: 45, scale: 0.97 }}
                whileInView={{ y: 0, scale: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onPointerMove={updateSpotlight}
                key={game.number}
              >
                <div className={styles.gameImage}>
                  <Image src={game.image} alt={game.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  <div className={styles.gameOverlay} />
                  <span>{game.number}</span>
                </div>
                <div className={styles.gameCopy}>
                  <strong>{game.name}</strong>
                  <p>{game.target}</p>
                  <Link href="/product/experience">See the exercise <span>↗</span></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={dashboardRef} className={styles.dashboardSection}>
        <div className={styles.dashboardGlow} />
        <div className={styles.shell}>
          <Reveal className={styles.dashboardHeader}>
            <div className={styles.sectionIndex}>
              <span>05</span>
              For the care team
            </div>
            <h2>
              See who is improving,
              <span>and who needs a call.</span>
            </h2>
            <p>
              Session results, adherence and alerts for every patient in one
              view, ordered by who needs attention first.
            </p>
          </Reveal>

          <motion.div
            className={styles.dashboardDevice}
            style={{ rotateX: dashboardRotate, scale: dashboardScale, y: dashboardY }}
          >
            <div className={styles.dashboardTopbar}>
              <div><i /><i /><i /></div>
              <span>FixedGap Clinical</span>
            </div>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <div className={styles.shell}>
          <Reveal className={styles.evidenceHeader}>
            <div className={styles.sectionIndex}>
              <span>06</span>
              Why it matters
            </div>
            <h2>The monitoring gap begins after discharge.</h2>
          </Reveal>
          <div className={styles.evidenceGrid}>
            {[
              ['69%', 'of stroke patients are not doing the rehabilitation prescribed at home.'],
              ['44%', 'receive no home health or outpatient therapy after discharge.'],
              ['1 in 3', 'stops rehabilitating before recovery is complete.'],
            ].map((item, index) => (
              <Reveal className={styles.evidenceStat} delay={index * 0.08} key={item[0]}>
                <strong>{item[0]}</strong>
                <p>{item[1]}</p>
              </Reveal>
            ))}
          </div>
          <Link className={styles.evidenceLink} href="/science/evidence">
            Read the clinical evidence <span>↗</span>
          </Link>
        </div>
      </section>

      <section ref={teamRef} className={styles.teamSection}>
        <motion.div className={styles.teamImage} style={{ y: teamImageY }}>
          <Image
            src="/about/about-team.jpg"
            alt="The FixedGap team working on the platform"
            fill
            sizes="100vw"
          />
        </motion.div>
        <div className={styles.teamOverlay} />
        <div className={styles.shell}>
          <Reveal className={styles.teamCopy}>
            <div className={styles.sectionIndex}>
              <span>07</span>
              The team
            </div>
            <h2>
              Built in Madrid.
              <span>Presented at Harvard.</span>
              Preparing for clinical validation.
            </h2>
            <p>
              FixedGap is built by a team across computer science, biomedical
              engineering, medicine and product, with clinical advisors from
              neurology.
            </p>
            <Link className={styles.lightButton} href="/company/about">
              Read our story <span>↗</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.shell}>
          <Reveal className={styles.ctaCopy}>
            <h2>
              Evaluate FixedGap
              <span>with your clinical team.</span>
            </h2>
            <p>
              We are looking for neurologists, rehabilitation clinics and
              hospitals interested in evaluating the product and taking part in
              clinical validation.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.lightButton} href="/contact">
                Discuss a pilot <span>↗</span>
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
