'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe3D, GlobeMarker } from '@/components/ui/3d-globe'
import { MoveRight } from 'lucide-react'

// COLORES — cambiar aquí para modificar toda la página
const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  sectionAlt: '#E8E8E8',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  tamColor: '#1F4C9C',
  samColor: '#1A1F3C',
  somColor: '#1F7A4D',
  whyNowBg: '#0A0F1E',
  whyNowText: '#FFFFFF',
  whyNowMuted: '#98A2B3',
  modelBg: '#E8E8E8',
  modelHeadline: '#1A1F3C',
  modelPrice: '#1F4C9C',
  modelBody: '#6B7689',
  modelCardBg: '#FFFFFF',
  modelCardBorder: '#E8E0D0',
}

// Marcadores del globo
const markers: GlobeMarker[] = [
  {
    lat: 40.4168,
    lng: -3.7038,
    src: 'https://flagcdn.com/w80/es.png',
    label: 'Spain',
    info: 'HQ & First Pilots',
  },
  {
    lat: 42.3601,
    lng: -71.0589,
    src: 'https://flagcdn.com/w80/us.png',
    label: 'Boston',
    info: 'U.S. Market Entry',
  },
]

const countryData: Record<string, {
  flag: string
  stats: { label: string, value: string, note?: string }[]
}> = {
  'Spain': {
    flag: '🇪🇸',
    stats: [
      { label: 'New strokes per year', value: '90,000–120,000', note: 'SEN, October 2025' },
      { label: 'Deaths per year', value: '23,000–25,000', note: 'Ministerio de Sanidad, 2024' },
      { label: 'Living with stroke sequelae', value: '330,000+', note: 'SEN prevalence data' },
      { label: 'Stroke patients per neurologist', value: '1,015', note: 'Calculated from SEN data' },
      { label: 'Strokes per hour', value: '~11', note: 'Based on 90,000/year' },
    ]
  },
  'Boston': {
    flag: '🇺🇸',
    stats: [
      { label: 'New strokes per year (US)', value: '795,000', note: 'AHA, 2024' },
      { label: 'Deaths from stroke', value: '1 every 3 min 14 sec', note: 'CDC, 2024' },
      { label: 'Adults living with stroke (US)', value: '7.8 million', note: 'CDC, 2024' },
      { label: 'First-ever strokes (US)', value: '610,000/year', note: 'AHA Heart & Stroke Statistics 2024' },
    ]
  },
}

// Ratios pacientes/neurólogo
const ratios = [
  {
    number: '1,015',
    label: 'stroke patients per neurologist in Spanish stroke units',
    context: 'Spain — SEN, October 2025',
    color: COLORS.tamColor,
  },
  {
    number: '3,367',
    label: 'stroke patients per dedicated stroke neurologist worldwide',
    context: 'Global — World Federation of Neurology',
    color: '#98A2B3',
  },
  {
    number: '4,000,000',
    label: 'patients per neurological professional in low-income countries',
    context: 'WHO Atlas 2017 — worst case ratio',
    color: '#A8261C',
  },
]

// TAM / SAM / SOM
const marketSize = [
  {
    label: 'TAM',
    value: '$42B',
    description: 'Global neurorehabilitation + digital health technologies',
    color: COLORS.tamColor,
  },
  {
    label: 'SAM',
    value: '$8-12B',
    description: 'Post-stroke rehab monitoring in U.S., Germany, France, Spain',
    color: COLORS.samColor,
  },
  {
    label: 'SOM (Year 3)',
    value: '0.5-1%',
    description: '500-1,000 subscribers or 5,000-15,000 monthly active patients',
    color: COLORS.somColor,
  },
]

// Why now
const whyNow = [
  'Rising stroke prevalence globally',
  'Increasing strain on rehabilitation workforces',
  'Shift toward digital health and remote care',
  'Computer vision now accessible without hardware',
  'Value-based care models incentivize outcomes',
  'Patients already have cameras on their devices',
]

// Business model
const businessModel = [
  {
    price: '$149-249',
    unit: 'per clinician / month',
    description: 'Hospitals and rehab clinics subscribe. The neurologist pays, the patient plays for free.'
  },
  {
    price: '$45-65',
    unit: 'per patient / month',
    description: 'Per-patient contracts with insurers. ROI argument: one prevented readmission saves $3,000-8,000.'
  },
]

export default function MarketPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Market
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            A massive, underserved market.
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            Post-stroke rehabilitation is one of the largest unmet needs
            in digital health — and it is growing.
          </p>
        </div>
      </section>

      {/* GLOBO — From Madrid to the world */}
      <section style={{ backgroundColor: COLORS.sectionBg }}
        className="py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Go-to-market
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            From Madrid to the world.
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-lg mt-4 max-w-xl leading-relaxed">
            Starting in Spain, expanding to the U.S., Germany, and France —
            targeting the largest post-stroke rehabilitation markets where
            remote monitoring is most needed.
          </p>
          <p style={{ color: COLORS.body, fontSize: '13px' }}
            className="mt-3">
            Click on a country to see stroke data
          </p>

        </div>

        {/* Globo + Card */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Globo */}
            <Globe3D
              markers={markers}
              className="h-[450px] md:h-[500px]"
              config={{
                atmosphereColor: '#4da6ff',
                atmosphereIntensity: 0.4,
                showAtmosphere: true,
                bumpScale: 3,
                autoRotateSpeed: 0.4,
              }}
              onMarkerClick={(marker) => setSelectedCountry(marker.label || null)}
            />

            {/* Card de datos */}
            <div style={{ minHeight: '300px' }}>
              {!selectedCountry ? (
                // Estado inicial — ningún país seleccionado
                <div style={{
                  backgroundColor: '#F7F9FC',
                  border: '1px solid #E8E0D0',
                  borderRadius: '16px',
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  textAlign: 'center',
                }}>
                  <p style={{ color: '#6B7689', fontSize: '14px' }}>
                    Click on a country to see stroke data
                  </p>
                </div>
              ) : (
                // Card con datos del país seleccionado
                <motion.div
                  key={selectedCountry}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E0D0',
                    borderRadius: '16px',
                    padding: '32px',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '32px' }}>
                      {countryData[selectedCountry]?.flag}
                    </span>
                    <div>
                      <p style={{ color: '#1F4C9C', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Stroke data
                      </p>
                      <h3 style={{ color: '#1A1F3C', fontSize: '20px', fontWeight: 700 }}>
                        {selectedCountry}
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {countryData[selectedCountry]?.stats.map((stat, i) => (
                      <div key={i} style={{
                        borderBottom: i < countryData[selectedCountry].stats.length - 1 ? '1px solid #E8E0D0' : 'none',
                        paddingBottom: '16px',
                      }}>
                        <p style={{ color: '#6B7689', fontSize: '12px', marginBottom: '4px' }}>
                          {stat.label}
                        </p>
                        <p style={{ color: '#1F4C9C', fontSize: '22px', fontWeight: 800, lineHeight: 1 }}>
                          {stat.value}
                        </p>
                        {stat.note && (
                          <p style={{ color: '#6B7689', fontSize: '11px', marginTop: '4px' }}>
                            Source: {stat.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Close */}
                  <button
                    onClick={() => setSelectedCountry(null)}
                    style={{
                      color: '#1F4C9C',
                      fontSize: '12px',
                      marginTop: '20px',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    ← Back to globe
                  </button>

                </motion.div>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* SECCIÓN RATIOS — THE WORKFORCE GAP */}
      <section style={{ backgroundColor: '#0A0F1E' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            The workforce gap
          </span>

          <h2 style={{ color: '#FFFFFF' }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            There are not enough neurologists.<br />
            <span style={{ color: COLORS.label }}>There never will be.</span>
          </h2>

          <p style={{ color: '#98A2B3' }}
            className="text-lg mt-4 max-w-2xl leading-relaxed">
            The stroke rehabilitation workforce shortage is structural and permanent.
            Remote monitoring is not a product feature — it is the only scalable solution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ratios.map((ratio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: '#141B2D',
                  border: `1px solid #1E2A40`,
                  borderTop: `3px solid ${ratio.color}`,
                  borderRadius: '16px',
                  padding: '28px 24px',
                }}
              >
                <p style={{
                  color: ratio.color,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}>
                  {ratio.number}
                </p>
                <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginTop: '12px', lineHeight: 1.4 }}>
                  {ratio.label}
                </p>
                <p style={{ color: '#6B7689', fontSize: '12px', marginTop: '8px' }}>
                  {ratio.context}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* TAM / SAM / SOM */}
      <section style={{ backgroundColor: COLORS.sectionAlt }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Market opportunity
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            The numbers behind the opportunity.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {marketSize.map(item => (
              <div key={item.label}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderTop: `3px solid ${item.color}`,
                  borderRadius: '16px',
                  padding: '28px 24px',
                }}>
                <p style={{ color: item.color }}
                  className="text-xs font-bold tracking-widest uppercase">
                  {item.label}
                </p>
                <p style={{ color: COLORS.headline }}
                  className="text-4xl font-bold mt-3 leading-none">
                  {item.value}
                </p>
                <p style={{ color: COLORS.body }}
                  className="text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY NOW */}
      <section style={{ backgroundColor: COLORS.whyNowBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Why now
          </span>
          <h2 style={{ color: COLORS.whyNowText }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            Six forces converging at once.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {whyNow.map((reason, index) => (
              <div key={index}
                className="flex items-start gap-4">
                <div style={{
                  backgroundColor: COLORS.label,
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}>
                  {index + 1}
                </div>
                <p style={{ color: COLORS.whyNowMuted }}
                  className="text-base leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section style={{ backgroundColor: COLORS.modelBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Business model
          </span>
          <h2 style={{ color: COLORS.modelHeadline }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            B2B SaaS. Simple and scalable.
          </h2>
          <p style={{ color: COLORS.modelBody }}
            className="text-lg mt-4 max-w-xl leading-relaxed">
            Hospitals and rehab clinics subscribe. Patients are users, not payers.
            Value-based contracts as a future phase.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {businessModel.map((model, index) => (
              <div key={index}
                style={{
                  backgroundColor: COLORS.modelCardBg,
                  border: `1px solid ${COLORS.modelCardBorder}`,
                  borderRadius: '16px',
                  padding: '28px 24px',
                }}>
                <p style={{ color: COLORS.modelPrice }}
                  className="text-4xl font-bold leading-none">
                  {model.price}
                </p>
                <p style={{ color: COLORS.label }}
                  className="text-xs font-semibold mt-2 tracking-wide">
                  {model.unit}
                </p>
                <p style={{ color: COLORS.modelBody }}
                  className="text-sm mt-4 leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: '#0A0F1E' }} className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: '#FFFFFF' }}
            className="text-3xl md:text-4xl font-bold leading-tight">
            Ready to be part of this market?
          </h2>
          <p style={{ color: '#98A2B3' }}
            className="text-lg mt-6 leading-relaxed">
            We are looking for clinical partners, investors, and early adopters.
          </p>
          <a href="/contact"
            style={{ backgroundColor: COLORS.label, color: '#FFFFFF' }}
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
            Get in touch <MoveRight size={16} />
          </a>
        </div>
      </section>

    </main>
  )
}
