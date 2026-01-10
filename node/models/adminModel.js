const db = require('../config/db');

class Admin {
  static async create({ email, passwordHash, name }) {
    const { rows } = await db.query(
      'INSERT INTO admins (admins_email, admins_password_hash, admins_name) VALUES ($1, $2, $3) RETURNING admins_id',
      [email, passwordHash, name]
    );
    return rows[0].admins_id;
  }

  static async findByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM admins WHERE admins_email = $1',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      'SELECT * FROM admins WHERE admins_id = $1',
      [id]
    );
    return rows[0];
  }

  static async updateSecurity(id, { failed_attempts, lock_until }) {
    await db.query(
      'UPDATE admins SET failed_attempts = $1, lock_until = $2 WHERE admins_id = $3',
      [failed_attempts, lock_until, id]
    );
  }

  static async update(id, { email, passwordHash, name }) {
    const { rowCount } = await db.query(
      'UPDATE admins SET admins_email = $1, admins_password_hash = $2, admins_name = $3 WHERE admins_id = $4',
      [email, passwordHash, name, id]
    );
    return rowCount;
  }
}

module.exports = Admin;
