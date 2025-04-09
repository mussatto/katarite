import React, { useState, useEffect } from 'react';
import '../styles/InteractionModal.css';
import { Interaction, ActionOption } from '../data/mockInteractions';

interface InteractionModalProps {
  interaction: Interaction;
  onClose: () => void;
}

const InteractionModal: React.FC<InteractionModalProps> = ({ interaction, onClose }) => {
  const [currentStage, setCurrentStage] = useState<string>(interaction.initialStage);
  
  const handleActionClick = (action: ActionOption) => {
    if (action.effect) {
      action.effect();
    }
    
    if (action.nextStage) {
      setCurrentStage(action.nextStage);
    } else {
      // If no next stage, close the modal
      onClose();
    }
  };
  
  const stage = interaction.stages[currentStage];
  
  if (!stage) {
    return null;
  }
  
  return (
    <div className="interaction-modal-overlay">
      <div className="interaction-modal">
        <div className="interaction-header">
          <h2>{interaction.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="interaction-content">
          <div className="npc-image">
            {stage.image && <img src={stage.image} alt={interaction.name} />}
          </div>
          
          <div className="dialogue">
            <p>{stage.text}</p>
          </div>
        </div>
        
        <div className="interaction-actions">
          {Object.entries(stage.actions).map(([key, action]: [string, ActionOption]) => (
            <button 
              key={key} 
              className="action-button"
              onClick={() => handleActionClick(action)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractionModal; 