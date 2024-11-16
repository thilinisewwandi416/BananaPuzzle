import React from 'react';
import './MessagePopupModal.css';

const MessagePopupModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessagePopupModal;