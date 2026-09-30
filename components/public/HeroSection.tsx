"use client";

import React from "react";
import Image from "next/image";
import { WaxSeal } from "@/components/invitation/WaxSeal";
import { FlourishCorner } from "@/components/invitation/FlourishCorner";
import { LiveCountdown } from "@/components/public/LiveCountdown";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  onRSVPClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRSVPClick, onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF4E6] via-[#F8F3E8] to-[#F1E6CC]">
      {/* Decorative Gold & Forest Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-forest/15 blur-3xl" />
      </div>

      {/* Main Luxury Invitation Card Container */}
      <div className="relative w-full max-w-2xl mx-auto card-luxury rounded-3xl p-6 sm:p-12 text-center border-1.5 border-gold shadow-2xl animate-in fade-in zoom-in-95 duration-700">
        {/* Corner Botanical & Jewelry Accents */}
        <FlourishCorner position="tl" className="top-3 left-3 sm:top-5 sm:left-5" />
        <FlourishCorner position="tr" className="top-3 right-3 sm:top-5 sm:right-5" />
        <FlourishCorner position="bl" className="bottom-3 left-3 sm:bottom-5 sm:left-5" />
        <FlourishCorner position="br" className="bottom-3 right-3 sm:bottom-5 sm:right-5" />

        {/* Inner Gold Inset Frame */}
        <div className="absolute inset-3 sm:inset-4 border border-gold/40 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Gold Wax Seal Monogram */}
          <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
            <WaxSeal size={74} />
          </div>

          {/* Families Heading */}
          <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-forest font-semibold leading-relaxed max-w-md mx-auto mb-3">
            <p>THE FAMILIES OF</p>
            <p className="font-serif tracking-normal text-xs sm:text-sm text-forest-deep font-bold mt-0.5">
              MWO (RTD) &amp; MRS BALOGUN MATHEW
            </p>
            <p className="font-serif italic normal-case text-gold text-xs my-0.5">&amp;</p>
            <p className="font-serif tracking-normal text-xs sm:text-sm text-forest-deep font-bold">
              MR &amp; MRS SAMSON O. ODUDU
            </p>
          </div>

          {/* Invitation Invitation Line */}
          <p className="font-serif italic text-gold text-lg sm:text-xl font-medium mt-1">
            Cordially invite you to the
          </p>
          <p className="font-serif italic text-gold-dark text-2xl sm:text-3xl -mt-1 font-semibold">
            Solemnization of the
          </p>
          <p className="text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-charcoal font-semibold mt-1 mb-4">
            HOLY MATRIMONY OF THEIR CHILDREN
          </p>

          {/* Couple Names */}
          <div className="my-2 text-center">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-forest-deep font-medium tracking-tight leading-none">
              Kehinde Elizabeth
            </h1>
            <span className="block font-serif italic text-gold text-2xl sm:text-4xl my-1">
              &amp;
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-forest-deep font-medium tracking-tight leading-none">
              Victor Oluwatosin
            </h1>
          </div>

          {/* Official Date Box */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold bg-[#FAF4E6]/90 my-5 shadow-sm">
            <span className="font-serif text-sm sm:text-base font-semibold text-forest-deep tracking-wider">
              18<sup>TH</sup> &amp; 19<sup>TH</sup>
            </span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gold font-bold">
              NOV
            </span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="font-serif text-sm sm:text-base font-semibold text-forest-deep tracking-wider">
              2026
            </span>
          </div>

          {/* Core Tagline */}
          <p className="font-serif italic text-base sm:text-lg text-charcoal/85 max-w-lg mx-auto mb-6">
            &ldquo;Two Hearts. One Journey Forever.&rdquo;
          </p>

          {/* Interactive Countdown */}
          <div className="w-full my-3">
            <LiveCountdown targetDateIso="2026-11-19T10:00:00+01:00" />
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
            <Button
              onClick={onRSVPClick}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[180px] shadow-lg shadow-forest-deep/20"
            >
              RSVP Now
            </Button>
            <Button
              onClick={onExploreClick}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[180px]"
            >
              Explore Our Celebration
            </Button>
          </div>

          {/* Wedding Tag */}
          <div className="mt-8 pt-4 border-t border-gold/30 flex items-center justify-center gap-2 text-xs font-serif italic text-gold">
            <span>Ayobamidele &apos;26</span>
            <span className="inline-block w-2 h-2 rounded-full bg-gold" />
            <span className="inline-block w-2 h-2 rounded-full bg-forest" />
          </div>
        </div>
      </div>
    </section>
  );
};
