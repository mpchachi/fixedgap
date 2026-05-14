import Image from "next/image";

export const metadata = {
  title: "Manifesto — FixedGap",
};

export default function ManifestoPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="flex w-full flex-col items-center">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight text-slate-400 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-slate-300 after:content-['']">
            FixedGap Manifesto
          </span>
        </div>

        <div className="mt-24 w-full max-w-5xl px-5">
          {/* Block 1 */}
          <div className="md:grid md:grid-cols-[1fr_380px] md:gap-10 md:items-center mb-16">
            <div className="text-justify text-slate-700 leading-relaxed">
              <p className="mb-5">Human progress has always followed the same pattern.</p>

              <p className="mb-5 font-medium text-slate-900">We advance when the invisible becomes measurable.</p>

              <p className="mb-5">Civilizations learned to measure time — and navigation transformed the world. We learned to measure electricity — and built modern industry. We learned to measure computation — and created the digital age.</p>

              <p className="mb-5">Every leap forward begins the same way: something previously hidden becomes visible.</p>

              <p className="mb-5">Medicine is no different.</p>

              <p className="mb-5">Over the last century, we learned to image the body, sequence DNA, monitor the heart, and analyze the brain with extraordinary precision. But there is still something medicine barely sees.</p>

              <p className="mb-5 font-medium text-slate-900">Recovery. Especially neurological recovery.</p>

              <p className="mb-5">Every year, millions of stroke patients leave hospitals and begin rehabilitation at home. And then, something strange happens. Visibility disappears.</p>

              <p>Clinicians can observe isolated consultations. Patients can describe how they feel. Families can estimate progress. But the recovery itself — the thousands of repetitions, compensations, hesitations, asymmetries, micro-improvements and regressions that happen every day — remains largely invisible.</p>
            </div>
            <div className="mt-8 md:mt-0 relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
              <Image src="/graficoexotico.jpg" alt="Recovery data visualization" fill className="object-cover" />
            </div>
          </div>

          {/* Block 2 */}
          <div className="md:grid md:grid-cols-[280px_1fr] md:gap-10 md:items-center mb-16">
            <div className="hidden md:block relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200">
              <Image src="/guanteexotic2.jpg" alt="Rehabilitation glove prototype" fill className="object-cover" />
            </div>
            <div className="text-justify text-slate-700 leading-relaxed">
              <p className="mb-5">For decades, neurological rehabilitation has depended on snapshots. A patient visits a clinic. Performs a few movements. A specialist evaluates progress. Weeks pass. The cycle repeats.</p>

              <p className="mb-5 font-medium text-slate-900">But recovery is not a snapshot. Recovery is continuous.</p>

              <p className="mb-5">And systems built around occasional observation were never designed to understand continuous change. This creates one of the largest blind spots in modern medicine.</p>

              <p className="mb-5 font-medium text-slate-900">Because what cannot be continuously measured cannot be continuously optimized.</p>

              <p className="mb-5 italic text-slate-500">"Measure what is measurable, and make measurable what is not so." — Galileo Galilei</p>

              <p className="mb-5">For centuries, medicine has advanced by transforming invisible biological processes into measurable signals. The heartbeat became the ECG. Electrical activity became brain imaging. Human genetics became sequencing.</p>

              <p className="mb-5 font-medium text-slate-900">We believe recovery is next.</p>

              <p className="mb-5">The most important weeks after a stroke are often the least visible. Neuroplasticity peaks early. Tiny adaptations compound over time. Small differences in intervention can radically change long-term outcomes.</p>

              <p>And yet, during this critical window, clinicians still operate with fragmented information. Not because medicine lacks expertise. But because medicine still lacks continuous visibility.</p>
            </div>
            <div className="mt-8 md:hidden relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200">
              <Image src="/guanteexotic2.jpg" alt="Rehabilitation glove prototype" fill className="object-cover" />
            </div>
          </div>

          {/* Block 3 */}
          <div className="md:grid md:grid-cols-[1fr_280px] md:gap-10 md:items-center mb-16">
            <div className="text-justify text-slate-700 leading-relaxed">
              <p className="mb-5">We believe this is about to change. Not because hospitals are changing. Not because rehabilitation itself is changing. But because vision is changing.</p>

              <p className="mb-5">For the first time in history, software can observe human movement with enough precision to transform motion into measurable neurological data. A standard camera is no longer just a camera. It is becoming a sensor. A new interface between human recovery and computation.</p>

              <p className="mb-5 font-medium text-slate-900">We are entering a new era of medicine: one where recovery itself becomes measurable.</p>

              <p className="mb-5">FixedGap began with a simple question: what if neurological recovery could become visible from anywhere?</p>

              <p className="mb-5">That question started as an experiment during a 36-hour hackathon. Six students. One prototype. No certainty that any of it would work.</p>

              <p className="mb-5">The first version was physical: a rehabilitation glove combining IMU sensors, flex tracking, EMG signals and eye tracking systems. It worked. But more importantly, it revealed something deeper.</p>

              <p>The future of neurological monitoring would not belong to expensive hardware systems locked inside specialized clinics. The future would belong to software.</p>
            </div>
            <div className="mt-8 md:mt-0 relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200">
              <Image src="/guantevaroexotic.jpg" alt="Team working on the prototype" fill className="object-cover" />
            </div>
          </div>

          {/* Final block - no image */}
          <div className="max-w-lg mx-auto text-justify text-slate-700 leading-relaxed">
            <p className="mb-5">So we started over. We abandoned the hardware-first path and rebuilt FixedGap around a different idea: the most scalable medical technologies are the ones that disappear. No wearables. No sensors. No friction. Only computation.</p>

            <p className="mb-5">Today, FixedGap uses computer vision and AI-driven motion analysis to transform rehabilitation exercises into measurable recovery signals using only a camera. Not to replace clinicians. But to give them something they have never truly had before: continuous visibility.</p>

            <p className="mb-5">Because stroke recovery does not happen once every few weeks inside a hospital. It happens every day. At home. In repetition. In frustration. In adaptation. In tiny movements almost nobody notices.</p>

            <p className="mb-5 font-medium text-slate-900">Until now.</p>

            <p className="mb-5">We believe the future of medicine is not episodic. It is continuous. The future of rehabilitation is not reactive. It is measurable. And the future of neurological care will not be defined only by treatment itself — but by humanity's ability to finally see recovery as it truly happens.</p>

            <p className="font-bold text-slate-900">That is why FixedGap exists.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
