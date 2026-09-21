import React, { useState } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Layers, 
  Cpu, 
  Compass, 
  Wifi, 
  Menu, 
  X, 
  ChevronDown,
  Activity,
  Home
} from 'lucide-react';
import { useIoT } from '../../context/IoTContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const { deviceOnline } = useIoT();

  const navItems = [
    { id: 'home', label: 'Home / Overview', icon: Home },
    { id: 'dashboard', label: 'Smart Plant Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'My IoT Projects', icon: Layers },
    { id: 'details', label: 'Project Details', icon: Cpu },
    { id: 'future', label: 'Future Projects', icon: Compass },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Project Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight block leading-tight">
                  FloraPulse<span className="text-emerald-600">.IoT</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                  Central IoT Platform
                </span>
              </div>
            </button>

            {/* Project Switcher Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Project #1: Smart Plant Monitoring</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {projectDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-soft-lg border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5">Switch Active Project</div>
                  
                  <button 
                    onClick={() => { setActiveTab('dashboard'); setProjectDropdownOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl bg-emerald-50/80 text-emerald-900 flex items-center justify-between text-xs font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Smart Plant Monitoring</span>
                    </div>
                    <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Active</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab('projects'); setProjectDropdownOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 flex items-center justify-between text-xs font-medium mt-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Precision Drip Network</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Prototype</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab('projects'); setProjectDropdownOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 flex items-center justify-between text-xs font-medium mt-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      <span>Hydroponics Tower Hub</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Dev</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Pill & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>ESP32 Online (Wi-Fi)</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-soft-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase px-2 mb-1">Navigation</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ESP32 Firmware v2.4
            </span>
            <span className="font-semibold text-emerald-600">MQTT Connected</span>
          </div>
        </div>
      )}
    </header>
  );
};
