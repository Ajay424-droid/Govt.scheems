// models/User.js

const db = require('../config/db');

class User {
  // Create a new user
  static async create({ name, email, password}) {
    try {
      const [result] = await db.execute(
        'INSERT INTO users (name, email, password ) VALUES (?, ?, ?)',
        [name, email, password]
      );
      console.log("User created with ID:", result.insertId);
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Find a user by email
  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      if (rows.length > 0) {
        console.log("User found by email:", rows[0]);
        return rows[0];
      } else {
        console.log("No user found with email:", email);
        return null;
      }
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  }

  // Find a user by ID
  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      if (rows.length > 0) {
        console.log("User found by ID:", rows[0]);
        return rows[0];
      } else {
        console.log("No user found with ID:", id);
        return null;
      }
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error;
    }
  }

  // Update a user
  static async update(id, { name, email, password  }) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, id]
      );
      console.log("User updated. Rows affected:", result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

module.exports = User;


   