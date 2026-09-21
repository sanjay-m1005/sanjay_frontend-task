import React, { useState, useEffect } from 'react';

export const BabyAnimation = ({ 
  soundDecibels = 24, 
  cryDetected = false,
  nightVision = false,
  lullabyPlaying = false,
  size = 'lg' 
}) => {
  const isLarge = size === 'lg';
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isLarge ? 'h-64 sm:h-72' : 'h-40'}`}>
      {/* Dynamic ambient backdrop */}
      <div 
        className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 opacity-25 ${
          cryDetected ? 'bg-rose-500 animate-pulse' : nightVision ? 'bg-emerald-500' : 'bg-sky-400'
        }`} 
      />

      {/* Camera Viewport Screen */}
      <div 
        className={`relative z-10 w-full max-w-sm rounded-2xl overflow-hidden border transition-all duration-500 shadow-md ${
          nightVision 
            ? 'bg-[#0f1715] border-emerald-500/40 text-emerald-400' 
            : 'bg-gradient-to-b from-sky-50 to-indigo-50 border-sky-200 text-slate-700'
        }`}
      >
        {/* Camera HUD Header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-black/10 backdrop-blur-sm text-[10px] font-mono tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${cryDetected ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="font-semibold uppercase">{nightVision ? 'IR NIGHT 1080P' : 'LIVE 1080P'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{timeStr || '12:00:00'}</span>
            <span className="text-emerald-500 font-bold">📶 98%</span>
          </div>
        </div>

        {/* Viewport Interior with Nursery Crib */}
        <div className="relative h-28 sm:h-32 flex items-center justify-center overflow-hidden">
          {/* Night Vision Scanlines & Grain */}
          {nightVision && (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(16,185,129,0.05)_3px,rgba(16,185,129,0.05)_4px)] pointer-events-none z-10" />
          )}

          {/* Lullaby Floating Melody Notes */}
          {lullabyPlaying && (
            <div className="absolute inset-0 flex justify-around items-center pointer-events-none z-20">
              <span className="text-amber-400 text-lg font-bold animate-float [animation-delay:0ms]">♫</span>
              <span className="text-sky-400 text-base font-bold animate-float [animation-delay:300ms]">♪</span>
              <span className="text-rose-400 text-xl font-bold animate-float [animation-delay:600ms]">♫</span>
            </div>
          )}

          {/* Nursery Crib Silhouette */}
          <svg viewBox="0 0 160 90" className="w-40 h-24 filter drop-shadow">
            {/* Crib Rails */}
            <rect x="25" y="25" width="110" height="42" rx="4" fill="none" stroke={nightVision ? '#059669' : '#94a3b8'} strokeWidth="2" />
            <line x1="45" y1="25" x2="45" y2="67" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            <line x1="65" y1="25" x2="65" y2="67" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            <line x1="85" y1="25" x2="85" y2="67" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            <line x1="105" y1="25" x2="105" y2="67" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            <line x1="125" y1="25" x2="125" y2="67" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1.5" />
            {/* Crib legs */}
            <line x1="30" y1="67" x2="30" y2="82" stroke={nightVision ? '#059669' : '#64748b'} strokeWidth="3" strokeLinecap="round" />
            <line x1="130" y1="67" x2="130" y2="82" stroke={nightVision ? '#059669' : '#64748b'} strokeWidth="3" strokeLinecap="round" />

            {/* Sleeping Baby Swaddle & Pillow */}
            <ellipse cx="60" cy="50" rx="14" ry="10" fill={nightVision ? '#34d399' : '#fb7185'} opacity="0.85" />
            <circle cx="50" cy="46" r="6" fill={nightVision ? '#6ee7b7' : '#fecdd3'} />
            <path d="M48,46 Q50,48 52,46" stroke="#475569" strokeWidth="1" fill="none" />
            {/* Gentle breathing chest sway */}
            <ellipse cx="78" cy="52" rx="22" ry="11" fill={nightVision ? '#10b981' : '#f43f5e'} opacity="0.7" className="animate-pulse" />

            {/* Mobile toy stars hanging above */}
            <line x1="80" y1="5" x2="80" y2="20" stroke={nightVision ? '#059669' : '#cbd5e1'} strokeWidth="1" />
            <polygon points="80,18 82,23 87,23 83,26 85,31 80,28 75,31 77,26 73,23 78,23" fill="#facc15" />
          </svg>

          {/* Cry Alert Warning Banner across screen */}
          {cryDetected && (
            <div className="absolute inset-0 bg-rose-500/30 backdrop-blur-[2px] flex items-center justify-center z-30">
              <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-full animate-bounce shadow-lg">
                ⚠️ CRY DETECTED ({soundDecibels} dB)
              </span>
            </div>
          )}
        </div>

        {/* Audio Waveform Equalizer Footer */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-black/10 border-t border-black/5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🔊</span>
            <span className="font-mono font-medium">{soundDecibels} dB</span>
            <div className="flex items-end gap-0.5 h-3 ml-1">
              {[6, 12, 18, 9, 14, 20, 8, 16].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-sm transition-all duration-300 ${
                    cryDetected ? 'bg-rose-500' : nightVision ? 'bg-emerald-400' : 'bg-sky-500'
                  }`}
                  style={{ height: `${Math.min(100, (soundDecibels / 70) * h)}%` }}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] font-medium opacity-80">
            {cryDetected ? 'Vocal Surge' : 'Nursery Peaceful'}
          </span>
        </div>
      </div>

      {/* Pill Status */}
      <div className="mt-3 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm transition-all duration-300">
        <span className={`w-2 h-2 rounded-full ${cryDetected ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
        <span className={cryDetected ? 'text-rose-700' : 'text-slate-700'}>
          {cryDetected ? `🔔 Cry Alert (${soundDecibels} dB)` : `👶 Resting Peacefully • ${soundDecibels} dB • 22.8°C`}
        </span>
      </div>
    </div>
  );
};
