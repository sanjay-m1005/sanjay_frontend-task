import React from 'react';

export const LightAnimation = ({ 
  isOn = true, 
  brightness = 85, 
  colorTemp = 3200, 
  colorHex = '#fff7ed',
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';
  const effectiveOpacity = isOn ? Math.max(0.15, brightness / 100) : 0;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Radial glow background */}
      {isOn && (
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500 blur-3xl pointer-events-none"
          style={{
            backgroundColor: colorHex,
            opacity: effectiveOpacity * 0.75,
            transform: `scale(${0.8 + (brightness / 100) * 0.5})`
          }}
        />
      )}

      {/* Light Bulb SVG */}
      <div className="relative z-10">
        <svg 
          viewBox="0 0 160 200" 
          className={`${isLarge ? 'w-36 h-44 sm:w-44 sm:h-52' : 'w-24 h-28'} transition-all duration-500 filter drop-shadow-md`}
        >
          {/* Hanging Cord & Socket */}
          <line x1="80" y1="0" x2="80" y2="40" stroke="#64748b" strokeWidth="4" />
          <rect x="70" y="40" width="20" height="24" rx="3" fill="#475569" />
          <line x1="70" y1="48" x2="90" y2="48" stroke="#334155" strokeWidth="2" />
          <line x1="70" y1="56" x2="90" y2="56" stroke="#334155" strokeWidth="2" />

          {/* Glass Bulb Outline */}
          <path 
            d="M55,64 C40,78 35,100 45,120 C53,135 65,145 68,155 L92,155 C95,145 107,135 115,120 C125,100 120,78 105,64 Z" 
            fill={isOn ? colorHex : '#f1f5f9'} 
            fillOpacity={isOn ? 0.3 + (brightness / 100) * 0.6 : 0.6}
            stroke={isOn ? '#fbbf24' : '#cbd5e1'} 
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Glowing Filament */}
          <g className="transition-all duration-300">
            {/* Filament support wires */}
            <line x1="72" y1="150" x2="74" y2="105" stroke={isOn ? '#b45309' : '#94a3b8'} strokeWidth="1.5" />
            <line x1="88" y1="150" x2="86" y2="105" stroke={isOn ? '#b45309' : '#94a3b8'} strokeWidth="1.5" />
            
            {/* Filament coiled loop */}
            <path 
              d="M74,105 Q80,90 86,105" 
              stroke={isOn ? '#f59e0b' : '#64748b'} 
              strokeWidth={isOn ? '3.5' : '2'} 
              strokeLinecap="round" 
              fill="none" 
              className={isOn ? 'filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]' : ''}
            />
          </g>

          {/* Dynamic Light Beam Rays when ON */}
          {isOn && (
            <g className="opacity-70 transition-opacity duration-500 animate-pulse-subtle">
              <line x1="30" y1="80" x2="10" y2="70" stroke={colorHex} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="25" y1="115" x2="5" y2="120" stroke={colorHex} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="130" y1="80" x2="150" y2="70" stroke={colorHex} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="135" y1="115" x2="155" y2="120" stroke={colorHex} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${isOn ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-slate-300'}`} />
        <span className={isOn ? 'text-amber-800' : 'text-slate-500'}>
          {isOn ? `💡 Illuminated (${brightness}% • ${colorTemp}K)` : '🌑 Switched OFF'}
        </span>
      </div>
    </div>
  );
};
