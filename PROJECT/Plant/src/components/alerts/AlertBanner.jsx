import React from 'react';
import { useIoT } from '../../context/IoTContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  X, 
  Droplet, 
  RotateCcw,
  BellRing
} from 'lucide-react';

export const AlertBanner = () => {
  const { 
    alerts, 
    dismissAlert, 
    clearAllAlerts, 
    soilMoisture, 
    waterTankLevel, 
    refillTank, 
    quickWaterPlant 
  } = useIoT();

  // If there are no alerts, show the clean "🟢 No Alert" state
  const hasAlerts = alerts.length > 0;

  return (
    <div className="card-elevated rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
            <BellRing className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">System Diagnostic</span>
            <h4 className="text-base font-bold text-slate-900">Active Alerts & Notifications</h4>
          </div>
        </div>

        {hasAlerts && (
          <button
            onClick={clearAllAlerts}
            className="text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* When everything is normal: 🟢 No Alert */}
      {!hasAlerts && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <span className="text-base">🟢</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-950">No Alert — All Systems Nominal</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Status: Optimal
                </span>
              </div>
              <p className="text-xs text-emerald-800/80 mt-0.5">
                Soil hydration is balanced ({Math.round(soilMoisture)}%), water tank is stable ({Math.round(waterTankLevel)}%), and ESP32 telemetry is heartbeat verified.
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 hidden sm:block" />
        </div>
      )}

      {/* List of active warnings & critical alerts */}
      {hasAlerts && (
        <div className="space-y-2.5">
          {alerts.map((alert) => {
            const isCritical = alert.type === 'critical';
            const isWarning = alert.type === 'warning';
            const isSuccess = alert.type === 'success';

            return (
              <div
                key={alert.id}
                className={`p-3.5 sm:p-4 rounded-2xl border flex items-start justify-between gap-3 transition-all ${
                  isCritical
                    ? 'bg-rose-50/90 border-rose-200/90 text-rose-950'
                    : isWarning
                    ? 'bg-amber-50/90 border-amber-200/90 text-amber-950'
                    : isSuccess
                    ? 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950'
                    : 'bg-blue-50/90 border-blue-200/90 text-blue-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCritical && <span className="text-base">🔴</span>}
                    {isWarning && <span className="text-base">🟡</span>}
                    {isSuccess && <span className="text-base">🟢</span>}
                    {!isCritical && !isWarning && !isSuccess && <span className="text-base">ℹ️</span>}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold">{alert.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.5 rounded bg-white/70 border border-slate-200/60">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {alert.message}
                    </p>

                    {/* Contextual Action Buttons */}
                    {alert.title.includes('Water Tank Empty') && (
                      <div className="pt-1.5 flex items-center gap-2">
                        <button
                          onClick={refillTank}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Refill Tank Now</span>
                        </button>
                      </div>
                    )}

                    {alert.title.includes('Soil Moisture Low') && (
                      <div className="pt-1.5 flex items-center gap-2">
                        <button
                          onClick={() => quickWaterPlant(20)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <Droplet className="w-3 h-3" />
                          <span>Quick Irrigate (+20%)</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-black/5 transition-all"
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
