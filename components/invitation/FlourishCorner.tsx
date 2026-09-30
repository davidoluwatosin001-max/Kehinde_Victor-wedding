import React from "react";

interface FlourishCornerProps {
  position: "tl" | "tr" | "bl" | "br";
  className?: string;
}

export const FlourishCorner: React.FC<FlourishCornerProps> = ({ position, className = "" }) => {
  const getTransforms = () => {
    switch (position) {
      case "tr":
        return "scale-x-[-1]";
      case "bl":
        return "scale-y-[-1]";
      case "br":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <div className={`absolute w-8 h-8 pointer-events-none select-none z-10 ${getTransforms()} ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" className="w-full h-full">
        <path
          d="M2 2 C 14 2, 20 8, 20 20 C 20 26, 24 30, 32 32"
          stroke="#AD802C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="1.8" fill="#AD802C" />
        <circle cx="6" cy="6" r="1.2" fill="#D8B45D" />
      </svg>
    </div>
  );
};
