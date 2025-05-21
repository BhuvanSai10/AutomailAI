const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  scheduledTime: { type: Date },
  status: { type: String, default: "sent" },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Email", emailSchema);