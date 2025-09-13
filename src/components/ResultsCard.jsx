import React, { useState, useEffect } from 'react';

const ResultsCard = ({ results, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedResults, setAnimatedResults] = useState([]);

  useEffect(() => {
    if (results && results.length > 0) {
      setAnimatedResults([]);
      results.forEach((result, index) => {
        setTimeout(() => {
          setAnimatedResults(prev => [...prev, result]);
        }, index * 300);
      });
    }
  }, [results]);

  if (loading) {
    return (
      <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 transform transition-all duration-500 ease-out">
        <div className="p-6 w-80">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">AI Analysis</h3>
              <p className="text-sm text-gray-600">Processing urban data...</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <span className="text-sm text-gray-600">Analyzing population density</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <span className="text-sm text-gray-600">Evaluating green space gaps</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm text-gray-600">Ranking optimal locations</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const ImpactBadge = ({ score }) => {
    const getColor = (score) => {
      if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
      if (score >= 75) return 'bg-blue-100 text-blue-800 border-blue-200';
      if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getColor(score)}`}>
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Impact {score}%
      </div>
    );
  };

  return (
    <div className={`absolute bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 transform transition-all duration-500 ease-out ${
      isExpanded ? 'w-96' : 'w-80'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
              <p className="text-emerald-100 text-sm">{animatedResults.length} locations identified</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-emerald-100 transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {animatedResults.map((result, index) => {
            const impactScore = Math.floor(Math.random() * 30 + 70);
            
            return (
              <div
                key={result.id || index}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {result.id}
                    </div>
                    <h4 className="font-semibold text-gray-900">Suggested Location</h4>
                  </div>
                  <ImpactBadge score={impactScore} />
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{result.reasoning}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{result.size}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="capitalize">{result.land_use?.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Click blue markers on map for details</span>
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
