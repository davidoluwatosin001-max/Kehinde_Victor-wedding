"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

interface OurStorySectionProps {
  title?: string;
  paragraphs?: string[];
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({
  title = "Two Hearts. One Journey Forever.",
  paragraphs = [
    "From the very first moment our paths crossed, God began writing a story that was greater than anything we could have planned ourselves.",
    "Through seasons of friendship, prayers, laughter, and shared dreams, our love deepened into a quiet certainty that we were meant to walk this earthly journey as one.",
    "Now, hand in hand with grateful hearts and our families' blessings, we invite our cherished family and friends to stand with us as we make our holy vows before God."
  ],
}) => {
  return (
    <section id="story" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7]/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Our Love Story
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <Heart className="w-4 h-4 text-gold fill-gold/30" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
        </div>

        {/* Editorial Layout: Photos & Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Couple Photography Showcase: Official Invitation Card (Clean & 100% Unobstructed) */}
          <div className="md:col-span-6 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 border-2 border-gold/40 rounded-3xl transform -rotate-1 pointer-events-none" />
              
              <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold bg-[#FAF4E6]">
                <Image
                  src="/images/wedding-invitation-card-official.jpg"
                  alt="Official Wedding Invitation Card — Kehinde & Victor"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Subtitle Badge below IV (no overlap) */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-deep/90 border border-gold/60 text-[11px] font-serif italic text-ivory tracking-wide shadow-md">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Official Wedding Invitation &middot; Kehinde &amp; Victor</span>
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Content & Repositioned Couple Portrait */}
          <div className="md:col-span-6 card-luxury p-6 sm:p-8 rounded-3xl border border-gold/50 shadow-xl space-y-6">
            {/* Repositioned Couple Portrait at the head of Our Story */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-gold/30">
              <div className="relative w-32 sm:w-36 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold shadow-lg flex-shrink-0 bg-forest group">
                <Image
                  src="/images/our-story-couple.jpg"
                  alt="Kehinde Elizabeth & Victor Oluwatosin"
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-forest-deep/90 border border-gold/60 text-[9px] font-serif italic text-ivory tracking-wider whitespace-nowrap shadow-md pointer-events-none">
                  Kehinde &amp; Victor
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Ayobamidele '26 &middot; Our Beginning</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-deep">
                  A Journey Written by Grace
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal/80">
                  &ldquo;Two lives, one purpose, and a lifetime of love.&rdquo;
                </p>
              </div>
            </div>

            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-serif text-base sm:text-lg text-charcoal/90 leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-forest"
              >
                {para}
              </p>
            ))}

            <div className="pt-4 border-t border-gold/30 flex items-center justify-between text-xs text-charcoal/70">
              <span className="font-serif italic text-forest font-medium text-sm">
                Forever &middot; November 19, 2026
              </span>
              <span className="font-sans font-semibold text-gold tracking-widest uppercase">
                Forever
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
