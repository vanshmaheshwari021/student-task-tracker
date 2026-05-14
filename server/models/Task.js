// Mongoose is used to define the structure and validation rules
// for task documents stored in MongoDB.
const mongoose = require("mongoose");

// This schema acts like a blueprint for every task in the database.
// Each field below explains what data is stored and what rules apply to it.
const taskSchema = new mongoose.Schema(
  {
    // Short title shown as the main heading of the task card.
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    // Longer explanation that tells the student what the task is about.
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    // Deadline used to show due dates and calculate overdue tasks.
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    // Workflow state of the task.
    // Only the three listed values are allowed.
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // Urgency level used for filtering and color-coded badges in the UI.
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the Task model so route files can create, query, update, and delete tasks.
module.exports = mongoose.model("Task", taskSchema);
