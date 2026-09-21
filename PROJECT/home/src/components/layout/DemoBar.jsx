import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useIoT } from '../../context/IoTContext';
import { PRESET_PROFILES } from '../../data/productsData';

export const DemoBar = () => {
  const { ownedDeviceIds, applyPreset } = useIoT();

  return (
    <aside aria-label="Prototype Demo Presets" className="bg-gradient-to-r from-kin-900 via-slate-900 to-kin-950 text-white text-xs py-2 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-kin-500/30 text-kin-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-kin-400" /> Interactive Prototype
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Test persona presets ({ownedDeviceIds.length} devices connected):
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {PRESET_PROFILES.map((preset) => {
            const isMatch = 
              preset.devices.length === ownedDeviceIds.length &&
              preset.devices.every(d => ownedDeviceIds.includes(d));

            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
                  isMatch
                    ? 'bg-kin-500 text-white font-bold shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
                title={preset.description}
              >
                {preset.name.split('(')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
