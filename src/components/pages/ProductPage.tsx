'use client';

import Image from 'next/image';
import { Cta, home, page, PageHero, Reveal, SectionHead, Visual, type Media } from '@/components/site/Editorial';
import StickyStory, { type StoryStep } from '@/components/home/motion/StickyStory';
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
    src: '/home/product-landmarks.webp',
    ratio: '4 / 5',
    label: 'The 21 hand landmarks the camera tracks on every frame',
    note: '',
  },
  clinic: {
    src: '/home/product-clinic-session.webp',
    ratio: '2 / 1',
    label: 'In the clinic: a therapist showing a patient how to hold the hand for the camera',
    note: '',
  },
};

const movements: StoryStep[] = [
  {
    index: '01',
    name: 'Pinch and fine motor control',
    media: media.pinch,
    text: 'The game asks for a pinch: thumb and index closing and opening on cue. Precision, speed and smoothness are captured frame by frame.',
    measures: 'Pinch precision, reach precision, endpoint overshoot, movement smoothness (SPARC)',
  },
  {
    index: '02',
    name: 'Finger extension and left-right asymmetry',
    media: media.open,
    text: 'The game asks the hand to open and the index to extend, alternating sides. The system captures how far, how fast, and the gap between both hands.',
    measures: 'Index extension accuracy, hand opening speed, reach precision, smoothness (SPARC), inter-hand asymmetry',
  },
  {
    index: '03',
    name: 'Wrist rotation',
    media: media.wrist,
    text: 'The game is steered by rotating the wrist. The rotation captures pronation and supination range, one of the most clinically relevant movements after stroke.',
    measures: 'Rotation range of motion, pronation and supination speed, smoothness (SPARC)',
  },
];

const metrics = [
  { name: 'Pinch precision', code: 'pinch_precision', text: 'Thumb-to-index distance relative to palm width, and how consistent it is.' },
  { name: 'Reach precision', code: 'reach_precision', text: 'How close the hand stops to the target, and how long it takes to get there.' },
  { name: 'Movement smoothness', code: 'SPARC', text: 'How fluid the movement is. After a stroke it turns fragmented.' },
  { name: 'Hand opening speed', code: 'opening_speed', text: 'How quickly the fingers separate from the palm.' },
  { name: 'Index extension', code: 'index_extension', text: 'Angle at the knuckle as the index extends on its own.' },
  { name: 'Wrist rotation range', code: 'range_of_motion', text: 'How far the wrist rotates in a pouring motion, against the patient’s own baseline.' },
  { name: 'Inter-hand asymmetry', code: 'asymmetry_index', text: 'The gap between the affected and the unaffected hand, and whether it is closing.' },
];

export default function ProductPage() {
  return (
    <main className={home.page}>
      <PageHero
        kicker="Product"
        title={'Three short games at home,\none report before the next visit.'}
        lead="Three arcade games in front of the webcam the patient already has. Every session becomes a report the neurologist reads before the next appointment."
      >
        <div className={page.heroFacts}>
          <div><strong>3</strong><span>short games per session</span></div>
          <div><strong>&lt;5 min</strong><span>of play per session</span></div>
          <div><strong>21</strong><span>hand landmarks tracked</span></div>
        </div>
      </PageHero>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor} ${page.onTint}`} id="exercises">
        <div className={home.shell}>
          <SectionHead
            kicker="The games"
            title="Three movements, three games."
            lead="The games will keep changing. The three movements they are built around will not."
          />
          <StickyStory steps={movements} />
        </div>
      </section>

      <section className={`${home.section} ${page.anchor}`} id="biomarkers">
        <div className={home.shell}>
          <SectionHead
            kicker="Biomarkers"
            title="Seven measurements, from the 21 landmarks the camera tracks."
          />
          <div className={page.biomarkerSplit}>
            <Reveal className={page.biomarkerVisual}>
              <Visual item={media.tracking} sizes="(max-width: 1000px) 100vw, 440px" />
            </Reveal>
            <div className={page.metricGrid}>
              {metrics.map((metric, index) => (
                <Reveal className={page.metricCard} delay={index * 0.04} key={metric.name}>
                  <h3>{metric.name}</h3>
                  <p>{metric.text}</p>
                  <code>{metric.code}</code>
                </Reveal>
              ))}
            </div>
          </div>
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
              <Image
                src="/clinical/dashboard.png"
                alt="The clinical dashboard: patients ordered by who needs attention first"
                width={1914}
                height={942}
                sizes="(max-width: 900px) 100vw, 1120px"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 64 }}>
              <Visual item={media.clinic} className={home.wideVisual} sizes="1120px" />
            </div>
          </Reveal>
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
