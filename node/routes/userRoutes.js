const express = require('express');
const UserController = require('../controllers/userController');
const { authFromHeader } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user (no auth needed)
router.post('/register', UserController.register);

// Login user (no auth needed)
router.post('/login', UserController.login);

// Get user's profile (requires auth)
router.get('/getprofile', authFromHeader, UserController.getProfile);

// Update user's profile (requires auth)
router.put('/updateprofile', authFromHeader, UserController.updateProfile);

module.exports = router;
