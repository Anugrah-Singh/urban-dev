import React, { useState } from 'react';
import Header from './Header';
import StatsDashboard from './StatsDashboard';
import MapDisplay from './MapDisplay';
import InputPanel from './InputPanel';
import ResultsCard from './ResultsCard';
import Footer from './Footer';
import { bangaloreData } from '../data/bangaloreData';
import urbanOasisAgent from '../agent/urbanOasisAgent';

const UrbanOasisContainer = () => {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Koramangala');

  const handleAnalyze = async (userInput) => {
    setLoading(true);
    setResults(null);
    setSuggestedLocations([]);
    setError(null);
    setAnalysisComplete(false);

    try {
      console.log('Starting analysis with input:', userInput);
      
      // Simulate analysis steps for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await urbanOasisAgent.invoke({
        userInput,
        neighborhoodData: bangaloreData[userInput.neighborhood],
      });

      setSelectedNeighborhood(userInput.neighborhood);

      console.log('Agent result:', result);
      const finalResponse = result.finalResponse || [];
      
      // Add staggered animation for results
      setSuggestedLocations([]);
      for (let i = 0; i < finalResponse.length; i++) {
        setTimeout(() => {
          setSuggestedLocations(prev => [...prev, finalResponse[i]]);
        }, i * 500);
      }
      
      setResults(finalResponse);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error invoking agent:", error);
      setError("Failed to analyze data. Please check your API key and try again.");
      
      // Provide fallback data
      const fallbackData = bangaloreData[userInput.neighborhood].potential_lots.slice(0, 3).map((lot, index) => ({
        ...lot,
        reasoning: `Potential location ${index + 1} for park development based on available space and community needs.`
      }));
      
      setSuggestedLocations(fallbackData);
      setResults(fallbackData);
      setAnalysisComplete(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col urban-main-container relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="container-responsive py-4 lg:py-6">
          <StatsDashboard results={results} loading={loading} />
        </div>

        <div className="flex flex-1 h-[calc(100vh-200px)]">
          {/* Sidebar - Dark glass morphism */}
          <div className="urban-sidebar flex-shrink-0 border-r border-white/10 overflow-y-auto custom-scrollbar backdrop-blur-xl bg-black/20 shadow-2xl">
            <InputPanel onAnalyze={handleAnalyze} />
            
            {error && (
              <div className="m-4 p-4 bg-red-900/30 border border-red-500/50 rounded-xl animate-slideInLeft backdrop-blur-sm shadow-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {analysisComplete && !error && (
              <div className="m-4 p-4 bg-green-900/30 border border-green-500/50 rounded-xl animate-slideInLeft backdrop-blur-sm shadow-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-200">Analysis completed successfully! Check the map for AI recommendations.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Main content area - Dark with glow effects */}
          <div className="flex-1 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-inner overflow-hidden urban-map-container backdrop-blur-sm border-l border-white/5">
            <MapDisplay
              parks={bangaloreData[selectedNeighborhood]?.existing_parks || []}
              suggestedLocations={suggestedLocations}
              loading={loading}
              selectedNeighborhood={selectedNeighborhood}
            />
            <ResultsCard results={results} loading={loading} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UrbanOasisContainer;
