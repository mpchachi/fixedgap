import Image from "next/image";

export const metadata = {
  title: "About Us — FixedGap",
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            About FixedGap
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            From a Hackathon Prototype to a New Vision for Neurological Recovery
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            FixedGap did not begin as a company. It began as a question: what if recovery could finally become visible?
          </p>
        </div>

        {/* Origin */}
        <div className="md:grid md:grid-cols-[1.2fr_1fr] md:gap-12 md:items-center mb-24">
          <div>
            <p className="text-slate-700 leading-relaxed mb-5">
              That question emerged during a 36-hour hackathon between Harvard University and Universidad Complutense de Madrid — an environment built around pressure, speed, and impossible timelines.
            </p>
            <p className="text-slate-700 leading-relaxed mb-5">
              At the time, the team was not trying to build a startup. They were trying to solve a problem that felt strangely overlooked: why does neurological recovery become almost invisible the moment a patient leaves the hospital?
            </p>
            <p className="text-slate-500 leading-relaxed">
              That single idea became the foundation for everything that followed.
            </p>
          </div>
          <div className="mt-8 md:mt-0 relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200">
            <Image src="/about-1.jpeg" alt="FixedGap team winning Harvard HSIL 2026 hackathon" fill className="object-cover" />
          </div>
        </div>

        {/* V1 - The Glove */}
        <div className="mb-24">
          <div className="mb-8">
            <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-4">
              Phase 01
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              FixedGap V1 — The Glove
            </h2>
          </div>

          <div className="md:grid md:grid-cols-[1fr_1.2fr] md:gap-12 md:items-center">
            <div className="mb-8 md:mb-0 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200">
              <Image src="/about-2.jpeg" alt="FixedGap V1 rehabilitation glove prototype with sensors" fill className="object-cover" />
            </div>
            <div>
              <p className="text-slate-700 leading-relaxed mb-5">
                The first version of FixedGap was physical. A wearable rehabilitation glove designed to capture neurological movement signals in real time. The prototype combined IMU motion tracking, flex sensors, EMG muscle sensing, and eye tracking systems.
              </p>
              <p className="text-slate-700 leading-relaxed mb-5">
                Together, these components created a low-cost monitoring system capable of transforming rehabilitation exercises into measurable data. Most comparable systems relied on expensive clinical hardware, specialized setups, or inaccessible rehabilitation equipment.
              </p>
              <p className="text-slate-700 leading-relaxed mb-5">
                The FixedGap prototype was built for under €50.
              </p>
              <p className="text-slate-900 font-medium leading-relaxed">
                More importantly, it proved something fundamental: neurological recovery could be measured outside the clinic.
              </p>
            </div>
          </div>
        </div>

        {/* Turning Point */}
        <div className="mb-24 max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-4">
            The Turning Point
          </span>
          <p className="text-slate-700 leading-relaxed mb-5">
            After the hackathon, the team started asking harder questions. What would actually scale globally? What system could patients realistically use from home? What technology could become continuous instead of occasional?
          </p>
          <p className="text-slate-700 leading-relaxed mb-5">
            The answer slowly became unavoidable. The future was not hardware. The future was visibility. And visibility at scale required software.
          </p>
          <p className="text-slate-900 font-medium leading-relaxed">
            The team made the decision to abandon the original hardware-first direction and rebuild the entire platform from the ground up. Not because the glove failed. But because the opportunity ahead was far bigger than the device itself.
          </p>
        </div>

        {/* V2 - Computer Vision */}
        <div className="mb-24">
          <div className="mb-8">
            <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-4">
              Phase 02
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              FixedGap V2 — Computer Vision
            </h2>
          </div>

          <div className="md:grid md:grid-cols-[1.2fr_1fr] md:gap-12 md:items-start">
            <div>
              <p className="text-slate-700 leading-relaxed mb-5">
                The second version of FixedGap removed almost all physical friction. No wearables. No sensors. No specialized equipment. Only a camera.
              </p>
              <p className="text-slate-700 leading-relaxed mb-5">
                Using computer vision and AI-driven movement analysis, FixedGap began transforming human motion into measurable clinical signals directly from standard video input. The platform evolved around AI landmark tracking, upper-limb movement analysis, facial symmetry detection, motion quality metrics, recovery trajectory modeling, and remote rehabilitation monitoring.
              </p>
              <p className="text-slate-700 leading-relaxed mb-5">
                What once required hardware could now happen through software alone. This was not simply a technical improvement. It represented a completely different philosophy.
              </p>
              <p className="text-slate-900 font-medium leading-relaxed">
                The most scalable medical technologies are the ones that disappear. Instead of forcing patients to adapt to hardware, FixedGap adapts to patients.
              </p>
            </div>
            <div className="mt-8 md:mt-0 space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200">
                <Image src="/about-4.jpeg" alt="FixedGap clinical dashboard with real-time computer vision tracking" fill className="object-cover" />
              </div>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200">
                <Image src="/about-3.jpeg" alt="FixedGap gamified rehabilitation interface" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* From Motion to Meaning */}
        <div className="mb-24 border border-slate-200 rounded-2xl bg-white/60 p-8 md:p-12">
          <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-6">
            From Motion to Meaning
          </span>
          <div className="md:grid md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-slate-700 leading-relaxed mb-5">
                At its core, FixedGap is building a new layer of visibility for neurological care. Not just tracking movement. Understanding recovery.
              </p>
              <p className="text-slate-700 leading-relaxed mb-5">
                Every rehabilitation session contains signals: coordination, asymmetry, hesitation, adaptation, fatigue, compensation, improvement. Historically, most of those signals disappeared between appointments.
              </p>
            </div>
            <div>
              <p className="text-slate-700 leading-relaxed mb-5">
                FixedGap exists to make them measurable continuously. Because recovery does not happen once every few weeks inside a clinic. It happens every day. At home. In repetition. In frustration. In adaptation. In thousands of moments nobody has historically been able to observe.
              </p>
              <p className="text-slate-900 font-medium leading-relaxed">
                Until now.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <div className="md:grid md:grid-cols-[1fr_1.2fr] md:gap-12 md:items-center">
            <div className="mb-8 md:mb-0 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200">
              <Image src="/about-team.jpg" alt="FixedGap team working together" fill className="object-cover" />
            </div>
            <div>
              <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-4">
                The Team
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
                Built by an Interdisciplinary Team
              </h2>
              <p className="text-slate-700 leading-relaxed mb-5">
                FixedGap emerged from the collaboration between students and builders across artificial intelligence, software engineering, neuroscience, product design, and business strategy.
              </p>
              <p className="text-slate-900 font-medium leading-relaxed">
                Different disciplines. One shared obsession: making neurological recovery visible.
              </p>
            </div>
          </div>
        </div>

        {/* What Comes Next */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1 mb-6">
            What Comes Next
          </span>
          <p className="text-slate-700 leading-relaxed mb-5">
            FixedGap is still early. But the vision is clear. We believe the future of rehabilitation will be continuous, measurable, remote-first, personalized, and deeply software-driven. Not because healthcare is becoming less human. But because better visibility creates better care.
          </p>
          <p className="text-slate-700 leading-relaxed mb-5">
            The goal is not to replace clinicians. The goal is to give them something medicine has rarely had before:
          </p>
          <p className="text-xl font-bold text-slate-900 tracking-tight">
            Continuous understanding of recovery itself.
          </p>
          <p className="text-slate-500 mt-4">
            And this is only the beginning.
          </p>
        </div>
      </div>
    </section>
  );
}
