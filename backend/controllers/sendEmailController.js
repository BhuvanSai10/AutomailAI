const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

exports.sendEmail = async (req, res) => {
  const { from, passkey, to, subject, message, scheduledTime } = req.body;

  if (!from || !passkey || !to || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: from,
        pass: passkey,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text: message,
    };

    if (scheduledTime) {
      const sendDate = new Date(scheduledTime);

      if (sendDate <= new Date()) {
        return res.status(400).json({ message: "Scheduled time must be in the future" });
      }

      schedule.scheduleJob(sendDate, async () => {
        try {
          await transporter.sendMail(mailOptions);
          console.log(`Scheduled email sent to ${to} at ${sendDate}`);
        } catch (err) {
          console.error("Scheduled email failed:", err);
        }
      });

      return res.json({ message: "Email scheduled successfully" });
    } else {
      await transporter.sendMail(mailOptions);
      return res.json({ message: "Email sent successfully" });
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};
