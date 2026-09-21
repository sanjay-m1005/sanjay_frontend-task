/**
 * KinNest Product Catalog & IoT Specifications
 * Brand: KinNest ("One Smart Home. One Place. Complete Care.")
 */

export const PRODUCTS = [
  {
    id: 'plant',
    name: 'Smart Plant Monitor',
    shortName: 'Plant Monitor',
    emoji: '🌱',
    category: 'Nature & Garden',
    badge: 'Dual-Depth Sensor',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Real-time Soil Moisture, Temperature & Automated Micro-Watering',
    shortDescription: 'Continuous soil moisture telemetry, ambient temperature, humidity & one-click water pump simulation.',
    fullDescription: 'Keep your indoor foliage, delicate succulents, and kitchen herbs flourishing effortlessly. The KinNest Smart Plant Monitor continuously tracks volumetric water content and ambient temperature, alerting you before dehydration stress occurs, with optional automated micro-dosing pump activation.',
    features: [
      'Dual-depth capacitive moisture sensing (corrosion-resistant)',
      'High-precision ambient temperature & humidity telemetry',
      'One-touch simulated micro-pump hydration toggle',
      'Adaptive plant happiness & health emotional feedback',
      'Configurable watering threshold reminders'
    ],
    iotSpecs: {
      mcu: 'ESP32-WROOM-32E (240MHz Dual Core)',
      sensors: ['Capacitive Soil Moisture Probe v2.0 (ADC1_CH0)', 'DHT22 Digital Temperature & Humidity (GPIO4)'],
      actuators: ['5V Low-Noise Submersible Peristaltic Pump via Optocoupled Relay (GPIO16)'],
      communication: 'Wi-Fi 802.11 b/g/n & BLE 4.2',
      mqttTopics: {
        telemetry: 'kinnest/device/plant/telemetry',
        control: 'kinnest/device/plant/pump/cmd',
        status: 'kinnest/device/plant/status'
      }
    },
    defaultState: {
      moisture: 68,
      temp: 28,
      humidity: 55,
      health: 'Healthy',
      waterRequirement: 'Low',
      isWatering: false,
      lastWatered: 'Today, 8:30 AM',
      nextWaterReminder: 'Tomorrow, 9:00 AM',
      sensorStatus: 'Connected',
      pumpRelay: false
    }
  },
  {
    id: 'dog',
    name: 'Smart Dog Care',
    shortName: 'Dog Care',
    emoji: '🐶',
    category: 'Pet Care',
    badge: 'Portion Control',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Precision Kibble Dispenser & Fresh Circulating Hydration',
    shortDescription: 'Dispense measured meal portions, check food & water levels, and keep your best friend happy anywhere.',
    fullDescription: 'Ensure your dog is fed punctually every day. Features an anti-jam rotating impeller, ultrasonic food hopper depth sensing, dual-weight load cells for gram-precise meals, and a freshwater pump dispenser.',
    features: [
      'Anti-jam automated auger dispenser with portion calibration',
      'Live hopper food capacity & water reservoir percentage',
      'Instant "Feed Now" & "Give Water" remote triggers',
      'Daily feeding log & automated schedule synchronizer',
      'Smart bowl presence & eating behavior detector'
    ],
    iotSpecs: {
      mcu: 'ESP32-WROOM-32D with Hardware PWM',
      sensors: ['HC-SR04 Ultrasonic Distance Sensor (Hopper level)', 'HX711 24-bit ADC with Load Cell (Grams fed)'],
      actuators: ['MG996R High-Torque Metal Gear Feeder Servo', '5V Food-Grade Submersible Water Pump'],
      communication: 'MQTT over TLS / WebSockets',
      mqttTopics: {
        telemetry: 'kinnest/device/dog/telemetry',
        control: 'kinnest/device/dog/dispense/cmd',
        status: 'kinnest/device/dog/status'
      }
    },
    defaultState: {
      health: 'Active & Happy',
      foodLevel: 82,
      waterLevel: 75,
      lastFed: 'Today, 8:15 AM',
      nextFeed: 'Today, 6:00 PM',
      isFeeding: false,
      isDispensingWater: false,
      portionGrams: 250,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'cat',
    name: 'Smart Cat Care',
    shortName: 'Cat Care',
    emoji: '🐱',
    category: 'Pet Care',
    badge: 'Triple Filtration',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Whisker-Safe Micro-Feeder & Continuous Filtered Fountain',
    shortDescription: 'Shallow anti-fatigue bowl design, whisper-quiet carbon water fountain, and timed small-portion meals.',
    fullDescription: 'Cats thrive on routine and fresh running water. KinNest Cat Care combines a whisper-quiet motor, food hopper freshness airlock, and an activated carbon water fountain that encourages hydration.',
    features: [
      'Whisker-relief ergonomic bowl with food-grade 304 stainless steel',
      'Ultra-silent (<20dB) continuous water fountain with filter monitor',
      'Interactive laser play or treat dispensation simulation',
      'Multi-meal scheduling for optimal digestion',
      'Real-time food and water hopper indicators'
    ],
    iotSpecs: {
      mcu: 'ESP32 Pico-D4 Low Profile',
      sensors: ['Capacitive Liquid Level Probes', 'TDS Water Quality Sensor', 'Optical Food Gap Detector'],
      actuators: ['28BYJ-48 Stepper Motor Dispenser', 'Ultra-quiet 5V Brushless Water Fountain Pump'],
      communication: 'Wi-Fi 2.4GHz / Matter ready',
      mqttTopics: {
        telemetry: 'kinnest/device/cat/telemetry',
        control: 'kinnest/device/cat/feeder/cmd',
        fountain: 'kinnest/device/cat/fountain/cmd'
      }
    },
    defaultState: {
      health: 'Relaxed & Purring',
      foodLevel: 70,
      waterLevel: 88,
      lastFed: 'Today, 7:45 AM',
      nextFeed: 'Today, 5:30 PM',
      isFeeding: false,
      isDispensingWater: false,
      fountainActive: true,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'bird',
    name: 'Smart Bird Care',
    shortName: 'Bird Care',
    emoji: '🐦',
    category: 'Nature & Garden',
    badge: 'Acoustic Sensing',
    image: 'https://images.unsplash.com/photo-1522926197415-e5a9a32c2838?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Perch Activity Detection & Anti-Spill Aviary Seed Feeder',
    shortDescription: 'Perch motion tracking, anti-scattering seed replenishment, and fresh bird bath hygiene monitoring.',
    fullDescription: 'Designed for canaries, parakeets, finches, and outdoor garden visitors. The KinNest Bird Care module provides clean seed dispersion on demand or schedule, prevents husk clogging, and keeps avian water fresh.',
    features: [
      'Gravity-assisted anti-scattering seed dispenser',
      'Acoustic chirp frequency & perch landing activity sensing',
      'Automatic bird bath freshness monitoring & refill alert',
      'Timed dawn-to-dusk feeding cycles',
      'Instant seed top-up & bath refresh triggers'
    ],
    iotSpecs: {
      mcu: 'ESP32-S3 Dual Core with Vector Instructions',
      sensors: ['MEMS Acoustic Microphone (Chirp Activity)', 'Infrared Beam Perch Interruption Sensor'],
      actuators: ['Micro Solenoid Seed Gate Valve', 'Low-flow 3V Water Bath Refill Valve'],
      communication: 'Wi-Fi / ESP-NOW Mesh',
      mqttTopics: {
        telemetry: 'kinnest/device/bird/telemetry',
        control: 'kinnest/device/bird/seed/cmd'
      }
    },
    defaultState: {
      health: 'Singing & Cheerful',
      seedLevel: 90,
      waterBathLevel: 85,
      activity: 'Active Morning Chirps',
      lastFed: 'Today, 7:00 AM',
      isFeeding: false,
      isDispensingWater: false,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'fish',
    name: 'Smart Fish Care',
    shortName: 'Fish Care',
    emoji: '🐟',
    category: 'Nature & Garden',
    badge: 'Temp & Aeration',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Precision Flake Dispenser, Water Temp Regulation & Aeration',
    shortDescription: 'Automated aquarium feedings, submersible temperature probe, water level detection, and bubble aeration.',
    fullDescription: 'Maintain a pristine, tranquil aquatic environment for tropical freshwater or marine life. Controls scheduled feeding pinches, tracks exact water temperature, and manages aeration bubblers.',
    features: [
      'Moisture-sealed rotary flake dispenser prevents food clumping',
      'Submersible digital temperature sensor with alert triggers',
      'Aeration bubbler pump control & oxygenation status',
      'Filter cartridge health & water change countdown',
      'Simulated soothing underwater bubble visuals'
    ],
    iotSpecs: {
      mcu: 'ESP32 Node with Galvanic Isolation',
      sensors: ['DS18B20 Waterproof Digital Thermal Sensor', 'Optical Liquid Level High/Low Float Sensors'],
      actuators: ['Micro Geared Stepper for Rotating Drum Feeder', 'Solid-State Relay for Aerator/Heater'],
      communication: 'MQTT 3.1.1 / TLS 1.3',
      mqttTopics: {
        telemetry: 'kinnest/device/aquarium/telemetry',
        control: 'kinnest/device/aquarium/feed/cmd',
        aeration: 'kinnest/device/aquarium/aerator/cmd'
      }
    },
    defaultState: {
      health: 'Vibrant & Swimming',
      waterTemp: 25.5,
      waterLevel: 94,
      filterCondition: 'Optimal (98%)',
      lastFed: 'Today, 8:00 AM',
      isFeeding: false,
      aerationActive: true,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'light',
    name: 'Smart Light',
    shortName: 'Smart Light',
    emoji: '💡',
    category: 'Living & Comfort',
    badge: 'Circadian Dimming',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Circadian Warmth Dimming & Zero-Latency Relay Automation',
    shortDescription: 'Instant ON/OFF relay switching, fluid dimming, color temperature tuning, and real-time wattage tracking.',
    fullDescription: 'KinNest Smart Light transforms your living spaces with gentle, flicker-free illumination. Sync with the natural solar rhythm, adjust brightness smoothly, and enjoy smart scheduling for waking and relaxation.',
    features: [
      'Zero-crossing solid state relay for silent instant switching',
      'Full 1% to 100% smooth PWM dimming curve',
      'Adjustable color temperature from Warm Amber (2700K) to Daylight (6500K)',
      'Real-time power consumption in Watts & historical kWh',
      'One-tap cozy evening & bright focus scene presets'
    ],
    iotSpecs: {
      mcu: 'ESP8266 / ESP32-C3 Wi-Fi Module',
      sensors: ['PZEM-004T Energy & Wattage Monitor', 'Ambient Light Photodiode (LDR)'],
      actuators: ['Zero-Crossing Optocoupled Triac Dimmer', '10A 250VAC Solid State Relay (SSR)'],
      communication: 'MQTT / HTTP REST API / Home Assistant Compatible',
      mqttTopics: {
        state: 'kinnest/device/light/state',
        set: 'kinnest/device/light/set',
        brightness: 'kinnest/device/light/brightness/set'
      }
    },
    defaultState: {
      isOn: true,
      brightness: 85,
      colorTemp: 3200,
      colorHex: '#fff7ed',
      relayState: 'Closed',
      energyWatts: 9.5,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'fan',
    name: 'Smart Fan',
    shortName: 'Smart Fan',
    emoji: '🌀',
    category: 'Living & Comfort',
    badge: '3-Speed BLDC',
    image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Brushless Variable Airflow & Gentle Natural Breeze Mode',
    shortDescription: 'Dynamic 3-speed control with realistic spinning blade animation, oscillation toggle, and timer.',
    fullDescription: 'Stay cool and fresh with energy-efficient ventilation. Features 3 tailored airflow speeds, natural oscillation breeze simulation, sleep timer, and silent motor modulation.',
    features: [
      'Realistic animated fan blade speed transitions (Speeds 1, 2, 3 & OFF)',
      'Natural breeze algorithm (randomized calming velocity fluctuation)',
      'Synchronized 90-degree wide oscillation sweep',
      'Auto-off countdown sleep timer (30m, 1h, 2h, 4h)',
      'Brushless DC motor telemetry with RPM and watt readout'
    ],
    iotSpecs: {
      mcu: 'ESP32 Wi-Fi Node with Multi-channel PWM',
      sensors: ['Hall-Effect Blade RPM Sensor', 'ACS712 Current Sensor'],
      actuators: ['Optoisolated 4-Step Triac / BLDC Controller', 'SG90 Oscillation Servo Link'],
      communication: 'MQTT / Matter-over-Wi-Fi',
      mqttTopics: {
        state: 'kinnest/device/fan/state',
        speed: 'kinnest/device/fan/speed/set',
        oscillation: 'kinnest/device/fan/oscillation/set'
      }
    },
    defaultState: {
      isOn: true,
      speed: 2,
      oscillation: true,
      rpm: 1180,
      timerMinutes: 0,
      relayState: 'Closed',
      energyWatts: 28,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'door',
    name: 'Smart Door Lock',
    shortName: 'Door Lock',
    emoji: '🚪',
    category: 'Living & Comfort',
    badge: 'Heavy Deadbolt',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Motorized High-Security Deadbolt & Instant Remote Toggle',
    shortDescription: 'One-touch LOCK/UNLOCK with heavy deadbolt bolt animation, auto-lock timer, and tamper status.',
    fullDescription: 'Fortify your home with confidence. KinNest Smart Door Lock features commercial-grade motorized deadbolt control, magnetic door closure verification, auto-locking timer, and instant lock state notifications.',
    features: [
      'Interactive Lock / Unlock toggle with physical bolt sliding animation',
      'Configurable 30-second auto-lock countdown safety feature',
      'Battery percentage indicator with low-voltage alert',
      'Magnetic door contact sensor (detects open vs closed door)',
      'Encrypted transaction logs with time-stamped access history'
    ],
    iotSpecs: {
      mcu: 'ESP32-C3 RISC-V with Hardware Cryptographic Engine',
      sensors: ['Magnetic Hall Effect Door Contact (Closed/Ajar)', 'Tamper Accelerometer / Vibration Sensor'],
      actuators: ['12V High-Torque Geared Motor Deadbolt Actuator'],
      communication: 'Encrypted MQTT (mTLS) & Bluetooth Low Energy 5.0',
      mqttTopics: {
        lockState: 'kinnest/device/door/lock_state',
        command: 'kinnest/device/door/lock/cmd',
        battery: 'kinnest/device/door/battery'
      }
    },
    defaultState: {
      isLocked: true,
      autoLockTimer: 30,
      batteryPercent: 94,
      lastActivity: 'Auto-locked today at 8:00 AM',
      doorAjar: false,
      keypadTamperAlert: false,
      deviceStatus: 'Connected'
    }
  },
  {
    id: 'baby',
    name: 'Smart Baby Monitor',
    shortName: 'Baby Monitor',
    emoji: '👶',
    category: 'Nursery & Family',
    badge: 'Cry & Audio Sensing',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Acoustic Cry Detection, Thermal Comfort & Gentle Lullabies',
    shortDescription: 'Simulated video nursery view, real-time sound decibels, cry alert test, and soothing music audio player.',
    fullDescription: 'Watch over your little one with tenderness. KinNest Baby Monitor features a simulated high-definition live nursery feed with infrared night vision toggle, ambient decibel monitor, instant cry alert alerts, and soothing melodies.',
    features: [
      'Simulated camera stream viewport with active night-vision toggle',
      'Real-time sound level decibel (dB) gauge with quiet nursery threshold',
      'Instant "Cry Alert" simulation trigger for testing notifications',
      'Built-in audio synthesizer with 3 calming lullaby tracks',
      'Nursery temperature and relative humidity comfort index'
    ],
    iotSpecs: {
      mcu: 'ESP32-CAM / ESP32-S3 Eye with 2MP OV2640 Sensor',
      sensors: ['INMP441 High Sensitivity I2S Digital Mic', 'SHT31 Precision Temp & Humidity Sensor'],
      actuators: ['MAX98357A I2S Class-D Audio Amp with 3W Nursery Speaker', '850nm Infrared Night Illuminator LEDs'],
      communication: 'RTSP Video Stream & WebRTC / MQTT Audio Events',
      mqttTopics: {
        audioLevel: 'kinnest/device/baby/decibels',
        cryEvent: 'kinnest/device/baby/cry_alert',
        lullabyCmd: 'kinnest/device/baby/lullaby/cmd'
      }
    },
    defaultState: {
      soundDecibels: 24,
      roomTemp: 22.8,
      humidity: 50,
      cryDetected: false,
      nightVision: false,
      lullabyPlaying: false,
      currentLullaby: 'Twinkle Star (Ambient Music Box)',
      deviceStatus: 'Connected'
    }
  }
];

export const CATEGORIES = [
  'All',
  'Nature & Garden',
  'Pet Care',
  'Living & Comfort',
  'Nursery & Family'
];

export const INITIAL_OWNED_DEVICES = ['plant', 'dog', 'light'];

export const PRESET_PROFILES = [
  {
    id: 'starter',
    name: 'Curated Starter (3 Devices)',
    description: 'Plant Monitor, Dog Care, and Smart Light',
    devices: ['plant', 'dog', 'light']
  },
  {
    id: 'all',
    name: 'Complete Smart Home (All 9 Devices)',
    description: 'Every smart device across home, pets, garden & nursery',
    devices: ['plant', 'dog', 'cat', 'bird', 'fish', 'light', 'fan', 'door', 'baby']
  },
  {
    id: 'pet_lover',
    name: 'Pet & Nature Sanctuary',
    description: 'Dog, Cat, Bird, Fish & Plant',
    devices: ['dog', 'cat', 'bird', 'fish', 'plant']
  },
  {
    id: 'family',
    name: 'New Family Nest',
    description: 'Baby Monitor, Smart Light, Fan & Door Lock',
    devices: ['baby', 'light', 'fan', 'door']
  },
  {
    id: 'plant_only',
    name: 'Green Thumb Solo',
    description: 'Plant Monitor only',
    devices: ['plant']
  },
  {
    id: 'empty',
    name: 'Clean Slate (0 Devices)',
    description: 'Explore the platform from scratch as a brand new user',
    devices: []
  }
];
