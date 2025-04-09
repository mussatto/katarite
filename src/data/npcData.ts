import { Interaction, elderThomasInteraction, elfInteraction } from './mockInteractions';

export interface NPC {
  name: string;
  isShop: boolean;
  shopInventory?: string[];
  interaction?: Interaction;
}

export const ELDER_THOMAS: NPC = {
  name: 'Elder Thomas',
  isShop: false,
  interaction: elderThomasInteraction
};

export const SHOPKEEPER: NPC = {
  name: 'Elara',
  isShop: true,
  shopInventory: ['health_potion', 'bread', 'sword_basic', 'leather_armor'],
  interaction: {
    name: 'Elara',
    initialStage: 'greeting',
    stages: {
      greeting: {
        image: '/assets/shopkeeper.webp',
        text: "Welcome to Adventurer's Supplies! I'm Elara. Looking for something specific today?",
        actions: {
          'shop': {
            label: 'I want to see your wares',
            // No next stage as this would trigger shop UI
          },
          'ask-about-shop': {
            label: 'Tell me about your shop',
            nextStage: 'about-shop'
          },
          'farewell': {
            label: 'Just browsing, thanks',
            // No next stage, will close the modal
          }
        }
      },
      'about-shop': {
        image: '/assets/shopkeeper.webp',
        text: "My father started this shop after his adventuring days ended. I've been running it for the past five years. We stock all the essentials an adventurer might need - potions, food, basic weapons and armor. If you're looking for something special, I can sometimes place orders with traders from the capital.",
        actions: {
          'shop': {
            label: 'Let me see what you have',
            // No next stage as this would trigger shop UI
          },
          'ask-about-rare': {
            label: 'Do you have any rare items?',
            nextStage: 'about-rare'
          },
          'farewell': {
            label: 'Thanks for the information',
            // No next stage, will close the modal
          }
        }
      },
      'about-rare': {
        image: '/assets/shopkeeper.webp',
        text: "Rare items? Well, I did receive a shipment last week with some interesting pieces. I have a finely crafted dagger from the eastern kingdoms and a potion that the alchemist says can temporarily enhance magical abilities. They're not cheap, but quality never is.",
        actions: {
          'shop': {
            label: 'I\'d like to see these items',
            // No next stage as this would trigger shop UI
          },
          'back-to-greeting': {
            label: 'Let me ask something else',
            nextStage: 'greeting'
          },
          'farewell': {
            label: 'I\'ll think about it',
            // No next stage, will close the modal
          }
        }
      }
    }
  }
};

export const ELF: NPC = {
  name: 'Elf',
  isShop: false,
  interaction: elfInteraction
};
