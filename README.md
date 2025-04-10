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

