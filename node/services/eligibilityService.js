// services/eligibilityService.js
const Eligibility = require("../models/eligibilityModel");

const EligibilityService = {
  createEligibility: async (scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement) => {
    if (!scheme_id) throw new Error("Scheme ID is required");
    const eligibilityData = { scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement };
    return Eligibility.create(eligibilityData);
  },
  getEligibilityById: async (eligibility_id) => {
    const rows = await Eligibility.findByEligibilityId(eligibility_id);
    if (!rows.length) throw new Error("Eligibility record not found");
    return rows[0];
  },
  getEligibilityBySchemeId: async (scheme_id) => {
    if (!scheme_id) throw new Error("Scheme ID is required");
    return Eligibility.findBySchemeId(scheme_id);
  },
  updateEligibility: async (eligibility_id, eligibilityData) => {
    const rows = await Eligibility.findByEligibilityId(eligibility_id);
    if (!rows.length) throw new Error("Cannot update non-existent eligibility record");
    return Eligibility.update(eligibility_id, eligibilityData);
  },
  deleteEligibility: async (eligibility_id) => {
    const rows = await Eligibility.findByEligibilityId(eligibility_id);
    if (!rows.length) throw new Error("Cannot delete non-existent eligibility record");
    return Eligibility.delete(eligibility_id);
  }
};

module.exports = EligibilityService;
