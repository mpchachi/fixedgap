'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Cpu, Activity, LayoutDashboard, Send } from 'lucide-react'
import HandKeypoints from '@/components/ui/HandKeypoints'

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}

// Hook de typing manual
function useTyping(text: string, active: boolean, speed: number = 30) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, active, speed])

  return displayed
}

// Componente para valores con efecto typing
function MetricValue({ value, active, COLORS }: { value: string, active: boolean, COLORS: any }) {
  const displayed = useTyping(value, active, 40)
  return (
    <span style={{ fontFamily: 'monospace' }}>
      {displayed}
      {displayed.length < value.length && active && (
        <span style={{
          opacity: 1,
          animation: 'blink 0.7s step-end infinite',
          color: COLORS.metricBar
        }}>|</span>
      )}
    </span>
  )
}

const COLORS = {
  bg: '#FFFFFF',
  label: '#1F4C9C',
  headline: '#1A1F3C',
  body: '#6B7689',
  stepNumber: '#1F4C9C',
  stepNumberBg: '#EAF0FA',
  stepActive: '#1A1F3C',
  stepInactive: '#98A2B3',
  stepBorder: '#E8E0D0',
  stepActiveBorder: '#1F4C9C',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  metricLabel: '#6B7689',
  metricValue: '#1A1F3C',
  metricBar: '#1F4C9C',
  metricBarBg: '#EAF0FA',
  criColor: '#1F4C9C',
  sentColor: '#1F7A4D',
}

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Camera captures your hand',
    body: '21 hand landmarks tracked in real time at 60fps. Any standard webcam works: no special hardware required.'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Computer vision processes movement',
    body: 'MediaPipe extracts pinch precision, reach accuracy, wrist rotation range, and movement smoothness, across three clinical games designed around FMA-UE items.'
  },
  {
    number: '03',
    icon: Activity,
    title: 'ML models compute biomarkers',
    body: 'Five browser-side machine learning models fuse raw data into validated clinical metrics. No data leaves the device.'
  },
  {
    number: '04',
    icon: LayoutDashboard,
    title: 'Clinical Recovery Index generated',
    body: 'A weighted composite score summarises hand performance across all three games, calibrated against the Fugl-Meyer Assessment scale. Inter-hand asymmetry is computed automatically.'
  },
  {
    number: '05',
    icon: Send,
    title: 'Report delivered to the neurologist',
    body: 'A full session report is automatically sent to the neurologist after every session. Before the next appointment.'
  },
]

function CRIRing({ value, color }: { value: number, color: string }) {
  const size = 96
  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r}
        stroke="#EAF0FA" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size/2} cy={size/2} r={r}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  )
}

function SessionReportCard({
  activeStep,
  COLORS,
  reportSent,
  showNotification
}: {
  activeStep: number
  COLORS: any
  reportSent: boolean
  showNotification: boolean
}) {
  const reportTitle = useTyping('Session Report', activeStep >= 0, 50)

  return (
    <div style={{ position: 'relative', minHeight: '680px' }}>

      {/* Partículas cuando el report vuela */}
      {reportSent && (
        <>
          {[
            { x: -20, y: -40, delay: 0 },
            { x: 30, y: -60, delay: 0.1 },
            { x: -40, y: -30, delay: 0.05 },
            { x: 20, y: -50, delay: 0.15 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{
                opacity: 0,
                x: particle.x,
                y: particle.y,
                scale: 0,
                transition: { duration: 0.5, delay: particle.delay }
              }}
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: COLORS.metricBar,
                pointerEvents: 'none',
              }}
            />
          ))}
        </>
      )}

      {/* Card del report - vuela hacia arriba cuando reportSent === true */}
      <motion.div
        animate={reportSent ? {
          y: -120,
          scale: 0.85,
          opacity: 0,
          transition: { duration: 0.6, ease: 'easeInOut' }
        } : {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.4, ease: 'easeOut' }
        }}
        style={{
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          boxShadow: '0 20px 60px rgba(31,76,156,0.15)',
          borderRadius: '16px',
          padding: '40px',
        }}
      >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Header del informe */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p style={{ color: COLORS.metricLabel, fontSize: '14px', letterSpacing: '0.1em', fontFamily: 'monospace' }}
            className="uppercase font-semibold">
            {reportTitle}
            {reportTitle.length < 14 && activeStep >= 0 && (
              <span style={{
                opacity: 1,
                animation: 'blink 0.7s step-end infinite',
                color: COLORS.metricBar
              }}>|</span>
            )}
          </p>
          <p style={{ color: COLORS.metricLabel, fontSize: '14px' }}
            className="mt-0.5">
            P-0001 · May 23, 2026
          </p>
        </div>
      </div>

      {/* CRI Ring - aparece en step 3 */}
      <AnimatePresence>
        {activeStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-6 pb-6"
            style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}
          >
            <CRIRing value={78} color={COLORS.criColor} />
            <div>
              <p style={{ color: COLORS.metricLabel, fontSize: '13px' }}
                className="uppercase tracking-wider font-semibold">
                Clinical Recovery Index
              </p>
              <p style={{ color: COLORS.metricValue, fontSize: '44px', fontWeight: 700, lineHeight: 1 }}
                className="mt-1">
                78<span style={{ fontSize: '18px', color: COLORS.metricLabel }}>/100</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Métricas de mano - aparecen en step 1 */}
      <AnimatePresence>
        {activeStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <p style={{ color: COLORS.metricLabel, fontSize: '13px' }}
              className="uppercase tracking-wider font-semibold mb-4">
              Hand Kinematics
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Pinch Precision', value: activeStep >= 2 ? '38 mm' : '-', progress: activeStep >= 2 ? 72 : 0 },
                { label: 'Hand Opening Speed', value: activeStep >= 2 ? '76%' : '-', progress: activeStep >= 2 ? 76 : 0 },
                { label: 'Finger Individuation', value: activeStep >= 2 ? '4 / 5' : '-', progress: activeStep >= 2 ? 80 : 0 },
              ].map(metric => (
                <div key={metric.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: COLORS.metricLabel, fontSize: '14px' }}>
                      {metric.label}
                    </span>
                    <motion.span
                      key={metric.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ color: COLORS.metricValue, fontSize: '15px', fontWeight: 700 }}
                    >
                      {activeStep >= 2 ? (
                        <MetricValue value={metric.value} active={activeStep >= 2} COLORS={COLORS} />
                      ) : (
                        metric.value
                      )}
                    </motion.span>
                  </div>
                  <div style={{ backgroundColor: COLORS.metricBarBg, height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      style={{ backgroundColor: COLORS.metricBar, height: '100%', borderRadius: '3px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 0 - keypoints animados */}
      {activeStep === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ height: '300px' }}
        >
          <HandKeypoints />
        </motion.div>
      )}

      </motion.div>

      {/* Móvil con notificación - aparece cuando showNotification === true */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -30%)',
              zIndex: 10,
            }}
          >
            {/* Cuerpo del móvil */}
            <div style={{
              width: '260px',
              height: '520px',
              backgroundColor: '#1C1C1E',
              borderRadius: '40px',
              border: '8px solid #3A3A3C',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>

              {/* Notch del móvil */}
              <div style={{
                width: '80px',
                height: '24px',
                backgroundColor: '#000000',
                borderRadius: '0 0 16px 16px',
                margin: '0 auto',
                flexShrink: 0,
              }} />

              {/* Pantalla de bloqueo */}
              <div style={{
                flex: 1,
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}>

                {/* Hora */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <p style={{ color: '#FFFFFF', fontSize: '52px', fontWeight: 200, lineHeight: 1, margin: 0 }}>
                    9:41
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '4px 0 0 0' }}>
                    Monday, May 26
                  </p>
                </div>

                {/* Notificación */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(44,44,46,0.95)',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Header notificación */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      backgroundColor: COLORS.metricBar,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      fontFamily: 'monospace',
                      flexShrink: 0,
                    }}>
                      FG
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0, flex: 1 }}>
                      FIXEDGAP
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 }}>
                      now
                    </p>
                  </div>

                  {/* Contenido */}
                  <p style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, margin: '0 0 3px 0' }}>
                    New session report ready
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0, lineHeight: 1.4 }}>
                    Patient P-0001 · CRI 78/100 · Tap to review
                  </p>
                </motion.div>

              </div>

              {/* Home indicator */}
              <div style={{
                width: '100px',
                height: '4px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
                margin: '0 auto 12px',
                flexShrink: 0,
              }} />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [reportSent, setReportSent] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const TOTAL_STEPS = 5

  // Cuando activeStep cambia a 4, disparar la secuencia
  useEffect(() => {
    if (activeStep === 4) {
      setReportSent(false)
      setShowNotification(false)
      // Esperar 300ms y luego lanzar la animación
      const t1 = setTimeout(() => setReportSent(true), 300)
      // Notificación aparece cuando el report ya voló
      const t2 = setTimeout(() => setShowNotification(true), 800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setReportSent(false)
      setShowNotification(false)
    }
  }, [activeStep])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect()
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight

      if (!inView) return

      // Si estamos en el último paso y scrolleamos hacia abajo - liberar
      if (activeStep === TOTAL_STEPS - 1 && e.deltaY > 0) {
        return  // NO hacer preventDefault: dejar que el scroll normal continúe
      }

      // Si estamos en el primer paso y scrolleamos hacia arriba - liberar
      if (activeStep === 0 && e.deltaY < 0) {
        return  // NO hacer preventDefault: dejar que el scroll normal continúe
      }

      // En cualquier otro caso - interceptar el scroll
      e.preventDefault()

      if (isScrollingRef.current) return
      isScrollingRef.current = true
      setTimeout(() => { isScrollingRef.current = false }, 600)

      if (e.deltaY > 0) {
        setActiveStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1))
      } else {
        setActiveStep(prev => Math.max(prev - 1, 0))
      }
    }

    section.addEventListener('wheel', handleWheel, { passive: false })
    return () => section.removeEventListener('wheel', handleWheel)
  }, [activeStep])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: COLORS.bg,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}
      className="px-4 lg:px-6"
    >
      <div className="max-w-6xl mx-auto h-full flex flex-col justify-center relative">

        {/* SEO Headings - invisible */}
        <h2 style={srOnly}>How Post-Stroke Rehabilitation Monitoring Works</h2>
        <h3 style={srOnly}>Camera captures hand movement in real time</h3>
        <h3 style={srOnly}>ML models compute clinical biomarkers</h3>
        <h3 style={srOnly}>Neurologist receives the session report automatically</h3>

        {/* Header - siempre visible */}
        <div className="mb-3 pt-16">
          <span style={{ color: COLORS.label }}
            className="text-sm font-semibold tracking-widest uppercase">
            How it works
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight max-w-2xl">
            From webcam to clinical report.
          </h2>
        </div>

        {/* Layout dos columnas - ocupa el resto de la altura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start flex-1 lg:[grid-template-columns:1.4fr_1fr]">

          {/* Columna izquierda - pasos */}
          <div className="flex flex-col gap-8 w-full">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                animate={{
                  opacity: activeStep === index ? 1 : activeStep > index ? 0.55 : 0.55,
                  x: activeStep === index ? 0 : -8,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  padding: activeStep === index ? '24px 28px' : '20px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: activeStep === index ? COLORS.stepNumberBg : 'transparent',
                  borderLeft: activeStep === index ? `4px solid ${COLORS.stepActiveBorder}` : '4px solid transparent',
                }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-5">
                  {activeStep === index ? (
                    <div style={{
                      width: '56px',
                      height: '56px',
                      minWidth: '56px',
                      borderRadius: '12px',
                      backgroundColor: COLORS.stepNumber,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '16px',
                    }}>
                      {step.number}
                    </div>
                  ) : (
                    <div style={{
                      width: '56px',
                      height: '56px',
                      minWidth: '56px',
                      borderRadius: '12px',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.body,
                      fontWeight: 700,
                      fontSize: '15px',
                    }}>
                      {step.number}
                    </div>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{
                      color: activeStep === index ? COLORS.stepActive : COLORS.stepInactive,
                      fontWeight: activeStep === index ? 700 : 600,
                      fontSize: activeStep === index ? 'clamp(16px, 4vw, 22px)' : '18px',
                      margin: 0,
                    }}>
                      {step.title}
                    </h3>
                    {activeStep === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        style={{ color: COLORS.body, fontSize: 'clamp(13px, 3vw, 15px)', marginTop: '8px', lineHeight: 1.7 }}
                      >
                        {step.body}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Columna derecha - informe animado */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <SessionReportCard
              activeStep={activeStep}
              COLORS={COLORS}
              reportSent={reportSent}
              showNotification={showNotification}
            />
          </div>

        </div>

        {/* Indicador de progreso abajo */}
        <div className="flex items-center justify-center gap-2 pb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              style={{
                width: activeStep === index ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: activeStep === index ? COLORS.stepNumber : COLORS.stepBorder,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Flecha animada indicando scroll disponible */}
        {activeStep < TOTAL_STEPS - 1 && (
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              color: COLORS.body,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            scroll ↓
          </motion.div>
        )}

      </div>
    </section>
  )
}
