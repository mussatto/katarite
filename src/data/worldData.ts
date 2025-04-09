import areaData, { Area } from "./areaData";

// Types
export interface WorldMapLocation {
  name: string;
  type: 'town' | 'dungeon' | 'wilderness';
  description: string;
  position: { x: number; y: number }; // Position on the world map
  unlocked: boolean;
  area: Area;
}

// World map data
export const worldMapData: Record<string, WorldMapLocation> = {
  "oakwood-town-location" : {
    name: 'Oakwood Town',
    type: 'town',
    description: 'A peaceful town surrounded by oak trees. The perfect place to start your adventure.',
    position: { x: 5, y: 5 },
    unlocked: true, // Starting area
    area: areaData['oakwood_area']
  }
};

export default worldMapData; 