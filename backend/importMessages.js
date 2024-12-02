const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const Message = require('./models/Message');  // Import the message model

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/CSMessagingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


const csvFilePath = 'C:/Users/speak/Desktop/GeneralistRails_Project_MessageData.csv'; 

// Array to track promises for saving messages
const messagePromises = [];

// Read and import data from the CSV
fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    // Parse the timestamp from the CSV file
    const timestamp = new Date(row['Timestamp (UTC)']); // Convert string to Date

    // Push each message save operation to the array
    messagePromises.push(
      new Message({
        customer: row['User ID'],  // 'User ID' from the CSV file
        message: row['Message Body'],  // 'Message Body' from the CSV file
        timestamp: timestamp,  // Parsed timestamp
      }).save()
    );
  })
  .on('end', async () => {
    try {
      
      await Promise.all(messagePromises);
      console.log('All messages saved successfully!');
    } catch (err) {
      console.error('Error saving messages:', err);
    } finally {
      
      mongoose.connection.close();
    }
  });





