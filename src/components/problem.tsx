"use client";

import Image from "next/image";
import { Counter } from "@/components/counter";

export function Problem() {
  return (
    <section id="problem" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="mb-12 md:mb-0 animate-on-scroll">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              Problem definition
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              The invisible gap in stroke recovery
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Stroke recovery is time-sensitive — especially during the 12-week
              neuroplasticity window. But clinical monitoring only happens during
              occasional visits. Everything else is invisible.
            </p>
          </div>

          <div className="space-y-10">
            <div className="animate-on-scroll delay-1">
              <div className="border-l-2 border-slate-200 pl-6 py-1">
                <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-snug mb-3">
                  "I only see my patients once every few weeks. Between visits,
                  I have no idea if they're improving or getting worse."
                </p>
                <p className="text-sm text-slate-400">
                  — Neurologist, Hospital Ruber Internacional, Madrid
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 animate-on-scroll delay-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-slate-200">
                <Image src="/paciente2.jpg" alt="Patient using remote monitoring" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-slate-200">
                <Image src="/paciente1.jpg" alt="Patient during rehabilitation session" fill className="object-cover" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 animate-on-scroll delay-2">
              <div className="border border-slate-200 rounded-xl p-6 bg-white/60 text-center">
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  <Counter end={795} suffix="K+" />
                </p>
                <p className="text-sm text-slate-500">
                  New strokes per year in the U.S.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-6 bg-white/60 text-center">
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  <Counter end={9} suffix="M+" />
                </p>
                <p className="text-sm text-slate-500">
                  Survivors needing ongoing rehabilitation
                </p>
              </div>
              <div className="border border-slate-300 rounded-xl p-6 bg-white/80 text-center">
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  <Counter end={673} />
                </p>
                <p className="text-sm text-slate-500">
                  Post-stroke patients per clinician
                </p>
              </div>
            </div>

            <div className="animate-on-scroll delay-3">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Why this keeps happening
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "clock", text: "Limited clinician time — visits too spaced out" },
                  { icon: "eye", text: "No visibility into day-to-day recovery at home" },
                  { icon: "chart", text: "Decisions based on patient memory, not data" },
                  { icon: "device", text: "No scalable remote monitoring without hardware" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 bg-white/60 border border-slate-200 rounded-lg p-4"
                  >
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        {item.icon === "clock" && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                        {item.icon === "eye" && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        )}
                        {item.icon === "chart" && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                        )}
                        {item.icon === "device" && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        )}
                      </svg>
                    </span>
                    <span className="text-sm text-slate-600 leading-snug">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll delay-4 bg-white/60 border border-slate-200 rounded-2xl p-8">
              <p className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
                The consequence
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Without continuous monitoring, patients risk delayed
                interventions, inefficient therapy, and worse long-term outcomes
                — including permanent disability. Recovery time is lost that
                can never be recovered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
