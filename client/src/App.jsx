// React hooks manage local state and side effects inside this main page.
import { useState, useEffect } from "react";

// axios is used for all HTTP requests to the backend API.
import axios from "axios";

// These imported components break the page into smaller reusable pieces.
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import Dashboard from "./components/Dashboard";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

// One shared API base URL keeps all task requests consistent.
const API = "http://localhost:5000/api/tasks";

// Decorative header icon component.
// Using inline SVG keeps the icon inside the project and easy to style.
function BookBadge() {
  return (
    <span className="brand-icon" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <defs>
          <linearGradient id="bookFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8f0" />
            <stop offset="55%" stopColor="#e8d5b7" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <path
          d="M12 16a7 7 0 0 1 7-7h30a3 3 0 0 1 3 3v35a8 8 0 0 0-8 8H19a7 7 0 0 1-7-7Z"
          fill="url(#bookFill)"
        />
        <path
          d="M21 18h20M21 26h15M21 34h20"
          stroke="#fffaf1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M18 12v36a6 6 0 0 0 6 6"
          fill="none"
          stroke="#f6efe2"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// App is the main screen of the project.
// It owns the task list, fetches data from the backend,
// and coordinates searching, filtering, editing, and deleting.
function App() {
  // tasks: the array of tasks currently shown on screen
  // loading: whether data is currently being fetched
  // error: a message shown if the request fails
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // showForm: controls whether the modal form is open
  // editTask: stores the task being edited; null means "create new task"
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // These values are controlled by the search/filter UI and sent to the backend.
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // Fetch tasks from the backend using the current search/filter state.
  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      // Build query params dynamically so we only send filters the user selected.
      const params = {};
      if (search) params.search = search;
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;

      // Ask the backend for tasks and store the response in local state.
      const res = await axios.get(API, { params });
      setTasks(res.data);
    } catch {
      // If the server is down or unavailable, show a helpful message in the UI.
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  // Re-run the fetch whenever search text or filters change.
  useEffect(() => {
    fetchTasks();
  }, [search, filterStatus, filterPriority]);

  // Delete a task after asking the user for confirmation.
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axios.delete(`${API}/${id}`);

      // Refresh the task list so the deleted item disappears immediately.
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  // Open the form in edit mode and load the selected task into it.
  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  // Close the modal, clear edit mode, and refresh the list after a save.
  const handleFormClose = () => {
    setShowForm(false);
    setEditTask(null);
    fetchTasks();
  };

  // Compute dashboard summary numbers from the currently visible task list.
  const now = new Date();
  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
    overdue: tasks.filter(
      (task) => task.status !== "completed" && new Date(task.dueDate) < now
    ).length,
  };

  return (
    <div className="app">
      {/* Top header with the title and the main create-task button. */}
      <header className="header">
        <div className="brand">
          <BookBadge />
          <div className="brand-copy">
            <h1>Student Task Tracker</h1>
          </div>
        </div>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          Add Task
        </button>
      </header>

      {/* Summary cards that show the current task counts. */}
      <Dashboard stats={stats} />

      {/* Search and filtering controls. */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />

      {/* Show the form only when the user is adding or editing a task. */}
      {showForm && (
        <div className="modal-overlay">
          <TaskForm editTask={editTask} onClose={handleFormClose} API={API} />
        </div>
      )}

      {/* Main content area: loading message, error message, empty state, or task cards. */}
      <main className="task-list">
        {loading && <p className="state-msg">Loading tasks...</p>}
        {error && <p className="state-msg error">{error}</p>}
        {!loading && !error && tasks.length === 0 && (
          <p className="state-msg">No tasks found. Add one!</p>
        )}
        {!loading &&
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isOverdue={
                task.status !== "completed" && new Date(task.dueDate) < now
              }
            />
          ))}
      </main>
    </div>
  );
}

export default App;
