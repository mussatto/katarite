import React, { createContext, useContext, useReducer, useEffect } from 'react';
import defaultPlayer, { PlayerState } from '../data/playerData';
import worldMapData from '../data/worldData';
import areaData from '../data/areaData';

// Game view states
export type GameView = 'START_SCREEN' | 'WORLD_MAP_VIEW' | 'AREA_MAP_VIEW' | 'INVENTORY_VIEW' | 'SHOP_VIEW' | 'GAME_OVER_SCREEN';

// Message log entries
export interface LogMessage {
  id: number;
  text: string;
  type: 'system' | 'combat' | 'dialogue';
}

// Game state interface
export interface GameState {
  view: GameView;
  player: PlayerState;
  messageLog: LogMessage[];
  activeShop: {
    npcId: string;
    inventory: string[];
  } | null;
  logCounter: number; // Used to generate unique IDs for messages
}

// Action types
type ActionType = 
  | { type: 'SET_VIEW'; payload: GameView }
  | { type: 'UPDATE_PLAYER'; payload: Partial<PlayerState> }
  | { type: 'SET_LOCATION'; payload: { areaId: string; roomId: string; x: number; y: number } }
  | { type: 'ADD_LOG_MESSAGE'; payload: { text: string; type: 'system' | 'combat' | 'dialogue' } }
  | { type: 'OPEN_SHOP'; payload: { npcId: string; inventory: string[] } }
  | { type: 'CLOSE_SHOP' }
  | { type: 'ADD_GOLD'; payload: number }
  | { type: 'SPEND_GOLD'; payload: number }
  | { type: 'ADD_ITEM'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string; quantity: number } }
  | { type: 'EQUIP_ITEM'; payload: string }
  | { type: 'UNEQUIP_ITEM'; payload: string }
  | { type: 'SAVE_GAME' }
  | { type: 'LOAD_GAME' }
  | { type: 'NEW_GAME'; payload: string };

// Initial state
const initialState: GameState = {
  view: 'START_SCREEN',
  player: defaultPlayer,
  messageLog: [],
  activeShop: null,
  logCounter: 0
};

// Reducer function
const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    
    case 'UPDATE_PLAYER':
      return { ...state, player: { ...state.player, ...action.payload } };
    
    case 'SET_LOCATION':
      const { areaId, roomId, x, y } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          currentAreaId: areaId,
          currentRoomId: roomId,
          position: { x, y },
          visitedAreas: state.player.visitedAreas.includes(areaId) 
            ? state.player.visitedAreas 
            : [...state.player.visitedAreas, areaId]
        }
      };
    
    case 'ADD_LOG_MESSAGE':
      return {
        ...state,
        messageLog: [
          ...state.messageLog.slice(-9), // Keep last 9 messages
          { 
            id: state.logCounter + 1, 
            text: action.payload.text, 
            type: action.payload.type 
          }
        ],
        logCounter: state.logCounter + 1
      };
    
    case 'OPEN_SHOP':
      return {
        ...state,
        activeShop: {
          npcId: action.payload.npcId,
          inventory: action.payload.inventory
        },
        view: 'SHOP_VIEW'
      };
    
    case 'CLOSE_SHOP':
      return {
        ...state,
        activeShop: null,
        view: 'AREA_MAP_VIEW'
      };
    
    case 'ADD_GOLD':
      return {
        ...state,
        player: {
          ...state.player,
          gold: state.player.gold + action.payload
        }
      };
    
    case 'SPEND_GOLD':
      if (state.player.gold < action.payload) {
        // Not enough gold, return state unchanged
        return state;
      }
      return {
        ...state,
        player: {
          ...state.player,
          gold: state.player.gold - action.payload
        }
      };
    
    case 'ADD_ITEM': {
      const { itemId, quantity } = action.payload;
      const existingItem = state.player.inventory.find(item => item.itemId === itemId);
      
      if (existingItem) {
        // Item exists, update quantity
        const updatedInventory = state.player.inventory.map(item => 
          item.itemId === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          ...state,
          player: {
            ...state.player,
            inventory: updatedInventory
          }
        };
      } else {
        // Item doesn't exist, add new item
        return {
          ...state,
          player: {
            ...state.player,
            inventory: [
              ...state.player.inventory,
              { itemId, quantity, equipped: false }
            ]
          }
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const { itemId, quantity } = action.payload;
      const existingItem = state.player.inventory.find(item => item.itemId === itemId);
      
      if (!existingItem || existingItem.quantity < quantity) {
        // Item doesn't exist or not enough quantity, return state unchanged
        return state;
      }
      
      if (existingItem.quantity === quantity) {
        // Remove item completely
        const updatedInventory = state.player.inventory.filter(item => item.itemId !== itemId);
        
        // If the item was equipped, update equipped items
        const updatedEquipped = { ...state.player.equipped };
        Object.entries(updatedEquipped).forEach(([slot, equippedItemId]) => {
          if (equippedItemId === itemId) {
            delete updatedEquipped[slot as keyof typeof updatedEquipped];
          }
        });
        
        return {
          ...state,
          player: {
            ...state.player,
            inventory: updatedInventory,
            equipped: updatedEquipped
          }
        };
      } else {
        // Reduce quantity
        const updatedInventory = state.player.inventory.map(item => 
          item.itemId === itemId 
            ? { ...item, quantity: item.quantity - quantity }
            : item
        );
        return {
          ...state,
          player: {
            ...state.player,
            inventory: updatedInventory
          }
        };
      }
    }
    
    case 'EQUIP_ITEM': {
      const itemId = action.payload;
      const item = state.player.inventory.find(item => item.itemId === itemId);
      
      if (!item) return state; // Item doesn't exist
      
      // Determine slot (simplified for this example)
      let slot: keyof typeof state.player.equipped = 'hand'; // Default
      if (itemId.includes('helmet')) slot = 'head';
      if (itemId.includes('armor')) slot = 'body';
      if (itemId.includes('boots')) slot = 'feet';
      
      // Unequip any existing item in this slot
      const updatedInventory = state.player.inventory.map(invItem => {
        if (invItem.itemId === state.player.equipped[slot]) {
          return { ...invItem, equipped: false };
        }
        if (invItem.itemId === itemId) {
          return { ...invItem, equipped: true };
        }
        return invItem;
      });
      
      // Update equipped items
      const updatedEquipped = { ...state.player.equipped, [slot]: itemId };
      
      return {
        ...state,
        player: {
          ...state.player,
          inventory: updatedInventory,
          equipped: updatedEquipped
        }
      };
    }
    
    case 'UNEQUIP_ITEM': {
      const itemId = action.payload;
      
      // Find which slot this item is equipped in
      let slotToUnequip: keyof typeof state.player.equipped | null = null;
      Object.entries(state.player.equipped).forEach(([slot, equippedItemId]) => {
        if (equippedItemId === itemId) {
          slotToUnequip = slot as keyof typeof state.player.equipped;
        }
      });
      
      if (!slotToUnequip) return state; // Item wasn't equipped
      
      // Update inventory
      const updatedInventory = state.player.inventory.map(item => 
        item.itemId === itemId ? { ...item, equipped: false } : item
      );
      
      // Update equipped items
      const updatedEquipped = { ...state.player.equipped };
      delete updatedEquipped[slotToUnequip];
      
      return {
        ...state,
        player: {
          ...state.player,
          inventory: updatedInventory,
          equipped: updatedEquipped
        }
      };
    }
    
    case 'SAVE_GAME': {
      try {
        localStorage.setItem('rpgGameSave', JSON.stringify(state));
        return {
          ...state,
          messageLog: [
            ...state.messageLog.slice(-9),
            { id: state.logCounter + 1, text: 'Game saved successfully', type: 'system' }
          ],
          logCounter: state.logCounter + 1
        };
      } catch (error) {
        console.error('Failed to save game:', error);
        return {
          ...state,
          messageLog: [
            ...state.messageLog.slice(-9),
            { id: state.logCounter + 1, text: 'Failed to save game', type: 'system' }
          ],
          logCounter: state.logCounter + 1
        };
      }
    }
    
    case 'LOAD_GAME': {
      try {
        const savedState = localStorage.getItem('rpgGameSave');
        if (!savedState) {
          return {
            ...state,
            messageLog: [
              ...state.messageLog.slice(-9),
              { id: state.logCounter + 1, text: 'No saved game found', type: 'system' }
            ],
            logCounter: state.logCounter + 1
          };
        }
        
        return JSON.parse(savedState);
      } catch (error) {
        console.error('Failed to load game:', error);
        return {
          ...state,
          messageLog: [
            ...state.messageLog.slice(-9),
            { id: state.logCounter + 1, text: 'Failed to load game', type: 'system' }
          ],
          logCounter: state.logCounter + 1
        };
      }
    }
    
    case 'NEW_GAME': {
      const playerName = action.payload;
      return {
        ...initialState,
        player: {
          ...defaultPlayer,
          name: playerName
        },
        view: 'WORLD_MAP_VIEW',
        messageLog: [
          { id: 0, text: `Welcome, ${playerName}! Your adventure begins.`, type: 'system' }
        ],
        logCounter: 1
      };
    }
    
    default:
      return state;
  }
};

// Create context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // You could add effects here for things like auto-save or other recurring actions
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext; 