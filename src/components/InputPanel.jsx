import React, { useState } from 'react';
import AdvancedFilters from './AdvancedFilters';

const InputPanel = ({ onAnalyze }) => {
  const [city, setCity] = useState('Bangalore');
  const [neighborhood, setNeighborhood] = useState('Koramangala');
  const [query, setQuery] = useState('Find the best spots for new parks');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const neighborhoods = [
    'Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 
    'Electronic City', 'HSR Layout'
  ];

  const queryTemplates = [
    "Find the best spots for new parks",
    "Identify areas lacking green spaces",
    "Locate optimal zones for pocket parks",
    "Find high-density areas needing parks",
    "Suggest locations for community gardens",
    "Find sports-focused park locations",
    "Identify eco-friendly park opportunities",
    "Locate family-friendly park spaces"
  ];

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await onAnalyze({ 
        city, 
        neighborhood, 
        query,
        filters: activeFilters
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setQuery(template);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const getActiveFilterCount = () => {
    if (!activeFilters) return 0;
    return (activeFilters.neighborhoods?.length || 0) + 
           (activeFilters.parkTypes?.length || 0) + 
           (activeFilters.suitability?.length || 0) +
           (activeFilters.accessibility ? 1 : 0) +
           (activeFilters.sustainability ? 1 : 0) +
           Object.values(activeFilters.proximity || {}).filter(Boolean).length;
  };

  return (
    <div className="bg-gradient-to-b from-slate-900/95 to-slate-800/95 border-r border-purple-500/20 h-full flex flex-col backdrop-blur-xl">
      {/* Panel Header */}
      <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="flex items-center space-x-3 mb-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
            <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Analysis Center</h2>
        </div>
        <p className="text-slate-400 text-sm font-medium">Configure your urban planning analysis parameters</p>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Location Selection */}
        <div className="space-y-4 animate-fadeInUp">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Location</span>
          </h3>
          
          <div className="space-y-4">
            <div className="group">
              <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-cyan-400 transition-colors">City</label>
              <div className="relative">
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-base border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-800/50 text-white transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/50"
                >
                  <option className="bg-slate-800 text-white">Bangalore</option>
                  <option className="bg-slate-800 text-white">Mumbai</option>
                  <option className="bg-slate-800 text-white">Delhi</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-cyan-400 transition-colors">Neighborhood</label>
              <div className="relative">
                <select
                  id="neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-base border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-800/50 text-white transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/50"
                >
                  <option className="bg-slate-800 text-white">Koramangala</option>
                  <option className="bg-slate-800 text-white">Indiranagar</option>
                  <option className="bg-slate-800 text-white">Whitefield</option>
                  <option className="bg-slate-800 text-white">Jayanagar</option>
                  <option className="bg-slate-800 text-white">Electronic City</option>
                  <option className="bg-slate-800 text-white">HSR Layout</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Query Templates */}
        <div className="space-y-3 animate-fadeInUp animation-delay-200">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>Quick Templates</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {queryTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className={`text-left p-3 rounded-lg border text-sm transition-all duration-300 transform hover:scale-105 ${
                  query === template
                    ? 'border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 text-cyan-300 shadow-lg shadow-cyan-500/25'
                    : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:border-cyan-500/30 hover:bg-slate-700/30 backdrop-blur-sm'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Query */}
        <div className="space-y-3 animate-fadeInUp animation-delay-400">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Custom Query</span>
          </h3>
          <div className="group">
            <label htmlFor="query" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-cyan-400 transition-colors">Describe your analysis needs</label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 text-base border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all duration-300 bg-slate-800/50 text-white placeholder-slate-400 backdrop-blur-sm hover:bg-slate-700/50"
              placeholder="Enter your analysis requirements in natural language..."
            />
            <p className="mt-2 text-xs text-slate-400">
              Use natural language to describe what you're looking for. The AI will understand and analyze accordingly.
            </p>
          </div>
        </div>

        {/* Advanced Filters Button */}
        <div className="space-y-3 animate-fadeInUp animation-delay-600">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <span>Advanced Options</span>
          </h3>
          <button
            onClick={() => setShowAdvancedFilters(true)}
            className={`w-full p-3 border rounded-lg transition-all duration-300 group transform hover:scale-105 ${
              getActiveFilterCount() > 0 
                ? 'bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/50 shadow-lg shadow-cyan-500/25' 
                : 'bg-slate-800/30 border-slate-600 hover:bg-slate-700/30 hover:border-cyan-500/30 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <div className="text-left">
                  <div className="font-medium text-blue-800">Advanced Filters</div>
                  <div className="text-xs text-blue-600">Customize search parameters</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getActiveFilterCount() > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
                <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <button
          onClick={handleAnalyze}
          disabled={!query.trim() || isAnalyzing}
          className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 transform hover:scale-105 ${
            !query.trim() || isAnalyzing
              ? 'bg-slate-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-2xl hover:shadow-cyan-500/25 border border-white/20 backdrop-blur-sm'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 group">
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span>Start AI Analysis</span>
            </div>
          )}
        </button>
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isVisible={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        neighborhoods={neighborhoods}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default InputPanel;
