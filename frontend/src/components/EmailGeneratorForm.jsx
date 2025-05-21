import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmailGeneratorForm = () => {
  const [emailType, setEmailType] = useState("formal");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/generate-email", {
        emailType,
        subject,
        description,
      });

      const generated = response.data.email;
      if (generated) {
        navigate("/email-sender", {
          state: {
            generatedEmail: generated,
            subject,
            description,
            emailType,
          },
        });
      }
    } catch (error) {
      console.error("Error generating email:", error);
      alert("Failed to generate email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Email Generator
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Email Type</label>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
          >
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Enter subject"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Enter description"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg shadow-lg cursor-pointer"
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailGeneratorForm;
