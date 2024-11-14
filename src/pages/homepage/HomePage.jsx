import React from 'react';
import './HomePage.css';
import characterImage from '../../assets/boyimage.png';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="character">
        <img src={characterImage} alt="Character" />
        <div className="bubble">Hey there!</div>
      </div>
      <div className="buttons">
        <button className="button play">PLAY</button>
        <button className="button pause">PAUSE</button>
        <button className="button exit">EXIT</button>
      </div>
    </div>
  );
};

export default HomePage;
