// routes/schemeRoutes.js
const express = require('express');
const router = express.Router();
const SchemeController = require('../controllers/schemeController');

// Create a new scheme
router.post('/createscheme', SchemeController.create);
// Get all schemes
router.get('/getschemes', SchemeController.getAll);
// Route to get schemes by category ID
router.get('/bycategory/:categoryId', SchemeController.getSchemesByCategory);
// Get a single scheme by ID
router.get('/getscheme/:id', SchemeController.getById);
// Update a scheme by ID
router.put('/updatescheme/:id', SchemeController.update);
// Delete a scheme by ID
router.delete('/deletescheme/:id', SchemeController.delete);

module.exports = router;