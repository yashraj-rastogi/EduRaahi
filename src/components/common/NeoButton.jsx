import React from "react";

export default function NeoButton({
  children,
  onClick,
  variant = "primary", // 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent'
  size = "md", // 'sm' | 'md' | 'lg'
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider rounded-sm transition-all duration-120 select-none cursor-pointer border-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 shadow-[2px_2px_0px_#0A2858] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    md: "text-sm px-4 py-2.5 shadow-[3px_3px_0px_#0A2858] active:translate-x-1 active:translate-y-1 active:shadow-none",
    lg: "text-base px-6 py-3.5 shadow-[4px_4px_0px_#0A2858] active:translate-x-1 active:translate-y-1 active:shadow-none",
  };

  const variantStyles = {
    primary:
      "bg-[#1867E8] text-white border-[#0A2858] hover:bg-[#1457C7] hover:-translate-x-0.5 hover:-translate-y-0.5",
    secondary:
      "bg-white text-[#0A2858] border-[#0A2858] hover:bg-[#EAF2FF] hover:-translate-x-0.5 hover:-translate-y-0.5",
    danger:
      "bg-[#DC2626] text-white border-[#0A2858] hover:bg-[#B91C1C] hover:-translate-x-0.5 hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-[#55729D] border-transparent shadow-none hover:bg-[#EAF2FF] hover:text-[#0A2858] hover:border-[#0A2858]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
