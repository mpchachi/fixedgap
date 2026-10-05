'use client';

import { Cta, home, page, PageHero, Reveal, SectionHead } from '@/components/site/Editorial';
import CountUp from '@/components/home/motion/CountUp';

const stats: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  impact: string;
  source: string;
}> = [
  {
    value: 69,
    suffix: '%',
    label: 'of stroke patients are not doing the rehabilitation exercises their clinician prescribed: at home, alone, unmonitored.',
    impact: 'Nearly 7 in 10 patients are not doing what was prescribed, and nobody knows.',
    source: 'NCBI. Limb heaviness as a sensorimotor disorder alters rehabilitation adherence after stroke.',
  },
  {
    value: 44,
    suffix: '%',
    label: 'of stroke survivors receive no home health or outpatient therapy at all after discharge.',
    impact: 'Almost half go home with no follow-up care whatsoever.',
    source: 'Topics in Stroke Rehabilitation, 2024. Differences in rehabilitation evaluation access for stroke survivors.',
  },
  {
    value: 50,
    suffix: '%+',
    label: 'of stroke patients can only access home-based rehabilitation, with no monitoring.',
    impact: 'More than half recover at home, invisible to their clinical team.',
    source: 'Frontiers in Medicine, 2025. Home-based exercise rehabilitation among stroke survivors.',
  },
  {
    value: 3,
    prefix: '1 in ',
    label: 'stroke patients stops rehabilitating. Average adherence is 68.6%.',
    impact: 'Even among those who start, dropping out is the norm.',
    source: 'Frontiers in Neurology, 2025. Adherence to rehabilitation exercise in acute stroke patients.',
  },
  {
    value: 1015,
    label: 'stroke patients with sequelae per neurologist in Spanish stroke units.',
    impact: 'Over a thousand patients per neurologist. Remote monitoring is the only way this scales.',
    source: 'SEN (Sociedad Española de Neurología), October 2025. 330,000 survivors divided by about 325 stroke-unit neurologists.',
  },
  {
    value: 3367,
    label: 'stroke patients per stroke neurologist worldwide.',
    impact: 'In low-income countries the ratio reaches millions per neurological professional. The workforce shortage is structural.',
    source: 'World Federation of Neurology survey. 101M survivors divided by about 30,000 dedicated stroke neurologists.',
  },
  {
    value: 5.5,
    suffix: 'M',
    decimals: 1,
    label: 'deaths from stroke every year worldwide. The second leading cause of death globally.',
    impact: 'Stroke is not rare. It is one of the most common and devastating diseases on the planet.',
    source: 'GBD 2019 Stroke Collaborators, The Lancet Neurology, 2021.',
  },
];

const foundation = [
  {
    metric: 'Movement smoothness (SPARC)',
    text: 'Identified as the gold standard smoothness metric in a systematic review of 32 kinematic metrics. Correlates directly with Fugl-Meyer upper extremity scores and picks up deterioration before the patient notices.',
  },
  {
    metric: 'Wrist rotation range of motion',
    text: 'Hand kinematics panels including rotation range achieve a Spearman correlation of about 0.92 with the FMA-UE distal block. Wrist range is a direct FMA-UE item.',
  },
  {
    metric: 'Pinch precision',
    text: 'Maps directly to the FMA-UE pinch item. Normalised thumb-index distance is a validated proxy for distal dexterity, measured without a therapist in the room.',
  },
  {
    metric: 'Reach precision and endpoint overshoot',
    text: 'Reach accuracy and dysmetria are analogous to the FMA-UE finger-to-nose coordination item. Peer-reviewed studies confirm they capture visuomotor integration deficits after stroke.',
  },
  {
    metric: 'Inter-hand asymmetry index',
    text: 'Post-stroke impairment is asymmetric by definition. Ratio-based indices between affected and unaffected limbs are validated as sensitive recovery markers.',
  },
  {
    metric: 'Pronation and supination speed',
    text: 'Forearm rotation velocity is a direct proxy for motor fluency and upper limb coordination, validated in stroke rehabilitation outcome studies.',
  },
];

const status: Array<{ when: string; title: string; text: string; state: 'done' | 'active' | 'planned' }> = [
  {
    when: 'Complete',
    title: 'Scientific foundation',
    text: 'Every core metric is grounded in peer-reviewed literature and aligned with FMA-UE items.',
    state: 'done',
  },
  {
    when: 'Complete',
    title: 'Technical implementation',
    text: 'The three games and their core metrics are built and working. Internal testing confirms reliable signal capture.',
    state: 'done',
  },
  {
    when: 'Literature-based',
    title: 'FMA-UE correlation of about 0.92',
    text: 'Strong Spearman correlation of the hand kinematics panel with the FMA-UE distal block, as reported in published studies. Not yet measured on our own implementation.',
    state: 'done',
  },
  {
    when: 'In progress',
    title: 'Clinical validation with patients',
    text: 'Validating our specific implementation with post-stroke patients under neurologist supervision. This is the immediate next step.',
    state: 'active',
  },
  {
    when: 'Planned',
    title: 'Peer-reviewed publication',
    text: 'Publication of the validation results after the first clinical study.',
    state: 'planned',
  },
];

const roadmap = [
  {
    step: '01',
    title: 'Clinical partner',
    text: 'A neurology department or rehabilitation clinic to run a structured pilot with post-stroke patients.',
  },
  {
    step: '02',
    title: 'Ethics approval',
    text: 'Ethics committee approval through a partner university (UCM or similar) to conduct the study.',
  },
  {
    step: '03',
    title: 'Pilot study',
    text: 'Twelve weeks with a cohort of post-stroke patients, comparing FixedGap metrics against Fugl-Meyer assessments by physiotherapists.',
  },
  {
    step: '04',
    title: 'Publication and CE marking',
    text: 'Publish the results in a peer-reviewed journal and submit for CE marking under MDR 2017/745, Class IIa.',
  },
];

type Reference = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  href: string;
  relevance: string;
  group: 'validated' | 'grounded';
};

const references: Reference[] = [
  {
    id: '01',
    title: 'Adaptation and feasibility of the online version of the Fugl-Meyer scale for the assessment of patients following cerebrovascular accidents',
    authors: 'Dos Santos, C.L. et al.',
    journal: 'PLOS ONE',
    year: '2024',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11502211/',
    relevance: 'Validates the Fugl-Meyer Assessment as the gold standard for upper extremity motor recovery after stroke: the scale our biomarkers correlate against.',
    group: 'validated',
  },
  {
    id: '02',
    title: 'Adaptación y validación al español de la escala Fugl-Meyer en el manejo de la rehabilitación de pacientes con ictus',
    authors: 'Blanco, M.',
    journal: 'Universidad Complutense de Madrid',
    year: '2011',
    href: 'https://produccioncientifica.ucm.es/documentos/5d39995129995206844416ea',
    relevance: 'Spanish validation of the Fugl-Meyer scale, directly relevant for our first market.',
    group: 'validated',
  },
  {
    id: '03',
    title: 'Global, regional, and national burden of stroke and its risk factors, 1990–2021: a systematic analysis for the Global Burden of Disease Study 2021',
    authors: 'GBD 2021 Stroke Collaborators',
    journal: 'Stroke',
    year: '2024',
    href: 'https://www.ahajournals.org/doi/10.1161/STROKEAHA.124.048033',
    relevance: 'Global stroke epidemiology: 12.2M new cases and 7.25M deaths per year.',
    group: 'grounded',
  },
  {
    id: '04',
    title: 'World Stroke Organization (WSO): Global Stroke Fact Sheet 2025',
    authors: 'Feigin, V.L. et al.',
    journal: 'International Journal of Stroke',
    year: '2025',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11786524/',
    relevance: 'Updated global burden. One in four people will have a stroke in their lifetime.',
    group: 'grounded',
  },
  {
    id: '05',
    title: 'Heart Disease and Stroke Statistics: 2024 Update',
    authors: 'Virani, S.S. et al.',
    journal: 'Circulation',
    year: '2024',
    href: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001209',
    relevance: '795,000 new strokes per year in the US. One death every 3 minutes and 14 seconds.',
    group: 'grounded',
  },
  {
    id: '06',
    title: 'Adherence in Digital Mental Health Apps',
    authors: 'Morales, J. et al.',
    journal: 'JMIR Human Factors',
    year: '2025',
    href: 'https://humanfactors.jmir.org/2025/1/e69464',
    relevance: 'Evidence on adherence challenges in digital health, relevant to our game-based approach.',
    group: 'grounded',
  },
  {
    id: '07',
    title: 'Effect of a Mobile Health App on Treatment Adherence in Rehabilitation',
    authors: 'Suso-Ribera, C. et al.',
    journal: 'JMIR Rehabilitation and Assistive Technologies',
    year: '2023',
    href: 'https://rehab.jmir.org/2023/1/e43507/',
    relevance: 'Digital health apps improve rehabilitation adherence, which supports the clinical rationale for a game.',
    group: 'grounded',
  },
  {
    id: '08',
    title: 'Global, regional, and national burden of stroke',
    authors: 'The Lancet Neurology collaborators',
    journal: 'The Lancet Neurology',
    year: '2026',
    href: 'https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(26)00093-1/fulltext',
    relevance: 'Most recent global burden data: over 12M new cases a year, a 70% increase over three decades.',
    group: 'grounded',
  },
];

function ReferenceList({ items }: { items: Reference[] }) {
  return (
    <div className={page.refList}>
      {items.map((ref, index) => (
        <Reveal delay={index * 0.04} key={ref.id}>
          <a className={page.ref} href={ref.href} target="_blank" rel="noreferrer">
            <span>{ref.id}</span>
            <div>
              <h4>{ref.title}</h4>
              <p>{ref.relevance}</p>
              <small>
                {ref.authors} · {ref.journal}, {ref.year}
              </small>
            </div>
            <em>Open ›</em>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export default function SciencePage() {
  return (
    <main className={home.page}>
      <PageHero
        kicker="Science"
        title={'Built on evidence.\nHonest about where we are.'}
        lead="Every biomarker FixedGap captures is grounded in peer-reviewed literature. Validating our own implementation with patients is the next step, and this page says exactly what is done and what is not."
      />

      <section className={`${home.section} ${page.anchor}`} id="evidence">
        <div className={home.shell}>
          <SectionHead
            kicker="The evidence"
            title="Rehabilitation at home is where stroke recovery is lost."
            lead="Peer-reviewed data on the scale of the problem."
          />
          <div className={page.statList}>
            {stats.map((stat, index) => (
              <Reveal className={page.stat} delay={index * 0.03} key={stat.label}>
                <strong>
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </strong>
                <div>
                  <p>{stat.label}</p>
                  <p className={page.impact}>{stat.impact}</p>
                </div>
                <small>{stat.source}</small>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor}`} id="foundation">
        <div className={home.shell}>
          <SectionHead
            kicker="Scientific foundation"
            title="What the literature says about each biomarker."
            lead="The metrics we extract were not chosen for being easy to compute. They are the ones that already correlate with the Fugl-Meyer upper extremity assessment."
          />
          <div className={page.foundation}>
            {foundation.map((item, index) => (
              <Reveal className={page.foundationItem} delay={index * 0.05} key={item.metric}>
                <h3>{item.metric}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${home.section} ${page.anchor}`} id="status">
        <div className={home.shell}>
          <SectionHead kicker="Where we are" title="Done, in progress, planned." />
          <div className={page.timeline}>
            {status.map((item, index) => (
              <Reveal
                className={`${page.timelineItem} ${item.state === 'done' ? page.done : ''} ${item.state === 'active' ? page.active : ''}`}
                delay={index * 0.05}
                key={item.title}
              >
                <span>{item.when}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor}`} id="roadmap">
        <div className={home.shell}>
          <SectionHead
            kicker="Validation roadmap"
            title="The path to clinical evidence."
          />
          <div className={page.roadmap}>
            {roadmap.map((item, index) => (
              <Reveal className={home.step} delay={index * 0.06} key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${home.section} ${page.anchor}`} id="references">
        <div className={home.shell}>
          <SectionHead
            kicker="References"
            title="The papers behind the panel."
            lead="Two groups. The first validates the methods we use directly. The second gives the clinical rationale, and our own validation of it is ongoing."
          />
          <div className={page.refGroup}>
            <h3>Directly validated</h3>
            <ReferenceList items={references.filter((r) => r.group === 'validated')} />
          </div>
          <div className={page.refGroup}>
            <h3>Clinically grounded</h3>
            <ReferenceList items={references.filter((r) => r.group === 'grounded')} />
          </div>
          <Reveal className={page.note}>
            <strong>A note on transparency</strong>
            FixedGap is in its clinical validation phase. The references above are the scientific foundation we built the
            biomarker panel on, not a direct validation of our specific product. When the first study is published, it will be
            listed here.
          </Reveal>
        </div>
      </section>

      <Cta
        title="Are you a neurologist or a rehabilitation clinic?"
        text="We are looking for clinical partners to run the first validation study. If you work in stroke rehabilitation and want to collaborate, we would like to talk."
        action="Get in touch"
      />
    </main>
  );
}
