import React from 'react';

export const MetricCard = ({
  title,
  value,
  unit = '',
  subtitle,
  icon: Icon,
  badgeText,
  badgeColor = 'emerald',
  colorClass = 'text-slate-900',
  trend,
  footer
}) => {
  const badgeColorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <div className="card-elevated rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="w-8 h-8 rounded-xl bg-slate-100/90 text-slate-700 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          </div>

          {badgeText && (
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColorMap[badgeColor] || badgeColorMap.emerald}`}>
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 my-1">
          <span className={`text-3xl sm:text-4xl font-black tracking-tight ${colorClass}`}>
            {value}
          </span>
          {unit && <span className="text-base font-semibold text-slate-400">{unit}</span>}
        </div>

        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {footer && (
        <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};
