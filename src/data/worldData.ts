// Types
export interface WorldMapLocation {
  id: string;
  name: string;
  type: 'town' | 'dungeon' | 'wilderness';
  description: string;
  position: { x: number; y: number }; // Position on the world map
  unlocked: boolean;
}

// World map data
export const worldMapData: Record<string, WorldMapLocation> = {
  oakwood_town: {
    id: 'oakwood_town',
    name: 'Oakwood Town',
    type: 'town',
    description: 'A peaceful town surrounded by oak trees. The perfect place to start your adventure.',
    position: { x: 5, y: 5 },
    unlocked: true // Starting area
  },
  whispering_caves: {
    id: 'whispering_caves',
    name: 'Whispering Caves',
    type: 'dungeon',
    description: 'A mysterious cave system where strange whispers can be heard in the darkness.',
    position: { x: 8, y: 3 },
    unlocked: true
  },
  misty_forest: {
    id: 'misty_forest',
    name: 'Misty Forest',
    type: 'wilderness',
    description: 'A dense forest shrouded in mist. Many have gotten lost among its ancient trees.',
    position: { x: 3, y: 7 },
    unlocked: true
  },
  ancient_ruins: {
    id: 'ancient_ruins',
    name: 'Ancient Ruins',
    type: 'dungeon',
    description: 'The remains of an ancient civilization. Treasures and dangers await inside.',
    position: { x: 10, y: 8 },
    unlocked: false // Needs to be unlocked through progression
  }
};

export default worldMapData; 