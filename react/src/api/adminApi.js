import axios from 'axios';

// Ensure axios sends cookies on every request
axios.defaults.withCredentials = true;

const ADMIN_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/admin`
  : 'http://localhost:5000/api/admin';

// Fetch CSRF token and set it in default headers for POST requests
const fetchCsrf = async () => {
  const { data } = await axios.get(`${ADMIN_BASE}/csrf-token`);
  // Set the CSRF token header for subsequent POST requests
  axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};

const adminApi = {
  register: async (name, email, password) => {
    await fetchCsrf();  // Always fetch CSRF token before POST requests
    const payload = { name, email, password };
    const response = await axios.post(`${ADMIN_BASE}/register`, payload);
    return response.data;
  },

  login: async (email, password) => {
    await fetchCsrf();  // Fetch CSRF token before login POST
    const payload = { email, password };
    const response = await axios.post(`${ADMIN_BASE}/login`, payload);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get(`${ADMIN_BASE}/me`);
    return response.data;
  },

  logout: async () => {
    await fetchCsrf();  // Fetch CSRF token before logout POST
    const response = await axios.post(`${ADMIN_BASE}/logout`);
    return response.data;
  },
};

export default adminApi;
