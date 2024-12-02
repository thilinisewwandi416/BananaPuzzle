import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { forgotPassword, resetPassword } from "../../APIs/apiEndpoints";
import PasswordResetModal from "../../components/passwordreset/PasswordResetModal";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    setError("");
    try {
      const response = await forgotPassword(email);

      if (response.returnStatus) {
        setEmailSubmitted(true);
        setSuccessMessage(response.returnMessage);
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
      const response = await resetPassword(email, otp, password);

      if (response.returnStatus) {
        setSuccessMessage(response.returnMessage);
        setIsModalVisible(true); // Show modal
      } else {
        throw new Error(response.returnMessage || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate("/login"); 
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
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

      {isModalVisible && (
        <PasswordResetModal
          title="Success"
          message={successMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ResetPassword;
