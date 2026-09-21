import React from 'react';

export const FanAnimation = ({ 
  isOn = true, 
  speed = 2, 
  oscillation = true,
  rpm = 1180,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';
  const effectiveSpeed = isOn ? speed : 0;

  // Choose animation class based on speed
  let spinClass = '';
  if (effectiveSpeed === 1) spinClass = 'animate-spin-fan-1';
  else if (effectiveSpeed === 2) spinClass = 'animate-spin-fan-2';
  else if (effectiveSpeed === 3) spinClass = 'animate-spin-fan-3';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Subtle wind breeze pulse when running */}
      {effectiveSpeed > 0 && (
        <div className="absolute inset-0 rounded-full bg-teal-200/20 blur-2xl animate-pulse pointer-events-none" />
      )}

      {/* Fan Assembly Container with optional oscillation sway */}
      <div className={`relative z-10 ${oscillation && effectiveSpeed > 0 ? 'animate-sway' : ''}`}>
        <svg 
          viewBox="0 0 200 200" 
          className={`${isLarge ? 'w-44 h-44 sm:w-52 sm:h-52' : 'w-28 h-28'} filter drop-shadow-md`}
        >
          {/* Fan Outer Guard Rings */}
          <circle cx="100" cy="100" r="85" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#cbd5e1" strokeWidth="1" />

          {/* Protective Radial Grille Spokes */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line 
              key={deg} 
              x1="15" 
              y1="100" 
              x2="185" 
              y2="100" 
              stroke="#e2e8f0" 
              strokeWidth="1.5" 
              transform={`rotate(${deg} 100 100)`} 
            />
          ))}

          {/* Rotating Blades Group */}
          <g className={spinClass} style={{ transformOrigin: '100px 100px' }}>
            {/* Blade 1 (0 deg) */}
            <path 
              d="M100,100 C115,75 145,50 165,70 C160,95 130,105 100,100 Z" 
              fill="#0d9488" 
              opacity="0.85" 
            />
            {/* Blade 2 (120 deg) */}
            <path 
              d="M100,100 C115,75 145,50 165,70 C160,95 130,105 100,100 Z" 
              fill="#14b8a6" 
              opacity="0.85" 
              transform="rotate(120 100 100)" 
            />
            {/* Blade 3 (240 deg) */}
            <path 
              d="M100,100 C115,75 145,50 165,70 C160,95 130,105 100,100 Z" 
              fill="#2dd4bf" 
              opacity="0.85" 
              transform="rotate(240 100 100)" 
            />
          </g>

          {/* Center Motor Hub */}
          <circle cx="100" cy="100" r="18" fill="#0f766e" />
          <circle cx="100" cy="100" r="12" fill="#115e59" />
          <circle cx="98" cy="98" r="4" fill="#5eead4" opacity="0.6" />
        </svg>
      </div>

      {/* Speed & Status Pill */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${effectiveSpeed > 0 ? 'bg-teal-500 animate-ping' : 'bg-slate-300'}`} />
        <span className={effectiveSpeed > 0 ? 'text-teal-800' : 'text-slate-500'}>
          {effectiveSpeed > 0 ? `🌀 Active: Speed ${effectiveSpeed} (${rpm} RPM)` : '⏸️ Stationary / OFF'}
        </span>
      </div>
    </div>
  );
};
