// messageService.js: Handle API calls to the backend
const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = (agentId) => {
  return fetch(`${API_URL}?agentId=${agentId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching messages:', error);
    });
};

export const postMessage = (message) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error posting message:', error);
    });
};
