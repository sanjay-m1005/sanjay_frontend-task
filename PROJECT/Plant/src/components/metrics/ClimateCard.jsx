import React from 'react';
import { useIoT } from '../../context/IoTContext';
import { Thermometer, CloudRain, Sun, Wind } from 'lucide-react';

export const ClimateCard = () => {
  const { temperature, humidity } = useIoT();

  // Climate comfort status
  const tempStatus = temperature > 32 ? 'Warm' : temperature < 18 ? 'Cool' : 'Ideal';
  const humidityStatus = humidity > 75 ? 'High' : humidity < 45 ? 'Dry' : 'Balanced';

  return (
    <div className="card-elevated rounded-3xl p-6 bg-white border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">DHT22 Telemetry</span>
          <h3 className="text-xl font-bold text-slate-900">Ambient Microclimate</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200/60">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Indoor Canopy</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Temperature Block */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" /> Temp
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              {tempStatus}
            </span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-black text-amber-950">{temperature.toFixed(1)}</span>
            <span className="text-sm font-bold text-amber-700">°C</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-800/80">
            Target: 22°C – 30°C
          </div>
        </div>

        {/* Humidity Block */}
        <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-sky-800 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-sky-600" /> Humidity
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
              {humidityStatus}
            </span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-black text-sky-950">{Math.round(humidity)}</span>
            <span className="text-sm font-bold text-sky-700">%</span>
          </div>
          <div className="mt-2 text-[11px] text-sky-800/80">
            Target: 50% – 70%
          </div>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-slate-400" />
          <span>Vapor Pressure Deficit: <strong>1.12 kPa</strong> (Optimal)</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">GPIO 4</span>
      </div>
    </div>
  );
};
