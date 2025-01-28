import "../style/actionbar.css";

function ActionBar({ onAddTaskClick, onSearchChange }) {
  return (
    <div className="action-bar-container">
      <input
        type="text"
        placeholder="Search Task"
        onChange={(e) => onSearchChange(e.target.value)} // Call the handler with the search input
      />
      <button onClick={onAddTaskClick}>Add Task</button>
    </div>
  );
}

export default ActionBar;

