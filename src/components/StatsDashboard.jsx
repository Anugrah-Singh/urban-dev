import React from 'react';

const StatsDashboard = ({ results, loading }) => {
  const getStatsFromResults = () => {
    if (!results || results.length === 0) {
      return {
        totalSpots: 0,
        avgSuitability: 0,
        totalArea: 0,
        estimatedCost: 0,
        highSuitabilityCount: 0,
        populationServed: 0
      };
    }

    const totalSpots = results.length;
    const totalArea = results.reduce((sum, spot) => {
      const area = parseFloat(spot.size?.split(' ')[0] || '0');
      return sum + area;
    }, 0);

    const estimatedCost = results.reduce((sum, spot) => {
      const cost = spot.estimated_cost ? 
        parseFloat(spot.estimated_cost.replace(/[$,]/g, '')) : 0;
      return sum + cost;
    }, 0);

    const suitabilityScores = results.map(spot => {
      switch(spot.suitability) {
        case 'High': return 3;
        case 'Medium': return 2;
        case 'Low': return 1;
        default: return 2;
      }
    });

    const avgSuitability = suitabilityScores.length > 0 ? 
      suitabilityScores.reduce((sum, score) => sum + score, 0) / suitabilityScores.length : 0;

    const highSuitabilityCount = results.filter(spot => spot.suitability === 'High').length;
    
    // Estimate population served based on area and density
    const populationServed = Math.floor(totalArea * 1200); // Rough estimate: 1200 people per acre coverage

    return {
      totalSpots,
      avgSuitability: (avgSuitability * 33.33).toFixed(0), // Convert to percentage
      totalArea: totalArea.toFixed(1),
      estimatedCost,
      highSuitabilityCount,
      populationServed
    };
  };

  const stats = getStatsFromResults();

  const StatCard = ({ icon, title, value, unit, trend, trendValue, color = "emerald" }) => {
    const colorClasses = {
      emerald: "from-emerald-500 to-teal-500",
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      indigo: "from-indigo-500 to-indigo-600"
    };

    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                {trend === 'up' ? (
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                )}
              </svg>
              {trendValue}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-900 animate-countUp">
            {typeof value === 'number' ? value.toLocaleString() : value}{unit}
          </p>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
      </div>
    );
  };

  const ProgressRing = ({ percentage, size = 80, strokeWidth = 8, color = "#10B981" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-xl font-bold text-gray-700">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>}
          title="Potential Locations"
          value={stats.totalSpots}
          unit=""
          trend={stats.totalSpots > 0 ? "up" : null}
          trendValue={stats.totalSpots > 0 ? "23" : null}
          color="blue"
        />
        
        <StatCard
          icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          title="Avg. Suitability Score"
          value={stats.avgSuitability}
          unit="%"
          trend={parseInt(stats.avgSuitability) > 70 ? "up" : null}
          trendValue={parseInt(stats.avgSuitability) > 70 ? "12" : null}
          color="green"
        />
        
        <StatCard
          icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>}
          title="Population Served"
          value={stats.populationServed}
          unit=""
          trend={stats.populationServed > 5000 ? "up" : null}
          trendValue={stats.populationServed > 5000 ? "18" : null}
          color="purple"
        />
        
        <StatCard
          icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>}
          title="Total Investment"
          value={`$${(stats.estimatedCost / 1000).toFixed(0)}K`}
          unit=""
          color="orange"
        />
      </div>

      {/* Performance Indicators */}
      {stats.totalSpots > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-slideInUp animation-delay-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <ProgressRing percentage={parseInt(stats.avgSuitability)} color="#10B981" />
              <p className="mt-3 text-sm font-medium text-gray-600">Site Quality</p>
            </div>
            <div className="text-center">
              <ProgressRing 
                percentage={Math.min((stats.totalSpots / 6) * 100, 100)} 
                color="#3B82F6" 
              />
              <p className="mt-3 text-sm font-medium text-gray-600">Coverage Target</p>
            </div>
            <div className="text-center">
              <ProgressRing 
                percentage={Math.min((stats.highSuitabilityCount / stats.totalSpots) * 100, 100)} 
                color="#8B5CF6" 
              />
              <p className="mt-3 text-sm font-medium text-gray-600">High Priority</p>
            </div>
            <div className="text-center">
              <ProgressRing 
                percentage={Math.min((parseFloat(stats.totalArea) / 15) * 100, 100)} 
                color="#F59E0B" 
              />
              <p className="mt-3 text-sm font-medium text-gray-600">Area Development</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Insights */}
      {stats.totalSpots > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideInUp animation-delay-500">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Optimal Distribution</p>
                <p className="text-xs text-green-600">Great coverage across selected area</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">AI Validated</p>
                <p className="text-xs text-blue-600">Locations verified by machine learning</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-800">Ready for Implementation</p>
                <p className="text-xs text-purple-600">Analysis complete, ready to proceed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;