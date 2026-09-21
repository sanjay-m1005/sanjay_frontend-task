import React from 'react';
import { 
  Sprout, 
  Layers, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Wifi, 
  Droplets, 
  Zap, 
  ArrowRight, 
  Server, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { IOT_PROJECTS } from '../services/projectsData';

export const HomeOverview = ({ setActiveTab }) => {
  const { 
    soilMoisture, 
    waterTankLevel, 
    plantState, 
    pumpStatus, 
    pumpMode,
    temperature,
    humidity
  } = useIoT();

  const activeProject = IOT_PROJECTS.find(p => p.id === 'smart-plant') || IOT_PROJECTS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Platform Hero Welcome Banner */}
      <div className="card-elevated rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-white via-white to-emerald-50/40 border border-slate-200/90 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>FloraPulse Central IoT Engine v2.4 LTS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Centralized IoT Project <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800">
              Monitoring & Control Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to your master IoT dashboard. Manage your active smart irrigation hardware, monitor botanical health diagnostics, and scale seamlessly as you deploy new microcontroller nodes.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-soft hover:shadow-glow-emerald transition-all active:scale-95"
            >
              <Sprout className="w-4 h-4" />
              <span>Launch Smart Plant Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Browse All Projects ({IOT_PROJECTS.length})</span>
            </button>
          </div>
        </div>

        {/* Hero Decorative Visual Illustration */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 opacity-90 pointer-events-none">
          <div className="relative w-full aspect-square bg-gradient-to-br from-emerald-100/50 to-teal-100/30 rounded-full blur-2xl absolute inset-0" />
          <div className="relative p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-soft-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Live Active Node</span>
              <span className="text-emerald-600 font-mono font-bold">NODE-01</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Hydration</span>
              <span className="text-base font-bold text-slate-900">{Math.round(soilMoisture)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
                style={{ width: `${soilMoisture}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <span>Pump: <strong className={pumpStatus ? 'text-emerald-600' : 'text-slate-600'}>{pumpStatus ? 'ON' : 'OFF'}</strong></span>
              <span>Tank: <strong className="text-slate-700">{Math.round(waterTankLevel)}%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Platform KPI Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Devices</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1 <span className="text-sm font-semibold text-slate-400">/ 5 nodes</span></div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>ESP32 Node 01 Online</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Fleet Projects</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{IOT_PROJECTS.length}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            1 Active • 1 Proto • 3 Roadmap
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Network Link</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wifi className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">99.9%</div>
          <div className="text-xs text-indigo-600 font-semibold mt-1">
            Latency 14ms (WiFi / MQTT)
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">System Safety</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dry-Lock</div>
          <div className="text-xs text-teal-600 font-semibold mt-1">
            Hardware Cutoff Armed
          </div>
        </div>

      </div>

      {/* Two-Column Section: Active Project Spotlight + Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Spotlight Active Project */}
        <div className="lg:col-span-7 card-elevated rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Current Focus</span>
              <h3 className="text-xl font-bold text-slate-900">Project #1: Smart Plant Monitoring</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              Live & Streaming
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activeProject.description}
          </p>

          {/* Real-time telemetry snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Soil Moisture</span>
              <span className="text-xl font-extrabold text-slate-900">{Math.round(soilMoisture)}%</span>
              <span className="text-[10px] text-emerald-600 block">{plantState.title}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reservoir Tank</span>
              <span className="text-xl font-extrabold text-slate-900">{Math.round(waterTankLevel)}%</span>
              <span className="text-[10px] text-sky-600 block">{waterTankLevel <= 20 ? 'Needs Refill' : 'Adequate'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pump Relay</span>
              <span className="text-xl font-extrabold text-slate-900">{pumpStatus ? 'ON' : 'OFF'}</span>
              <span className="text-[10px] text-slate-500 block">Mode: {pumpMode.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Air Climate</span>
              <span className="text-xl font-extrabold text-slate-900">{temperature.toFixed(1)}°C</span>
              <span className="text-[10px] text-slate-500 block">{Math.round(humidity)}% RH</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Last heartbeat sync: <strong className="text-slate-700">Just now</strong>
            </span>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              <span>Open Full Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Activity & Telemetry Timeline */}
        <div className="lg:col-span-5 card-elevated rounded-3xl p-6 bg-white border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Event Telemetry Log</h4>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Live Buffer</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="font-bold text-emerald-600">AUTO IRRIGATION</span>
                <span>08:30 AM</span>
              </div>
              <p className="text-slate-700 font-medium">Applied 480mL hydration pulse. Soil moisture increased from 31% to 68%.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="font-bold text-sky-600">RESERVOIR SENSOR</span>
                <span>06:15 AM</span>
              </div>
              <p className="text-slate-700 font-medium">Ultrasonic calibration verified tank depth at 72% reserve capacity.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="font-bold text-indigo-600">ESP32 HEARTBEAT</span>
                <span>00:01 AM</span>
              </div>
              <p className="text-slate-700 font-medium">Daily health check passed. Wi-Fi RSSI -58 dBm, zero packet drops.</p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setActiveTab('details')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              View Full Hardware & Firmware Logs →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
