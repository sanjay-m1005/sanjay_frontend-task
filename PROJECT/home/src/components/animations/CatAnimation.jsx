import React from 'react';

export const CatAnimation = ({ 
  isFeeding = false, 
  fountainActive = true,
  foodLevel = 70, 
  waterLevel = 88,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Soft pastel violet/teal aura */}
      <div className="absolute inset-0 rounded-full bg-emerald-400/15 blur-3xl opacity-40 pointer-events-none" />

      {/* Kibble drop when feeding */}
      {isFeeding && (
        <div className="absolute top-4 inset-x-0 flex justify-center space-x-3 z-20 pointer-events-none">
          <div className="w-2.5 h-2.5 bg-amber-800 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2.5 bg-amber-900 rounded-full animate-bounce [animation-delay:120ms]" />
          <div className="w-2.5 h-2 bg-amber-700 rounded-full animate-bounce [animation-delay:240ms]" />
        </div>
      )}

      {/* Cat SVG Illustration */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 220 200" 
          className={`${isLarge ? 'w-48 h-44 sm:w-56 sm:h-52' : 'w-28 h-26'} filter drop-shadow-md`}
        >
          {/* Purring heart indicator */}
          <path 
            d="M110,48 C106,42 98,42 94,48 C88,56 100,68 110,74 C120,68 132,56 126,48 C122,42 114,42 110,48 Z" 
            fill="#f43f5e" 
            className="animate-pulse origin-center opacity-80"
          />

          {/* Cat Body (curled cozy posture) */}
          <ellipse cx="100" cy="142" rx="44" ry="34" fill="#fed7aa" />
          {/* Calico orange/cream spots */}
          <path d="M80,120 C70,130 65,150 78,162 C90,165 95,145 92,130 Z" fill="#fb923c" />

          {/* Graceful curving tail */}
          <path 
            d="M58,142 C35,135 25,105 32,85 C36,75 45,78 42,88 C38,102 46,124 64,130" 
            fill="#fb923c" 
            className="animate-sway origin-bottom-right"
          />

          {/* Front Paws */}
          <ellipse cx="118" cy="170" rx="8" ry="6" fill="#ffedd5" />
          <ellipse cx="132" cy="170" rx="8" ry="6" fill="#ffedd5" />

          {/* Cat Head */}
          <circle cx="138" cy="102" r="28" fill="#fed7aa" />
          
          {/* Pointy Left Ear */}
          <polygon points="116,92 110,64 128,78" fill="#fb923c" />
          <polygon points="117,88 114,68 126,78" fill="#fecdd3" />
          {/* Pointy Right Ear */}
          <polygon points="148,78 166,64 160,92" fill="#fb923c" />
          <polygon points="150,78 162,68 159,88" fill="#fecdd3" />

          {/* Peaceful Almond Eyes */}
          <path d="M125,102 Q130,97 135,102" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M145,102 Q150,97 155,102" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Nose & Mouth */}
          <polygon points="138,107 142,107 140,110" fill="#f43f5e" />
          <path d="M136,112 Q140,115 144,112" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Fine Whiskers */}
          <line x1="120" y1="108" x2="104" y2="105" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="120" y1="112" x2="102" y2="114" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="160" y1="108" x2="176" y2="105" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="160" y1="112" x2="178" y2="114" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />

          {/* Circulating Water Fountain */}
          <ellipse cx="184" cy="164" rx="26" ry="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="184" cy="163" rx="22" ry="9" fill="#38bdf8" opacity="0.85" />
          {/* Fountain Spout & Stream */}
          <circle cx="184" cy="160" r="3" fill="#ffffff" />
          {fountainActive && (
            <g className="animate-pulse">
              <ellipse cx="184" cy="163" rx="14" ry="5" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />
              <ellipse cx="184" cy="163" rx="8" ry="3" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${fountainActive ? 'bg-sky-400 animate-ping' : 'bg-amber-400'}`} />
        <span className="text-slate-700 font-medium">
          {fountainActive ? `🐱 Fountain Active & Filtered • Hopper: ${foodLevel}%` : '🐱 Resting • Water Station Standby'}
        </span>
      </div>
    </div>
  );
};
