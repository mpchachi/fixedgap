
const MANIFESTO_COLORS = {
  bg: '#FFFFFF',
  heroBg: '#0A0F1E',
  label: '#1F4C9C',
  headline: '#1A1F3C',
  body: '#3F4A5E',
  quote: '#1A1F3C',
  quoteBorder: '#1F4C9C',
  imageCaption: '#6B7689',
}

export default function BehindFixedGapPage() {
  return (
    <main>

      {/* Hero de la página */}
      <section style={{ backgroundColor: MANIFESTO_COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span style={{ color: MANIFESTO_COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Behind FixedGap
          </span>
          <h1 style={{ color: '#FFFFFF' }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Making the invisible<br />measurable.
          </h1>
        </div>
      </section>

      {/* Sección 1 — Introducción */}
      <section style={{ backgroundColor: MANIFESTO_COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-6"
              style={{ color: MANIFESTO_COLORS.body, fontSize: '1.1rem', lineHeight: 1.8 }}>
              <p style={{ fontWeight: 600, fontSize: '1.3rem', color: MANIFESTO_COLORS.headline }}>
                Human progress has always followed the same pattern.
              </p>
              <p>We advance when the invisible becomes measurable.</p>
              <p>Civilizations learned to measure time — and navigation transformed the world. We learned to measure electricity — and built modern industry. We learned to measure computation — and created the digital age.</p>
              <p>Every leap forward begins the same way: something previously hidden becomes visible.</p>
              <p style={{ fontWeight: 600, color: MANIFESTO_COLORS.headline }}>Medicine is no different.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2 — Imagen + Texto lado a lado */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto izquierda */}
            <div className="flex flex-col gap-6"
              style={{ color: MANIFESTO_COLORS.body, fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p>Over the last century, we learned to image the body, sequence DNA, monitor the heart, and analyze the brain with extraordinary precision. But there is still something medicine barely sees.</p>
              <p style={{ fontWeight: 600, fontSize: '1.2rem', color: MANIFESTO_COLORS.headline }}>Recovery. Especially neurological recovery.</p>
              <p>Every year, millions of stroke patients leave hospitals and begin rehabilitation at home. And then, something strange happens. Visibility disappears.</p>
              <p>Clinicians can observe isolated consultations. Patients can describe how they feel. Families can estimate progress. But the recovery itself — the thousands of repetitions, compensations, hesitations, asymmetries, micro-improvements and regressions that happen every day — remains largely invisible.</p>
            </div>
            {/* Imagen derecha */}
            <div>
              <img src="/behind-fixedgap/recovery-data-visualization.jpg" alt="Recovery data visualization"
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 — Texto centrado */}
      <section style={{ backgroundColor: MANIFESTO_COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6"
            style={{ color: MANIFESTO_COLORS.body, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <p>For decades, neurological rehabilitation has depended on snapshots. A patient visits a clinic. Performs a few movements. A specialist evaluates progress. Weeks pass. The cycle repeats.</p>
            <p style={{ fontWeight: 600, color: MANIFESTO_COLORS.headline }}>But recovery is not a snapshot. Recovery is continuous.</p>
            <p>And systems built around occasional observation were never designed to understand continuous change. This creates one of the largest blind spots in modern medicine.</p>
            <p style={{ fontWeight: 600, fontSize: '1.2rem', color: MANIFESTO_COLORS.headline }}>Because what cannot be continuously measured cannot be continuously optimized.</p>
          </div>
        </div>
      </section>

      {/* Sección 4 — Cita destacada */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <blockquote style={{
            borderLeft: `4px solid ${MANIFESTO_COLORS.quoteBorder}`,
            paddingLeft: '32px',
            color: MANIFESTO_COLORS.quote,
            fontStyle: 'italic',
            fontSize: '1.4rem',
            lineHeight: 1.6,
          }}>
            "Measure what is measurable, and make measurable what is not so."
            <div style={{ marginTop: '16px', fontSize: '1rem', fontStyle: 'normal', color: MANIFESTO_COLORS.body }}>
              — Galileo Galilei
            </div>
          </blockquote>
        </div>
      </section>

      {/* Sección 5 — Imagen + Texto invertido */}
      <section style={{ backgroundColor: MANIFESTO_COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagen izquierda */}
            <div className="order-2 lg:order-1">
              <img src="/behind-fixedgap/rehabilitation-glove.jpg" alt="Rehabilitation glove prototype"
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
            {/* Texto derecha */}
            <div className="order-1 lg:order-2 flex flex-col gap-6"
              style={{ color: MANIFESTO_COLORS.body, fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p>For centuries, medicine has advanced by transforming invisible biological processes into measurable signals. The heartbeat became the ECG. Electrical activity became brain imaging. Human genetics became sequencing.</p>
              <p style={{ fontWeight: 600, color: MANIFESTO_COLORS.headline }}>We believe recovery is next.</p>
              <p>The most important weeks after a stroke are often the least visible. Neuroplasticity peaks early. Tiny adaptations compound over time. Small differences in intervention can radically change long-term outcomes.</p>
              <p>And yet, during this critical window, clinicians still operate with fragmented information. Not because medicine lacks expertise. But because medicine still lacks continuous visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6 — Texto centrado */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6"
            style={{ color: MANIFESTO_COLORS.body, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <p>We believe this is about to change. Not because hospitals are changing. Not because rehabilitation itself is changing. But because vision is changing.</p>
            <p>For the first time in history, software can observe human movement with enough precision to transform motion into measurable neurological data. A standard camera is no longer just a camera. It is becoming a sensor. A new interface between human recovery and computation.</p>
            <p style={{ fontWeight: 600, fontSize: '1.2rem', color: MANIFESTO_COLORS.headline }}>We are entering a new era of medicine: one where recovery itself becomes measurable.</p>
          </div>
        </div>
      </section>

      {/* Sección 7 — Imagen + Texto lado a lado */}
      <section style={{ backgroundColor: MANIFESTO_COLORS.bg }}
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto izquierda */}
            <div className="flex flex-col gap-6"
              style={{ color: MANIFESTO_COLORS.body, fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p>FixedGap began with a simple question: what if neurological recovery could become visible from anywhere?</p>
              <p>That question started as an experiment during a 36-hour hackathon. Six students. One prototype. No certainty that any of it would work.</p>
              <p>The first version was physical: a rehabilitation glove combining IMU sensors, flex tracking, EMG signals and eye tracking systems. It worked. But more importantly, it revealed something deeper.</p>
              <p style={{ fontWeight: 600, color: MANIFESTO_COLORS.headline }}>The future of neurological monitoring would not belong to expensive hardware systems locked inside specialized clinics. The future would belong to software.</p>
            </div>
            {/* Imagen derecha */}
            <div>
              <img src="/behind-fixedgap/team-development.jpg" alt="Team working on the prototype"
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 8 — Conclusión centrada */}
      <section style={{ backgroundColor: '#F7F9FC' }}
        className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6"
            style={{ color: MANIFESTO_COLORS.body, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <p>So we started over. We abandoned the hardware-first path and rebuilt FixedGap around a different idea: the most scalable medical technologies are the ones that disappear. No wearables. No sensors. No friction. Only computation.</p>
            <p>Today, FixedGap uses computer vision and AI-driven motion analysis to transform rehabilitation exercises into measurable recovery signals using only a camera. Not to replace clinicians. But to give them something they have never truly had before: continuous visibility.</p>
            <p>Because stroke recovery does not happen once every few weeks inside a hospital. It happens every day. At home. In repetition. In frustration. In adaptation. In tiny movements almost nobody notices.</p>
            <p style={{ fontWeight: 700, fontSize: '1.3rem', color: MANIFESTO_COLORS.headline, marginTop: '1rem' }}>Until now.</p>
            <p style={{ marginTop: '2rem' }}>We believe the future of medicine is not episodic. It is continuous. The future of rehabilitation is not reactive. It is measurable. And the future of neurological care will not be defined only by treatment itself — but by humanity's ability to finally see recovery as it truly happens.</p>
            <p style={{ fontWeight: 700, fontSize: '1.3rem', color: MANIFESTO_COLORS.headline, marginTop: '1rem' }}>That is why FixedGap exists.</p>
          </div>
        </div>
      </section>

    </main>
  )
}
