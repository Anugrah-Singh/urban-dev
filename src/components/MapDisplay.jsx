import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom marker icons
const ExistingParkIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzMiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDBDMjQuODM2NiAwIDMyIDcuMTYzNDQgMzIgMTZDMzIgMjQuODM2NiAyNC44MzY2IDMyIDE2IDMyQzcuMTYzNDQgMzIgMCAyNC44MzY2IDAgMTZDMCA3LjE2MzQ0IDcuMTYzNDQgMCAxNiAwWiIgZmlsbD0iIzEwQjk4MSIvPgo8cGF0aCBkPSJNMTYgMzJMMTYgNDJIMTZaIiBzdHJva2U9IiMxMEI5ODEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTYgMTBDMTguMjA5MSAxMCAyMCAxMS43OTA5IDIwIDE0QzIwIDE2LjIwOTEgMTguMjA5MSAxOCAxNiAxOEMxMy43OTA5IDE4IDEyIDE2LjIwOTEgMTIgMTRDMTIgMTEuNzkwOSAxMy43OTA5IDEwIDE2IDEwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

const SuggestedParkIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzMiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDBDMjQuODM2NiAwIDMyIDcuMTYzNDQgMzIgMTZDMzIgMjQuODM2NiAyNC44MzY2IDMyIDE2IDMyQzcuMTYzNDQgMzIgMCAyNC44MzY2IDAgMTZDMCA3LjE2MzQ0IDcuMTYzNDQgMCAxNiAwWiIgZmlsbD0iIzAwN0JGRiIvPgo8cGF0aCBkPSJNMTYgMzJMMTYgNDJIMTZaIiBzdHJva2U9IiMwMDdCRkYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTYgOEwyMCAxNkgxMkwxNiA4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

// Animation component for markers
const AnimatedMarker = ({ position, icon, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <Marker position={position} icon={icon}>
      {children}
    </Marker>
  );
};

// Heat zones component
const HeatZones = ({ zones }) => {
  if (!zones) return null;

  return zones.map((zone, index) => {
    const color = zone.zone === 'High' ? '#ef4444' : zone.zone === 'Medium' ? '#f59e0b' : '#10b981';
    const opacity = zone.zone === 'High' ? 0.3 : zone.zone === 'Medium' ? 0.2 : 0.1;
    
    // Calculate center and radius from zone area
    const center = [
      (zone.area[0][0] + zone.area[2][0]) / 2,
      (zone.area[0][1] + zone.area[2][1]) / 2
    ];
    const radius = 500; // meters

    return (
      <Circle
        key={index}
        center={center}
        radius={radius}
        pathOptions={{
          color: color,
          fillColor: color,
          fillOpacity: opacity,
          weight: 2,
          opacity: 0.6,
        }}
      >
        <Popup>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900">Population Density</h3>
            <p className="text-sm text-gray-600">{zone.zone} Density Zone</p>
          </div>
        </Popup>
      </Circle>
    );
  });
};

// Map controls and info
const MapInfo = () => {
  const map = useMap();

  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 lg:p-4 max-w-xs lg:max-w-sm">
      <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Map Legend</h3>
      <div className="space-y-2 text-xs lg:text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"></div>
          <span>Existing Parks</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded-full"></div>
          <span>AI Suggestions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full opacity-30"></div>
          <span>High Density</span>
        </div>
      </div>
    </div>
  );
};

const MapDisplay = ({ parks, suggestedLocations, loading }) => {
  const defaultPosition = [12.9354, 77.6245]; // Centered on Koramangala
  const [mapReady, setMapReady] = useState(false);

  // Mock population density zones
  const populationZones = [
    { zone: "High", area: [[12.93, 77.62], [12.93, 77.63], [12.94, 77.63], [12.94, 77.62]] },
    { zone: "Medium", area: [[12.92, 77.61], [12.92, 77.62], [12.93, 77.62], [12.93, 77.61]] },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 lg:w-12 lg:h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm lg:text-base">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={defaultPosition} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Population density heat zones */}
        <HeatZones zones={populationZones} />
        
        {/* Existing parks */}
        {parks && parks.map((park, index) => (
          <AnimatedMarker 
            key={park.name} 
            position={park.coordinates} 
            icon={ExistingParkIcon}
            delay={index * 200}
          >
            <Popup>
              <div className="text-center min-w-48">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{park.name}</h3>
                <p className="text-sm text-green-600 font-medium">Existing Park</p>
                <p className="text-xs text-gray-500 mt-2">Serving the local community</p>
              </div>
            </Popup>
          </AnimatedMarker>
        ))}
        
        {/* AI suggested locations */}
        {suggestedLocations && suggestedLocations.map((location, index) => (
          <AnimatedMarker 
            key={location.id} 
            position={location.coordinates} 
            icon={SuggestedParkIcon}
            delay={parks ? (parks.length * 200) + (index * 300) : index * 300}
          >
            <Popup>
              <div className="text-center min-w-64 max-w-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">AI Suggestion #{location.id}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {location.size}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{location.reasoning}</p>
                <div className="text-xs text-gray-500 border-t pt-2">
                  <div className="flex justify-between">
                    <span>Land Use:</span>
                    <span className="capitalize">{location.land_use?.replace('_', ' ')}</span>
                  </div>
                </div>
                <button className="mt-3 w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </Popup>
          </AnimatedMarker>
        ))}
        
        {/* Map controls and legend */}
        <MapInfo />
      </MapContainer>
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
            <p className="text-sm text-gray-600">Analyzing urban data and generating recommendations...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
