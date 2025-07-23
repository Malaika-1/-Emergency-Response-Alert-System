import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Dashboard from './dashboard/Dashboard';
import UserProfile from './dashboard/UserProfile'; // adjust path if needed
import EmergencyTips from './dashboard/EmergencyTips';

function App() {
  return (
    <Router>
   <div className="content-area">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/tips" element={<EmergencyTips />} />

       </Routes>
     </div>
        <Footer/> 
    </Router>
  );
}

export default App;
