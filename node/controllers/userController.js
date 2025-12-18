// controller/userController.js

const UserService = require("../services/userService");

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const userId = await UserService.register({
        name,
        email,
        password,
      });
      console.log(`User registered successfully with ID: ${userId}`);
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
      console.error("Error during user registration:", err.message);
      res.status(400).json({ error: err.message });
    }
  }


static async login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.login({ email, password });

    console.log(`User logged in successfully. Token issued for email: ${email}`);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error during user login:", err.message);
    res.status(400).json({ error: err.message });
  }
}

  static async getProfile(req, res) {
    try {
      const userId = req.user.id; // Extracted from JWT token
      const user = await UserService.getProfile(userId);
      
      if (!user) {
        console.warn(`No user found with ID: ${userId}`);
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log(`Profile retrieved successfully for user ID: ${userId}`);
      res.status(200).json(user);
    } catch (err) {
      console.error(`Error getting profile for user ID: ${req.user.id}`, err.message);
      res.status(400).json({ error: err.message });
    }
  }
  

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id; // Extracted from JWT token
      const { name, email, password } = req.body;
  
      await UserService.updateProfile(userId, { name, email, password });
  
      console.log(`Profile updated successfully for user ID: ${userId}`);
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error(`Error updating profile for user ID: ${req.user.id}`, err.message);
      res.status(400).json({ error: err.message });
    }
  }
  
}

module.exports = UserController;



 