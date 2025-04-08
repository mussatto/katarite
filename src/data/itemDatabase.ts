// Types
export type ItemType = 'weapon' | 'armor' | 'consumable';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  value: number; // Gold value
  effect?: string;
  equipableSlot?: string;
  damage?: number; // For weapons
  defense?: number; // For armor
  healing?: number; // For healing items
}

// Mock Item Database
const itemDatabase: Record<string, Item> = {
  // Weapons
  sword_basic: {
    id: 'sword_basic',
    name: 'Basic Sword',
    description: 'A simple iron sword. Not fancy, but gets the job done.',
    type: 'weapon',
    value: 50,
    equipableSlot: 'hand',
    damage: 10
  },
  staff_magic: {
    id: 'staff_magic',
    name: 'Magic Staff',
    description: 'A wooden staff imbued with magical properties.',
    type: 'weapon',
    value: 75,
    equipableSlot: 'hand',
    damage: 8
  },
  
  // Armor
  leather_armor: {
    id: 'leather_armor',
    name: 'Leather Armor',
    description: 'Lightweight protection crafted from tanned hide.',
    type: 'armor',
    value: 40,
    equipableSlot: 'body',
    defense: 5
  },
  iron_helmet: {
    id: 'iron_helmet',
    name: 'Iron Helmet',
    description: 'A solid metal helmet that protects your head.',
    type: 'armor',
    value: 30,
    equipableSlot: 'head',
    defense: 3
  },
  
  // Consumables
  health_potion: {
    id: 'health_potion',
    name: 'Health Potion',
    description: 'A red liquid that restores health when consumed.',
    type: 'consumable',
    value: 20,
    healing: 25
  },
  bread: {
    id: 'bread',
    name: 'Bread',
    description: 'A loaf of fresh bread. Restores a small amount of health.',
    type: 'consumable',
    value: 5,
    healing: 10
  }
};

export default itemDatabase; 