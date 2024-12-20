import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime, onTimeUp, pause }) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    if (pause) return;
    if (countdown <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onTimeUp, pause]);

  return (
    <div className="timer-circle">{countdown}</div>
  );
};

export default Timer;
