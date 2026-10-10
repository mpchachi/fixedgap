'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SignalHome.module.css';
import SplitText from './motion/SplitText';
import LogoMarquee from './motion/LogoMarquee';
import PipelineRail from './motion/PipelineRail';
import GapCalendar from './motion/GapCalendar';
import MagneticLink from './motion/MagneticLink';
import AwardShowcase, { type FeaturedAward } from './motion/AwardShowcase';
import AwardsBoard, { type Prize, type Mention, type PressItem, type AwardPhoto } from './motion/AwardsBoard';
import CountUp from './motion/CountUp';
import ScrollTilt from './motion/ScrollTilt';
import Spotlight from './motion/Spotlight';
import { Reveal, Visual, type Media } from '@/components/site/Editorial';

/*
 * Every visual on this page is declared here. `src: null` renders a labelled
 * placeholder that says what image goes there and in which format. To ship an
 * image, drop the file in /public/home/ and set `src` to its path.
 * The full brief with prompts lives in /public/home/IMAGES.md.
 */
const media = {
  tabHome: '/home/home-hand.webp',
  tabCamera: '/home/home-camera.webp',
  tabClinician: '/home/home-clinic.webp',
  team: {
    src: '/about/oficina.jpeg',
    ratio: '21 / 9',
    label: 'The team, Madrid, 2026',
    note: 'Real photo.',
  } satisfies Media,
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

const steps = [
  { title: 'Capture', body: 'The patient does a short task. The webcam records it in the browser.', image: '/home/render-webcam.webp' },
  { title: 'Track', body: 'Twenty-one hand landmarks are located on every frame.', image: '/home/render-landmarks.webp' },
  { title: 'Measure', body: 'Landmark trajectories become the same set of measurements, every session.', image: '/home/render-trend.webp' },
  { title: 'Review', body: 'Clinicians see trends, adherence and alerts for each patient.', image: '/home/render-dashboard-card.webp' },
];

const prizes: Prize[] = [
  {
    event: 'Madrid entrepreneurship awards',
    year: '2026',
    title: 'Best project for scientific impact',
    detail: 'First prize of the competition, plus five special mentions from the jury partners.',
  },
  {
    event: 'Harvard HSIL Hackathon, global final',
    year: '2026',
    title: 'Second place worldwide',
    detail: 'Final held at Pillar VC in Boston, judged by Boston investors and Harvard T.H. Chan faculty.',
  },
  {
    event: 'Harvard HSIL Hackathon, Madrid hub',
    year: '2026',
    title: 'First place',
    detail: 'Among 190 participants at Universidad Complutense de Madrid, with a place in the global final.',
  },
];

const awardPhotos: AwardPhoto[] = [
  { src: '/home/awards-ucm.webp', alt: 'Three of the founders receiving the award on stage at Universidad Complutense', caption: 'Madrid, 2026. Award ceremony at Universidad Complutense.' },
  { src: '/home/awards-pillar.webp', alt: 'The team with their certificates at Pillar VC, Boston', caption: 'Boston, June 2026. Global final at Pillar VC.' },
  { src: '/GANADORES.jpeg', alt: 'The team with the Madrid hub award', caption: 'Madrid, April 2026. Madrid hub winners.' },
];

const mentions: Mention[] = [
  { by: 'Cámara de Comercio de Madrid', title: 'Best project with local growth potential' },
  { by: 'Spain Startup', title: 'Best project with international potential' },
  { by: 'Netmentora Madrid', title: 'Best project for job creation potential' },
  { by: 'Fundación madri+d', title: 'Technology-based project with the highest development potential' },
  { by: 'Innpar, Pozuelo de Alarcón', title: 'Best technology entrepreneurship project' },
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

const moments: FeaturedAward[] = [
  {
    id: 'home',
    tab: 'At home',
    event: 'The patient, at the kitchen table',
    title: 'Short arcade-style games in the browser, under five minutes, in front of a standard webcam.',
    detail: 'Nothing to install or wear. The patient opens a link, sits in front of the laptop and plays.',
    photo: media.tabHome,
    photoAlt: 'A patient playing from his kitchen table, hand raised in a pinch in front of the laptop',
  },
  {
    id: 'camera',
    tab: 'The camera',
    event: 'The webcam, during the game',
    title: 'Twenty-one hand landmarks on every frame become the same set of motor measurements, session after session.',
    detail: 'Pinch, finger extension and wrist rotation are measured the same way every time, so sessions can be compared.',
    photo: media.tabCamera,
    photoAlt: 'A patient turning his hand in front of the laptop camera, mid-exercise',
  },
  {
    id: 'clinic',
    tab: 'The clinic',
    event: 'The care team, between visits',
    title: 'Every session lands in one view, ordered by who needs attention first.',
    detail: 'Trends, adherence and alerts for each patient, without waiting for the next appointment.',
    photo: media.tabClinician,
    photoAlt: 'A patient at her dining table, mid-session',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function SignalHome() {
  return (
    <main className={styles.page}>
      {/* Hero: copy, then the founders' video full width ----------------- */}
      <section className={styles.hero}>
        <div className={styles.shell}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className={styles.kicker}>FixedGap for stroke rehabilitation</p>
            <SplitText as="h1" text={'Motor recovery,\nmeasured between visits'} onMount delay={0.1} />
            <p className={styles.lead}>
              Patients do short hand exercises at home in front of a webcam. The care team
              sees how each one is changing between appointments, without new hardware.
            </p>
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonPrimary} href="/contact">
                Book a demo
              </MagneticLink>
              <Link className={styles.buttonLight} href="/product">
                See the product
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroVideo}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <iframe
              src="https://www.youtube-nocookie.com/embed/TYvQgTtPtYA?rel=0&modestbranding=1"
              title="FixedGap, presented by the founders"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          <div className={styles.heroFacts}>
            <div>
              <CountUp value={21} />
              <span>hand landmarks tracked per frame</span>
            </div>
            <div>
              <CountUp value={3} />
              <span>movements measured: pinch, extension, rotation</span>
            </div>
            <div>
              <CountUp value={5} prefix="<" suffix=" min" />
              <span>per session, from home</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logos ------------------------------------------------------------- */}
      <section className={`${styles.band} ${styles.logos}`}>
        <div className={styles.shell}>
          <p className={styles.bandLabel}>Supported by</p>
          <LogoMarquee items={partners} />
        </div>
      </section>

      {/* What it does: three moments, tabbed ------------------------------ */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>What FixedGap does</p>
            <SplitText text="Short games at home, clinical data in the clinic" />
            <p className={styles.sectionLead}>
              The patient plays at home, the camera measures the hand, and the clinician reads
              the trend. One webcam, no setup.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <AwardShowcase featured={moments} quote />
          </Reveal>
        </div>
      </section>

      {/* The gap: three months as a calendar, filled in on scroll --------- */}
      <section className={`${styles.band} ${styles.bandGap}`}>
        <div className={styles.shell}>
          <GapCalendar />
        </div>
      </section>

      {/* How it works ------------------------------------------------------ */}
      <section className={`${styles.band} ${styles.bandSand}`}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>How it works</p>
            <SplitText text="Four steps from a webcam to data a clinician can review" />
            <p className={styles.sectionLead}>
              The patient does a short task. The camera locates twenty-one hand landmarks on
              every frame. Those trajectories become the same measurements every session, and
              the care team reviews them.
            </p>
            <Link className={styles.buttonText} href="/product">
              See the product <span>›</span>
            </Link>
          </Reveal>
          <PipelineRail steps={steps} />
        </div>
      </section>

      {/* Care team / dashboard ------------------------------------------- */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>For the care team</p>
            <SplitText text="See who is improving, and who needs a call" />
            <p className={styles.sectionLead}>
              Session results, adherence and alerts for every patient in one view, ordered by
              who needs attention first.
            </p>
            <Link className={styles.buttonText} href="/product#dashboard">
              The clinical dashboard <span>›</span>
            </Link>
          </Reveal>
          <ScrollTilt className={styles.frame}>
            <div className={styles.frameInner}>
              <video autoPlay muted loop playsInline preload="metadata">
                <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollTilt>
          <div className={styles.triad}>
            <Reveal className={styles.triadItem}>
              <strong>Trends per patient</strong>
              <p>Each measurement plotted session after session, so the change between two visits is on screen rather than in someone&apos;s memory.</p>
            </Reveal>
            <Reveal className={styles.triadItem} delay={0.06}>
              <strong>Adherence</strong>
              <p>Who played, when, and for how long, without calling to ask.</p>
            </Reveal>
            <Reveal className={styles.triadItem} delay={0.12}>
              <strong>Alerts</strong>
              <p>Patients whose measurements drop or who stop playing move to the top of the list.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Awards and media ------------------------------------------------- */}
      <section className={styles.band} id="awards">
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>Awards and media</p>
            <SplitText text="Recognised in Madrid and Boston" />
            <p className={styles.sectionLead}>
              Three prizes in 2026, five special mentions and three press features.
            </p>
          </Reveal>
          <AwardsBoard prizes={prizes} mentions={mentions} press={press} photos={awardPhotos} />
        </div>
      </section>

      {/* Team -------------------------------------------------------------- */}
      <section className={`${styles.band} ${styles.bandSand}`}>
        <div className={styles.shell}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.kicker}>The team</p>
            <SplitText text="Five co-founders in Madrid, one clinical advisor" />
            <p className={styles.sectionLead}>
              Built in Madrid, with a first clinical validation study to run.
            </p>
            <Link className={styles.buttonText} href="/company#team">
              Meet the team <span>›</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Visual item={media.team} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1120px" />
          </Reveal>
        </div>
      </section>

      {/* CTA: dark, grid and glow ---------------------------------------- */}
      <Spotlight className={styles.cta}>
        <div className={styles.shell}>
          <Reveal className={styles.ctaCopy}>
            <SplitText text="Evaluate FixedGap with your clinical team" />
            <p>
              We are looking for neurologists, rehabilitation clinics and hospitals interested
              in evaluating the product and taking part in clinical validation.
            </p>
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonLight} href="/contact">
                Book a demo
              </MagneticLink>
              <a className={styles.ctaMail} href="mailto:contact@fixedgap.com">
                contact@fixedgap.com
              </a>
            </div>
          </Reveal>
        </div>
      </Spotlight>
    </main>
  );
}
