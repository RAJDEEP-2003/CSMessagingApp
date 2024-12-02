import React, { useState, useEffect } from 'react';
import '../styles/AgentDashboard.css';

const AgentDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // List of keywords that indicate urgency
  const urgentKeywords = ['loan', 'money', 'disburse', 'approve', 'update'];

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const queryParam = statusFilter ? `?status=${statusFilter}` : '';
        const response = await fetch(`http://localhost:5000/api/messages${queryParam}`);
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]); // Clear messages on error
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();  // Initial fetch
  }, [statusFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReplySubmit = async (id) => {
    if (!reply.trim()) {
      alert('Reply cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply, status: 'resolved' }), // Update status to "resolved"
      });

      if (response.ok) {
        alert('Reply sent successfully!');
        setReply('');
        setSelectedMessageId(null);

        // Refetch messages after replying
        const updatedResponse = await fetch('http://localhost:5000/api/messages');
        const updatedData = await updatedResponse.json();
        setMessages(Array.isArray(updatedData) ? updatedData : []);
      } else {
        alert('Error replying to the message.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  // Function to check if a message contains urgent keywords
  const isUrgent = (message) => {
    const messageText = (message.message || '').toLowerCase();
    return urgentKeywords.some((keyword) => messageText.includes(keyword));
  };

  // Separate messages based on their status and urgency
  const urgentMessages = messages.filter(isUrgent);
  const pendingMessages = messages.filter((message) => message.status === 'pending');
  const resolvedMessages = messages.filter((message) => message.status === 'resolved');

  // Filter messages based on the search query
  const filteredMessages = messages.filter((message) => {
    const customer = message.customer || '';
    const text = message.message || '';
    const timestamp = new Date(message.timestamp).toLocaleString();
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      customer.toLowerCase().includes(lowerCaseQuery) ||
      text.toLowerCase().includes(lowerCaseQuery) ||
      timestamp.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <h2>Agent Dashboard</h2>

      {/* Search bar */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by User ID, Message, or Date/Time"
          style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
        />
      </div>

      {/* Filter for status */}
      <div>
        <button onClick={() => setStatusFilter('pending')} style={{ marginRight: '10px' }}>
          Show Pending Messages
        </button>
        <button onClick={() => setStatusFilter('resolved')} style={{ marginRight: '10px' }}>
          Show Resolved Messages
        </button>
        <button onClick={() => setStatusFilter('')} style={{ marginRight: '10px' }}>
          Show All Messages
        </button>
      </div>

      {/* Display messages in three columns */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3>Urgent Messages</h3>
          {loading ? (
            <p>Loading urgent messages...</p>
          ) : urgentMessages.length > 0 ? (
            <ul>
              {filteredMessages
                .filter((message) => urgentMessages.includes(message))
                .map((message) => (
                  <li key={message._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                    <p><strong>User ID:</strong> {message.customer}</p>
                    <p><strong>Message:</strong> {message.message}</p>
                    <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                    <p><strong>Status:</strong> {message.status || 'pending'}</p>

                    {/* Reply functionality for urgent messages */}
                    <button onClick={() => setSelectedMessageId(message._id)}>
                      Reply
                    </button>

                    {selectedMessageId === message._id && (
                      <div>
                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Type your reply here..."
                          rows="3"
                          style={{ width: '100%', marginTop: '10px' }}
                        />
                        <button onClick={() => handleReplySubmit(message._id)} style={{ marginTop: '10px' }}>
                          Submit Reply
                        </button>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          ) : (
            <p>No urgent messages.</p>
          )}
        </div>

        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3>Pending Messages</h3>
          {loading ? (
            <p>Loading pending messages...</p>
          ) : pendingMessages.length > 0 ? (
            <ul>
              {filteredMessages
                .filter((message) => pendingMessages.includes(message))
                .map((message) => (
                  <li key={message._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                    <p><strong>User ID:</strong> {message.customer}</p>
                    <p><strong>Message:</strong> {message.message}</p>
                    <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                    <p><strong>Status:</strong> {message.status || 'pending'}</p>

                    {/* Reply functionality for pending messages */}
                    {message.status !== 'resolved' && (
                      <button onClick={() => setSelectedMessageId(message._id)}>
                        Reply
                      </button>
                    )}

                    {selectedMessageId === message._id && (
                      <div>
                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Type your reply here..."
                          rows="3"
                          style={{ width: '100%', marginTop: '10px' }}
                        />
                        <button onClick={() => handleReplySubmit(message._id)} style={{ marginTop: '10px' }}>
                          Submit Reply
                        </button>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          ) : (
            <p>No pending messages.</p>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Resolved Messages</h3>
          {loading ? (
            <p>Loading resolved messages...</p>
          ) : resolvedMessages.length > 0 ? (
            <ul>
              {filteredMessages
                .filter((message) => resolvedMessages.includes(message))
                .map((message) => (
                  <li key={message._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                    <p><strong>User ID:</strong> {message.customer}</p>
                    <p><strong>Message:</strong> {message.message}</p>
                    <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                    <p><strong>Status:</strong> {message.status || 'pending'}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No resolved messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;















