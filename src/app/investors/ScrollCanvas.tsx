"use client";

import { useEffect, useRef, useState } from "react";
import ClinicalDashboard from "./ClinicalDashboard";
import NeuralDashboard from "./NeuralDashboard";

const TOTAL_FRAMES = 1164;
const BATCH_SIZE = 20;

const sections = [
  {
    startFrame: 0,
    endFrame: 45,
    title: "FixedGap",
    sub: <>Remote motor <strong className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">monitoring</strong> for post-stroke patients.</>,
    sub2: "No hardware. No wearable. Any device. 5 minutes.",
  },
  {
    startFrame: 45,
    endFrame: 130,
    title: "Stroke does not end at discharge.",
    sub: "Recovery happens at home. Clinicians only see snapshots every few months.",
  },
  {
    startFrame: 130,
    endFrame: 300,
    title: "Recovery and deterioration happen every day.",
    sub: "Decisions rely on patient recall, not objective motor data.",
  },
  {
    startFrame: 300,
    endFrame: 405,
    title: "Turning home recovery into measurable clinical data.",
    sub: "No hardware. No wearable. No complex installation.",
    sub2: "Any computer or tablet. Objective motor data after each session.",
  },
  {
    startFrame: 405,
    endFrame: 565,
    title: "AI extracts motor biomarkers in real time.",
    title2: "Speed, precision, range of motion, tremor, fatigue.",
    sub: "Not one isolated assessment.",
    sub2: "A recovery curve over time.",
  },
  {
    startFrame: 565,
    endFrame: 720,
    title: "For patients, a 5-minute daily task at home.",
    title2: "For clinicians, progress summaries and flags.",
  },
  {
    startFrame: 720,
    endFrame: 764,
    title: "Scalable like an app. Data-rich like hardware.",
    customTop: "75%",
  },
];

function getSectionOpacity(
  progress: number,
  section: { startFrame: number; endFrame: number }
): number {
  const start = section.startFrame / 1163;
  const end = section.endFrame / 1163;
  if (progress < start || progress > end) return 0;
  const range = end - start;
  if (range === 0) return 0;
  const fadeZone = range * 0.2;
  const fadeIn = fadeZone > 0 ? (progress - start) / fadeZone : 1;
  const fadeOut = fadeZone > 0 ? (end - progress) / fadeZone : 1;
  return Math.max(0, Math.min(1, fadeIn, fadeOut));
}

function getSectionTransform(
  progress: number,
  section: { startFrame: number; endFrame: number }
): number {
  const start = section.startFrame / 1163;
  const end = section.endFrame / 1163;
  if (progress < start || progress > end) return 0;
  const range = end - start;
  if (range === 0) return 0;
  const fadeZone = range * 0.2;
  const fadeIn = fadeZone > 0 ? (progress - start) / fadeZone : 1;
  const fadeOut = fadeZone > 0 ? (end - progress) / fadeZone : 1;

  // During fade in: interpolate from 30px down to 0px
  if (fadeIn < 1) {
    return 30 * (1 - fadeIn);
  }
  // During fade out: interpolate from 0px up to -30px
  if (fadeOut < 1) {
    return -30 * (1 - fadeOut);
  }
  return 0;
}

const SupporterBadge = ({ logo, text, borderClass, shadowClass }: { logo: string, text: string, borderClass: string, shadowClass: string }) => (
  <div className={`backdrop-blur-md bg-white/[0.05] border-2 border-white/15 rounded-full pl-4 pr-7 py-3.5 flex items-center gap-4 shadow-[0_0_25px_rgba(0,0,0,0.7)] hover:bg-white/[0.1] ${borderClass} transition-all duration-300 group pointer-events-auto cursor-pointer`}>
    <div className={`w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/30 ${shadowClass} transition-all`}>
      <img src={logo} alt="Partner" className="w-9 h-auto object-contain" />
    </div>
    <p className="text-white/90 text-sm md:text-base font-bold tracking-wide uppercase">{text}</p>
  </div>
);

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const assetCardRef = useRef<HTMLDivElement | null>(null);
  const recoveryGapRef = useRef<HTMLDivElement | null>(null);
  const patientCounterRef = useRef<HTMLDivElement | null>(null);
  const systemCapacityRef = useRef<HTMLDivElement | null>(null);
  const cvMetricsHudRef = useRef<HTMLDivElement | null>(null);
  const deviceBadgeRef = useRef<HTMLDivElement | null>(null);
  const neuralDashRef = useRef<HTMLDivElement | null>(null);
  const neuralDashBigRef = useRef<HTMLDivElement | null>(null);
  const counterStartTimeRef = useRef<number | null>(null);
  const lastHUDUpdateRef = useRef<number>(0);
  const srtRef = useRef<HTMLSpanElement>(null);
  const flexionRef = useRef<HTMLSpanElement>(null);
  const smoothnessRef = useRef<HTMLSpanElement>(null);
  const tremorRef = useRef<HTMLSpanElement>(null);
  const ganadoresImgRef = useRef<HTMLImageElement | null>(null);
  const guanteImgRef = useRef<HTMLImageElement | null>(null);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyBusinessRef = useRef<HTMLDivElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [patientCount, setPatientCount] = useState("0");
  const [capacityRatio, setCapacityRatio] = useState(0);
  const [businessCardProgress, setBusinessCardProgress] = useState(0);
  const [debug, setDebug] = useState({ scrollY: 0, progressPct: 0, currentFrame: 0, scrollHeight: 0, windowHeight: 0 });


  useEffect(() => {
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;
    let cancelled = false;

    // Preload floating asset images
    const ganadoresImg = new Image();
    const guanteImg = new Image();
    ganadoresImg.src = "/GANADORES.jpeg";
    guanteImg.src = "/GUANTE.jpeg";

    let assetsLoadedCount = 0;
    const checkAssetsLoaded = () => {
      assetsLoadedCount++;
      if (assetsLoadedCount === 2) {
        ganadoresImgRef.current = ganadoresImg;
        guanteImgRef.current = guanteImg;
        setAssetsLoaded(true);
      }
    };
    ganadoresImg.onload = checkAssetsLoaded;
    ganadoresImg.onerror = checkAssetsLoaded;
    guanteImg.onload = checkAssetsLoaded;
    guanteImg.onerror = checkAssetsLoaded;

    const loadBatch = (startIdx: number) => {
      const end = Math.min(startIdx + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = startIdx; i < end; i++) {
        const img = new Image();
        img.src = `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;
        frames[i] = img;
        const onDone = () => {
          if (cancelled) return;
          count++;
          setLoadedCount(count);
          if (count === TOTAL_FRAMES) {
            framesRef.current = frames;
            setLoaded(true);
          }
        };
        img.onload = onDone;
        img.onerror = onDone;
      }
      if (end < TOTAL_FRAMES) {
        setTimeout(() => loadBatch(end), 0);
      }
    };

    loadBatch(0);
    return () => {
      cancelled = true;
    };
  }, []);


  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [loaded]);

  // Sticky business section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyBusinessRef.current) return;

      const rect = stickyBusinessRef.current.getBoundingClientRect();
      const containerHeight = stickyBusinessRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress through the sticky section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (containerHeight - viewportHeight)));
      setBusinessCardProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("resize", resize);

    const render = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current =
        maxScroll > 0 ? window.scrollY / maxScroll : 0;

      const progress = scrollProgressRef.current;
      const frameIdx = Math.min(1163, Math.max(0, Math.floor(progress * 1163)));
      const frame = framesRef.current[frameIdx];

      if (frame?.complete && frame.naturalWidth > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / frame.naturalWidth, ch / frame.naturalHeight);
        const dw = frame.naturalWidth * scale;
        const dh = frame.naturalHeight * scale;
        ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }

      sections.forEach((section, i) => {
        const el = sectionRefs.current[i];
        if (el) {
          const opacity = getSectionOpacity(progress, section);
          const translateY = getSectionTransform(progress, section);
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${translateY}px)`;
        }
      });

      // Section 2 (Recovery Gap): frames 150-300 (delayed from text)
      const recoveryGapSection = { startFrame: 150, endFrame: 300 };
      const recoveryGapOpacity = getSectionOpacity(progress, recoveryGapSection);
      const recoveryGapTransformY = getSectionTransform(progress, recoveryGapSection);
      const recoveryGap = recoveryGapRef.current;
      if (recoveryGap) {
        recoveryGap.style.opacity = String(recoveryGapOpacity);
        recoveryGap.style.transform = `translateY(${recoveryGapTransformY}px)`;
      }

      // Section 2.5 (Patient Counter): frames 45-130
      const patientCounterSection = { startFrame: 45, endFrame: 130 };
      const counterOpacity = getSectionOpacity(progress, patientCounterSection);
      const counterTransformY = getSectionTransform(progress, patientCounterSection);
      const patientCounter = patientCounterRef.current;

      // Calculate time-based counter value with ease-out
      if (frameIdx >= 45 && frameIdx <= 130) {
        // Initialize start time when section is first entered
        if (counterStartTimeRef.current === null) {
          counterStartTimeRef.current = performance.now();
        }

        // Calculate elapsed time (2000ms duration for the count)
        const elapsed = performance.now() - counterStartTimeRef.current;
        const duration = 2000;
        let countProgress = Math.min(1, elapsed / duration);

        // Apply an ease-out cubic function for premium decelerating effect
        const easeOutProgress = 1 - Math.pow(1 - countProgress, 3);
        const currentPatients = Math.floor(easeOutProgress * 795000);
        const formattedPatients = currentPatients.toLocaleString('en-US');
        setPatientCount(formattedPatients);

        // Animate stroke incidence counter (12.2 million)
        const currentCapacity = Math.round(easeOutProgress * 122) / 10;
        setCapacityRatio(currentCapacity);
      } else {
        // Reset timer when outside the section
        counterStartTimeRef.current = null;
      }

      if (patientCounter) {
        patientCounter.style.opacity = String(counterOpacity);
        patientCounter.style.transform = `translateY(${counterTransformY}px)`;
      }

      // System Capacity (Right Side of Section 3): frames 130-300
      const systemCapacity = systemCapacityRef.current;
      if (systemCapacity) {
        systemCapacity.style.opacity = String(counterOpacity);
        systemCapacity.style.transform = `translateY(${counterTransformY}px)`;
      }

      // Section 3 (Hardware pivot): frames 300-405
      const hardwareSection = { startFrame: 300, endFrame: 405 };
      const assetOpacity = getSectionOpacity(progress, hardwareSection);
      const assetTransformY = getSectionTransform(progress, hardwareSection);
      const assetCard = assetCardRef.current;
      if (assetCard) {
        assetCard.style.opacity = String(assetOpacity);
        assetCard.style.transform = `translateY(${assetTransformY}px)`;
      }

      // Section 5 (CV Metrics HUD): frames 410-570
      const cvMetricsSection = { startFrame: 410, endFrame: 570 };
      const hudOpacity = getSectionOpacity(progress, cvMetricsSection);
      const hudTransformY = getSectionTransform(progress, cvMetricsSection);
      const cvMetricsHud = cvMetricsHudRef.current;
      if (cvMetricsHud) {
        cvMetricsHud.style.opacity = String(hudOpacity);
        cvMetricsHud.style.transform = `translateY(${hudTransformY}px)`;
      }


      // Device Badge: frames 565-720 (game section - computer visible)
      const deviceSection = { startFrame: 565, endFrame: 720 };
      const deviceOpacity = getSectionOpacity(progress, deviceSection);
      const deviceTransformY = getSectionTransform(progress, deviceSection);
      const deviceBadge = deviceBadgeRef.current;
      if (deviceBadge) {
        deviceBadge.style.opacity = String(deviceOpacity);
        deviceBadge.style.transform = `translateY(${deviceTransformY}px)`;
      }


      // Neural Dashboard Small: frames 565-720 (same as device section)
      const neuralDash = neuralDashRef.current;
      if (neuralDash) {
        neuralDash.style.opacity = String(deviceOpacity);
        neuralDash.style.transform = `translateY(${deviceTransformY}px)`;
      }

      // Neural Dashboard Big: frames 720-790 (next section after game, ends before black section)
      const bigDashSection = { startFrame: 720, endFrame: 790 };
      const bigDashOpacity = getSectionOpacity(progress, bigDashSection);
      const bigDashTransformY = getSectionTransform(progress, bigDashSection);
      const neuralDashBig = neuralDashBigRef.current;
      if (neuralDashBig) {
        neuralDashBig.style.opacity = String(bigDashOpacity);
        neuralDashBig.style.transform = `translateY(${bigDashTransformY}px)`;
      }

      // Direct DOM update for HUD numbers (100ms throttle)
      if (frameIdx >= 410 && frameIdx <= 570) {
        const now = performance.now();
        if (now - lastHUDUpdateRef.current > 100) {
          if (srtRef.current) srtRef.current.innerText = Math.floor(115 + Math.random() * 21).toString();
          if (flexionRef.current) flexionRef.current.innerText = Math.floor(88 + Math.random() * 6).toString();
          if (smoothnessRef.current) smoothnessRef.current.innerText = (89.1 + Math.random() * 3.4).toFixed(1);
          if (tremorRef.current) tremorRef.current.innerText = (1.2 + Math.random() * 0.6).toFixed(1);

          lastHUDUpdateRef.current = now;
        }
      }

      setDebug({
        scrollY: Math.round(window.scrollY),
        progressPct: maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0,
        currentFrame: frameIdx,
        scrollHeight: document.body.scrollHeight,
        windowHeight: window.innerHeight,
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <>
      {!loaded && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            FixedGap
          </h1>
          <div
            style={{
              width: 300,
              height: 3,
              background: "#222",
              borderRadius: 2,
              marginTop: 32,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#fff",
                borderRadius: 2,
                width: `${(loadedCount / TOTAL_FRAMES) * 100}%`,
                transition: "width 0.08s linear",
              }}
            />
          </div>
        </div>
      )}

      <div style={{ height: "30471px" }}>
        {sections.map((section, i) => (
          <div
            key={i}
            style={{
              height: `${((section.endFrame - section.startFrame) / 764) * 30471}px`,
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: loaded ? "block" : "none",
          zIndex: 0,
        }}
      />

      {loaded &&
        sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {/* Cinematic vignette: ultra-smooth full-width gradient from bottom to top */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center w-[85%] max-w-[920px]"
              style={{ top: (section as any).customTop || (section.title2 && section.sub2 ? "48%" : "58%") }}
            >
              <h2 className="font-extrabold tracking-tighter text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-[0_0_20px_rgba(0,212,255,0.3)] leading-tight m-0">
                {section.title}
              </h2>
              {"title2" in section && section.title2 && (
                <h2 className="font-extrabold tracking-tighter text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-400/70 drop-shadow-[0_0_20px_rgba(0,212,255,0.3)] leading-tight m-0 mt-2">
                  {section.title2}
                </h2>
              )}

              {section.sub && (
                <>
                  <div className="w-12 h-1 bg-cyan-400 rounded-full my-6 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
                  <p className="font-medium tracking-wide text-xl md:text-2xl text-cyan-50/80 leading-loose m-0">
                    {section.sub}
                  </p>
                  {"sub2" in section && section.sub2 && (
                    <p className="font-medium tracking-wide text-lg md:text-xl text-cyan-200/60 leading-loose m-0 mt-4">
                      {section.sub2}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

      {/* Recovery Gap Visualization - Section 2 (Projected Data Only) */}
      {loaded && (
        <div
          ref={recoveryGapRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* Left Side Message */}
          <div className="absolute top-1/2 left-12 md:left-20 -translate-y-1/2 max-w-[400px]">
            <p className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Motor recovery happens at home.
              <br />
              Every day <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">matters</span>
            </p>
          </div>

          {/* Projected Data Timeline - Right Side (NO BOX) */}
          <div className="absolute top-1/2 right-20 -translate-y-1/2">
            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline Spine */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-400/0 via-cyan-400 to-cyan-400/0 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

              {/* BLINDSPOT: 6 DAYS */}
              <div className="mb-16 pl-6">
                <div className="absolute left-0 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] -translate-x-1" />
                <p className="text-red-500 text-3xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]">
                  BLINDSPOT
                </p>
                <p className="text-red-400 text-5xl font-extrabold tracking-tighter mt-1 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                  6 DAYS
                </p>
                <div className="w-32 h-1 bg-red-500/60 mt-3 shadow-[0_0_10px_rgba(239,68,68,0.6)]" style={{ width: '128px' }} />
              </div>

              {/* INSIGHT: 1 DAY */}
              <div className="pl-6">
                <div className="absolute left-0 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1" />
                <p className="text-cyan-400 text-3xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                  INSIGHT
                </p>
                <p className="text-cyan-300 text-5xl font-extrabold tracking-tighter mt-1 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                  1 DAY
                </p>
                <div className="w-8 h-1 bg-cyan-400 mt-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ width: '32px' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Counter - Section 2.5 (Scroll-Linked Dynamic Counter) */}
      {loaded && (
        <div
          ref={patientCounterRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* Grid of People - Left Side */}
          <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col items-start gap-6">
            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Person 1 - AFFECTED (Red/Orange) */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.6)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <div className="absolute inset-0 opacity-50 animate-pulse">
                  <div className="absolute inset-2 rounded-xl border border-white/40"></div>
                </div>
              </div>

              {/* Person 2 - Unaffected */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Person 3 - Unaffected */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Person 4 - Unaffected */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="max-w-[220px]">
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                1 in 4 <span className="text-white/60">adults</span>
              </p>
              <p className="text-cyan-400 text-sm md:text-base tracking-wide uppercase font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                will have a stroke in their lifetime
              </p>
            </div>
          </div>
        </div>
      )}

      {/* System Capacity - Section 3 Right Side (Diegetic CV Projection) */}
      {loaded && (
        <div
          ref={systemCapacityRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* Capacity Data Stack - Right Side (NO BOX) */}
          <div className="absolute top-1/2 right-12 -translate-y-1/2 text-right">
            {/* Top Label */}
            <p className="text-cyan-400 text-sm tracking-[0.2em] uppercase font-bold mb-6 opacity-80 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              GLOBAL STROKE INCIDENCE
            </p>

            {/* The Stat - HERO ELEMENT */}
            <p className="text-cyan-300 text-7xl md:text-8xl font-extrabold tracking-tighter drop-shadow-[0_0_40px_rgba(0,212,255,0.7)] mb-1 counter-animate leading-none">
              {capacityRatio}M
            </p>
            <p className="text-cyan-400 text-base md:text-lg tracking-[0.15em] uppercase font-bold drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] mb-8">
              STROKES PER YEAR
            </p>

            {/* Accent Line */}
            <div className="w-32 h-0.5 bg-cyan-400/60 ml-auto mb-6 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

            {/* Hero Message */}
            <p className="text-white/90 text-xl md:text-2xl font-bold tracking-tight leading-relaxed max-w-[320px] text-right">
              Each year, <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">12.2 million</span> people suffer a stroke.
            </p>
          </div>
        </div>
      )}

      {/* Clinical Metrics HUD - Section 5 (Live Analysis, 2 Left + 2 Right) */}
      {loaded && (
        <div
          ref={cvMetricsHudRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* LEFT SIDE - 2 Metrics */}
          <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col gap-8 text-left">
            {/* Left 1: SRT */}
            <div>
              <p className="text-cyan-400/80 text-xs tracking-[0.2em] uppercase font-bold mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                [ SIMPLE REACTION TIME ]
              </p>
              <p className="text-white text-4xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-mono">
                <span ref={srtRef}>125</span> ms
              </p>
            </div>

            {/* Left 2: Flexion Range */}
            <div>
              <p className="text-cyan-400/80 text-xs tracking-[0.2em] uppercase font-bold mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                [ FINGER FLEXION RANGE ]
              </p>
              <p className="text-white text-4xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-mono">
                <span ref={flexionRef}>90</span>°
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - 2 Metrics */}
          <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-8 text-right">
            {/* Right 1: Smoothness Score */}
            <div>
              <p className="text-cyan-400/80 text-xs tracking-[0.2em] uppercase font-bold mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                [ MOVEMENT SMOOTHNESS SCORE ]
              </p>
              <p className="text-white text-4xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-mono">
                <span ref={smoothnessRef}>90.5</span>
              </p>
            </div>

            {/* Right 2: Tremor Amplitude */}
            <div>
              <p className="text-cyan-400/80 text-xs tracking-[0.2em] uppercase font-bold mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                [ TREMOR AMPLITUDE ]
              </p>
              <p className="text-white text-4xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-mono">
                <span ref={tremorRef}>1.5</span> mm
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Device Compatibility Badges - Section 6 (Game Section) */}
      {loaded && (
        <div
          ref={deviceBadgeRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 flex items-center gap-5">
            <div className="flex items-center gap-3 backdrop-blur-md bg-white/[0.05] border border-cyan-400/30 rounded-2xl px-5 py-3 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
              <svg className="w-7 h-7 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-white text-base font-bold tracking-tight">Mobile</p>
                <p className="text-cyan-400/70 text-[10px] tracking-wide">Patient gamified app</p>
              </div>
            </div>

            <div className="flex items-center gap-3 backdrop-blur-md bg-white/[0.05] border border-cyan-400/30 rounded-2xl px-5 py-3 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
              <svg className="w-7 h-7 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <div>
                <p className="text-white text-base font-bold tracking-tight">Computer</p>
                <p className="text-cyan-400/70 text-[10px] tracking-wide">Clinician dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border border-cyan-400/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
              <p className="text-cyan-300/90 text-xs font-semibold tracking-wide">No wearables needed</p>
            </div>
          </div>
        </div>
      )}


      {/* Neural Dashboard Small - Section 6 (Game Section, Left Side) */}
      {loaded && (
        <div
          ref={neuralDashRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div className="absolute top-1/2 left-6 -translate-y-1/2 w-[280px]">
            <NeuralDashboard />
          </div>
        </div>
      )}

      {/* Competitive Landscape - Section 7 */}
      {loaded && (
        <div
          ref={neuralDashBigRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl">
            <div className="relative group">
              {/* Premium Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/New_Competitive_landscape.jpeg" 
                  alt="Competitive Landscape" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Subtle overlay to match the page aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Asset Cards - Section 3 (Hardware Pivot) */}
      {loaded && assetsLoaded && (
        <div
          ref={assetCardRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* Left Card - Ganadores */}
          <div className="absolute top-1/2 -translate-y-1/2 left-10 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-300 ease-out w-72">
            <img
              src="/GANADORES.jpeg"
              alt="1st Place Harvard HSIL"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center text-sm mt-3 font-medium">
              1st Place, Harvard HSIL Madrid Hub
            </p>
          </div>

          {/* Right Card - Guante */}
          <div className="absolute top-1/2 -translate-y-1/2 right-10 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-300 ease-out w-72">
            <img
              src="/GUANTE.jpeg"
              alt="Pivoted from hardware to software-only CV"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center text-sm mt-3 font-medium">
              Pivoted from hardware to pure CV software
            </p>
          </div>
        </div>
      )}

      {/* Standard Web Sections - CSS-only positioning to prevent overlap */}
      <div
        className="relative left-0 w-full z-30 bg-[#050505]"
        style={{ position: 'absolute', top: '21000px' }}
      >
        {/* THE FIX: Smooth Gradient Fade (Difuminado) - Extends UPWARD over canvas */}
        <div className="absolute top-0 left-0 w-full h-[50vh] -translate-y-full bg-linear-to-b from-transparent via-[#05050530] to-[#050505] pointer-events-none"></div>

        {/* Smooth Gradient Fade Transition - Positioned Above (existing) */}
        <div className="w-full h-[70vh] bg-linear-to-b from-transparent via-[#05050540] to-[#050505] pointer-events-none"></div>

        {/* Content Wrapper */}
        <div className="w-full flex flex-col items-center pb-32">

        {/* Section 1: Epic Sequential Business Model (Sticky Scroll) */}
        <div ref={stickyBusinessRef} className="relative h-[400vh] w-full">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Animated CV Mesh Background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-cyan-400 mesh-float"></div>
              <div className="absolute top-32 left-32 w-1.5 h-1.5 rounded-full bg-cyan-400 mesh-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-cyan-400 mesh-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-32 left-20 w-1.5 h-1.5 rounded-full bg-cyan-400 mesh-float" style={{ animationDelay: '3s' }}></div>
              <div className="absolute bottom-20 right-32 w-2 h-2 rounded-full bg-cyan-400 mesh-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Card 1: The Market (0-33%) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-300"
              style={{
                opacity: businessCardProgress < 0.3 ? 1 : businessCardProgress < 0.4 ? (0.4 - businessCardProgress) / 0.1 : 0,
                transform: `scale(${businessCardProgress < 0.3 ? 1 : businessCardProgress < 0.4 ? 1 - ((businessCardProgress - 0.3) / 0.1) * 0.05 : 0.95})`
              }}
            >
              <div className="w-full max-w-[100rem] mx-auto relative min-h-[700px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 md:px-12">
                
                {/* Left Side: Context */}
                <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center relative">
                  {/* Header badge */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    </div>
                    <span className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase">THE MARKET</span>
                  </div>

                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] leading-[1.1]">
                    Post-<span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Stroke</span> Rehabilitation Monitoring.
                  </h2>
                  <p className="text-white/60 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl">
                    B2B SaaS. Clinics pay. Patients benefit. Scales with clinic utilization.
                  </p>

                  <div className="inline-block mt-4">
                    <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm w-fit">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-400 text-xs tracking-[0.2em] uppercase font-bold">EVERY SESSION ADDS DATA. DATA MAKES RENEWALS ESSENTIAL.</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Data Cards */}
                <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-6">
                  
                  {/* Target Market Card */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl">
                    <h3 className="text-7xl md:text-[7.5rem] font-extrabold text-cyan-400 leading-none mb-4 tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                      $8-12<span className="text-5xl md:text-7xl">B</span>
                    </h3>
                    <p className="text-white/70 text-lg md:text-xl max-w-md">
                      Post-stroke rehabilitation monitoring market.
                    </p>
                  </div>

                  {/* Pricing Card */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl">
                    <div className="flex items-center gap-8">
                      <div>
                        <h3 className="text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tighter">
                          $50
                        </h3>
                        <p className="text-white/50 text-sm mt-2">per active patient/mo</p>
                      </div>
                      <div className="w-px h-16 bg-white/10"></div>
                      <div>
                        <h3 className="text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tighter">
                          $3,000
                        </h3>
                        <p className="text-white/50 text-sm mt-2">annual license</p>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <p className="text-cyan-400/60 text-xs mt-4 tracking-wide text-center lg:text-left">
                    More patients monitored = more revenue. Simpler budgeting for clinic directors.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: The Value & Business Model (33-100%) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-300"
              style={{
                opacity: businessCardProgress < 0.3 ? 0 : businessCardProgress < 0.4 ? (businessCardProgress - 0.3) / 0.1 : 1,
                transform: `scale(${businessCardProgress < 0.35 ? 0.97 : businessCardProgress < 0.4 ? 0.97 + ((businessCardProgress - 0.35) / 0.05) * 0.03 : 1})`
              }}
            >
              {/* AWS Badge - B2B SaaS Model */}
              <div className="absolute top-10 right-10 md:top-16 md:right-16 z-50">
                <SupporterBadge logo="/aws.png" text="Cloud Backend by AWS" borderClass="border-cyan-500/20 hover:border-cyan-500/40" shadowClass="group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
              </div>

              <div className="w-full max-w-[100rem] mx-auto relative min-h-[700px] grid grid-cols-1 lg:grid-cols-12 items-center px-4 md:px-12 pt-20 md:pt-0">
                
                {/* Left Side: Title and Bowtie */}
                <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center pr-0 lg:pr-8">
                  <div className="mb-8 lg:mb-12">
                    <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]">THE VALUE</p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      B2B SaaS Model
                    </h2>
                  </div>

                  <div className="w-full">
                    <svg viewBox="0 0 800 400" className="w-full h-auto drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]">
                      <defs>
                        <linearGradient id="gradL1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="gradL2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="gradL3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.9" />
                        </linearGradient>
                        
                        <linearGradient id="gradR1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="gradR2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="gradR3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#083344" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#083344" stopOpacity="0.2" />
                        </linearGradient>
                        
                        <linearGradient id="gradCenter" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>

                      {/* Left Side Segments */}
                      <path d="M 20,50 L 140,85 L 140,315 L 20,350 Z" fill="url(#gradL1)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" />
                      <text x="80" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Awareness</text>

                      <path d="M 140,85 L 260,120 L 260,280 L 140,315 Z" fill="url(#gradL2)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.4" />
                      <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Education</text>

                      <path d="M 260,120 L 380,150 L 380,250 L 260,280 Z" fill="url(#gradL3)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" />
                      <text x="320" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Selection</text>

                      {/* Center Node */}
                      <rect x="380" y="150" width="40" height="100" fill="url(#gradCenter)" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.9" />
                      <line x1="400" y1="120" x2="400" y2="280" stroke="#22d3ee" strokeWidth="3" strokeOpacity="0.8" strokeDasharray="4 4" />
                      <circle cx="400" cy="200" r="6" fill="#fff" />

                      {/* Right Side Segments */}
                      <path d="M 420,150 L 540,120 L 540,280 L 420,250 Z" fill="url(#gradR1)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" />
                      <text x="480" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Onboard</text>

                      <path d="M 540,120 L 660,85 L 660,315 L 540,280 Z" fill="url(#gradR2)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.4" />
                      <text x="600" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Impact</text>

                      <path d="M 660,85 L 780,50 L 780,350 L 660,315 Z" fill="url(#gradR3)" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" />
                      <text x="720" y="200" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" opacity="0.9" style={{textShadow: '0px 0px 10px rgba(0,0,0,0.9)'}}>Expansion</text>
                    </svg>
                  </div>
                </div>

                {/* Right Side: Flashcards */}
                <div className="lg:col-span-4 xl:col-span-4 hidden lg:flex flex-col justify-center gap-6">
                  
                  {/* Financial Forecast Flashcard */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                      </div>
                      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">FORECAST</span>
                    </div>

                    <h3 className="text-4xl lg:text-[40px] font-extrabold text-white mb-6 leading-[1.1] tracking-tighter">
                      Conservative. <span className="text-cyan-400">Milestone-driven.</span>
                    </h3>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-white/50 text-xs font-bold tracking-wider uppercase">Year 1</span>
                        <span className="text-white text-lg font-bold tracking-tight">$18K ARR</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-white/50 text-xs font-bold tracking-wider uppercase">Year 2</span>
                        <span className="text-white text-lg font-bold tracking-tight">$240K ARR</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-xs font-bold tracking-wider uppercase">Year 3</span>
                        <span className="text-cyan-400 text-lg font-bold tracking-tight">$1.8M ARR</span>
                      </div>
                    </div>
                  </div>

                  {/* Bowtie Flashcard */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                      </div>
                      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">METHODOLOGY</span>
                    </div>

                    <h3 className="text-4xl lg:text-[40px] font-extrabold text-white mb-3 leading-[1.1] tracking-tighter">
                      Driven by the <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">Bowtie</span> Model.
                    </h3>
                    <p className="text-white/60 text-sm">
                      Focusing beyond acquisition to ensure recurring impact, deep engagement, and continuous clinical expansion.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Go-to-Market Plan */}
        <div ref={(el) => { revealRefs.current[2] = el; }} className="reveal w-full max-w-6xl px-6 py-32 text-center border-b border-white/5 relative overflow-hidden">
          {/* Animated CV Mesh Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-16 left-16 w-2 h-2 rounded-full bg-amber-400 mesh-float"></div>
            <div className="absolute top-28 right-24 w-1.5 h-1.5 rounded-full bg-amber-400 mesh-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-24 left-1/4 w-2 h-2 rounded-full bg-amber-400 mesh-float" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-400 mesh-float" style={{ animationDelay: '3.5s' }}></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 relative z-10">
            Start narrow. Expand once proven.
          </h2>
          <p className="text-cyan-50/70 text-lg mb-16 max-w-2xl mx-auto relative z-10">
            Wedge = the segment that buys fastest, not the biggest segment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto relative z-10">
            {/* Phase 1: NOW */}
            <div className="group relative breathe-slow">
              <div className="backdrop-blur-md bg-white/[0.02] border border-amber-400/20 rounded-[2.5rem] p-10 min-h-[420px] shadow-[0_0_30px_rgba(251,191,36,0.05)] group-hover:border-amber-400/40 group-hover:shadow-[0_0_50px_rgba(251,191,36,0.15)] transition-all duration-1000 text-left relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-amber-400/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-3 relative z-20">
                  <div className="w-10 h-7 rounded-sm overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.4)] border border-white/10">
                    <svg viewBox="0 0 30 20" className="w-full h-full">
                      <rect width="30" height="5" y="0" fill="#AA151B" />
                      <rect width="30" height="10" y="5" fill="#F1BF00" />
                      <rect width="30" height="5" y="15" fill="#AA151B" />
                    </svg>
                  </div>
                  <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">NOW</p>
                </div>
                <h3 className="text-white text-3xl font-black mb-6 relative z-20 tracking-tighter">Neurorehab clinics, Madrid</h3>

                <div className="flex flex-col gap-4 relative z-20 mt-auto">
                  <p className="text-white/70 text-sm">Fastest decision cycle</p>
                  <p className="text-white/70 text-sm">No hospital procurement</p>
                  <p className="text-white/70 text-sm">Direct feedback loop</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-amber-400 text-xs font-bold tracking-wide">Clinical partner: H. Gregorio Marañón</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: 6-12 months */}
            <div className="group relative">
              <div className="backdrop-blur-md bg-white/[0.02] border border-cyan-400/20 rounded-[2.5rem] p-10 min-h-[420px] shadow-[0_0_30px_rgba(0,212,255,0.05)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_50px_rgba(0,212,255,0.15)] transition-all duration-1000 text-left relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-cyan-400/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-3 relative z-20">
                  <div className="w-10 h-7 rounded-sm overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.4)] border border-white/10">
                    <svg viewBox="0 0 30 20" className="w-full h-full">
                      <rect width="30" height="5" y="0" fill="#AA151B" />
                      <rect width="30" height="10" y="5" fill="#F1BF00" />
                      <rect width="30" height="5" y="15" fill="#AA151B" />
                    </svg>
                  </div>
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-black">6–12 MONTHS</p>
                </div>
                <h3 className="text-white text-3xl font-black mb-6 relative z-20 tracking-tighter">Hospital systems, Spain</h3>

                <div className="flex flex-col gap-4 relative z-20 mt-auto">
                  <p className="text-white/70 text-sm">Credibility from Phase 1</p>
                  <p className="text-white/70 text-sm">Clinical evidence in hand</p>
                  <p className="text-white/70 text-sm">Public + private hospitals</p>
                </div>
              </div>
            </div>

            {/* Phase 3: 18-24 months */}
            <div className="group relative drift-subtle">
              <div className="backdrop-blur-md bg-white/[0.02] border border-cyan-400/20 rounded-[2.5rem] p-10 min-h-[420px] shadow-[0_0_30px_rgba(0,212,255,0.05)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_50px_rgba(0,212,255,0.15)] transition-all duration-1000 text-left relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-cyan-400/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-3 relative z-20">
                  <div className="w-10 h-7 rounded-sm overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.4)] border border-white/10">
                    <svg viewBox="0 0 30 20" className="w-full h-full">
                      <rect width="30" height="20" fill="#B22234" />
                      <rect width="30" height="1.54" y="1.54" fill="white" />
                      <rect width="30" height="1.54" y="4.62" fill="white" />
                      <rect width="30" height="1.54" y="7.69" fill="white" />
                      <rect width="30" height="1.54" y="10.77" fill="white" />
                      <rect width="30" height="1.54" y="13.85" fill="white" />
                      <rect width="30" height="1.54" y="16.92" fill="white" />
                      <rect width="12" height="10.77" fill="#3C3B6E" />
                    </svg>
                  </div>
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-black">18–24 MONTHS</p>
                </div>
                <h3 className="text-white text-3xl font-black mb-6 relative z-20 tracking-tighter">United States</h3>

                <div className="flex flex-col gap-4 relative z-20 mt-auto">
                  <p className="text-white/70 text-sm">Harvard / Boston network</p>
                  <p className="text-white/70 text-sm">RCC ecosystem</p>
                  <p className="text-white/70 text-sm">Parkinson's, MS expansion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={(el) => { revealRefs.current[3] = el; }} className="reveal w-full max-w-6xl px-6 py-32 text-center border-b border-white/5 relative">
          {/* Tech Background Pattern with Radial Gradient */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 relative z-10">
            The team to close the gap.
          </h2>
          <p className="text-cyan-50/70 text-lg mb-16 max-w-2xl mx-auto relative z-10">
            We combine clinical access, technical execution, and venture momentum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 relative z-10">

            <div className="flex flex-col bg-white/[0.02] backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
                <p className="text-cyan-400 text-xs tracking-[0.25em] uppercase font-bold">Build</p>
              </div>
              <div className="h-px bg-cyan-400/40 mb-6" />

              <div className="flex flex-col gap-6">
                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,212,255,0.15)] group-hover:border-cyan-500/70 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,212,255,0.2)] flex items-center justify-center overflow-hidden group-hover:border-cyan-500/60 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-cyan-400/30 blur-[0.5px]"></div>
                        <img src="/mateo.jpeg" alt="Mateo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-cyan-500/80 text-sm tracking-widest uppercase font-bold">Computer Vision & MVP</p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,212,255,0.15)] group-hover:border-cyan-500/70 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,212,255,0.2)] flex items-center justify-center overflow-hidden group-hover:border-cyan-500/60 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-cyan-400/30 blur-[0.5px]"></div>
                        <img src="/marco.png" alt="Marco" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-cyan-500/80 text-sm tracking-widest uppercase font-bold">Backend & Data Architecture</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white/[0.02] backdrop-blur-sm border border-amber-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-amber-400 text-xs tracking-[0.25em] uppercase font-bold">Go-to-market</p>
              </div>
              <div className="h-px bg-amber-400/40 mb-6" />

              <div className="flex flex-col gap-6">
                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-amber-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(251,191,36,0.15)] group-hover:border-amber-500/70 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-amber-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.2)] flex items-center justify-center overflow-hidden group-hover:border-amber-500/60 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-amber-400/30 blur-[0.5px]"></div>
                        <img src="/luisNueva.jpeg" alt="Luis" className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-amber-500/80 text-sm tracking-widest uppercase font-bold">Strategy & Ventures</p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-amber-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(251,191,36,0.15)] group-hover:border-amber-500/70 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-amber-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.2)] flex items-center justify-center overflow-hidden group-hover:border-amber-500/60 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-amber-400/30 blur-[0.5px]"></div>
                        <img src="/varo.jpeg" alt="Álvaro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-amber-500/80 text-sm tracking-widest uppercase font-bold">Product & AI Strategy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white/[0.02] backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                </svg>
                <p className="text-emerald-400 text-xs tracking-[0.25em] uppercase font-bold">Clinical & Biomedical</p>
              </div>
              <div className="h-px bg-emerald-400/40 mb-6" />

              <div className="flex flex-col gap-6">
                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/70 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-emerald-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-emerald-400/30 blur-[0.5px]"></div>
                        <img src="/helene.png" alt="Helene" className="w-full h-full object-cover object-[center_35%] scale-115 group-hover:scale-120 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-emerald-500/80 text-sm tracking-widest uppercase font-bold">Clinical & Biomedical</p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="backdrop-blur-md bg-white/[0.03] border-2 border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/70 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      <div className="relative w-full h-full rounded-full border border-emerald-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-500">
                        <div className="absolute top-[10%] left-0 right-0 h-px bg-emerald-400/30 blur-[0.5px]"></div>
                        <img src="/jose.jpeg" alt="José Antonio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <p className="text-emerald-500/80 text-sm tracking-widest uppercase font-bold">Physician & Clinical Advisor</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div ref={(el) => { revealRefs.current[4] = el; }} className="reveal w-full max-w-6xl px-6 py-24 text-center border-b border-white/5">
          <p className="text-cyan-400/80 uppercase tracking-[0.2em] text-xs font-bold mb-12">
            BACKED BY
          </p>

          {/* Partner Grid: 5 items across 2 rows */}
          <div className="flex flex-col gap-6 md:gap-8 mt-16 max-w-6xl mx-auto items-center relative z-10">

            {/* Top Row: 3 Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
              {/* Harvard RCC */}
              <div className="flex flex-col items-center justify-center p-12 md:p-14 border border-amber-500/30 rounded-2xl bg-[#0a0a0a] hover:border-amber-500/60 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] transition-all duration-500 group relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-amber-500/40 rounded-b-md"></div>
                <div className="h-28 md:h-32 w-full flex items-center justify-center mb-6">
                  <img src="/rcc.png" alt="Harvard RCC" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-white font-bold text-lg md:text-xl text-center mb-3">RCC Harvard</h4>
                <span className="inline-block mt-1 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-sm md:text-base text-amber-400 font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:bg-amber-500/20 transition-colors">Venture Building</span>
              </div>

              {/* AWS */}
              <div className="flex flex-col items-center justify-center p-10 md:p-12 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/8 hover:border-cyan-500/40 transition-all duration-500 group">
                <div className="h-28 md:h-32 w-full flex items-center justify-center mb-6">
                  <img src="/aws.png" alt="AWS" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-white font-semibold text-lg md:text-xl text-center mb-3">AWS</h4>
                <span className="inline-block mt-1 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm md:text-base text-cyan-400 font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:bg-cyan-500/20 transition-colors">Technical Support</span>
              </div>

              {/* Saturno Labs */}
              <div className="flex flex-col items-center justify-center p-10 md:p-12 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/8 hover:border-cyan-500/40 transition-all duration-500 group">
                <div className="h-28 md:h-32 w-full flex items-center justify-center mb-6">
                  <img src="/saturno.png" alt="Saturno Labs" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-white font-semibold text-lg md:text-xl text-center mb-3">Saturno Labs</h4>
                <span className="inline-block mt-1 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm md:text-base text-cyan-400 font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:bg-cyan-500/20 transition-colors">Technical Support</span>
              </div>
            </div>

            {/* Bottom Row: 2 Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full md:w-2/3">
              {/* Bosch */}
              <div className="flex flex-col items-center justify-center p-10 md:p-12 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/8 hover:border-cyan-500/40 transition-all duration-500 group">
                <div className="h-28 md:h-32 w-full flex items-center justify-center mb-6">
                  <img src="/bosch.png" alt="Bosch" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-white font-semibold text-lg md:text-xl text-center mb-3">Bosch</h4>
                <span className="inline-block mt-1 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm md:text-base text-cyan-400 font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:bg-cyan-500/20 transition-colors">Partner</span>
              </div>

              {/* Comunidad de Madrid */}
              <div className="flex flex-col items-center justify-center p-10 md:p-12 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/8 hover:border-amber-500/40 transition-all duration-500 group">
                <div className="h-28 md:h-32 w-full flex items-center justify-center mb-6">
                  <img src="/comunidad-madrid.png" alt="Comunidad de Madrid" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-white font-semibold text-lg md:text-xl text-center mb-3">Comunidad de Madrid</h4>
                <span className="inline-block mt-1 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-sm md:text-base text-amber-400 font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:bg-amber-500/20 transition-colors">Partner</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Investment & Ask */}
        <div ref={(el) => { revealRefs.current[5] = el; }} className="reveal w-full max-w-[85rem] px-6 py-32 text-center border-b border-white/5 relative mx-auto">
          {/* Tech Background Pattern */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-900/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
            <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></div>
            </div>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">THE ASK</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-tight">
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">$500,000</span>
          </h2>
          <p className="text-cyan-50/70 text-xl md:text-2xl mb-16 max-w-3xl mx-auto relative z-10 font-medium">
            Pre-seed. SAFE or convertible note.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 relative z-10 w-full text-left">

            {/* The Vehicle (Left Column) */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 xl:p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <svg className="w-24 h-24 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-white/60 text-sm font-bold tracking-[0.2em] uppercase mb-6">INSTRUMENT</h3>
                <div className="text-3xl xl:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">SAFE / Convertible Note</div>

                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  With this, we will:
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 text-sm">Run a 10-patient clinical pilot</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 text-sm">Validate 14 digital recovery metrics vs. clinical gold standards</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 text-sm">Close our first Letter of Intent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Use of Funds (Middle Column) */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 xl:p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl h-full flex flex-col justify-center">
              <h3 className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                USE OF FUNDS
              </h3>

              <div className="relative flex flex-col gap-5 pl-6">
                {/* Vertical Path Line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-linear-to-b from-cyan-400 via-cyan-500/50 to-cyan-800/20 rounded-full"></div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$130,000</h4>
                  <p className="text-white font-semibold text-sm">Legal, GDPR & Regulatory</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$100,000</h4>
                  <p className="text-white font-semibold text-sm">Hospital Validation Program</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$90,000</h4>
                  <p className="text-white font-semibold text-sm">Product, Cloud & Security</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$60,000</h4>
                  <p className="text-white font-semibold text-sm">Founder Stipends</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$45,000</h4>
                  <p className="text-white font-semibold text-sm">Operations, Tools & Strategic Travel</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$25,000</h4>
                  <p className="text-white font-semibold text-sm">Medical/Clinical Advisory & Documentation</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$8,000</h4>
                  <p className="text-white font-semibold text-sm">Marketing, Demo & Investor Materials</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
                  <h4 className="text-cyan-400 text-xl font-bold tracking-tight">$42,000</h4>
                  <p className="text-white font-semibold text-sm">Contingency</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-cyan-400/60 text-xs italic">
                  Our biggest asset: engineers who can build and improve the platform themselves.
                </p>
              </div>
            </div>

            {/* Year 1 KPIs (Right Column) */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 xl:p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500 shadow-2xl h-full flex flex-col justify-center">
              <h3 className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                YEAR 1 KPIs
              </h3>

              <div className="flex flex-col gap-8">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-base group-hover:border-cyan-500/30 transition-colors">
                    1
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold mb-1.5 leading-tight">1 Letter of Intent signed</h4>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-base group-hover:border-cyan-500/30 transition-colors">
                    2
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold mb-1.5 leading-tight">Digital recovery metrics clinically validated</h4>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-base group-hover:border-cyan-500/30 transition-colors">
                    3
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold mb-1.5 leading-tight">10-patient pilot completed</h4>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-base group-hover:border-cyan-500/30 transition-colors">
                    4
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold mb-1.5 leading-tight">Session completion rate &gt; 80%</h4>
                  </div>
                </div>
              </div>

              {/* Bottom: Year 1 ARR */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/50 text-xs font-bold tracking-wider uppercase">Year 1 Target</p>
                <p className="text-cyan-400 text-2xl font-extrabold tracking-tight">$18K ARR</p>
              </div>
              <p className="text-white/40 text-xs mt-2">3 clinics, 30 active patients</p>
            </div>

          </div>
        </div>

        {/* Section 6: The Demo (Bottom CTA) */}
        <div ref={(el) => { revealRefs.current[6] = el; }} className="reveal w-full max-w-4xl px-6 py-40 text-center">
          <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-6">
            THE SOLUTION IN ACTION
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Remote motor monitoring for post-stroke patients.
          </h2>
          <p className="text-cyan-50/70 text-xl md:text-2xl leading-relaxed mb-3">
            No hardware. No wearable. Any device. 5 minutes.
          </p>
          <p className="text-cyan-400/60 text-base mb-12">
            fixedgap.io
          </p>
          <a
            href="https://youtu.be/WgE6esrREjI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Watch the Demo
          </a>
        </div>

        </div>
      </div>
    </>
  );
}
