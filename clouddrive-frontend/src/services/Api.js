// src/services/api.js

import axios from 'axios';


// Create a new axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your backend base URL
});

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem('accessToken'); // Clear token
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
