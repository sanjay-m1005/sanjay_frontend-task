import React, { useState } from 'react';
import { IOT_PROJECTS } from '../services/projectsData';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Layers, Plus, Search, Filter, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export const MyProjectsView = ({ setActiveTab, setSelectedProject }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter logic
  const filteredProjects = IOT_PROJECTS.filter((p) => {
    const matchesFilter = 
      filter === 'All' ? true : p.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hardware.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleSelectProject = (project) => {
    if (project.id === 'smart-plant') {
      setActiveTab('dashboard');
    } else {
      setSelectedProject(project);
      setActiveTab('details');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header with Title & Add Project Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-emerald-600">IoT Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My IoT Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centralized hub for all your connected hardware systems, prototypes, and future sensor deployments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft hover:shadow-glow-emerald transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Register New IoT Project</span>
        </button>
      </div>

      {/* Filter Tabs & Search Box */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pill Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/60 overflow-x-auto">
          {['All', 'Active', 'Prototype', 'In Development', 'Upcoming'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === cat
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by project or hardware..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-soft-sm"
          />
        </div>
      </div>

      {/* Projects Grid using Reusable ProjectCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActiveProject={project.id === 'smart-plant'}
            onSelect={handleSelectProject}
          />
        ))}

        {/* Empty State / Add Placeholder Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="card-elevated rounded-3xl p-6 bg-slate-50/60 border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 group min-h-[300px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-soft text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 flex items-center justify-center transition-all mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
            Add Another IoT Project
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
            Easily expand this platform with Smart Home, Weather Station, or Aquaculture systems without modifying the layout.
          </p>
          <span className="mt-4 text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:underline">
            <span>Configure New Node</span>
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Modal for adding new IoT Project (Form mockup) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-soft-lg border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Add New IoT Project</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Define your microcontroller hardware, communication protocol, and telemetry channels. The platform will automatically generate a dedicated dashboard card.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Smart Greenhouse Climate Hub"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Microcontroller / Device</label>
                <input
                  type="text"
                  placeholder="e.g. ESP32 / Raspberry Pi Pico / Arduino"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Communication Protocol</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white">
                  <option>MQTT (Pub/Sub)</option>
                  <option>WebSockets (Real-time duplex)</option>
                  <option>HTTP REST API</option>
                  <option>LoRaWAN (Long-range)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px]">
                💡 <strong>Scalable Architecture:</strong> The codebase is structured with modular context and service handlers (`services/projectsData.js`), allowing instant backend binding with zero UI redesign.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Demo Project Registered! You can configure actual ESP32 connection in Project Details.');
                  setShowAddModal(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-soft"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
