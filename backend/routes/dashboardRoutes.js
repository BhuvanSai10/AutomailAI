const express = require('express');
const { saveEmail, getAllEmails } = require("../controllers/emailDashboardController");

const router = express.Router();

router.post("/save-email", saveEmail);
router.get("/emails", getAllEmails);

module.exports = router;
