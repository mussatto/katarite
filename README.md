# TileTurn Tactics (React RPG Framework)

A simple, foundational framework for creating a choice-based, turn-based RPG within a single-page application (SPA). Built with React and styled using DaisyUI and Tailwind CSS.

## Core Concept

This project provides the basic structure for a tile-based RPG where players explore rooms within larger areas, navigate a world map, manage inventory and gold, interact with shops, and engage in turn-based actions (movement, combat, skills). The focus is on clear UI interactions (clicking) and a responsive layout. Skills progress through usage.

## Tech Stack

* **Framework:** React
* **Styling:** Tailwind CSS
* **Component Library:** DaisyUI (requires Tailwind CSS)
* **Language:** JavaScript (ES6+)
* **Environment:** Node.js, npm / yarn

## Key Features

* **Tile-Based Grid:** Visual representation of rooms using a tile grid (e.g., 32x32 tiles).
* **Turn-Based System:** Player takes an action (move, attack, skill, etc.), followed by all NPCs/enemies taking their actions.
* **Click Interaction:** Movement and targeting are primarily handled via clicking on map tiles or UI elements.
* **Skill Progression:** Character skills improve based on how often they are used successfully.
* **Multi-Layered Navigation:**
    * **World Map:** High-level view to select major Areas (towns, dungeons).
    * **Areas:** Collections of interconnected Rooms.
    * **Rooms:** Individual tile maps where gameplay occurs, featuring exits to other rooms or the world map.
* **Inventory & Gold:** Players can collect items and manage currency (gold).
* **Shops:** Designated locations or NPCs for buying and selling items.
* **Start & Load Screen:** Simple initial screen for starting a new game or loading a saved one.
* **Save/Load System:** Basic functionality to persist game state (likely using browser `localStorage`).
* **Responsive UI:** Layout designed to adapt to different screen sizes, leveraging CSS and DaisyUI components.

## Screen Layout & Views

The application utilizes several key views/states:

1.  **Start Screen:** Initial view with "New Game" and "Load Game" options.
2.  **World Map View:** Displays the world map for area selection.
3.  **Area Map View (Main Game Screen):**
    * **Left (approx. 75%):** Displays the current Room's tile grid, characters, and interactable elements.
    * **Right (approx. 25%):**
        * **Top:** System Message Log (combat results, NPC chat, XP gains).
        * **Middle:** Player Status / Contextual Info (optional).
        * **Bottom:** Action Menu (Attack, Defend, Skills, Chat, Inventory, etc.). Player Gold is also displayed here.
4.  **Inventory View:** Screen/modal to view and manage player inventory.
5.  **Shop View:** Screen/modal for buy/sell interactions with shops/NPCs.

## Project Structure (Example)

A possible organization for the source code:

/public
index.html
...other static assets
/src
/components     # Reusable UI components (Button, MapTile, CharacterSprite, ActionMenu, etc.)
/ui           # General UI elements
/game         # Game-specific components
/data           # Game data definitions (items, skills, area layouts - potentially JSON)
/gameLogic      # Core game systems (turn manager, combat calculations, AI, movement validation)
/state          # State management setup (e.g., React Context, Zustand, or Redux slice definitions)
/views          # Components representing major screen views (StartScreen, WorldMapView, AreaMapView, etc.)
/assets         # Images, spritesheets, etc.
App.js          # Main application component, handles routing/view switching
index.js        # Entry point
/tailwind.config.js
/postcss.config.js
...other config files (package.json, etc.)


1. Application Start-Up Flow:

Initial View (StartScreen):
When the application loads, the very first thing the user sees is a simple screen.
Components: A background image/color, the game title, and two prominent buttons:
[ Start New Game ]
[ Load Game ]
Logic:
Start New Game: Initializes a default gameState object (player stats, starting gold, empty inventory, starting location - perhaps on the world map or in a specific initial room), then transitions the view to the appropriate starting point (e.g., WorldMap or AreaMap).
Load Game: Attempts to load a saved gameState from localStorage (or another persistence method). If successful, transitions the view to the location saved in that state. If no save exists or loading fails, might disable the button or show a message.
2. Multi-Layered Map Navigation:

Concept: Introduce distinct views/states for different levels of navigation.
WorldMapView: A high-level map showing major Areas (Towns, Dungeons, Forests). The player is represented by an icon moving between these areas.
AreaMapView: The main tactical, tile-based view you initially described. This view displays the Rooms within a specific Area (like the different floors/sections of a dungeon, or streets/buildings in a town).
Rooms: The individual grids where turn-based movement and combat occur. Defined by their tile layout, characters, items, and Exits.
Data Structure Additions:
worldMapData: Defines connectable Areas, their names, locations on the world map graphic, and maybe unlock status.
areaData: A collection defining each Area (e.g., "Whispering Caves", "Oakwood Town"). Each area object would contain:
id: Unique identifier (e.g., "oakwood_town").
name: "Oakwood Town".
type: "Town" / "Dungeon".
rooms: A list or object mapping roomIds belonging to this area to their data files/definitions.
entryPoint: The roomId and {x, y} coordinates where the player appears when entering this area from the World Map.
roomData (Enhancement): Each room definition now needs an exits property. This could be an array of objects:
{ x, y, target: 'neighboring_room_id', targetX, targetY } (Exit to another room in the same Area)
{ x, y, target: 'WORLD_MAP', targetAreaId: 'optional_specific_area_on_map' } (Exit back to the World Map view)
UI Components:
WorldMapDisplay: Renders the world map graphic, player icon, clickable Area markers.
AreaMapDisplay (previously MapDisplay): The tile-grid view. Now responsible for loading data for the current room within the current area.
Logic Flow:
Player reaches an exit tile in AreaMapView.
Check roomData.exits for that tile.
If target is another roomId: Load the data for the new room, update player position, stay in AreaMapView.
If target is 'WORLD_MAP': Change the application state to WorldMapView, potentially update the player's last visited area marker on the world map.
Player clicks an Area marker in WorldMapView.
Change application state to AreaMapView, load the areaData for the selected area, load the roomData for the area's entryPoint room, place the player at the entry coordinates.
3. Inventory System:

Concept: Allows the player to manage collected items.
Data Structure Additions:
player.inventory: An array within the player's state object, e.g., [{ itemId: 'health_potion', quantity: 5 }, { itemId: 'sword_basic', quantity: 1, equipped: true }].
itemDatabase: A global definition list/object mapping itemIds to their properties (name, description, type: 'consumable'/'weapon'/'armor', effect, equipableSlot, value).
UI Components:
InventoryScreen: A dedicated view (potentially a modal overlay or a full-screen state) that displays items from player.inventory. Allows viewing details, using consumables, equipping/unequipping gear.
Add an [ Inventory ] button to the main HUD (the right-side panel).
Logic Flow:
Clicking the Inventory button sets the application state to INVENTORY_VIEW, rendering the InventoryScreen.
Interactions within the InventoryScreen (e.g., clicking "Use" on a potion) trigger functions that modify player.inventory and potentially player.stats (like useHealthPotion()), then update the view.
A "Close" button returns the application state to the previous view (AreaMapView or WorldMapView).
4. Gold System:

Concept: A simple currency for transactions.
Data Structure Additions:
player.gold: A number property within the player's state object.
UI Components:
Display the current player.gold amount prominently in the main HUD (right-side panel).
Logic Flow: Update player.gold when finding loot, completing quests (if implemented), or buying/selling at shops.
5. Shops:

Concept: Specific locations or NPCs where players can buy and sell items.
Data Structure Additions:
Shops can be defined within roomData or linked to specific NPCs. A shop definition needs:
inventory: List of itemIds the shop sells (can be static or dynamic). Potentially with limited stock counts.
buyModifier / sellModifier: Factors applied to base item values (shops usually buy low, sell high).
UI Components:
ShopInterface: A dedicated view (likely modal or full-screen) showing the Shop's inventory and the Player's inventory side-by-side. Includes "Buy" / "Sell" buttons. Displays prices based on item base value and shop modifiers.
Logic Flow:
Player interacts with a shopkeeper NPC or a designated shop tile/object (e.g., via the Chat or a dedicated Trade action).
Set application state to SHOP_VIEW, rendering the ShopInterface and passing in relevant shop and player data.
"Buy" logic: Check if player has enough gold, decrease player gold, increase item quantity in player.inventory (or add the item if new), potentially decrease shop stock.
"Sell" logic: Check if player has the item, decrease item quantity in player.inventory, increase player gold (based on sell price).
An "Exit" button returns the application state to AreaMapView.
Updated Application States:

Your main application will now need to manage transitions between these high-level states:

START_SCREEN
WORLD_MAP_VIEW
AREA_MAP_VIEW (The core tactical gameplay loop happens here)
INVENTORY_VIEW
SHOP_VIEW
GAME_OVER_SCREEN (Implied necessity)
Data Persistence (Save/Load):

You'll need functions to saveGame() and loadGame().
saveGame() should serialize the entire relevant game state (player data including inventory/gold/skills/location, current area/room, maybe world map discovery status, NPC states if persistent) into a JSON string and store it (e.g., in localStorage).
loadGame() should retrieve this JSON, parse it, and use it to rehydrate the application's state, placing the player back where they saved.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
