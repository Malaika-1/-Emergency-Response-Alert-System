import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUserReports } from '../Service/api';

function UserProfile() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')));
  const [contact, setContact] = useState(user?.contact || '');
  const [message, setMessage] = useState('');
  const [reports, setReports] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const fetchUserReports = async () => {
      try {
        const res = await getUserReports(loggedIn.email);
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports");
      }
    };
    fetchUserReports();
  }, []);

  const handleUpdate = () => {
    const updatedUser = { ...user, contact };
    setUser(updatedUser);
    sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u =>
      u.email === user.email ? { ...u, contact } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMessage('Contact info updated');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <label>Contact Number:</label>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Enter contact number"
      />
      <button onClick={handleUpdate}>Update Contact</button>
      {message && <p className="success-msg">{message}</p>}

      <hr />
      <h3>Your Past Emergency Reports</h3>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((r, index) => (
  <li key={index}>
    <strong>{r.emergencyType}</strong> at {r.locationName || 'Unknown'} <br />
    {new Date(r.timestamp).toLocaleString()} <br />
    {r.file && <span>File: {r.file}</span>}
  </li>
))}

        </ul>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
