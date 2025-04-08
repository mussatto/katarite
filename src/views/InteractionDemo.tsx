import React, { useState } from 'react';
import { InteractionModal } from '../components/ui/InteractionModal';
import { Button } from '../components/ui/button';
import { mockInteractions } from '../data/mockInteractions';
import { useGame } from '../state/gameContext';

const InteractionDemo: React.FC = () => {
  const { dispatch } = useGame();
  const [activeInteraction, setActiveInteraction] = useState<string | null>(null);
  const [logMessages, setLogMessages] = useState<Array<{ text: string; type: string }>>([]);

  const handleClose = () => {
    setActiveInteraction(null);
    addLogMessage('Interaction closed', 'system');
  };

  const handleAction = (actionId: string) => {
    addLogMessage(`Action selected: ${actionId}`, 'action');
  };

  const addLogMessage = (text: string, type: string) => {
    setLogMessages(prev => [...prev, { text, type }]);
  };

  const startInteraction = (interactionId: string) => {
    setActiveInteraction(interactionId);
    addLogMessage(`Started interaction with ${mockInteractions[interactionId].name}`, 'system');
  };

  const goBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'START_SCREEN' });
  };
  
  const goToWorldMap = () => {
    dispatch({ type: 'SET_VIEW', payload: 'WORLD_MAP_VIEW' });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interaction System Demo</h1>
        <div className="space-x-2">
          <Button 
            variant="outline"
            onClick={goToWorldMap}
          >
            Return to World Map
          </Button>
          <Button 
            variant="outline"
            onClick={goBack}
          >
            Back to Main Menu
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(mockInteractions).map(([id, interaction]) => (
          <div key={id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">
              {interaction.type === 'npc' ? '👤 ' : '⚔️ '}{interaction.name}
            </h2>
            <p className="mb-4 text-gray-300">
              {interaction.type === 'npc' 
                ? 'NPC Character - Conversation' 
                : 'Enemy Encounter - Combat Interaction'}
            </p>
            <Button 
              onClick={() => startInteraction(id)}
              variant={interaction.type === 'npc' ? 'default' : 'destructive'}
            >
              Interact
            </Button>
          </div>
        ))}
      </div>
      
      {/* Action Log */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Action Log</h2>
        <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
          {logMessages.length === 0 ? (
            <p className="text-gray-500 italic">No actions yet. Try interacting with a character.</p>
          ) : (
            <ul className="space-y-2">
              {logMessages.map((msg, index) => (
                <li key={index} className={`${
                  msg.type === 'system' ? 'text-blue-400' : 
                  msg.type === 'action' ? 'text-green-400' : 'text-white'
                }`}>
                  {msg.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button 
          variant="outline" 
          className="mt-2"
          onClick={() => setLogMessages([])}
        >
          Clear Log
        </Button>
      </div>
      
      {/* Render the active interaction modal */}
      {activeInteraction && (
        <InteractionModal
          interaction={mockInteractions[activeInteraction]}
          onClose={handleClose}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default InteractionDemo; 