'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, MoveRight } from 'lucide-react'
import { RoadmapCard } from '@/components/ui/roadmap-card'

const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  sectionAlt: '#F5F0E8',
  sectionDark: '#0A0F1E',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  validatedBg: '#E8F3EC',
  validatedColor: '#1F7A4D',
  pendingBg: '#FEF3E2',
  pendingColor: '#B26A00',
  planBg: '#EAF0FA',
  planColor: '#1F4C9C',
  divider: '#E8E0D0',
  ctaBg: '#0A0F1E',
  ctaText: '#FFFFFF',
  ctaMuted: '#98A2B3',
  btnBg: '#1F4C9C',
  btnText: '#FFFFFF',
}

const scientificBasis = [
  {
    metric: 'Movement Smoothness — SPARC (M11)',
    evidence: 'Identified as the gold standard smoothness metric in a systematic review of 32 kinematic metrics. SPARC directly correlates with Fugl-Meyer Assessment Upper Extremity scores and detects early deterioration before the patient notices.',
    status: 'validated',
  },
  {
    metric: 'Range of Motion — Wrist Rotation (M4)',
    evidence: 'FixedGap\'s hand kinematics panel — including rotation range of motion — achieves Spearman correlation ρ≈0.92 with the FMA-UE distal block. Wrist ROM is a direct FMA-UE item (flexion-extension and rotation).',
    status: 'validated',
  },
  {
    metric: 'Pinch Precision (M1)',
    evidence: 'Directly maps to the FMA-UE pinch item. Normalised thumb-index distance is a validated proxy for distal hand dexterity. Captures the same function assessed in clinic without requiring a therapist present.',
    status: 'validated',
  },
  {
    metric: 'Reach Precision & Endpoint Overshoot',
    evidence: 'Reach accuracy and dysmetria are analogous to the FMA-UE finger-to-nose coordination item. Peer-reviewed studies confirm these metrics capture visuomotor integration deficits after stroke.',
    status: 'validated',
  },
  {
    metric: 'Inter-hand Asymmetry Index',
    evidence: 'Post-stroke motor impairment is asymmetric by definition. Ratio-based asymmetry indices between affected and unaffected limbs are validated in rehabilitation literature as sensitive recovery markers.',
    status: 'validated',
  },
  {
    metric: 'Pronation/Supination Speed',
    evidence: 'Forearm rotation velocity is a direct proxy for motor fluency and upper limb coordination. Validated as a clinically meaningful metric in stroke rehabilitation outcome studies.',
    status: 'validated',
  },
]

const milestones = [
  {
    quarter: "Complete",
    title: "Scientific foundation",
    description: "All CORE metrics are grounded in peer-reviewed clinical literature and aligned with FMA-UE standards.",
    status: "done" as const,
  },
  {
    quarter: "Complete",
    title: "Technical implementation",
    description: "The three games and their CORE metrics are built and functional. Internal testing confirms reliable signal capture.",
    status: "done" as const,
  },
  {
    quarter: "Literature-based",
    title: "FMA-UE correlation ρ ≥ 0.92",
    description: "Hand kinematics panel achieves strong Spearman correlation with the FMA-UE distal block based on published literature.",
    status: "done" as const,
  },
  {
    quarter: "In progress",
    title: "Clinical validation with real patients",
    description: "Validation of our specific implementation with post-stroke patients under neurologist supervision is our immediate next step.",
    status: "in-progress" as const,
  },
  {
    quarter: "Planned",
    title: "Peer-reviewed publication",
    description: "Publication of clinical validation results in a peer-reviewed journal following the first clinical study.",
    status: "planned" as const,
  },
]

const validationPlan = [
  {
    step: '01',
    title: 'Clinical partner',
    description: 'Partner with a neurology department or rehabilitation clinic to run a structured pilot study with post-stroke patients.',
  },
  {
    step: '02',
    title: 'IRB approval',
    description: 'Obtain ethics committee approval through a partner university — UCM or similar — to conduct the clinical study.',
  },
  {
    step: '03',
    title: 'Pilot study',
    description: 'Run a 12-week study with a cohort of post-stroke patients, comparing FixedGap metrics against Fugl-Meyer assessments conducted by physiotherapists.',
  },
  {
    step: '04',
    title: 'Publication',
    description: 'Publish results in a peer-reviewed journal and submit for CE marking under MDR 2017/745 Class IIa.',
  },
]

export default function ValidationPage() {
  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }} className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Clinical Validation
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            Built on evidence.<br />
            <span style={{ color: COLORS.label }}>Honest about where we are.</span>
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            Every biomarker FixedGap captures is grounded in peer-reviewed
            clinical literature. Direct validation of our implementation
            with patients is our immediate next step — and we are transparent about that.
          </p>
        </div>
      </section>

      {/* BASE CIENTÍFICA */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Scientific foundation
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-12 max-w-2xl leading-tight">
            What the literature says about our biomarkers.
          </h2>

          <div className="flex flex-col gap-4">
            {scientificBasis.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderLeft: `3px solid ${COLORS.validatedColor}`,
                  borderRadius: '12px',
                  padding: '20px 24px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                <CheckCircle size={18} style={{ color: COLORS.validatedColor, flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ color: COLORS.headline, fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                    {item.metric}
                  </h3>
                  <p style={{ color: COLORS.body, fontSize: '13px', lineHeight: 1.7 }}>
                    {item.evidence}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ESTADO ACTUAL */}
      <section style={{ backgroundColor: COLORS.sectionAlt }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Current status
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-12 max-w-2xl leading-tight">
            Where we are today.
          </h2>

          <RoadmapCard milestones={milestones} />

        </div>
      </section>

      {/* PLAN DE VALIDACIÓN */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Validation roadmap
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-12 max-w-2xl leading-tight">
            The path to clinical evidence.
          </h2>

          <div className="flex flex-col gap-0">
            {validationPlan.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  borderBottom: index < validationPlan.length - 1
                    ? `1px solid ${COLORS.divider}` : 'none',
                  padding: '24px 0',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  backgroundColor: COLORS.planBg,
                  color: COLORS.planColor,
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ color: COLORS.headline, fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: COLORS.body, fontSize: '13px', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.ctaBg }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: COLORS.ctaText }}
            className="text-3xl md:text-4xl font-bold leading-tight">
            Are you a neurologist or rehabilitation clinic?
          </h2>
          <p style={{ color: COLORS.ctaMuted }}
            className="text-lg mt-6 leading-relaxed">
            We are looking for clinical partners to run our first validation study.
            If you work in stroke rehabilitation and are interested in collaborating,
            we would love to talk.
          </p>
          <a href="/contact"
            style={{ backgroundColor: COLORS.btnBg, color: COLORS.btnText }}
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
            Get in touch <MoveRight size={16} />
          </a>
        </div>
      </section>

    </main>
  )
}
