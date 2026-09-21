import React from 'react';

export const DogAnimation = ({ 
  isFeeding = false, 
  isDispensingWater = false,
  foodLevel = 82, 
  waterLevel = 75,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Warm ambient aura */}
      <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl opacity-40 pointer-events-none" />

      {/* Falling Kibble Pieces when isFeeding is true */}
      {isFeeding && (
        <div className="absolute top-4 inset-x-0 flex justify-center space-x-3 z-20 pointer-events-none">
          <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-3.5 h-3 bg-amber-800 rounded-sm animate-bounce [animation-delay:100ms]" />
          <div className="w-3 h-3.5 bg-amber-900 rounded-full animate-bounce [animation-delay:200ms]" />
          <div className="w-2.5 h-3 bg-amber-700 rounded-sm animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {/* Water Spray/Flow when isDispensingWater */}
      {isDispensingWater && (
        <div className="absolute top-4 inset-x-0 flex justify-center space-x-4 z-20 pointer-events-none">
          <div className="w-2 h-4 bg-sky-400 rounded-full animate-bounce [animation-delay:50ms]" />
          <div className="w-2.5 h-5 bg-sky-500 rounded-full animate-bounce [animation-delay:150ms]" />
        </div>
      )}

      {/* Dog Illustration */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 220 200" 
          className={`${isLarge ? 'w-48 h-44 sm:w-56 sm:h-52' : 'w-28 h-26'} filter drop-shadow-md`}
        >
          {/* Dog Body */}
          <ellipse cx="95" cy="140" rx="42" ry="32" fill="#d97706" />
          
          {/* Wagging Tail */}
          <path 
            d="M55,140 Q30,120 25,95" 
            stroke="#b45309" 
            strokeWidth="8" 
            strokeLinecap="round" 
            fill="none" 
            className="animate-sway origin-bottom-right"
          />

          {/* Dog Paws */}
          <ellipse cx="80" cy="170" rx="10" ry="6" fill="#b45309" />
          <ellipse cx="115" cy="170" rx="10" ry="6" fill="#b45309" />

          {/* Dog Head */}
          <ellipse cx="140" cy="95" rx="34" ry="30" fill="#f59e0b" />
          {/* Snout */}
          <ellipse cx="160" cy="105" rx="18" ry="14" fill="#fbbf24" />
          {/* Nose */}
          <path d="M165,98 C170,98 174,103 171,107 C168,111 162,111 159,107 C156,103 160,98 165,98 Z" fill="#451a03" />

          {/* Floppy Left Ear */}
          <path d="M125,75 C110,65 100,85 108,115 C114,120 125,110 125,75 Z" fill="#b45309" />
          {/* Floppy Right Ear */}
          <path d="M152,70 C165,58 178,75 170,105 C164,112 152,100 152,70 Z" fill="#b45309" />

          {/* Happy Eyes */}
          {isFeeding ? (
            // Closed happy eyes while munching
            <g>
              <path d="M136,88 Q142,82 148,88" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M158,88 Q164,82 170,88" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            // Bright cheerful open eyes
            <g>
              <circle cx="142" cy="88" r="4" fill="#451a03" />
              <circle cx="140.5" cy="86.5" r="1.5" fill="#ffffff" />
              <circle cx="164" cy="88" r="4" fill="#451a03" />
              <circle cx="162.5" cy="86.5" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* Collar & Smart Tag */}
          <path d="M122,120 Q138,135 154,120" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="138" cy="132" r="5" fill="#34d399" />

          {/* Modern Food Bowl */}
          <ellipse cx="178" cy="168" rx="28" ry="10" fill="#94a3b8" />
          <path d="M150,168 L154,178 Q178,185 202,178 L206,168 Z" fill="#64748b" />
          <ellipse cx="178" cy="167" rx="24" ry="7" fill={isDispensingWater ? "#38bdf8" : "#78350f"} />
          {/* Kibble mounds in bowl */}
          {!isDispensingWater && (
            <g>
              <circle cx="172" cy="166" r="3.5" fill="#b45309" />
              <circle cx="180" cy="165" r="4" fill="#92400e" />
              <circle cx="186" cy="166" r="3" fill="#d97706" />
            </g>
          )}
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${isFeeding ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
        <span className="text-amber-900 font-medium">
          {isFeeding ? '🐶 Munching kibble... (Dispensing)' : `🐶 Active & Well Fed (Hopper: ${foodLevel}%)`}
        </span>
      </div>
    </div>
  );
};
