import React, { useState } from 'react';
import { 
  Compass, 
  Lightbulb, 
  Vote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ThumbsUp
} from 'lucide-react';

export const FutureProjectsView = ({ setActiveTab }) => {
  const [votes, setVotes] = useState({
    smart_home: 142,
    solar_mppt: 98,
    aquaponics: 76,
    greenhouse: 114
  });
  const [votedMap, setVotedMap] = useState({});

  const handleVote = (key) => {
    if (votedMap[key]) return;
    setVotes(prev => ({ ...prev, [key]: prev[key] + 1 }));
    setVotedMap(prev => ({ ...prev, [key]: true }));
  };

  const roadmapItems = [
    {
      quarter: 'Q4 2024 / Q1 2025',
      title: 'Smart Home Environmental Mesh',
      key: 'smart_home',
      description: 'Distributed BLE and Zigbee mesh across rooms tracking VOC air quality, ambient lux, PIR occupancy, and automated window blinds.',
      hardware: ['ESP32-C3 Mesh', 'SGP30 VOC Sensor', 'BME280', 'PIR Motion'],
      status: 'In Specification',
      tagColor: 'blue'
    },
    {
      quarter: 'Q2 2025',
      title: 'Precision Micro-Climate Greenhouse',
      key: 'greenhouse',
      description: 'Solar-assisted greenhouse dome with automated motorized louvers, misting nozzles, and dual-spectrum photoperiod LED grow lighting.',
      hardware: ['ESP32 Dual-Core', 'Motorized Actuators', 'Rain Gauge', 'PAR Light Sensor'],
      status: 'Component Sourcing',
      tagColor: 'emerald'
    },
    {
      quarter: 'Q3 2025',
      title: 'Solar Harvester & MPPT Energy Hub',
      key: 'solar_mppt',
      description: 'Smart sub-panel power flow tracker calculating real-time solar ROI, battery degradation curves, and automated smart plug switching.',
      hardware: ['ESP32-S3', 'PZEM-004T', 'Split-Core CT Clamps', 'Victron VE.Direct'],
      status: 'Schematic Phase',
      tagColor: 'amber'
    },
    {
      quarter: 'Q4 2025',
      title: 'EcoSync Aquaponic Bio-Regulator',
      key: 'aquaponics',
      description: 'Closed-loop nitrification balancing between tilapia fish tanks and floating deep-water culture salad beds with automated feeder.',
      hardware: ['Raspberry Pi Pico W', 'Dissolved Oxygen Probe', 'Stepper Feeder', 'pH Sensor'],
      status: 'Concept Study',
      tagColor: 'purple'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Platform Vision</span>
            <span>/</span>
            <span className="text-emerald-600">Expansion Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Future IoT Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Architectural roadmap for upcoming hardware deployments. Designed to plug seamlessly into this platform.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('projects')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-soft-sm transition-all"
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>View Active Projects</span>
        </button>
      </div>

      {/* Platform Scalability Architecture Banner */}
      <div className="card-elevated rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-soft-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Redesign Modular Scalability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Built from Day 1 to scale across dozens of IoT nodes.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By separating telemetry state, actuator controllers, and UI presentation components, adding a new project requires simply registering its pinouts and telemetry schema in <code className="text-emerald-300 font-mono">services/projectsData.js</code>.
          </p>
        </div>
      </div>

      {/* Roadmap Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmapItems.map((item, index) => {
          const isVoted = votedMap[item.key];
          return (
            <div 
              key={index}
              className="card-elevated rounded-3xl p-6 bg-white border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/60">
                    {item.quarter}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Target Hardware Stack */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Planned Components
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.hardware.map((hw, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60"
                      >
                        {hw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Voting / Priority Interest */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Community Priority: <strong className="text-slate-800">{votes[item.key]} votes</strong>
                </span>

                <button
                  onClick={() => handleVote(item.key)}
                  disabled={isVoted}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isVoted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'text-emerald-600 fill-emerald-600' : ''}`} />
                  <span>{isVoted ? 'Upvoted' : 'Upvote'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
