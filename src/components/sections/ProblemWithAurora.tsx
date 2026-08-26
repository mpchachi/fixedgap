'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

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

export default function ProblemWithAurora() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const count13 = useCountUp(13, 2000, inView);
  const count795 = useCountUp(795, 2000, inView);

  const stats = [
    { number: count13, suffix: 'M', label: 'strokes every year worldwide', isZero: false },
    { number: count795, suffix: 'K', label: 'new strokes per year in the US', isZero: false },
    { number: 0, suffix: '', label: 'daily monitoring tools available at home', isZero: true },
  ];

  return (
    <AuroraBackground showRadialGradient={true} className="h-auto min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-widest text-brand-blue uppercase"
        >
          The Problem
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-brand-navy max-w-3xl leading-tight mt-4"
        >
          Every day, stroke patients recover without anyone watching.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-brand-muted text-lg max-w-2xl leading-relaxed mt-6"
        >
          Neurologists see their patients once a month. Physiotherapists twice a
          week. The rest of the time, patients are alone, with no data, no
          feedback, and no way to detect when recovery stalls. The gap between
          clinical visits is where recovery is won or lost.
        </motion.p>

        {/* Statistics */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-brand-blue pl-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg"
            >
              {stat.isZero ? (
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5, type: 'spring' }}
                  className="text-5xl font-bold text-brand-navy"
                >
                  {stat.number}
                </motion.p>
              ) : (
                <p className="text-5xl font-bold text-brand-navy">
                  {stat.number}{stat.suffix}
                </p>
              )}
              <p className="text-sm text-brand-muted mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 w-full max-w-4xl mx-auto"
        >
          <img
            src="/problem/recovery-gap.png"
            alt="Stroke rehabilitation monitoring gap"
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ display: 'block' }}
          />
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
