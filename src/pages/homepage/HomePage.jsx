import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import characterImage from '../../assets/boyimage.png';
import HowToPlayModal from '../../components/howtoplay/HowToPlayModal';


const HomePage = () => {
  const navigate = useNavigate();
  const [isHowToPlayVisible, setHowToPlayVisible] = useState(false);

  const handlePlayClick  = () => {
    navigate('/gamepage');
  };

  const handleLogoutClick = () => {
    navigate('/login')
  }

  const handleHowToPlay = () => {
    setHowToPlayVisible(true);
  };

  const handleCloseModal = () => {
    setHowToPlayVisible(false);
  };

  return (
    <div className="homepage">
      <div className="character">
        <img src={characterImage} alt="Character" />
        <div className="bubble">Hey there!</div>
      </div>
      <div className="buttons">
        <button className="button play" onClick={handlePlayClick}>PLAY</button>
        <button className="button instructions" onClick={handleHowToPlay}>HOW TO PLAY</button>
        <button className="button exit" onClick={handleLogoutClick}>EXIT</button>
      </div>
      <HowToPlayModal isVisible={isHowToPlayVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
