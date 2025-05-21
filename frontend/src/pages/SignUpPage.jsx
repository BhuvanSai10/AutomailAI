import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
  if (!name || !email || !password || !passkey) {
    setError('Please fill all fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, passkey }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Sign up successful!');
      navigate('/login');
    } else {
      setError(data.message || 'Sign up failed');
    }
  } catch (err) {
    setError('An error occurred. Please try again.');
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-md w-full max-w-md p-6 space-y-6 border border-gray-700">
        <h2 className="text-2xl font-semibold text-white">Sign Up</h2>
        <p className="text-gray-400">Create a new account</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
          />
          <input
            type="text"
            placeholder="Passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition cursor-pointer"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-xl border border-gray-700 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </button>
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-xl border border-gray-700 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
