import React, { useState } from 'react';
import { HARDWARE_SPECS, SAMPLE_ARDUINO_CODE } from '../services/hardwareConfig';
import { 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Wifi, 
  Share2, 
  Code2, 
  ArrowLeft 
} from 'lucide-react';

export const ProjectDetailsView = ({ setActiveTab }) => {
  const [copied, setCopied] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState('pinout'); // 'pinout' | 'firmware' | 'api'

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SAMPLE_ARDUINO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Project Hardware & Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete circuit pinout, sensor calibration parameters, and ready-to-flash ESP32 C++ firmware.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all"
          >
            View Live Telemetry
          </button>
        </div>
      </div>

      {/* MCU Specs Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Controller</span>
          <div className="text-base font-extrabold text-slate-900 mt-1">{HARDWARE_SPECS.microcontroller.model}</div>
          <span className="text-xs text-slate-500 block mt-0.5">{HARDWARE_SPECS.microcontroller.clockSpeed}</span>
        </div>

        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Wireless Stack</span>
          <div className="text-base font-extrabold text-slate-900 mt-1">Wi-Fi + BLE 4.2</div>
          <span className="text-xs text-slate-500 block mt-0.5">802.11 b/g/n (2.4 GHz)</span>
        </div>

        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Flash Storage</span>
          <div className="text-base font-extrabold text-slate-900 mt-1">{HARDWARE_SPECS.microcontroller.flash}</div>
          <span className="text-xs text-slate-500 block mt-0.5">OTA Firmware Capable</span>
        </div>

        <div className="card-elevated rounded-3xl p-5 bg-white border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Power Delivery</span>
          <div className="text-base font-extrabold text-slate-900 mt-1">{HARDWARE_SPECS.microcontroller.operatingVoltage}</div>
          <span className="text-xs text-emerald-600 font-semibold block mt-0.5">Dual 3.3V / 5V Rails</span>
        </div>
      </div>

      {/* Sub-Tabs: Pinout & Wiring vs Firmware Code vs REST/MQTT API */}
      <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 max-w-fit">
        <button
          onClick={() => setActiveTabSub('pinout')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabSub === 'pinout'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Circuit Pinout & Wiring</span>
        </button>

        <button
          onClick={() => setActiveTabSub('firmware')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabSub === 'firmware'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>ESP32 C++ Firmware</span>
        </button>

        <button
          onClick={() => setActiveTabSub('api')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabSub === 'api'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span>API & Real Sensor Bridge</span>
        </button>
      </div>

      {/* TAB 1: Pinout & Wiring Table */}
      {activeTabSub === 'pinout' && (
        <div className="space-y-6">
          <div className="card-elevated rounded-3xl bg-white border border-slate-200/80 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">ESP32 GPIO Pin Assignment Matrix</h3>
                <p className="text-xs text-slate-500 mt-0.5">Verified schematic wiring for sensors and actuator drivers.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Schematic v1.2
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">ESP32 Pin</th>
                    <th className="py-3 px-6">Signal Type</th>
                    <th className="py-3 px-6">Connected Component</th>
                    <th className="py-3 px-6">Lead / Color</th>
                    <th className="py-3 px-6">Functionality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {HARDWARE_SPECS.pinout.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-emerald-700 bg-emerald-50/30">
                        {item.pin}
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                        {item.type}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {item.component}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                          {item.wireColor}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 max-w-xs leading-relaxed">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Capacitive Calibration Card */}
          <div className="card-elevated rounded-3xl p-6 bg-white border border-slate-200/80">
            <h4 className="text-base font-bold text-slate-900 mb-2">
              Capacitive Soil Moisture Sensor v1.2 Calibration Formula
            </h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Unlike resistive sensors, capacitive probes measure dielectric permittivity and never corrode. Calibrate by reading raw 12-bit ADC counts in dry air vs immersed in water:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">Dry Air Count (0% Moisture)</span>
                <span className="text-xl font-bold text-amber-950 mt-1 block">ADC ≈ {HARDWARE_SPECS.calibration.airValue}</span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-sky-800 block">Pure Water Count (100% Moisture)</span>
                <span className="text-xl font-bold text-sky-950 mt-1 block">ADC ≈ {HARDWARE_SPECS.calibration.waterValue}</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Mapping Function</span>
                <span className="text-xs font-bold text-emerald-950 mt-2 block break-all">{HARDWARE_SPECS.calibration.formula}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Firmware Code Viewer */}
      {activeTabSub === 'firmware' && (
        <div className="card-elevated rounded-3xl bg-slate-900 text-slate-100 overflow-hidden border border-slate-800 shadow-soft-lg">
          <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-slate-200">ESP32_Smart_Plant_Firmware.ino</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Sketch'}</span>
            </button>
          </div>

          <div className="p-6 overflow-x-auto max-h-[600px] text-xs font-mono leading-relaxed bg-slate-950/60">
            <pre className="text-emerald-300">
              <code>{SAMPLE_ARDUINO_CODE}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: REST & MQTT Bridge */}
      {activeTabSub === 'api' && (
        <div className="card-elevated rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Real Hardware Connection Bridge</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              This dashboard is structured to switch effortlessly between client simulation and real ESP32 telemetries.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">1. HTTP REST Endpoint</span>
              <p className="text-slate-600 font-mono text-[11px] mb-2">{HARDWARE_SPECS.apiEndpoints.restEndpoint}</p>
              <p className="text-slate-500 leading-relaxed">
                ESP32 serves a JSON payload with <code className="text-emerald-700 font-mono font-semibold">soilMoisture</code>, <code className="text-emerald-700 font-mono font-semibold">temperature</code>, <code className="text-emerald-700 font-mono font-semibold">humidity</code>, and <code className="text-emerald-700 font-mono font-semibold">pumpStatus</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">2. Pump Relay Actuator Command</span>
              <p className="text-slate-600 font-mono text-[11px] mb-2">{HARDWARE_SPECS.apiEndpoints.postPumpControl}</p>
              <p className="text-slate-500 leading-relaxed">
                Accepts POST payload or query parameters to directly energize or de-energize the 5V relay module with optocoupled galvanic isolation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">3. MQTT Telemetry Channels (Optional Cloud Broker)</span>
              <p className="text-slate-600 font-mono text-[11px]">Topic: <code className="text-emerald-700 font-semibold">{HARDWARE_SPECS.apiEndpoints.mqttTopicTelemetry}</code></p>
              <p className="text-slate-500 leading-relaxed mt-1">
                For HiveMQ, EMQX, or local Mosquitto broker integration.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
