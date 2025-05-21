const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/generate-email', emailController.generateEmail);

module.exports = router;