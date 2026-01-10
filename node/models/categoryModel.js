// models/category.js
const db = require("../config/db");

const Category = {
  create: async (category_id, category_name) => {
    const query = 'INSERT INTO categories (category_id, category_name) VALUES ($1, $2)';
    return db.query(query, [category_id, category_name]);
  },

  findByCategoryId: async (category_id) => {
    const query = 'SELECT * FROM categories WHERE category_id = $1';
    const { rows } = await db.query(query, [category_id]);
    return rows;
  },

  findAll: async () => {
    const query = 'SELECT * FROM categories';
    const { rows } = await db.query(query);
    return rows;
  },

  update: async (category_id, category_name) => {
    const query = 'UPDATE categories SET category_name = $1 WHERE category_id = $2';
    return db.query(query, [category_name, category_id]);
  },

  delete: async (category_id) => {
    const query = 'DELETE FROM categories WHERE category_id = $1';
    return db.query(query, [category_id]);
  }
};

module.exports = Category;