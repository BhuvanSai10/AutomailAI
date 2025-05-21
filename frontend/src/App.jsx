import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailGeneratorForm from './components/EmailGeneratorForm';
import EmailSender from './components/EmailSender';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/email-generator"
          element={
            <PrivateRoute>
              <EmailGeneratorForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/email-sender"
          element={
            <PrivateRoute>
              <EmailSender />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
