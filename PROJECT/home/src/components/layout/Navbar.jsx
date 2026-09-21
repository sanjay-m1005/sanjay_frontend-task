import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  LayoutDashboard, 
  Bell, 
  Clock, 
  Settings, 
  Menu, 
  X, 
  Radio, 
  Sparkles,
  Bot
} from 'lucide-react';
import { useIoT } from '../../context/IoTContext';
import { PRODUCTS } from '../../data/productsData';

export const Navbar = ({ onOpenAI }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ownedDeviceIds, alerts } = useIoT();
  const navigate = useNavigate();

  // Owned products for dynamic navigation pills
  const ownedProducts = PRODUCTS.filter(p => ownedDeviceIds.includes(p.id));
  const activeAlertCount = alerts.filter(a => a.severity === 'critical' || a.severity === 'warning').length;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-kin-600 text-white shadow-sm'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? 'bg-kin-600 text-white shadow-sm'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-9 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-kin-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-kin-600/20 group-hover:scale-105 transition-transform">
              {/* KinNest Leaf & Home Icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 3L3 10v10a1 1 0 001 1h5v-6h6v6h5a1 1 0 001-1V10l-9-7zm0 2.84L18 10.5V19h-2v-6H8v6H6v-8.5l6-4.66z"/>
                <circle cx="12" cy="8" r="2" fill="#d1fae5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-kin-700 transition-colors">
                  KinNest
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 block -mt-1 tracking-wide">
                Smart Home & Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              <Package className="w-4 h-4" />
              <span>Products</span>
            </NavLink>

            <NavLink to="/dashboard" className={navLinkClass}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
              {ownedDeviceIds.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-kin-100 text-kin-800 font-bold">
                  {ownedDeviceIds.length}
                </span>
              )}
            </NavLink>

            {/* DYNAMIC OWNED DEVICES QUICK ACCESS (As requested: show icons of owned devices dynamically) */}
            {ownedProducts.length > 0 && (
              <div className="flex items-center gap-1 px-1.5 py-1 bg-slate-50 border border-slate-200/60 rounded-2xl mx-1">
                {ownedProducts.slice(0, 4).map((p) => (
                  <NavLink
                    key={p.id}
                    to={`/device/${p.id}`}
                    title={`Open ${p.name}`}
                    className={({ isActive }) =>
                      `px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                        isActive
                          ? 'bg-white shadow-xs text-kin-800 border border-kin-200 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`
                    }
                  >
                    <span>{p.emoji}</span>
                    <span className="text-[11px]">{p.shortName}</span>
                  </NavLink>
                ))}
                {ownedProducts.length > 4 && (
                  <span className="text-[10px] font-semibold text-slate-400 px-1">
                    +{ownedProducts.length - 4}
                  </span>
                )}
              </div>
            )}

            <NavLink to="/alerts" className={navLinkClass}>
              <div className="relative">
                <Bell className="w-4 h-4" />
                {activeAlertCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {activeAlertCount}
                  </span>
                )}
              </div>
              <span>Alerts</span>
            </NavLink>

            <NavLink to="/activity" className={navLinkClass}>
              <Clock className="w-4 h-4" />
              <span>Activity</span>
            </NavLink>

            <NavLink to="/settings" className={navLinkClass}>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAI}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-kin-500 to-teal-500 hover:from-kin-600 hover:to-teal-600 text-white shadow-md shadow-kin-500/20 transition-all active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/products" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <Package className="w-5 h-5" />
            <span>Products Catalog</span>
          </NavLink>

          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dynamic Dashboard ({ownedDeviceIds.length} Devices)</span>
          </NavLink>

          {/* Mobile Owned Devices List */}
          {ownedProducts.length > 0 && (
            <div className="py-2 pl-4 border-l-2 border-kin-200 my-2 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-1">
                Your Active Devices
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {ownedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/device/${p.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-kin-50 text-xs font-semibold text-slate-800"
                  >
                    <span>{p.emoji}</span>
                    <span className="truncate">{p.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <NavLink to="/alerts" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <div className="relative">
              <Bell className="w-5 h-5" />
              {activeAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
              )}
            </div>
            <span>Alerts & Notifications {activeAlertCount > 0 && `(${activeAlertCount})`}</span>
          </NavLink>

          <NavLink to="/activity" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <Clock className="w-5 h-5" />
            <span>Activity History</span>
          </NavLink>

          <NavLink to="/settings" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <Settings className="w-5 h-5" />
            <span>Settings & Presets</span>
          </NavLink>
        </div>
      )}
    </header>
  );
};
