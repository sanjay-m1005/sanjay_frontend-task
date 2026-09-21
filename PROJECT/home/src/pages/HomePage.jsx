import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Cpu, 
  Radio, 
  Heart, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  Leaf,
  Plus
} from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { ActiveDeviceCard } from '../components/cards/ActiveDeviceCard';
import { ProductCatalogCard } from '../components/cards/ProductCatalogCard';

export const HomePage = ({ onOpenAI }) => {
  const navigate = useNavigate();
  const { products, ownedDeviceIds, ownedProducts, applyPreset } = useIoT();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
        {/* Ambient background glow mesh */}
        <div className="absolute top-0 inset-x-0 h-full ambient-hero -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-kin-800 border border-kin-200/80 shadow-xs">
                  <Leaf className="w-3.5 h-3.5 text-kin-600" />
                  <span>The Family & Living IoT Ecosystem</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-xs">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Smart Hardware Prototype</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                One Smart Home. <br />
                <span className="bg-gradient-to-r from-kin-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  One Place.
                </span>{' '}
                Complete Care.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                KinNest unites home automation with tender care for your beloved <strong>pets, thriving plants, aquatic life, and nursery</strong>. Buy products individually, connect them seamlessly, and monitor everything from one intuitive, family-friendly dashboard.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-kin-600 hover:bg-kin-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-kin-600/25 transition-all flex items-center gap-2"
                >
                  <span>Explore 9 Smart Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-slate-800 font-bold text-sm border border-slate-200 shadow-soft transition-all flex items-center gap-2"
                >
                  <span>Open Connected Dashboard</span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-kin-100 text-kin-800">
                    {ownedDeviceIds.length} Active
                  </span>
                </Link>
              </div>

              {/* Live Indicators Pill Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Simulated Relays</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Real-time Telemetry Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Local State Synced</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Smart Living Ecosystem Montage */}
            <div className="lg:col-span-5 relative">
              {/* Background ambient bubble */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-kin-200/40 via-sky-200/30 to-amber-100/40 blur-2xl -z-10" />

              {/* Main Visual Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/80 shadow-soft-lg space-y-4">
                {/* Visual Cover Collage */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
                    alt="KinNest Harmonious Living"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Floating Telemetry Badges on Image */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <span>🌱</span>
                    <span>Plant: 68% Moisture</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <span>🐶</span>
                    <span>Dog: Well Fed</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                      KinNest Ecosystem
                    </span>
                    <p className="text-sm font-bold text-white leading-snug">
                      Living Spaces • Cherished Pets • Verdant Plants • Nursery
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Demo Selector within Hero */}
                <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Try Dynamic Dashboard Profiles:
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button
                      onClick={() => applyPreset('starter')}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-kin-300 text-slate-700 font-medium text-center transition-all hover:shadow-xs"
                    >
                      🌿 Starter (3)
                    </button>
                    <button
                      onClick={() => applyPreset('all')}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-kin-300 text-slate-700 font-medium text-center transition-all hover:shadow-xs"
                    >
                      🌟 All 9 Devices
                    </button>
                    <button
                      onClick={() => applyPreset('plant_only')}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-kin-300 text-slate-700 font-medium text-center transition-all hover:shadow-xs"
                    >
                      🌱 Plant Solo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC "MY CONNECTED CARE" DASHBOARD SECTION */}
      {/* (Critically important requirement: Displays ONLY devices owned by the customer!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-kin-800">
                Personalized Hub
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Connected Care Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Dynamically showing only the products you have added to your Smart Home. Unrelated products never clutter your active command center.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              {ownedProducts.length} of 9 Devices Active
            </span>
            <Link
              to="/dashboard"
              className="text-xs font-bold text-kin-700 hover:text-kin-900 flex items-center gap-1"
            >
              <span>Full Control Hub</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Card Display */}
        {ownedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedProducts.map((product) => (
              <ActiveDeviceCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State if customer has 0 devices */
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-dashed border-slate-300 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-kin-50 text-kin-600 flex items-center justify-center mx-auto mb-4 text-3xl">
              🏡
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Your Smart Home is Ready for Devices
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              You currently do not have any active products connected. Explore the catalog below and click <strong>"Add to Home"</strong> to test how devices dynamically stream telemetry into your dashboard!
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
                Load Curated Starter Setup
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. "WHAT CAN WE MAKE SMART?" PRODUCT SELECTION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-kin-100 text-kin-800 tracking-wider uppercase">
            Product Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Can We Make Smart?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Choose exactly the IoT modules your household needs. Whether you only have a single plant or a bustling home full of pets, birds, fish, and a newborn, KinNest adapts to you.
          </p>
        </div>

        {/* 9 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCatalogCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FUTURE IOT ARCHITECTURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-kin-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          {/* Subtle circuit lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              Future Architecture Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Engineered for Real IoT Hardware Integration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This prototype provides full simulated telemetry and controls. Under the hood, the entire data model is structured for direct drop-in integration with real ESP32 microcontrollers, MQTT brokers, and physical sensors without altering the frontend interface.
            </p>
          </div>

          {/* Architecture Pipeline Diagram */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-2xl block mb-2">📱</span>
              <h4 className="font-bold text-white">1. Client Device</h4>
              <p className="text-[11px] text-slate-300 mt-1">Responsive Web / Mobile App</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-2xl block mb-2">🌐</span>
              <h4 className="font-bold text-white">2. React Core</h4>
              <p className="text-[11px] text-slate-300 mt-1">IoTContext State & WebSockets</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-2xl block mb-2">☁️</span>
              <h4 className="font-bold text-white">3. Cloud Broker</h4>
              <p className="text-[11px] text-slate-300 mt-1">MQTT 3.1.1 Broker (EMQX / HiveMQ)</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-2xl block mb-2">📡</span>
              <h4 className="font-bold text-white">4. Microcontroller</h4>
              <p className="text-[11px] text-slate-300 mt-1">ESP32 / ESP8266 Wi-Fi Nodes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 col-span-2 md:col-span-1">
              <span className="text-2xl block mb-2">⚡</span>
              <h4 className="font-bold text-white">5. Physical Actuators</h4>
              <p className="text-[11px] text-slate-300 mt-1">Pumps, Servos, Relays & Sensors</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI ASSISTANT TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-kin-50 via-teal-50 to-sky-50 rounded-3xl p-6 sm:p-8 border border-kin-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-kin-600 text-white flex items-center justify-center text-2xl shadow-md shadow-kin-600/20 shrink-0">
              🤖
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Meet KinBot: Your In-Platform AI Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl">
                Ask KinBot naturally about your plant moisture, pet meal status, front door security, or baby nursery audio levels. KinBot reads your live device telemetry instantly.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAI}
            className="px-5 py-3 rounded-2xl bg-kin-600 hover:bg-kin-700 text-white font-bold text-xs shadow-md shadow-kin-600/20 transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span>Ask KinBot Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
