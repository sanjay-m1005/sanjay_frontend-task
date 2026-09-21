import React from 'react';
import { 
  Settings, 
  Sparkles, 
  RefreshCw, 
  Radio, 
  Sliders, 
  ShieldCheck, 
  Trash2, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { PRESET_PROFILES } from '../data/productsData';

export const SettingsPage = () => {
  const { 
    ownedDeviceIds, 
    applyPreset, 
    telemetrySimActive, 
    setTelemetrySimActive, 
    showToast 
  } = useIoT();

  const handleReset = () => {
    if (window.confirm('Reset all Smart Home data and restore initial starter settings?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            System Preferences
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Ecosystem Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Configure prototype testing presets, simulated sensor jitter, and manage local storage state.
        </p>
      </div>

      {/* Preset Profiles Picker */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Dynamic Household Presets
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch between customer personas in one click to test how the Home and Dashboard react to different combinations of owned products.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_PROFILES.map((preset) => {
            const isMatch =
              preset.devices.length === ownedDeviceIds.length &&
              preset.devices.every(d => ownedDeviceIds.includes(d));

            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isMatch
                    ? 'bg-kin-50/80 border-kin-400 ring-2 ring-kin-400/30 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{preset.name}</span>
                    {isMatch && <CheckCircle2 className="w-4 h-4 text-kin-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-3 block">
                  {preset.devices.length} Devices active
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prototype Telemetry Simulation Toggle */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-600" />
          Sensor Fluctuation Engine
        </h3>
        <div className="flex items-center justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-slate-800 block">
              Simulate Live Sensor Jitter
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Periodically fluctuates temperature (±0.2°C), infant decibels, and motor RPM every 6 seconds to simulate realistic streaming sensor telemetry.
            </p>
          </div>

          <button
            onClick={() => {
              setTelemetrySimActive(!telemetrySimActive);
              showToast(telemetrySimActive ? 'Sensor simulation paused' : 'Sensor simulation active', 'info');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              telemetrySimActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {telemetrySimActive ? 'ACTIVE (ON)' : 'PAUSED (OFF)'}
          </button>
        </div>
      </div>

      {/* Storage & Factory Reset */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 text-rose-700">
          <Trash2 className="w-4 h-4" />
          Storage & Factory Reset
        </h3>
        <p className="text-xs text-slate-500">
          Clear all simulated device states, custom moisture levels, and activity records stored in your browser's localStorage.
        </p>

        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Factory Reset to Default</span>
        </button>
      </div>
    </div>
  );
};
