import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-full min-h-[36px]",
    md: "px-6 py-2.5 text-sm rounded-full min-h-[44px]", // 44px min touch target for mobile-first
    lg: "px-8 py-3.5 text-base rounded-full min-h-[48px]",
  };

  const variantStyles = {
    primary:
      "bg-forest hover:bg-forest-deep text-[#FAF4E6] shadow-md shadow-forest-deep/15 hover:shadow-lg focus:ring-forest border border-gold/40 hover:border-gold",
    gold:
      "bg-gradient-to-r from-[#AD802C] via-[#C59B27] to-[#AD802C] hover:from-[#946B1F] hover:to-[#946B1F] text-[#FAF4E6] shadow-md shadow-gold/25 focus:ring-gold border border-gold-light/40",
    outline:
      "border-1.5 border-gold bg-[#FAF4E6]/80 backdrop-blur-sm text-forest-deep hover:bg-gold/15 focus:ring-gold",
    ghost:
      "text-forest-deep hover:bg-forest/5 focus:ring-forest/30",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
