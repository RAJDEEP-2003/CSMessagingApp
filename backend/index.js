const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());  // Allows cross-origin requests from frontend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CSMessagingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the message schema
const messageSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, default: 'pending' },
  reply: { type: String }  // Added reply field
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Endpoint to fetch all messages sorted by most recent
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });  // Sort by timestamp, most recent first
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
});

// Endpoint to post new messages
app.post('/api/messages', async (req, res) => {
  const { customer, message } = req.body;

  if (!customer || !message) {
    return res.status(400).json({ message: 'Customer and message are required' });
  }

  const newMessage = new Message({
    customer,
    message,
    timestamp: new Date(),
  });

  try {
    await newMessage.save();  // Save new message to MongoDB
    res.status(201).json({ message: 'Message saved successfully.' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ message: 'Failed to save message.' });
  }
});

// Endpoint to update message status and reply
app.patch('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { reply, status } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(id, { reply, status }, { new: true });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error('Error updating message:', err);
    res.status(500).json({ message: 'Failed to update message.' });
  }
});

// Route for the root URL (optional, just for testing)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});









