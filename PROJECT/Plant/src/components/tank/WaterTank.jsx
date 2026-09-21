import React from 'react';
import { useIoT } from '../../context/IoTContext';
import { Droplets, AlertTriangle, RotateCcw, ShieldAlert, CheckCircle } from 'lucide-react';

export const WaterTank = () => {
  const { waterTankLevel, tankState, refillTank, pumpStatus } = useIoT();

  // Color mappings
  const isCritical = waterTankLevel <= 5;
  const isLow = waterTankLevel > 5 && waterTankLevel <= 20;
  const isMedium = waterTankLevel > 20 && waterTankLevel <= 60;
  const isHigh = waterTankLevel > 60;

  // Calculate liquid fill height percentage
  const fillPercentage = Math.min(100, Math.max(0, waterTankLevel));

  return (
    <div className="card-elevated rounded-3xl p-6 relative overflow-hidden bg-white border border-slate-200/80 flex flex-col justify-between">
      {/* Top Meta Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            <span>Water Reservoir</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Tank Capacity</h3>
        </div>

        {/* State Badge */}
        <div className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
          isCritical
            ? 'bg-red-50 text-red-700 border-red-200 glow-red-pulse'
            : isLow
            ? 'bg-amber-50 text-amber-700 border-amber-200 glow-amber-pulse'
            : isMedium
            ? 'bg-sky-50 text-sky-700 border-sky-200'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          {isCritical ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>Empty</span>
            </>
          ) : isLow ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Low Water Level</span>
            </>
          ) : isMedium ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Medium</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>High</span>
            </>
          )}
        </div>
      </div>

      {/* Main Visual Glass Cylinder Tank */}
      <div className="flex items-center justify-center gap-6 my-2">
        {/* Tank Container */}
        <div className="relative w-36 sm:w-40 h-64 bg-slate-100/70 rounded-3xl p-1.5 border-2 border-slate-200 shadow-inner flex flex-col justify-end overflow-hidden">
          
          {/* Glass Specular Reflection Highlight */}
          <div className="absolute top-2 left-3 w-4 h-56 bg-gradient-to-r from-white/60 to-transparent rounded-full pointer-events-none z-20" />
          <div className="absolute top-2 right-3 w-1.5 h-56 bg-gradient-to-l from-white/40 to-transparent rounded-full pointer-events-none z-20" />

          {/* Graduation Ticks */}
          <div className="absolute inset-y-0 right-2 w-8 flex flex-col justify-between py-5 z-20 pointer-events-none text-[10px] font-semibold text-slate-400 select-none">
            <div className="flex items-center justify-end gap-1"><span>100%</span><div className="w-2.5 h-0.5 bg-slate-300"></div></div>
            <div className="flex items-center justify-end gap-1"><span>75%</span><div className="w-2 h-0.5 bg-slate-300"></div></div>
            <div className="flex items-center justify-end gap-1"><span>50%</span><div className="w-2.5 h-0.5 bg-slate-300"></div></div>
            <div className="flex items-center justify-end gap-1"><span>25%</span><div className="w-2 h-0.5 bg-slate-300"></div></div>
            <div className="flex items-center justify-end gap-1"><span>0%</span><div className="w-2.5 h-0.5 bg-slate-300"></div></div>
          </div>

          {/* Liquid Wave Column */}
          <div 
            className="w-full relative rounded-2xl overflow-hidden transition-all duration-700 ease-out"
            style={{ height: `${fillPercentage}%` }}
          >
            {/* Fluid Base Color */}
            <div className={`w-full h-full absolute inset-0 transition-colors duration-700 ${
              isCritical
                ? 'bg-gradient-to-t from-red-600 via-red-500 to-rose-400'
                : isLow
                ? 'bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300'
                : 'bg-gradient-to-t from-sky-600 via-sky-500 to-cyan-400'
            }`} />

            {/* Liquid Surface Wave Effect */}
            <div className="absolute -top-3 left-0 w-[200%] h-6 pointer-events-none opacity-80">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full animate-wave">
                <path
                  d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                  fill="rgba(255, 255, 255, 0.45)"
                />
              </svg>
            </div>
            <div className="absolute -top-3 left-0 w-[200%] h-6 pointer-events-none opacity-50">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full animate-wave-slow">
                <path
                  d="M0.00,49.98 C180.00,120.00 300.20,-20.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                  fill="rgba(255, 255, 255, 0.6)"
                />
              </svg>
            </div>

            {/* Animated Micro-Bubbles when Pump is ACTIVE */}
            {pumpStatus && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/60 rounded-full animate-ping left-1/4 bottom-3" />
                <div className="absolute w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse left-1/2 bottom-8" />
                <div className="absolute w-2 h-2 bg-white/50 rounded-full animate-bounce right-1/4 bottom-5" />
              </div>
            )}
          </div>

          {/* Bottom Depth Shadow */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
        </div>

        {/* Readout Column & Stats */}
        <div className="flex flex-col justify-center space-y-3">
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Level</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {Math.round(waterTankLevel)}%
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span>Volume:</span>
              <span className="font-semibold text-slate-700">{Math.round((waterTankLevel / 100) * 2000)} mL</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Max Capacity:</span>
              <span className="font-semibold text-slate-700">2,000 mL</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Sensor:</span>
              <span className="font-semibold text-slate-700">Ultrasonic</span>
            </div>
          </div>

          {/* Low Water Warning Banner */}
          {isLow && (
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Refill needed soon</span>
            </div>
          )}

          {isCritical && (
            <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>Pump Locked: Empty</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Refill Trigger */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Reservoir State: <strong className="text-slate-700">{tankState.status}</strong></span>
        <button
          onClick={refillTank}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 text-xs font-semibold border border-sky-200/80 transition-all active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refill Tank</span>
        </button>
      </div>
    </div>
  );
};
