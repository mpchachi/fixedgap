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

const stats = [
  { number: '5', label: 'Co-founders' },
  { number: '3', label: 'Universities' },
  { number: '2', label: 'Countries' },
  { number: '50', label: 'Countries competing' },
];

export default function TeamPreview() {
  return (
    <section className="section-y bg-white">
      <div className="container-fg">
        <div className="mx-auto max-w-5xl">
          {/* SEO heading - invisible */}
          <h2 style={srOnly}>The Team Behind FixedGap Post-Stroke Rehabilitation Platform</h2>

          <span className="eyebrow">The Team</span>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] text-brand-navy md:text-5xl lg:text-6xl">
            Built by engineers, guided by medicine.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            FixedGap was born at the Harvard HSIL Hackathon 2026. Our team
            combines computer science, biomedical engineering, business strategy,
            and clinical medicine — united by a single goal: making post-stroke
            recovery visible from home.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 border-y border-brand-border md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1 px-6 py-8 md:px-8 ${
                  index > 0 ? 'border-l border-brand-border' : ''
                }`}
              >
                <span className="text-4xl font-bold tabular-nums text-brand-navy">
                  {stat.number}
                </span>
                <span className="text-sm text-brand-muted">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/company/team"
              className="border-b border-brand-blue pb-0.5 text-sm font-semibold text-brand-blue transition-opacity hover:opacity-70"
            >
              Meet the full team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
