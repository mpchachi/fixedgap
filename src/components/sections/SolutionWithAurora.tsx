'use client'

import { motion } from 'framer-motion'
import { Monitor, Activity, FileText } from 'lucide-react'
import { AuroraBackground } from '@/components/ui/aurora-background'

const COLORS = {
  bg: '#0A0F1E',
  label: '#6B7689',
  headline: '#FFFFFF',
  body: '#98A2B3',
  cardBg: '#FFFFFF',
  cardBorder: '#E8E0D0',
  cardTitle: '#1A1F3C',
  cardBody: '#6B7689',
  cardNumber: '#1F4C9C',
  cardNumberBg: '#EAF0FA',
  lineColor: '#1F4C9C',
  iconBg: '#EAF0FA',
  iconColor: '#1F4C9C',
  accentBlue: '#1F4C9C',
}

const steps = [
  {
    number: '01',
    icon: Monitor,
    title: 'Patient opens FixedGap',
    subtitle: 'The experience',
    points: [
      'Under 5 minutes',
      'No setup required',
      'Any device with a camera',
      'Engaging fishing game',
    ]
  },
  {
    number: '02',
    icon: Activity,
    title: 'Computer vision captures movement',
    subtitle: 'The technology',
    points: [
      '13 clinical biomarkers',
      'Real-time landmark tracking',
      'No data leaves the device',
      'ML models process instantly',
    ]
  },
  {
    number: '03',
    icon: FileText,
    title: 'Neurologist receives the report',
    subtitle: 'The outcome',
    points: [
      'Full clinical report',
      'Clinical Recovery Index',
      'Sent automatically',
      'Before the next appointment',
    ]
  },
]

export default function SolutionWithAurora() {
  return (
    <AuroraBackground showRadialGradient={false} className="h-auto min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            The Solution
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-4xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            Zero hardware.<br />
            <span style={{ color: COLORS.accentBlue }}>Just a webcam.</span>
          </h2>
        </motion.div>

        {/* Tres columnas con líneas conectoras */}
        <div className="mt-16 relative">

          {/* Líneas conectoras - visibles solo en desktop */}
          <div className="hidden lg:block absolute top-[88px] left-0 right-0 z-0">
            <svg width="100%" height="4" style={{ overflow: 'visible' }}>
              {/* Línea del 01 al 02 */}
              <motion.line
                x1="33%" y1="2"
                x2="50%" y2="2"
                stroke={COLORS.lineColor}
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              />
              {/* Línea del 02 al 03 */}
              <motion.line
                x1="50%" y1="2"
                x2="67%" y2="2"
                stroke={COLORS.lineColor}
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {/* Grid tres columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: 'easeOut'
                }}
                viewport={{ once: true, margin: '-50px' }}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                {/* Número + icono */}
                <div className="flex items-center gap-3 mb-6">
                  <div style={{
                    backgroundColor: COLORS.cardNumberBg,
                    color: COLORS.cardNumber,
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>
                    {step.number}
                  </div>
                  <div style={{
                    backgroundColor: COLORS.iconBg,
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <step.icon size={18} style={{ color: COLORS.iconColor }} />
                  </div>
                </div>

                {/* Subtitle */}
                <p style={{ color: COLORS.accentBlue, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {step.subtitle}
                </p>

                {/* Título */}
                <h3 style={{ color: COLORS.cardTitle, fontSize: '18px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                  {step.title}
                </h3>

                {/* Puntos */}
                <div className="flex flex-col gap-2">
                  {step.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: COLORS.accentBlue,
                        flexShrink: 0,
                      }} />
                      <p style={{ color: COLORS.cardBody, fontSize: '13px', lineHeight: 1.5 }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </AuroraBackground>
  )
}
