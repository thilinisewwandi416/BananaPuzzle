import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import googleIcon from '../../assets/google.png'
import facebookIcon from '../../assets/facebook.png'

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <a href="#" className="forgot-password">Forgot your password?</a>
          
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        
        <div className="sign-up">
          <span>Don’t have an account?</span> <Link to="/signup" className="signup-link-text"> Sign Up</Link>
        </div>

        <div className="social-login">
          <span>or login with</span>
          <div className="social-icons">
            <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#"><img src={googleIcon} alt="Google" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
