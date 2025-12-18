// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Create a new category
router.post('/createcategory', CategoryController.create);
// Get all categories
router.get('/getcategory', CategoryController.getAll);
// Get a single category by ID
router.get('/getcategory/:id', CategoryController.getById);
// Update a category by ID
router.put('/updatecategory/:id', CategoryController.update);
// Delete a category by ID
router.delete('/deletecategory/:id', CategoryController.delete);

module.exports = router;