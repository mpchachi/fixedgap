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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a] flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/[0.06] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/[0.04] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Logos */}
        <div className="flex items-center justify-center gap-10 md:gap-16 mb-12 md:mb-16">
          <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-105">
            <Image
              src="/logofinal.png"
              alt="FixedGap Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="relative w-20 h-20 md:w-28 md:h-28 opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-105">
            <Image
              src="/harvard-shield.png"
              alt="Harvard Shield"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Demo Day Title */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-[-0.02em] mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">
            DEMO DAY
          </h1>
          <p className="text-lg md:text-xl text-slate-400/80 font-light tracking-[0.2em] uppercase text-sm md:text-base">
            Harvard Innovation Labs
          </p>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-white/20 to-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="h-px w-24 md:w-32 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-white/10 via-white/20 to-transparent" />
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
      {/* Glassmorphism card */}
      <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 group-hover:bg-white/[0.06] group-hover:border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative">
          <div className={`font-mono font-bold text-white mb-1.5 md:mb-2 tabular-nums tracking-tight ${small ? 'text-3xl md:text-5xl' : 'text-4xl md:text-7xl'}`}>
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-slate-400/70 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
            {label}
          </div>
        </div>
      </div>

      {/* Subtle outer glow */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-b from-blue-500/0 via-blue-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl" />
    </div>
  );
}
