// src/utils/apiConfig.js

import axios from "axios";

// Create an Axios instance
const apiInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    // Add token to the request header
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token here
        // This is a placeholder - implement your actual token refresh logic
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`);
        return apiInstance(originalRequest);
      } catch (_error) {
        console.error("Failed to refresh token");
        throw _error;
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
