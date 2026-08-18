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

const metrics = [
  { number: '13M', unit: '', label: 'strokes every year worldwide' },
  { number: '€0', unit: '', label: 'hardware cost' },
  { number: '60', unit: 's', label: 'per session' },
  { number: '795K', unit: '', label: 'new strokes per year in the US' },
  { number: '14', unit: '', label: 'clinical biomarkers on roadmap' },
];

export default function Metrics() {
  return (
    <section className="section-y border-t border-white/[0.06] bg-brand-navy">
      <div className="container-fg">
        <div className="mx-auto max-w-5xl">
          {/* SEO headings - invisible */}
          <h2 style={srOnly}>The Scale of Post-Stroke Rehabilitation</h2>
          <h3 style={srOnly}>13 million strokes every year worldwide</h3>
          <h3 style={srOnly}>795000 new strokes per year in the United States</h3>
          <h3 style={srOnly}>Zero hardware cost for post-stroke rehabilitation monitoring</h3>

          <span className="eyebrow !text-white/40">By the numbers</span>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.1] text-white md:text-5xl">
            The scale of the problem.
            <br />
            <span className="text-white/50">The precision of the solution.</span>
          </h2>

          {/* Metrics grid */}
          <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`flex flex-col gap-2 px-6 py-2 lg:px-8 ${
                  index > 0 ? 'lg:border-l lg:border-white/10' : ''
                } ${index === 0 ? 'lg:pl-0' : ''}`}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl">
                    {metric.number}
                  </span>
                  {metric.unit && (
                    <span className="text-2xl font-bold text-[#7EA6F4]">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <p className="text-[13px] leading-normal text-white/50">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
