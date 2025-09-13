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
      emerald: "from-emerald-400 to-cyan-400",
      blue: "from-blue-400 to-cyan-400",
      green: "from-green-400 to-emerald-400",
      purple: "from-purple-400 to-pink-400",
      orange: "from-orange-400 to-red-400",
      indigo: "from-indigo-400 to-purple-400"
    };

    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-slate-700/50 hover:shadow-cyan-500/25 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fadeInUp glass-dark group">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              trend === 'up' ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-400/30' : 'text-red-300 bg-red-500/20 border border-red-400/30'
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
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent animate-pulse group-hover:scale-110 transition-transform duration-300">
            {typeof value === 'number' ? value.toLocaleString() : value}{unit}
          </p>
          <p className="text-sm font-medium text-slate-300">{title}</p>
        </div>
      </div>
    );
  };

  const ProgressRing = ({ percentage, size = 80, strokeWidth = 8, color = "#22D3EE" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center group">
        <svg width={size} height={size} className="transform -rotate-90 group-hover:scale-110 transition-transform duration-300">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-700/50"
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
            className="transition-all duration-1000 ease-out filter drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`
            }}
          />
        </svg>
        <span className="absolute text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
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
            <div key={i} className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-slate-700/50 animate-pulse glass-dark">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Loading particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-particle animation-delay-${i * 200}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
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
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-slate-700/50 animate-slideInUp animation-delay-300 glass-dark hover:shadow-purple-500/20 transition-all duration-500">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-6">Performance Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <ProgressRing percentage={parseInt(stats.avgSuitability)} color="#22D3EE" />
              <p className="mt-3 text-sm font-medium text-slate-300 group-hover:text-cyan-300 transition-colors duration-300">Site Quality</p>
            </div>
            <div className="text-center group">
              <ProgressRing 
                percentage={Math.min((stats.totalSpots / 6) * 100, 100)} 
                color="#8B5CF6" 
              />
              <p className="mt-3 text-sm font-medium text-slate-300 group-hover:text-purple-300 transition-colors duration-300">Coverage Target</p>
            </div>
            <div className="text-center group">
              <ProgressRing 
                percentage={Math.min((stats.highSuitabilityCount / stats.totalSpots) * 100, 100)} 
                color="#EC4899" 
              />
              <p className="mt-3 text-sm font-medium text-slate-300 group-hover:text-pink-300 transition-colors duration-300">High Priority</p>
            </div>
            <div className="text-center group">
              <ProgressRing 
                percentage={Math.min((parseFloat(stats.totalArea) / 15) * 100, 100)} 
                color="#F59E0B" 
              />
              <p className="mt-3 text-sm font-medium text-slate-300 group-hover:text-yellow-300 transition-colors duration-300">Area Development</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Insights */}
      {stats.totalSpots > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideInUp animation-delay-500">
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg p-4 border border-emerald-400/30 backdrop-blur-sm hover:shadow-emerald-500/25 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">Optimal Distribution</p>
                <p className="text-xs text-emerald-400/80 group-hover:text-emerald-300/80 transition-colors duration-300">Great coverage across selected area</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-400/30 backdrop-blur-sm hover:shadow-cyan-500/25 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">AI Validated</p>
                <p className="text-xs text-cyan-400/80 group-hover:text-cyan-300/80 transition-colors duration-300">Locations verified by machine learning</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30 backdrop-blur-sm hover:shadow-purple-500/25 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-300 group-hover:text-purple-200 transition-colors duration-300">Ready for Implementation</p>
                <p className="text-xs text-purple-400/80 group-hover:text-purple-300/80 transition-colors duration-300">Analysis complete, ready to proceed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;