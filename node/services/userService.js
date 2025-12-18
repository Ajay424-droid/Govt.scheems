 // service/userService.js

 const User = require('../models/userModel');
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const dotenv = require('dotenv');
 dotenv.config();
 
 class UserService {
   // Register a new user
   static async register({ name, email, password }) {
     try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const userId = await User.create({
         name,
         email,
         password: hashedPassword,
        
       });
       console.log("User registered with ID:", userId);
       return userId;
     } catch (error) {
       console.error("Error registering user:", error);
       throw error;
     }
   }
 
// service/userService.js
static async login({ email, password }) {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      console.error("Login failed: Invalid email.");
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Login failed: Incorrect password for email:", email);
      throw new Error('Invalid email or password');
    }

    // Generate the token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return both token and user details (excluding sensitive data)
    const { password: _, ...userDetails } = user; // Exclude password from the response
    console.log("User logged in successfully. Token generated for user ID:", user.id);
    
    return { token, user: userDetails };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

 
 // Get user's profile
 static async getProfile(id) {
   try {
     const user = await User.findById(id);
     if (!user) {
       throw new Error(`User with ID ${id} not found.`);
     }
     console.log("User profile retrieved successfully for ID:", id);
     return user;
   }
   catch (error) {
     console.error("Error retrieving user profile:", error);
     throw error;
   }
 }
 
 
   // Update user's profile
   static async updateProfile(id, { name, email, password }) {
     try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const affectedRows = await User.update(id, {
         name,
         email,
         password: hashedPassword,
       });
       if (affectedRows > 0) {
         console.log("User profile updated successfully for ID:", id);
       } else {
         console.warn("No user found to update with ID:", id);
       }
     } catch (error) {
       console.error("Error updating user profile:", error);
       throw error;
     }
   }
 }
 
 module.exports = UserService;
 
 
 
  