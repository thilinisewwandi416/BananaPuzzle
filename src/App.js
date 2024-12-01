import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage'; 
import SignupPage from './pages/signup/SignupPage';
import HomePage from './pages/homepage/HomePage';
import GamePage from './pages/gamepage/GamePage';
import ResetPassword from './pages/resetpassword/ResetPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/gamepage" element={<GamePage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;