'use client'

import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'

const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  sectionAlt: '#F5F0E8',
  sectionGray: '#F7F9FC',
  headline: '#1A1F3C',
  body: '#6B7689',
  statNumber: '#1A1F3C',
  statLabel: '#6B7689',
  statBorder: '#E8E0D0',
  statAccent: '#1F4C9C',
  sourceBg: '#F7F9FC',
  sourceBorder: '#E8E0D0',
  sourceText: '#6B7689',
  ctaBg: '#0A0F1E',
  ctaText: '#FFFFFF',
  ctaMuted: '#98A2B3',
  btnBg: '#1F4C9C',
  btnText: '#FFFFFF',
}

const stats = [
  {
    number: '69%',
    label: 'of stroke patients are not doing the rehabilitation exercises their clinician prescribed — at home, alone, unmonitored.',
    source: 'NCBI — Limb heaviness as a sensorimotor disorder alters rehabilitation adherence after stroke',
    impact: 'Nearly 7 in 10 patients are not doing what their clinician prescribed — without anyone knowing.',
  },
  {
    number: '44%',
    label: 'of stroke survivors receive no home health or outpatient therapy at all after discharge',
    source: 'Top Stroke Rehabil, 2024 — Differences in rehabilitation evaluation access for stroke survivors',
    impact: 'Almost half of all stroke patients are discharged home with no follow-up care whatsoever.',
  },
  {
    number: '50%+',
    label: 'of stroke patients can only access home-based rehabilitation — with no monitoring',
    source: 'Frontiers in Medicine, 2025 — Home-based exercise rehabilitation among stroke survivors',
    impact: 'More than half of all patients recover at home, invisible to their clinical team.',
  },
  {
    number: '1 in 3',
    label: 'stroke patients stops rehabilitating — average adherence rate is only 68.6%',
    source: 'Frontiers in Neurology, 2025 — Adherence to rehabilitation exercise in acute stroke patients',
    impact: 'Even among patients who start rehabilitation, dropout is the norm, not the exception.',
  },
  {
    number: '1,015',
    label: 'stroke patients with sequelae per neurologist in stroke units in Spain',
    source: 'SEN (Sociedad Española de Neurología), October 2025 — calculated from 330,000 survivors ÷ ~325 neurologists in stroke units',
    impact: 'Each neurologist in a Spanish stroke unit is responsible for over a thousand patients. Continuous remote monitoring is not optional — it is the only way to scale.',
  },
  {
    number: '3,367',
    label: 'stroke patients per stroke neurologist worldwide',
    source: 'World Federation of Neurology Survey — calculated from 101M stroke survivors ÷ ~30,000 dedicated stroke neurologists globally',
    impact: 'In low-income countries the ratio reaches 4,000,000 patients per neurological professional. The workforce shortage makes remote monitoring a structural necessity, not a product feature.',
  },
  {
    number: '5.5M',
    label: 'deaths from stroke every year worldwide — the second leading cause of death globally',
    source: 'GBD 2019 Stroke Collaborators, The Lancet Neurology, 2021',
    impact: 'Stroke is not a rare condition. It is one of the most devastating and common diseases on the planet.',
  },
]

export default function EvidencePage() {
  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            The Evidence
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            The rehabilitation system is failing stroke patients.
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            These are not assumptions. This is peer-reviewed clinical data
            showing the scale of what is going wrong — and why it matters.
          </p>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                borderBottom: `1px solid ${COLORS.statBorder}`,
                paddingBottom: '40px',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                {/* Número */}
                <div className="lg:col-span-1">
                  <p style={{
                    color: COLORS.statAccent,
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}>
                    {stat.number}
                  </p>
                </div>

                {/* Texto */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <p style={{ color: COLORS.statNumber, fontSize: '20px', fontWeight: 700, lineHeight: 1.4 }}>
                    {stat.label}
                  </p>
                  <p style={{ color: COLORS.body, fontSize: '15px', lineHeight: 1.7, fontStyle: 'italic' }}>
                    "{stat.impact}"
                  </p>
                  <div style={{
                    backgroundColor: COLORS.sourceBg,
                    border: `1px solid ${COLORS.sourceBorder}`,
                    borderRadius: '8px',
                    padding: '8px 14px',
                    display: 'inline-flex',
                    width: 'fit-content',
                  }}>
                    <p style={{ color: COLORS.sourceText, fontSize: '11px', fontWeight: 500 }}>
                      Source: {stat.source}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONCLUSIÓN */}
      <section style={{ backgroundColor: COLORS.sectionGray }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold leading-tight">
            The data is clear. The gap is real.
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-lg mt-6 leading-relaxed">
            Stroke patients are being discharged home and left without
            continuous monitoring. Clinicians make decisions based on
            occasional snapshots. Patients stop rehabilitating without
            anyone noticing. This is not a niche problem — it affects
            millions of people every year.
          </p>
          <p style={{ color: COLORS.body }}
            className="text-lg mt-4 leading-relaxed">
            FixedGap exists to close this gap.
          </p>
          <a href="/contact"
            style={{ backgroundColor: COLORS.btnBg, color: COLORS.btnText }}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
            Talk to us <MoveRight size={16} />
          </a>
        </div>
      </section>

    </main>
  )
}
