import React, { useState } from 'react';
import { useIoT } from '../../context/IoTContext';
import { 
  Sliders, 
  ChevronUp, 
  ChevronDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Droplet, 
  AlertTriangle,
  Flame
} from 'lucide-react';

export const QuickSimBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    soilMoisture, 
    setSoilMoisture, 
    waterTankLevel, 
    setWaterTankLevel,
    isLiveSimulating,
    setIsLiveSimulating,
    naturalEvaporation,
    setNaturalEvaporation,
    quickWaterPlant,
    refillTank,
    addAlert
  } = useIoT();

  return (
    <aside aria-label="Interactive IoT Hardware Simulator" className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-[calc(100%-2rem)]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-lg border border-slate-200/90 overflow-hidden transition-all duration-300">
        
        {/* Toggle Header Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Interactive IoT Hardware Simulator</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live Testing
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {isOpen ? 'Minimize' : 'Simulate Sensor Values'}
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-300" /> : <ChevronUp className="w-4 h-4 text-slate-300" />}
          </div>
        </button>

        {/* Simulator Controls Body */}
        {isOpen && (
          <div className="p-4 space-y-4 text-xs">
            {/* Soil Moisture Manual Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Soil Moisture Input:
                </span>
                <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {Math.round(soilMoisture)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0% (Parched Dry)</span>
                <span>50% (Normal)</span>
                <span>100% (Hydrated)</span>
              </div>
            </div>

            {/* Water Tank Manual Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Water Tank Level:
                </span>
                <span className="font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  {Math.round(waterTankLevel)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={waterTankLevel}
                onChange={(e) => setWaterTankLevel(Number(e.target.value))}
                className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0% (Empty)</span>
                <span>25% (Low Alert)</span>
                <span>100% (Full)</span>
              </div>
            </div>

            {/* Simulation Toggles */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => setNaturalEvaporation(!naturalEvaporation)}
                className={`p-2 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  naturalEvaporation
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Evaporation: {naturalEvaporation ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setIsLiveSimulating(!isLiveSimulating)}
                className={`p-2 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isLiveSimulating
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                {isLiveSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Engine: {isLiveSimulating ? 'Running' : 'Paused'}</span>
              </button>
            </div>

            {/* Quick Action Triggers */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => quickWaterPlant(25)}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <Droplet className="w-3.5 h-3.5 text-sky-500" />
                <span>+25% Water</span>
              </button>
              
              <button
                onClick={refillTank}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
                <span>Refill 100%</span>
              </button>

              <button
                onClick={() => addAlert('critical', 'Simulated Sensor Alert', 'Capacitive ADC value out of range (ADC=4095). Check wiring.')}
                className="py-1.5 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all border border-rose-200"
                title="Trigger simulated alert"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Alert</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
