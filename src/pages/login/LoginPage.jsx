import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../APIs/apiEndpoints';
import './LoginPage.css';
import googleIcon from '../../assets/google.png';
import facebookIcon from '../../assets/facebook.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      document.cookie = `username=${encodeURIComponent(username)}; path=/; max-age=86400;`;
      const response = await userLogin(username, password);
      navigate('/homepage');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="/resetpassword" className="forgot-password">
            Forgot your password?
          </a>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="sign-up">
          <span>Don’t have an account?</span>{' '}
          <Link to="/signup" className="signup-link-text">
            {' '}
            Sign Up
          </Link>
        </div>

        <div className="social-login">
          <span>or login with</span>
          <div className="social-icons">
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#">
              <img src={googleIcon} alt="Google" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
