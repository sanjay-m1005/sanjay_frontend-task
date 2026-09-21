import React from 'react';
import { useIoT } from '../../context/IoTContext';
import { Power, Cpu, ShieldCheck, AlertCircle, RefreshCw, Zap, Sliders } from 'lucide-react';

export const PumpController = () => {
  const { 
    pumpStatus, 
    setPumpStatus, 
    pumpMode, 
    setPumpMode, 
    waterTankLevel,
    soilMoisture,
    thresholds,
    setThresholds
  } = useIoT();

  const isTankEmpty = waterTankLevel <= thresholds.criticalTankLevel;

  const handleTurnOn = () => {
    if (pumpMode === 'auto') {
      // Switch to manual mode for direct user control
      setPumpMode('manual');
    }
    setPumpStatus(true);
  };

  const handleTurnOff = () => {
    setPumpStatus(false);
  };

  return (
    <div className="card-elevated rounded-3xl p-6 bg-white border border-slate-200/80 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Actuator Control</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Submersible Pump</h3>
          </div>

          {/* Prominent Live Pump Status */}
          <div className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 border font-bold text-xs transition-all duration-300 ${
            pumpStatus
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm glow-emerald-pulse'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${pumpStatus ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
            <span>PUMP: {pumpStatus ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Operating Mode Segmented Switch */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/60 mb-5">
          <button
            onClick={() => setPumpMode('auto')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              pumpMode === 'auto'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Automatic Mode</span>
          </button>

          <button
            onClick={() => setPumpMode('manual')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              pumpMode === 'manual'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manual Mode</span>
          </button>
        </div>

        {/* Mode Behavior Explanation Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 mb-5 text-xs text-slate-600 space-y-1.5">
          {pumpMode === 'auto' ? (
            <>
              <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Smart Threshold Control Active</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Turns pump <strong className="text-slate-700">ON</strong> when moisture drops below{' '}
                <span className="font-semibold text-amber-600">{thresholds.minMoisture}%</span>, and{' '}
                <strong className="text-slate-700">OFF</strong> once hydrated to{' '}
                <span className="font-semibold text-emerald-600">{thresholds.targetMoisture}%</span>.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                <span>Current Moisture: <strong>{Math.round(soilMoisture)}%</strong></span>
                <span>•</span>
                <span>Target: <strong>{thresholds.targetMoisture}%</strong></span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 font-semibold text-blue-800">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Manual Override Active</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                You have direct control over the 5V relay. Dry-run safety cutoff remains active to protect pump hardware.
              </p>
            </>
          )}
        </div>

        {/* Manual Action Buttons: [ ON ] [ OFF ] */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Direct Control Buttons
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* ON Button */}
            <button
              onClick={handleTurnOn}
              disabled={pumpStatus || isTankEmpty}
              className={`py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                pumpStatus
                  ? 'bg-emerald-600 text-white shadow-glow-emerald cursor-default'
                  : isTankEmpty
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-soft'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>[ ON ]</span>
            </button>

            {/* OFF Button */}
            <button
              onClick={handleTurnOff}
              disabled={!pumpStatus}
              className={`py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                !pumpStatus
                  ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-default'
                  : 'bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-soft'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>[ OFF ]</span>
            </button>
          </div>

          {/* Tank Empty Safety Override Notice */}
          {isTankEmpty && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Pump disabled: Water tank is empty to prevent burnout.</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info: Hardware Relay Pinout */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>ESP32 GPIO 26: <strong>{pumpStatus ? 'HIGH (Active)' : 'LOW (Idle)'}</strong></span>
        </div>
        <span className="text-slate-400">Opto-Isolated Relay</span>
      </div>
    </div>
  );
};
