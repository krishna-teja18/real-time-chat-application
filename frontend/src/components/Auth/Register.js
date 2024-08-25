import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }
    axios.post('http://127.0.0.1:8000/api/users/register/', {
      username,
      email,
      password,
      password2,
    }).then((response) => {
      alert('Registration successful');
      navigate('/login');
    }).catch((error) => {
      alert('Registration failed');
    });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="register-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          className="register-input"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
