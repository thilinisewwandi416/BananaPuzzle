import React from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        
        <form className="signup-form">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <label>Country</label>
          <input type="text" placeholder="Enter your country" required />

          <button type="submit" className="signup-button">SIGN UP</button>
        </form>

        <div className="login-link">
          <span>Already have an account?</span>
          <Link to="/login" className="login-link-text"> Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
