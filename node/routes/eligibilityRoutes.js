// routes/eligibilityRoutes.js
const express = require('express');
const router = express.Router();
const EligibilityController = require('../controllers/eligibilityController');

// Create a new eligibility record
router.post('/createeligibility', EligibilityController.create);
// Get all eligibility records for a scheme
router.get('/geteligibilitybyscheme/:schemeId', EligibilityController.getByScheme);
// Get a single eligibility record by ID
router.get('/geteligibility/:id', EligibilityController.getById);
// Update an eligibility record by ID
router.put('/updateeligibility/:id', EligibilityController.update);
// Delete an eligibility record by ID
router.delete('/deleteeligibility/:id', EligibilityController.delete);

module.exports = router;