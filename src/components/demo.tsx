"use client";

import { VideoPlayer } from "@/components/video-thumbnail-player";

export function Demo() {
  return (
    <section id="demo" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-10 animate-on-scroll">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Demo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            See FixedGap in action
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-[60ch]">
            Watch how patients play a simple game while we capture clinical-grade
            motor data in real time — no wearables, no setup.
          </p>
        </div>

        <VideoPlayer
          thumbnailUrl="/juego2.png"
          videoUrl="/demo.mp4"
          title="FixedGap Demo"
          description="Gamified stroke rehabilitation with real-time computer vision"
          aspectRatio="16/9"
          className="w-full max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
}
