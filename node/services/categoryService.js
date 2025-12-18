// services/categoryService.js
const Category = require("../models/categoryModel");

const CategoryService = {
  createCategory: async (category_id, category_name) => {
    if (!category_name) throw new Error("All fields are required");
    const existing = await Category.findByCategoryId(category_id);
    if (existing.length) throw new Error("Category ID already exists");
    return Category.create(category_id, category_name);
  },
  getCategoryById: async (category_id) => {
    if (!category_id) throw new Error("Category ID is required");
    const rows = await Category.findByCategoryId(category_id);
    if (!rows.length) throw new Error("Category not found");
    return rows[0];
  },
  getAllCategories: async () => Category.findAll(),
  updateCategory: async (category_id, category_name) => {
    if (!category_id || !category_name) throw new Error("Both ID and name are required for update");
    const rows = await Category.findByCategoryId(category_id);
    if (!rows.length) throw new Error("Cannot update non-existent category");
    return Category.update(category_id, category_name);
  },
  deleteCategory: async (category_id) => {
    if (!category_id) throw new Error("Category ID is required for deletion");
    const rows = await Category.findByCategoryId(category_id);
    if (!rows.length) throw new Error("Cannot delete non-existent category");
    return Category.delete(category_id);
  }
};

module.exports = CategoryService;