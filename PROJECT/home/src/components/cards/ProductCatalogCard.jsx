import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Plus, ArrowRight, Radio, Sparkles } from 'lucide-react';
import { useIoT } from '../../context/IoTContext';
import { IoTComingSoonBadge } from '../common/IoTComingSoonBadge';

export const ProductCatalogCard = ({ product }) => {
  const navigate = useNavigate();
  const { isDeviceOwned, addDeviceToHome, removeDeviceFromHome } = useIoT();
  const owned = isDeviceOwned(product.id);

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Product Image Header */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category & Badge Chips */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
            {product.category}
          </span>
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Owned Pill */}
        {owned && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Active in Home
            </span>
          </div>
        )}

        {/* Title over image bottom */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl drop-shadow-sm">{product.emoji}</span>
            <h3 className="text-lg font-extrabold leading-tight tracking-tight drop-shadow-sm text-white">
              {product.name}
            </h3>
          </div>
          <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Key Features List */}
          <div className="space-y-1.5 mb-4">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Hardware Tag & Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              IoT Integration — Coming Soon
            </span>
            <span className="text-[10px] text-slate-400 font-mono">ESP32 Ready</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {owned ? (
              <button
                onClick={() => navigate(`/device/${product.id}`)}
                className="col-span-1 py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-1"
              >
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => addDeviceToHome(product.id)}
                className="col-span-1 py-2 px-3 rounded-xl text-xs font-semibold bg-kin-600 hover:bg-kin-700 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Home</span>
              </button>
            )}

            <button
              onClick={() => navigate(`/device/${product.id}`)}
              className="col-span-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center justify-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
