import React from "react";
import "./PasswordResetModal.css";

const PasswordResetModal = ({ title, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose} className="primary-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
