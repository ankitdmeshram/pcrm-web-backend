const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');  // Import the DB config
const authRouter = require('./Routes/authRouter');  // Import your auth router
const projectRouter = require('./Routes/projectRouter');  // Import your auth router

dotenv.config();  // Load environment variables

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Connect to the database
connectDB();  // Call the DB connection function

// Use the auth routes for authentication
app.use('/api/auth', authRouter);  // All auth routes will be prefixed with /auth
app.use('/api/project', projectRouter);  // All auth routes will be prefixed with /auth

// Catch-all route for handling any undefined request path
app.all("*", (req, res) => {
  return res.json({
    success: true,
    message: "Good Boy! You are in the very right place.",
  });
});

// Example of a simple unprotected route (public)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Pest Control Management System' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
