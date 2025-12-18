const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const AuthService = {
  register: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create(name, email, hashedPassword);
  },
  login: async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    return { token, user };
  },
};

module.exports = AuthService;
