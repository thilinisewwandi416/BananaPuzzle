import { apiRequest } from './api';

const BACKEND_API_BASE_URL = process.env.REACT_BACKEND_API_BASE_URL || 'https://localhost:44348'

export const userLogin = async (username, password) => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: '/api/Player/login',
      data: { username, password },
      withCredentials: true,
    });
  };

  export const userSignUp = async (firstname, lastname, username,email,password,country) => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: '/api/Player/register',
      data: { firstname, lastname, username,email ,password, country },
    });
  };

  export const forgotPassword = async (email) => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: '/api/Player/forgotpassword',
      data: {email},
    });
  };

  export const resetPassword = async (email, otp, newPassword) => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: '/api/Player/resetpassword',
      data: {email, otp, newPassword},
    });
  };

  export const userLogout = async () => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: '/api/Player/logout',
      withCredentials: true,
    });
  }

  export const savePlayerScore = async (username, score) => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'POST',
      endpoint: `/api/Score/${username}/savescore`,
      data:score ,
    });
  };

  export const getLeaderBoardScores = async () => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'GET',
      endpoint: '/api/Score/getallhighestscores',
    });
  }

  export const checkSession = async () => {
    return await apiRequest({
      baseURL: BACKEND_API_BASE_URL,
      method: 'GET',
      endpoint: '/api/Player/check-session',
      withCredentials: true,
    });
  }