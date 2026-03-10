import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://192.168.1.32:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (__DEV__) {
      console.log('API Error:', error?.response?.data || error.message);
    }
    return Promise.reject(error);
  },
);
