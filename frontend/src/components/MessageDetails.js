import React from 'react';

const MessageDetails = ({ message }) => {
  if (!message) {
    return <div className="message-details-container">Loading...</div>;
  }

  return (
    <div className="message-details-container">
      <h2>Message Details</h2>
      <p><strong>Message:</strong> {message.message}</p>
      <p><strong>Status:</strong> {message.status}</p>
      <p><strong>Created At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default MessageDetails;








