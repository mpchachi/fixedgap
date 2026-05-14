"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Hand, Eye, Smile } from "lucide-react";

export function Solution() {
  const tabs = [
    {
      value: "hand",
      icon: <Hand className="h-5 w-5 shrink-0" />,
      label: "Hand",
      title: "21 landmarks tracked per hand.",
      description:
        "MediaPipe detects every joint in real-time. We measure how well patients open their hand, pinch objects, and control wrist rotation — the same things a physio checks in clinic, but captured automatically every session.",
      metrics: [
        "Pinch distance",
        "Finger extension",
        "Grip aperture",
        "Wrist ROM",
        "Palm velocity",
        "Tremor",
      ],
      imageSrc: "/journey/hand-tracking.jpg",
      imageAlt: "FixedGap hand tracking with computer vision",
    },
    {
      value: "eyes",
      icon: <Eye className="h-5 w-5 shrink-0" />,
      label: "Eyes",
      title: "Blink asymmetry catches what exams miss.",
      description:
        "We track blink rate per eye, voluntary closure, and gaze direction. After a stroke, one eye often blinks slower — our system quantifies that difference and flags changes over time so the clinician can act early.",
      metrics: [
        "Blink rate L/R",
        "Eye symmetry",
        "Voluntary closure",
        "Gaze direction",
        "Saccade latency",
        "Eye-hand delay",
      ],
      imageSrc: "/journey/eye-tracking.png",
      imageAlt: "Close-up eye tracking with computer vision",
    },
    {
      value: "face",
      icon: <Smile className="h-5 w-5 shrink-0" />,
      label: "Face",
      title: "Facial palsy scored, not guessed.",
      description:
        "Clinicians usually eyeball facial symmetry. We measure it — comparing 468 face landmarks left vs right, tracking smile symmetry and mouth deviation across sessions. The score is reproducible and trend-able.",
      metrics: [
        "Symmetry score",
        "Smile detection",
        "Smile symmetry",
        "Head tilt",
        "Brow raise",
        "Mouth deviation",
      ],
      imageSrc: "/journey/facemesh.jpg",
      imageAlt: "FaceMesh landmark detection for facial symmetry",
    },
  ];

  return (
    <section id="how-it-works" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            What we capture
          </p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl tracking-tight mb-4">
            One camera. Three modalities.
          </h2>
          <p className="text-slate-500 max-w-[50ch] mx-auto">
            Everything a clinician checks in a 15-minute visit — captured
            automatically every time the patient plays.
          </p>
        </div>

        <Tabs defaultValue="hand" className="mt-6">
          <TabsList className="flex items-center justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/60 px-6 py-3 text-sm font-medium text-slate-500 transition-all cursor-pointer hover:bg-white hover:text-slate-700 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:border-slate-900"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 lg:p-10">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-slate-900 lg:text-3xl leading-tight">
                    {tab.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {tab.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {tab.metrics.map((m) => (
                      <div
                        key={m}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                        <span className="text-xs text-slate-600">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <img
                  src={tab.imageSrc}
                  alt={tab.imageAlt}
                  className="rounded-xl border border-slate-200 w-full object-cover max-h-[380px]"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
