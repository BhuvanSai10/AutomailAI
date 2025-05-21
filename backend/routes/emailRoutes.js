const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // Import the email controller

// Define the route for generating emails
router.post('/generate-email', emailController.generateEmail);

module.exports = router;