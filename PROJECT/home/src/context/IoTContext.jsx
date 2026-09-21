import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { PRODUCTS, INITIAL_OWNED_DEVICES, PRESET_PROFILES } from '../data/productsData';
import { sounds } from '../utils/soundEffects';

const IoTContext = createContext(null);

const STORAGE_KEYS = {
  OWNED_DEVICES: 'kinnest_owned_devices',
  DEVICE_STATES: 'kinnest_device_states',
  ACTIVITIES: 'kinnest_activities',
  SETTINGS: 'kinnest_settings'
};

const DEFAULT_ACTIVITIES = [
  {
    id: 'act-1',
    timestamp: Date.now() - 1000 * 60 * 25,
    timeStr: '09:30 AM',
    icon: '🐶',
    title: 'Dog Was Fed',
    description: 'Dispensed 250g healthy kibble via automated morning schedule.',
    deviceId: 'dog',
    type: 'success'
  },
  {
    id: 'act-2',
    timestamp: Date.now() - 1000 * 60 * 40,
    timeStr: '09:15 AM',
    icon: '💡',
    title: 'Light Turned ON',
    description: 'Living room light activated at 85% brightness (Warm 3200K).',
    deviceId: 'light',
    type: 'info'
  },
  {
    id: 'act-3',
    timestamp: Date.now() - 1000 * 60 * 70,
    timeStr: '08:45 AM',
    icon: '🌱',
    title: 'Plant Hydration Complete',
    description: 'Micro-pump supplied 60ml water. Soil moisture restored to 68%.',
    deviceId: 'plant',
    type: 'success'
  },
  {
    id: 'act-4',
    timestamp: Date.now() - 1000 * 60 * 85,
    timeStr: '08:30 AM',
    icon: '🐦',
    title: 'Bird Aviary Fed',
    description: 'Seed gate opened for 4 seconds. Feeder tray replenished.',
    deviceId: 'bird',
    type: 'info'
  },
  {
    id: 'act-5',
    timestamp: Date.now() - 1000 * 60 * 115,
    timeStr: '08:00 AM',
    icon: '🚪',
    title: 'Door Secured & Locked',
    description: 'Motorized deadbolt engaged automatically after perimeter check.',
    deviceId: 'door',
    type: 'security'
  }
];

export const IoTProvider = ({ children }) => {
  // 1. Owned Devices
  const [ownedDeviceIds, setOwnedDeviceIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OWNED_DEVICES);
      return saved ? JSON.parse(saved) : INITIAL_OWNED_DEVICES;
    } catch {
      return INITIAL_OWNED_DEVICES;
    }
  });

  // 2. Device States (Telemetry + Controls)
  const [deviceStates, setDeviceStates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEVICE_STATES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all products exist in parsed
        const merged = {};
        PRODUCTS.forEach(p => {
          merged[p.id] = { ...p.defaultState, ...(parsed[p.id] || {}) };
        });
        return merged;
      }
    } catch {
      // ignore
    }
    const initial = {};
    PRODUCTS.forEach(p => {
      initial[p.id] = { ...p.defaultState };
    });
    return initial;
  });

  // 3. Activity History
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  });

  // 4. Live Telemetry Sim Switch
  const [telemetrySimActive, setTelemetrySimActive] = useState(true);

  // 5. Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Persist owned devices
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OWNED_DEVICES, JSON.stringify(ownedDeviceIds));
  }, [ownedDeviceIds]);

  // Persist device states
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEVICE_STATES, JSON.stringify(deviceStates));
  }, [deviceStates]);

  // Persist activities
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Toast Helper
  const showToast = useCallback((message, type = 'success', icon = '✨') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Add Activity
  const addActivity = useCallback((entry) => {
    const newEntry = {
      id: 'act-' + Date.now(),
      timestamp: Date.now(),
      timeStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: entry.icon || '⚡',
      title: entry.title,
      description: entry.description,
      deviceId: entry.deviceId || 'system',
      type: entry.type || 'info'
    };
    setActivities(prev => [newEntry, ...prev.slice(0, 49)]); // keep latest 50
  }, []);

  // Check if device is owned
  const isDeviceOwned = useCallback((deviceId) => {
    return ownedDeviceIds.includes(deviceId);
  }, [ownedDeviceIds]);

  // Add device to Smart Home
  const addDeviceToHome = useCallback((deviceId) => {
    const product = PRODUCTS.find(p => p.id === deviceId);
    if (!product) return;

    if (ownedDeviceIds.includes(deviceId)) {
      showToast(`${product.name} is already active in your Smart Home!`, 'info', product.emoji);
      return;
    }

    setOwnedDeviceIds(prev => [...prev, deviceId]);
    sounds.playClick();

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#48ab69', '#38bdf8', '#fbbf24', '#f43f5e']
      });
    } catch {
      // ignore
    }

    showToast(`✅ ${product.name} added to your Smart Home!`, 'success', product.emoji);
    addActivity({
      icon: product.emoji,
      title: `${product.shortName} Added to Home`,
      description: `Device node registered into KinNest dashboard. Simulated telemetry is now streaming.`,
      deviceId,
      type: 'success'
    });
  }, [ownedDeviceIds, showToast, addActivity]);

  // Remove device from Smart Home
  const removeDeviceFromHome = useCallback((deviceId) => {
    const product = PRODUCTS.find(p => p.id === deviceId);
    setOwnedDeviceIds(prev => prev.filter(id => id !== deviceId));
    sounds.playClick();
    showToast(`${product?.name || 'Device'} disconnected from your Smart Home`, 'info', '🔌');
    addActivity({
      icon: '🔌',
      title: `${product?.shortName || 'Device'} Removed`,
      description: `Device disconnected from customer dashboard.`,
      deviceId,
      type: 'warning'
    });
  }, [showToast, addActivity]);

  // Update device partial state
  const updateDeviceState = useCallback((deviceId, partialState) => {
    setDeviceStates(prev => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        ...partialState
      }
    }));
  }, []);

  // Specialized interactive triggers for devices
  const triggerDeviceAction = useCallback(async (deviceId, actionType, payload = {}) => {
    const product = PRODUCTS.find(p => p.id === deviceId);
    if (!product) return;

    switch (deviceId) {
      case 'plant':
        if (actionType === 'WATER_PUMP') {
          const turningOn = payload.state !== undefined ? payload.state : !deviceStates.plant.isWatering;
          sounds.playWaterDrop();
          if (turningOn) {
            updateDeviceState('plant', { isWatering: true, pumpRelay: true });
            addActivity({
              icon: '💧',
              title: 'Plant Watering Started',
              description: 'Peristaltic micro-pump activated. Soil hydration in progress.',
              deviceId: 'plant',
              type: 'info'
            });
            // Simulate moisture rising after 2 seconds
            setTimeout(() => {
              setDeviceStates(prev => ({
                ...prev,
                plant: {
                  ...prev.plant,
                  moisture: Math.min(85, prev.plant.moisture + 22),
                  health: 'Healthy',
                  waterRequirement: 'Low',
                  lastWatered: 'Just now',
                  isWatering: false,
                  pumpRelay: false
                }
              }));
              sounds.playWaterDrop();
              showToast('🌱 Plant watering completed! Soil moisture is now 85%', 'success', '💧');
              addActivity({
                icon: '🌱',
                title: 'Plant Hydration Complete',
                description: 'Soil moisture boosted to optimal 85%. Plant status is Healthy.',
                deviceId: 'plant',
                type: 'success'
              });
            }, 2500);
          } else {
            updateDeviceState('plant', { isWatering: false, pumpRelay: false });
          }
        } else if (actionType === 'SET_MOISTURE') {
          const newMoisture = payload.moisture;
          const isDry = newMoisture < 35;
          updateDeviceState('plant', {
            moisture: newMoisture,
            health: isDry ? 'Needs Water' : 'Healthy',
            waterRequirement: isDry ? 'Urgent' : 'Low'
          });
        }
        break;

      case 'dog':
        if (actionType === 'FEED') {
          sounds.playDispense();
          updateDeviceState('dog', { isFeeding: true });
          showToast('🐶 Dispensing 250g kibble for dog...', 'info', '🍖');
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              dog: {
                ...prev.dog,
                isFeeding: false,
                foodLevel: Math.max(15, prev.dog.foodLevel - 10),
                lastFed: 'Just now',
                health: 'Eating happily!'
              }
            }));
            sounds.playDispense();
            showToast('✅ Dog kibble dispensed successfully!', 'success', '🍖');
            addActivity({
              icon: '🐶',
              title: 'Dog Was Fed',
              description: 'Dispensed 250g healthy kibble. Feeder auger verified portion delivery.',
              deviceId: 'dog',
              type: 'success'
            });
          }, 1800);
        } else if (actionType === 'WATER') {
          sounds.playWaterDrop();
          updateDeviceState('dog', { isDispensingWater: true });
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              dog: {
                ...prev.dog,
                isDispensingWater: false,
                waterLevel: 95
              }
            }));
            showToast('💧 Dog freshwater bowl refilled!', 'success', '💧');
            addActivity({
              icon: '💧',
              title: 'Dog Water Refilled',
              description: 'Fresh circulating water dispenser topped to 95%.',
              deviceId: 'dog',
              type: 'info'
            });
          }, 1500);
        }
        break;

      case 'cat':
        if (actionType === 'FEED') {
          sounds.playDispense();
          updateDeviceState('cat', { isFeeding: true });
          showToast('🐱 Dispensing gentle portion for cat...', 'info', '🐟');
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              cat: {
                ...prev.cat,
                isFeeding: false,
                foodLevel: Math.max(10, prev.cat.foodLevel - 8),
                lastFed: 'Just now',
                health: 'Happy & Purring'
              }
            }));
            showToast('✅ Cat meal dispensed smoothly!', 'success', '🐱');
            addActivity({
              icon: '🐱',
              title: 'Cat Was Fed',
              description: 'Dispensed 60g meal into whisker-safe shallow bowl.',
              deviceId: 'cat',
              type: 'success'
            });
          }, 1600);
        } else if (actionType === 'TOGGLE_FOUNTAIN') {
          sounds.playWaterDrop();
          const newState = !deviceStates.cat.fountainActive;
          updateDeviceState('cat', { fountainActive: newState });
          showToast(newState ? '🌊 Cat water fountain turned ON' : '⏸️ Cat water fountain paused', 'info', '🐱');
          addActivity({
            icon: '🐱',
            title: `Cat Fountain ${newState ? 'Running' : 'Paused'}`,
            description: `Activated carbon triple-filtration pump ${newState ? 'engaged' : 'idle'}.`,
            deviceId: 'cat',
            type: 'info'
          });
        }
        break;

      case 'bird':
        if (actionType === 'FEED') {
          sounds.playDispense();
          updateDeviceState('bird', { isFeeding: true });
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              bird: {
                ...prev.bird,
                isFeeding: false,
                seedLevel: Math.max(20, prev.bird.seedLevel - 5),
                lastFed: 'Just now',
                activity: 'Happily Pecking Seeds'
              }
            }));
            sounds.playBirdChirp();
            showToast('🌾 Aviary seeds replenished for birds!', 'success', '🐦');
            addActivity({
              icon: '🐦',
              title: 'Birds Were Fed',
              description: 'Anti-scatter seed gate released fresh sunflower & millet mix.',
              deviceId: 'bird',
              type: 'success'
            });
          }, 1500);
        } else if (actionType === 'CHIRP') {
          sounds.playBirdChirp();
          showToast('🎵 Perch acoustic sensor verified active chirping!', 'info', '🐦');
        }
        break;

      case 'fish':
        if (actionType === 'FEED') {
          sounds.playDispense();
          updateDeviceState('fish', { isFeeding: true });
          showToast('🐟 Releasing spirulina flakes into aquarium...', 'info', '🐟');
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              fish: {
                ...prev.fish,
                isFeeding: false,
                lastFed: 'Just now'
              }
            }));
            showToast('✅ Fish feeding cycle complete!', 'success', '🐟');
            addActivity({
              icon: '🐟',
              title: 'Fish Were Fed',
              description: 'Moisture-sealed rotary drum released calibrated flake pinch.',
              deviceId: 'fish',
              type: 'success'
            });
          }, 1800);
        } else if (actionType === 'TOGGLE_AERATION') {
          sounds.playWaterDrop();
          const newState = !deviceStates.fish.aerationActive;
          updateDeviceState('fish', { aerationActive: newState });
          showToast(`🫧 Aquarium aeration ${newState ? 'activated' : 'paused'}`, 'info', '🐟');
        }
        break;

      case 'light':
        if (actionType === 'TOGGLE_POWER') {
          sounds.playClick();
          const newState = !deviceStates.light.isOn;
          updateDeviceState('light', {
            isOn: newState,
            relayState: newState ? 'Closed' : 'Open',
            energyWatts: newState ? 9.5 : 0.0
          });
          showToast(`💡 Smart Light switched ${newState ? 'ON' : 'OFF'}`, 'info', '💡');
          addActivity({
            icon: '💡',
            title: `Smart Light ${newState ? 'Turned ON' : 'Turned OFF'}`,
            description: `Zero-crossing relay transitioned to ${newState ? 'Closed' : 'Open'} state.`,
            deviceId: 'light',
            type: 'info'
          });
        } else if (actionType === 'SET_BRIGHTNESS') {
          updateDeviceState('light', { brightness: payload.brightness });
        } else if (actionType === 'SET_WARMTH') {
          updateDeviceState('light', { colorTemp: payload.temp, colorHex: payload.hex });
        }
        break;

      case 'fan':
        if (actionType === 'TOGGLE_POWER') {
          sounds.playClick();
          const newState = !deviceStates.fan.isOn;
          const currentSpeed = newState ? (deviceStates.fan.speed || 2) : 0;
          updateDeviceState('fan', {
            isOn: newState,
            speed: currentSpeed,
            rpm: newState ? currentSpeed * 400 : 0,
            relayState: newState ? 'Closed' : 'Open',
            energyWatts: newState ? currentSpeed * 14 : 0
          });
          showToast(`🌀 Smart Fan switched ${newState ? 'ON' : 'OFF'}`, 'info', '🌀');
          addActivity({
            icon: '🌀',
            title: `Smart Fan ${newState ? 'Turned ON' : 'Turned OFF'}`,
            description: `Triac speed controller set to ${newState ? 'Speed ' + currentSpeed : 'Standby'}.`,
            deviceId: 'fan',
            type: 'info'
          });
        } else if (actionType === 'SET_SPEED') {
          sounds.playClick();
          const speed = payload.speed;
          const isOn = speed > 0;
          updateDeviceState('fan', {
            speed,
            isOn,
            rpm: speed * 420,
            energyWatts: speed * 12
          });
          showToast(`🌀 Fan speed set to ${speed > 0 ? 'Level ' + speed : 'OFF'}`, 'info', '🌀');
        } else if (actionType === 'TOGGLE_OSCILLATION') {
          sounds.playClick();
          const newState = !deviceStates.fan.oscillation;
          updateDeviceState('fan', { oscillation: newState });
          showToast(`🔄 Oscillation sweep ${newState ? 'Enabled' : 'Disabled'}`, 'info', '🌀');
        }
        break;

      case 'door':
        if (actionType === 'TOGGLE_LOCK') {
          const willLock = payload.state !== undefined ? payload.state : !deviceStates.door.isLocked;
          sounds.playLock(willLock);
          updateDeviceState('door', {
            isLocked: willLock,
            lastActivity: willLock ? 'Locked just now via KinNest app' : 'Unlocked just now via KinNest app'
          });
          showToast(willLock ? '🔒 Front Door LOCKED securely' : '🔓 Front Door UNLOCKED', willLock ? 'success' : 'warning', '🚪');
          addActivity({
            icon: '🚪',
            title: willLock ? 'Door Locked' : 'Door Unlocked',
            description: willLock ? 'Motorized deadbolt fully extended & verified.' : 'Deadbolt retracted via user command.',
            deviceId: 'door',
            type: willLock ? 'security' : 'warning'
          });
        }
        break;

      case 'baby':
        if (actionType === 'TOGGLE_LULLABY') {
          const shouldPlay = !deviceStates.baby.lullabyPlaying;
          updateDeviceState('baby', { lullabyPlaying: shouldPlay });
          if (shouldPlay) {
            sounds.startLullaby();
            showToast('🎵 Playing soothing lullaby melody...', 'info', '👶');
            addActivity({
              icon: '🎵',
              title: 'Lullaby Music Started',
              description: 'Playing Twinkle Twinkle Little Star on nursery speaker.',
              deviceId: 'baby',
              type: 'info'
            });
          } else {
            sounds.stopLullaby();
            showToast('⏸️ Lullaby stopped', 'info', '👶');
          }
        } else if (actionType === 'TOGGLE_NIGHT_VISION') {
          sounds.playClick();
          const nv = !deviceStates.baby.nightVision;
          updateDeviceState('baby', { nightVision: nv });
          showToast(`🌙 Infrared Night Vision ${nv ? 'Enabled' : 'Disabled'}`, 'info', '👶');
        } else if (actionType === 'SIMULATE_CRY') {
          sounds.playClick();
          updateDeviceState('baby', {
            cryDetected: true,
            soundDecibels: 68
          });
          showToast('🔔 TEST ALERT: Baby Cry Pattern Detected (68 dB)!', 'warning', '👶');
          addActivity({
            icon: '🔔',
            title: 'Cry Alert Triggered',
            description: 'Acoustic sensor picked up infant vocal cry frequency in nursery.',
            deviceId: 'baby',
            type: 'warning'
          });
          // Auto calm down after 7s
          setTimeout(() => {
            setDeviceStates(prev => ({
              ...prev,
              baby: {
                ...prev.baby,
                cryDetected: false,
                soundDecibels: 24
              }
            }));
          }, 7000);
        }
        break;

      default:
        break;
    }
  }, [deviceStates, updateDeviceState, addActivity, showToast]);

  // Apply Preset Profile
  const applyPreset = useCallback((presetId) => {
    const preset = PRESET_PROFILES.find(p => p.id === presetId);
    if (!preset) return;
    setOwnedDeviceIds(preset.devices);
    sounds.playClick();
    showToast(`Switched to "${preset.name}" preset!`, 'success', '⚡');
    addActivity({
      icon: '⚡',
      title: 'Ecosystem Preset Applied',
      description: `Active devices updated to: ${preset.devices.length ? preset.devices.join(', ') : 'None (Clean Slate)'}.`,
      deviceId: 'system',
      type: 'info'
    });
  }, [showToast, addActivity]);

  // Dynamic Alerts Generator
  const alerts = useMemo(() => {
    const list = [];
    const states = deviceStates;

    // Only alert for owned devices
    if (ownedDeviceIds.includes('plant')) {
      if (states.plant.moisture < 35) {
        list.push({
          id: 'alert-plant-moisture',
          deviceId: 'plant',
          severity: 'critical',
          title: 'Plant Needs Water',
          description: `Soil moisture is at ${states.plant.moisture}% (Threshold: 40%). Foliage is beginning to droop.`,
          actionLabel: 'Water Plant',
          action: () => triggerDeviceAction('plant', 'WATER_PUMP', { state: true }),
          timeStr: 'Active'
        });
      }
    }

    if (ownedDeviceIds.includes('dog')) {
      if (states.dog.foodLevel < 25) {
        list.push({
          id: 'alert-dog-food',
          deviceId: 'dog',
          severity: 'warning',
          title: 'Dog Food Hopper Low',
          description: `Food capacity at ${states.dog.foodLevel}%. Consider topping up kibble reservoir soon.`,
          actionLabel: 'Feed Now',
          action: () => triggerDeviceAction('dog', 'FEED'),
          timeStr: 'Active'
        });
      }
    }

    if (ownedDeviceIds.includes('door')) {
      if (!states.door.isLocked) {
        list.push({
          id: 'alert-door-unlocked',
          deviceId: 'door',
          severity: 'warning',
          title: 'Front Door Unlocked',
          description: 'The smart deadbolt is currently in the UNLOCKED position.',
          actionLabel: 'Lock Door Now',
          action: () => triggerDeviceAction('door', 'TOGGLE_LOCK', { state: true }),
          timeStr: 'Active'
        });
      }
    }

    if (ownedDeviceIds.includes('baby')) {
      if (states.baby.cryDetected) {
        list.push({
          id: 'alert-baby-cry',
          deviceId: 'baby',
          severity: 'critical',
          title: 'Cry Detected in Nursery',
          description: `Vocal acoustic surge at ${states.baby.soundDecibels} dB detected by KinNest audio sensor.`,
          actionLabel: 'Play Lullaby',
          action: () => triggerDeviceAction('baby', 'TOGGLE_LULLABY'),
          timeStr: 'Just now'
        });
      }
    }

    if (ownedDeviceIds.includes('fish')) {
      if (states.fish.waterTemp > 29 || states.fish.waterTemp < 23) {
        list.push({
          id: 'alert-fish-temp',
          deviceId: 'fish',
          severity: 'critical',
          title: 'Aquarium Temp Fluctuation',
          description: `Water temperature is at ${states.fish.waterTemp}°C (Safe target: 24°C - 27°C).`,
          actionLabel: 'Stabilize Heater',
          action: () => updateDeviceState('fish', { waterTemp: 25.0 }),
          timeStr: 'Active'
        });
      }
    }

    // Informational positive alerts
    if (ownedDeviceIds.includes('bird')) {
      list.push({
        id: 'alert-bird-healthy',
        deviceId: 'bird',
        severity: 'info',
        title: 'Aviary Freshness Normal',
        description: `Seed hopper at ${states.bird.seedLevel}%, water bath fresh.`,
        actionLabel: 'View Bird Care',
        action: null,
        timeStr: 'Today'
      });
    }

    return list;
  }, [deviceStates, ownedDeviceIds, triggerDeviceAction, updateDeviceState]);

  // Subtle real-time telemetry simulation (gentle fluctuation)
  useEffect(() => {
    if (!telemetrySimActive) return;

    const timer = setInterval(() => {
      setDeviceStates(prev => {
        const next = { ...prev };

        // Subtle temperature jitter
        if (next.plant) {
          const tempDelta = (Math.random() * 0.4 - 0.2);
          next.plant = {
            ...next.plant,
            temp: parseFloat((next.plant.temp + tempDelta).toFixed(1))
          };
        }

        // Subtle baby decibel fluctuation
        if (next.baby && !next.baby.cryDetected) {
          next.baby = {
            ...next.baby,
            soundDecibels: Math.floor(22 + Math.random() * 6)
          };
        }

        // Fan RPM slight jitter if on
        if (next.fan && next.fan.isOn && next.fan.speed > 0) {
          const baseRpm = next.fan.speed * 420;
          next.fan = {
            ...next.fan,
            rpm: baseRpm + Math.floor(Math.random() * 20 - 10)
          };
        }

        return next;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [telemetrySimActive]);

  // Filtered owned products array
  const ownedProducts = useMemo(() => {
    return PRODUCTS.filter(p => ownedDeviceIds.includes(p.id));
  }, [ownedDeviceIds]);

  const value = {
    products: PRODUCTS,
    ownedDeviceIds,
    ownedProducts,
    deviceStates,
    activities,
    alerts,
    toasts,
    telemetrySimActive,
    setTelemetrySimActive,
    isDeviceOwned,
    addDeviceToHome,
    removeDeviceFromHome,
    updateDeviceState,
    triggerDeviceAction,
    addActivity,
    clearActivities: () => setActivities([]),
    applyPreset,
    showToast,
    removeToast
  };

  return (
    <IoTContext.Provider value={value}>
      {children}
    </IoTContext.Provider>
  );
};

export const useIoT = () => {
  const context = useContext(IoTContext);
  if (!context) {
    throw new Error('useIoT must be used within an IoTProvider');
  }
  return context;
};
