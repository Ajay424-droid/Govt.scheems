const Admin   = require('../models/adminModel');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const dotenv  = require('dotenv');
dotenv.config();

class AdminService {
  // Register a new admin
  static async register({ email, password, name }) {
    const passwordHash = await bcrypt.hash(password, 12);
    const id = await Admin.create({ email, passwordHash, name });
    return { id, email, name };
  }

  // Login existing admin
  static async login({ email, password }) {
    const admin = await Admin.findByEmail(email);
    if (!admin) throw new Error('Admin not found');

    // Check lock status
    if (admin.lock_until && new Date(admin.lock_until) > new Date()) {
      throw new Error('Account locked. Try again later.');
    }

    const isMatch = await bcrypt.compare(password, admin.admins_password_hash);
    if (!isMatch) {
      let attempts = (admin.failed_attempts || 0) + 1;
      let lockUntil = null;
      if (attempts >= 5) {
        lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        attempts = 0;
      }
      await Admin.updateSecurity(admin.admins_id, { failed_attempts: attempts, lock_until: lockUntil });
      throw new Error('Invalid credentials');
    }

    // Reset attempts on success
    await Admin.updateSecurity(admin.admins_id, { failed_attempts: 0, lock_until: null });

    // Issue JWT
    return jwt.sign(
      { id: admin.admins_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  // Fetch admin profile
  static async getProfile(adminId) {
    return await Admin.findById(adminId);
  }
}

module.exports = AdminService;
