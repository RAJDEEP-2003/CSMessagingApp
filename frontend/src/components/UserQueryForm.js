import React, { useState } from 'react';
import '../styles/UserQueryForm.css';

const UserQueryForm = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !message) {
      alert('Both fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: userId, message }),
      });

      if (response.ok) {
        alert('Query submitted successfully!');
        setUserId('');
        setMessage('');
      } else {
        alert('Failed to submit the query.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="query-form-container">
      <h2>Submit Your Query</h2>
      <form onSubmit={handleSubmit} className="query-form">
        <div className="form-field">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or question"
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserQueryForm;
















