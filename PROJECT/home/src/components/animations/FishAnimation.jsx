import React from 'react';

export const FishAnimation = ({ 
  isFeeding = false, 
  aerationActive = true,
  waterTemp = 25.5, 
  waterLevel = 94,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Cyan aquarium ambient glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl opacity-40 pointer-events-none" />

      {/* Flakes dropping when feeding */}
      {isFeeding && (
        <div className="absolute top-4 inset-x-0 flex justify-center space-x-5 z-20 pointer-events-none">
          <div className="w-2 h-2 bg-amber-500 rounded-sm animate-bounce [animation-delay:0ms]" />
          <div className="w-2.5 h-1.5 bg-rose-500 rounded-sm animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-emerald-500 rounded-sm animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {/* Aquarium Glass Tank SVG */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 220 180" 
          className={`${isLarge ? 'w-52 h-44 sm:w-60 sm:h-52' : 'w-32 h-28'} filter drop-shadow-md`}
        >
          <defs>
            <linearGradient id="aquariumWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Aquarium Rim/Lid */}
          <rect x="20" y="20" width="180" height="12" rx="3" fill="#334155" />
          
          {/* Glass Tank Body */}
          <rect x="25" y="30" width="170" height="125" rx="4" fill="url(#aquariumWater)" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Substrate Sand Bed */}
          <path d="M26,140 Q60,135 110,142 Q160,138 194,140 L194,154 L26,154 Z" fill="#d4b996" />

          {/* Swaying Aquatic Plants */}
          <path d="M40,140 Q30,105 45,75 Q35,55 42,40" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-sway" />
          <path d="M50,140 Q62,110 52,80 Q60,60 55,50" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-sway [animation-delay:1s]" />
          <path d="M175,140 Q185,105 172,75 Q180,60 176,45" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-sway [animation-delay:1.5s]" />

          {/* Continuous Rising Air Bubbles */}
          {aerationActive && (
            <g className="animate-pulse">
              <circle cx="110" cy="130" r="2.5" fill="#ffffff" opacity="0.8" />
              <circle cx="112" cy="105" r="3" fill="#ffffff" opacity="0.7" />
              <circle cx="108" cy="80" r="3.5" fill="#ffffff" opacity="0.8" />
              <circle cx="111" cy="55" r="2" fill="#ffffff" opacity="0.6" />
              <circle cx="109" cy="38" r="3" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {/* Clownfish 1 (Swimming left to right) */}
          <g className="animate-float">
            {/* Fish Body */}
            <ellipse cx="85" cy="85" rx="18" ry="10" fill="#f97316" />
            {/* Tail */}
            <polygon points="68,85 58,76 58,94" fill="#ea580c" />
            {/* White Bands */}
            <path d="M80,76 L83,94 L80,94 L77,76 Z" fill="#ffffff" />
            <path d="M92,77 L94,93 L92,93 L90,77 Z" fill="#ffffff" />
            {/* Eye */}
            <circle cx="97" cy="83" r="2" fill="#000000" />
            <circle cx="96" cy="82" r="0.8" fill="#ffffff" />
            {/* Fin */}
            <polygon points="82,88 88,94 84,95" fill="#ea580c" />
          </g>

          {/* Neon Tetra 2 (Gliding near surface) */}
          <g className="animate-float-delayed">
            <ellipse cx="140" cy="65" rx="14" ry="6" fill="#0284c7" />
            <polygon points="126,65 118,58 118,72" fill="#38bdf8" />
            {/* Neon iridescent stripe */}
            <line x1="130" y1="63" x2="148" y2="63" stroke="#38bdf8" strokeWidth="2" />
            <line x1="132" y1="66" x2="146" y2="66" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="150" cy="64" r="1.5" fill="#000000" />
          </g>

          {/* Submerged Digital Temp Probe on left side */}
          <line x1="32" y1="28" x2="32" y2="90" stroke="#475569" strokeWidth="3" />
          <rect x="29" y="90" width="6" height="12" rx="2" fill="#0284c7" />
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
        <span className="text-cyan-900 font-medium">
          🐟 Active Aquatic Biome • 🌡️ {waterTemp}°C • Level: {waterLevel}%
        </span>
      </div>
    </div>
  );
};
