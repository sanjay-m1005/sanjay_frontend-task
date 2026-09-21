import React, { useState } from 'react';
import { Clock, Trash2, Filter, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useIoT } from '../context/IoTContext';

export const ActivityPage = () => {
  const { activities, clearActivities } = useIoT();
  const [filterType, setFilterType] = useState('All');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'All') return true;
    if (filterType === 'Pets') return act.deviceId === 'dog' || act.deviceId === 'cat' || act.deviceId === 'bird' || act.deviceId === 'fish';
    if (filterType === 'Garden') return act.deviceId === 'plant';
    if (filterType === 'Home') return act.deviceId === 'light' || act.deviceId === 'fan' || act.deviceId === 'door';
    if (filterType === 'Family') return act.deviceId === 'baby';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-kin-800">
              Audit & Telemetry Logs
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Activity History
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Chronological audit log of automated feeding schedules, pump irrigations, and security toggles.
          </p>
        </div>

        {activities.length > 0 && (
          <button
            onClick={clearActivities}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['All', 'Pets', 'Garden', 'Home', 'Family'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === f
                ? 'bg-kin-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      {filteredActivities.length > 0 ? (
        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
          {filteredActivities.map((act) => (
            <div key={act.id} className="relative group">
              {/* Dot on line */}
              <div className="absolute -left-[33px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-kin-500 flex items-center justify-center text-xs shadow-xs">
                {act.icon}
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {act.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {act.timeStr}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {act.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    Device: {act.deviceId}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 text-sm">No activity records</h3>
          <p className="text-xs text-slate-400 mt-1">
            Actions you perform on any connected devices will appear here in chronological order.
          </p>
        </div>
      )}
    </div>
  );
};
