export const HARDWARE_SPECS = {
  projectName: 'Smart Plant Monitoring and Irrigation System',
  microcontroller: {
    model: 'ESP32-WROOM-32 Development Board',
    clockSpeed: '240 MHz Dual Core',
    flash: '4MB SPI Flash',
    connectivity: 'Wi-Fi 802.11 b/g/n (2.4 GHz) + Bluetooth 4.2 BR/EDR & BLE',
    operatingVoltage: '3.3V Logic (5V VIN via USB-C or Micro-USB)'
  },
  pinout: [
    {
      pin: 'GPIO 34',
      type: 'ADC1_CH6 (Analog Input)',
      component: 'Capacitive Soil Moisture Sensor v1.2',
      wireColor: 'Yellow (Signal)',
      description: 'Reads soil dielectric permittivity. Corrosion-resistant gold pads.'
    },
    {
      pin: 'GPIO 4',
      type: 'Digital GPIO (Pull-up)',
      component: 'DHT22 / AM2302 Sensor',
      wireColor: 'Blue (Data)',
      description: 'Measures ambient air temperature (-40 to +80°C) and relative humidity (0-100%).'
    },
    {
      pin: 'GPIO 26',
      type: 'Digital GPIO (Output)',
      component: '5V Optocoupler Relay Module',
      wireColor: 'Orange (IN1)',
      description: 'Controls high-side power to 5V DC submersible mini pump.'
    },
    {
      pin: 'GPIO 35',
      type: 'ADC1_CH7 (Analog Input)',
      component: 'Ultrasonic / Non-contact Liquid Sensor',
      wireColor: 'Green (Echo/Signal)',
      description: 'Measures water reservoir depth from 0% to 100% capacity.'
    },
    {
      pin: 'GPIO 18',
      type: 'PWM / Digital Output',
      component: 'Active Piezo Buzzer',
      wireColor: 'Purple (Signal)',
      description: 'Acoustic alert for critical dry soil or empty reservoir warning.'
    },
    {
      pin: 'VIN / 5V',
      type: 'Power Rail',
      component: '5V Step-Down or USB Power Supply',
      wireColor: 'Red (VCC)',
      description: 'Powers relay coil, water pump, and ESP32 regulator.'
    },
    {
      pin: 'GND',
      type: 'Common Ground',
      component: 'All Component Grounds',
      wireColor: 'Black (GND)',
      description: 'Common reference ground for all analog sensors and actuators.'
    }
  ],
  calibration: {
    airValue: 3200,   // ADC reading in completely dry air
    waterValue: 1450, // ADC reading submerged in pure water
    formula: 'Moisture (%) = map(analogRead(34), AIR_VAL, WATER_VAL, 0, 100)'
  },
  apiEndpoints: {
    restEndpoint: 'http://<ESP32_IP_ADDRESS>/api/telemetry',
    postPumpControl: 'http://<ESP32_IP_ADDRESS>/api/pump?state={on|off}&mode={auto|manual}',
    mqttTopicTelemetry: 'iot/home/plant/telemetry',
    mqttTopicCommand: 'iot/home/plant/command/pump'
  }
};

export const SAMPLE_ARDUINO_CODE = `/*
 * Smart Plant Monitoring & Irrigation System - ESP32 Firmware
 * Hardware: ESP32 + Capacitive Soil Sensor v1.2 + DHT22 + Relay + Tank Sensor
 * Framework: Arduino IDE / PlatformIO
 */

#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>

// Wi-Fi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Pin Configurations
#define SOIL_PIN 34
#define DHT_PIN 4
#define RELAY_PIN 26
#define DHTTYPE DHT22

// Calibration (Calibrate your sensor in air & water)
const int AIR_VALUE = 3200;    // 0% moisture
const int WATER_VALUE = 1450;  // 100% moisture

DHT dht(DHT_PIN, DHTTYPE);
WebServer server(80);

// State Variables
bool pumpState = false;
bool autoMode = true;
int minMoistureThreshold = 30;
int targetMoistureThreshold = 65;

int readSoilMoisture() {
  int raw = analogRead(SOIL_PIN);
  int percent = map(raw, AIR_VALUE, WATER_VALUE, 0, 100);
  return constrain(percent, 0, 100);
}

void handleTelemetry() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int moisture = readSoilMoisture();

  StaticJsonDocument<256> doc;
  doc["soilMoisture"] = moisture;
  doc["temperature"] = isnan(temp) ? 26.5 : temp;
  doc["humidity"] = isnan(hum) ? 60.0 : hum;
  doc["pumpStatus"] = pumpState;
  doc["autoMode"] = autoMode;
  doc["waterTank"] = 75; // Read from ultrasonic/ADC

  String response;
  serializeJson(doc, response);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", response);
}

void handlePumpControl() {
  if (server.hasArg("state")) {
    String state = server.arg("state");
    pumpState = (state == "on");
    digitalWrite(RELAY_PIN, pumpState ? HIGH : LOW);
  }
  if (server.hasArg("mode")) {
    autoMode = (server.arg("mode") == "auto");
  }
  handleTelemetry();
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Start with pump OFF

  dht.begin();
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Connected! IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/api/telemetry", HTTP_GET, handleTelemetry);
  server.on("/api/pump", HTTP_POST, handlePumpControl);
  server.begin();
}

void loop() {
  server.handleClient();

  // Automatic Irrigation Logic
  if (autoMode) {
    int moisture = readSoilMoisture();
    if (moisture < minMoistureThreshold && !pumpState) {
      pumpState = true;
      digitalWrite(RELAY_PIN, HIGH);
      Serial.println("Auto-Pump Started: Moisture Low");
    } else if (moisture >= targetMoistureThreshold && pumpState) {
      pumpState = false;
      digitalWrite(RELAY_PIN, LOW);
      Serial.println("Auto-Pump Stopped: Hydration Target Met");
    }
  }
  delay(100);
}
`;
