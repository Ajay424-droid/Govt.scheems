const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { authFromCookie } = require('../middleware/authMiddleware');
const AdminController = require('../controllers/adminController');

const router = express.Router();

// CSRF token route
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Limit admin registration attempts
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many sign‑up attempts, please try again later'
});

// POST /admin/register
router.post(
  '/register',
  registerLimiter,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 12 }),
  body('name').notEmpty().trim().escape(),
  AdminController.register
);

// Limit admin login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again later'
});

// POST /admin/login
router.post(
  '/login',
  loginLimiter,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 12 }),
  AdminController.login
);

// GET /admin/me (protected)
router.get('/me', authFromCookie, AdminController.me);

// POST /admin/logout (protected)
router.post('/logout', authFromCookie, AdminController.logout);

module.exports = router;
