import axios from "axios";
import authService from "../services/authService";

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true, // needed for HttpOnly cookie auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // You could add extra headers here (e.g., authorization if using token in header)
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const publicPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      // Avoid redirect loop
      if (!publicPaths.includes(currentPath)) {
        console.warn("Unauthorized - logging out...");
        try {
          await authService.logout();
        } catch (e) {
          console.error("Logout failed:", e);
        }
        await authService.logout(); // Clear any client-side auth state
      }
    }
    return Promise.reject(error);
  }
);

export default API;
