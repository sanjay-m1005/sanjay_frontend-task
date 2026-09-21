import React from 'react';
import { useIoT } from '../context/IoTContext';
import { PlantVisualizer } from '../components/plant/PlantVisualizer';
import { WaterTank } from '../components/tank/WaterTank';
import { PumpController } from '../components/controls/PumpController';
import { AlertBanner } from '../components/alerts/AlertBanner';
import { MetricCard } from '../components/metrics/MetricCard';
import { CircularGauge } from '../components/metrics/CircularGauge';
import { ClimateCard } from '../components/metrics/ClimateCard';
import { 
  Sprout, 
  Droplet, 
  Thermometer, 
  CloudRain, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const PlantDashboard = ({ onNavigateToDetails }) => {
  const { 
    soilMoisture, 
    soilStatus, 
    plantState, 
    pumpStatus, 
    pumpMode, 
    waterTankLevel, 
    temperature, 
    humidity,
    lastWateredTime,
    waterDispensedToday,
    quickWaterPlant
  } = useIoT();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Breadcrumb & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Projects</span>
            <span>/</span>
            <span className="text-emerald-600">Smart Plant Monitoring</span>
            <span>/</span>
            <span>Live Node 01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Plant Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry, procedural foliage health visualization, and closed-loop irrigation automation.
          </p>
        </div>

        {/* Quick watering trigger & hardware details link */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => quickWaterPlant(15)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft hover:shadow-glow-emerald transition-all active:scale-95"
          >
            <Droplet className="w-4 h-4" />
            <span>Water Plant (+15%)</span>
          </button>

          <button
            onClick={onNavigateToDetails}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/90 shadow-soft-sm transition-all"
          >
            <span>Hardware Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Dedicated Alert Area (🟢 No Alert, 🟡 Soil Low, 🔴 Tank Empty) */}
      <AlertBanner />

      {/* Main Feature Grid: Animated Plant Centerpiece + Interactive Actuator & Tank Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Centerpiece (Animated Plant) */}
        <div className="lg:col-span-7 space-y-6">
          <PlantVisualizer />

          {/* Quick Metrics Sub-row below Plant */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Soil Moisture Mini-Radial Card */}
            <div className="card-elevated rounded-3xl p-4 bg-white border border-slate-200/80 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Soil Moisture</span>
                <div className="text-2xl font-black text-slate-900">{Math.round(soilMoisture)}%</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                  soilMoisture <= 30 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {soilStatus}
                </span>
              </div>
              <div className="scale-75 origin-right">
                <CircularGauge 
                  value={soilMoisture} 
                  size={90} 
                  strokeWidth={9} 
                  color={soilMoisture <= 30 ? '#f59e0b' : '#10b981'}
                  label=""
                />
              </div>
            </div>

            {/* Last Watered Time */}
            <div className="card-elevated rounded-3xl p-4 bg-white border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Last Irrigated</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="my-2">
                <div className="text-lg font-extrabold text-slate-900">{lastWateredTime}</div>
                <span className="text-[11px] text-slate-400">Automated cycle</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Optimal Schedule</span>
              </div>
            </div>

            {/* Daily Dispensed Volume */}
            <div className="card-elevated rounded-3xl p-4 bg-white border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Water Dispensed</span>
                <Droplet className="w-4 h-4 text-sky-500" />
              </div>
              <div className="my-2">
                <div className="text-lg font-extrabold text-slate-900">{waterDispensedToday} <span className="text-xs font-semibold text-slate-500">mL</span></div>
                <span className="text-[11px] text-slate-400">Across 3 micro-bursts</span>
              </div>
              <div className="text-[11px] text-sky-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conserving 42%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Actuator Pump Controller + Water Reservoir Tank */}
        <div className="lg:col-span-5 space-y-6">
          {/* Water Pump Control Panel */}
          <PumpController />

          {/* Water Tank Level Indicator */}
          <WaterTank />

          {/* Temperature & Humidity Microclimate */}
          <ClimateCard />
        </div>

      </div>

    </div>
  );
};
