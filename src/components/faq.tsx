const faqs = [
  {
    question: "Do I need to buy any hardware or sensors?",
    answer:
      "No. FixedGap uses only the camera already on your computer, tablet, or smartphone. No wearables, no VR headset, no specialized equipment.",
  },
  {
    question: "What clinical metrics does it capture?",
    answer:
      "Reaction time, eye-hand latency, movement accuracy, coordination score, completion time, error rate, and longitudinal trends. Enough for clinicians to assess whether a patient is improving, stable, or deteriorating.",
  },
  {
    question: "Is it for clinics or for home use?",
    answer:
      "Both. Patients play a short game at home while clinicians monitor recovery trends from their dashboard. It extends care beyond the clinic without adding workload.",
  },
  {
    question: "Who pays for FixedGap?",
    answer:
      "Hospitals, rehabilitation centers, and clinics subscribe. Patients are users, not payers. Future phases may include value-based contracts with insurers.",
  },
  {
    question: "What conditions does it support?",
    answer:
      "Initially, post-stroke motor rehabilitation. The same model can extend to Parkinson's disease, multiple sclerosis, and other conditions with neurological motor deficits.",
  },
];

export function Faq() {
  return (
    <section className="py-24 md:py-32 border-t border-slate-200/70">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Questions
          </h2>
          <p className="mt-4 text-slate-500 max-w-[45ch] mx-auto">
            What clinicians, patients, and investors usually ask us.
          </p>
        </div>
        <div className="mx-auto max-w-screen-sm">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 last:mb-0 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-slate-100 font-mono text-xs text-slate-500">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
