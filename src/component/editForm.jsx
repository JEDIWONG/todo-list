import { useState, useEffect } from "react";
import "../style/addForm.css";

function EditForm({ task, onEditTask, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("pending");
  
  // State to manage task edit confirmation
  const [taskEdited, setTaskEdited] = useState(false);

  // Set initial values when the component mounts (for editing)
  useEffect(() => {
     
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const updatedTask = { id: task.id, title, description, priority, status };
    onEditTask(updatedTask); // Call parent function to update task

    setTaskEdited(true); // Set taskEdited to true to show confirmation message

    setTimeout(() => {
      setTaskEdited(false); // Hide confirmation message after 3 seconds
      onClose(); // Close form after editing
    }, 3000);
  };

  return (
    <div className="overlay">
      <div className="add-form-container">
        {taskEdited ? (
          // Display confirmation message instead of the form
          <div className="confirmation-message">
            <h3>Task Updated Successfully!</h3>
          </div>
        ) : (
          // Form is displayed when taskEdited is false
          <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>

            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditForm;
