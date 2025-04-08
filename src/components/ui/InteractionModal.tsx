import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Interaction, Stage, ActionOption } from '../../data/mockInteractions';

interface InteractionModalProps {
  interaction: Interaction;
  onClose: () => void;
  onAction?: (actionId: string) => void;
}

export const InteractionModal: React.FC<InteractionModalProps> = ({
  interaction,
  onClose,
  onAction
}) => {
  const [currentStageId, setCurrentStageId] = useState<string>(interaction.initialStage);
  const currentStage = interaction.stages[currentStageId];
  
  const handleAction = (action: ActionOption) => {
    // Call the optional effect function if provided
    if (action.effect) {
      action.effect();
    }
    
    // Call the parent component's onAction callback if provided
    if (onAction) {
      onAction(action.id);
    }
    
    // If there's a next stage, go to it, otherwise close the modal
    if (action.nextStage) {
      setCurrentStageId(action.nextStage);
    } else {
      onClose();
    }
  };

  // Allow ESC key to close the modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-lg w-[90%] md:w-[80%] h-[95vh] flex flex-col overflow-hidden">
        {/* Header with NPC/Enemy name and close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold text-white">
            {interaction.type === 'npc' ? '👤 ' : '⚔️ '}{interaction.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Content area with image and text */}
        <div className="flex flex-col md:flex-row p-4 overflow-auto flex-grow">
          {/* Image section */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex justify-center items-center">
            <div className=" md:h-[80vh] bg-black overflow-hidden rounded-lg">
              {/* Using img tag instead of Next.js Image for external URLs */}
              <img 
                src={currentStage.image} 
                alt={`${interaction.name} - ${currentStage.id}`}
                className="h-full object-cover"
              />
            </div>
          </div>
          
          {/* Text section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-4 rounded-lg">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">{currentStage.text}</p>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-wrap gap-2 justify-center">
          {currentStage.actions.map((action) => (
            <Button
              key={action.id}
              variant={interaction.type === 'enemy' ? "destructive" : "default"}
              size="lg"
              onClick={() => handleAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractionModal; 