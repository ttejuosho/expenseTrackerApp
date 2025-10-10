import API from "../api/axios";

const authService = {
  register: async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await API.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, passwordData) => {
    const response = await API.post(
      `/auth/reset-password/${token}`,
      passwordData
    );
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await API.get("/auth/me");
    return response.data;
  },
};

export default authService;
