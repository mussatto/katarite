import React, { useState } from 'react';
import { useGame } from '../state/gameContext';
import itemDatabase from '../data/itemDatabase';

const ShopView: React.FC = () => {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  // Shop modifier constants
  const BUY_MODIFIER = 1.5; // Shop sells at higher price
  const SELL_MODIFIER = 0.5; // Shop buys at lower price
  
  // Get shop inventory
  const shopInventory = state.activeShop?.inventory || [];
  
  // Buying an item
  const handleBuyItem = (itemId: string) => {
    const item = itemDatabase[itemId];
    
    if (!item) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: 'Error: Item not found in database.',
          type: 'system'
        }
      });
      return;
    }
    
    const buyPrice = Math.ceil(item.value * BUY_MODIFIER);
    
    // Check if player has enough gold
    if (state.player.gold < buyPrice) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: `You don't have enough gold to buy ${item.name}.`,
          type: 'system'
        }
      });
      return;
    }
    
    // Spend gold
    dispatch({
      type: 'SPEND_GOLD',
      payload: buyPrice
    });
    
    // Add item to inventory
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        itemId,
        quantity: 1
      }
    });
    
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: `You bought ${item.name} for ${buyPrice} gold.`,
        type: 'system'
      }
    });
  };
  
  // Selling an item
  const handleSellItem = (itemId: string) => {
    const item = itemDatabase[itemId];
    const inventoryItem = state.player.inventory.find(i => i.itemId === itemId);
    
    if (!item || !inventoryItem) {
      dispatch({
        type: 'ADD_LOG_MESSAGE',
        payload: {
          text: 'Error: Item not found.',
          type: 'system'
        }
      });
      return;
    }
    
    // Calculate sell price
    const sellPrice = Math.floor(item.value * SELL_MODIFIER);
    
    // Remove item from inventory
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        itemId,
        quantity: 1
      }
    });
    
    // Add gold
    dispatch({
      type: 'ADD_GOLD',
      payload: sellPrice
    });
    
    dispatch({
      type: 'ADD_LOG_MESSAGE',
      payload: {
        text: `You sold ${item.name} for ${sellPrice} gold.`,
        type: 'system'
      }
    });
  };
  
  // Close shop
  const handleCloseShop = () => {
    dispatch({ type: 'CLOSE_SHOP' });
  };
  
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <div className="bg-base-100 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Shop</h1>
          <div>
            <span className="text-warning mr-4">
              <span className="font-bold">Gold:</span> {state.player.gold}
            </span>
            <button 
              className="btn btn-sm"
              onClick={handleCloseShop}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 h-full">
          <div className="tabs tabs-boxed mb-4">
            <button
              className={`tab ${activeTab === 'buy' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              className={`tab ${activeTab === 'sell' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>
          
          {activeTab === 'buy' ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Available Items</h2>
              
              {shopInventory.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                  No items available.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[70vh]">
                  {shopInventory.map((itemId) => {
                    const item = itemDatabase[itemId];
                    if (!item) return null;
                    
                    const buyPrice = Math.ceil(item.value * BUY_MODIFIER);
                    const canAfford = state.player.gold >= buyPrice;
                    
                    return (
                      <div 
                        key={itemId} 
                        className={`border rounded-lg p-4 flex justify-between items-center ${
                          canAfford ? 'border-base-content/20' : 'border-error/30 bg-error/5'
                        }`}
                      >
                        <div>
                          <div className="font-bold flex items-center">
                            {item.name}
                            <span className="badge badge-sm ml-2">
                              {item.type}
                            </span>
                          </div>
                          <div className="text-sm opacity-70">
                            {item.description}
                          </div>
                          <div className="text-xs mt-1">
                            {item.type === 'weapon' && item.damage ? `Damage: +${item.damage}` : ''}
                            {item.type === 'armor' && item.defense ? `Defense: +${item.defense}` : ''}
                            {item.type === 'consumable' && item.healing ? `Healing: +${item.healing}` : ''}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-warning mb-2">
                            {buyPrice} gold
                          </div>
                          <button 
                            className={`btn btn-sm ${canAfford ? 'btn-primary' : 'btn-disabled'}`}
                            onClick={() => handleBuyItem(itemId)}
                            disabled={!canAfford}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Your Items</h2>
              
              {state.player.inventory.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                  Your inventory is empty.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[70vh]">
                  {state.player.inventory.map((invItem) => {
                    const item = itemDatabase[invItem.itemId];
                    if (!item) return null;
                    
                    const sellPrice = Math.floor(item.value * SELL_MODIFIER);
                    
                    return (
                      <div 
                        key={invItem.itemId} 
                        className="border border-base-content/20 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold flex items-center">
                            {item.name}
                            <span className="badge badge-sm ml-2">
                              {item.type}
                            </span>
                            <span className="text-xs ml-2">
                              (x{invItem.quantity})
                            </span>
                          </div>
                          <div className="text-sm opacity-70">
                            {item.description}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-warning mb-2">
                            {sellPrice} gold
                          </div>
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handleSellItem(invItem.itemId)}
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopView; 