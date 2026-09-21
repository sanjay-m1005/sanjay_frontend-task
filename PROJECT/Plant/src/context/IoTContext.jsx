import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const IoTContext = createContext(null);

export const useIoT = () => {
  const context = useContext(IoTContext);
  if (!context) {
    throw new Error('useIoT must be used within an IoTProvider');
  }
  return context;
};

export const IoTProvider = ({ children }) => {
  // Primary Telemetry
  const [soilMoisture, setSoilMoisture] = useState(52); // Percentage 0-100
  const [waterTankLevel, setWaterTankLevel] = useState(72); // Percentage 0-100
  const [temperature, setTemperature] = useState(28.6); // °C
  const [humidity, setHumidity] = useState(64); // %
  
  // Pump Control
  const [pumpStatus, setPumpStatusState] = useState(false); // true = ON, false = OFF
  const [pumpMode, setPumpMode] = useState('auto'); // 'auto' | 'manual'
  
  // Automation Thresholds
  const [thresholds, setThresholds] = useState({
    minMoisture: 30,     // Pump turns ON below this in Auto mode
    targetMoisture: 68,  // Pump turns OFF above this in Auto mode
    criticalTankLevel: 12 // Min tank level before emergency cutoff
  });

  // Simulation controls
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [naturalEvaporation, setNaturalEvaporation] = useState(true);
  const [deviceOnline, setDeviceOnline] = useState(true);
  const [lastWateredTime, setLastWateredTime] = useState('Today, 08:30 AM');
  const [waterDispensedToday, setWaterDispensedToday] = useState(480); // mL

  // Alert Tray
  const [alerts, setAlerts] = useState([]);
  const alertIdCounter = useRef(1);

  // History timeline for charts
  const [history, setHistory] = useState([
    { time: '04:00', moisture: 38, temp: 24.2, humidity: 72 },
    { time: '06:00', moisture: 34, temp: 25.1, humidity: 70 },
    { time: '08:00', moisture: 31, temp: 26.8, humidity: 66 },
    { time: '10:00', moisture: 68, temp: 28.5, humidity: 62 },
    { time: '12:00', moisture: 62, temp: 30.2, humidity: 58 },
    { time: '14:00', moisture: 56, temp: 31.0, humidity: 55 },
    { time: '16:00', moisture: 52, temp: 29.4, humidity: 60 },
  ]);

  // Derived plant state as explicitly requested:
  // 0–30% -> Dry / Wilted Plant ("Plant Needs Water")
  // 31–70% -> Medium / Normal Plant ("Plant is Okay")
  // 71–100% -> Healthy / Fully Watered Plant ("Plant is Healthy")
  const getPlantState = useCallback((moisture) => {
    if (moisture <= 30) {
      return {
        level: 'dry',
        title: 'Plant Needs Water',
        tone: 'amber',
        description: 'Soil moisture is critically low. Leaves are wilting.',
        recommendation: 'Irrigation required immediately.'
      };
    }
    if (moisture <= 70) {
      return {
        level: 'medium',
        title: 'Plant is Okay',
        tone: 'emerald',
        description: 'Moisture is in optimal operational band.',
        recommendation: 'Maintaining normal transpiration cycle.'
      };
    }
    return {
      level: 'moist',
      title: 'Plant is Healthy',
      tone: 'green',
      description: 'Lush soil hydration with vibrant foliage posture.',
      recommendation: 'Adequate hydration. Pump paused.'
    };
  }, []);

  const plantState = getPlantState(soilMoisture);

  // Derived soil status
  const getSoilStatus = (moisture) => {
    if (moisture <= 20) return 'Critically Dry';
    if (moisture <= 30) return 'Dry';
    if (moisture <= 75) return 'Normal (Optimal)';
    return 'Moist / Saturated';
  };

  const soilStatus = getSoilStatus(soilMoisture);

  // Derived water tank state
  const getTankState = (level) => {
    if (level <= 5) return { status: 'Empty', color: 'red' };
    if (level <= 20) return { status: 'Low Water Level', color: 'amber' };
    if (level <= 60) return { status: 'Medium', color: 'sky' };
    return { status: 'High', color: 'blue' };
  };

  const tankState = getTankState(waterTankLevel);

  // Safe pump state updater
  const setPumpStatus = useCallback((nextStatus) => {
    if (nextStatus === true) {
      // Safety check: Cannot turn pump on if tank is empty
      if (waterTankLevel <= thresholds.criticalTankLevel) {
        addAlert('critical', 'Water Tank Empty', 'Cannot start pump: Tank water level is critically low. Please refill tank first.');
        setPumpStatusState(false);
        return false;
      }
      setPumpStatusState(true);
      return true;
    } else {
      setPumpStatusState(false);
      return true;
    }
  }, [waterTankLevel, thresholds.criticalTankLevel]);

  // Alert Manager
  const addAlert = useCallback((type, title, message) => {
    setAlerts(prev => {
      // Avoid duplicate titles
      if (prev.some(a => a.title === title && !a.dismissed)) {
        return prev;
      }
      const newAlert = {
        id: alertIdCounter.current++,
        type, // 'info' | 'warning' | 'critical' | 'success'
        title,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        dismissed: false
      };
      return [newAlert, ...prev].slice(0, 8);
    });
  }, []);

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  // Check conditions and trigger system alerts
  useEffect(() => {
    if (waterTankLevel <= thresholds.criticalTankLevel) {
      addAlert('critical', 'Water Tank Empty', 'Tank level is at ' + Math.round(waterTankLevel) + '%. Pump auto-disabled to protect motor.');
    } else if (waterTankLevel <= 25) {
      addAlert('warning', 'Low Water Level', 'Reservoir tank is below 25%. Refill recommended.');
    }

    if (soilMoisture <= thresholds.minMoisture) {
      addAlert('warning', 'Soil Moisture Low', `Soil moisture has dropped to ${Math.round(soilMoisture)}%. ${pumpMode === 'auto' ? 'Auto-irrigation triggered.' : 'Manual watering suggested.'}`);
    }
  }, [soilMoisture, waterTankLevel, thresholds, pumpMode, addAlert]);

  // Manual refill action
  const refillTank = () => {
    setWaterTankLevel(100);
    addAlert('success', 'Water Tank Refilled', 'Reservoir tank replenished to 100% capacity.');
  };

  // Quick manual watering burst
  const quickWaterPlant = (amount = 15) => {
    if (waterTankLevel < 5) {
      addAlert('critical', 'Water Tank Empty', 'Cannot water plant: reservoir is empty.');
      return;
    }
    setWaterTankLevel(prev => Math.max(0, prev - Math.round(amount * 0.4)));
    setSoilMoisture(prev => Math.min(100, prev + amount));
    setWaterDispensedToday(prev => prev + amount * 10);
    setLastWateredTime('Just now');
    addAlert('info', 'Manual Watering Pulse', `Applied ${amount * 10}mL moisture burst.`);
  };

  // Interactive preset setter
  const applyPreset = (presetName) => {
    switch (presetName) {
      case 'dry':
        setSoilMoisture(18);
        setPumpStatusState(false);
        break;
      case 'medium':
        setSoilMoisture(52);
        setPumpStatusState(false);
        break;
      case 'healthy':
        setSoilMoisture(84);
        setPumpStatusState(false);
        break;
      case 'low_tank':
        setWaterTankLevel(8);
        setPumpStatusState(false);
        break;
      case 'pump_running':
        if (waterTankLevel > 15) {
          setPumpStatusState(true);
        }
        break;
      default:
        break;
    }
  };

  // Main Live Physics Simulation Loop
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // 1. If pump is running
      if (pumpStatus) {
        setWaterTankLevel(prevTank => {
          const nextTank = Math.max(0, prevTank - 0.7);
          if (nextTank <= thresholds.criticalTankLevel) {
            // Safety Cutoff!
            setPumpStatusState(false);
            addAlert('critical', 'Emergency Pump Cutoff', 'Pump stopped: Water tank reached emergency low reserve.');
            return nextTank;
          }
          return Number(nextTank.toFixed(1));
        });

        setSoilMoisture(prevMoisture => {
          const nextMoisture = Math.min(100, prevMoisture + 1.2);
          // In Auto Mode: Stop when reaching target
          if (pumpMode === 'auto' && nextMoisture >= thresholds.targetMoisture) {
            setPumpStatusState(false);
            setLastWateredTime('Just now');
            addAlert('success', 'Auto-Irrigation Complete', `Soil moisture reached optimal ${thresholds.targetMoisture}%. Pump shut down.`);
          }
          return Number(nextMoisture.toFixed(1));
        });

        setWaterDispensedToday(prev => prev + 5);
      } else {
        // 2. Pump is OFF
        // Natural gradual evaporation
        if (naturalEvaporation) {
          setSoilMoisture(prev => {
            // Very slow natural drain
            const next = Math.max(12, prev - 0.08);
            // In Auto mode: Trigger pump if dropped below min threshold
            if (pumpMode === 'auto' && next <= thresholds.minMoisture && waterTankLevel > thresholds.criticalTankLevel) {
              setPumpStatusState(true);
              addAlert('info', 'Auto-Irrigation Started', `Soil moisture dropped below ${thresholds.minMoisture}%. Auto pump engaged.`);
            }
            return Number(next.toFixed(2));
          });
        }

        // Realistic slight ambient sensor jitter (+/- 0.05°C, +/- 0.1%)
        setTemperature(prev => {
          const delta = (Math.random() - 0.5) * 0.08;
          return Number((prev + delta).toFixed(1));
        });
        setHumidity(prev => {
          const delta = (Math.random() - 0.5) * 0.12;
          return Math.min(95, Math.max(30, Number((prev + delta).toFixed(1))));
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isLiveSimulating,
    pumpStatus,
    pumpMode,
    thresholds,
    naturalEvaporation,
    waterTankLevel,
    addAlert
  ]);

  const value = {
    soilMoisture,
    setSoilMoisture,
    waterTankLevel,
    setWaterTankLevel,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    soilStatus,
    plantState,
    tankState,
    pumpStatus,
    setPumpStatus,
    pumpMode,
    setPumpMode,
    thresholds,
    setThresholds,
    alerts,
    addAlert,
    dismissAlert,
    clearAllAlerts,
    refillTank,
    quickWaterPlant,
    applyPreset,
    isLiveSimulating,
    setIsLiveSimulating,
    naturalEvaporation,
    setNaturalEvaporation,
    deviceOnline,
    setDeviceOnline,
    lastWateredTime,
    waterDispensedToday,
    history
  };

  return <IoTContext.Provider value={value}>{children}</IoTContext.Provider>;
};
