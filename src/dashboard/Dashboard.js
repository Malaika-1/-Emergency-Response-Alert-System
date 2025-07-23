import React from 'react';
import './Dashboard.css';
import ReportEmergencyForm from './ReportEmergencyForm';
import LiveAlertFeed from './LiveAlertFeed';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className='top-right-buttons'>
        <Link to="/tips"><button>Emergency Tips</button></Link>
        <Link to="/profile"><button>User Profile</button></Link>
      </div>
      <div className='dashboard-header'>
        <h2>Welcome to ERAS</h2>
        The Emergency Response Alert System (ERAS) is a modern web-based platform designed to enhance public safety and emergency communication. It allows users to quickly report emergencies such as accidents, fires, crimes, or natural disasters in real time. The system ensures rapid dissemination of alerts to authorities and nearby users, enabling faster response and potentially saving lives.
        {/* intro text */}
      </div>
      <div className='dashboard-bottom-section'>
        <div className='dashboard-column'><ReportEmergencyForm/></div>
        <div className='dashboard-column'><LiveAlertFeed/></div>
      </div>
    </div>
  );
}
