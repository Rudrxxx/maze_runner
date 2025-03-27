import React from 'react';
import '../styles/Game.css';

const LevelSelector = ({ levels, currentLevel, completedLevels, onLevelSelect }) => {
  return (
    <div className="level-selector">
      {levels.map((level) => {
        const isCompleted = completedLevels.includes(level.id);
        const isCurrent = currentLevel.id === level.id;
        const isLocked = !isCompleted && level.id !== 1 && !completedLevels.includes(level.id - 1);
        
        return (
          <button
            key={level.id}
            className={`level-button ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
            onClick={() => !isLocked && onLevelSelect(level)}
            disabled={isLocked}
          >
            {level.id}
          </button>
        );
      })}
    </div>
  );
};

export default LevelSelector; 