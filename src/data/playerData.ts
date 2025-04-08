// Types
export interface InventoryItem {
  itemId: string;
  quantity: number;
  equipped?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
}

export interface PlayerState {
  name: string;
  health: number;
  maxHealth: number;
  gold: number;
  inventory: InventoryItem[];
  skills: Record<string, Skill>;
  equipped: {
    head?: string;
    body?: string;
    hand?: string;
    feet?: string;
  };
  // Location
  currentAreaId: string | null;
  currentRoomId: string | null;
  position: {
    x: number;
    y: number;
  };
  // Game state
  visitedAreas: string[];
  completedQuests: string[];
}

// Initialize a new player
export const createNewPlayer = (name: string): PlayerState => {
  return {
    name,
    health: 100,
    maxHealth: 100,
    gold: 50,
    inventory: [
      { itemId: 'health_potion', quantity: 3 },
      { itemId: 'bread', quantity: 5 },
      { itemId: 'sword_basic', quantity: 1, equipped: true }
    ],
    skills: {
      attack: {
        id: 'attack',
        name: 'Attack',
        level: 1,
        experience: 0,
        maxExperience: 100
      },
      defense: {
        id: 'defense',
        name: 'Defense',
        level: 1,
        experience: 0,
        maxExperience: 100
      },
      magic: {
        id: 'magic',
        name: 'Magic',
        level: 1,
        experience: 0,
        maxExperience: 100
      }
    },
    equipped: {
      hand: 'sword_basic'
    },
    currentAreaId: null,
    currentRoomId: null,
    position: { x: 0, y: 0 },
    visitedAreas: [],
    completedQuests: []
  };
};

// Default player for testing
export const defaultPlayer: PlayerState = createNewPlayer('Hero');

export default defaultPlayer; 