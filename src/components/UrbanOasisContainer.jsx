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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <StatsDashboard results={results} loading={loading} />
        </div>

        <div className="flex flex-1">
          <div className="w-1/4 min-w-80 max-w-sm border-r border-gray-200">
            <InputPanel onAnalyze={handleAnalyze} />
            
            {error && (
              <div className="m-4 p-4 bg-red-50 border-l-4 border-red-400 rounded animate-slideInLeft">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {analysisComplete && !error && (
              <div className="m-4 p-4 bg-green-50 border-l-4 border-green-400 rounded animate-slideInLeft">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">Analysis completed successfully! Check the map for AI recommendations.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="w-3/4 relative bg-white shadow-inner">
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
