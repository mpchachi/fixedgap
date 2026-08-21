'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Stethoscope, TrendingUp, FlaskConical } from 'lucide-react';
import Contact from '@/components/sections/Contact';

/* ------------------------------------------------------------------ */
/* Who should reach out                                                */
/* ------------------------------------------------------------------ */

const profiles = [
  {
    icon: Stethoscope,
    title: 'Neurologists & Clinicians',
    body: 'Interested in monitoring your patients between visits with objective daily data.',
  },
  {
    icon: TrendingUp,
    title: 'Investors',
    body: 'Looking to back the future of neurological rehabilitation technology.',
  },
  {
    icon: FlaskConical,
    title: 'Partners & Researchers',
    body: 'Want to collaborate, run a clinical pilot, or explore research opportunities.',
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: 'Is FixedGap available now?',
    answer:
      'We are currently in the pilot phase, working with selected neurologists and rehabilitation clinics. Contact us to join the waitlist.',
  },
  {
    question: 'How long does a demo take?',
    answer:
      'A typical demo is 30 minutes — we walk you through the patient experience and the clinical dashboard, and answer any questions.',
  },
  {
    question: 'Do I need any hardware to try it?',
    answer:
      'No. FixedGap uses only the camera already on your computer, tablet, or smartphone. No wearables, no VR headset, no specialized equipment.',
  },
  {
    question: 'What clinical metrics does it capture?',
    answer:
      'Pinch precision, hand opening speed, finger individuation, range of motion, movement smoothness, reaction time, and inter-repetition variability. Enough for clinicians to assess whether a patient is improving, stable, or deteriorating.',
  },
  {
    question: 'Is it for clinics or for home use?',
    answer:
      'Both. Patients play a short game at home while clinicians monitor recovery trends from their dashboard. It extends care beyond the clinic without adding workload.',
  },
  {
    question: 'Who pays for FixedGap?',
    answer:
      'Hospitals, rehabilitation centers, and clinics subscribe. Patients are users, not payers. Future phases may include value-based contracts with insurers.',
  },
  {
    question: 'What conditions does it support?',
    answer:
      "Initially, post-stroke motor rehabilitation. The same model can extend to Parkinson's disease, multiple sclerosis, and other conditions with neurological motor deficits.",
  },
  {
    question: 'Is patient data private?',
    answer:
      'Yes. All processing happens locally in the patient\u2019s browser. No audio, no video, no biometric raw data ever leaves the device. Only the computed clinical metrics are stored. We are GDPR compliant by design.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-xl border bg-white transition-colors duration-200 ${
        isOpen ? 'border-brand-blue/50 shadow-sm' : 'border-brand-border hover:border-brand-blue/30'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <p className="text-base font-semibold leading-snug text-brand-navy">{question}</p>
        <span className="shrink-0 text-brand-blue">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="border-t border-brand-border px-6 pb-5 pt-4">
              <p className="text-sm leading-relaxed text-brand-muted">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      {/* Let's talk + form (shared section) */}
      <Contact />

      {/* Who should reach out */}
      <section id="who-we-work-with" className="section-y bg-white">
        <div className="container-fg">
          <div className="mx-auto max-w-5xl">
            <span className="eyebrow">Who should reach out</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Our network and our people.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {profiles.map((profile) => (
                <div
                  key={profile.title}
                  className="rounded-2xl border border-brand-border bg-brand-cream/50 p-6 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border bg-white text-brand-blue">
                    <profile.icon size={20} />
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-brand-navy">
                    {profile.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-brand-muted">
                    {profile.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Based in Madrid */}
            <div className="mt-14 border-t border-brand-border pt-10">
              <h3 className="text-2xl font-bold text-brand-navy">
                Based in Madrid. Building globally.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Born at the Harvard HSIL Hackathon 2026.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-[#EAF0FA] px-4 py-1.5">
                <span className="text-[13px] font-semibold text-brand-navy">
                  🏆 2nd place — Harvard HSIL Hackathon 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-y border-t border-brand-border/60 bg-brand-cream/40">
        <div className="container-fg">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Quick answers to common questions.
            </h2>

            <div className="mt-10 flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
