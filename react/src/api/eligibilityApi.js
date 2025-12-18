// src/api/eligibilityApi.js
import axios from 'axios';
const ELIGIBILITY_BASE = import.meta.env.VITE_API_URL|| 'http://localhost:5000/api/eligibilities';

const eligibilityApi = {
  createEligibility: async (eligibilityData) => {
    const response = await axios.post(`${ELIGIBILITY_BASE}/createeligibility`, eligibilityData);
    return response.data;
  },

  getEligibilityById: async (id) => {
    const response = await axios.get(`${ELIGIBILITY_BASE}/${id}`);
    return response.data;
  },

  getEligibilityByScheme: async (schemeId) => {
    const response = await axios.get(`${ELIGIBILITY_BASE}/geteligibilitybyscheme/${schemeId}`);
    return response.data;
  },

  updateEligibility: async (id, eligibilityData) => {
    const response = await axios.put(`${ELIGIBILITY_BASE}/${id}`, eligibilityData);
    return response.data;
  },

  deleteEligibility: async (id) => {
    const response = await axios.delete(`${ELIGIBILITY_BASE}/${id}`);
    return response.data;
  }
};

export default eligibilityApi;