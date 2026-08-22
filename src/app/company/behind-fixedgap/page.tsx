/* Behind FixedGap — manifesto */

const prose = 'flex flex-col gap-6 text-[1.05rem] leading-[1.85] text-[#3F4A5E]';
const lead = 'font-semibold text-[1.25rem] leading-snug text-brand-navy';
const emphasis = 'font-semibold text-brand-navy';

function Quote({
  text,
  author,
  caption,
}: {
  text: string;
  author: string;
  caption?: string;
}) {
  return (
    <figure className="mx-auto max-w-3xl border-l-4 border-brand-blue pl-8 md:pl-10">
      <blockquote className="text-[1.35rem] font-medium italic leading-relaxed text-brand-navy md:text-[1.5rem]">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-base not-italic text-brand-muted">
        <span className="font-semibold text-brand-navy">&mdash; {author}</span>
        {caption && <span className="mt-1 block text-sm">{caption}</span>}
      </figcaption>
    </figure>
  );
}

export default function BehindFixedGapPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-navy px-6 pb-24 pt-40">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow !text-[#7EA6F4]">Behind FixedGap</span>
          <h1 className="mt-4 text-5xl font-bold leading-[1.08] text-white md:text-6xl">
            Making the invisible
            <br />
            measurable.
          </h1>
        </div>
      </section>

      {/* 1 — The pattern of progress */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-3xl">
          <div className={prose}>
            <p className={lead}>
              Human progress has always followed the same pattern.
            </p>
            <p>We advance when the invisible becomes measurable.</p>
            <p>
              For most of history, time was the position of the sun. Then we
              built clocks, and sailors crossed oceans. Heat was a feeling.
              Then we built thermometers, and fever became a number a physician
              could act on. Electricity was lightning and mystery. Then we
              measured it, and built the modern world.
            </p>
            <p>
              Every leap forward begins the same way: someone builds an
              instrument, and something previously hidden becomes a signal.
            </p>
          </div>
        </div>
      </section>

      {/* Quote — Kelvin */}
      <section className="border-y border-brand-border/50 bg-brand-cream/40 px-6 py-20">
        <Quote
          text="When you can measure what you are speaking about, and express it in numbers, you know something about it; when you cannot measure it, your knowledge is of a meagre and unsatisfactory kind."
          author="Lord Kelvin"
          caption="Physicist. He gave science its language of measurement, and medicine its instruments."
        />
      </section>

      {/* 2 — Medicine's blind spot (image right) */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className={prose}>
              <p>No field took that lesson further than medicine.</p>
              <p>
                In 1816, a French physician rolled a sheet of paper into a
                tube, pressed it against a patient&apos;s chest, and heard the
                heart clearly for the first time. The stethoscope was born, and
                with it, modern diagnosis. Then the X-ray, and bone became
                visible. The ECG, and the heartbeat became a trace. The EEG,
                and the brain&apos;s electricity became readable. Sequencing,
                and heredity became text.
              </p>
              <p>
                Each instrument did the same thing: it turned a hidden
                biological process into a measurable signal. And each signal
                created a new branch of medicine.
              </p>
              <p className={lead}>
                But there is still something medicine barely sees. Recovery.
                Especially neurological recovery.
              </p>
              <p>
                Every year, millions of stroke patients leave hospitals and
                begin rehabilitation at home. And at that exact moment,
                visibility disappears.
              </p>
              <p>
                Clinicians observe isolated consultations. Patients describe
                how they feel. Families estimate progress. But the recovery
                itself remains invisible: the thousands of repetitions,
                compensations, hesitations, asymmetries, micro-improvements and
                regressions that happen every single day, unobserved.
              </p>
            </div>
            <div>
              <img
                src="/behind-fixedgap/recovery-data-visualization.jpg"
                alt="Recovery data visualization"
                className="w-full rounded-2xl object-cover ring-1 ring-brand-border/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Snapshots vs continuous */}
      <section className="section-y border-y border-brand-border/50 bg-brand-cream/40 px-6">
        <div className="mx-auto max-w-3xl">
          <div className={prose}>
            <p>
              For decades, neurological rehabilitation has depended on
              snapshots. A patient visits a clinic. Performs a few movements. A
              specialist evaluates progress. Weeks pass. The cycle repeats.
            </p>
            <p className={emphasis}>
              But recovery is not a snapshot. Recovery is continuous.
            </p>
            <p>
              A snapshot can tell you where a patient is. It cannot tell you
              where they are going. Systems built around occasional observation
              were never designed to understand continuous change. This is one
              of the largest blind spots in modern medicine.
            </p>
            <p className={lead}>
              Because what cannot be continuously measured cannot be
              continuously optimized.
            </p>
          </div>
        </div>
      </section>

      {/* Quote — Galileo (centerpiece, dark) */}
      <section className="bg-brand-navy px-6 py-24">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-[1.6rem] font-medium italic leading-relaxed text-white md:text-[1.9rem]">
            &ldquo;Measure what is measurable, and make measurable what is not
            so.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-base text-white/60">
            &mdash; attributed to Galileo Galilei
          </figcaption>
        </figure>
      </section>

      {/* 4 — Recovery is the next signal */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-3xl">
          <div className={prose}>
            <p className={lead}>We believe recovery is the next signal.</p>
            <p>
              The most important weeks after a stroke are often the least
              visible. Neuroplasticity peaks early: the brain is literally
              rewiring itself through every repetition, every attempt, every
              small correction. Tiny adaptations compound. Small differences in
              intervention during this window can change the trajectory of a
              life.
            </p>
            <p>
              And yet, precisely then, clinicians operate almost blind. Not
              because medicine lacks expertise. Because medicine still lacks
              the instrument.
            </p>
          </div>
        </div>
      </section>

      {/* Quote — Cajal */}
      <section className="border-y border-brand-border/50 bg-brand-cream/40 px-6 py-20">
        <Quote
          text="Every man can, if he so desires, become the sculptor of his own brain."
          author="Santiago Ramón y Cajal"
          caption="Nobel laureate and father of modern neuroscience. He described neuroplasticity, the very mechanism stroke rehabilitation depends on, writing from Madrid: the city where FixedGap is being built today."
        />
      </section>

      {/* 5 — Origin story (glove image) */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="/behind-fixedgap/rehabilitation-glove.jpg"
                alt="The first FixedGap prototype: a sensor glove"
                className="w-full rounded-2xl object-cover ring-1 ring-brand-border/60"
              />
            </div>
            <div className={`order-1 lg:order-2 ${prose}`}>
              <p>
                FixedGap began with a simple question: what if neurological
                recovery could become visible from anywhere?
              </p>
              <p>
                The question started as an experiment during a 36-hour
                hackathon. A handful of students. One prototype. No certainty
                that any of it would work.
              </p>
              <p>
                The first version was physical: a rehabilitation glove
                combining IMU sensors, flex tracking, EMG signals and eye
                tracking. It worked. But it taught us something more important
                than any measurement it took.
              </p>
              <p className={emphasis}>
                The instrument that changes medicine is never the most
                sophisticated one. It is the one that reaches the patient.
              </p>
              <p>
                A sensor glove could reach a lab. It could never reach millions
                of living rooms. The future of neurological monitoring would
                not belong to expensive hardware locked inside specialized
                clinics. It would belong to software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote — Brenner */}
      <section className="border-y border-brand-border/50 bg-brand-cream/40 px-6 py-20">
        <Quote
          text="Progress in science depends on new techniques, new discoveries and new ideas, probably in that order."
          author="Sydney Brenner"
          caption="Nobel laureate in Physiology or Medicine. The technique comes first. Ours is computer vision."
        />
      </section>

      {/* 6 — The rebuild (team image) */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className={prose}>
              <p>
                So we started over. We abandoned the hardware-first path and
                rebuilt FixedGap around a different conviction: the most
                scalable medical technologies are the ones that disappear. No
                wearables. No sensors. No friction. Only computation.
              </p>
              <p>
                For the first time in history, software can observe human
                movement with enough precision to turn motion into measurable
                neurological data. A standard camera is no longer just a
                camera. It is becoming this generation&apos;s stethoscope: an
                ordinary object, pointed at an invisible process, returning a
                signal.
              </p>
              <p>
                Laennec&apos;s tube of paper looked trivial the day before it
                changed diagnosis forever. The instruments that transform
                medicine usually do.
              </p>
              <p>
                Today, FixedGap uses computer vision and AI-driven motion
                analysis to transform rehabilitation exercises into measurable
                recovery signals using only a camera. Not to replace
                clinicians. To give them what every great instrument has given
                medicine: continuous visibility into a process they could
                always treat, but never truly see.
              </p>
            </div>
            <div>
              <img
                src="/behind-fixedgap/team-development.jpg"
                alt="The FixedGap team rebuilding the product around computer vision"
                className="w-full rounded-2xl object-cover ring-1 ring-brand-border/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote — Teresa of Ávila */}
      <section className="border-y border-brand-border/50 bg-brand-cream/40 px-6 py-20">
        <Quote
          text="Let nothing disturb you. Let nothing frighten you. All things pass. Patience attains everything."
          author="Teresa of Ávila"
          caption="Doctor of the Church, 16th-century Castile."
        />
      </section>

      {/* 7 — Closing */}
      <section className="section-y bg-white px-6">
        <div className="mx-auto max-w-3xl">
          <div className={prose}>
            <p>
              She wrote those words five centuries ago, about the slow,
              repetitive, unglamorous work of inner change. She could have been
              describing rehabilitation.
            </p>
            <p>
              Because stroke recovery is exactly that kind of work. It does not
              happen once every few weeks inside a hospital. It happens every
              day. At home. In repetition. In frustration. In adaptation. In
              tiny movements almost nobody notices. Recovery is patience — and
              until now, all that patience has been invisible.
            </p>
            <p className="text-[1.35rem] font-bold text-brand-navy">
              We exist to make it count.
            </p>
            <p>
              We believe the future of medicine is not episodic. It is
              continuous. The future of rehabilitation is not reactive. It is
              measurable. And the story of medicine has always been the story
              of its instruments: the tube of paper, the X-ray plate, the
              electrode, the camera.
            </p>
            <p className="text-[1.35rem] font-bold text-brand-navy">
              Recovery is the next signal. We are building its instrument.
            </p>
            <p>
              And we are building it in Madrid — the city where Cajal first
              drew, in ink, the neurons that every recovery depends on.
            </p>
            <p className="text-[1.35rem] font-bold text-brand-navy">
              That is why FixedGap exists.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
