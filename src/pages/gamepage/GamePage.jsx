import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../../components/timer/Timer';
import PopupModal from '../../components/popup/PopUp'; 
import './GamePage.css';

const GamePage = () => {
  const [puzzleImage, setPuzzleImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [solution, setSolution] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [attempts, setAttempts] = useState(3); 
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isTimeUpModalVisible, setIsTimeUpModalVisible] = useState(false); 
  const [timeUp, setTimeUp] = useState(false);
  const [isWrongAnswerModalVisible, setIsWrongAnswerModalVisible] = useState(false); 
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    const fetchPuzzleImage = async () => {
      try {
        const response = await axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=yes');
        const imageData = response.data.question;

        setPuzzleImage(`data:image/jpeg;base64,${imageData}`);

        const apiNumber = parseInt(response.data.solution, 10);
        setSolution(apiNumber);

        generateOptions(apiNumber);
      } catch (error) {
        console.error("Error fetching puzzle image:", error);
      }
    };

    fetchPuzzleImage();
  }, []);

  const handleTimeUp = () => {
    if (!timeUp) {
      setButtonsDisabled(true);
      setFeedbackMessage("Time's up!");
      setIsTimeUpModalVisible(true);
      setTimeUp(true); 
    }
  };

  const closeTimeUpModal = () => {
    setIsTimeUpModalVisible(false);
  };

  const closeWrongAnswerModal = () => {
    setIsWrongAnswerModalVisible(false);
    setTimerPaused(false);
  };

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === solution) {
      setFeedbackMessage("Correct answer!");
      setButtonsDisabled(true);
    } else {
      setFeedbackMessage("Wrong answer. Try again!");
      setAttempts((prevAttempts) => prevAttempts - 1);
      if (attempts - 1 <= 0) {
        setButtonsDisabled(true);
        setFeedbackMessage("No more attempts left.");
      }
      setIsWrongAnswerModalVisible(true);
      setTimerPaused(true);
    }
  };

  const generateOptions = (apiNumber) => {
    const randomNumbers = new Set();

    while (randomNumbers.size < 4) {
      const randNum = Math.floor(Math.random() * 10);
      if (randNum !== apiNumber) {
        randomNumbers.add(randNum);
      }
    }

    const optionsArray = [...randomNumbers, apiNumber];
    const shuffledOptions = optionsArray.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <div className="icon left-icon">🏅</div>
        <div className="icon right-icon">
          {Array.from({ length: attempts }).map((_, index) => (
            <span key={index} className="heart">❤️</span> 
          ))}
        </div>
      </header>

      {puzzleImage ? (
        <div className="puzzle-container">
          <Timer initialTime={30} onTimeUp={handleTimeUp} pause={timerPaused} />
          <img src={puzzleImage} alt="Puzzle" className="puzzle-image" />
        </div>
      ) : (
        <p>Loading puzzle...</p>
      )}

      <div className="feedback-message">
        {feedbackMessage}
      </div>

      <div className="navigation-buttons">
        <button className="button back-button">BACK</button>
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
        <button className="button next-button">NEXT</button>
      </div>

      {isTimeUpModalVisible && (
        <PopupModal message="Time's up!" onClose={closeTimeUpModal} />
      )}

      {isWrongAnswerModalVisible && (
        <PopupModal message="Wrong answer. Try again!" onClose={closeWrongAnswerModal} />
      )}
    </div>
  );
};

export default GamePage;
