import React from 'react';
import './App.css';
import { GameProvider, useGame } from './state/gameContext';
import StartScreen from './views/StartScreen';
import WorldMapView from './views/WorldMapView';
import AreaMapView from './views/AreaMapView';
import InventoryView from './views/InventoryView';
import ShopView from './views/ShopView';

// Main game component that will show different views based on the game state
const GameContent: React.FC = () => {
  const { state } = useGame();
  
  // Render different views based on the current game view state
  switch (state.view) {
    case 'START_SCREEN':
      return <StartScreen />;
    case 'WORLD_MAP_VIEW':
      return <WorldMapView />;
    case 'AREA_MAP_VIEW':
      return <AreaMapView />;
    case 'INVENTORY_VIEW':
      return <InventoryView />;
    case 'SHOP_VIEW':
      return <ShopView />;
    case 'GAME_OVER_SCREEN':
      return (
        <div className="min-h-screen bg-base-300 flex items-center justify-center">
          <div className="bg-base-100 p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-6 text-error">Game Over</h1>
            <p className="mb-6">Your adventure has come to an end.</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Return to Start
            </button>
          </div>
        </div>
      );
    default:
      return <StartScreen />;
  }
};

function App() {
  return (
    <GameProvider>
      <div className="App h-screen">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;
