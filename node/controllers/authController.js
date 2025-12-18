const AuthService = require('../services/authService');
const User = require('../models/userModel');

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Ensure all fields are provided
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Register the user
            await AuthService.register(name, email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Ensure email and password are provided
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Authenticate the user
            const { token, user } = await AuthService.login(email, password);
            res.json({ token, user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = AuthController;
