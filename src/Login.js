import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from './Service/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await login({ email, password }); // POST request to backend
    sessionStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
    alert(`Welcome, ${res.data.user.name}!`);
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.error || 'Login failed.');
  }
};

  return (
    <div className="container">
      <input type="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="button" value="Login" className="input" onClick={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
