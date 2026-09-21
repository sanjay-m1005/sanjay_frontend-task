import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useIoT } from '../../context/IoTContext';
import { PlantAnimation } from '../animations/PlantAnimation';
import { LightAnimation } from '../animations/LightAnimation';
import { FanAnimation } from '../animations/FanAnimation';
import { DoorAnimation } from '../animations/DoorAnimation';
import { DogAnimation } from '../animations/DogAnimation';
import { CatAnimation } from '../animations/CatAnimation';
import { BirdAnimation } from '../animations/BirdAnimation';
import { FishAnimation } from '../animations/FishAnimation';
import { BabyAnimation } from '../animations/BabyAnimation';

export const ActiveDeviceCard = ({ product }) => {
  const navigate = useNavigate();
  const { deviceStates, triggerDeviceAction } = useIoT();
  const state = deviceStates[product.id] || product.defaultState;

  // Render product-specific mini animation
  const renderAnimation = () => {
    switch (product.id) {
      case 'plant':
        return <PlantAnimation moisture={state.moisture} isWatering={state.isWatering} size="sm" />;
      case 'light':
        return <LightAnimation isOn={state.isOn} brightness={state.brightness} colorHex={state.colorHex} size="sm" />;
      case 'fan':
        return <FanAnimation isOn={state.isOn} speed={state.speed} rpm={state.rpm} size="sm" />;
      case 'door':
        return <DoorAnimation isLocked={state.isLocked} batteryPercent={state.batteryPercent} size="sm" />;
      case 'dog':
        return <DogAnimation isFeeding={state.isFeeding} isDispensingWater={state.isDispensingWater} foodLevel={state.foodLevel} size="sm" />;
      case 'cat':
        return <CatAnimation isFeeding={state.isFeeding} fountainActive={state.fountainActive} foodLevel={state.foodLevel} size="sm" />;
      case 'bird':
        return <BirdAnimation isFeeding={state.isFeeding} seedLevel={state.seedLevel} size="sm" />;
      case 'fish':
        return <FishAnimation isFeeding={state.isFeeding} aerationActive={state.aerationActive} waterTemp={state.waterTemp} size="sm" />;
      case 'baby':
        return <BabyAnimation soundDecibels={state.soundDecibels} cryDetected={state.cryDetected} nightVision={state.nightVision} lullabyPlaying={state.lullabyPlaying} size="sm" />;
      default:
        return null;
    }
  };

  // Render product-specific quick telemetry metrics
  const renderMetrics = () => {
    switch (product.id) {
      case 'plant': {
        const isDry = state.moisture < 35;
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">💧 Soil Moisture</span>
              <span className={`font-bold text-sm ${isDry ? 'text-rose-600 font-extrabold animate-pulse' : 'text-slate-800'}`}>
                {state.moisture}%
              </span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌡️ Temperature</span>
              <span className="font-bold text-sm text-slate-800">{state.temp}°C</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
              <span className="text-[11px] font-medium text-emerald-900 flex items-center gap-1.5">
                {isDry ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-rose-700 font-bold">🔴 Needs Water</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">🟢 Healthy & Thriving</span>
                  </>
                )}
              </span>
              <span className="text-[10px] text-slate-500">Last: {state.lastWatered}</span>
            </div>
          </div>
        );
      }

      case 'dog':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🍖 Food Hopper</span>
              <span className="font-bold text-sm text-amber-800">{state.foodLevel}%</span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">💧 Fresh Water</span>
              <span className="font-bold text-sm text-sky-800">{state.waterLevel}%</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-amber-50/80 border border-amber-100">
              <span className="text-[11px] font-medium text-amber-900">🐶 Status: {state.health}</span>
              <span className="text-[10px] text-slate-500">Fed: {state.lastFed}</span>
            </div>
          </div>
        );

      case 'cat':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🐟 Food Hopper</span>
              <span className="font-bold text-sm text-amber-800">{state.foodLevel}%</span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌊 Water Fountain</span>
              <span className="font-bold text-sm text-sky-700">{state.fountainActive ? 'Running' : 'Paused'}</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
              <span className="text-[11px] font-medium text-emerald-900">🐱 Status: {state.health}</span>
              <span className="text-[10px] text-slate-500">Fed: {state.lastFed}</span>
            </div>
          </div>
        );

      case 'bird':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌾 Seed Hopper</span>
              <span className="font-bold text-sm text-amber-700">{state.seedLevel}%</span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">💧 Bath Level</span>
              <span className="font-bold text-sm text-sky-700">{state.waterBathLevel}%</span>
            </div>
            <div className="col-span-2 px-2.5 py-1.5 rounded-xl bg-sky-50/80 border border-sky-100 text-[11px] text-sky-900 font-medium truncate">
              🐦 Activity: {state.activity}
            </div>
          </div>
        );

      case 'fish':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌡️ Water Temp</span>
              <span className="font-bold text-sm text-cyan-800">{state.waterTemp}°C</span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">💧 Tank Level</span>
              <span className="font-bold text-sm text-cyan-800">{state.waterLevel}%</span>
            </div>
            <div className="col-span-2 px-2.5 py-1.5 rounded-xl bg-cyan-50/80 border border-cyan-100 text-[11px] text-cyan-900 font-medium">
              🫧 Aeration: {state.aerationActive ? 'Active' : 'Standby'} • Filter: {state.filterCondition}
            </div>
          </div>
        );

      case 'light':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">💡 Power State</span>
              <span className={`font-bold text-sm ${state.isOn ? 'text-amber-600' : 'text-slate-500'}`}>
                {state.isOn ? 'Switched ON' : 'Switched OFF'}
              </span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🔆 Brightness</span>
              <span className="font-bold text-sm text-slate-800">{state.isOn ? `${state.brightness}%` : '0%'}</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-amber-50/80 border border-amber-100 text-[11px]">
              <span className="text-amber-900 font-medium">Warmth: {state.colorTemp}K</span>
              <span className="text-slate-500 font-mono text-[10px]">Energy: {state.energyWatts}W</span>
            </div>
          </div>
        );

      case 'fan':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌀 Fan Speed</span>
              <span className="font-bold text-sm text-teal-800">
                {state.isOn && state.speed > 0 ? `Speed ${state.speed}` : 'OFF'}
              </span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">⚡ Motor RPM</span>
              <span className="font-bold text-sm text-slate-800">{state.isOn ? state.rpm : 0} RPM</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-teal-50/80 border border-teal-100 text-[11px]">
              <span className="text-teal-900 font-medium">Oscillation: {state.oscillation ? 'Enabled' : 'Fixed'}</span>
              <span className="text-slate-500 font-mono text-[10px]">Load: {state.energyWatts}W</span>
            </div>
          </div>
        );

      case 'door':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🔒 Deadbolt State</span>
              <span className={`font-bold text-sm ${state.isLocked ? 'text-emerald-700' : 'text-amber-600'}`}>
                {state.isLocked ? 'LOCKED' : 'UNLOCKED'}
              </span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🔋 Battery Level</span>
              <span className="font-bold text-sm text-slate-800">{state.batteryPercent}%</span>
            </div>
            <div className="col-span-2 px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-700 truncate">
              {state.lastActivity}
            </div>
          </div>
        );

      case 'baby':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🔊 Sound Level</span>
              <span className={`font-bold text-sm ${state.cryDetected ? 'text-rose-600 animate-pulse font-extrabold' : 'text-slate-800'}`}>
                {state.soundDecibels} dB
              </span>
            </div>
            <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">🌡️ Nursery Temp</span>
              <span className="font-bold text-sm text-slate-800">{state.roomTemp}°C</span>
            </div>
            <div className="col-span-2 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-sky-50/80 border border-sky-100 text-[11px]">
              <span className={`font-semibold ${state.cryDetected ? 'text-rose-600' : 'text-sky-900'}`}>
                {state.cryDetected ? '⚠️ Cry Alert Active' : '👶 Peaceful Sleep'}
              </span>
              <span className="text-[10px] text-slate-500">IR: {state.nightVision ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Quick Action Button
  const renderQuickAction = () => {
    switch (product.id) {
      case 'plant':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('plant', 'WATER_PUMP');
            }}
            disabled={state.isWatering}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              state.isWatering
                ? 'bg-sky-100 text-sky-700 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
            }`}
          >
            <span>💧</span>
            <span>{state.isWatering ? 'Watering...' : 'Water Plant Now'}</span>
          </button>
        );

      case 'dog':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('dog', 'FEED');
            }}
            disabled={state.isFeeding}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 active:scale-95 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>🍖</span>
            <span>{state.isFeeding ? 'Dispensing...' : 'Feed Now (250g)'}</span>
          </button>
        );

      case 'cat':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('cat', 'FEED');
            }}
            disabled={state.isFeeding}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 active:scale-95 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>🐱</span>
            <span>{state.isFeeding ? 'Dispensing...' : 'Feed Cat'}</span>
          </button>
        );

      case 'bird':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('bird', 'FEED');
            }}
            disabled={state.isFeeding}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 active:scale-95 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>🌾</span>
            <span>{state.isFeeding ? 'Dispensing...' : 'Replenish Seeds'}</span>
          </button>
        );

      case 'fish':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('fish', 'FEED');
            }}
            disabled={state.isFeeding}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>🐟</span>
            <span>{state.isFeeding ? 'Dispensing...' : 'Feed Flakes'}</span>
          </button>
        );

      case 'light':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('light', 'TOGGLE_POWER');
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              state.isOn
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <span>💡</span>
            <span>{state.isOn ? 'Turn Light OFF' : 'Turn Light ON'}</span>
          </button>
        );

      case 'fan':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('fan', 'TOGGLE_POWER');
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              state.isOn
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <span>🌀</span>
            <span>{state.isOn ? 'Stop Fan' : 'Turn Fan ON'}</span>
          </button>
        );

      case 'door':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('door', 'TOGGLE_LOCK');
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              state.isLocked
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <span>{state.isLocked ? '🔓' : '🔒'}</span>
            <span>{state.isLocked ? 'Unlock Door' : 'Lock Door'}</span>
          </button>
        );

      case 'baby':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDeviceAction('baby', 'TOGGLE_LULLABY');
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              state.lullabyPlaying
                ? 'bg-sky-600 hover:bg-sky-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <span>🎵</span>
            <span>{state.lullabyPlaying ? 'Pause Lullaby' : 'Play Soothing Lullaby'}</span>
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => navigate(`/device/${product.id}`)}
      className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-emerald-100/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Top subtle highlight bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-kin-400 via-emerald-500 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-kin-50 border border-kin-100 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
              {product.emoji}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-kin-700 transition-colors text-base flex items-center gap-1.5">
                {product.name}
              </h3>
              <span className="text-[11px] font-medium text-slate-400">
                {product.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        {/* Live Animated Canvas */}
        <div className="my-2 bg-slate-50/50 rounded-2xl p-2 border border-slate-100/60 overflow-hidden flex items-center justify-center">
          {renderAnimation()}
        </div>

        {/* Telemetry preview info */}
        <div className="mt-3">
          {renderMetrics()}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
        {renderQuickAction()}

        <div className="flex items-center justify-between text-xs font-semibold text-kin-700 group-hover:text-kin-800 transition-colors pt-1">
          <span>Open Full Controls</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
