'use client';

import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function Demo() {
  return (
    <section className="section-y bg-brand-navy">
      <div className="container-fg">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow !text-[#7EA6F4]">Our Story</span>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
                The problem we are solving.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                Millions of stroke patients recover at home every day. Their
                clinical teams only see them weeks later. Watch how FixedGap
                closes this gap.
              </p>
            </div>
            <a
              href="/demo"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              See all videos <MoveRight size={16} />
            </a>
          </div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/TYvQgTtPtYA"
              title="FixedGap: Our Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="block border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
