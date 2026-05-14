export function Competition() {
  const competitors = [
    { name: "MindMaze", type: "Hardware + VR", softwareOnly: false },
    { name: "Neurofenix", type: "Wearable device", softwareOnly: false },
    { name: "Flint Rehab", type: "Sensor hardware", softwareOnly: false },
    { name: "Saebo", type: "Physical devices", softwareOnly: false },
    { name: "Rehab Ranger", type: "Wearables + Software", softwareOnly: false },
    { name: "Rehametrics", type: "Hardware + VR", softwareOnly: false },
    { name: "Constant Therapy", type: "Software (cognitive only)", softwareOnly: true },
  ];

  return (
    <section id="competition" className="py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 animate-on-scroll">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
            Competitive landscape
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Why FixedGap is different
          </h2>
          <p className="text-white/50 leading-relaxed max-w-[60ch]">
            Most solutions rely on hardware, sensors, or VR — adding cost and
            friction. FixedGap is 100% software, focused on clinician
            monitoring.
          </p>
        </div>

        <div className="animate-on-scroll delay-1 border border-white/10 rounded-2xl overflow-hidden bg-white/5 mb-8">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-5 bg-white/5 text-xs font-medium text-white/40 uppercase tracking-wider border-b border-white/5">
            <span>Company</span>
            <span className="text-center w-32">Approach</span>
            <span className="text-center w-28">Software only</span>
          </div>
          {competitors.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 border-b border-stone-50 last:border-0 items-center"
            >
              <span className="text-sm text-white/80">{c.name}</span>
              <span className="text-xs text-white/40 text-center w-32">
                {c.type}
              </span>
              <span className="text-center w-28">
                {c.softwareOnly ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-white/10 px-2.5 py-1 rounded-full">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-white/40 bg-white/10 px-2.5 py-1 rounded-full">
                    No
                  </span>
                )}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-5 items-center bg-white/[0.07] border-t-2 border-white/20">
            <span className="text-sm font-bold text-white">
              FixedGap
            </span>
            <span className="text-xs font-medium text-white/70 text-center w-32">
              Software-only (motor + visual)
            </span>
            <span className="text-center w-28">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-black bg-white px-2.5 py-1 rounded-full">
                Yes
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-on-scroll delay-2">
          <div className="border border-white/10 rounded-2xl p-7 bg-white/5">
            <h3 className="text-base font-semibold text-white mb-4">
              Our edge
            </h3>
            <ul className="space-y-3">
              {[
                "100% software — no wearables, no VR headsets",
                "Focused on clinician monitoring, not just therapy",
                "Combines hand, eye, and coordination tracking",
                "Lower cost, easier to adopt, simpler to scale",
                "Works on any device with a camera",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                  <span className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/10 rounded-2xl p-7 bg-white/5">
            <h3 className="text-base font-semibold text-white mb-4">
              Barriers to entry
            </h3>
            <ul className="space-y-3">
              {[
                "Clinical partnerships and validation data",
                "Longitudinal patient data over time",
                "AI/CV models tuned specifically for rehabilitation",
                "Trust built with clinicians over time",
                "Workflow integration without friction",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                  <svg className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
