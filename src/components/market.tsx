"use client";

import { Counter } from "@/components/counter";

export function Market() {
  return (
    <section id="market" className="pt-16 md:pt-24 pb-24 md:pb-32 border-t border-slate-200/70">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Market opportunity
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            A massive, underserved market
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-[60ch]">
            Post-stroke rehabilitation is one of the largest unmet needs in
            digital health — and it's growing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <div className="animate-on-scroll delay-1 border border-slate-200 rounded-2xl p-7 bg-white/60 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              TAM
            </p>
            <p className="text-4xl font-bold text-slate-900 mb-2">
              $<Counter end={279} />B
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Global neurorehabilitation + digital health technologies
            </p>
          </div>
          <div className="animate-on-scroll delay-2 border border-slate-200 rounded-2xl p-7 bg-white/60 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              SAM
            </p>
            <p className="text-4xl font-bold text-slate-900 mb-2">
              $8-12B
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Post-stroke rehab monitoring in U.S., Germany, France, Spain
            </p>
          </div>
          <div className="animate-on-scroll delay-3 border border-slate-300 rounded-2xl p-7 bg-white/80 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
              SOM (Year 3)
            </p>
            <p className="text-4xl font-bold text-slate-900 mb-2">
              0.5-1%
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              500-1,000 subscribers or 5,000-15,000 monthly active patients
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="animate-on-scroll delay-4 border border-slate-200 rounded-2xl p-7 bg-white/60">
            <h3 className="text-base font-semibold text-slate-900 mb-5">
              Why now
            </h3>
            <div className="space-y-3">
              {[
                "Rising stroke prevalence globally",
                "Increasing strain on rehabilitation workforces",
                "Shift toward digital health and remote care",
                "Computer vision now accessible without hardware",
                "Value-based care models incentivize outcomes",
                "Patients already have cameras on their phones",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll delay-5 border border-slate-200 rounded-2xl p-7 bg-white/60">
            <h3 className="text-base font-semibold text-slate-900 mb-5">
              Business model
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-slate-900 font-mono">
                    $149-249
                  </p>
                  <p className="text-xs text-slate-500 mt-1">per clinician / month</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-slate-900 font-mono">
                    $45-65
                  </p>
                  <p className="text-xs text-slate-500 mt-1">per patient / month</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 leading-relaxed">
                  <span className="font-medium text-slate-700">B2B SaaS.</span>{" "}
                  Hospitals and rehab clinics subscribe. Patients are users, not
                  payers. Value-based contracts as a future phase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
