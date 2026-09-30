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
    <section id="story" className="py-16 sm:py-24 px-4 sm:px-6 bg-ivory-light relative overflow-hidden">
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
          {/* Couple Photography Showcase */}
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

              {/* Inset Photo of Victor */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-gold shadow-2xl bg-forest">
                <Image
                  src="/images/victor.png"
                  alt="Victor Oluwatosin"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="md:col-span-6 card-luxury p-6 sm:p-10 rounded-3xl border border-gold/50 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-gold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Ayobamidele '26 &middot; Our Beginning</span>
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
                &ldquo;Two lives, one purpose, a lifetime of love.&rdquo;
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
