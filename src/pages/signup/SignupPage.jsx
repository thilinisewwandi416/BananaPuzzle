import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { userSignUp } from '../../APIs/apiEndpoints'; 
import './SignupPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username:'',
    email: '',
    password: '',
    country: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { firstname,lastname,username,email,password,country } = formData;
      await userSignUp(firstname,lastname,username,email,password,country);

      navigate('/login');
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />

          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your User name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            required
          />

          <button type="submit" className="signup-button">SIGN UP</button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-link">
          <span>Already have an account?</span>
          <Link to="/login" className="login-link-text"> Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
