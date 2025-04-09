// Types
import { NPC, ELDER_THOMAS, SHOPKEEPER, ELF } from './npcData';
import { BaseEnemy } from './enemyData';

// Item constants
export const ITEM_HEALTH_POTION = 'health_potion';

export interface Exit {
  x: number;
  y: number;
  target: string; // roomId or WORLD_MAP
  targetX?: number;
  targetY?: number;
}

export interface Item {
  id: string; // itemId from itemDatabase
  x: number;
  y: number;
}

export interface RoomNPC {
  npc: NPC; // NPC ID from npcData
  x: number;
  y: number;
}

export interface RoomEnemy {
  enemy: BaseEnemy; // Enemy ID from enemyData
  x: number;
  y: number;
}

export type TileType = 
  'floor' | 'wall' | 'door' | 'water' | 'grass' | 'road' | 'bridge' | 
  'shop_counter' | 'chest' | 'stairs_up' | 'stairs_down' | 'bed';

export interface Room {
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  exits: Exit[];
  npcs?: RoomNPC[]; // NPCs with positions
  enemies?: RoomEnemy[]; // Enemies with positions
  items?: Item[];
}

export interface Area {
  name: string;
  rooms: Record<string, Room>;
  entryPoint: {
    roomId: string;
    x: number;
    y: number;
  };
}

const townSquare: Room = {
  name: 'Town Square',
  width: 10,
  height: 10,
  // Simple tile representation 
  // (0 = floor, 1 = wall, etc. - this is a simplified version for the demo)
  tiles: Array(10).fill(Array(10).fill('floor')),
  exits: [
    {
      x: 9,
      y: 5,
      target: 'item_shop',
      targetX: 1,
      targetY: 5
    },
    {
      x: 5,
      y: 0,
      target: 'WORLD_MAP'
    }
  ],
  npcs: [
    {
      npc: ELDER_THOMAS,
      x: 5,
      y: 5
    }
  ]
  };

const itemShop: Room = {
  name: 'Adventurer\'s Supplies',
  width: 8,
  height: 8,
  tiles: Array(8).fill(Array(8).fill('floor')),
  exits: [
    {
      x: 0,
      y: 5,
      target: 'town_square',
      targetX: 8,
      targetY: 5
    }
  ],
  npcs: [
    {
      npc: SHOPKEEPER,
      x: 4,
      y: 2
    },
    {
      npc: ELF,
      x: 4,
      y: 4
    }
  ]
}
;

// Mock Area Data
const areaData: Record<string, Area> = {
  'oakwood_area' : {
    name: 'Oakwood Area',
    entryPoint: {
      roomId: 'town_square',
      x: 5,
      y: 8
    },
    rooms: {
      'town_square': townSquare,
      'item_shop': itemShop
    } 
  }
};

export default areaData; 