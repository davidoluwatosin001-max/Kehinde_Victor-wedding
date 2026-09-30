"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "md",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F2116]/65 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className={`relative w-full ${widthClasses} bg-gradient-to-b from-[#FAF4E6] to-[#F5EEDB] rounded-2xl border-1.5 border-[#AD802C] shadow-2xl shadow-forest-deep/30 p-6 sm:p-8 z-10 my-8`}
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2 border border-[#D8B45D]/40 rounded-xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-forest-deep/60 hover:text-forest-deep hover:bg-forest/10 rounded-full transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="text-center mb-6 relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-xs tracking-widest text-gold uppercase mt-1">
                {subtitle}
              </p>
            )}
            <div className="w-12 h-0.5 bg-gold mx-auto mt-3" />
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
