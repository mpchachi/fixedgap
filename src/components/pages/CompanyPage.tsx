'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Cta, home, page, PageHero, Reveal, SectionHead, Visual, type Media } from '@/components/site/Editorial';
import TiltCard from '@/components/home/motion/TiltCard';
import SplitText from '@/components/home/motion/SplitText';
import { team } from '@/data/team';

/* Visuals for this page. Brief in /public/home/IMAGES.md (Company section). */
const media: Record<string, Media> = {
  glove: {
    src: '/about/about-2.jpeg',
    ratio: '4 / 3',
    label: 'The first prototype: the glove, the board and the wiring',
    note: '',
  },
  camera: {
    src: '/home/company-home-setup.webp',
    ratio: '4 / 3',
    label: 'The camera version: nothing on the hand, just a laptop on the kitchen table',
    note: '',
  },
  madrid: {
    src: '/GANADORES.jpeg',
    ratio: '4 / 5',
    label: 'Winning the Madrid hub, April 2026',
    note: 'Real photo.',
  },
  boston: {
    src: '/about/pilar.jpeg',
    ratio: '4 / 5',
    label: 'Second place at the global final, Pillar VC, Boston, June 2026',
    note: 'Real photo.',
  },
  harvardChan: {
    src: '/home/company-harvard-chan.webp',
    ratio: '4 / 5',
    label: 'On the steps of the Harvard T.H. Chan School of Public Health',
    note: 'Real photo.',
  },
  hbs: {
    src: '/home/company-hbs.webp',
    ratio: '4 / 5',
    label: 'Harvard Business School, during the week in Boston',
    note: 'Real photo.',
  },
};


const gloveParts = [
  ['IMU sensors', 'for 3D hand orientation and movement'],
  ['Flex sensors', 'for finger joint angles in real time'],
  ['EMG signals', 'for muscle activation patterns'],
  ['Eye tracking', 'for gaze direction and coordination'],
];

const cameraSignals = [
  'Hand landmark tracking for tremor and range of motion',
  'Gaze tracking for coordination and attention',
  'Facial symmetry scoring for motor control',
  'Movement smoothness and compensation detection',
];

export default function CompanyPage() {
  const founders = team.filter((m) => !m.advisor);
  const advisors = team.filter((m) => m.advisor);

  return (
    <main className={home.page}>
      <PageHero
        kicker="Company"
        title={'From a hackathon glove\nto a camera.'}
        lead="FixedGap started in 2026 at the Madrid hub of the Harvard HSIL Hackathon, as a 36-hour experiment by six students. This is how a hardware prototype became software, and who is building it."
      >
        <div className={page.heroFacts}>
          <div><strong>2026</strong><span>founded in Madrid</span></div>
          <div><strong>2nd</strong><span>worldwide, Harvard HSIL final</span></div>
          <div><strong>5</strong><span>co-founders</span></div>
        </div>
      </PageHero>

      <section className={`${home.section} ${page.anchor}`} id="team" style={{ paddingTop: 0 }}>
        <div className={home.shell}>
          <div className={page.teamGrid}>
            {founders.map((member, index) => (
              <Reveal delay={index * 0.06} key={member.name}>
                <TiltCard className={page.member} max={4}>
                  <div className={page.memberPhoto}>
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 760px) 100vw, 360px" />
                  </div>
                  <div className={page.memberCopy}>
                    <h3>{member.name}</h3>
                    <span>{member.title}</span>
                    <p>{member.bio}</p>
                    <div className={page.memberLinks}>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          {advisors.map((member) => (
            <Reveal key={member.name} className={page.advisorNote}>
              <span>Clinical advisor</span>
              <p>
                <strong>{member.name}</strong>, physician and PhD in Medicine, advises the team on
                clinical validation and medical research.
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${home.section} ${page.anchor}`} id="story">
        <div className={home.shell}>
          <Reveal>
            <div className={page.feature}>
              <TiltCard className={home.tilt}>
                <Visual item={media.glove} sizes="(max-width: 760px) 100vw, 540px" />
              </TiltCard>
              <div className={page.featureCopy}>
                <div className={page.phase}><i />Phase 01</div>
                <h3>The glove</h3>
                <p>
                  The first version of FixedGap was built during a 36-hour hackathon with one goal: capture
                  clinical-grade neurological data from home. It was a rehabilitation glove combining several
                  sensor systems.
                </p>
                <ul className={page.bullets}>
                  {gloveParts.map(([part, use]) => (
                    <li key={part}>
                      <span>
                        <strong>{part}</strong> {use}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={page.featureWhy}>
                  <p>
                    It worked. We captured tremor, range of motion, muscle compensation and gaze-hand coordination,
                    all metrics used in clinical stroke assessment. And as we refined it, one thing became clear:
                    the hardware was the bottleneck.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint}`}>
        <div className={home.shell}>
          <Reveal className={page.pullquote}>
            <SplitText as="p" text="The most scalable medical technologies are the ones that disappear." />
            <p>
              Every sensor we added raised cost, complexity and calibration time. Patients would need to put the
              glove on correctly. Clinicians would need to maintain it. Scaling it meant manufacturing,
              distribution and support. If we could extract the same data from a camera, something already in
              every home, every barrier between a patient and continuous monitoring would go. So we started over.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={home.section}>
        <div className={home.shell}>
          <Reveal>
            <div className={`${page.feature} ${page.featureReverse}`}>
              <TiltCard className={home.tilt}>
                <Visual item={media.camera} sizes="(max-width: 760px) 100vw, 540px" />
              </TiltCard>
              <div className={page.featureCopy}>
                <div className={page.phase}><i />Phase 02</div>
                <h3>Computer vision</h3>
                <p>
                  We rebuilt FixedGap around software-only monitoring. Instead of sensors, computer vision and
                  motion analysis extract the clinical metrics directly from video. A standard webcam becomes
                  the sensor.
                </p>
                <ul className={page.bullets}>
                  {cameraSignals.map((signal) => (
                    <li key={signal}>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
                <div className={page.featureWhy}>
                  <p>
                    Patients play a short game. The models analyse every frame. Clinicians receive a report with
                    validated metrics. No hardware, no setup.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor} ${page.onTint}`} id="boston">
        <div className={home.shell}>
          <SectionHead
            kicker="Where we are today"
            title="From Madrid to Boston."
            lead="In June 2026 FixedGap reached the global final of the Harvard Health Systems Innovation Lab Hackathon at Pillar VC in Boston. Against teams from 50 hubs, the team took second place worldwide, judged by Boston investors and faculty from the Harvard T.H. Chan School of Public Health."
          />
          <Reveal>
            <div className={`${home.twoUp} ${home.wideVisual}`}>
              <Visual item={media.madrid} sizes="(max-width: 760px) 100vw, 560px" />
              <Visual item={media.boston} sizes="(max-width: 760px) 100vw, 560px" />
            </div>
          </Reveal>
          <Reveal>
            <div className={page.feature}>
              <div className={page.featureCopy}>
                <p>
                  Five days in Boston, supported by the Real Colegio Complutense at Harvard, included visits to
                  Harvard, MIT and Massachusetts General Hospital. They shaped the next chapter: clinical
                  validation, and eventually conditions beyond stroke.
                </p>
              </div>
              <div className={page.featureCopy}>
                <p>
                  Today FixedGap is being tested with neurologists and rehabilitation clinics, with the first
                  structured validation study as the immediate goal.{' '}
                  <Link className={home.buttonText} href="/awards">
                    Awards and press <span>›</span>
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className={`${home.twoUp} ${home.wideVisual}`}>
              <Visual item={media.harvardChan} sizes="(max-width: 760px) 100vw, 560px" />
              <Visual item={media.hbs} sizes="(max-width: 760px) 100vw, 560px" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint}`}>
        <div className={home.shell}>
          <Reveal className={page.pullquote}>
            <SplitText as="p" text="Why we are building this." />
            <p>
              The long version: why recovery should be measured continuously, and what a camera changes.{' '}
              <Link className={home.buttonText} href="/company/behind-fixedgap">
                Read the manifesto <span>›</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Cta
        title="Evaluate FixedGap with your clinical team."
        text="We are looking for neurologists, rehabilitation clinics and hospitals interested in evaluating the product and taking part in clinical validation."
        action="Discuss a pilot"
      />
    </main>
  );
}
