

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgentLogin from './components/AgentLogin';
import UserQueryForm from './components/UserQueryForm';
import AgentDashboard from './components/AgentDashboard';
import MessageDetails from './components/MessageDetails';

const App = () => {
  const [agentUsername, setAgentUsername] = useState(null);  // State to store agent's username

  // Handle login function to set the logged-in agent's username
  const handleLogin = (username) => {
    setAgentUsername(username);  // Store the agent's username
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<UserQueryForm />} />
        <Route
          path="/agent-login"
          element={<AgentLogin onLogin={handleLogin} />}
        />
        <Route
          path="/agent-dashboard"
          element={agentUsername ? <AgentDashboard username={agentUsername} /> : <Navigate to="/agent-login" />}
        />
        <Route path="/message-details" element={<MessageDetails />} />
      </Routes>
    </Router>
  );
};

export default App;



















