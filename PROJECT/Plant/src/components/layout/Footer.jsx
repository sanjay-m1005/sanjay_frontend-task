import React from 'react';
import { Sprout, Heart, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-soft">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                FloraPulse<span className="text-emerald-600">.IoT</span> Platform
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A modern, modular, enterprise-grade IoT platform built to scale across multiple microcontrollers, sensor nodes, and automated actuators. Designed with botanical health algorithms and fail-safe automation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ESP32 Ready • MQTT Bridge • Open Architecture</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Platform Navigation</span>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-600 transition-colors">
                  Overview & Stats
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-600 transition-colors">
                  Smart Plant Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-600 transition-colors">
                  My IoT Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('details')} className="hover:text-emerald-600 transition-colors">
                  Hardware & Wiring
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('future')} className="hover:text-emerald-600 transition-colors">
                  Roadmap & Proposals
                </button>
              </li>
            </ul>
          </div>

          {/* Hardware & Tech */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">IoT Specs</span>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>MCU:</span>
                <span className="font-semibold text-slate-700">ESP32 240MHz</span>
              </div>
              <div className="flex justify-between">
                <span>Moisture Sensor:</span>
                <span className="font-semibold text-slate-700">Capacitive v1.2</span>
              </div>
              <div className="flex justify-between">
                <span>Climate:</span>
                <span className="font-semibold text-slate-700">DHT22 Digital</span>
              </div>
              <div className="flex justify-between">
                <span>Pump Relay:</span>
                <span className="font-semibold text-slate-700">5V Optocoupled</span>
              </div>
              <div className="flex justify-between">
                <span>Data Frequency:</span>
                <span className="font-semibold text-slate-700">1000ms Realtime</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} FloraPulse IoT Platform. Modern, clean, and scalable architecture.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Fail-safe dry-run protection active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
