// src/api/categoryApi.js
import axios from 'axios';
const CATEGORY_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/categories';

const categoryApi = {
  createCategory: async (category_id, category_name) => {
    const payload = { category_id, category_name };
    const response = await axios.post(`${CATEGORY_BASE}/createcategory`, payload);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await axios.get(`${CATEGORY_BASE}/getcategory`);
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await axios.get(`${CATEGORY_BASE}/${id}`);
    return response.data;
  },

  updateCategory: async (id, category_name) => {
    const payload = { category_name };
    const response = await axios.put(`${CATEGORY_BASE}/${id}`, payload);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axios.delete(`${CATEGORY_BASE}/${id}`);
    return response.data;
  }
};

export default categoryApi;