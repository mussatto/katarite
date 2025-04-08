import React from 'react';
import { useGame } from '../state/gameContext';
import worldMapData, { WorldMapLocation } from '../data/worldData';
import areaData from '../data/areaData';

const WorldMapView: React.FC = () => {
  const { state, dispatch } = useGame();
  
  // Handle clicking on a location
  const handleLocationClick = (location: WorldMapLocation) => {
    if (!location.unlocked) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: `${location.name} is locked. You need to discover it first.`,
          type: 'system'
        }
      });
      return;
    }
    
    const area = areaData[location.id];
    if (!area) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: `Error: Cannot find area data for ${location.name}.`,
          type: 'system'
        }
      });
      return;
    }
    
    // Set player location
    dispatch({
      type: 'SET_LOCATION',
      payload: {
        areaId: location.id,
        roomId: area.entryPoint.roomId,
        x: area.entryPoint.x,
        y: area.entryPoint.y
      }
    });
    
    // Change view to area map
    dispatch({ type: 'SET_VIEW', payload: 'AREA_MAP_VIEW' });
    
    // Add log message
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: `You have entered ${location.name}.`,
        type: 'system'
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <div className="bg-base-100 p-4 shadow-md">
        <h1 className="text-2xl font-bold">World Map</h1>
        <div className="flex justify-between">
          <div>
            <span className="font-bold">{state.player.name}</span> • 
            <span className="text-warning ml-2">Gold: {state.player.gold}</span>
          </div>
          <button 
            className="btn btn-sm"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'INVENTORY_VIEW' })}
          >
            Inventory
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 h-full">
          <div className="relative w-full h-full min-h-[500px] bg-blue-900/20 rounded-lg border-2 border-base-content/20">
            {/* Map locations */}
            {Object.values(worldMapData).map((location) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  location.unlocked 
                    ? 'cursor-pointer hover:scale-110 transition-transform' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ 
                  left: `${location.position.x * 10}%`, 
                  top: `${location.position.y * 10}%` 
                }}
                onClick={() => handleLocationClick(location)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getLocationColor(location.type)}`}>
                  {getLocationIcon(location.type)}
                </div>
                <div className="mt-2 text-center font-bold text-sm">
                  {location.name}
                </div>
                {!location.unlocked && <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>}
              </div>
            ))}
            
            {/* Player marker */}
            {state.player.currentAreaId && (
              <div 
                className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white animate-pulse"
                style={{ 
                  left: `${worldMapData[state.player.currentAreaId]?.position.x * 10}%`, 
                  top: `${worldMapData[state.player.currentAreaId]?.position.y * 10}%` 
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Message log */}
      <div className="bg-base-100 p-4 shadow-inner max-h-40 overflow-y-auto">
        <h3 className="font-bold mb-2">Message Log</h3>
        <div className="space-y-1">
          {state.messageLog.map((message) => (
            <div key={message.id} className={getMessageClass(message.type)}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getLocationColor = (type: string): string => {
  switch (type) {
    case 'town':
      return 'bg-emerald-700';
    case 'dungeon':
      return 'bg-red-900';
    case 'wilderness':
      return 'bg-amber-700';
    default:
      return 'bg-gray-700';
  }
};

const getLocationIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'town':
      return <span className="text-2xl">🏠</span>;
    case 'dungeon':
      return <span className="text-2xl">🏰</span>;
    case 'wilderness':
      return <span className="text-2xl">🌲</span>;
    default:
      return <span className="text-2xl">❓</span>;
  }
};

const getMessageClass = (type: string): string => {
  switch (type) {
    case 'system':
      return 'text-base-content';
    case 'combat':
      return 'text-error';
    case 'dialogue':
      return 'text-info';
    default:
      return 'text-base-content';
  }
};

export default WorldMapView; 