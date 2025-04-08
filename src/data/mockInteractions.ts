// This file contains mock data for testing the interaction modal

export type InteractionType = 'npc' | 'enemy';

export interface ActionOption {
  label: string;
  nextStage?: string;
  effect?: () => void;
}

export interface Stage {
  image: string;
  text: string;
  actions: Record<string, ActionOption>;
}

export interface Interaction {
  type: InteractionType;
  name: string;
  stages: Record<string, Stage>;
  initialStage: string;
}

// Mock NPC Interaction - Elder Thomas
export const elderThomasInteraction: Interaction = {
  type: 'npc',
  name: 'Elder Thomas',
  initialStage: 'greeting',
  stages: {
    greeting: {
      image: '/assets/elder.webp',
      text: "Ah, young adventurer! Welcome to Oakwood Town. I am Elder Thomas, the leader of this humble community. How may I assist you today?",
      actions: {
        'ask-about-town': {
          label: 'Tell me about this town',
          nextStage: 'about-town'
        },
        'ask-about-dangers': {
          label: 'Are there any dangers nearby?',
          nextStage: 'about-dangers'
        },
        'farewell': {
          label: 'Farewell',
          // No next stage, will close the modal
        }
      }
    },
    'about-town': {
      image: '/assets/elder.webp',
      text: "Oakwood Town has stood for over three centuries. We are primarily farmers and craftsmen, known for our excellent woodworking. The town was founded around the ancient oak in the town square, which is said to be blessed by forest spirits. We're a peaceful community, though the recent troubles have made everyone anxious.",
      actions: {
        'ask-about-troubles': {
          label: 'What troubles?',
          nextStage: 'about-dangers'
        },
        'ask-about-services': {
          label: 'What services can I find here?',
          nextStage: 'about-services'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        }
      }
    },
    'about-dangers': {
      image: '/assets/elder.webp',
      text: "I'm afraid the Whispering Caves to the north have become increasingly dangerous. Strange creatures have been emerging, and some of our hunters have gone missing. We suspect dark magic is at work. The ancient ruins to the east have always been forbidden, but now we hear unusual noises from that direction as well. Be cautious if you venture beyond our town walls.",
      actions: {
        'offer-help': {
          label: 'I can help investigate',
          nextStage: 'quest-offer'
        },
        'ask-about-reward': {
          label: "What's in it for me?",
          nextStage: 'about-reward'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        }
      }
    },
    'about-services': {
      image: '/assets/elder.webp',
      text: "In town you'll find Elara's shop where you can buy supplies and equipment. The inn offers warm meals and beds if you need rest. Our blacksmith can repair your weapons and armor. For magical supplies, you might want to visit the herbalist at the edge of town, though she's a bit... eccentric.",
      actions: {
        'ask-about-elara': {
          label: 'Tell me about Elara',
          nextStage: 'about-elara'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        },
        'farewell': {
          label: 'Thanks for the information',
          // No next stage, will close the modal
        }
      }
    },
    'about-elara': {
      image: '/assets/elder.webp', // Updated to local asset
      text: "Elara runs the Adventurer's Supplies shop. She inherited it from her father, who was quite the adventurer in his day. She has connections with traders from distant lands, so you might find rare items in her inventory. She's fair with her prices and always willing to buy interesting trinkets you find in your travels.",
      actions: {
        'back-to-services': {
          label: 'Tell me about other services',
          nextStage: 'about-services'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        },
        'farewell': {
          label: 'I should go see her shop',
          // No next stage, will close the modal
        }
      }
    },
    'quest-offer': {
      image: '/assets/elder.webp', // Updated to local asset
      text: "Your courage gives this old man hope! If you could investigate the Whispering Caves and discover what's causing these disturbances, the town would be eternally grateful. Be careful though - take supplies and be prepared for combat. Return to me if you find anything.",
      actions: {
        'accept-quest': {
          label: 'I accept this quest',
          // No next stage, will close the modal
          // In a real implementation, this would add the quest to the player's quest log
        },
        'ask-about-reward': {
          label: "What's in it for me?",
          nextStage: 'about-reward'
        },
        'decline-quest': {
          label: 'I need to prepare first',
          // No next stage, will close the modal
        }
      }
    },
    'about-reward': {
      image: '/assets/elder.webp', // Updated to local asset
      text: "Of course, we wouldn't ask you to risk your life without compensation. The town council has gathered 200 gold as a reward. Additionally, you'd have access to our town's special equipment usually reserved for our guards. And I'm sure your reputation would spread, opening new opportunities for an adventurer like yourself.",
      actions: {
        'accept-quest': {
          label: "That sounds fair, I'll help",
          // No next stage, will close the modal
          // In a real implementation, this would add the quest to the player's quest log
        },
        'back-to-greeting': {
          label: 'Let me think about it',
          nextStage: 'greeting'
        },
        'decline-quest': {
          label: 'Not interested right now',
          // No next stage, will close the modal
        }
      }
    }
  }
};

export const elfInteraction: Interaction = {
  type: 'npc',
  name: 'Elf',
  initialStage: 'greeting',
  stages: {
    greeting: {
      image: '/assets/elf.webp',
      text: "Hello! I'm an elf from the forest. I can help you with your journey if you need.",
      actions: {
        'ask-about-forest': {
          label: 'Tell me about the forest',
          nextStage: 'about-forest'
        },
        'ask-about-help': {
          label: 'Can you help me with something?',
          nextStage: 'about-help'
        },
        'farewell': {
          label: 'Farewell',
          // No next stage, will close the modal
        }
      }
    },
    'about-forest': {
      image: '/assets/elf.webp',
      text: "The forest is home to many creatures and plants. It's a place of beauty and danger. You can find many useful items here if you know where to look.",
      actions: {
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        },
        'farewell': {
          label: 'Thanks for the information',  
          // No next stage, will close the modal
        }
      }
    },
    'about-help': {
      image: '/assets/elf.webp',
      text: "I can help you with your journey if you need. I can give you a map of the forest and some useful items.",
      actions: {
        'ask-about-map': {
          label: 'Tell me about the map', 
          nextStage: 'about-map'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        },
        'farewell': {
          label: 'Thanks for the information',
          // No next stage, will close the modal
        }
      }
    },
    'about-map': {
      image: '/assets/elf.webp',
      text: "The map is a detailed guide to the forest. It shows the locations of all the important landmarks and paths. It's a valuable resource for any adventurer.",
      actions: {
        'back-to-help': {
          label: 'Tell me about other things',
          nextStage: 'about-help'
        },
        'back-to-greeting': {
          label: 'Let me ask something else',
          nextStage: 'greeting'
        },
        'farewell': {
          label: 'Thanks for the information',
          // No next stage, will close the modal  
        }
      }
    }
  }
};

// Mock Enemy Interaction - Giant Spider
export const giantSpiderInteraction: Interaction = {
  type: 'enemy',
  name: 'Giant Spider',
  initialStage: 'encounter',
  stages: {
    'encounter': {
      image: '/assets/spider.png', // Updated to local asset
      text: "As you traverse the dark chamber, a massive spider descends from the ceiling on a thick strand of web. Its multiple eyes gleam in the dim light, and venom drips from its fangs. The creature hisses and moves toward you with surprising speed!",
      actions: {
        'attack': {
          label: 'Attack',
          nextStage: 'combat'
        },
        'defend': {
          label: 'Defend',
          nextStage: 'defend'
        },
        'flee-attempt': {
          label: 'Try to flee',
          nextStage: 'flee-attempt'
        }
      }
    },
    'combat': {
      image: '/assets/combat.png', // Updated to local asset
      text: "You draw your weapon and strike at the spider! Your blow connects, wounding the creature. It shrieks in pain and anger, then lunges at you with its fangs extended!",
      actions: {
        'continue-attack': {
          label: 'Continue attacking',
          nextStage: 'victory'
        },
        'dodge': {
          label: 'Try to dodge',
          nextStage: 'dodge'
        },
        'use-potion': {
          label: 'Use health potion',
          nextStage: 'use-potion'
        }
      }
    },
    'defend': {
      image: '/assets/defend.png', // Updated to local asset
      text: "You raise your guard, preparing for the spider's attack. The creature charges forward, but your defensive stance reduces the impact. You manage to push it back momentarily, creating an opening!",
      actions: {
        'counter-attack': {
          label: 'Counter-attack',
          nextStage: 'victory'
        },
        'continue-defending': {
          label: 'Maintain defense',
          nextStage: 'stalemate'
        },
        'flee': {
          label: 'Try to flee',
          nextStage: 'flee-success'
        }
      }
    },
    'flee-attempt': {
      image: '/assets/flee.png', // Updated to local asset
      text: "You turn to escape, but the spider is too quick! It shoots a strand of sticky web that catches your leg, impeding your movement. The creature moves in closer, preparing to strike!",
      actions: {
        'cut-web': {
          label: 'Cut the web and fight',
          nextStage: 'combat'
        },
        'struggle': {
          label: 'Struggle to break free',
          nextStage: 'wounded-escape'
        },
        'throw-item': {
          label: 'Throw something as distraction',
          nextStage: 'flee-success'
        }
      }
    },
    'victory': {
      image: '/assets/victory.png', // Updated to local asset
      text: "With a final, decisive strike, you pierce the giant spider's body! The creature shudders and collapses, its legs curling inward. You've defeated the monster! Searching the area, you find the remains of previous victims and some valuable items among the spider's treasures.",
      actions: {
        'collect-loot': {
          label: 'Collect loot (25 gold, Health Potion)',
          // No next stage, will close the modal
          // In a real implementation, this would add items to inventory
        },
        'examine-web': {
          label: 'Examine the spider web',
          nextStage: 'examine-web'
        },
        'leave': {
          label: 'Leave the area',
          // No next stage, will close the modal
        }
      }
    },
    'dodge': {
      image: '/assets/dodge.png', // Updated to local asset
      text: "You deftly sidestep as the spider lunges! Its fangs snap shut on empty air, and the creature slams into the wall behind you. This gives you a perfect opportunity to strike while it's disoriented.",
      actions: {
        'strike': {
          label: 'Strike now!',
          nextStage: 'victory'
        },
        'retreat': {
          label: 'Retreat to safer position',
          nextStage: 'stalemate'
        },
        'flee': {
          label: 'Try to flee',
          nextStage: 'flee-success'
        }
      }
    },
    'use-potion': {
      image: '/assets/potion.png', // Updated to local asset
      text: "You quickly retrieve a health potion and drink it. Warmth flows through your body as your wounds begin to close. Reinvigorated, you face the spider with renewed strength just as it prepares another attack!",
      actions: {
        'renewed-attack': {
          label: 'Attack with renewed strength',
          nextStage: 'victory'
        },
        'defensive-stance': {
          label: 'Take defensive stance',
          nextStage: 'stalemate'
        },
        'special-move': {
          label: 'Use special ability',
          nextStage: 'victory'
        }
      }
    },
    stalemate: {
      image: '/assets/stalemate.png', // Updated to local asset
      text: "You and the spider circle each other cautiously. The creature seems to be assessing you, looking for weaknesses. Its movements become more deliberate, and you realize this is no ordinary spider - it's hunting with intelligence!",
      actions: {
        'aggressive-attack': {
          label: 'Launch aggressive attack',
          nextStage: 'victory'
        },
        'careful-approach': {
          label: 'Approach carefully',
          nextStage: 'combat'
        },
        'environment': {
          label: 'Use environment to advantage',
          nextStage: 'victory'
        }
      }
    },
    'flee-success': {
      image: '/assets/escape.png', // Updated to local asset
      text: "Using quick thinking, you create a distraction that confuses the spider momentarily. Taking advantage of this opportunity, you sprint toward the exit. The creature gives chase but can't match your speed in the open passage. You've successfully escaped!",
      actions: {
        'continue': {
          label: 'Continue exploring',
          // No next stage, will close the modal
        },
        'rest': {
          label: 'Find a safe place to rest',
          // No next stage, will close the modal
        },
        'return': {
          label: 'Return to town',
          // No next stage, will close the modal
        }
      }
    },
    'wounded-escape': {
      image: '/assets/wounded.png', // Updated to local asset
      text: "You struggle frantically against the sticky web. Just as the spider closes in, you manage to tear free, though the effort leaves you with minor injuries. You scramble away, the spider in pursuit, but manage to squeeze through a narrow crevice the creature can't follow through. You're safe, but wounded.",
      actions: {
        'tend-wounds': {
          label: 'Tend to your wounds',
          // No next stage, will close the modal
        },
        'continue-carefully': {
          label: 'Continue exploring carefully',
          // No next stage, will close the modal
        },
        'return': {
          label: 'Return to town',
          // No next stage, will close the modal
        }
      }
    },
    'examine-web': {
      image: '/assets/web.png', // Updated to local asset
      text: "You carefully examine the giant spider web. Among the strands, you discover several cocoons containing previous victims. Most are too decomposed to identify, but you notice one still clutching a map. Carefully extracting it, you find it shows a hidden passage deeper in the caves, marked with a strange symbol.",
      actions: {
        'take-map': {
          label: 'Take the map',
          // No next stage, will close the modal
          // In a real implementation, this would add the map to inventory
        },
        'examine-symbol': {
          label: 'Try to identify the symbol',
          // No next stage, will close the modal
        },
        'leave': {
          label: 'Leave the area',
          // No next stage, will close the modal
        }
      }
    }
  }
};

// Export an object with all interactions
export const mockInteractions: Record<string, Interaction> = {
  elderThomas: elderThomasInteraction,
  giantSpider: giantSpiderInteraction
}; 