// controllers/schemeController.js
const SchemeService = require("../services/schemeService");

const SchemeController = {
  create: async (req, res, next) => {
    try {
      const {
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
      } = req.body;

      // Service returns [ result, fields ]
      const [ dbResult ] = await SchemeService.createScheme(
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
      );

      // Return the new ID at top‑level
      res.status(201).json({
        message: "Scheme created",
        scheme_id: dbResult.insertId
      });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const scheme = await SchemeService.getSchemeById(id);
      res.json(scheme);
    } catch (err) {
      next(err);
    }
  },

  getSchemesByCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const schemes = await SchemeService.getSchemesByCategoryId(categoryId);
      res.status(200).json(schemes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (_req, res, next) => {
    try {
      const schemes = await SchemeService.getAllSchemes();
      res.json(schemes);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const schemeData = req.body;
      await SchemeService.updateScheme(id, schemeData);
      res.json({ message: "Scheme updated" });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await SchemeService.deleteScheme(id);
      res.json({ message: "Scheme deleted" });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = SchemeController;
