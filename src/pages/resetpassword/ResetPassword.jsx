import React, { useState } from "react";
import "./ResetPassword.css";
import { forgotPassword } from "../../APIs/apiEndpoints";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(""); // New state for OTP
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailSubmit = async () => {
    setError("");
    try {
      const response = await forgotPassword(email);

      if (response.returnStatus) {
        setEmailSubmitted(true);
        setSuccessMessage(response.returnMessage); // Inform the user about OTP sent
      } else {
        throw new Error(response.returnMessage || "Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleOtpAndPasswordSubmit = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(email,otp,password);

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to reset password. Please try again.");
      }

      setSuccessMessage("Password has been successfully reset!");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {!emailSubmitted ? (
        <>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button onClick={handleEmailSubmit} className="primary-button">
            Submit
          </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button onClick={handleOtpAndPasswordSubmit} className="success-button">
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
