import React from 'react';
import { 
  Sprout, 
  Droplets, 
  Layers, 
  Zap, 
  Fish, 
  ArrowRight, 
  Cpu, 
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

const ICON_MAP = {
  Sprout: Sprout,
  Droplets: Droplets,
  Layers: Layers,
  Zap: Zap,
  Fish: Fish,
};

export const ProjectCard = ({ project, onSelect, isActiveProject }) => {
  const IconComponent = ICON_MAP[project.icon] || Cpu;

  const statusColorMap = {
    emerald: {
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500 animate-pulse',
      iconBg: 'bg-emerald-100 text-emerald-700',
      borderHover: 'hover:border-emerald-300'
    },
    blue: {
      pill: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
      iconBg: 'bg-blue-100 text-blue-700',
      borderHover: 'hover:border-blue-300'
    },
    purple: {
      pill: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-500',
      iconBg: 'bg-purple-100 text-purple-700',
      borderHover: 'hover:border-purple-300'
    },
    amber: {
      pill: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      iconBg: 'bg-amber-100 text-amber-700',
      borderHover: 'hover:border-amber-300'
    },
    slate: {
      pill: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      iconBg: 'bg-slate-100 text-slate-600',
      borderHover: 'hover:border-slate-300'
    }
  };

  const style = statusColorMap[project.statusColor] || statusColorMap.slate;

  return (
    <div className={`card-elevated rounded-3xl p-6 bg-white border border-slate-200/80 flex flex-col justify-between transition-all duration-300 group ${style.borderHover} ${
      isActiveProject ? 'ring-2 ring-emerald-500/30' : ''
    }`}>
      <div>
        {/* Top Header: Icon, Version & Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${style.iconBg} flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">{project.version}</span>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${style.pill}`}>
            <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
            <span>{project.status}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1.5">
          {project.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {project.tagline}
        </p>

        {/* Hardware Tags */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Hardware Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.hardware.slice(0, 3).map((hw, idx) => (
              <span 
                key={idx} 
                className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/60"
              >
                {hw}
              </span>
            ))}
            {project.hardware.length > 3 && (
              <span className="text-[11px] font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                +{project.hardware.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Telemetry Summary Mini-Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 mb-5">
          {project.metricsSummary.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">{m.label}</span>
              <span className="text-xs font-bold text-slate-700">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">Protocol: <strong>{project.protocol.split(' ')[0]}</strong></span>
        
        {project.status === 'Active' ? (
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-glow-emerald active:scale-95"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95"
          >
            <span>View Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
