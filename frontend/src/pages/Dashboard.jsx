import { useEffect, useState } from "react";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/emails");
        const data = await res.json();
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-gray-700 rounded-xl shadow">
          <thead>
            <tr className="text-left bg-gray-800 border-b border-gray-700">
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">To</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr
                key={email._id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="py-3 px-4">{email.from}</td>
                <td className="py-3 px-4">{email.to}</td>
                <td className="py-3 px-4">{email.subject}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      email.status === "sent"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {email.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {emails.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No emails found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
