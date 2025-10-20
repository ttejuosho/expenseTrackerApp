import axios from "axios";
import authService from "../services/authService";

const API = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const publicPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      if (!publicPaths.includes(window.location.pathname)) {
        console.warn("Unauthorized - logging out...");
        try {
          await authService.logout(); // clear session/cookie
        } catch (e) {
          console.error("Logout failed:", e);
        }
        window.location.href = "/login"; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default API;
