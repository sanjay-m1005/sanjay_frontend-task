import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IoTProvider } from './context/IoTContext';
import { DemoBar } from './components/layout/DemoBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeviceDetailPage } from './pages/DeviceDetailPage';
import { ActivityPage } from './pages/ActivityPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AIAssistantModal } from './components/assistant/AIAssistantModal';
import { NotificationToast } from './components/alerts/NotificationToast';

export function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <IoTProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-slate-800 font-sans selection:bg-kin-200 selection:text-kin-900">
          {/* Top Prototype Testing Preset Bar */}
          <DemoBar />

          {/* Dynamic Navigation Bar */}
          <Navbar onOpenAI={() => setIsAIOpen(true)} />

          {/* Main Router Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenAI={() => setIsAIOpen(true)} />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/device/:deviceId" element={<DeviceDetailPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Brand Footer */}
          <Footer />

          {/* Floating AI Assistant Trigger Button (Bottom-Right) */}
          <aside aria-label="AI Assistant Trigger" className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsAIOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-kin-600 via-emerald-600 to-teal-600 hover:from-kin-700 hover:to-teal-700 text-white shadow-xl shadow-kin-600/30 transition-all duration-300 active:scale-95 border-2 border-white/60"
              aria-label="Open KinBot AI Assistant"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                🤖
              </div>
              <div className="text-left hidden sm:block pr-1">
                <span className="block text-xs font-extrabold leading-tight">KinBot AI</span>
                <span className="block text-[10px] text-emerald-200 leading-tight">Ask about devices</span>
              </div>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
            </button>
          </aside>

          {/* AI Assistant Chatbot Modal */}
          <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

          {/* Action Toasts */}
          <NotificationToast />
        </div>
      </HashRouter>
    </IoTProvider>
  );
}

export default App;
