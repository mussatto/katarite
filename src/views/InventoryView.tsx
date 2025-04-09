import React from 'react';
import { useGame } from '../state/gameContext';
import itemDatabase from '../data/itemDatabase';

const InventoryView: React.FC = () => {
  const { state, dispatch } = useGame();
  
  const handleUseItem = (itemId: string) => {
    const item = itemDatabase[itemId];
    
    if (!item) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: 'Error: Item not found in database.',
          type: 'system'
        }
      });
      return;
    }
    
    switch (item.type) {
      case 'consumable':
        // For consumables, use and remove from inventory
        if (item.healing) {
          const newHealth = Math.min(state.player.maxHealth, state.player.health + item.healing);
          
          dispatch({
            type: 'UPDATE_PLAYER',
            payload: {
              health: newHealth
            }
          });
          
          dispatch({
            type: 'ADD_LOG_MESSAGE',
            payload: {
              text: `You used ${item.name} and restored ${item.healing} health.`,
              type: 'system'
            }
          });
          
          dispatch({
            type: 'REMOVE_ITEM',
            payload: {
              itemId,
              quantity: 1
            }
          });
        }
        break;
        
      case 'weapon':
      case 'armor':
        // For equipment, toggle equipped status
        const isEquipped = state.player.inventory.find(
          invItem => invItem.itemId === itemId && invItem.equipped
        );
        
        if (isEquipped) {
          dispatch({
            type: 'UNEQUIP_ITEM',
            payload: itemId
          });
          
          dispatch({
            type: 'ADD_LOG_MESSAGE',
            payload: {
              text: `You unequipped ${item.name}.`,
              type: 'system'
            }
          });
        } else {
          dispatch({
            type: 'EQUIP_ITEM',
            payload: itemId
          });
          
          dispatch({
            type: 'ADD_LOG_MESSAGE',
            payload: {
              text: `You equipped ${item.name}.`,
              type: 'system'
            }
          });
        }
        break;
        
      default:
        dispatch({
          type: 'ADD_LOG_MESSAGE',
          payload: {
            text: `You can't use ${item.name}.`,
            type: 'system'
          }
        });
    }
  };
  
  const getEquippedStatus = (itemId: string) => {
    const invItem = state.player.inventory.find(item => item.itemId === itemId);
    return invItem?.equipped || false;
  };
  
  const getItemStyle = (itemType: string, isEquipped: boolean) => {
    let baseClasses = 'border rounded-lg p-3 flex justify-between items-center';
    
    if (isEquipped) {
      baseClasses += ' border-primary bg-primary/10';
    } else {
      baseClasses += ' border-base-content/20';
    }
    
    switch (itemType) {
      case 'weapon':
        baseClasses += ' hover:bg-error/10';
        break;
      case 'armor':
        baseClasses += ' hover:bg-success/10';
        break;
      case 'consumable':
        baseClasses += ' hover:bg-info/10';
        break;
      default:
        baseClasses += ' hover:bg-base-content/10';
    }
    
    return baseClasses;
  };
  
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <div className="bg-base-100 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <div>
            <span className="text-warning mr-4">
              <span className="font-bold">Gold:</span> {state.player.gold}
            </span>
            <button 
              className="btn btn-sm"
              onClick={() => {
                // Return to previous screen
                const previousView = state.player.currentArea 
                  ? 'AREA_MAP_VIEW' 
                  : 'WORLD_MAP_VIEW';
                dispatch({ type: 'SET_VIEW', payload: previousView });
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side - Item List */}
            <div>
              <h2 className="text-xl font-bold mb-4">Items</h2>
              
              {state.player.inventory.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                  Your inventory is empty.
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto max-h-[70vh]">
                  {state.player.inventory.map((invItem) => {
                    const item = itemDatabase[invItem.itemId];
                    const isEquipped = getEquippedStatus(invItem.itemId);
                    
                    if (!item) return null;
                    
                    return (
                      <div 
                        key={invItem.itemId} 
                        className={getItemStyle(item.type, isEquipped)}
                      >
                        <div>
                          <div className="font-bold flex items-center">
                            {isEquipped && (
                              <span className="text-primary mr-2">▶</span>
                            )}
                            {item.name}
                            <span className="badge badge-sm ml-2">
                              {item.type}
                            </span>
                          </div>
                          <div className="text-sm opacity-70">
                            {item.description}
                          </div>
                          <div className="text-xs mt-1">
                            Quantity: {invItem.quantity} • Value: {item.value} gold
                          </div>
                        </div>
                        
                        <button 
                          className="btn btn-sm"
                          onClick={() => handleUseItem(invItem.itemId)}
                        >
                          {item.type === 'consumable' ? 'Use' : isEquipped ? 'Unequip' : 'Equip'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Right side - Equipment & Stats */}
            <div>
              <h2 className="text-xl font-bold mb-4">Equipment</h2>
              
              <div className="mb-6 grid grid-cols-2 gap-3">
                {['head', 'body', 'hand', 'feet'].map((slot) => {
                  const equippedItemId = state.player.equipped[slot as keyof typeof state.player.equipped];
                  const equippedItem = equippedItemId ? itemDatabase[equippedItemId] : null;
                  
                  return (
                    <div key={slot} className="border border-base-content/20 rounded-lg p-3">
                      <div className="font-bold capitalize mb-1">{slot}</div>
                      {equippedItem ? (
                        <div>
                          <div className="font-semibold text-primary">{equippedItem.name}</div>
                          <div className="text-xs mt-1">
                            {equippedItem.type === 'weapon' && equippedItem.damage
                              ? `Damage: +${equippedItem.damage}`
                              : equippedItem.type === 'armor' && equippedItem.defense
                              ? `Defense: +${equippedItem.defense}`
                              : ''}
                          </div>
                        </div>
                      ) : (
                        <div className="text-base-content/50 italic">Nothing equipped</div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              
              <div className="space-y-3">
                {Object.values(state.player.skills).map((skill) => (
                  <div key={skill.id} className="border border-base-content/20 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold">{skill.name}</span>
                      <span>Level {skill.level}</span>
                    </div>
                    <div className="w-full bg-base-content/10 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(skill.experience / skill.maxExperience) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1 text-right">
                      {skill.experience}/{skill.maxExperience} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryView; 