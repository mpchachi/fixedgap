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
        const milliseconds = Math.floor((difference % 1000) / 10); // Show as centiseconds for readability

        setTimeLeft({ days, hours, minutes, seconds, milliseconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 10); // Update every 10ms for smooth milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Logos */}
        <div className="flex items-center justify-center gap-12 mb-16">
          <div className="relative w-32 h-32 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logofinal.png"
              alt="FixedGap Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="relative w-28 h-28 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/harvard-shield.png"
              alt="Harvard Shield"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Demo Day Title */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight mb-4">
            DEMO DAY
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
            Harvard Innovation Labs
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-12">
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
          <p className="text-slate-500 text-lg font-light">
            June 16, 2026
          </p>
        </div>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

function CountdownUnit({ value, label, small = false }: { value: number; label: string; small?: boolean }) {
  return (
    <div className="relative group">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 group-hover:bg-white/[0.07] group-hover:border-white/20">
        <div className={`font-mono font-bold text-white mb-2 tabular-nums ${small ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'}`}>
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-slate-400 text-xs md:text-sm uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
    </div>
  );
}
