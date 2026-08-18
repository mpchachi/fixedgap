'use client';

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
};

const partners = [
  { name: 'AWS', logo: '/logos/aws.png' },
  { name: 'SaturnoLabs', logo: '/logos/saturno.png' },
  { name: 'Ayuntamiento de Madrid', logo: '/logos/ayuntamiento-madrid.png' },
  { name: 'Real Colegio Complutense at Harvard', logo: '/logos/Real_Colegio_Complutense.png' },
  { name: 'Universidad Complutense de Madrid', logo: '/logos/Universidad_Complutense.png' },
  { name: 'Comunidad de Madrid', logo: '/logos/ComunidadMadrid.png' },
  { name: 'Bosch', logo: '/logos/BoschDefinitivo.png' },
  { name: 'Cátedra Bosch', logo: '/logos/catedraBosch.jpeg' },
];

// Duplicated for the seamless infinite loop
const allPartners = [...partners, ...partners, ...partners];

export default function Traction() {
  return (
    <section className="overflow-hidden border-y border-brand-border/50 bg-brand-cream/40 py-14">
      {/* SEO heading - invisible */}
      <h2 style={srOnly}>Backed by Harvard and Leading Healthcare Organizations</h2>

      <div className="container-fg mb-10 text-center">
        <p className="text-sm font-medium tracking-wide text-brand-muted">
          Backed and supported by
        </p>
      </div>

      {/* Logo marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent" />

        {/* Animated track */}
        <div
          className="flex w-max items-center gap-16 px-6 py-2"
          style={{ animation: 'scroll-logos 28s linear infinite' }}
        >
          {allPartners.map((partner, index) => (
            <div
              key={index}
              className="flex h-10 shrink-0 items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-7 w-auto max-w-[110px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="scroll-logos"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
