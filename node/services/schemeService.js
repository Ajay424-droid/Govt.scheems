// services/schemeService.js
const Scheme = require("../models/schemeModel");

const SchemeService = {
  createScheme: async (scheme_name, category_id, launched_by, launched_date, benefits, how_to_apply, documents_required, application_start_date, application_end_date, application_portal, status, contact_info) => {
    if (!scheme_name || !category_id) throw new Error("Required fields missing");
    const schemeData = {
      scheme_name,
      category_id,
      launched_by,
      launched_date,
      benefits,
      how_to_apply,
      documents_required,
      application_start_date,
      application_end_date,
      application_portal,
      status,
      contact_info
    };
    return Scheme.create(schemeData);
  },
  getSchemeById: async (scheme_id) => {
    const rows = await Scheme.findById(scheme_id);
    if (!rows.length) throw new Error("Scheme not found");
    return rows[0];
  },
  getSchemesByCategoryId: async (categoryId) => {
    try {
      const [schemes] = await Scheme.findByCategoryId(categoryId);
      return schemes;
    } catch (error) {
      throw new Error('Unable to fetch schemes by category ID.');
    }
  },
  getAllSchemes: async () => Scheme.findAll(),
  updateScheme: async (scheme_id, schemeData) => {
    const rows = await Scheme.findById(scheme_id);
    if (!rows.length) throw new Error("Cannot update non-existent scheme");
    return Scheme.update(scheme_id, schemeData);
  },
  deleteScheme: async (scheme_id) => {
    const rows = await Scheme.findById(scheme_id);
    if (!rows.length) throw new Error("Cannot delete non-existent scheme");
    return Scheme.delete(scheme_id);
  }
};

module.exports = SchemeService;