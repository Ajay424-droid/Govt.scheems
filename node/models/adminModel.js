const db = require('../config/db');

class Admin {
  static async create({ email, passwordHash, name }) {
    const [result] = await db.execute(
      'INSERT INTO admins (admins_email, admins_password_hash, admins_name) VALUES (?, ?, ?)',
      [email, passwordHash, name]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE admins_email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE admins_id = ?',
      [id]
    );
    return rows[0];
  }

  static async updateSecurity(id, { failed_attempts, lock_until }) {
    await db.execute(
      'UPDATE admins SET failed_attempts = ?, lock_until = ? WHERE admins_id = ?',
      [failed_attempts, lock_until, id]
    );
  }

  static async update(id, { email, passwordHash, name }) {
    const [result] = await db.execute(
      'UPDATE admins SET admins_email = ?, admins_password_hash = ?, admins_name = ? WHERE admins_id = ?',
      [email, passwordHash, name, id]
    );
    return result.affectedRows;
  }
}

module.exports = Admin;
