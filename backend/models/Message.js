const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  reply: { type: String, default: '' },
});

// Export the Message model to use in other files
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;







