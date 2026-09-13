import React from "react";

export default function NeoProgressBar({
  value = 0, // 0 to 100
  label,
  showPercentage = true,
  height = "h-5",
  color = "bg-[#1867E8]",
  className = "",
}) {
  const clamped = Math.min(100, Math.max(0, value));

  // Determine color by value if not explicitly given
  let fillColor = color;
  if (color === "dynamic") {
    if (clamped >= 75) fillColor = "bg-[#16A34A]";
    else if (clamped >= 50) fillColor = "bg-[#1867E8]";
    else if (clamped >= 35) fillColor = "bg-[#D97706]";
    else fillColor = "bg-[#DC2626]";
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-mono mb-1 font-semibold text-[#0A2858]">
          <span>{label}</span>
          {showPercentage && <span>{clamped}%</span>}
        </div>
      )}
      <div
        className={`w-full ${height} bg-white border-[2px] border-[#0A2858] rounded-sm overflow-hidden relative shadow-[1px_1px_0px_#0A2858]`}
      >
        <div
          className={`h-full ${fillColor} transition-all duration-300 ease-out`}
          style={{ width: `${clamped}%` }}
        />
        {!label && showPercentage && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-[#0A2858] drop-shadow-xs">
            {clamped}%
          </span>
        )}
      </div>
    </div>
  );
}
