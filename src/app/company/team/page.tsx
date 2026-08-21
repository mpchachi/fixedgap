import { TeamCarousel } from '@/components/ui/TeamCarousel'

const COLORS = {
  bg: '#FFFFFF',
  heroBg: '#0A0F1E',
  label: '#1F4C9C',
  headline: '#FFFFFF',
  heroBody: '#98A2B3',
}

export default function TeamPage() {
  return (
    <main>

      {/* Hero de la página */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            The Team
          </span>
          <h1 style={{ color: COLORS.headline }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            Built by engineers,<br />guided by medicine.
          </h1>
          <p style={{ color: COLORS.heroBody }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            FixedGap was born at the Harvard HSIL Hackathon 2026, competing
            against teams from 50 countries. Our team combines computer science,
            biomedical engineering, business strategy, and clinical medicine.
          </p>
        </div>
      </section>

      {/* Foto grupal */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="px-6 pt-12 pb-0">
        <div className="max-w-5xl mx-auto">

          {/* Foto grupal */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            width: '100%',
            aspectRatio: '16/9',
          }}>
            <img
              src="/about/oficina.jpeg"
              alt="The FixedGap team — Madrid, 2026"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>

          {/* Pie de foto */}
          <p style={{
            color: '#6B7689',
            fontSize: '13px',
            textAlign: 'center',
            marginTop: '12px',
            fontStyle: 'italic',
          }}>
            The FixedGap team — Madrid, 2026
          </p>

        </div>
      </section>

      {/* Team Carousel */}
      <section style={{ backgroundColor: COLORS.bg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase mb-16 block">
            Meet the team
          </span>
          <TeamCarousel />
        </div>
      </section>

    </main>
  )
}
