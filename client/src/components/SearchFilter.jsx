// SearchFilter only renders controls.
// The actual state lives in App and is passed down through props.
function SearchFilter({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
}) {
  return (
    <div className="search-filter">
      {/* Search field with an icon placed inside the input wrapper. */}
      <div className="search-shell">
        <span className="search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path
              d="M10.5 4.75a5.75 5.75 0 1 0 0 11.5a5.75 5.75 0 0 0 0-11.5Zm0 0 8.75 8.75"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter tasks by status. */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="filter-select"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Filter tasks by priority. */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        className="filter-select"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default SearchFilter;
