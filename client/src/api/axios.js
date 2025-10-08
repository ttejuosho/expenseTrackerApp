// src/api/axios.js
import axios from "axios";
import authService from "../services/authService";

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
  async (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath === "/login" || currentPath === "/register";

      // Avoid redirect loop
      if (!isAuthPage) {
        console.warn("Unauthorized - logging out...");
        try {
          await authService.logout();
        } catch (e) {
          console.error("Logout failed:", e);
        }
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
