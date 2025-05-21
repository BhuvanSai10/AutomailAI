import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice'; // adjust path as needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Full login response:", data);

      if (response.ok) {
        // Store in Redux
        dispatch(setUser({
          token: data.token,
          ...data.user
        }));

        // Store token (optional)
        localStorage.setItem('token', data.token);

        alert(data.message || 'Login successful!');
        navigate('/email-generator');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-md w-full max-w-md p-6 space-y-6 border border-gray-700">
        <h2 className="text-2xl font-semibold text-white">Login</h2>
        <p className="text-gray-400">Login to your account</p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-xl bg-gray-800 text-white border-gray-700"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-xl border border-gray-700"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-xl border border-gray-700"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
