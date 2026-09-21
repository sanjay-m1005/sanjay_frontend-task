import React from 'react';

export const CircularGauge = ({ 
  value, 
  min = 0, 
  max = 100, 
  size = 140, 
  strokeWidth = 11, 
  color = '#10b981',
  unit = '%',
  label = 'Moisture'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {Math.round(value)}
          </span>
          <span className="text-sm font-bold text-slate-500 ml-0.5">{unit}</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
};
