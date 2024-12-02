const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(400).send('Error fetching messages');
  }
});

// PATCH (update) message to add a reply
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { reply, status: 'resolved' },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).send('Message not found');
    }

    res.json(updatedMessage);
  } catch (err) {
    res.status(400).send('Error updating message');
  }
});

module.exports = router;







