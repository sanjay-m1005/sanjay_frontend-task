import React, { useMemo } from 'react';
import { useIoT } from '../../context/IoTContext';
import { Droplet, AlertTriangle, CheckCircle2, Sparkles, Wind, ArrowUpRight } from 'lucide-react';

export const PlantVisualizer = () => {
  const { 
    soilMoisture, 
    plantState, 
    pumpStatus, 
    setSoilMoisture,
    soilStatus 
  } = useIoT();

  // Determine continuous interpolation factors based on soil moisture (0 to 100)
  // Normalized factor: 0 (completely parched) -> 0.5 (medium) -> 1.0 (fully lush)
  const hydrationRatio = useMemo(() => {
    return Math.min(100, Math.max(0, soilMoisture)) / 100;
  }, [soilMoisture]);

  // Leaf droop angles:
  // Dry (ratio < 0.3): Leaves droop down (angles 30° to 45°)
  // Medium (0.3 - 0.7): Leaves angle outward (10° to 20°)
  // Moist (0.7 - 1.0): Leaves stand upright and proud (-5° to 8°)
  const leafTransform = useMemo(() => {
    if (hydrationRatio <= 0.3) {
      // 0 -> 0.3
      const t = hydrationRatio / 0.3; // 0 to 1
      const droopDeg = 38 - t * 18; // 38 deg down to 20 deg
      const scaleY = 0.82 + t * 0.1;
      return { droopDeg, scaleY, state: 'dry' };
    } else if (hydrationRatio <= 0.7) {
      const t = (hydrationRatio - 0.3) / 0.4; // 0 to 1
      const droopDeg = 20 - t * 15; // 20 deg down to 5 deg
      const scaleY = 0.92 + t * 0.08;
      return { droopDeg, scaleY, state: 'medium' };
    } else {
      const t = (hydrationRatio - 0.7) / 0.3; // 0 to 1
      const droopDeg = 5 - t * 10; // 5 deg to -5 deg (perky upright)
      const scaleY = 1.0 + t * 0.05;
      return { droopDeg, scaleY, state: 'moist' };
    }
  }, [hydrationRatio]);

  // Color transitions based on moisture:
  // Dry: Pale olive / desaturated brown-green
  // Medium: Natural balanced green
  // Moist: Deep vibrant emerald / mint highlight
  const foliageColors = useMemo(() => {
    if (leafTransform.state === 'dry') {
      return {
        main: '#8c8d5a',
        secondary: '#a3a568',
        highlight: '#c2bf82',
        stem: '#7d7e50',
        soil: '#b89976',
        soilCracks: 'rgba(92, 64, 40, 0.4)',
        glow: 'rgba(217, 119, 6, 0.15)'
      };
    } else if (leafTransform.state === 'medium') {
      return {
        main: '#22c55e',
        secondary: '#16a34a',
        highlight: '#86efac',
        stem: '#15803d',
        soil: '#634832',
        soilCracks: 'transparent',
        glow: 'rgba(34, 197, 94, 0.15)'
      };
    } else {
      return {
        main: '#10b981',
        secondary: '#059669',
        highlight: '#6ee7b7',
        stem: '#047857',
        soil: '#453023',
        soilCracks: 'transparent',
        glow: 'rgba(16, 185, 129, 0.25)'
      };
    }
  }, [leafTransform.state]);

  return (
    <div className="card-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-white via-white to-emerald-50/20 border border-slate-200/80">
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: foliageColors.glow }}
      />

      {/* Header Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Botanical Telemetry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Monstera Deliciosa (Node #1)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Plant Live Status</h2>
        </div>

        {/* Dynamic Status Badge */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-sm font-semibold transition-all duration-500 shadow-soft-sm ${
          plantState.level === 'dry'
            ? 'bg-amber-50/90 border-amber-200 text-amber-800'
            : plantState.level === 'medium'
            ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
            : 'bg-green-50/90 border-green-200 text-green-800'
        }`}>
          {plantState.level === 'dry' && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          )}
          {plantState.level === 'medium' && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          )}
          {plantState.level === 'moist' && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          )}

          <span>{plantState.title}</span>

          {plantState.level === 'dry' && <AlertTriangle className="w-4 h-4 text-amber-600 ml-0.5" />}
          {plantState.level === 'medium' && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-0.5" />}
          {plantState.level === 'moist' && <Sparkles className="w-4 h-4 text-green-600 ml-0.5" />}
        </div>
      </div>

      {/* Main Animated Plant Stage */}
      <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[420px] select-none">
        
        {/* Active Watering Droplets Overlay when Pump is ON */}
        {pumpStatus && (
          <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-start pt-16">
            <div className="relative w-48 h-56">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-sky-400 rounded-full opacity-75 shadow-sm"
                  style={{
                    width: `${5 + (i % 3) * 2}px`,
                    height: `${9 + (i % 3) * 3}px`,
                    left: `${20 + (i * 26)}px`,
                    top: '-10px',
                    animation: `fallWater 1.${2 + i * 2}s cubic-bezier(0.5, 0, 0.9, 1) infinite`,
                    animationDelay: `${i * 0.22}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Vitality Shimmer Effect when fully moist */}
        {leafTransform.state === 'moist' && (
          <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center">
            <div className="relative w-64 h-64">
              <div className="absolute top-10 left-12 animate-float-dew flex items-center gap-1 bg-emerald-100/90 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200 shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Transpiring
              </div>
              <div className="absolute top-24 right-8 animate-float-dew flex items-center gap-1 bg-green-100/90 text-green-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-green-200 shadow-sm backdrop-blur-sm" style={{ animationDelay: '1.2s' }}>
                <Wind className="w-3 h-3 text-green-600" /> Lush & Perky
              </div>
            </div>
          </div>
        )}

        {/* Wilt Warning Callout when dry */}
        {leafTransform.state === 'dry' && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="animate-pulse bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Turgor Pressure Dropped
            </div>
          </div>
        )}

        {/* Procedural SVG Animated Plant */}
        <svg
          viewBox="0 0 400 480"
          className={`w-full max-w-[380px] sm:max-w-[420px] h-auto overflow-visible transition-transform duration-700 ${
            leafTransform.state === 'dry' 
              ? 'animate-sway-wilt' 
              : leafTransform.state === 'moist' 
              ? 'animate-sway-gentle' 
              : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ceramic Pot Gradients */}
            <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="35%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="potRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Dynamic Leaf Gradients */}
            <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={foliageColors.highlight} />
              <stop offset="50%" stopColor={foliageColors.main} />
              <stop offset="100%" stopColor={foliageColors.secondary} />
            </linearGradient>

            <linearGradient id="leafGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={foliageColors.highlight} />
              <stop offset="45%" stopColor={foliageColors.main} />
              <stop offset="100%" stopColor={foliageColors.secondary} />
            </linearGradient>

            <linearGradient id="leafGradCenter" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={foliageColors.highlight} />
              <stop offset="40%" stopColor={foliageColors.main} />
              <stop offset="100%" stopColor={foliageColors.secondary} />
            </linearGradient>

            {/* Soil Gradients */}
            <radialGradient id="soilGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor={foliageColors.soil} />
              <stop offset="100%" stopColor={leafTransform.state === 'dry' ? '#7c5836' : '#271810'} />
            </radialGradient>

            {/* Soft Ground Shadow */}
            <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(15, 23, 42, 0.16)" />
              <stop offset="70%" stopColor="rgba(15, 23, 42, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ground Shadow */}
          <ellipse cx="200" cy="460" rx="140" ry="18" fill="url(#groundShadow)" />

          {/* ===== PLANT FOLIAGE (Reacts smoothly to moisture) ===== */}
          <g id="foliageGroup" className="transition-all duration-700">

            {/* Central Main Stem */}
            <path
              d="M200 350 Q 198 280 200 170"
              stroke={foliageColors.stem}
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
              className="transition-colors duration-700"
            />

            {/* Left Branch Stem */}
            <path
              d={`M199 300 Q 170 ${250 + (leafTransform.state === 'dry' ? 25 : 0)} 120 ${210 + (leafTransform.state === 'dry' ? 45 : 0)}`}
              stroke={foliageColors.stem}
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700"
            />

            {/* Right Branch Stem */}
            <path
              d={`M201 290 Q 230 ${240 + (leafTransform.state === 'dry' ? 25 : 0)} 280 ${200 + (leafTransform.state === 'dry' ? 45 : 0)}`}
              stroke={foliageColors.stem}
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700"
            />

            {/* Upper Right Branch */}
            <path
              d={`M200 230 Q 235 ${180 + (leafTransform.state === 'dry' ? 20 : 0)} 265 ${130 + (leafTransform.state === 'dry' ? 35 : 0)}`}
              stroke={foliageColors.stem}
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700"
            />

            {/* Upper Left Branch */}
            <path
              d={`M200 240 Q 165 ${190 + (leafTransform.state === 'dry' ? 20 : 0)} 135 ${140 + (leafTransform.state === 'dry' ? 35 : 0)}`}
              stroke={foliageColors.stem}
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700"
            />

            {/* LEAF 1: Lower Left (Major Leaf) */}
            <g
              transform={`translate(120, ${210 + (leafTransform.state === 'dry' ? 45 : 0)}) rotate(${leafTransform.droopDeg + 35}) scale(1, ${leafTransform.scaleY})`}
              className="transition-all duration-700 origin-top-right"
            >
              {/* Botanical Monstera/Ficus style leaf */}
              <path
                d="M 0 0 C -60 -20, -110 30, -90 100 C -70 140, -15 130, 0 85 C 10 55, 10 15, 0 0 Z"
                fill="url(#leafGradLeft)"
                className="transition-all duration-700 filter drop-shadow-sm"
              />
              {/* Leaf Vein */}
              <path
                d="M 0 0 Q -40 50 -75 100"
                stroke={foliageColors.highlight}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path d="M -20 28 Q -45 25 -55 40" stroke={foliageColors.highlight} strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M -40 55 Q -65 52 -75 70" stroke={foliageColors.highlight} strokeWidth="1.2" fill="none" opacity="0.6" />
            </g>

            {/* LEAF 2: Lower Right (Major Leaf) */}
            <g
              transform={`translate(280, ${200 + (leafTransform.state === 'dry' ? 45 : 0)}) rotate(${-leafTransform.droopDeg - 35}) scale(1, ${leafTransform.scaleY})`}
              className="transition-all duration-700 origin-top-left"
            >
              <path
                d="M 0 0 C 60 -20, 110 30, 90 100 C 70 140, 15 130, 0 85 C -10 55, -10 15, 0 0 Z"
                fill="url(#leafGradRight)"
                className="transition-all duration-700 filter drop-shadow-sm"
              />
              <path
                d="M 0 0 Q 40 50 75 100"
                stroke={foliageColors.highlight}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path d="M 20 28 Q 45 25 55 40" stroke={foliageColors.highlight} strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M 40 55 Q 65 52 75 70" stroke={foliageColors.highlight} strokeWidth="1.2" fill="none" opacity="0.6" />
            </g>

            {/* LEAF 3: Upper Left */}
            <g
              transform={`translate(135, ${140 + (leafTransform.state === 'dry' ? 35 : 0)}) rotate(${leafTransform.droopDeg + 15}) scale(0.85, ${leafTransform.scaleY})`}
              className="transition-all duration-700 origin-top-right"
            >
              <path
                d="M 0 0 C -45 -25, -85 10, -75 70 C -60 100, -10 90, 0 60 C 5 40, 5 15, 0 0 Z"
                fill="url(#leafGradLeft)"
                className="transition-all duration-700 filter drop-shadow-sm"
              />
              <path
                d="M 0 0 Q -30 35 -60 70"
                stroke={foliageColors.highlight}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>

            {/* LEAF 4: Upper Right */}
            <g
              transform={`translate(265, ${130 + (leafTransform.state === 'dry' ? 35 : 0)}) rotate(${-leafTransform.droopDeg - 15}) scale(0.85, ${leafTransform.scaleY})`}
              className="transition-all duration-700 origin-top-left"
            >
              <path
                d="M 0 0 C 45 -25, 85 10, 75 70 C 60 100, 10 90, 0 60 C -5 40, -5 15, 0 0 Z"
                fill="url(#leafGradRight)"
                className="transition-all duration-700 filter drop-shadow-sm"
              />
              <path
                d="M 0 0 Q 30 35 60 70"
                stroke={foliageColors.highlight}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>

            {/* LEAF 5: Top Crown Center Leaf (Hero Foliage) */}
            <g
              transform={`translate(200, 170) rotate(${leafTransform.state === 'dry' ? 18 : 0}) scale(${leafTransform.scaleY})`}
              className="transition-all duration-700 origin-bottom"
            >
              <path
                d={`M 0 0 C -50 -40, -45 -130, 0 ${leafTransform.state === 'dry' ? -120 : -150} C 45 -130, 50 -40, 0 0 Z`}
                fill="url(#leafGradCenter)"
                className="transition-all duration-700 filter drop-shadow-md"
              />
              <path
                d={`M 0 0 L 0 ${leafTransform.state === 'dry' ? -110 : -135}`}
                stroke={foliageColors.highlight}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
              <path d="M 0 -35 Q -25 -55 -32 -70" stroke={foliageColors.highlight} strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 0 -35 Q 25 -55 32 -70" stroke={foliageColors.highlight} strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 0 -75 Q -22 -95 -26 -108" stroke={foliageColors.highlight} strokeWidth="1.3" fill="none" opacity="0.6" />
              <path d="M 0 -75 Q 22 -95 26 -108" stroke={foliageColors.highlight} strokeWidth="1.3" fill="none" opacity="0.6" />
            </g>

          </g>

          {/* ===== SOIL BED & CERAMIC POT ===== */}
          <g id="potAndSoil">
            {/* Ceramic Pot Body */}
            <path
              d="M 120 350 L 140 445 C 142 455, 150 458, 160 458 L 240 458 C 250 458, 258 455, 260 445 L 280 350 Z"
              fill="url(#potGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              className="filter drop-shadow"
            />

            {/* Soil Ellipse Inside Pot */}
            <ellipse
              cx="200"
              cy="350"
              rx="78"
              ry="24"
              fill="url(#soilGrad)"
              className="transition-all duration-700"
            />

            {/* Dry Soil Fissures / Cracks (Visible only when moisture <= 30%) */}
            {leafTransform.state === 'dry' && (
              <g stroke="#60462f" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
                <path d="M 155 348 L 175 352 L 185 348" fill="none" />
                <path d="M 175 352 L 170 359" fill="none" />
                <path d="M 215 347 L 230 353 L 245 350" fill="none" />
                <path d="M 230 353 L 235 360" fill="none" />
                <path d="M 190 358 L 205 362" fill="none" />
              </g>
            )}

            {/* Moist Soil Sparkle Points (Visible when moisture > 70%) */}
            {leafTransform.state === 'moist' && (
              <g fill="#93c5fd" opacity="0.8">
                <circle cx="165" cy="350" r="1.5" />
                <circle cx="235" cy="352" r="1.8" />
                <circle cx="195" cy="358" r="1.4" />
                <circle cx="215" cy="346" r="1.6" />
              </g>
            )}

            {/* Ceramic Pot Rim / Collar */}
            <path
              d="M 112 344 C 112 334, 288 334, 288 344 L 288 354 C 288 364, 112 364, 112 354 Z"
              fill="url(#potRimGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            {/* Rim Inner Edge Highlight */}
            <ellipse cx="200" cy="344" rx="86" ry="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

            {/* Pot Brand Emblem / Minimalist Logo */}
            <circle cx="200" cy="405" r="9" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 197 407 C 197 402, 203 400, 203 407 Z" fill="#10b981" />
          </g>
        </svg>
      </div>

      {/* Footer Details: Moisture Slider & Context Bar */}
      <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Quick info badges */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Hydration State</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-800">{soilMoisture.toFixed(0)}%</span>
              <span className="text-xs text-slate-500 font-medium">({soilStatus})</span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Diagnosis</span>
            <span className="text-xs font-semibold text-slate-700">{plantState.description}</span>
          </div>
        </div>

        {/* Quick Testing Preset Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Presets:</span>
          <button
            onClick={() => setSoilMoisture(18)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              soilMoisture <= 30
                ? 'bg-white text-amber-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Simulate 18% Dry State"
          >
            Dry (18%)
          </button>
          <button
            onClick={() => setSoilMoisture(52)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              soilMoisture > 30 && soilMoisture <= 70
                ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Simulate 52% Normal State"
          >
            Normal (52%)
          </button>
          <button
            onClick={() => setSoilMoisture(85)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              soilMoisture > 70
                ? 'bg-white text-green-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Simulate 85% Moist State"
          >
            Healthy (85%)
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fallWater {
          0% {
            transform: translateY(0) scaleY(0.8);
            opacity: 0.9;
          }
          70% {
            transform: translateY(220px) scaleY(1.4);
            opacity: 0.85;
          }
          100% {
            transform: translateY(250px) scaleY(0.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
