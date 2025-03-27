import React, { useState, useEffect } from 'react';
import Maze from './Maze';
import Modal from './Modal';
import LevelSelector from './LevelSelector';
import levels from '../data/levels';
import '../styles/Game.css';

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(levels[0]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', showNextButton: false });
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [moves, setMoves] = useState(0);
  
  // Initialize player position when the level changes
  useEffect(() => {
    // Find player starting position (cell with value 2)
    for (let row = 0; row < currentLevel.grid.length; row++) {
      for (let col = 0; col < currentLevel.grid[row].length; col++) {
        if (currentLevel.grid[row][col] === 2) {
          setPlayerPosition({ row, col });
          break;
        }
      }
    }
    
    // Reset game state for new level
    setMoves(0);
    setTimeLeft(currentLevel.timeLimit);
    setGameStarted(false);
    setGameOver(false);
  }, [currentLevel]);
  
  // Timer countdown
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameStarted && timeLeft === 0 && !gameOver) {
      // Time's up
      setGameOver(true);
      setShowModal(true);
      setModalData({
        title: 'Time\'s Up!',
        message: 'You ran out of time. Try again!',
        showNextButton: false
      });
    }
    
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft, gameOver]);
  
  // Handle player movement
  const handleMove = (newPosition) => {
    if (gameOver) return;
    
    // Start the game with the first move
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Update player position
    setPlayerPosition(newPosition);
    setMoves(moves + 1);
    
    // Check if player reached the prize
    const cell = currentLevel.grid[newPosition.row][newPosition.col];
    if (cell === 3) {
      // Level completed
      setGameOver(true);
      
      // Add to completed levels if not already there
      if (!completedLevels.includes(currentLevel.id)) {
        setCompletedLevels([...completedLevels, currentLevel.id]);
      }
      
      // Show completion modal
      setShowModal(true);
      setModalData({
        title: 'Level Completed!',
        message: `Congratulations! You completed level ${currentLevel.id} in ${moves + 1} moves with ${timeLeft} seconds left.`,
        showNextButton: currentLevel.id < levels.length
      });
    }
  };
  
  // Handle restart level
  const handleRestart = () => {
    // Reset player position to starting point
    for (let row = 0; row < currentLevel.grid.length; row++) {
      for (let col = 0; col < currentLevel.grid[row].length; col++) {
        if (currentLevel.grid[row][col] === 2) {
          setPlayerPosition({ row, col });
          break;
        }
      }
    }
    
    // Reset game state
    setMoves(0);
    setTimeLeft(currentLevel.timeLimit);
    setGameStarted(false);
    setGameOver(false);
  };
  
  // Handle moving to next level
  const handleNextLevel = () => {
    setShowModal(false);
    if (currentLevel.id < levels.length) {
      setCurrentLevel(levels[currentLevel.id]);
    }
  };
  
  // Handle level selection
  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
  };
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Maze Runner</h1>
        <div className="game-info">
          <div className="game-stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{currentLevel.id}</span>
          </div>
          <div className="game-stat">
            <span className="stat-label">Difficulty</span>
            <span className="stat-value">{currentLevel.difficulty}</span>
          </div>
          <div className="game-stat">
            <span className="stat-label">Time Left</span>
            <span className="stat-value">{timeLeft}</span>
          </div>
          <div className="game-stat">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moves}</span>
          </div>
        </div>
      </div>
      
      <div className="game-controls">
        <button className="control-button restart" onClick={handleRestart}>
          Restart Level
        </button>
      </div>
      
      <div className="maze-container">
        <Maze 
          grid={currentLevel.grid} 
          playerPosition={playerPosition} 
          onMove={handleMove}
        />
      </div>
      
      <h2>Select Level</h2>
      <LevelSelector 
        levels={levels}
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        onLevelSelect={handleLevelSelect}
      />
      
      {showModal && (
        <Modal
          title={modalData.title}
          message={modalData.message}
          onClose={() => setShowModal(false)}
          onNext={handleNextLevel}
          showNextButton={modalData.showNextButton}
        />
      )}
    </div>
  );
};

export default Game; 