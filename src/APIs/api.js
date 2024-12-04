import axios from 'axios';

const createApiInstance = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000, //session will timeout while response getting delay
  });
};

const instances = {};

const getApiInstance = (baseURL) => {
  if (!instances[baseURL]) {
    instances[baseURL] = createApiInstance(baseURL);
  }
  return instances[baseURL];
};

export const apiRequest = async ({ baseURL, method, endpoint, data = null, params = null }) => {
  const api = getApiInstance(baseURL);

  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error with API call to ${baseURL}${endpoint}:`, error);
    throw error;
  }
};
