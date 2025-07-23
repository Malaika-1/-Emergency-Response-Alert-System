import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { register } from './Service/api';

function Register() {
      const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const [error, setError] = useState('');

 
const handleRegister = async () => {

  try {
    const newUser = { name, email, password, contact };
    await register(newUser); // POST request to backend
    alert('Registration successful!');
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.error || 'Registration failed.');
  }
};
 

  return (
    <div className="container">
      <input type="text" className="input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text"  className="input"  placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)}/>
      <input type="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="button" value="Register" className="input" onClick={handleRegister} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
}

export default Register;
