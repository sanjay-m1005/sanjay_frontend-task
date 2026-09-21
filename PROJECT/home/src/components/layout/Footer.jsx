import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Radio, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-20 pt-14 pb-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-kin-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-kin-600/20">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 3L3 10v10a1 1 0 001 1h5v-6h6v6h5a1 1 0 001-1V10l-9-7zm0 2.84L18 10.5V19h-2v-6H8v6H6v-8.5l6-4.66z"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                KinNest
              </span>
            </Link>

            <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
              <strong>One Smart Home. One Place. Complete Care.</strong> Designed with warmth for living spaces, cherished pets, verdant plants, aquatic life, and growing families.
            </p>

            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100/90 flex items-start gap-2.5 max-w-md">
              <Radio className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-bold text-emerald-950 block text-[11px]">
                  IoT Hardware Architecture Ready
                </span>
                <span className="text-[11px] text-emerald-800 leading-normal block mt-0.5">
                  Production ready for ESP32 microcontrollers, MQTT telemetry, and optocoupled relays. Seamless transition from mock telemetry to live hardware.
                </span>
              </div>
            </div>
          </div>

          {/* Living & Comfort */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Home Automation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/device/light" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>💡</span> Smart Light
                </Link>
              </li>
              <li>
                <Link to="/device/fan" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🌀</span> Smart Fan
                </Link>
              </li>
              <li>
                <Link to="/device/door" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🚪</span> Smart Door Lock
                </Link>
              </li>
            </ul>
          </div>

          {/* Pets & Nature */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Pets & Garden Care
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/device/dog" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🐶</span> Smart Dog Care
                </Link>
              </li>
              <li>
                <Link to="/device/cat" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🐱</span> Smart Cat Care
                </Link>
              </li>
              <li>
                <Link to="/device/bird" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🐦</span> Smart Bird Care
                </Link>
              </li>
              <li>
                <Link to="/device/plant" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🌱</span> Smart Plant Monitor
                </Link>
              </li>
              <li>
                <Link to="/device/fish" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🐟</span> Smart Fish Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Family & Nursery */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Nursery & Hub
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/device/baby" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>👶</span> Smart Baby Monitor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>📊</span> Dynamic Dashboard
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>🔔</span> Alert System
                </Link>
              </li>
              <li>
                <Link to="/activity" className="hover:text-kin-700 flex items-center gap-1.5">
                  <span>📋</span> Event Logs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 KinNest IoT Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Family Privacy First
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Cpu className="w-3.5 h-3.5 text-teal-600" /> ESP32 Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
