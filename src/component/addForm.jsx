import { useState } from "react";
import "../style/addForm.css";

function AddForm({ onAddTask, onClose }) {
  // State for the form fields
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium", // Default priority
    status: "pending", // Default status
  });

  // State to manage task added confirmation
  const [taskAdded, setTaskAdded] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      onAddTask(newTask); // Add the task
      setNewTask({ title: "", description: "", priority: "Medium", status: "pending" }); // Reset form fields
      setTaskAdded(true); // Set taskAdded to true to display confirmation message
      setTimeout(() => {
        setTaskAdded(false); // Hide confirmation message after 3 seconds
        onClose(); // Close the form
      }, 1000);
    }
  };

  return (
    <div className="overlay">
      <div className="add-form-container">
        {taskAdded ? (
          // Display confirmation message instead of the form
          <div className="confirmation-message">
            <h3>Task Added Successfully !!!</h3>
          </div>
        ) : (
          // Form is displayed when taskAdded is false
          <form onSubmit={handleSubmit}>
            <h2>New Task</h2>

            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              required
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              required
            />

            <label>Priority:</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label>Status:</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>

            <div className="form-actions">
              <button type="submit">Add Task</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddForm;
