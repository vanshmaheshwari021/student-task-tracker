// TaskForm is reused for both:
// - creating a brand-new task
// - editing an existing task
import { useState } from "react";
import axios from "axios";

function TaskForm({ editTask, onClose, API }) {
  // The form starts either with:
  // - the selected task's values (edit mode)
  // - empty/default values (create mode)
  const [form, setForm] = useState({
    title: editTask?.title || "",
    description: editTask?.description || "",
    dueDate: editTask?.dueDate ? editTask.dueDate.slice(0, 10) : "",
    status: editTask?.status || "pending",
    priority: editTask?.priority || "medium",
  });

  // errors stores field messages and submit errors for display in the UI.
  // submitting prevents repeated clicks while a request is in progress.
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validate the form before sending data to the backend.
  const validate = () => {
    const nextErrors = {};

    if (!form.title || form.title.length < 3) {
      nextErrors.title = "Title must be at least 3 characters";
    }

    if (!form.description) {
      nextErrors.description = "Description is required";
    }

    if (!form.dueDate) {
      nextErrors.dueDate = "Due date is required";
    }

    return nextErrors;
  };

  // Update the correct field whenever the user types into an input/select.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the form to the backend.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();

    // Stop immediately if validation fails and show the messages.
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      if (editTask) {
        // Edit mode updates the existing task by ID.
        await axios.put(`${API}/${editTask._id}`, form);
      } else {
        // Create mode adds a completely new task.
        await axios.post(API, form);
      }

      // Close the form after a successful save.
      onClose();
    } catch (err) {
      // Prefer the backend's error message when available.
      setErrors({ submit: err.response?.data?.error || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      {/* Dynamic heading so users know whether they are creating or editing. */}
      <h2>{editTask ? "Edit Task" : "New Task"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
        />
        {errors.title && <p className="err">{errors.title}</p>}

        {/* Description input */}
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What needs to be done?"
        />
        {errors.description && <p className="err">{errors.description}</p>}

        {/* Due date input */}
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p className="err">{errors.dueDate}</p>}

        {/* Status select */}
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority select */}
        <label>Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* General submit error from the backend */}
        {errors.submit && <p className="err">{errors.submit}</p>}

        {/* Save submits the form, cancel closes the modal without saving. */}
        <div className="form-btns">
          <button type="submit" className="btn-save" disabled={submitting}>
            {submitting ? "Saving..." : "Save Task"}
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
