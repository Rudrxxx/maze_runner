import React, { useCallback, useEffect } from 'react';
import '../styles/Game.css';

const Maze = ({ grid, playerPosition, onMove }) => {
  // Use useCallback to memoize the handleKeyDown function
  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    
    let newRow = playerPosition.row;
    let newCol = playerPosition.col;
    
    // Handle arrow key movement
    switch (e.key) {
      case 'ArrowUp':
        newRow--;
        break;
      case 'ArrowDown':
        newRow++;
        break;
      case 'ArrowLeft':
        newCol--;
        break;
      case 'ArrowRight':
        newCol++;
        break;
      default:
        return; // Don't do anything for other keys
    }
    
    // Check if the move is valid
    if (newRow >= 0 && 
        newRow < grid.length && 
        newCol >= 0 && 
        newCol < grid[0].length && 
        grid[newRow][newCol] !== 1) { // Not a wall
      onMove({ row: newRow, col: newCol });
    }
  }, [playerPosition, grid, onMove]);
  
  // Add keydown event listener when component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Calculate grid template dimensions
  const gridTemplateColumns = `repeat(${grid[0].length}, 1fr)`;
  
  // Virtual controller for mobile devices
  const handleDirectionClick = (direction) => {
    let newRow = playerPosition.row;
    let newCol = playerPosition.col;
    
    switch (direction) {
      case 'up':
        newRow--;
        break;
      case 'down':
        newRow++;
        break;
      case 'left':
        newCol--;
        break;
      case 'right':
        newCol++;
        break;
      default:
        return;
    }
    
    if (newRow >= 0 && 
        newRow < grid.length && 
        newCol >= 0 && 
        newCol < grid[0].length && 
        grid[newRow][newCol] !== 1) {
      onMove({ row: newRow, col: newCol });
    }
  };
  
  return (
    <div className="maze-wrapper">
      <div 
        className="maze-grid" 
        style={{ 
          gridTemplateColumns,
          gridTemplateRows: `repeat(${grid.length}, 1fr)`
        }}
      >
        {grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => {
            const isPlayer = rowIndex === playerPosition.row && colIndex === playerPosition.col;
            const isPrize = cell === 3;
            const isWall = cell === 1;
            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`maze-cell ${isWall ? 'maze-wall' : 'maze-path'}`}
              >
                {isPlayer && <div className="player"></div>}
                {isPrize && !isPlayer && <div className="prize"></div>}
              </div>
            );
          })
        )}
      </div>
      
      {/* Virtual controller for mobile/touch devices */}
      <div className="virtual-controller">
        <button className="control-btn up" onClick={() => handleDirectionClick('up')}>↑</button>
        <div className="horizontal-controls">
          <button className="control-btn left" onClick={() => handleDirectionClick('left')}>←</button>
          <button className="control-btn right" onClick={() => handleDirectionClick('right')}>→</button>
        </div>
        <button className="control-btn down" onClick={() => handleDirectionClick('down')}>↓</button>
      </div>
    </div>
  );
};

export default Maze; 