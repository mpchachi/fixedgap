'use client';

import { useState } from 'react';
import { MoveRight } from 'lucide-react';

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

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#4A7BDB] focus:bg-white/[0.07]';

const labelClass = 'text-[13px] font-semibold text-white/60';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora solo muestra confirmación
    setSubmitted(true);
  };

  return (
    <section className="section-y border-t border-white/[0.06] bg-brand-navy">
      <div className="container-fg">
        <div className="mx-auto max-w-5xl">
          {/* SEO heading - invisible */}
          <h2 style={srOnly}>Contact FixedGap: Post-Stroke Rehabilitation Monitoring Platform</h2>

          <span className="eyebrow !text-[#7EA6F4]">Contact</span>

          <h2 className="mt-4 text-5xl font-extrabold leading-none tracking-tight text-white md:text-7xl">
            Let&apos;s talk.
          </h2>

          <div className="my-10 h-px bg-white/10" />

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="contact-name">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="contact-email">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="contact-phone">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us who you are and what you are looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(31,76,156,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue-strong active:scale-[0.98]"
                >
                  Send message <MoveRight size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md">
              <p className="mb-2 text-base font-bold text-emerald-400">✓ Message sent</p>
              <p className="text-sm leading-relaxed text-white/60">
                Thanks for reaching out. We will get back to you as soon as possible.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
