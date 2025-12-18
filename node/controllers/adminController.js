const AdminService = require('../services/AdminService');

class AdminController {
  // POST /admin/register
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const admin = await AdminService.register({ email, password, name });
      res.status(201).json({
        message: 'Admin created',
        admin: { id: admin.id, email: admin.email, name: admin.name }
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // POST /admin/login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login({ email, password });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: 'Login successful' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // GET /admin/me
  static async me(req, res) {
    try {
      const admin = await AdminService.getProfile(req.user.id);
      res.status(200).json({
        admin: {
          id: admin.admins_id,
          email: admin.admins_email,
          name: admin.admins_name,
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // POST /admin/logout
  static async logout(req, res) {
    res
      .clearCookie('token', { httpOnly: true, sameSite: 'Strict' })
      .status(200)
      .json({ message: 'Logged out' });
  }
}

module.exports = AdminController;
