import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailGeneratorForm from './components/EmailGeneratorForm';
import EmailSender from './components/EmailSender';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/email-generator" element={<EmailGeneratorForm />} />
        <Route path="/email-sender" element={<EmailSender/>}/>
      </Routes>
    </Router>
  );
}

export default App;