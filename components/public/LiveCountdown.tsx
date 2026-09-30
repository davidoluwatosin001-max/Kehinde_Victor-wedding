"use client";

import React, { useEffect, useState } from "react";

interface LiveCountdownProps {
  targetDateIso?: string;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({
  targetDateIso = "2026-11-19T10:00:00+01:00",
}) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPassed: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDateIso).getTime();
      const diff = target - now;

      // Check if wedding has ended (say 24 hours after the ceremony starts)
      const passedDiff = now - target;
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (passedDiff > twentyFourHours) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: false,
          isPassed: true,
        });
        return;
      }

      // Check if today is the day (from 00:00 of 19 Nov 2026 until 24h later)
      const targetDateOnly = new Date(targetDateIso);
      const nowDate = new Date();
      const isSameDay =
        nowDate.getFullYear() === targetDateOnly.getFullYear() &&
        nowDate.getMonth() === targetDateOnly.getMonth() &&
        nowDate.getDate() === targetDateOnly.getDate();

      if (diff <= 0 || isSameDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          isPassed: false,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto py-2">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-gold/40 bg-ivory/60"
          >
            <span className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold">--</span>
            <span className="text-[10px] sm:text-xs font-sans tracking-widest text-gold uppercase mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-6 px-4 bg-gradient-to-r from-forest/5 via-gold/15 to-forest/5 rounded-2xl border border-gold/40 max-w-lg mx-auto shadow-sm">
        <p className="font-serif text-2xl sm:text-3xl text-forest-deep italic font-medium">
          Thank you for celebrating with us.
        </p>
        <p className="font-sans text-xs tracking-widest text-gold uppercase mt-2">
          Kehinde &amp; Victor &middot; Two Hearts Forever
        </p>
      </div>
    );
  }

  if (timeLeft.isToday) {
    return (
      <div className="text-center py-6 px-4 bg-gradient-to-r from-gold/20 via-forest/10 to-gold/20 rounded-2xl border-2 border-gold max-w-lg mx-auto shadow-lg animate-pulse">
        <p className="font-serif text-3xl sm:text-4xl text-forest-deep font-bold tracking-wide">
          TODAY IS THE DAY ❤️
        </p>
        <p className="font-sans text-xs tracking-widest text-gold-dark uppercase mt-2 font-semibold">
          Holy Matrimony &middot; 10:00 AM Prompt
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
        {timeUnits.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl border border-gold/50 bg-gradient-to-b from-[#FAF4E6] to-[#F5EEDB] shadow-card hover:border-gold transition-colors duration-300 relative group overflow-hidden"
          >
            {/* Subtle inner gold sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            <span className="font-serif text-2xl sm:text-4xl font-semibold text-forest-deep tracking-tight drop-shadow-sm">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[11px] font-sans tracking-widest text-gold uppercase mt-1 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] font-sans text-charcoal/70 tracking-wider mt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        Countdown to Thursday, 19th November 2026 (Africa/Lagos)
      </p>
    </div>
  );
};
