import React, { useState } from 'react';
import { useGame } from '../state/gameContext';
import MapTile from '../components/game/MapTile';
import areaData, { Exit, Item } from '../data/areaData';
import itemDatabase from '../data/itemDatabase';
import { InteractionModal } from '../components/ui/InteractionModal';
import { mockInteractions } from '../data/mockInteractions';
import { NPC } from '../data/npcData';

const AreaMapView: React.FC = () => {
  const { state, dispatch } = useGame();
  const [activeInteraction, setActiveInteraction] = useState<string | null>(null);
  
  // Get current location data
  const currentAreaId = state.player.currentAreaId;
  const currentRoomId = state.player.currentRoomId;
  
  // Check if required data exists
  if (!currentAreaId || !currentRoomId || !areaData[currentAreaId]?.rooms[currentRoomId]) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error: Room not found</h2>
          <p>Unable to load the current room. Please return to the world map.</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WORLD_MAP_VIEW' })}
          >
            Return to World Map
          </button>
        </div>
      </div>
    );
  }
  
  // Area and room data
  const area = areaData[currentAreaId];
  const room = area.rooms[currentRoomId];
  
  // Handle tile click
  const handleTileClick = (x: number, y: number) => {
    // Ignore tile clicks when an interaction is active
    if (activeInteraction) return;

    // Check if the tile is an exit
    const exit = room.exits.find(exit => exit.x === x && exit.y === y);
    if (exit) {
      handleExit(exit);
      return;
    }
    
    // Check if there's an NPC at this position
    const npc = room.npcs?.find(npc => npc.x === x && npc.y === y);
    if (npc) {
      handleNPCInteraction(npc.npc as NPC);
      return;
    }
    
    // Check if there's an item at this position
    const item = room.items?.find(item => item.x === x && item.y === y);
    if (item) {
      handleItemPickup(item);
      return;
    }
    
    // Move player
    movePlayer(x, y);
  };
  
  // Handle exiting to another room or the world map
  const handleExit = (exit: Exit) => {
    if (exit.target === 'WORLD_MAP') {
      // Return to world map
      dispatch({ type: 'SET_VIEW', payload: 'WORLD_MAP_VIEW' });
      dispatch({ 
        type: 'ADD_LOG_MESSAGE', 
        payload: { 
          text: `You return to the world map.`, 
          type: 'system' 
        } 
      });
    } else {
      // Move to another room
      const targetRoom = area.rooms[exit.target];
      if (!targetRoom) {
        dispatch({ 
          type: 'ADD_LOG_MESSAGE', 
          payload: { 
            text: `Error: Target room not found.`, 
            type: 'system' 
          } 
        });
        return;
      }
      
      // Set new location
      dispatch({
        type: 'SET_LOCATION',
        payload: {
          areaId: currentAreaId,
          roomId: exit.target,
          x: exit.targetX || 0,
          y: exit.targetY || 0
        }
      });
      
      dispatch({ 
        type: 'ADD_LOG_MESSAGE', 
        payload: { 
          text: `You enter ${targetRoom.name}.`, 
          type: 'system' 
        } 
      });
    }
  };
  
  // Handle NPC interaction
  const handleNPCInteraction = (npc: NPC) => {
    // If NPC is a shop, open shop interface
    if (npc.isShop && npc.shopInventory) {
      dispatch({
        type: 'OPEN_SHOP',
        payload: {
          npc: npc,
          inventory: npc.shopInventory
        }
      });
      return;
    }
    
    // Use the interaction system for NPCs
    
    // if (npc.id === 'elder_thomas') {
    //   setActiveInteraction('elderThomas');
    //   dispatch({
    //     type: 'ADD_LOG_MESSAGE',
    //     payload: {
    //       text: `You approach ${npc.name} to talk.`,
    //       type: 'dialogue'
    //     }
    //   });
    //   return;
    // }

    setActiveInteraction(npc.interaction?.initialStage || null);
    
  };

  // Handle closing the interaction modal
  const handleCloseInteraction = () => {
    setActiveInteraction(null);
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: 'You end the interaction.',
        type: 'system'
      }
    });
  };

  // Handle actions from the interaction modal
  const handleInteractionAction = (actionId: string) => {
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: `Action taken: ${actionId}`,
        type: activeInteraction === 'giantSpider' ? 'combat' : 'dialogue'
      }
    });
  };
  
  // Handle item pickup
  const handleItemPickup = (item: Item) => {
    const itemData = itemDatabase[item.id];
    
    if (!itemData) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: `Error: Item data not found.`,
          type: 'system'
        }
      });
      return;
    }
    
    // Add item to inventory
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        itemId: item.id,
        quantity: 1
      }
    });
    
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: `You picked up ${itemData.name}.`,
        type: 'system'
      }
    });
    
    // In a full implementation, we would remove the item from the room
  };
  
  // Move player (simulating turn-based movement)
  const movePlayer = (x: number, y: number) => {
    // Check if movement is possible (simplified)
    // In a real implementation, we'd check for walls, etc.
    
    // Update player position
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: {
        position: { x, y }
      }
    });
    
    // In a full implementation, this would trigger a "turn" and update enemy positions
  };
  
  // Render the room grid
  const renderRoomGrid = () => {
    const rows = [];
    
    for (let y = 0; y < room.height; y++) {
      const row = [];
      for (let x = 0; x < room.width; x++) {
        // Determine what's on this tile
        const hasPlayer = state.player.position.x === x && state.player.position.y === y;
        const hasNPC = room.npcs?.some(npc => npc.x === x && npc.y === y) || false;
        const hasEnemy = room.enemies?.some(enemy => enemy.x === x && enemy.y === y) || false;
        const hasItem = room.items?.some(item => item.x === x && item.y === y) || false;
        const isExit = room.exits.some(exit => exit.x === x && exit.y === y);
        
        // Get tile type (simplified since we're using dummy data)
        const tileType = (room.tiles[y] && room.tiles[y][x]) || 'floor';
        
        row.push(
          <MapTile
            key={`${x}-${y}`}
            type={tileType}
            x={x}
            y={y}
            hasPlayer={hasPlayer}
            hasNPC={hasNPC}
            hasEnemy={hasEnemy}
            hasItem={hasItem}
            isExit={isExit}
            onClick={handleTileClick}
          />
        );
      }
      rows.push(
        <div key={`row-${y}`} className="flex">
          {row}
        </div>
      );
    }
    
    return <div className="inline-block border border-base-content/20">{rows}</div>;
  };
  
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <div className="bg-base-100 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{area.name} • {room.name}</h1>
          <button 
            className="btn btn-sm"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WORLD_MAP_VIEW' })}
          >
            World Map
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Left side: Map display (75%) */}
        <div className="w-3/4 p-4 overflow-auto">
          <div className="bg-base-100 rounded-lg shadow-lg p-4 h-full flex items-center justify-center">
            {renderRoomGrid()}
          </div>
        </div>
        
        {/* Right side: Info & actions (25%) */}
        <div className="w-1/4 flex flex-col">
          {/* Message log */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="bg-base-100 rounded-lg shadow-lg p-4 flex-1 flex flex-col">
              <h3 className="font-bold mb-2">Message Log</h3>
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="space-y-1">
                  {state.messageLog.slice(-15).map((message) => (
                    <div 
                      key={message.id} 
                      className={`text-sm mb-1 ${
                        message.type === 'combat' ? 'text-error' : 
                        message.type === 'dialogue' ? 'text-info' : 
                        'text-base-content'
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Player status */}
          <div className="p-4">
            <div className="bg-base-100 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-2">Player Status</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Health:</span>
                  <span>{state.player.health}/{state.player.maxHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gold:</span>
                  <span className="text-warning">{state.player.gold}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action menu */}
          <div className="p-4">
            <div className="bg-base-100 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-2">Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="btn btn-sm"
                  onClick={() => dispatch({ type: 'SET_VIEW', payload: 'INVENTORY_VIEW' })}
                >
                  Inventory
                </button>
                <button 
                  className="btn btn-sm"
                  onClick={() => dispatch({ type: 'SAVE_GAME' })}
                >
                  Save Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render the active interaction modal */}
      {activeInteraction && (
        <InteractionModal
          interaction={mockInteractions[activeInteraction]}
          onClose={handleCloseInteraction}
          onAction={handleInteractionAction}
        />
      )}
    </div>
  );
};

export default AreaMapView; 