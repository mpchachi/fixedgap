export function Value() {
  return (
    <section id="value" className="py-24 md:py-32 border-t border-slate-200/70">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Value proposition
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Value for every stakeholder
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-[60ch]">
            FixedGap creates measurable value across the entire care chain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              label: "For clinicians",
              items: [
                "Continuous visibility into recovery between visits",
                "Data-driven decisions instead of patient recall",
                "Earlier detection of deterioration",
                "Better patient prioritization",
              ],
            },
            {
              label: "For patients",
              items: [
                "Engaging rehabilitation — not repetitive exercises",
                "Feel supported between appointments",
                "Increased motivation and adherence",
                "Awareness of their own progress",
              ],
            },
            {
              label: "For health systems",
              items: [
                "More patients monitored, same resources",
                "Reduced long-term costs and complications",
                "Fewer unnecessary check-ins",
                "More efficient use of specialist capacity",
              ],
            },
          ].map((group, i) => (
            <div
              key={group.label}
              className={`animate-on-scroll delay-${i + 1} border border-slate-200 rounded-2xl p-7 bg-white/60 hover:shadow-md transition-colors`}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll delay-4 border border-slate-200 rounded-2xl bg-white/60 overflow-hidden">
          <div className="p-8 md:p-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Health system impact
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Effectiveness", desc: "Earlier detection of recovery changes", icon: "+" },
                { label: "Efficiency", desc: "Monitor more patients with same resources", icon: "+" },
                { label: "Equity", desc: "Accessible without specialized wearables", icon: "+" },
                { label: "Responsiveness", desc: "Timely information between visits", icon: "+" },
                { label: "Health outcomes", desc: "Better rehab adjustments and trajectories", icon: "+" },
                { label: "Financial protection", desc: "Reduced unnecessary visits and costs", icon: "+" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
