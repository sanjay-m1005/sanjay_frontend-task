import React from 'react';

export const PlantAnimation = ({ moisture = 68, isWatering = false, size = 'lg' }) => {
  const isHealthy = moisture >= 35;
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Ambient aura glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-700 blur-3xl opacity-30 ${
          isWatering ? 'bg-sky-400 scale-110' : isHealthy ? 'bg-emerald-400' : 'bg-amber-400'
        }`} 
      />

      {/* Water Droplets during watering */}
      {isWatering && (
        <div className="absolute top-2 inset-x-0 flex justify-center space-x-6 z-20 pointer-events-none">
          <div className="w-2.5 h-3.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-3 h-4 bg-sky-500 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-3 bg-sky-300 rounded-full animate-bounce [animation-delay:300ms]" />
          <div className="w-3 h-4 bg-sky-400 rounded-full animate-bounce [animation-delay:450ms]" />
        </div>
      )}

      {/* Plant SVG Container */}
      <div className={`relative z-10 transition-transform duration-700 ${isHealthy ? 'animate-sway' : 'rotate-6 translate-y-2'}`}>
        <svg 
          viewBox="0 0 200 220" 
          className={`${isLarge ? 'w-48 h-48 sm:w-56 sm:h-56' : 'w-28 h-28'} filter drop-shadow-md transition-all duration-700`}
        >
          {/* Pot */}
          <ellipse cx="100" cy="190" rx="42" ry="8" fill="#d97706" opacity="0.3" />
          <path d="M68,145 L132,145 L124,195 Q100,202 76,195 Z" fill="#ea580c" />
          <path d="M64,142 L136,142 Q140,142 140,147 L136,152 Q100,156 64,152 L60,147 Q60,142 64,142 Z" fill="#c2410c" />
          {/* Soil */}
          <ellipse cx="100" cy="144" rx="33" ry="5" fill="#451a03" />

          {/* Plant Stem */}
          <path 
            d={isHealthy 
              ? "M100,144 Q100,110 98,75 Q96,40 102,25" 
              : "M100,144 Q96,120 85,90 Q75,65 65,55"} 
            stroke={isHealthy ? "#15803d" : "#854d0e"} 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none" 
            className="transition-all duration-700"
          />

          {/* Left Leaf 1 */}
          <path 
            d={isHealthy 
              ? "M98,115 C70,115 55,95 50,75 C70,75 90,95 98,115 Z" 
              : "M92,120 C70,128 55,120 48,115 C60,105 80,110 92,120 Z"} 
            fill={isHealthy ? "#22c55e" : "#ca8a04"} 
            className="transition-all duration-700"
          />
          {/* Left Leaf 1 vein */}
          <path 
            d={isHealthy ? "M96,113 Q76,97 52,77" : "M90,119 Q70,118 50,116"} 
            stroke={isHealthy ? "#16a34a" : "#a16207"} 
            strokeWidth="1.5" 
            fill="none" 
          />

          {/* Right Leaf 1 */}
          <path 
            d={isHealthy 
              ? "M99,100 C130,100 145,80 150,60 C130,60 110,80 99,100 Z" 
              : "M94,108 C120,118 135,115 140,110 C125,98 108,100 94,108 Z"} 
            fill={isHealthy ? "#4ade80" : "#d97706"} 
            className="transition-all duration-700"
          />
          {/* Right Leaf 1 vein */}
          <path 
            d={isHealthy ? "M100,98 Q124,82 148,62" : "M95,106 Q118,110 138,111"} 
            stroke={isHealthy ? "#22c55e" : "#b45309"} 
            strokeWidth="1.5" 
            fill="none" 
          />

          {/* Left Leaf 2 (Upper) */}
          <path 
            d={isHealthy 
              ? "M97,68 C75,55 70,35 75,20 C90,30 95,50 97,68 Z" 
              : "M80,80 C60,82 50,75 45,68 C60,65 72,72 80,80 Z"} 
            fill={isHealthy ? "#34d399" : "#a16207"} 
            className="transition-all duration-700"
          />

          {/* Flower / Top Sprout */}
          {isHealthy ? (
            <g className="transition-transform duration-700">
              <circle cx="102" cy="22" r="7" fill="#f43f5e" />
              <circle cx="94" cy="18" r="5" fill="#fb7185" />
              <circle cx="110" cy="18" r="5" fill="#fb7185" />
              <circle cx="97" cy="28" r="5" fill="#fb7185" />
              <circle cx="107" cy="28" r="5" fill="#fb7185" />
              <circle cx="102" cy="22" r="3" fill="#fef08a" />
            </g>
          ) : (
            <g className="transition-transform duration-700">
              <circle cx="63" cy="55" r="4" fill="#a16207" />
              <circle cx="61" cy="57" r="3" fill="#78350f" />
            </g>
          )}

          {/* Plant Expression on Pot Face */}
          {isHealthy ? (
            <g>
              {/* Happy eyes */}
              <path d="M88,168 Q92,164 96,168" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M104,168 Q108,164 112,168" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Rosy cheeks */}
              <circle cx="86" cy="172" r="3" fill="#fca5a5" opacity="0.6" />
              <circle cx="114" cy="172" r="3" fill="#fca5a5" opacity="0.6" />
              {/* Smile */}
              <path d="M96,174 Q100,180 104,174" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              {/* Sad/Worried eyes */}
              <ellipse cx="90" cy="168" rx="2.5" ry="3" fill="#78350f" />
              <ellipse cx="110" cy="168" rx="2.5" ry="3" fill="#78350f" />
              {/* Tear droplet */}
              <circle cx="112" cy="175" r="2" fill="#38bdf8" />
              {/* Frown */}
              <path d="M96,177 Q100,172 104,177" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Status Pill */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${isWatering ? 'bg-sky-500 animate-ping' : isHealthy ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
        {isWatering ? (
          <span className="text-sky-700 font-medium">Watering in progress...</span>
        ) : isHealthy ? (
          <span className="text-emerald-800">🟢 Thriving & Hydrated ({moisture}%)</span>
        ) : (
          <span className="text-rose-700">🔴 Thirsty: Needs Water ({moisture}%)</span>
        )}
      </div>
    </div>
  );
};
