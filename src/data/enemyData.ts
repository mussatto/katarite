import { Interaction } from './mockInteractions';

// Basic Enemy interface without interactions
export interface BaseEnemy {
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  defense: number;
  gold: number;
  dropItems?: string[]; // Array of itemIds with drop chance
}

// Extended Enemy interface with interactions
export interface Enemy extends BaseEnemy {
  interaction: Interaction;
}