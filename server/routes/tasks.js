// Create a dedicated router for all task-related API endpoints.
const express = require("express");
const router = express.Router();

// Import the database model so these routes can talk to MongoDB.
const Task = require("../models/Task");

// GET /api/tasks
// Returns all tasks, with optional search and filtering support.
router.get("/", async (req, res) => {
  try {
    // Read optional query parameters from the URL.
    // Example: /api/tasks?search=math&status=pending&priority=high
    const { search, status, priority } = req.query;
    const filter = {};

    // If search text exists, match title OR description using a case-insensitive regex.
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add exact-match filters only if the user selected them.
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Fetch matching tasks and sort newest first.
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    // Database or server failure while reading tasks.
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks
// Creates a new task from the form data sent by the frontend.
router.post("/", async (req, res) => {
  try {
    // Create a new Task document using the incoming request body.
    const task = new Task(req.body);

    // Save it to MongoDB. Schema validation runs automatically here.
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    // Validation errors are returned as bad requests so the UI can show them.
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/tasks/:id
// Updates an existing task using its MongoDB ID.
router.put("/:id", async (req, res) => {
  try {
    // Find the document by ID, apply the new values,
    // return the updated version, and keep validation enabled.
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // If no task was found, return a 404.
    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    // Invalid IDs or invalid data usually land here.
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id
// Permanently removes a task from the database.
router.delete("/:id", async (req, res) => {
  try {
    // Attempt to find and delete the task in one step.
    const deleted = await Task.findByIdAndDelete(req.params.id);

    // If the task does not exist, return a 404.
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    // Delete failures are treated as server errors here.
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Export the router so server/index.js can mount it under /api/tasks.
module.exports = router;
