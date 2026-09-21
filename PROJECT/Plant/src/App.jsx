import React, { useState } from 'react';
import { IoTProvider } from './context/IoTContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickSimBar } from './components/layout/QuickSimBar';
import { HomeOverview } from './views/HomeOverview';
import { PlantDashboard } from './views/PlantDashboard';
import { MyProjectsView } from './views/MyProjectsView';
import { ProjectDetailsView } from './views/ProjectDetailsView';
import { FutureProjectsView } from './views/FutureProjectsView';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard'); // default to the primary showcase: Smart Plant Dashboard
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'home' && (
          <HomeOverview setActiveTab={setActiveTab} />
        )}

        {activeTab === 'dashboard' && (
          <PlantDashboard 
            onNavigateToDetails={() => setActiveTab('details')} 
          />
        )}

        {activeTab === 'projects' && (
          <MyProjectsView 
            setActiveTab={setActiveTab} 
            setSelectedProject={setSelectedProject} 
          />
        )}

        {activeTab === 'details' && (
          <ProjectDetailsView 
            setActiveTab={setActiveTab} 
            selectedProject={selectedProject}
          />
        )}

        {activeTab === 'future' && (
          <FutureProjectsView 
            setActiveTab={setActiveTab} 
          />
        )}
      </main>

      {/* Floating Hardware Simulation & Live Testing Drawer */}
      <QuickSimBar />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <IoTProvider>
      <AppContent />
    </IoTProvider>
  );
}
