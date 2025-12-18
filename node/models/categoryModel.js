// models/category.js
const db = require("../config/db");

const Category = {
  create: async (category_id, category_name) => {
    const query = 'INSERT INTO categories (category_id, category_name) VALUES (?, ?)';
    return db.execute(query, [category_id, category_name]);
  },

  findByCategoryId: async (category_id) => {
    const query = 'SELECT * FROM categories WHERE category_id = ?';
    const [rows] = await db.execute(query, [category_id]);
    return rows;
  },

  findAll: async () => {
    const query = 'SELECT * FROM categories';
    const [rows] = await db.execute(query);
    return rows;
  },

  update: async (category_id, category_name) => {
    const query = 'UPDATE categories SET category_name = ? WHERE category_id = ?';
    return db.execute(query, [category_name, category_id]);
  },

  delete: async (category_id) => {
    const query = 'DELETE FROM categories WHERE category_id = ?';
    return db.execute(query, [category_id]);
  }
};

module.exports = Category;