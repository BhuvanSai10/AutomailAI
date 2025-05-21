const Email = require("../model/emailSchema")

const saveEmail = async (req, res) => {
  try {
    const { from, to, subject, message, scheduledTime } = req.body;

    const email = new Email({
      from,
      to,
      subject,
      message,
      scheduledTime,
      status: scheduledTime ? "scheduled" : "sent",
    });

    await email.save();
    res.status(201).json({ message: "Email saved successfully", email });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ message: "Failed to save email", error });
  }
};

const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails", error });
  }
};

module.exports = { saveEmail,getAllEmails };