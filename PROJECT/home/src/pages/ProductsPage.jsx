import React, { useState } from 'react';
import { Search, Filter, Radio, Sparkles, Check } from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { CATEGORIES } from '../data/productsData';
import { ProductCatalogCard } from '../components/cards/ProductCatalogCard';

export const ProductsPage = () => {
  const { products, ownedDeviceIds } = useIoT();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-kin-100 text-kin-800 tracking-wider uppercase inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-kin-600" />
          <span>Full IoT Hardware Catalog</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Smart Devices for Every Life You Care For
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every device functions autonomously or as an integrated harmony inside your KinNest hub. Add any number of products to your home to instantly unlock live telemetry and controls.
        </p>

        {/* Global IoT Prototype Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium mt-2">
          <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
          <span>Notice: Current models feature interactive simulated telemetry. Physical ESP32 hardware release is underway.</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-kin-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lights, fan, dog, plant..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-kin-400/50"
          />
        </div>
      </div>

      {/* Active Count / Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> of 9 products</span>
        <span>
          <strong>{ownedDeviceIds.length}</strong> products currently in your Smart Home
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCatalogCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">No products found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
