'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

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

function useCountUp(target: number, duration: number = 2000, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

export default function Problem() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const count13 = useCountUp(13, 2000, inView);
  const count795 = useCountUp(795, 2000, inView);

  const stats = [
    { number: count13, suffix: 'M', label: 'strokes every year worldwide', isZero: false },
    { number: count795, suffix: 'K', label: 'new strokes per year in the US', isZero: false },
    { number: 0, suffix: '', label: 'daily monitoring tools available at home', isZero: true },
  ];

  return (
    <section id="problem" className="section-y bg-white">
      <div className="container-fg">
        {/* SEO headings - invisible */}
        <h2 style={srOnly}>Stroke Rehabilitation Is Failing Patients At Home</h2>
        <h3 style={srOnly}>13 million strokes every year worldwide</h3>
        <h3 style={srOnly}>Zero daily monitoring tools available at home</h3>

        <div className="max-w-5xl">
          <span className="eyebrow">The Problem</span>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] text-brand-navy md:text-5xl lg:text-6xl">
            Every day, stroke patients recover without anyone watching.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Neurologists see their patients once a month. Physiotherapists twice a
            week. The rest of the time, patients are alone, with no data, no
            feedback, and no way to detect when recovery stalls. The gap between
            clinical visits is where recovery is won or lost.
          </p>

          {/* Statistics */}
          <div ref={ref} className="mt-16 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-brand-blue pl-6">
                {stat.isZero ? (
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.5, type: 'spring' }}
                    className="text-5xl font-bold tabular-nums text-brand-navy"
                  >
                    {stat.number}
                  </motion.p>
                ) : (
                  <p className="text-5xl font-bold tabular-nums text-brand-navy">
                    {stat.number}
                    {stat.suffix}
                  </p>
                )}
                <p className="mt-2 text-sm leading-snug text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="mx-auto mt-20 w-full max-w-4xl">
            <img
              src="/problem/recovery-gap.png"
              alt="Stroke rehabilitation monitoring gap"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
