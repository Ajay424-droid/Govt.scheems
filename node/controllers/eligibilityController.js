// controllers/eligibilityController.js
const EligibilityService = require("../services/eligibilityService");

const EligibilityController = {
  create: async (req, res, next) => {
    try {
      const data = req.body;
      const result = await EligibilityService.createEligibility(
        data.scheme_id,
        data.age_min,
        data.age_max,
        data.gender,
        data.income_limit,
        data.caste_category,
        data.profession,
        data.education_qualification,
        data.residence_requirement
      );
      res.status(201).json({ message: "Eligibility record created", data: result });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const record = await EligibilityService.getEligibilityById(id);
      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  getByScheme: async (req, res, next) => {
    try {
      const { schemeId } = req.params;
      const records = await EligibilityService.getEligibilityBySchemeId(schemeId);
      res.json(records);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const eligibilityData = req.body;
      await EligibilityService.updateEligibility(id, eligibilityData);
      res.json({ message: "Eligibility record updated" });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await EligibilityService.deleteEligibility(id);
      res.json({ message: "Eligibility record deleted" });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = EligibilityController;
