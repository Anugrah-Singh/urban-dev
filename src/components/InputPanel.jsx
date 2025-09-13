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
    <div className="bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Analysis Center</h2>
        </div>
        <p className="text-gray-600 text-sm">Configure your urban planning analysis parameters</p>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Location Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Location</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <div className="relative">
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-colors"
                >
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
              <div className="relative">
                <select
                  id="neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-colors"
                >
                  <option>Koramangala</option>
                  <option>Indiranagar</option>
                  <option>Whitefield</option>
                  <option>Jayanagar</option>
                  <option>Electronic City</option>
                  <option>HSR Layout</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Query Templates */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Quick Templates</h3>
          <div className="grid grid-cols-1 gap-2">
            {queryTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className={`text-left p-3 rounded-lg border text-sm transition-all duration-200 ${
                  query === template
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-25'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Query */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Custom Query</h3>
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">Describe your analysis needs</label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-colors"
              placeholder="Enter your analysis requirements in natural language..."
            />
            <p className="mt-2 text-xs text-gray-500">
              Use natural language to describe what you're looking for. The AI will understand and analyze accordingly.
            </p>
          </div>
        </div>

        {/* Advanced Filters Button */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Advanced Options</h3>
          <button
            onClick={() => setShowAdvancedFilters(true)}
            className="w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group"
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
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleAnalyze}
          disabled={!query.trim() || isAnalyzing}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            !query.trim() || isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span>Start AI Analysis</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
