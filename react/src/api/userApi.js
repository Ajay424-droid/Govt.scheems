import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/user";

const userApi = {
  getCsrfToken: async () => {
    const response = await axios.get(`${API_URL}/csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  },

  register: async (userData, csrfToken) => {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });
    return response.data;
  },

  login: async (loginData, csrfToken) => {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true,
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });
    return response.data;
  },

  getProfile: async (token) => {
    const response = await axios.get(`${API_URL}/getprofile`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  },

  updateProfile: async (token, userData) => {
    const response = await axios.put(`${API_URL}/updateprofile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  },
};

export default userApi;
