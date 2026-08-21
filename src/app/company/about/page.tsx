'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const COLORS = {
  bg: '#FFFFFF',
  heroBg: '#0A0F1E',
  label: '#1F4C9C',
  headline: '#FFFFFF',
  heroBody: '#98A2B3',
  sectionLabel: '#1F4C9C',
  sectionHeadline: '#1A1F3C',
  body: '#3F4A5E',
  phaseNumber: '#1F4C9C',
}

export default function AboutPage() {
  return (
    <main>

      {/* Hero */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Our Story
          </span>
          <h1 style={{ color: COLORS.headline }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            From a Hackathon Prototype to a New Vision for Neurological Recovery
          </h1>
          <p style={{ color: COLORS.heroBody }}
            className="text-lg mt-6 leading-relaxed">
            FixedGap began at the Harvard HSIL Hackathon 2026, competing against
            teams from 50 countries. What started as a 36-hour experiment became
            a complete rethinking of how we measure neurological recovery.
          </p>
        </div>
      </section>

      {/* Phase 01 — Imagen grande + texto superpuesto */}
      <section style={{ backgroundColor: COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Imagen destacada */}
          <div className="relative mb-12">
            <img src="/about/about-1.jpeg" alt="FixedGap V1 prototype glove"
              style={{
                width: '100%',
                height: '500px',
                borderRadius: '16px',
                objectFit: 'cover',
                objectPosition: 'center'
              }} />

            {/* Badge superpuesto */}
            <div className="absolute top-8 left-8"
              style={{
                backgroundColor: 'rgba(31, 76, 156, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '8px',
              }}>
              <span className="text-white text-sm font-bold tracking-widest uppercase">
                Phase 01
              </span>
            </div>
          </div>

          {/* Texto en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 style={{ color: COLORS.sectionHeadline }}
                className="text-4xl font-bold mb-6">
                FixedGap V1: The Glove
              </h2>
              <div className="flex flex-col gap-4"
                style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
                <p>
                  The first version of FixedGap was built during a 36-hour hackathon.
                  Six students. One ambitious goal: capture clinical-grade neurological
                  data from home.
                </p>
                <p>
                  We built a rehabilitation glove that combined multiple sensor systems:
                </p>
              </div>
            </div>
            <div>
              <ul className="space-y-4"
                style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber, fontWeight: 'bold' }}>•</span>
                  <span><strong>IMU sensors</strong> for 3D hand orientation and movement tracking</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber, fontWeight: 'bold' }}>•</span>
                  <span><strong>Flex sensors</strong> to measure finger joint angles in real-time</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber, fontWeight: 'bold' }}>•</span>
                  <span><strong>EMG signals</strong> to capture muscle activation patterns</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber, fontWeight: 'bold' }}>•</span>
                  <span><strong>Eye tracking systems</strong> for gaze direction and coordination</span>
                </li>
              </ul>
              <p className="mt-6"
                style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
                The system worked. We captured hand tremor, range of motion, muscle
                compensation, and gaze-hand coordination — all metrics used in clinical
                stroke assessment.
              </p>
              <p className="mt-4"
                style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
                But as we refined the prototype, something became clear: <strong>the
                hardware was the bottleneck</strong>.
              </p>
            </div>
          </div>

          {/* Agradecimiento Juan Antonio — Bosch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: '#F7F9FC',
              border: '1px solid #E8E0D0',
              borderRadius: '20px',
              padding: '40px 48px',
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
              margin: '48px 0',
            }}
          >
            {/* Foto Juan Antonio */}
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: '3px solid #E8E0D0',
            }}>
              <img
                src="/sponsors/JuanAntonioBosch.jpg"
                alt="Juan Antonio — Bosch"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            {/* Texto */}
            <div>
              <p style={{ color: '#1F4C9C', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Special thanks
              </p>
              <p style={{ color: '#1A1F3C', fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>
                Juan Antonio — Bosch
              </p>
              <p style={{ color: '#6B7689', fontSize: '16px', lineHeight: 1.65 }}>
                We want to extend our deepest gratitude to <strong>Juan Antonio</strong> and <strong>Bosch</strong> for their invaluable sponsorship and unwavering support during the hackathon. Your belief in our vision helped make this journey possible.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* The Turning Point — Layout asimétrico */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Texto ocupa 3 columnas */}
            <div className="lg:col-span-3">
              <h2 style={{ color: COLORS.sectionHeadline }}
                className="text-4xl font-bold mb-6">
                The Turning Point
              </h2>
              <div className="flex flex-col gap-5"
                style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
                <p>
                  Every sensor we added increased cost, complexity, and calibration time.
                  Patients would need to put on the glove correctly. Clinicians would need
                  to maintain and troubleshoot the hardware. Scaling this system globally
                  would require manufacturing, distribution, and support infrastructure.
                </p>
                <p style={{ fontWeight: 600, fontSize: '1.15rem', color: COLORS.sectionHeadline }}>
                  We realized something fundamental: the most scalable medical technologies
                  are the ones that disappear.
                </p>
                <p>
                  If we could extract the same clinical data using only a camera — something
                  already in every home — we could eliminate every barrier between patients
                  and continuous monitoring.
                </p>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  So we started over.
                </p>
              </div>
            </div>

            {/* Imagen ocupa 2 columnas */}
            <div className="lg:col-span-2">
              <img src="/about/about-2.jpeg" alt="Team analyzing data"
                style={{
                  width: '100%',
                  height: '600px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }} />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 02 — Grid 2 columnas con imagen más pequeña */}
      <section style={{ backgroundColor: COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header con badge */}
          <div className="mb-12 max-w-6xl mx-auto">
            <span style={{ color: COLORS.phaseNumber }}
              className="text-sm font-bold tracking-widest uppercase">
              Phase 02
            </span>
            <h2 style={{ color: COLORS.sectionHeadline }}
              className="text-4xl font-bold mt-3">
              FixedGap V2: Computer Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

            {/* Imagen izquierda */}
            <div className="order-2 lg:order-1">
              <img src="/about/about-3.jpeg" alt="Computer vision analysis"
                style={{
                  width: '100%',
                  height: '450px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  position: 'sticky',
                  top: '100px'
                }} />
            </div>

            {/* Texto derecha */}
            <div className="order-1 lg:order-2 flex flex-col gap-5"
              style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
              <p>
                We rebuilt FixedGap from the ground up around a different idea:
                <strong> software-only neurological monitoring</strong>.
              </p>
              <p>
                Instead of sensors, we use computer vision and AI-driven motion analysis
                to extract clinical metrics directly from video. A standard webcam becomes
                a medical-grade sensor.
              </p>
              <p style={{ fontWeight: 600, color: COLORS.sectionHeadline }}>
                FixedGap V2 captures the same 13 clinical biomarkers as the glove — but
                with zero hardware:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber }}>→</span>
                  <span>Hand landmark tracking for tremor and range of motion</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber }}>→</span>
                  <span>Gaze tracking for coordination and attention</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber }}>→</span>
                  <span>Facial symmetry scoring for motor control</span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: COLORS.phaseNumber }}>→</span>
                  <span>Movement smoothness and compensation detection</span>
                </li>
              </ul>
              <p className="mt-2">
                Patients play a short daily game. Our models analyze every frame. Clinicians
                receive a clinical report with validated metrics.
              </p>
              <p style={{ fontWeight: 600, fontSize: '1.15rem', color: COLORS.sectionHeadline, marginTop: '1rem' }}>
                No hardware. No setup. No friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Motion to Meaning — Imagen ancha + texto centrado */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-4xl mx-auto mb-12">
            <h2 style={{ color: COLORS.sectionHeadline }}
              className="text-4xl font-bold mb-6 text-center">
              From Motion to Meaning
            </h2>
            <div className="flex flex-col gap-5 text-center"
              style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
              <p>
                Today, FixedGap is being tested with neurologists, rehabilitation clinics,
                and stroke patients across multiple countries. We are part of the Harvard
                HSIL Top 30 global cohort, building the infrastructure for continuous
                neurological monitoring.
              </p>
            </div>
          </div>

          {/* Imagen ancha */}
          <div className="mb-12">
            <img src="/about/oficina.jpeg" alt="FixedGap team at Harvard HSIL"
              style={{
                width: '100%',
                height: '500px',
                borderRadius: '16px',
                objectFit: 'cover',
                objectPosition: 'center'
              }} />
          </div>

          {/* Conclusión centrada */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-5 text-center"
              style={{ color: COLORS.body, fontSize: '1.05rem', lineHeight: 1.7 }}>
              <p>
                The shift from hardware to software was not just an engineering decision.
                It was a fundamental rethinking of how medical monitoring should work in
                the 21st century.
              </p>
              <p style={{ fontWeight: 700, fontSize: '1.2rem', color: COLORS.sectionHeadline, marginTop: '1rem' }}>
                Because recovery does not happen in clinics. It happens at home. Every day.
                In thousands of tiny movements that medicine has never truly been able to see.
              </p>
              <p style={{ fontWeight: 700, fontSize: '1.2rem', color: COLORS.sectionHeadline }}>
                Until now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Madrid to Boston */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Columna izquierda — texto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span style={{ color: '#1F4C9C' }}
                className="text-xs font-semibold tracking-widest uppercase">
                Where we are today
              </span>

              <h2 style={{ color: '#1A1F3C' }}
                className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                From Madrid to Boston.
              </h2>

              <p style={{ color: '#3F4A5E' }}
                className="text-base leading-relaxed mb-4">
                In June 2026, FixedGap reached the global final of the Harvard
                Health Systems Innovation Lab Hackathon — held at Pillar VC&apos;s
                offices in Boston. Competing against teams from 50 hubs worldwide,
                the team secured{' '}
                <span style={{ color: '#1A1F3C', fontWeight: 700 }}>
                  2nd place globally
                </span>
                , judged by Boston investment funds and experts from the Harvard
                T.H. Chan School of Public Health.
              </p>

              <p style={{ color: '#3F4A5E' }}
                className="text-base leading-relaxed">
                Five days in Boston, supported by the Real Colegio Complutense
                at Harvard, included visits to Harvard, MIT, and Massachusetts
                General Hospital — shaping the next chapter: clinical validation
                and expansion beyond stroke rehabilitation.
              </p>

              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #E8E0D0',
                borderRadius: '999px',
                padding: '8px 18px',
                backgroundColor: '#EAF0FA',
                marginTop: '28px',
              }}>
                <span style={{ color: '#1A1F3C', fontSize: '13px', fontWeight: 600 }}>
                  🏆 2nd place — Harvard HSIL Hackathon 2026
                </span>
              </div>
            </motion.div>

            {/* Columna derecha — marco para foto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                backgroundColor: '#F7F9FC',
                border: '1px solid #E8E0D0',
                position: 'relative',
              }}
            >
              <Image
                src="/about/pilar.jpeg"
                alt="FixedGap team at Pillar VC - Harvard HSIL Global Final in Boston"
                fill
                style={{ objectFit: 'cover' }}
                quality={95}
                priority
              />
            </motion.div>

          </div>

        </div>
      </section>

    </main>
  )
}
