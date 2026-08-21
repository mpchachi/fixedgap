'use client'

import { motion } from 'framer-motion'
import { Building2, HeartPulse, MoveRight } from 'lucide-react'

// COLORES
const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  sectionAlt: '#F5F0E8',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  buyerBg: '#EAF0FA',
  buyerBorder: '#1F4C9C',
  userBg: '#E8F3EC',
  userBorder: '#1F7A4D',
  buyerColor: '#1F4C9C',
  userColor: '#1F7A4D',
  pricingBg: '#0A0F1E',
  pricingCard: '#141B2D',
  pricingBorder: '#1E2A40',
  pricingText: '#FFFFFF',
  pricingMuted: '#98A2B3',
  pricingAccent: '#1F4C9C',
}

export default function PricingPage() {
  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Pricing
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            Simple pricing.<br />
            <span style={{ color: COLORS.pricingAccent }}>Built for healthcare.</span>
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            The patient never pays. FixedGap is a B2B platform —
            clinics and insurers subscribe, patients benefit.
          </p>
        </div>
      </section>

      {/* BUYER VS USER */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            How it works
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight max-w-2xl">
            The patient uses it.<br />The clinic pays for it.
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-lg mt-4 max-w-2xl leading-relaxed">
            In healthcare, the person who uses a tool is rarely the person who pays for it.
            FixedGap is designed around this reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

            {/* BUYER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: COLORS.buyerBg,
                border: `2px solid ${COLORS.buyerBorder}`,
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: COLORS.buyerColor,
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                <Building2 size={12} />
                The Buyer
              </div>

              <h3 style={{ color: COLORS.headline, fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                Neurologists & Rehabilitation Clinics
              </h3>
              <p style={{ color: COLORS.body, fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                The clinic subscribes to FixedGap to monitor their patient cohort between visits.
                They receive session reports automatically, access the clinical dashboard,
                and use the data to make better treatment decisions.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  'Full access to the clinical dashboard',
                  'Automated session reports per patient',
                  'Clinical Recovery Index tracking',
                  'Early deterioration alerts',
                  'Longitudinal progress charts',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.buyerColor,
                      flexShrink: 0,
                    }} />
                    <p style={{ color: COLORS.body, fontSize: '13px' }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* USER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: COLORS.userBg,
                border: `2px solid ${COLORS.userBorder}`,
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: COLORS.userColor,
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                <HeartPulse size={12} />
                The User
              </div>

              <h3 style={{ color: COLORS.headline, fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                Post-Stroke Patients
              </h3>
              <p style={{ color: COLORS.body, fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                The patient plays a short game from home — under 5 minutes,
                no setup, no hardware. They never see a price tag.
                Their only job is to show up and play.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  'Zero cost — ever',
                  'No installation required',
                  'Any device with a camera',
                  'Under 5 minutes per session',
                  'Engaging, game-based experience',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.userColor,
                      flexShrink: 0,
                    }} />
                    <p style={{ color: COLORS.body, fontSize: '13px' }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: '#F7F9FC' }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl md:text-4xl font-bold leading-tight">
            Not sure which plan fits?
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-lg mt-4 leading-relaxed">
            Book a 30-minute call and we will walk you through the right option for your clinic or organization.
          </p>
          <a href="/contact"
            style={{ backgroundColor: COLORS.label, color: '#FFFFFF' }}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
            Book a call <MoveRight size={16} />
          </a>
        </div>
      </section>

    </main>
  )
}
