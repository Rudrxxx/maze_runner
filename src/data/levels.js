// Maze level configuration
// Each level has:
// - grid: Array representing the maze (0 = path, 1 = wall, 2 = player starting position, 3 = prize)
// - difficulty: Level difficulty (easy, medium, hard)
// - timeLimit: Time limit in seconds

const generateMaze = (width, height, wallPercentage) => {
  const maze = Array(height).fill().map(() => Array(width).fill(0));
  
  // Add random walls
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Keep borders as walls
      if (y === 0 || x === 0 || y === height - 1 || x === width - 1) {
        maze[y][x] = 1;
      } 
      // Add random walls
      else if (Math.random() < wallPercentage) {
        maze[y][x] = 1;
      }
    }
  }
  
  // Place player at a random position
  let playerX, playerY;
  do {
    playerX = Math.floor(Math.random() * (width - 2)) + 1;
    playerY = Math.floor(Math.random() * (height - 2)) + 1;
  } while (maze[playerY][playerX] === 1);
  
  maze[playerY][playerX] = 2;
  
  // Place prize at a random position far from player
  let prizeX, prizeY;
  do {
    prizeX = Math.floor(Math.random() * (width - 2)) + 1;
    prizeY = Math.floor(Math.random() * (height - 2)) + 1;
    // Make sure prize is not on a wall or player and is far enough from player
    const distance = Math.sqrt(Math.pow(prizeX - playerX, 2) + Math.pow(prizeY - playerY, 2));
  } while (maze[prizeY][prizeX] !== 0 || Math.sqrt(Math.pow(prizeX - playerX, 2) + Math.pow(prizeY - playerY, 2)) < Math.min(width, height) / 2);
  
  maze[prizeY][prizeX] = 3;
  
  return maze;
};

// Generate 50 levels with increasing difficulty
const levels = Array(50).fill().map((_, index) => {
  const level = index + 1;
  let difficulty, gridSize, wallPercentage, timeLimit;
  
  // Adjust difficulty parameters based on level
  if (level <= 10) {
    difficulty = 'easy';
    gridSize = 10 + Math.floor(level / 2);
    wallPercentage = 0.2 + (level * 0.01);
    timeLimit = 30 + (level * 5);
  } else if (level <= 30) {
    difficulty = 'medium';
    gridSize = 15 + Math.floor((level - 10) / 4);
    wallPercentage = 0.3 + ((level - 10) * 0.005);
    timeLimit = 60 + ((level - 10) * 3);
  } else {
    difficulty = 'hard';
    gridSize = 20 + Math.floor((level - 30) / 4);
    wallPercentage = 0.4 + ((level - 30) * 0.005);
    timeLimit = 90 + ((level - 30) * 3);
  }
  
  return {
    id: level,
    difficulty,
    timeLimit,
    grid: generateMaze(gridSize, gridSize, wallPercentage),
    gridSize,
  };
});

export default levels; 