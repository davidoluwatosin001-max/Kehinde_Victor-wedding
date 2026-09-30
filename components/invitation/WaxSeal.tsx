import React from "react";

interface WaxSealProps {
  size?: number;
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ size = 72, className = "" }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-full select-none ${className}`}
      title="Kehinde & Victor — K&V Monogram"
    >
      {/* Outer wax rim with irregular organic feel & shadow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D8B45D] via-[#AD802C] to-[#6D4D15] shadow-lg shadow-forest-deep/20 border-2 border-[#F3E3B5]/40" />

      {/* Inner embossed rim */}
      <div className="absolute inset-2 rounded-full border border-[#FAF4E6]/30 bg-gradient-to-tr from-[#946B1F] via-[#AD802C] to-[#C59B27] flex items-center justify-center shadow-inner">
        {/* Laurel leaves wreath + Monogram */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-serif font-bold text-[#FDFBF7] tracking-wider text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            K&amp;V
          </span>
          <span className="text-[8px] font-sans tracking-widest text-[#FAF4E6]/90 uppercase -mt-0.5">
            2026
          </span>
        </div>
      </div>
    </div>
  );
};
