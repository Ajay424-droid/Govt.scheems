// controllers/categoryController.js
const CategoryService = require("../services/categoryService");

const CategoryController = {
  create: async (req, res, next) => {
    try {
      const { category_id, category_name } = req.body;
      const result = await CategoryService.createCategory(category_id, category_name);
      res.status(201).json({ message: "Category created", data: result });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (_req, res, next) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category_name } = req.body;
      await CategoryService.updateCategory(id, category_name);
      res.json({ message: "Category updated" });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      res.json({ message: "Category deleted" });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CategoryController;