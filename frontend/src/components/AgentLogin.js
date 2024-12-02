import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AgentLogin.css'; 

const AgentLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
      navigate('/agent-dashboard');
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Agent Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;








