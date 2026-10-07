'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SignalHome.module.css';
import SplitText from './motion/SplitText';
import LogoMarquee from './motion/LogoMarquee';
import PipelineRail from './motion/PipelineRail';
import MagneticLink from './motion/MagneticLink';
import AwardShowcase, { type FeaturedAward, type Mention, type PressItem } from './motion/AwardShowcase';
import { Reveal, Visual, type Media } from '@/components/site/Editorial';

/*
 * Every visual on this page is declared here. `src: null` renders a labelled
 * placeholder that says what image goes there and in which format. To ship an
 * image, drop the file in /public/home/ and set `src` to its path.
 * The full brief with prompts lives in /public/home/IMAGES.md.
 */
const media = {
  heroBackdrop: '/home/product-wrist.webp',
  tabHome: '/home/home-hand.webp',
  tabCamera: '/home/home-camera.webp',
  tabClinician: '/home/home-patient.webp',
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
  { title: 'Capture', body: 'The patient does a short task. The webcam records it in the browser.' },
  { title: 'Track', body: 'Twenty-one hand landmarks are located on every frame.' },
  { title: 'Measure', body: 'Landmark trajectories become the same set of measurements, every session.' },
  { title: 'Review', body: 'Clinicians see trends, adherence and alerts for each patient.' },
];

const featuredAwards: FeaturedAward[] = [
  {
    id: 'madrid-final',
    tab: 'Madrid final',
    event: 'Madrid entrepreneurship awards, 2026',
    title: 'Best project for scientific impact',
    detail: 'First prize, plus five special mentions from the Chamber of Commerce, Spain Startup, Netmentora, madri+d and Innpar Pozuelo.',
    figure: '2,000 €',
    figureLabel: 'First prize',
  },
  {
    id: 'harvard-global',
    tab: 'Harvard HSIL, global',
    event: 'Harvard Health Systems Innovation Lab Hackathon, global final, 2026',
    title: 'Second place worldwide',
    detail: 'Final held at Pillar VC in Boston, judged by Boston investors and Harvard T.H. Chan faculty.',
    photo: '/about/pilar.jpeg',
    photoAlt: 'The team at Pillar VC, Boston',
  },
  {
    id: 'harvard-madrid',
    tab: 'Harvard HSIL, Madrid',
    event: 'Harvard Health Systems Innovation Lab Hackathon, Madrid hub, 2026',
    title: 'First place',
    detail: 'Among 190 participants at Universidad Complutense de Madrid, with a place in the global final.',
    photo: '/GANADORES.jpeg',
    photoAlt: 'The team with the Madrid hub award, April 2026',
  },
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
      {/* Hero: copy left, photo + video right ------------------------------ */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
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
            <ul className={styles.heroNotes}>
              <li>Works with a standard webcam. Nothing to install.</li>
              <li>Under five minutes per session.</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.heroMedia}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            <Image
              src={media.heroBackdrop}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.heroBackdrop}
            />
            <motion.div
              className={styles.heroVideo}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/TYvQgTtPtYA?rel=0&modestbranding=1"
                title="FixedGap, presented by the founders"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.shell}>
          <p className={styles.heroCaption}>Hand tracking from a webcam, built for stroke rehabilitation teams</p>
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
              One webcam links three moments of recovery: the patient playing at home, the
              camera measuring every movement, and the clinician reading the trend.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <AwardShowcase featured={moments} quote />
          </Reveal>
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
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonPrimary} href="/product">
                See the product
              </MagneticLink>
              <Link className={styles.buttonLight} href="/science">
                Read the science
              </Link>
            </div>
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
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonPrimary} href="/contact">
                Book a demo
              </MagneticLink>
              <Link className={styles.buttonLight} href="/product#dashboard">
                Clinical dashboard
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={styles.frame}>
              <div className={styles.frameInner}>
                <video autoPlay muted loop playsInline preload="metadata">
                  <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </Reveal>
          <div className={styles.triad}>
            <Reveal className={styles.triadItem}>
              <strong>Trends per patient</strong>
              <p>Each measurement plotted session after session, so change between visits is visible instead of remembered.</p>
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
          </Reveal>
          <Reveal delay={0.1}>
            <AwardShowcase featured={featuredAwards} mentions={mentions} press={press} />
          </Reveal>
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
            <div className={styles.actions}>
              <Link className={styles.buttonLight} href="/company#team">
                Meet the team
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Visual item={media.team} className={styles.wideVisual} sizes="(max-width: 900px) 100vw, 1120px" />
          </Reveal>
        </div>
      </section>

      {/* CTA card over dots ---------------------------------------------- */}
      <section className={styles.cta}>
        <div className={styles.shell}>
          <Reveal className={styles.ctaCard}>
            <i className={styles.markTl} aria-hidden="true" />
            <i className={styles.markTr} aria-hidden="true" />
            <i className={styles.markBl} aria-hidden="true" />
            <i className={styles.markBr} aria-hidden="true" />
            <h2>Evaluate FixedGap with your clinical team</h2>
            <p>
              We are looking for neurologists, rehabilitation clinics and hospitals interested
              in evaluating the product and taking part in clinical validation.
            </p>
            <div className={styles.actions}>
              <MagneticLink className={styles.buttonPrimary} href="/contact">
                Book a demo
              </MagneticLink>
              <a className={styles.buttonLight} href="mailto:contact@fixedgap.com">
                contact@fixedgap.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
