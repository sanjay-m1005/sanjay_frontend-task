import React from 'react';

export const BirdAnimation = ({ 
  isFeeding = false, 
  seedLevel = 90, 
  waterBathLevel = 85,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Soft sky blue aura */}
      <div className="absolute inset-0 rounded-full bg-sky-300/20 blur-3xl opacity-40 pointer-events-none" />

      {/* Floating Musical Chirp Notes */}
      <div className="absolute top-2 inset-x-0 flex justify-center space-x-12 z-20 pointer-events-none">
        <span className="text-sky-500 font-bold text-lg animate-bounce [animation-delay:0ms]">♪</span>
        <span className="text-emerald-500 font-bold text-sm animate-bounce [animation-delay:200ms]">♫</span>
        <span className="text-amber-500 font-bold text-base animate-bounce [animation-delay:400ms]">♪</span>
      </div>

      {/* Aviary & Birds Assembly */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 220 200" 
          className={`${isLarge ? 'w-48 h-44 sm:w-56 sm:h-52' : 'w-28 h-26'} filter drop-shadow-md`}
        >
          {/* Wooden Hanging Feeder Stand */}
          <line x1="110" y1="0" x2="110" y2="40" stroke="#78350f" strokeWidth="2.5" />
          {/* Feeder Roof */}
          <polygon points="50,45 110,20 170,45" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
          <polygon points="55,47 110,24 165,47" fill="#b45309" />

          {/* Transparent Acrylic Seed Hopper Tube */}
          <rect x="85" y="45" width="50" height="75" rx="3" fill="#f8fafc" fillOpacity="0.7" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Seed Fill inside Hopper */}
          <rect 
            x="87" 
            y={45 + (75 * (1 - seedLevel / 100))} 
            width="46" 
            height={75 * (seedLevel / 100)} 
            rx="2" 
            fill="#d97706" 
            opacity="0.85" 
          />

          {/* Lower Feeder Tray / Perch Ring */}
          <ellipse cx="110" cy="125" rx="48" ry="12" fill="#78350f" />
          <ellipse cx="110" cy="123" rx="44" ry="9" fill="#b45309" />

          {/* Seeds Dropping if feeding */}
          {isFeeding && (
            <g>
              <circle cx="106" cy="121" r="2" fill="#fde68a" className="animate-ping" />
              <circle cx="114" cy="120" r="2.5" fill="#fef08a" className="animate-ping" />
            </g>
          )}

          {/* Canary Bird Perching on Right */}
          <g className="transition-transform duration-500 origin-bottom" style={{ transform: isFeeding ? 'rotate(-6deg)' : 'rotate(0deg)' }}>
            {/* Bird Tail */}
            <path d="M148,122 L172,135 L165,120 Z" fill="#eab308" />
            {/* Bird Body */}
            <ellipse cx="140" cy="115" rx="16" ry="12" fill="#facc15" />
            {/* Bird Wing */}
            <path d="M136,112 C146,112 154,118 152,126 C144,124 136,118 136,112 Z" fill="#ca8a04" />
            {/* Bird Head */}
            <circle cx="127" cy="104" r="9" fill="#fef08a" />
            {/* Eye */}
            <circle cx="124" cy="102" r="1.5" fill="#1e293b" />
            {/* Beak */}
            <polygon points="119,103 113,105 119,107" fill="#ea580c" />
            {/* Feet holding perch */}
            <line x1="138" y1="125" x2="138" y2="128" stroke="#ea580c" strokeWidth="2" />
            <line x1="144" y1="125" x2="144" y2="128" stroke="#ea580c" strokeWidth="2" />
          </g>

          {/* Bird Bath Shimmering Basin on Left */}
          <ellipse cx="50" cy="155" rx="30" ry="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="50" cy="154" rx="26" ry="9" fill="#38bdf8" opacity="0.8" />
          <path d="M38,154 Q50,158 62,154" stroke="#e0f2fe" strokeWidth="1.5" fill="none" className="animate-pulse" />
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-slate-700 font-medium">
          🐦 Canary Active • Seed Hopper: {seedLevel}% • Bath Fresh
        </span>
      </div>
    </div>
  );
};
