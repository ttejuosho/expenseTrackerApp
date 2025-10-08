import api from "../api/axios";

const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, passwordData) => {
    const response = await api.post(
      `/auth/reset-password/${token}`,
      passwordData
    );
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authService;
