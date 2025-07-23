import React from 'react';
import './EmergencyTips.css';

function EmergencyTips() {
  return (
    <div className="tips-container">
      <h2> Emergency Preparedness Tips</h2>
      <ul>
        <li><strong>Fire:</strong> Stop, drop, and roll. Call 1122. Don’t use elevators.</li>
        <li><strong>Earthquake:</strong> Drop under a sturdy table. Stay away from windows.</li>
        <li><strong>Flood:</strong> Avoid low-lying areas. Don’t walk or drive through water.</li>
        <li><strong>Medical:</strong> Call for help immediately. Keep emergency contacts handy.</li>
        <li><strong>General:</strong> Keep a go-bag with flashlight, water, ID, power bank, etc.</li>
      </ul>
    </div>
  );
}

export default EmergencyTips;
