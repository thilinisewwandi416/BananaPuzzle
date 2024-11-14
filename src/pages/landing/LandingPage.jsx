import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    if (progress === 100) {
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }

    return () => clearInterval(interval); 
  }, [progress, navigate]);

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1 className="title">
          Banana <span className="highlight">Puzzle</span>
        </h1>
        <div className="loading-container">
          <span className="loading-text">LOADING</span>
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
