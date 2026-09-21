export const IOT_PROJECTS = [
  {
    id: 'smart-plant',
    name: 'Smart Plant Monitoring & Irrigation',
    category: 'AgriTech & Home Automation',
    tagline: 'Autonomous plant hydration, micro-climate monitoring, and dynamic foliage health diagnostics.',
    status: 'Active',
    statusColor: 'emerald',
    icon: 'Sprout',
    version: 'v2.4 LTS',
    hardware: ['ESP32-WROOM-32', 'Capacitive Moisture v1.2', 'DHT22', '5V Solid State Relay', 'Submersible 5V Pump'],
    protocol: 'MQTT / WebSockets / HTTPS',
    metricsSummary: [
      { label: 'Soil Hydration', value: 'Live' },
      { label: 'Ambient Temp', value: 'Live' },
      { label: 'Water Reservoir', value: 'Live' },
      { label: 'Auto Pump', value: 'Enabled' }
    ],
    lastUpdated: '10 mins ago',
    activeDashboardId: 'plant-dashboard',
    description: 'A closed-loop smart irrigation system powered by an ESP32 microcontroller. Measures volumetric water content through corrosion-resistant capacitive sensing and activates an autonomous 5V pump relay with tank run-dry protection.'
  },
  {
    id: 'precision-drip',
    name: 'Multi-Zone Precision Drip Network',
    category: 'Commercial Agriculture',
    tagline: 'Multi-valve solenoid manifold for zoned vegetable gardens with weather forecast integration.',
    status: 'Prototype',
    statusColor: 'blue',
    icon: 'Droplets',
    version: 'v1.1 Alpha',
    hardware: ['ESP32 Dual Core', '4-Channel 12V Solenoid Manifold', 'Tipping Bucket Rain Gauge', 'RS485 Modbus Soil Probe'],
    protocol: 'LoRaWAN + ESP-NOW',
    metricsSummary: [
      { label: 'Active Zones', value: '4 Zones' },
      { label: 'Pressure', value: '2.4 Bar' },
      { label: 'Flow Rate', value: '14 L/min' },
      { label: 'Rain Sensor', value: 'Dry' }
    ],
    lastUpdated: 'Yesterday',
    activeDashboardId: null,
    description: 'Designed for larger terrace and balcony gardens requiring zone-by-zone pressure compensation and weather forecast predictive delay algorithms.'
  },
  {
    id: 'hydroponics-tower',
    name: 'Aeroponic Grow Tower & EC/pH Regulator',
    category: 'Indoor Farming',
    tagline: 'Automated nutrient dosing, EC & pH sensing, and spectrum-tuned vertical grow lights.',
    status: 'In Development',
    statusColor: 'purple',
    icon: 'Layers',
    version: 'v0.9 Beta',
    hardware: ['Raspberry Pi Pico W', 'Analog pH Probe', 'Electrical Conductivity (EC) Sensor', '3x Stepper Peristaltic Pumps'],
    protocol: 'REST API / MQTT',
    metricsSummary: [
      { label: 'pH Value', value: '6.2 Target' },
      { label: 'EC Level', value: '1.8 mS/cm' },
      { label: 'Water Temp', value: '21.5°C' },
      { label: 'Light Cycle', value: '16h / 8h' }
    ],
    lastUpdated: '3 days ago',
    activeDashboardId: null,
    description: 'Vertical food production tower maintaining precise mineral concentration and root mist cycles for pesticide-free greens.'
  },
  {
    id: 'smart-energy',
    name: 'Solar Harvester & Smart Energy Hub',
    category: 'Clean Energy & Grid',
    tagline: 'Sub-circuit power analytics, solar MPPT telemetry, and battery storage cycle monitoring.',
    status: 'Upcoming',
    statusColor: 'amber',
    icon: 'Zap',
    version: 'v0.5 Spec',
    hardware: ['ESP32-S3', 'PZEM-004T Power Meter', 'Split-Core CT Clamps', 'Victron VE.Direct Interface'],
    protocol: 'Modbus RTU / MQTT',
    metricsSummary: [
      { label: 'Solar Input', value: '850 Wp' },
      { label: 'Battery SOC', value: '88%' },
      { label: 'Daily Yield', value: '4.2 kWh' },
      { label: 'Grid Feed', value: '0.0 W' }
    ],
    lastUpdated: '1 week ago',
    activeDashboardId: null,
    description: 'Monitors renewable energy generation from rooftop panels and automatically shifts high-draw appliances to solar peak hours.'
  },
  {
    id: 'smart-aquaponics',
    name: 'EcoSync Aquaponic Nitrogen Cycle Hub',
    category: 'Eco Systems',
    tagline: 'Symbiotic fish tank and bio-filter monitoring with automated feeder and dissolved oxygen sensors.',
    status: 'Concept',
    statusColor: 'slate',
    icon: 'Fish',
    version: 'v0.1 RFC',
    hardware: ['ESP32-C3', 'Galvanic Dissolved Oxygen Sensor', 'Servo Auger Feeder', 'Water Turbidity Sensor'],
    protocol: 'BLE Mesh + MQTT',
    metricsSummary: [
      { label: 'DO Level', value: '7.4 mg/L' },
      { label: 'Water Temp', value: '24°C' },
      { label: 'Feeding Timer', value: '3x / day' },
      { label: 'Nitrification', value: 'Stable' }
    ],
    lastUpdated: '2 weeks ago',
    activeDashboardId: null,
    description: 'Harmonious aquaculture and hydroponics balance tracking the nitrification bacteria cycle from ammonia to plant-absorbable nitrates.'
  }
];
