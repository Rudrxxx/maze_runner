# Maze Runner Game

A React-based maze game with 50 progressively difficult levels where players need to navigate through mazes to collect prizes.

## Features

- 50 progressively difficult maze levels
- Random maze generation for diverse gameplay
- Time-limited challenges
- Player movement with arrow keys or on-screen controls
- Track moves and completion time
- Mobile-responsive design

## Game Rules

1. Navigate the maze using arrow keys or the on-screen directional buttons
2. Avoid walls and find the shortest path to the prize
3. Complete each level within the time limit
4. Complete levels to unlock new ones
5. Try to complete all levels with the fewest moves and fastest times

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
```
npm install
```
4. Start the development server:
```
npm start
```
5. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- React
- JavaScript (ES6+)
- CSS3

## Game Mechanics

- **Maze Generation**: Each level features a uniquely generated maze with increasing size and complexity
- **Difficulty Progression**: As levels increase, maze size grows, wall density increases, and time limits tighten
- **Player Movement**: Control the player using keyboard arrows or on-screen controls
- **Prize Collection**: Reach the gold prize to complete each level
- **Level Unlocking**: Complete a level to unlock the next one
- **Performance Tracking**: Track moves and completion time for each level

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects the app from Create React App

## License

This project is licensed under the MIT License.
