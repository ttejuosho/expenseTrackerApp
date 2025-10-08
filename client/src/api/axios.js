// src/api/axios.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true, // needed for HttpOnly cookie auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You could add extra headers here (e.g., authorization if using token in header)
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirecting to login...");
      // Optionally trigger logout here
    }
    return Promise.reject(error);
  }
);

export default api;
