// scr/createAdmin.js
const bcryptjs = require('bcryptjs');
const Admin = require('./models/adminModel');

const adminData = {
  email: 'admin@example.com',
  password: 'admin123',
  name: 'Admin Name',
};

const createAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash(adminData.password, 10);
    const admin = {
      email: adminData.email,
      passwordHash: hashedPassword,
      name: adminData.name,
    };
    const adminId = await Admin.create(admin);
    console.log('Admin created successfully with ID:', adminId);
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};

createAdmin();