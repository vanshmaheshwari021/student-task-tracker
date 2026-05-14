// Import the core libraries used by the backend server.
// express: creates the HTTP server and routing system
// mongoose: connects the app to MongoDB
// cors: allows requests from the frontend running on another port
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load variables from .env into process.env so we can safely use secrets like MONGO_URI.
require("dotenv").config();

// Import the task-specific routes from the separate routes file.
const taskRoutes = require("./routes/tasks");

// Create the Express application instance.
const app = express();

// Global middleware:
// cors() allows the React frontend to call this backend.
// express.json() converts incoming JSON request bodies into req.body automatically.
app.use(cors());
app.use(express.json());

// Every task route will start with /api/tasks.
// Examples:
// GET    /api/tasks
// POST   /api/tasks
// PUT    /api/tasks/:id
// DELETE /api/tasks/:id
app.use("/api/tasks", taskRoutes);

// Use the port from the environment if available, otherwise default to 5000.
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the API server.
// This avoids accepting requests before the database is ready.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start listening for requests only after the DB connection succeeds.
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    // If the database connection fails, log the reason for debugging.
    console.error("DB connection failed:", err);
  });
