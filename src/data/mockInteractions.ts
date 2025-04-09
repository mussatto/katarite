// This file contains mock data for testing the interaction modal
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
  name: string;
  stages: Record<string, Stage>;
  initialStage: string;
}

export const elderThomasInteraction: Interaction = {
  name: 'Elder Thomas',
  initialStage: 'greeting',
  stages: {
    'greeting': {
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
  name: 'Elf',
  initialStage: 'greeting',
  stages: {
    'greeting': {
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



// Export an object with all interactions
export const interactions: Record<string, Interaction> = {
    elderThomas: elderThomasInteraction,
    elfInteraction: elfInteraction
}; 