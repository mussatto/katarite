// Types
export interface Exit {
  x: number;
  y: number;
  target: string; // roomId or 'WORLD_MAP'
  targetX?: number;
  targetY?: number;
  targetAreaId?: string; // Used when exit leads to WORLD_MAP
}

export interface NPC {
  id: string;
  name: string;
  x: number;
  y: number;
  isShop?: boolean;
  dialogue: string[];
  shopInventory?: string[]; // Array of itemIds the NPC sells
}

export interface Enemy {
  id: string;
  name: string;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  damage: number;
  defense: number;
  gold: number;
  dropItems?: string[]; // Array of itemIds with drop chance
}

export interface Item {
  id: string; // itemId from itemDatabase
  x: number;
  y: number;
}

export type TileType = 
  'floor' | 'wall' | 'door' | 'water' | 'grass' | 'road' | 'bridge' | 
  'shop_counter' | 'chest' | 'stairs_up' | 'stairs_down' | 'bed';

export interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  exits: Exit[];
  npcs?: NPC[];
  enemies?: Enemy[];
  items?: Item[];
}

export interface Area {
  id: string;
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
  oakwood_town: {
    id: 'oakwood_town',
    name: 'Oakwood Town',
    type: 'town',
    entryPoint: {
      roomId: 'town_square',
      x: 5,
      y: 8
    },
    rooms: {
      town_square: {
        id: 'town_square',
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
            target: 'WORLD_MAP',
            targetAreaId: 'oakwood_town'
          }
        ],
        npcs: [
          {
            id: 'town_elder',
            name: 'Elder Thomas',
            x: 5,
            y: 5,
            dialogue: [
              "Welcome to Oakwood Town, traveler!",
              "Feel free to visit our shops and rest at the inn.",
              "Be careful if you venture to the Whispering Caves. Strange creatures lurk there."
            ]
          }
        ]
      },
      item_shop: {
        id: 'item_shop',
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
            id: 'shopkeeper',
            name: 'Elara',
            x: 4,
            y: 2,
            isShop: true,
            dialogue: [
              "Welcome to my shop! What can I get for you?",
              "I have the finest supplies for adventurers like yourself.",
              "Need potions? Weapons? Just ask!"
            ],
            shopInventory: ['health_potion', 'bread', 'sword_basic', 'leather_armor']
          }
        ]
      }
    }
  },
  
  // Whispering Caves Area
  whispering_caves: {
    id: 'whispering_caves',
    name: 'Whispering Caves',
    type: 'dungeon',
    entryPoint: {
      roomId: 'cave_entrance',
      x: 5,
      y: 9
    },
    rooms: {
      cave_entrance: {
        id: 'cave_entrance',
        name: 'Cave Entrance',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('floor')),
        exits: [
          {
            x: 5,
            y: 0,
            target: 'cave_chamber',
            targetX: 5,
            targetY: 9
          },
          {
            x: 5,
            y: 9,
            target: 'WORLD_MAP',
            targetAreaId: 'whispering_caves'
          }
        ],
        enemies: [
          {
            id: 'bat_1',
            name: 'Cave Bat',
            x: 3,
            y: 4,
            health: 20,
            maxHealth: 20,
            damage: 5,
            defense: 1,
            gold: 10,
            dropItems: ['health_potion']
          }
        ]
      },
      cave_chamber: {
        id: 'cave_chamber',
        name: 'Dark Chamber',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('floor')),
        exits: [
          {
            x: 5,
            y: 9,
            target: 'cave_entrance',
            targetX: 5,
            targetY: 0
          }
        ],
        enemies: [
          {
            id: 'spider_1',
            name: 'Giant Spider',
            x: 5,
            y: 5,
            health: 30,
            maxHealth: 30,
            damage: 8,
            defense: 2,
            gold: 25,
            dropItems: ['health_potion', 'staff_magic']
          }
        ],
        items: [
          {
            id: 'health_potion',
            x: 8,
            y: 8
          }
        ]
      }
    }
  },
  
  // Misty Forest Area
  misty_forest: {
    id: 'misty_forest',
    name: 'Misty Forest',
    type: 'wilderness',
    entryPoint: {
      roomId: 'forest_edge',
      x: 5,
      y: 9
    },
    rooms: {
      forest_edge: {
        id: 'forest_edge',
        name: 'Forest Edge',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('grass')),
        exits: [
          {
            x: 5,
            y: 0,
            target: 'forest_clearing',
            targetX: 5,
            targetY: 9
          },
          {
            x: 5,
            y: 9,
            target: 'WORLD_MAP',
            targetAreaId: 'misty_forest'
          }
        ],
        enemies: [
          {
            id: 'wolf_1',
            name: 'Forest Wolf',
            x: 3,
            y: 5,
            health: 25,
            maxHealth: 25,
            damage: 7,
            defense: 2,
            gold: 15,
            dropItems: ['bread']
          }
        ],
        items: [
          {
            id: 'health_potion',
            x: 8,
            y: 3
          }
        ]
      },
      forest_clearing: {
        id: 'forest_clearing',
        name: 'Misty Clearing',
        width: 10,
        height: 10,
        tiles: Array(10).fill(Array(10).fill('grass')),
        exits: [
          {
            x: 5,
            y: 9,
            target: 'forest_edge',
            targetX: 5,
            targetY: 0
          }
        ],
        npcs: [
          {
            id: 'forest_hermit',
            name: 'Old Hermit',
            x: 5,
            y: 5,
            dialogue: [
              "Few travelers venture this deep into the mist...",
              "I've been living here for decades, studying the mysteries of the forest.",
              "Be careful of the ancient ruins to the east. Dark magic lingers there."
            ]
          }
        ],
        enemies: [
          {
            id: 'bear_1',
            name: 'Forest Bear',
            x: 8,
            y: 2,
            health: 40,
            maxHealth: 40,
            damage: 10,
            defense: 3,
            gold: 30,
            dropItems: ['health_potion', 'iron_helmet']
          }
        ]
      }
    }
  }
};

export default areaData; 