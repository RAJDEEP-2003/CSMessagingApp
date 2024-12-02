# CS Messaging Web App

This is a scalable messaging web application designed to handle customer service inquiries. 
It allows customers to submit messages via a simple web form, which agents can respond to through 
a user-friendly dashboard.
The app prioritizes urgent issues, ensuring that critical customer queries are addressed first.

## Project Overview

- **Frontend**: React.js (for building the user interface)
- **Backend**: Node.js with Express.js (for handling the API and database operations)
- **Database**: MongoDB (for storing customer messages)

---

## LIVE project Working Demo:

click on this link to see he live working demo 

https://drive.google.com/file/d/1rHfXXnJGjmK4Y01e5tgGeIh8YzPQGfiJ/view?usp=sharing


## Features Implemented: 


1. Multi-Agent Messaging System:A web application allowing multiple agents to respond to incoming
   customer queries simultaneously, without requiring authentication 
 
2. API for Messaging:  Customer messages can be sent and received through an API endpoint, which can
   be simulated via a simple web form.


3. CSV Import & Database Integration: Real customer service messages provided in a CSV file are stored in
   a database (MongoDB). These messages appear in the agent's portal, allowing them to view and respond to
    individual messages Work.

4. Division Scheme for Agents: A system is in place to help agents divide work efficiently and prevent multiple
   agents from working on the same message simultaneously.
 

5. Urgency Flagging for Messages: Agents have the ability to search and filter incoming messages and customers to
   streamline the process of addressing inquiries.


## Future Scope (Features to Implement)

1. Enhanced Customer Information Display: Add functionality to display additional customer details (e.g., external profiles or internal information) in the agent UI,
  providing more context for personalized  esponses.
   
2. Canned Responses for Agents: Implement a feature that allows agents to use pre-configured stock messages (canned responses) for quick replies, improving response time and efficiency.

3.  Real-Time Messaging with WebSockets:Implement WebSockets or similar technology to allow real-time updates for incoming
    messages, so agents can see new messages without having to refresh the page.



---

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

Here are the steps to set up the required environment for your project from scratch:

## 1. Install Git (First)
   
Why first?: 
Git is essential for cloning your project repository.

Download and install Git from Git Official Site.(https://git-scm.com/)

Follow the instructions based on your OS.

After installation, verify it by running

git --version






## 2. Install Visual Studio Code (VS Code) (Second)
   
Why second?:
VS Code is your code editor, and you'll use it for editing your project files.

Download and install VS Code from VS Code Official Site.(https://code.visualstudio.com/)

Follow the installation instructions for your OS.

After installation, open VS Code and make sure it's working.




## 3. Install Node.js (Third)
   
Why third?: Node.js is required to run your project's backend.

Download Node.js (version 14 or higher) from Node.js Official Site. (https://nodejs.org/)

Run the installer and follow the on-screen instructions.

Verify the installation by running:

node -v




## 4. Install MongoDB (Fourth)
   
Why fourth?: MongoDB is the database required for storing your project data (messages).

For Local Installation:

Download MongoDB from MongoDB's Official Site.(https://www.mongodb.com/try/download/community)

Follow the instructions to install MongoDB based on your OS.

After installation, start MongoDB:

On Windows, run mongod in Command Prompt.

On macOS/Linux, run sudo mongod in Terminal.


For MongoDB Atlas (Cloud Database):

Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas) and create a free-tier cluster.

Set up a connection string for your project.

---

### Steps to Run the Project

#### 1. Clone the Repository

First, clone the project from GitHub:

```bash
git clone [[https://github.com/your-username/cs-messaging-web-app.git](https://github.com/RAJDEEP-2003/Messageapp.git) ]
(https://github.com/RAJDEEP-2003/CSMessagingApp.git)

cd CSMessagingApp


Folder Structure

cs-messaging-web-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Message.js
│   ├── routes/
│   │   ├── messageRoute.js
│   │   ├── importMessages.js
│   │   └── index.js
│   ├── node_modules/ 
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── node_modules/   t 
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AgentDashboard.js
│   │   │   ├── AgentLogin.js
│   │   │   ├── MessageDetails.js
│   │   │   └── UserQueryForm.js
│   │   ├── services/
│   │   │   └── messageService.js
│   │   ├── styles/
│   │   │   ├── AgentDashboard.css
│   │   │   ├── AgentLogin.css
│   │   │   ├── App.css
│   │   │   ├── MessageDetails.css
│   │   │   └── UserQueryForm.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── GeneralistRails_Project_MessageData.csv

 
***Additional Notes****

MongoDB Database: Make sure your MongoDB database is properly set up, and replace the connection

string in the backend configuration if you're using MongoDB Atlas.


## 2. Configure MongoDB
Make sure MongoDB is running locally or you can configure a MongoDB Atlas database.
 If you are using MongoDB locally, ensure it is running on the default port (27017).

In case of using MongoDB Atlas, replace the connection string in the backend/config/db.js
file with your MongoDB Atlas URI.

// backend/config/db.js
const mongoose = require('mongoose');

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

3. Start the Backend Server
Now, navigate to the backend directory and run the server:

cd ../backend
 nodemon index.js
 The backend will run on http://localhost:5000.


4. Start the Frontend Server
In a separate terminal window, navigate to the frontend directory and run the frontend:

cd ../frontend
npm start


Usage

Customer View:
Open your browser and go to http://localhost:3000 to access the user query form.
Submit your query via the form, and it will be sent to the backend.

Agent login page:
open your browser and go to : http://localhost:3000/agent-login 

after login in the site will be  redricted to the Agent Dashboard  http://localhost:3000/agent-dashboard

In the dashboard you can  view and respond to customer messages. Agents can filter and prioritize
messages.






License
This project is licensed under the MIT License - see the LICENSE file for details.


---

### Explanation of Key Sections:

- **Setup Instructions**: These steps guide the user on how to clone the repository, install
dependencies,configure the database, and run both the frontend and backend servers.
- **MongoDB Configuration**: Instructs how to configure MongoDB locally or via MongoDB Atlas.
- **Folder Structure**: Helps the user understand where to find the backend and frontend code
and how they are structured.
- **Additional Notes**: Mentions the absence of the `node_modules` folder and the need to run
`npm install` in both directories.

This structure will ensure that anyone who wants to run the project on their machine can follow
the instructions easily!

