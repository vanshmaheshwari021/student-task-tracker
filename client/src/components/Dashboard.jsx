// Dashboard is a purely presentational component.
// It receives already-calculated counts from App and displays them as summary cards.
function Dashboard({ stats }) {
  return (
    <div className="dashboard">
      {/* Total number of tasks currently visible in the list. */}
      <div className="stat-card total">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>

      {/* Tasks that have not been started yet. */}
      <div className="stat-card pending">
        <span className="stat-num">{stats.pending}</span>
        <span className="stat-label">Pending</span>
      </div>

      {/* Tasks currently being worked on. */}
      <div className="stat-card progress">
        <span className="stat-num">{stats.inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>

      {/* Tasks that are already finished. */}
      <div className="stat-card completed">
        <span className="stat-num">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>

      {/* Tasks whose due date has passed and are still unfinished. */}
      <div className="stat-card overdue">
        <span className="stat-num">{stats.overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
    </div>
  );
}

export default Dashboard;
