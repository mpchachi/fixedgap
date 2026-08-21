'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, Activity, Brain, Calendar, BarChart3 } from "lucide-react"

// COLORES — cambiar aquí para modificar toda la página
const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroAccent: '#1F4C9C',
  heroMuted: '#98A2B3',
  sectionBg: '#FFFFFF',
  sectionAlt: '#E8E8E8',
  label: '#1F4C9C',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  cardIcon: '#1F4C9C',
  cardIconBg: '#EAF0FA',
  imagePlaceholderBg: '#E8E0D0',
  imagePlaceholderText: '#98A2B3',
  ctaBg: '#0A0F1E',
  ctaText: '#FFFFFF',
  ctaBody: '#98A2B3',
  btnBg: '#1F4C9C',
  btnText: '#FFFFFF',
}

// Textos que rotan
const rotatingTitles = [
  "continuous recovery",
  "daily biomarkers",
  "objective progress",
  "early deterioration",
  "real-time data",
]

// Métricas del informe
const reportMetrics = [
  {
    icon: Activity,
    title: 'Clinical Recovery Index',
    description: 'Weighted composite score across the three games — pill organizer, light switch, and water jug — calibrated against the Fugl-Meyer Assessment Upper Extremity scale.'
  },
  {
    icon: Brain,
    title: 'Hand Kinematics',
    description: 'Pinch precision, reach accuracy, endpoint overshoot, wrist rotation range, and movement smoothness (SPARC) — the core metrics from each game, tracked session by session.'
  },
  {
    icon: BarChart3,
    title: 'Inter-hand Asymmetry',
    description: 'Asymmetry index and recovery gap between the affected and unaffected hand. Shows directly how much the performance gap is closing over time.'
  },
  {
    icon: Calendar,
    title: 'Adherence & Consistency',
    description: 'Session frequency, days without playing, and performance variability over time. The single strongest predictor of rehabilitation outcome outside initial impairment severity.'
  },
]

export default function DashboardPage() {
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(prev => prev === rotatingTitles.length - 1 ? 0 : prev + 1)
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber])

  return (
    <main>

      {/* HERO — texto rotando */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Clinical Dashboard
          </span>

          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-7xl font-bold mt-6 tracking-tight leading-tight">
            The neurologist<br />finally sees
            <span className="relative flex w-full justify-center overflow-hidden mt-2 pb-4 pt-1">
              &nbsp;
              {rotatingTitles.map((title, index) => (
                <motion.span
                  key={index}
                  style={{ color: COLORS.heroAccent }}
                  className="absolute font-bold"
                  initial={{ opacity: 0, y: 100 }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-10 max-w-2xl mx-auto leading-relaxed">
            After every session, FixedGap automatically generates
            a full clinical report. No manual input. No waiting.
          </p>

          <a href="/contact"
            style={{ backgroundColor: COLORS.btnBg, color: COLORS.btnText }}
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Book a Demo <MoveRight size={16} />
          </a>

        </div>
      </section>

      {/* WHAT THE NEUROLOGIST SEES */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            What the neurologist sees
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10 items-center">

            {/* Texto */}
            <div>
              <h2 style={{ color: COLORS.headline }}
                className="text-3xl md:text-4xl font-bold leading-tight">
                A complete picture of recovery. Every day.
              </h2>
              <p style={{ color: COLORS.body }}
                className="text-lg mt-6 leading-relaxed">
                After every session, FixedGap automatically generates
                a full clinical report. No manual input. No waiting. The neurologist
                opens their dashboard and sees exactly how the patient moved, how
                consistently they showed up, and whether recovery is on track —
                before the next appointment.
              </p>
              <p style={{ color: COLORS.body }}
                className="text-lg mt-4 leading-relaxed">
                Every report includes hand kinematics, movement smoothness, finger
                individuation, reaction time, and adherence data — all organized
                in a single view designed for clinical decision-making.
              </p>
            </div>

            {/* Dashboard video */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: `1px solid ${COLORS.cardBorder}`,
              aspectRatio: '16/10',
              backgroundColor: '#000000',
            }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <source src="/clinical/videoDashboard.mp4" type="video/mp4" />
              </video>
            </div>

          </div>
        </div>
      </section>

      {/* MÉTRICAS DEL INFORME */}
      <section style={{ backgroundColor: COLORS.sectionAlt }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            What's in the report
          </span>

          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            Everything the clinician needs. Nothing they don't.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {reportMetrics.map(metric => (
              <div key={metric.title}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                <div style={{
                  backgroundColor: COLORS.cardIconBg,
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <metric.icon size={20} style={{ color: COLORS.cardIcon }} />
                </div>
                <h3 style={{ color: COLORS.headline }}
                  className="text-base font-bold">
                  {metric.title}
                </h3>
                <p style={{ color: COLORS.body }}
                  className="text-sm mt-2 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: COLORS.ctaBg }} className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: COLORS.ctaText }}
            className="text-3xl md:text-4xl font-bold leading-tight">
            See what your patients are doing between appointments.
          </h2>
          <p style={{ color: COLORS.ctaBody }}
            className="text-lg mt-6 leading-relaxed">
            Book a demo and see the full clinical dashboard in action.
          </p>
          <a href="/contact"
            style={{ backgroundColor: COLORS.btnBg, color: COLORS.btnText }}
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
            Book a Demo <MoveRight size={16} />
          </a>
        </div>
      </section>

    </main>
  )
}
