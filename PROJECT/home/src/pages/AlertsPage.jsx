import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useIoT } from '../context/IoTContext';

export const AlertsPage = () => {
  const { alerts, ownedDeviceIds } = useIoT();

  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const warningAlerts = alerts.filter(a => a.severity === 'warning');
  const infoAlerts = alerts.filter(a => a.severity === 'info' || a.severity === 'success');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
            Real-time Sensor Monitoring
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Alerts & Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Automated warnings triggered when environmental sensors cross safe biological or security thresholds.
        </p>
      </div>

      {/* Alerts Feed */}
      {alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`rounded-3xl p-5 border transition-all shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCritical
                    ? 'bg-rose-50/70 border-rose-200'
                    : isWarning
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isCritical
                      ? 'bg-rose-600 text-white'
                      : isWarning
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {isCritical ? (
                      <AlertCircle className="w-5 h-5 animate-pulse" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-slate-900">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                        isCritical
                          ? 'bg-rose-200 text-rose-900'
                          : isWarning
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-xl">
                      {alert.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                      <span>Status: {alert.timeStr}</span>
                      <span>•</span>
                      <Link to={`/device/${alert.deviceId}`} className="text-kin-700 font-semibold hover:underline">
                        Open Device Controls →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 1-Click Action Button */}
                {alert.action && alert.actionLabel && (
                  <button
                    onClick={alert.action}
                    className={`self-start sm:self-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5 active:scale-95 ${
                      isCritical
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : isWarning
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-soft">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">All Systems Thriving</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            All connected plants, pets, nursery sensors, and home deadbolts are operating within optimal safe thresholds.
          </p>
        </div>
      )}
    </div>
  );
};
