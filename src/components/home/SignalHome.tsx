'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './SignalHome.module.css';
import SplitText from './motion/SplitText';
import Kicker from './motion/Kicker';
import HeroMedia from './motion/HeroMedia';
import LogoMarquee from './motion/LogoMarquee';
import PipelineRail from './motion/PipelineRail';
import GapCalendar from './motion/GapCalendar';
import MagneticLink from './motion/MagneticLink';
import AwardShowcase, { type FeaturedAward } from './motion/AwardShowcase';
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
    src: '/home/company-harvard-chan.webp',
    ratio: '4 / 5',
    label: 'The founders at the Harvard T.H. Chan School of Public Health, Boston, June 2026',
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
  { title: 'Measure', body: 'Landmark trajectories become the same set of measurements, every session.', image: '/home/render-trend.webp', imagePosition: '85% 50%' },
  { title: 'Review', body: 'Clinicians see trends, adherence and alerts for each patient.', image: '/home/render-dashboard-card.webp' },
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
            <Kicker className={styles.kicker} text="FixedGap for stroke rehabilitation" />
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

          <HeroMedia className={styles.heroVideo}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/TYvQgTtPtYA?rel=0&modestbranding=1"
              title="FixedGap, presented by the founders"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </HeroMedia>

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
            <Kicker className={styles.kicker} text="What FixedGap does" />
            <SplitText text="Short games at home, clinical data in the clinic" />
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
            <Kicker className={styles.kicker} text="How it works" />
            <SplitText text="Four steps from a webcam to data a clinician can review" />
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
            <Kicker className={styles.kicker} text="For the care team" />
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
              <Image
                src="/clinical/dashboard.png"
                alt="The clinical dashboard: patients ordered by who needs attention first"
                width={1914}
                height={942}
                sizes="(max-width: 900px) 100vw, 1120px"
              />
            </div>
          </ScrollTilt>
          <div className={styles.triad}>
            <Reveal className={styles.triadItem}>
              <strong>Trends per patient</strong>
              <p>Each measurement plotted session after session.</p>
            </Reveal>
            <Reveal className={styles.triadItem} delay={0.06}>
              <strong>Adherence</strong>
              <p>Who played, when, and for how long.</p>
            </Reveal>
            <Reveal className={styles.triadItem} delay={0.12}>
              <strong>Alerts</strong>
              <p>Patients who drop or stop playing move to the top of the list.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team -------------------------------------------------------------- */}
      <section className={`${styles.band} ${styles.bandSand}`}>
        <div className={styles.shell}>
          <div className={styles.teamSplit}>
            <Reveal>
              <Visual item={media.team} sizes="(max-width: 900px) 100vw, 520px" />
            </Reveal>
            <Reveal className={styles.teamCopy} delay={0.1}>
              <Kicker className={styles.kicker} text="The team" />
              <SplitText text="Who is building FixedGap" />
              <p className={styles.sectionLead}>
                Six of us, from Madrid, across engineering, business and medicine. We met at a
                Harvard hackathon, came second worldwide at the final in Boston, and are now
                preparing the first clinical validation study.
              </p>
              <div className={styles.linkRow}>
                <Link className={styles.buttonText} href="/company">
                  Meet the team <span>›</span>
                </Link>
                <Link className={styles.buttonText} href="/awards">
                  Awards and press <span>›</span>
                </Link>
              </div>
            </Reveal>
          </div>
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
