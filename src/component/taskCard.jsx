import { useState } from "react";
import "../style/taskCard.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import doneIcon from "../assets/done.svg";

function TaskCard(props) {
  const { title, desc, priority, status, id, onDone, onEdit, onDelete } = props;

  // State to handle the confirmation overlay
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  // Determine whether the task is completed or pending for styling
  const taskCardClass = status === "complete" ? "task-card-container complete" : "task-card-container pending";
  const textClass = status === "complete" ? "task-text-complete" : "task-text-pending";
  const statusClass = status === "complete" ? "task-status-complete" : "task-status-pending";

  // Conditional class for priority color
  const priorityClass = {
    High: "task-priority-high",
    Medium: "task-priority-medium",
    Low: "task-priority-low"
  };

  // Handle task deletion confirmation
  const handleDeleteClick = () => {
    setIsDeleteConfirmVisible(true); // Show confirmation overlay
  };

  const handleConfirmDelete = () => {
    onDelete(id); // Call the onDelete callback with task id
    setIsDeleteConfirmVisible(false); // Hide confirmation overlay
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmVisible(false); // Hide confirmation overlay if cancelled
  };

  return (
    <div className={taskCardClass}>
      <div className="task-card-details">
        <h2 className={textClass}>{title}</h2>
        <p className={textClass}>{desc}</p>

        <div className="task-tag">
          <div className={`task-priority ${priorityClass[priority]}`}>{priority}</div>
          <div className={`task-status ${statusClass}`}>{status}</div>
        </div>
      </div>

      <div className="task-action-container">
        <img onClick={() => onDone(id)} src={doneIcon} alt="Mark as done" />
        <img onClick={() => onEdit(id)} src={editIcon} alt="Edit task" />
        <img onClick={handleDeleteClick} src={deleteIcon} alt="Delete task" />
      </div>

      {/* Delete Confirmation Overlay */}
      {isDeleteConfirmVisible && (
        <div className="delete-confirmation-overlay">
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this task?</p>
            <div className="confirmation-actions">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
