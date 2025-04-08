import React, { useState } from 'react';
import { useGame } from '../state/gameContext';

const StartScreen: React.FC = () => {
  const { dispatch } = useGame();
  const [playerName, setPlayerName] = useState('Hero');
  const [showNameInput, setShowNameInput] = useState(false);
  
  const handleStartNewGame = () => {
    setShowNameInput(true);
  };
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'NEW_GAME', payload: playerName });
  };
  
  const handleLoadGame = () => {
    dispatch({ type: 'LOAD_GAME' });
  };
  
  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">TileTurn Tactics</h1>
        <h2 className="text-xl mb-8">A Turn-Based RPG Adventure</h2>
        
        {!showNameInput ? (
          <div className="space-y-4">
            <button 
              className="btn btn-primary btn-lg w-full"
              onClick={handleStartNewGame}
            >
              New Game
            </button>
            
            <button 
              className="btn btn-secondary btn-lg w-full"
              onClick={handleLoadGame}
            >
              Load Game
            </button>
          </div>
        ) : (
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Enter your hero's name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                type="button" 
                className="btn btn-outline flex-1" 
                onClick={() => setShowNameInput(false)}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary flex-1"
              >
                Begin Adventure
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-sm text-base-content/70">
          <p>Use mouse clicks to navigate, fight, and explore.</p>
          <p>Your skills will improve as you use them.</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen; 