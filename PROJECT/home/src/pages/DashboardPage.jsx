import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Zap, 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  Droplet, 
  Lock, 
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { ActiveDeviceCard } from '../components/cards/ActiveDeviceCard';
import { PRESET_PROFILES } from '../data/productsData';

export const DashboardPage = () => {
  const { 
    ownedProducts, 
    ownedDeviceIds, 
    deviceStates, 
    alerts, 
    triggerDeviceAction, 
    applyPreset,
    showToast 
  } = useIoT();

  // Quick batch actions
  const handleLockAll = () => {
    if (ownedDeviceIds.includes('door')) {
      triggerDeviceAction('door', 'TOGGLE_LOCK', { state: true });
    } else {
      showToast('No door lock currently registered in your Smart Home', 'info', '🚪');
    }
  };

  const handleLightsOff = () => {
    if (ownedDeviceIds.includes('light')) {
      triggerDeviceAction('light', 'TOGGLE_POWER');
    } else {
      showToast('No smart light registered in your Smart Home', 'info', '💡');
    }
  };

  // Compute energy consumption
  const totalWatts = (
    (deviceStates.light?.isOn ? deviceStates.light.energyWatts : 0) +
    (deviceStates.fan?.isOn ? deviceStates.fan.energyWatts : 0) +
    (deviceStates.plant?.isWatering ? 12 : 0.8) +
    (deviceStates.dog?.isFeeding ? 18 : 1.2) +
    (deviceStates.cat?.fountainActive ? 4.5 : 1.0) +
    (deviceStates.baby ? 3.2 : 0)
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header and Telemetry Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-kin-800">
              Active Command Center
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Connected Devices Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Showing only products currently assigned to your household account.
          </p>
        </div>

        {/* Quick Batch Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {ownedDeviceIds.includes('door') && (
            <button
              onClick={handleLockAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Doors</span>
            </button>
          )}

          {ownedDeviceIds.includes('light') && (
            <button
              onClick={handleLightsOff}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <span>💡</span>
              <span>Toggle Lights</span>
            </button>
          )}

          <Link
            to="/products"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-kin-600 hover:bg-kin-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Devices</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Active Devices
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {ownedProducts.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">of 9 available</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> All nodes synchronized
          </span>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Telemetry Feed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              Live
            </span>
            <span className="text-xs text-slate-500 font-mono">100% Signal</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Virtual MQTT / WebSockets
          </span>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Power Draw
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {totalWatts}
            </span>
            <span className="text-xs text-slate-500 font-medium">Watts (active)</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Low-energy eco monitoring
          </span>
        </div>

        <Link 
          to="/alerts"
          className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:border-kin-300 transition-colors block"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Household Alerts
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-extrabold ${alerts.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {alerts.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Active alerts</span>
          </div>
          <span className="text-[11px] text-kin-700 font-semibold block mt-1">
            View status feed →
          </span>
        </Link>
      </div>

      {/* Dynamic Device Cards Section */}
      {ownedProducts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Your Active Smart Devices ({ownedProducts.length})
            </h2>
            <span>Click any card to access detailed telemetry & manual overrides</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedProducts.map((product) => (
              <ActiveDeviceCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty Slate */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
          <span className="text-4xl block mb-3">📦</span>
          <h3 className="text-xl font-bold text-slate-900">
            No Active Devices Connected
          </h3>
          <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
            Your dynamic dashboard only displays devices that you have added to your Smart Home. Browse the products catalog to add your first device!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-xl bg-kin-600 hover:bg-kin-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Browse Products Catalog</span>
            </Link>
            <button
              onClick={() => applyPreset('starter')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Quick Test: Curated Starter (3)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
