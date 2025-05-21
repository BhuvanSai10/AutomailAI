import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EmailSender = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [emailType, setEmailType] = useState("formal");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [regenLoading, setRegenLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setSubject(location.state.subject || "");
      setDescription(location.state.description || "");
      setEmailType(location.state.emailType || "formal");
      setMessage(location.state.generatedEmail || "");
    } else {
      alert("No generated email found. Redirecting...");
      navigate("/email-generator");
    }
  }, [location.state, navigate]);

  const regenerateEmail = async () => {
    if (!subject || !description) {
      alert("Subject and description are required for regeneration.");
      return;
    }

    setRegenLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/generate-email", {
        subject,
        description,
        emailType,
      });

      setMessage(response.data.email);
    } catch (error) {
      console.error("Regeneration error:", error);
      alert("Failed to regenerate email.");
    } finally {
      setRegenLoading(false);
    }
  };

  const handleSend = async () => {
    if (!user?.email || !user?.passkey) {
      alert("Sender credentials missing.");
      return;
    }

    if (schedule && !scheduledTime) {
      alert("Please select a valid schedule date and time.");
      return;
    }

    const payload = {
      from: user.email,
      passkey: user.passkey,
      to: recipient,
      subject,
      message,
      scheduledTime: schedule ? new Date(scheduledTime).toISOString() : null,
    };

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        await fetch("http://localhost:5000/api/save-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: user.email,
            to: recipient,
            subject,
            message,
            scheduledTime: schedule ? new Date(scheduledTime).toISOString() : null,
          }),
        });

        alert(result.message || "Email sent successfully!");
        navigate("/dashboard");
      }else {
        alert(result.message || "Failed to send email");
      }
    } catch (err) {
      console.error("Send email error:", err);
      alert("An error occurred while sending email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-lg w-full max-w-2xl p-8 space-y-6 text-white">
        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Send Email
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium">To</label>
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={schedule}
              onChange={(e) => setSchedule(e.target.checked)}
              className="mr-2"
            />
            Schedule Email
          </label>
          {schedule && (
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full p-2 border rounded-xl text-white"
            />
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSend}
            disabled={!recipient}
            className="bg-green-600 hover:bg-green-700 transition text-white py-3 px-6 rounded-xl shadow-md cursor-pointer"
          >
            Send Email
          </button>
          <button
            onClick={regenerateEmail}
            disabled={regenLoading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-xl shadow-md cursor-pointer"
          >
            {regenLoading ? "Regenerating..." : "Regenerate Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSender;
