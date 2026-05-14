// Small calendar icon used next to the due date line in each task card.
function CalendarIcon() {
  return (
    <span className="meta-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a1 1 0 0 1 1-1Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

// TaskCard renders one task item from the list.
// It shows content, visual status/priority badges, and action buttons.
function TaskCard({ task, onDelete, onEdit, isOverdue }) {
  // Map task priority values to matching badge colors.
  const priorityColor = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  // Map task status values to matching badge colors.
  const statusColor = {
    pending: "#f59e0b",
    "in-progress": "#0891b2",
    completed: "#10b981",
  };

  return (
    // overdue-card adds a special background treatment for late tasks.
    <div className={`task-card ${isOverdue ? "overdue-card" : ""}`}>
      <div className="task-header">
        <h3>{task.title}</h3>

        <div className="badges">
          {/* Priority badge */}
          <span className="badge" style={{ background: priorityColor[task.priority] }}>
            {task.priority}
          </span>

          {/* Status badge */}
          <span className="badge" style={{ background: statusColor[task.status] }}>
            {task.status}
          </span>

          {/* Overdue badge appears only when the task is unfinished and late. */}
          {isOverdue && <span className="badge badge-overdue">Overdue</span>}
        </div>
      </div>

      {/* Main task description */}
      <p className="task-desc">{task.description}</p>

      {/* Due date row */}
      <p className="task-due">
        <CalendarIcon />
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* Edit and delete actions are handled by callback props from App. */}
      <div className="task-actions">
        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
