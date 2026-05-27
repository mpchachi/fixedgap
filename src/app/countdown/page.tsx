'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    // Demo Day: June 16, 2026
    const demoDay = new Date('2026-06-16T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = demoDay.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10);

        setTimeLeft({ days, hours, minutes, seconds, milliseconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0a1628_0%,_#0a0e1a_50%,_#050810_100%)] flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Premium animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/[0.12] via-cyan-500/[0.08] to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/[0.10] via-pink-500/[0.06] to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/[0.06] via-cyan-400/[0.05] to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '14s', animationDelay: '4s' }} />
      </div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        {/* Logos with premium styling */}
        <div className="flex items-center justify-center gap-12 md:gap-20 mb-14 md:mb-20">
          <div className="relative w-28 h-28 md:w-40 md:h-40 opacity-95 hover:opacity-100 transition-all duration-700 hover:scale-110 group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image
              src="/logogradient.png"
              alt="FixedGap Logo"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]"
              priority
            />
          </div>
          <div className="relative">
            <div className="w-px h-20 md:h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
            </div>
          </div>
          <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-95 hover:opacity-100 transition-all duration-700 hover:scale-110 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image
              src="/harvard-shield.png"
              alt="Harvard Shield"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(136,19,55,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Demo Day Title with premium gradient */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-[-0.03em] mb-4 md:mb-5 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
              DEMO DAY
            </span>
            {/* Subtle glow behind text */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl -z-10" />
          </h1>
          <p className="text-base md:text-lg text-slate-300/70 font-light tracking-[0.3em] uppercase">
            Harvard Innovation Labs
          </p>
        </div>

        {/* Premium geometric divider */}
        <div className="flex items-center justify-center gap-4 md:gap-5 mb-14 md:mb-20">
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-cyan-400/40 to-blue-500/20" />
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-sm animate-pulse" />
          </div>
          <div className="h-px w-28 md:w-40 bg-gradient-to-r from-blue-500/20 via-cyan-400/40 to-blue-500/20" />
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-blue-500/20 via-cyan-400/40 to-transparent" />
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10 md:mb-12">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          <div className="col-span-2 md:col-span-1">
            <CountdownUnit value={timeLeft.milliseconds} label="Centiseconds" small />
          </div>
        </div>

        {/* Date */}
        <div className="text-center">
          <p className="text-slate-500/70 text-base md:text-lg font-light tracking-wide">
            June 16, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function CountdownUnit({ value, label, small = false }: { value: number; label: string; small?: boolean }) {
  return (
    <div className="relative group">
      {/* Premium glassmorphism card */}
      <div className="relative bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-white/[0.02] backdrop-blur-2xl border border-white/[0.12] rounded-3xl md:rounded-[2rem] p-6 md:p-10 transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-white/[0.08] group-hover:via-white/[0.06] group-hover:to-white/[0.04] group-hover:border-cyan-400/[0.3] shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_12px_60px_rgba(6,182,212,0.2),0_0_80px_rgba(6,182,212,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]">

        {/* Top edge highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Inner radial glow */}
        <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] bg-gradient-to-b from-cyan-400/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative">
          <div className={`font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/80 mb-2 md:mb-3 tabular-nums tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] ${small ? 'text-4xl md:text-6xl' : 'text-5xl md:text-8xl'}`}>
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-slate-300/60 text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold group-hover:text-cyan-300/70 transition-colors duration-700">
            {label}
          </div>
        </div>
      </div>

      {/* Premium outer glow */}
      <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] bg-gradient-to-b from-cyan-500/[0.15] via-blue-500/[0.08] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-3xl" />

      {/* Secondary glow layer */}
      <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] bg-gradient-to-tr from-cyan-400/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl" />
    </div>
  );
}
