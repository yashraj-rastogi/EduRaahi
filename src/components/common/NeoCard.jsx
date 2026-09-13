import React from "react";

export default function NeoCard({
  children,
  className = "",
  variant = "default", // 'default' | 'elevated' | 'accent' | 'warning' | 'danger'
  shadow = "sm", // 'sm' | 'md' | 'lg' | 'none'
  onClick,
  ...props
}) {
  const variantStyles = {
    default: "bg-white text-[#0A2858] border-[#0A2858]",
    elevated: "bg-[#EAF2FF] text-[#0A2858] border-[#0A2858]",
    accent: "bg-[#1867E8] text-white border-[#0A2858]",
    warning: "bg-[#FFFBEB] text-[#92400E] border-[#D97706]",
    danger: "bg-[#FEF2F2] text-[#991B1B] border-[#DC2626]",
  };

  const shadowStyles = {
    none: "shadow-none",
    sm: "shadow-[2px_2px_0px_#0A2858]",
    md: "shadow-[4px_4px_0px_#0A2858]",
    lg: "shadow-[6px_6px_0px_#0A2858]",
  };

  const interactive = onClick
    ? "cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
    : "";

  return (
    <div
      onClick={onClick}
      className={`border-[2px] rounded-md p-5 ${variantStyles[variant] || variantStyles.default} ${shadowStyles[shadow] || shadowStyles.sm} ${interactive} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
