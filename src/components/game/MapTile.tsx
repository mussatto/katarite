import React from 'react';
import { TileType } from '../../data/areaData';

interface MapTileProps {
  type: TileType;
  x: number;
  y: number;
  hasPlayer: boolean;
  hasNPC?: boolean;
  hasEnemy?: boolean;
  hasItem?: boolean;
  isExit?: boolean;
  onClick: (x: number, y: number) => void;
}

const MapTile: React.FC<MapTileProps> = ({
  type,
  x,
  y,
  hasPlayer,
  hasNPC,
  hasEnemy,
  hasItem,
  isExit,
  onClick
}) => {
  // Default styling based on tile type
  const getTileStyle = (): string => {
    // Base tile class
    let baseClass = 'w-10 h-10 flex items-center justify-center text-center cursor-pointer';
    
    // Add specific styling for each tile type
    switch (type) {
      case 'floor':
        baseClass += ' bg-base-200';
        break;
      case 'wall':
        baseClass += ' bg-stone-700 cursor-not-allowed';
        break;
      case 'door':
        baseClass += ' bg-amber-800';
        break;
      case 'water':
        baseClass += ' bg-blue-500';
        break;
      case 'grass':
        baseClass += ' bg-green-600';
        break;
      case 'road':
        baseClass += ' bg-stone-400';
        break;
      case 'bridge':
        baseClass += ' bg-amber-600';
        break;
      case 'shop_counter':
        baseClass += ' bg-amber-400';
        break;
      case 'chest':
        baseClass += ' bg-amber-700';
        break;
      case 'stairs_up':
      case 'stairs_down':
        baseClass += ' bg-stone-500';
        break;
      case 'bed':
        baseClass += ' bg-red-400';
        break;
      default:
        baseClass += ' bg-base-300';
    }
    
    // Add hover effect if tile is interactive
    if (type !== 'wall') {
      baseClass += ' hover:opacity-80';
    }
    
    // Add exit styling
    if (isExit) {
      baseClass += ' border-2 border-yellow-400';
    }
    
    return baseClass;
  };
  
  // Get content to display in the tile
  const getTileContent = () => {
    if (hasPlayer) {
      return <div className="text-xl text-primary font-bold">@</div>;
    }
    
    if (hasNPC) {
      return <div className="text-xl text-success font-bold">N</div>;
    }
    
    if (hasEnemy) {
      return <div className="text-xl text-error font-bold">E</div>;
    }
    
    if (hasItem) {
      return <div className="text-xl text-info font-bold">i</div>;
    }
    
    // Display different symbol based on tile type
    switch (type) {
      case 'door':
        return <div className="text-lg">D</div>;
      case 'chest':
        return <div className="text-lg">C</div>;
      case 'stairs_up':
        return <div className="text-lg">↑</div>;
      case 'stairs_down':
        return <div className="text-lg">↓</div>;
      case 'shop_counter':
        return <div className="text-lg">$</div>;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    // Don't allow clicking on walls
    if (type === 'wall') return;
    
    onClick(x, y);
  };
  
  return (
    <div 
      className={getTileStyle()}
      onClick={handleClick}
      title={`${type} (${x},${y})`}
    >
      {getTileContent()}
    </div>
  );
};

export default MapTile; 