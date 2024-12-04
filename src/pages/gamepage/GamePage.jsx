import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/timer/Timer';
import axios from 'axios';
import MessagePopupModal from '../../components/popup/MessagePopupModal';  // Importing MessagePopupModal
import LeaderboardModal from '../../components/leaderboard/LeaderboardModal';
import './GamePage.css';
import { getLeaderBoardScores, savePlayerScore } from '../../APIs/apiEndpoints';
import Cookies from 'js-cookie';

//generated using LLM - https://chatgpt.com/
const GamePage = () => {
  const [puzzleImage, setPuzzleImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [solution, setSolution] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [timerPaused, setTimerPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  const [isTimeUpModalVisible, setIsTimeUpModalVisible] = useState(false);
  const [isWrongAnswerModalVisible, setIsWrongAnswerModalVisible] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const navigate = useNavigate();

  const getLoggedInUsername = () => {
    const username = Cookies.get('username');
    if (!username) {
      console.error("Username not found. Please ensure you're logged in.");
      return null;
    }
    return username;
  };

  const handleLogoutClick = async () => {
    try {
      saveScore();
      navigate('/homepage');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchNewPuzzle = async () => {
    try {
      const response = await axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=yes');
      const imageData = response.data.question;
      const apiNumber = parseInt(response.data.solution, 10);

      setPuzzleImage(`data:image/jpeg;base64,${imageData}`);
      setSolution(apiNumber);
      generateOptions(apiNumber);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error fetching puzzle image:", error);
    }
  };

  useEffect(() => {
    fetchNewPuzzle();
  }, []);

  const generateOptions = (apiNumber) => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 4) {
      const randNum = Math.floor(Math.random() * 10);
      if (randNum !== apiNumber) {
        randomNumbers.add(randNum);
      }
    }
    const optionsArray = [...randomNumbers, apiNumber].sort(() => Math.random() - 0.5);
    setOptions(optionsArray);
  };

  const saveScore = async () => {
    const username = getLoggedInUsername();
    if (username) {
      try {
        await savePlayerScore(username, score);
        console.log('Score saved successfully!');
      } catch (error) {
        console.error("Error saving score:", error.message);
      }
    }
  };

  const handleTimeUp = () => {
    setButtonsDisabled(true);
    setFeedbackMessage("Time's up!");
    setTimerPaused(true);
    setIsTimeUpModalVisible(true);
    saveScore();
  };

  const handleCorrectOption = () => {
    const calculatedScore = 100 + (50 * attempts);
    setScore((prevScore) => prevScore + calculatedScore);
    setFeedbackMessage("Correct answer!");
    setButtonsDisabled(true);

    setTimeout(() => {
      fetchNewPuzzle();
      setButtonsDisabled(false);
      setTimerPaused(false);
      setFeedbackMessage('');
      setAttempts(3);
    }, 1000);
  };

  const handleIncorrectOption = () => {
    setFeedbackMessage("Wrong answer. Try again!");
    setAttempts((prevAttempts) => prevAttempts - 1);
    setTimerPaused(true);

    if (attempts - 1 <= 0) {  
      setButtonsDisabled(true);
      setFeedbackMessage("Game Over!");
      setIsTimeUpModalVisible(false); 
      setIsWrongAnswerModalVisible(false);
      setIsTimeUpModalVisible(true); 
      saveScore();
    } else {
      setIsWrongAnswerModalVisible(true);
    }
  };

  const handleOptionClick = (selectedOption) => {
    selectedOption === solution ? handleCorrectOption() : handleIncorrectOption();
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const openLeaderboard = async () => {
    try {
      setTimerPaused(true);
      const data = await getLeaderBoardScores();
      setLeaderboardData(data);
      setIsLeaderboardVisible(true);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error.message);
      setLeaderboardData([]);
    }
  };

  const closeLeaderboard = () => {
    setIsLeaderboardVisible(false);
    setTimerPaused(false);
  };

  const closeWrongAnswerModal = () => {
    setIsWrongAnswerModalVisible(false);
    setTimerPaused(false); 
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <div className="icon left-icon" onClick={openLeaderboard}>🏅</div>
        <div className="icon right-icon">
          {Array.from({ length: attempts }).map((_, index) => (
            <span key={index} className="heart">❤️</span>
          ))}
        </div>
      </header>

      {puzzleImage ? (
        <div className="puzzle-container">
          <Timer
            initialTime={30}
            onTimeUp={handleTimeUp}
            pause={timerPaused}
            key={key}
          />
          <img src={puzzleImage} alt="Puzzle" className="puzzle-image" />
        </div>
      ) : (
        <p>Loading puzzle...</p>
      )}

      <div className="feedback-message">{feedbackMessage}</div>

      <div className="current-score">
        <h3>Score: {score}</h3>
      </div>

      <div className="navigation-buttons">
        <button className="button back-button" onClick={handleLogoutClick}>EXIT</button>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              className="option"
              disabled={buttonsDisabled}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {isTimeUpModalVisible && (
        <MessagePopupModal
          message={feedbackMessage}  // Using the updated feedback message
          onClose={() => navigate('/homepage')}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {isWrongAnswerModalVisible && (
        <MessagePopupModal
          message="Wrong answer. Try again!"
          onClose={closeWrongAnswerModal}
        />
      )}

      {isLeaderboardVisible && (
        <LeaderboardModal
          data={leaderboardData}
          isOpen={isLeaderboardVisible}
          onClose={closeLeaderboard}
        />
      )}
    </div>
  );
};

export default GamePage;
