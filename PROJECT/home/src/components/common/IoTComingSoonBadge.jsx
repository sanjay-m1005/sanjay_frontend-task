import React, { useState } from 'react';
import { Cpu, Wifi, Radio, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export const IoTComingSoonBadge = ({ specs, compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-sm">
        <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>IoT Integration — Coming Soon</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-sky-50/90 border border-emerald-200/80 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                IoT Integration — Coming Soon
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-200/80 text-emerald-900">
                PROTOTYPE PHASE
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
              Currently running interactive simulated telemetry and virtual relays. This frontend is pre-architected to seamlessly bind to live hardware via MQTT and WebSockets without UI redesign.
            </p>
          </div>
        </div>

        {specs && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="self-start sm:self-center inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-emerald-300 transition-all shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>{expanded ? 'Hide Hardware Specs' : 'View Target Hardware Specs'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Expanded Hardware Blueprint */}
      {expanded && specs && (
        <div className="mt-4 pt-4 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/80 rounded-xl p-3 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-600" /> Microcontroller MCU
            </span>
            <p className="font-semibold text-slate-800">{specs.mcu}</p>
          </div>

          <div className="bg-white/80 rounded-xl p-3 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Sensors
            </span>
            <ul className="text-slate-700 space-y-0.5">
              {specs.sensors?.map((s, i) => (
                <li key={i} className="truncate">• {s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/80 rounded-xl p-3 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1 flex items-center gap-1">
              <Radio className="w-3 h-3 text-sky-600" /> Actuators / Relays
            </span>
            <ul className="text-slate-700 space-y-0.5">
              {specs.actuators?.map((a, i) => (
                <li key={i} className="truncate">• {a}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/80 rounded-xl p-3 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-teal-600" /> Transport Protocol
            </span>
            <p className="font-semibold text-slate-800">{specs.communication}</p>
            {specs.mqttTopics && (
              <span className="text-[10px] text-slate-500 font-mono block mt-1 truncate">
                MQTT: {Object.values(specs.mqttTopics)[0]}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
