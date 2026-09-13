import React from "react";

export default function NeoStat({
  label,
  value,
  subtext,
  icon: Icon,
  trend, // 'up' | 'down' | 'stable'
  trendValue,
  className = "",
}) {
  return (
    <div
      className={`border-[2px] border-[#0A2858] rounded-md bg-white p-4 shadow-[3px_3px_0px_#0A2858] flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#55729D]">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-sm bg-[#EAF2FF] border-[1.5px] border-[#0A2858] flex items-center justify-center text-[#1867E8]">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="font-mono text-2xl md:text-3xl font-extrabold text-[#0A2858] tracking-tight">
          {value}
        </div>
        {trend && (
          <span
            className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm border ${
              trend === "up"
                ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]"
                : trend === "down"
                ? "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]"
                : "bg-[#EAF2FF] text-[#55729D] border-[#55729D]"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue || ""}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-1 text-xs font-mono text-[#8298BA] truncate">
          {subtext}
        </div>
      )}
    </div>
  );
}
