// src/api/schemeApi.js
import axios from 'axios';
const SCHEME_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/schemes';

const schemeApi = {
  createScheme: async (schemeData) => {
    const response = await axios.post(`${SCHEME_BASE}/createscheme`, schemeData);
    return response.data;
  },

  getAllSchemes: async () => {
    const response = await axios.get(`${SCHEME_BASE}/getschemes`);
    return response.data;
  },

  getSchemesByCategoryId: async (categoryId) => {
    const response = await axios.get(`${SCHEME_BASE}/bycategory/${categoryId}`);
    return response.data;
  },

  getSchemeById: async (id) => {
    const response = await axios.get(`${SCHEME_BASE}/getscheme/${id}`);
    return response.data;
  },

  updateScheme: async (id, schemeData) => {
    // match your Express route: PUT /updatescheme/:id
    const response = await axios.put(`${SCHEME_BASE}/updatescheme/${id}`, schemeData);
    return response.data;
  },

  deleteScheme: async (id) => {
    // match your Express route: DELETE /deletescheme/:id
    const response = await axios.delete(`${SCHEME_BASE}/deletescheme/${id}`);
    return response.data;
  }
};

export default schemeApi;
