"use client";

import Link from "next/link";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Tooltip } from "@/components/ui/tooltip-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-slate-900/[0.04] border border-slate-200 rounded-full px-4 py-1.5 mb-8">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] font-medium text-slate-600 tracking-wide">
                Harvard HSIL 2026
              </span>
            </div>

            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold text-slate-900 tracking-[-0.03em] leading-[0.95] mb-6">
              Your patients recover at home.
              <span className="block text-slate-400 mt-1">You find out weeks later.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-[1.7] max-w-[48ch] mb-6">
              FixedGap turns any camera into a continuous window on stroke recovery.
              Hand kinematics, facial symmetry, gaze — captured through a game,
              delivered as clinical data. No wearables. No visits.
            </p>

            <span className="block text-2xl md:text-3xl italic font-medium text-slate-800 text-center mb-16 md:mb-20 tracking-tight">
              There was a{" "}
              <Tooltip
                content={
                  <span className="block space-y-2.5">
                    <span className="block">
                      <span className="font-bold text-slate-900 text-sm">fixed</span>
                      <span className="text-slate-500 text-xs ml-2">/fɪkst/</span>
                      <span className="text-slate-500 text-xs ml-2 italic">adjective</span>
                    </span>
                    <span className="block leading-relaxed">
                      <span className="block text-slate-900 font-medium text-base">
                        Not changing; constant and invariable.
                      </span>
                      <span className="block text-slate-500 italic mt-1.5 text-xs">
                        &quot;a fixed gap between appointments — 6 weeks, every time.&quot;
                      </span>
                    </span>
                  </span>
                }
              >
                <span className="cursor-help underline decoration-dotted decoration-slate-400 underline-offset-4">fixed</span>
              </Tooltip>{" "}
              gap. We{" "}
              <Tooltip
                content={
                  <span className="block space-y-2.5">
                    <span className="block">
                      <span className="font-bold text-slate-900 text-sm">fixed</span>
                      <span className="text-slate-500 text-xs ml-2">/fɪkst/</span>
                      <span className="text-slate-500 text-xs ml-2 italic">verb (past tense)</span>
                    </span>
                    <span className="block leading-relaxed">
                      <span className="block text-slate-900 font-medium text-base">
                        Corrected and no longer broken; having had a problem resolved.
                      </span>
                      <span className="block text-slate-500 italic mt-1.5 text-xs">
                        &quot;the monitoring gap between visits — fixed.&quot;
                      </span>
                    </span>
                  </span>
                }
              >
                <span className="cursor-help underline decoration-dotted decoration-slate-400 underline-offset-4">fixed</span>
              </Tooltip>{" "}
              it.
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/solution"
                className="inline-flex items-center gap-2.5 bg-slate-900 text-white font-medium px-7 py-3.5 rounded-lg text-[15px] transition-all hover:bg-slate-800 active:scale-[0.97]"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium px-4 py-3.5 text-[15px] transition-colors"
              >
                Talk to us
              </Link>
            </div>
          </div>
        }
      >
        <Image
          src="/juego2.png"
          alt="FixedGap fishing game with real-time hand tracking and clinical metrics overlay"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </ContainerScroll>
    </section>
  );
}
