import React, { useState } from 'react';

const AdvancedFilters = ({ onFilterChange, neighborhoods, isVisible, onClose }) => {
  const [filters, setFilters] = useState({
    neighborhoods: [],
    parkTypes: [],
    suitability: [],
    budgetRange: { min: 0, max: 500000 },
    areaSize: { min: 0, max: 10 },
    accessibility: false,
    sustainability: false,
    proximity: { schools: false, residential: false, transport: false }
  });

  const parkTypes = [
    'Community Garden', 'Children\'s Playground', 'Sports Complex',
    'Central Park', 'Botanical Garden', 'Heritage Garden',
    'Lake Garden', 'Residential Park', 'Corporate Campus'
  ];

  const suitabilityLevels = ['High', 'Medium', 'Low'];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters };
    
    if (category === 'neighborhoods' || category === 'parkTypes' || category === 'suitability') {
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
    } else if (category === 'budgetRange' || category === 'areaSize') {
      newFilters[category] = value;
    } else if (category.startsWith('proximity.')) {
      const proximityKey = category.split('.')[1];
      newFilters.proximity[proximityKey] = value;
    } else {
      newFilters[category] = value;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      neighborhoods: [],
      parkTypes: [],
      suitability: [],
      budgetRange: { min: 0, max: 500000 },
      areaSize: { min: 0, max: 10 },
      accessibility: false,
      sustainability: false,
      proximity: { schools: false, residential: false, transport: false }
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return filters.neighborhoods.length + 
           filters.parkTypes.length + 
           filters.suitability.length +
           (filters.accessibility ? 1 : 0) +
           (filters.sustainability ? 1 : 0) +
           Object.values(filters.proximity).filter(Boolean).length;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
              <p className="text-gray-600 mt-1">Customize your urban planning search</p>
            </div>
            <div className="flex items-center space-x-4">
              {getActiveFilterCount() > 0 && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getActiveFilterCount()} filters active
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Location Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📍 Location Filters
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {neighborhoods.map((neighborhood) => (
                <label key={neighborhood} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.neighborhoods.includes(neighborhood)}
                    onChange={(e) => handleFilterChange('neighborhoods', neighborhood)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{neighborhood}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Park Type Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              🏞️ Park Type Filters
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {parkTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.parkTypes.includes(type)}
                    onChange={(e) => handleFilterChange('parkTypes', type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority/Suitability Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              ⭐ Priority Level
            </h3>
            <div className="flex space-x-6">
              {suitabilityLevels.map((level) => (
                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.suitability.includes(level)}
                    onChange={(e) => handleFilterChange('suitability', level)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm font-medium ${
                    level === 'High' ? 'text-green-700' :
                    level === 'Medium' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {level} Priority
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              💰 Budget Range
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Budget ($)
                </label>
                <input
                  type="number"
                  value={filters.budgetRange.min}
                  onChange={(e) => handleFilterChange('budgetRange', {
                    ...filters.budgetRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Budget ($)
                </label>
                <input
                  type="number"
                  value={filters.budgetRange.max}
                  onChange={(e) => handleFilterChange('budgetRange', {
                    ...filters.budgetRange,
                    max: parseInt(e.target.value) || 500000
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="500000"
                />
              </div>
            </div>
          </div>

          {/* Area Size */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📏 Area Size (acres)
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Size
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={filters.areaSize.min}
                  onChange={(e) => handleFilterChange('areaSize', {
                    ...filters.areaSize,
                    min: parseFloat(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Size
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={filters.areaSize.max}
                  onChange={(e) => handleFilterChange('areaSize', {
                    ...filters.areaSize,
                    max: parseFloat(e.target.value) || 10
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              ♿ Special Requirements
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.accessibility}
                  onChange={(e) => handleFilterChange('accessibility', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Accessibility Features Required</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sustainability}
                  onChange={(e) => handleFilterChange('sustainability', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Sustainable/Eco-Friendly Design</span>
              </label>
            </div>
          </div>

          {/* Proximity Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📍 Proximity Requirements
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.proximity.schools}
                  onChange={(e) => handleFilterChange('proximity.schools', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Near Schools</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.proximity.residential}
                  onChange={(e) => handleFilterChange('proximity.residential', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Near Residential Areas</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.proximity.transport}
                  onChange={(e) => handleFilterChange('proximity.transport', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Near Public Transport</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Clear All Filters
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md"
              >
                Apply Filters ({getActiveFilterCount()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;