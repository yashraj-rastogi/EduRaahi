import React from "react";

export default function NeoBadge({
  children,
  variant = "default", // 'default' | 'critical' | 'warning' | 'success' | 'accent' | 'muted'
  size = "md", // 'sm' | 'md'
  className = "",
}) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    default: "bg-[#EAF2FF] text-[#0A2858] border-[#0A2858]",
    critical: "bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]",
    warning: "bg-[#FFFBEB] text-[#D97706] border-[#D97706]",
    success: "bg-[#F0FDF4] text-[#16A34A] border-[#16A34A]",
    accent: "bg-[#DCE9FF] text-[#1867E8] border-[#0A2858]",
    muted: "bg-white text-[#8298BA] border-[#8298BA]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider border-[1.5px] rounded-sm select-none ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {children}
    </span>
  );
}
