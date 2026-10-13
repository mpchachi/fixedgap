'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { home, page, PageHero, Reveal, SectionHead } from '@/components/site/Editorial';

const EMAIL = 'contact@fixedgap.com';

const faqs = [
  {
    q: 'Is FixedGap available now?',
    a: 'We are in the pilot phase with a small number of neurologists and rehabilitation clinics. Write to us if you want to be part of it.',
  },
  {
    q: 'How long does a demo take?',
    a: 'About 30 minutes, online. We show the patient side and the clinical dashboard, and answer your questions.',
  },
  {
    q: 'Does the patient need any hardware?',
    a: 'No. It runs in the browser with the camera already on a laptop, tablet or phone.',
  },
  {
    q: 'What does it measure?',
    a: 'Pinch precision, reach precision and overshoot, finger extension, hand opening speed, wrist rotation range and speed, movement smoothness (SPARC) and the asymmetry between both hands. The full list, with the literature behind each one, is on the Science page.',
  },
  {
    q: 'Is patient data private?',
    a: 'Video is processed in the patient’s browser. No video or audio leaves the device; only the computed metrics are stored. We follow GDPR.',
  },
  {
    q: 'Which conditions does it cover?',
    a: 'Post-stroke upper-limb rehabilitation today. The same approach can extend to other conditions with motor deficits, but that is not what we are validating now.',
  },
];

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', org: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`FixedGap demo request: ${form.name}${form.org ? `, ${form.org}` : ''}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.org}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main className={home.page}>
      <PageHero
        kicker="Contact"
        title={'Talk to us.'}
        lead="For neurologists, rehabilitation clinics and hospitals who want to see FixedGap working or take part in the first validation study. Researchers are welcome too."
      />

      <section className={home.section}>
        <div className={home.shell}>
          <div className={page.feature} style={{ alignItems: 'start' }}>
            <Reveal>
              <form className={page.form} onSubmit={submit}>
                <label>
                  <span>Name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label>
                  <span>Hospital, clinic or organisation</span>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
                <label>
                  <span>What would you like to see or discuss?</span>
                  <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </label>
                <button className={home.buttonPrimary} type="submit">
                  Send
                </button>
                <p className={page.formNote}>
                  Sending opens your email client with the message ready for {EMAIL}. If you prefer, write to us directly.
                </p>
              </form>
            </Reveal>
            <Reveal delay={0.08} className={page.contactAside}>
              <h3>Direct</h3>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <h3>Where</h3>
              <p>Madrid, Spain. Demos are online; on-site visits in Madrid on request.</p>
              <h3>What to expect</h3>
              <p>
                A 30-minute call: the patient session, the clinical dashboard and the validation plan. If it fits, we
                scope a pilot with your team.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${home.section} ${home.sectionTint} ${page.anchor}`} id="faq">
        <div className={home.shell}>
          <SectionHead kicker="FAQ" title="Common questions." />
          <div className={page.faq}>
            {faqs.map((item, index) => (
              <Reveal delay={index * 0.03} key={item.q}>
                <div className={`${page.faqItem} ${open === index ? page.faqOpen : ''}`}>
                  <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
                    {item.q}
                    <span aria-hidden="true">+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
