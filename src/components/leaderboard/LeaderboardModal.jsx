import React from 'react';
import './LeaderboardModal.css';
import defaultAvatar from '../../assets/leaderboard-avatar.png';

const LeaderboardModal = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="leaderboard" onClick={(e) => e.stopPropagation()}>
        <div className="leaderboard-header">
          <h1>LEADERBOARD</h1>
        </div>
        <div className="leaderboard-list">
          {data.map((user, index) => (
            <div
              key={user.username}
              className={`leaderboard-item ${index + 1 <= 3 ? `top-${index + 1}` : ''}`}
            >
              <div className="leaderboard-rank">{index + 1}</div>
              <div className="leaderboard-avatar">
              <img
                  src={user.avatar || defaultAvatar}
                  alt={`${user.username}'s avatar`}
                  className="avatar-icon"
                />
              </div>
              <div className="leaderboard-username">{user.username}</div>
              <div className="leaderboard-score">
                <span className="coin-icon">💰</span> {user.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Back</button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
