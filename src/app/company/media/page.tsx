'use client'

import { ExternalLink } from 'lucide-react'

const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  sourceTag: '#1F4C9C',
  sourceTagBg: '#EAF0FA',
  dateColor: '#98A2B3',
}

const pressItems = [
  {
    source: 'Tribuna Complutense',
    logo: '/logos/Universidad_Complutense.png',
    date: 'June 22, 2026',
    title: 'El equipo de la UCM, segundo en el Harvard Health Systems Innovation Lab Hackathon 2026',
    summary: 'Coverage of the team\'s 2nd place finish in the global final, held at Pillar VC\'s offices in Boston, judged by Boston investment funds and experts from the Harvard T.H. Chan School of Public Health.',
    url: 'https://tribuna.ucm.es/news/el-equipo-de-la-ucm-segundo-en-el-harvard-health-systems-innovation-lab-hackathon-2026',
  },
  {
    source: 'The Objective',
    logo: '/theobjective.png',
    date: 'April 21, 2026',
    title: 'Seis emprendedores crean un guante para evaluar la recuperación después de un ictus',
    summary: 'In-depth interview with the founding team about the original sensor-glove prototype, built during the 36-hour hackathon, and the journey ahead to Boston.',
    url: 'https://theobjective.com/sociedad/ciencia/2026-04-21/seis-emprendedores-guante-recuperacion-ictus/',
  },
  {
    source: 'Tribuna Complutense',
    logo: '/logos/Universidad_Complutense.png',
    date: 'April 13, 2026',
    title: 'Cuatro complutenses, núcleo del equipo ganador del hackathon de la Universidad de Harvard celebrado en la UCM',
    summary: 'Coverage of the team winning the Madrid hub of the Harvard HSIL Hackathon 2026, among 190 participants at Universidad Complutense de Madrid.',
    url: 'https://tribuna.ucm.es/news/cuatro-complutenses-equipo-ganador-hackathon-universidad-harvard-celebrado-ucm',
  },
]

export default function MediaPage() {
  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }} className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Media
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            In the press.
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            Coverage of FixedGap&apos;s journey, from the Madrid hackathon
            to the global final in Boston.
          </p>
        </div>
      </section>

      {/* PRESS LIST */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {pressItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: '16px',
                padding: '28px',
                display: 'block',
                textDecoration: 'none',
              }}
              className="hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '6px',
                    border: '1px solid #E8E0D0',
                  }}>
                    <img
                      src={item.logo}
                      alt={item.source}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span style={{
                    color: COLORS.headline,
                    fontSize: '13px',
                    fontWeight: 700,
                  }}>
                    {item.source}
                  </span>
                </div>
                <span style={{ color: COLORS.dateColor, fontSize: '12px' }}>
                  {item.date}
                </span>
              </div>

              <h3 style={{ color: COLORS.headline, fontSize: '17px', fontWeight: 700, lineHeight: 1.4, marginBottom: '8px' }}>
                {item.title}
              </h3>

              <p style={{ color: COLORS.body, fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                {item.summary}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: COLORS.sourceTag, fontSize: '13px', fontWeight: 600 }}>
                Read article <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  )
}
