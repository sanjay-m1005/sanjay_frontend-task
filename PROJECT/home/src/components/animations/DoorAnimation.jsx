import React from 'react';

export const DoorAnimation = ({ 
  isLocked = true, 
  batteryPercent = 94,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Background soft glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 opacity-25 ${
          isLocked ? 'bg-emerald-400' : 'bg-amber-400'
        }`} 
      />

      {/* Door & Lock Hardware Assembly */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 200 240" 
          className={`${isLarge ? 'w-44 h-52 sm:w-52 sm:h-60' : 'w-28 h-32'} filter drop-shadow-md`}
        >
          {/* Outer Door Frame & Jamb */}
          <rect x="30" y="20" width="140" height="200" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Main Door Slab */}
          <rect x="40" y="28" width="105" height="184" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Subtle wood paneling accents */}
          <rect x="48" y="38" width="89" height="50" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="48" y="100" width="89" height="100" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />

          {/* Escutcheon Lock Plate */}
          <rect x="110" y="110" width="30" height="70" rx="6" fill="#334155" stroke="#1e293b" strokeWidth="2" />

          {/* Keypad Digits Backlight */}
          <circle cx="118" cy="122" r="2.5" fill="#94a3b8" />
          <circle cx="125" cy="122" r="2.5" fill="#94a3b8" />
          <circle cx="132" cy="122" r="2.5" fill="#94a3b8" />
          <circle cx="118" cy="130" r="2.5" fill="#94a3b8" />
          <circle cx="125" cy="130" r="2.5" fill="#94a3b8" />
          <circle cx="132" cy="130" r="2.5" fill="#94a3b8" />

          {/* Status Indicator LED on Lock */}
          <circle 
            cx="125" 
            cy="142" 
            r="3.5" 
            fill={isLocked ? "#10b981" : "#f59e0b"} 
            className="filter drop-shadow-[0_0_6px_currentColor] transition-colors duration-300"
          />

          {/* Modern Lever Handle */}
          <path d="M125,160 L95,160 Q90,160 90,165 Q90,170 95,170 L125,170 Z" fill="#64748b" />
          <circle cx="125" cy="165" r="5" fill="#475569" />

          {/* Heavy Motorized Deadbolt Slide */}
          <g className="transition-transform duration-500 ease-out" style={{ transform: isLocked ? 'translateX(18px)' : 'translateX(0px)' }}>
            <rect 
              x="130" 
              y="94" 
              width="26" 
              height="14" 
              rx="2" 
              fill="#94a3b8" 
              stroke="#475569" 
              strokeWidth="1.5" 
              className="filter drop-shadow-sm"
            />
            {/* Beveled bolt face */}
            <path d="M152,94 L156,98 L156,104 L152,108 Z" fill="#cbd5e1" />
          </g>

          {/* Strike Plate Hole in Frame */}
          <rect x="145" y="90" width="10" height="22" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1" />
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
        <span className={isLocked ? 'text-emerald-800' : 'text-amber-800'}>
          {isLocked ? '🔒 Secured & Locked (Deadbolt Engaged)' : '🔓 Unlocked (Access Ready)'}
        </span>
      </div>
    </div>
  );
};
