import React from 'react';
import './MessagePopupModal.css';

const MessagePopupModal = ({ message, onClose, onPlayAgain }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="close-button" onClick={onClose}>Close</button>
          {onPlayAgain && (
            <button className="play-again-button" onClick={onPlayAgain}>Play Again</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePopupModal;