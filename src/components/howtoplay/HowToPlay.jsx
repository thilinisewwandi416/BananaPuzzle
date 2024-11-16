import React from 'react';
import './HowToPlay.css';

const HowToPlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Instructions for the Banana Puzzle</h2>
        <p>Welcome to the Banana Puzzle! Refer below instructions to play the game:</p>
        <ul>
          <li>You can click on the play button to start the puzzle.</li>
          <li>Remember, you have only 30 seconds to solve this puzzle, and it will disable when the time is over.</li>
          <li>You have only 3 lifetimes. If you give a wrong answer it will cost a lifetime.</li>
          <li>You can choose answer from the given 5 options.</li>
          <li>Once you completed a level, next level will load.</li>
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HowToPlay;
