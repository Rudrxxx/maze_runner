import React from 'react';
import '../styles/Game.css';

const Modal = ({ title, message, onClose, onNext, showNextButton }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {showNextButton && (
            <button className="modal-button" onClick={onNext}>
              Next Level
            </button>
          )}
          <button className="modal-button" onClick={onClose}>
            {showNextButton ? 'Stay on Level' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 