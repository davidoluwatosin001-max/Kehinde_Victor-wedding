import React from "react";
import Link from "next/link";
import { Heart, Lock } from "lucide-react";
import { WaxSeal } from "@/components/invitation/WaxSeal";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FAF4E6] to-[#F1E6CC] border-t border-gold/40 py-14 px-4 sm:px-6 relative text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Wax Seal */}
        <div className="mb-4">
          <WaxSeal size={58} />
        </div>

        {/* Couple & Date */}
        <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold">
          Kehinde &amp; Victor
        </h3>
        <p className="font-serif italic text-gold text-sm sm:text-base mt-1 mb-4">
          Two Hearts. One Journey Forever.
        </p>

        {/* Wedding Tag & Dots */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/70 border border-gold/30 text-xs font-serif italic text-forest-deep mb-6">
          <span>Ayobamidele &apos;26</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] inline-block" title="Mustard Gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E3B29] inline-block" title="Forest Green" />
        </div>

        {/* Contacts */}
        <div className="text-xs text-charcoal/80 space-y-1 mb-6">
          <p className="font-semibold text-gold uppercase tracking-wider text-[10px]">
            RSVP &middot; Hospitality &middot; Enquiries
          </p>
          <p className="font-sans">
            0813 676 9807 &nbsp;&middot;&nbsp; 0907 724 9194
          </p>
        </div>

        <div className="w-16 h-px bg-gold/40 my-4" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl text-[11px] text-charcoal/60 gap-3">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-gold fill-gold" /> for Kehinde &amp; Victor
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-gold hover:text-forest transition-colors font-medium"
          >
            <Lock className="w-3 h-3" />
            <span>Couple Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
