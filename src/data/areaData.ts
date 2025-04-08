// Types
import { NPC, ELDER_THOMAS, SHOPKEEPER, ELF, FOREST_HERMIT } from './npcData';
import { BaseEnemy, ENEMY_GIANT_SPIDER } from './enemyData';

// Area and room constants
export const AREA_OAKWOOD_TOWN = 'oakwood_town';
export const AREA_WHISPERING_CAVES = 'whispering_caves';
export const AREA_MISTY_FOREST = 'misty_forest';

export const ROOM_TOWN_SQUARE = 'town_square';
export const ROOM_ITEM_SHOP = 'item_shop';
export const ROOM_CAVE_ENTRANCE = 'cave_entrance';
export const ROOM_CAVE_CHAMBER = 'cave_chamber';
export const ROOM_FOREST_EDGE = 'forest_edge';
export const ROOM_FOREST_CLEARING = 'forest_clearing';

export const WORLD_MAP = 'WORLD_MAP';

// Item constants
export const ITEM_HEALTH_POTION = 'health_potion';

export interface Exit {
  x: number;
  y: number;
  target: string; // roomId or WORLD_MAP
  targetX?: number;
  targetY?: number;
  targetAreaId?: string; // Used when exit leads to WORLD_MAP
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
  type: 'town' | 'dungeon' | 'wilderness';
  rooms: Record<string, Room>;
  entryPoint: {
    roomId: string;
    x: number;
    y: number;
  };
}

// Mock Area Data
const areaData: Record<string, Area> = {
  // Oakwood Town Area
  [AREA_OAKWOOD_TOWN]: {
    name: 'Oakwood Town',
    type: 'town',
    entryPoint: {
      roomId: ROOM_TOWN_SQUARE,
      x: 5,
      y: 8
    },
    rooms: {
      ROOM_TOWN_SQUARE: {
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
            target: ROOM_ITEM_SHOP,
            targetX: 1,
            targetY: 5
          },
          {
            x: 5,
            y: 0,
            target: WORLD_MAP,
            targetAreaId: AREA_OAKWOOD_TOWN
          }
        ],
        npcs: [
          {
            npc: ELDER_THOMAS,
            x: 5,
            y: 5
          }
        ]
      },
      [ROOM_ITEM_SHOP]: {
        name: 'Adventurer\'s Supplies',
        width: 8,
        height: 8,
        tiles: Array(8).fill(Array(8).fill('floor')),
        exits: [
          {
            x: 0,
            y: 5,
            target: ROOM_TOWN_SQUARE,
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
    }
  },
  
  // Whispering Caves Area
  [AREA_WHISPERING_CAVES]: {
    name: 'Whispering Caves',
    type: 'dungeon',
    entryPoint: {
      roomId: ROOM_CAVE_ENTRANCE,
      x: 5,
      y: 9
    },
    rooms: {
      [ROOM_CAVE_ENTRANCE]: {
        name: 'Cave Entrance',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('floor')),
        exits: [
          {
            x: 5,
            y: 0,
            target: ROOM_CAVE_CHAMBER,
            targetX: 5,
            targetY: 9
          },
          {
            x: 5,
            y: 9,
            target: WORLD_MAP,
            targetAreaId: AREA_WHISPERING_CAVES
          }
        ],
        enemies: [
          {
            enemy: ENEMY_GIANT_SPIDER,
            x: 3,
            y: 4
          }
        ]
      },
      [ROOM_CAVE_CHAMBER]: {
        name: 'Dark Chamber',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('floor')),
        exits: [
          {
            x: 5,
            y: 9,
            target: ROOM_CAVE_ENTRANCE,
            targetX: 5,
            targetY: 0
          }
        ],
        enemies: [
          {
            enemy: ENEMY_GIANT_SPIDER,
            x: 5,
            y: 5
          }
        ],
        items: [
          {
            id: ITEM_HEALTH_POTION,
            x: 8,
            y: 8
          }
        ]
      }
    }
  },
  
  // Misty Forest Area
  [AREA_MISTY_FOREST]: {
    name: 'Misty Forest',
    type: 'wilderness',
    entryPoint: {
      roomId: ROOM_FOREST_EDGE,
      x: 5,
      y: 9
    },
    rooms: {
      [ROOM_FOREST_EDGE]: {
        name: 'Forest Edge',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('grass')),
        exits: [
          {
            x: 5,
            y: 0,
            target: ROOM_FOREST_CLEARING,
            targetX: 5,
            targetY: 9
          },
          {
            x: 5,
            y: 9,
            target: WORLD_MAP,
            targetAreaId: AREA_MISTY_FOREST
          }
        ],
        enemies: [
          {
            enemy: ENEMY_GIANT_SPIDER,
            x: 3,
            y: 5
          }
        ],
        items: [
          {
            id: ITEM_HEALTH_POTION,
            x: 8,
            y: 3
          }
        ]
      },
      [ROOM_FOREST_CLEARING]: {
        name: 'Misty Clearing',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('grass')),
        exits: [
          {
            x: 5,
            y: 9,
            target: ROOM_FOREST_EDGE,
            targetX: 5,
            targetY: 0
          }
        ],
        npcs: [
        
        ],
        enemies: [
          {
            enemy: ENEMY_GIANT_SPIDER,
            x: 8,
            y: 2
          }
        ]
      }
    }
  }
};

export default areaData; 