// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEscrow from './pages/CreateEscrow';
import Dashboard from './pages/Dashboard';
import Navbar from './components/NavBar';
import WelcomePage from './pages/WelcomePage';

const App = () => {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<CreateEscrow />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
