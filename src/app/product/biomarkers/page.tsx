'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = {
  bg: '#FFFFFF',
  heroBg: '#0A0F1E',
  label: '#1F4C9C',
  headline: '#FFFFFF',
  heroBody: '#98A2B3',
  categoryBg: '#F7F9FC',
  categoryBorder: '#E8E0D0',
  categoryActive: '#1F4C9C',
  categoryActiveBg: '#EAF0FA',
  categoryText: '#1A1F3C',
  categoryTextActive: '#1F4C9C',
  cardBg: '#FFFFFF',
  cardBorder: '#E8E0D0',
  cardShadow: '0 8px 32px rgba(31,76,156,0.10)',
  metricTitle: '#1A1F3C',
  metricBody: '#6B7689',
}

interface Metric {
  name: string
  subtitle: string
  description: string
  insight: string
  priority?: string
}

const categories = [
  {
    id: 'pastillas',
    label: 'Pill Organizer',
    subtitle: 'Pinch & fine motor control',
    metrics: [
      {
        name: 'Pinch Precision',
        subtitle: 'M1: pinch_precision',
        description: 'Normalised distance between thumb (L4) and index finger (L8) relative to palm width. Captures the accuracy and consistency of the pinch gesture.',
        insight: 'Core marker of distal hand function after stroke. Directly maps to the FMA-UE pinch item.',
        priority: 'CORE',
      },
      {
        name: 'Reach Precision',
        subtitle: 'reach_precision',
        description: 'Distance between the endpoint of the reach movement and the target, plus transit time. Measures visuomotor coordination and spatial accuracy.',
        insight: 'Captures the integration of vision and hand movement: one of the first functions to degrade after stroke.',
        priority: 'CORE',
      },
      {
        name: 'Endpoint Overshoot',
        subtitle: 'endpoint_overshoot',
        description: 'Distance between the stopping position and the intended target. Measures dysmetria: the tendency to overshoot or undershoot a target.',
        insight: 'Dysmetria is a hallmark of cerebellar and motor cortex damage. Tracking it session by session reveals recovery of motor planning.',
        priority: 'CORE',
      },
      {
        name: 'Movement Smoothness (SPARC)',
        subtitle: 'M11: Spectral Arc Length',
        description: 'Spectral Arc Length of the velocity profile. Measures how fluid or jerky the movement is: healthy movement is smooth, neurologically impaired movement is fragmented.',
        insight: 'Single most sensitive kinematic marker of neurological motor recovery. Correlates directly with FMA-UE scores.',
        priority: 'CORE',
      },
    ]
  },
  {
    id: 'lampara',
    label: 'Light Switch',
    subtitle: 'Finger extension & bilateral asymmetry',
    metrics: [
      {
        name: 'Index Finger Extension Accuracy',
        subtitle: 'index_extension_acc',
        description: 'Extension of the index finger toward the target: angle at the metacarpophalangeal joint. Measures isolated finger extension, a key recovery milestone after stroke.',
        insight: 'Loss of isolated finger extension is one of the most common and disabling consequences of stroke. Its recovery signals cortical reorganisation.',
        priority: 'CORE',
      },
      {
        name: 'Hand Opening Speed',
        subtitle: 'M2',
        description: 'Speed of separation of all 5 fingers relative to the palm centroid. Measures how quickly the patient can open their hand voluntarily.',
        insight: 'Hand opening speed drops sharply after stroke and recovers in a predictable pattern, making it a reliable longitudinal marker.',
        priority: 'CORE',
      },
      {
        name: 'Reach Precision',
        subtitle: 'reach_precision',
        description: 'Distance between endpoint and target plus transit time during the reach toward the switch.',
        insight: 'Same metric as the pill organizer: measuring it across different tasks reveals whether the deficit is task-specific or generalised.',
        priority: 'CORE',
      },
      {
        name: 'Movement Smoothness (SPARC)',
        subtitle: 'M11: Spectral Arc Length',
        description: 'Smoothness of the reach gesture toward the light switch. Fragmented movement indicates impaired motor control.',
        insight: 'Gold standard smoothness metric. Validated in a systematic review of 32 kinematic metrics.',
        priority: 'CORE',
      },
    ]
  },
  {
    id: 'jarra',
    label: 'Water Jug',
    subtitle: 'Wrist rotation & pronation/supination',
    metrics: [
      {
        name: 'Rotation Range of Motion',
        subtitle: 'M4: range_of_motion',
        description: 'Maximum angle of wrist rotation, normalised by the patient\'s own baseline maximum. Measures how far the patient can rotate the wrist in a pouring motion.',
        insight: 'Wrist rotation is among the first movements affected after stroke and among the last to recover. Daily tracking captures the recovery curve precisely.',
        priority: 'CORE',
      },
      {
        name: 'Pronation/Supination Speed',
        subtitle: 'pronosup_speed',
        description: 'Mean angular velocity of the repeated rotation gesture. Measures how quickly the patient can pronate and supinate the forearm.',
        insight: 'Speed of forearm rotation is a direct proxy for motor fluency and muscle coordination: key indicators of upper limb recovery.',
        priority: 'CORE',
      },
      {
        name: 'Movement Smoothness (SPARC)',
        subtitle: 'M11: Spectral Arc Length',
        description: 'Smoothness of the rotation velocity profile during the pouring movement.',
        insight: 'Fragmented rotation (even with adequate range) indicates persisting motor control impairment.',
        priority: 'CORE',
      },
    ]
  },
  {
    id: 'derived',
    label: 'Derived Metrics',
    subtitle: 'Inter-hand asymmetry & recovery tracking',
    metrics: [
      {
        name: 'Inter-hand Asymmetry Index',
        subtitle: 'asymmetry_index',
        description: 'Ratio of the affected hand metric to the unaffected hand metric, for velocity, precision, and SPARC. Quantifies the performance gap between both hands.',
        insight: 'Post-stroke motor impairment is almost always asymmetric. Tracking how the gap closes over time is one of the most clinically meaningful recovery indicators.',
        priority: 'CORE',
      },
      {
        name: 'Recovery Gap',
        subtitle: 'recovery_gap',
        description: 'Absolute difference between the unaffected and affected hand performance over time. Shows directly how much recovery has occurred session by session.',
        insight: 'A single number that tells the neurologist how far the patient still has to go, and how fast they are getting there.',
        priority: 'CORE',
      },
    ]
  },
]

export default function BiomarkersPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const active = categories.find(c => c.id === activeCategory)!

  return (
    <main>

      {/* Hero */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Biomarkers
          </span>
          <h1 style={{ color: COLORS.headline }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            Hand Rehabilitation<br />Biomarkers.
          </h1>
          <p style={{ color: COLORS.heroBody }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            Core biomarkers extracted from hand movement through computer vision
            across three game-based exercises. No hardware required.
          </p>
        </div>
      </section>

      {/* Selector + Flashcards */}
      <section style={{ backgroundColor: COLORS.bg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Columna izquierda - categorías */}
            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    backgroundColor: activeCategory === cat.id
                      ? COLORS.categoryActiveBg : COLORS.categoryBg,
                    border: `1px solid ${activeCategory === cat.id
                      ? COLORS.categoryActive : COLORS.categoryBorder}`,
                    borderRadius: '12px',
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <p style={{
                    color: activeCategory === cat.id
                      ? COLORS.categoryTextActive : COLORS.categoryText,
                    fontWeight: 700,
                    fontSize: '15px',
                  }}>
                    {cat.label}
                  </p>
                  <p style={{
                    color: COLORS.metricBody,
                    fontSize: '12px',
                    marginTop: '4px',
                  }}>
                    {cat.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Columna derecha - flashcards animadas */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col gap-4"
                >
                  {active.metrics.map((metric, index) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                        delay: index * 0.08
                      }}
                      style={{
                        backgroundColor: COLORS.cardBg,
                        border: `1px solid ${COLORS.cardBorder}`,
                        borderRadius: '16px',
                        padding: '24px 28px',
                        boxShadow: COLORS.cardShadow,
                      }}
                    >
                      <h3 style={{ color: COLORS.metricTitle }}
                        className="text-lg font-bold">
                        {metric.name}
                      </h3>
                      <p style={{ color: COLORS.label, fontSize: '12px', fontWeight: 600 }}
                        className="mt-1">
                        {metric.subtitle}
                      </p>
                      {metric.priority === 'CORE' && (
                        <span style={{
                          backgroundColor: '#E8F3EC',
                          color: '#1F7A4D',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          marginTop: '4px',
                          display: 'inline-block',
                        }}>
                          MVP
                        </span>
                      )}
                      <p style={{ color: COLORS.metricBody }}
                        className="text-sm mt-3 leading-relaxed">
                        {metric.description}
                      </p>
                      <div style={{
                        borderTop: `1px solid ${COLORS.cardBorder}`,
                        marginTop: '16px',
                        paddingTop: '16px',
                      }}>
                        <p style={{
                          color: COLORS.metricTitle,
                          fontSize: '12px',
                          fontWeight: 600,
                          marginBottom: '4px'
                        }}>
                          Clinical insight
                        </p>
                        <p style={{ color: COLORS.metricBody }}
                          className="text-sm leading-relaxed">
                          {metric.insight}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
