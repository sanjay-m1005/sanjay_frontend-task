import React from 'react';
import { X } from 'lucide-react';
import { useIoT } from '../../context/IoTContext';

export const NotificationToast = () => {
  const { toasts, removeToast } = useIoT();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl text-xs font-semibold text-slate-800 animate-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-base">{toast.icon || '✨'}</span>
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
