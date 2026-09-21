import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Check, 
  Trash2, 
  Radio, 
  Cpu, 
  Sliders, 
  Activity, 
  Zap, 
  Clock, 
  Volume2, 
  Sun, 
  Wind, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { PRODUCTS } from '../data/productsData';
import { IoTComingSoonBadge } from '../components/common/IoTComingSoonBadge';
import { PlantAnimation } from '../components/animations/PlantAnimation';
import { LightAnimation } from '../components/animations/LightAnimation';
import { FanAnimation } from '../components/animations/FanAnimation';
import { DoorAnimation } from '../components/animations/DoorAnimation';
import { DogAnimation } from '../components/animations/DogAnimation';
import { CatAnimation } from '../components/animations/CatAnimation';
import { BirdAnimation } from '../components/animations/BirdAnimation';
import { FishAnimation } from '../components/animations/FishAnimation';
import { BabyAnimation } from '../components/animations/BabyAnimation';

export const DeviceDetailPage = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const { 
    deviceStates, 
    isDeviceOwned, 
    addDeviceToHome, 
    removeDeviceFromHome, 
    updateDeviceState, 
    triggerDeviceAction 
  } = useIoT();

  const product = PRODUCTS.find((p) => p.id === deviceId);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <span className="text-4xl block mb-3">🔍</span>
        <h2 className="text-2xl font-bold text-slate-800">Device Not Found</h2>
        <p className="text-slate-500 text-sm mt-2 mb-6">The product you are looking for does not exist in our catalog.</p>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-kin-600 text-white font-bold text-xs">
          Return to Products Catalog
        </Link>
      </div>
    );
  }

  const owned = isDeviceOwned(product.id);
  const state = deviceStates[product.id] || product.defaultState;

  // Render hero animation component
  const renderInteractiveVisual = () => {
    switch (product.id) {
      case 'plant':
        return <PlantAnimation moisture={state.moisture} isWatering={state.isWatering} size="lg" />;
      case 'light':
        return (
          <LightAnimation 
            isOn={state.isOn} 
            brightness={state.brightness} 
            colorTemp={state.colorTemp} 
            colorHex={state.colorHex} 
            size="lg" 
          />
        );
      case 'fan':
        return (
          <FanAnimation 
            isOn={state.isOn} 
            speed={state.speed} 
            oscillation={state.oscillation} 
            rpm={state.rpm} 
            size="lg" 
          />
        );
      case 'door':
        return <DoorAnimation isLocked={state.isLocked} batteryPercent={state.batteryPercent} size="lg" />;
      case 'dog':
        return (
          <DogAnimation 
            isFeeding={state.isFeeding} 
            isDispensingWater={state.isDispensingWater} 
            foodLevel={state.foodLevel} 
            waterLevel={state.waterLevel} 
            size="lg" 
          />
        );
      case 'cat':
        return (
          <CatAnimation 
            isFeeding={state.isFeeding} 
            fountainActive={state.fountainActive} 
            foodLevel={state.foodLevel} 
            waterLevel={state.waterLevel} 
            size="lg" 
          />
        );
      case 'bird':
        return (
          <BirdAnimation 
            isFeeding={state.isFeeding} 
            seedLevel={state.seedLevel} 
            waterBathLevel={state.waterBathLevel} 
            size="lg" 
          />
        );
      case 'fish':
        return (
          <FishAnimation 
            isFeeding={state.isFeeding} 
            aerationActive={state.aerationActive} 
            waterTemp={state.waterTemp} 
            waterLevel={state.waterLevel} 
            size="lg" 
          />
        );
      case 'baby':
        return (
          <BabyAnimation 
            soundDecibels={state.soundDecibels} 
            cryDetected={state.cryDetected} 
            nightVision={state.nightVision} 
            lullabyPlaying={state.lullabyPlaying} 
            size="lg" 
          />
        );
      default:
        return null;
    }
  };

  // Render product-specific dedicated hardware & control panel
  const renderControlPanel = () => {
    switch (product.id) {
      /* 1. PLANT MONITOR CONTROLS */
      case 'plant':
        return (
          <div className="space-y-6">
            {/* Water Control Buttons */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>💧</span> Micro-Hydration Water Control
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Actuates the optocoupled peristaltic water pump to irrigate soil.
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${state.isWatering ? 'bg-sky-100 text-sky-800 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                  Pump: {state.isWatering ? 'RUNNING' : 'IDLE'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => triggerDeviceAction('plant', 'WATER_PUMP', { state: true })}
                  disabled={state.isWatering}
                  className={`py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    state.isWatering
                      ? 'bg-sky-100 text-sky-700 cursor-not-allowed'
                      : 'bg-kin-600 hover:bg-kin-700 text-white active:scale-95'
                  }`}
                >
                  <span>💧</span>
                  <span>WATER ON</span>
                </button>

                <button
                  onClick={() => triggerDeviceAction('plant', 'WATER_PUMP', { state: false })}
                  disabled={!state.isWatering}
                  className={`py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    !state.isWatering
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-rose-500 hover:bg-rose-600 text-white active:scale-95'
                  }`}
                >
                  <span>⏹️</span>
                  <span>WATER OFF</span>
                </button>
              </div>
            </div>

            {/* Simulated Moisture Adjuster (To test Sad/Happy plant states) */}
            <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-kin-600" />
                  Simulate Soil Moisture Sensor:
                </span>
                <span className="font-mono font-bold text-kin-800">{state.moisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={state.moisture}
                onChange={(e) => triggerDeviceAction('plant', 'SET_MOISTURE', { moisture: parseInt(e.target.value) })}
                className="w-full accent-kin-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Slide below 35% to test how the plant illustration turns sad/drooping and triggers an alert!
              </p>
            </div>
          </div>
        );

      /* 2. DOG CARE CONTROLS */
      case 'dog':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🍖</span> Automated Meal & Water Dispenser
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Precision auger motor and food-grade submersible pump actuation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => triggerDeviceAction('dog', 'FEED')}
                disabled={state.isFeeding}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-amber-500 hover:bg-amber-600 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>🍖</span>
                <span>{state.isFeeding ? 'DISPENSING KIBBLE...' : 'FEED NOW (250g)'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('dog', 'WATER')}
                disabled={state.isDispensingWater}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-sky-500 hover:bg-sky-600 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>💧</span>
                <span>{state.isDispensingWater ? 'FILLING BOWL...' : 'GIVE FRESH WATER'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100 text-xs text-amber-900 flex items-center justify-between">
              <span>⏰ Feeding Schedule: Daily 8:00 AM & 6:00 PM</span>
              <span className="font-semibold text-[11px]">Portion: 250g</span>
            </div>
          </div>
        );

      /* 3. CAT CARE CONTROLS */
      case 'cat':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🐱</span> Whisker-Friendly Micro-Feeder & Fountain
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Small-portion auger dispensing and silent carbon-filter water fountain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => triggerDeviceAction('cat', 'FEED')}
                disabled={state.isFeeding}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-orange-500 hover:bg-orange-600 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>🍖</span>
                <span>{state.isFeeding ? 'DISPENSING MEAL...' : 'FEED CAT (60g)'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('cat', 'TOGGLE_FOUNTAIN')}
                className={`py-4 px-4 rounded-2xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 ${
                  state.fountainActive
                    ? 'bg-sky-500 hover:bg-sky-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                <span>💧</span>
                <span>{state.fountainActive ? 'PAUSE FOUNTAIN' : 'START WATER FOUNTAIN'}</span>
              </button>
            </div>
          </div>
        );

      /* 4. BIRD CARE CONTROLS */
      case 'bird':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🐦</span> Aviary Seed & Bird Bath Controls
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Anti-scatter seed gate and ultrasonic perch activity sensor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => triggerDeviceAction('bird', 'FEED')}
                disabled={state.isFeeding}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-amber-600 hover:bg-amber-700 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>🌾</span>
                <span>{state.isFeeding ? 'OPENING SEED GATE...' : 'FEED BIRDS (SEEDS)'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('bird', 'CHIRP')}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-sky-500 hover:bg-sky-600 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>🎵</span>
                <span>TEST ACOUSTIC SENSOR</span>
              </button>
            </div>
          </div>
        );

      /* 5. FISH CARE CONTROLS */
      case 'fish':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🐟</span> Aquarium Habitat & Flake Dispenser
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rotary drum feeder, bubbler aeration, and water thermal control.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => triggerDeviceAction('fish', 'FEED')}
                disabled={state.isFeeding}
                className="py-4 px-4 rounded-2xl font-bold text-xs bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>🍖</span>
                <span>{state.isFeeding ? 'ROTATING DRUM...' : 'FEED FISH FLAKES'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('fish', 'TOGGLE_AERATION')}
                className={`py-4 px-4 rounded-2xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 ${
                  state.aerationActive
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                <span>🫧</span>
                <span>{state.aerationActive ? 'PAUSE BUBBLER' : 'START AERATION BUBBLER'}</span>
              </button>
            </div>
          </div>
        );

      /* 6. SMART LIGHT CONTROLS */
      case 'light':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>💡</span> Illumination & Solid State Relay
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instant optocoupled switching and circadian color warmth dimming.
                </p>
              </div>

              {/* ON/OFF Big Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerDeviceAction('light', 'TOGGLE_POWER')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                    state.isOn
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  {state.isOn ? '[ ON ]' : '[ OFF ]'}
                </button>
              </div>
            </div>

            {/* Dimmer Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>🔆 Dimming Level</span>
                <span className="font-mono text-amber-600">{state.brightness}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={state.brightness}
                disabled={!state.isOn}
                onChange={(e) => triggerDeviceAction('light', 'SET_BRIGHTNESS', { brightness: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Warmth Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Color Temperature Presets</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  disabled={!state.isOn}
                  onClick={() => triggerDeviceAction('light', 'SET_WARMTH', { temp: 2700, hex: '#ffedd5' })}
                  className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 font-semibold text-amber-900 text-center"
                >
                  Cozy Warm (2700K)
                </button>
                <button
                  disabled={!state.isOn}
                  onClick={() => triggerDeviceAction('light', 'SET_WARMTH', { temp: 3500, hex: '#fef3c7' })}
                  className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 font-semibold text-amber-900 text-center"
                >
                  Neutral Sun (3500K)
                </button>
                <button
                  disabled={!state.isOn}
                  onClick={() => triggerDeviceAction('light', 'SET_WARMTH', { temp: 5000, hex: '#e0f2fe' })}
                  className="p-2.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 font-semibold text-sky-900 text-center"
                >
                  Daylight Focus (5000K)
                </button>
              </div>
            </div>
          </div>
        );

      /* 7. SMART FAN CONTROLS */
      case 'fan':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>🌀</span> Variable Speed Airflow Controller
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Brushless DC motor with Triac step speeds and oscillation servo.
                </p>
              </div>

              {/* Master Power */}
              <button
                onClick={() => triggerDeviceAction('fan', 'TOGGLE_POWER')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                  state.isOn
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                {state.isOn ? '[ ON ]' : '[ OFF ]'}
              </button>
            </div>

            {/* Speed Selector Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Speed Selection</span>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => triggerDeviceAction('fan', 'SET_SPEED', { speed: spd })}
                    className={`py-3 rounded-xl text-xs font-bold transition-all ${
                      (state.isOn && state.speed === spd) || (!state.isOn && spd === 0)
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {spd === 0 ? 'OFF' : `Speed ${spd}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Oscillation Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-teal-50 border border-teal-100">
              <span className="text-xs font-bold text-teal-900">Wide 90° Oscillation Sweep</span>
              <button
                onClick={() => triggerDeviceAction('fan', 'TOGGLE_OSCILLATION')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  state.oscillation ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {state.oscillation ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        );

      /* 8. SMART DOOR LOCK CONTROLS */
      case 'door':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🚪</span> Motorized Deadbolt Lock Control
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                High-torque mechanical deadbolt with encrypted state transmission.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => triggerDeviceAction('door', 'TOGGLE_LOCK', { state: true })}
                className={`py-4 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                  state.isLocked
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>🔒</span>
                <span>[ LOCK ]</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('door', 'TOGGLE_LOCK', { state: false })}
                className={`py-4 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                  !state.isLocked
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>🔓</span>
                <span>[ UNLOCK ]</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
              <span>Auto-Lock Security Timer: 30s</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active Protection
              </span>
            </div>
          </div>
        );

      /* 9. BABY MONITOR CONTROLS */
      case 'baby':
        return (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>👶</span> Nursery Camera & Audio Synthesizer
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulated 1080p nursery feed with infrared night mode, decibel meter & lullabies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => triggerDeviceAction('baby', 'TOGGLE_NIGHT_VISION')}
                className={`py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  state.nightVision ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>🌙</span>
                <span>Night Vision {state.nightVision ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('baby', 'TOGGLE_LULLABY')}
                className={`py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  state.lullabyPlaying ? 'bg-sky-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span>🎵</span>
                <span>{state.lullabyPlaying ? 'Pause Lullaby' : 'Play Lullaby'}</span>
              </button>

              <button
                onClick={() => triggerDeviceAction('baby', 'SIMULATE_CRY')}
                className="py-3 px-3 rounded-2xl font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>🔔</span>
                <span>Test Cry Alert</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render product-specific telemetry specs grid
  const renderTelemetryGrid = () => {
    switch (product.id) {
      case 'plant':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Plant Health</span>
              <span className={`font-bold text-base ${state.moisture >= 35 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {state.health}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Soil Moisture</span>
              <span className="font-bold text-base text-sky-700">{state.moisture}%</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Temperature</span>
              <span className="font-bold text-base text-slate-800">{state.temp}°C</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Humidity</span>
              <span className="font-bold text-base text-slate-800">{state.humidity}%</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Water Requirement</span>
              <span className="font-bold text-base text-amber-700">{state.waterRequirement}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Last Watered</span>
              <span className="font-bold text-xs text-slate-700 mt-1 block">{state.lastWatered}</span>
            </div>
          </div>
        );

      case 'dog':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Dog Health</span>
              <span className="font-bold text-base text-emerald-700">{state.health}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Food Hopper</span>
              <span className="font-bold text-base text-amber-800">{state.foodLevel}%</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Water Reservoir</span>
              <span className="font-bold text-base text-sky-700">{state.waterLevel}%</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Feeding Schedule</span>
              <span className="font-bold text-xs text-slate-800 mt-1 block">8:00 AM & 6:00 PM</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Last Feeding</span>
              <span className="font-bold text-xs text-slate-800 mt-1 block">{state.lastFed}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Device Status</span>
              <span className="font-bold text-xs text-emerald-700 mt-1 block">🟢 {state.deviceStatus}</span>
            </div>
          </div>
        );

      case 'light':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Light Status</span>
              <span className="font-bold text-base text-amber-600">{state.isOn ? 'Active (ON)' : 'Standby (OFF)'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Brightness</span>
              <span className="font-bold text-base text-slate-800">{state.isOn ? `${state.brightness}%` : '0%'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Color Temp</span>
              <span className="font-bold text-base text-slate-800">{state.colorTemp}K</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Power Draw</span>
              <span className="font-bold text-base text-slate-800">{state.energyWatts} Watts</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Relay State</span>
              <span className="font-bold text-base text-emerald-700">{state.relayState}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Device Signal</span>
              <span className="font-bold text-xs text-emerald-700 mt-1 block">🟢 Wi-Fi 98%</span>
            </div>
          </div>
        );

      case 'fan':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Fan Status</span>
              <span className="font-bold text-base text-teal-700">{state.isOn ? 'Spinning (ON)' : 'Stopped (OFF)'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Speed</span>
              <span className="font-bold text-base text-slate-800">{state.isOn ? `Speed ${state.speed}` : 'OFF'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Rotational Speed</span>
              <span className="font-bold text-base text-slate-800">{state.isOn ? state.rpm : 0} RPM</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Oscillation</span>
              <span className="font-bold text-base text-teal-700">{state.oscillation ? 'Active' : 'Fixed'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Energy Usage</span>
              <span className="font-bold text-base text-slate-800">{state.energyWatts}W</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Device Status</span>
              <span className="font-bold text-xs text-emerald-700 mt-1 block">🟢 Connected</span>
            </div>
          </div>
        );

      case 'door':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Lock Status</span>
              <span className={`font-bold text-base ${state.isLocked ? 'text-emerald-700' : 'text-amber-600'}`}>
                {state.isLocked ? 'LOCKED' : 'UNLOCKED'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Battery Level</span>
              <span className="font-bold text-base text-slate-800">{state.batteryPercent}%</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Auto-Lock Timer</span>
              <span className="font-bold text-base text-slate-800">{state.autoLockTimer}s</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 col-span-2 sm:col-span-3">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Last Activity</span>
              <span className="font-bold text-xs text-slate-800 mt-1 block">{state.lastActivity}</span>
            </div>
          </div>
        );

      case 'baby':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Sound Decibels</span>
              <span className={`font-bold text-base ${state.cryDetected ? 'text-rose-600' : 'text-slate-800'}`}>
                {state.soundDecibels} dB
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Nursery Temp</span>
              <span className="font-bold text-base text-slate-800">{state.roomTemp}°C</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Cry Status</span>
              <span className={`font-bold text-base ${state.cryDetected ? 'text-rose-600 animate-pulse' : 'text-emerald-700'}`}>
                {state.cryDetected ? 'Alert: Cry' : 'Quiet'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Night Vision</span>
              <span className="font-bold text-base text-slate-800">{state.nightVision ? 'IR On' : 'IR Off'}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 col-span-2">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Lullaby</span>
              <span className="font-bold text-xs text-indigo-700 mt-1 block truncate">
                {state.lullabyPlaying ? 'Playing: Twinkle Star' : 'Standby: Twinkle Star'}
              </span>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(state).map(([k, v]) => {
              if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string') {
                return (
                  <div key={k} className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">{k}</span>
                    <span className="font-bold text-xs text-slate-800 mt-1 block truncate">{String(v)}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="self-start inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          {owned ? (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4" /> In Your Smart Home
              </span>
              <button
                onClick={() => removeDeviceFromHome(product.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                title="Disconnect this product from dashboard"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addDeviceToHome(product.id)}
              className="px-5 py-2.5 rounded-xl bg-kin-600 hover:bg-kin-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-kin-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add to My Smart Home</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Visual & Control Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Animated Visual & Canvas */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl">{product.emoji}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              🟢 Node Online
            </span>
          </div>

          {/* Interactive SVG Animation */}
          <div className="w-full py-4 flex items-center justify-center">
            {renderInteractiveVisual()}
          </div>

          <div className="w-full pt-4 border-t border-slate-100 text-center">
            <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{product.tagline}</p>
          </div>
        </div>

        {/* Right 7 Cols: Hardware Controls & Live Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls */}
          {renderControlPanel()}

          {/* Live Telemetry Data Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-kin-600" />
                Live Sensor Telemetry
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Sampling: 1000ms</span>
            </div>

            {renderTelemetryGrid()}
          </div>
        </div>
      </div>

      {/* IoT Hardware Integration Disclosure Box */}
      <IoTComingSoonBadge specs={product.iotSpecs} />

      {/* Features & Technical Documentation */}
      <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900">About {product.name}</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {product.fullDescription}
        </p>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Hardware & Sensor Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-kin-500 shrink-0 mt-1.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
