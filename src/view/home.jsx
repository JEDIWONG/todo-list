import { useState } from "react";
import taskList from "../data/task.data";
import TaskCard from "../component/taskCard";
import ActionBar from "../component/actionbar";
import AddForm from "../component/addForm";
import EditForm from "../component/editForm"; // Import EditForm
import "../style/home.css";
import sortIcon from "../assets/sort.svg";
import useScrollAnimation from "../hook/usescrollAnimation";

function Home() {
  
  
  const [tasks, setTasks] = useState(taskList);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State for edit form visibility
  const [taskToEdit, setTaskToEdit] = useState(null); // Store the task being edited
  const [filterStatus, setFilterStatus] = useState("all"); // Filter by status (pending, complete, all)
  const [sortOrder, setSortOrder] = useState("asc"); // Sort by priority (asc, desc)
  const [isRotated, setIsRotated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortCriteria, setSortCriteria] = useState("priority"); // Default: sort by priority
 

  // Priority mapping for sorting
  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  // Handle delete
  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    
  };

  // Handle status toggle (done/pending)
  const handleDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "complete" ? "pending" : "complete",
          }
        : task
    );
    setTasks(updatedTasks);
    
  };

  // Handle add task
  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    
  };

  // Handle edit task
  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setShowEditForm(false); // Close the edit form after saving changes
    
  };

  // Toggle add form visibility
  const toggleForm = () => setShowForm(!showForm);

  // Toggle edit form visibility and set task to edit
  const toggleEditForm = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
    setShowEditForm(true); // Open the edit form
  };

  // Filter tasks by status (complete, pending, all)
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "complete") return task.status === "complete";
    if (filterStatus === "pending") return task.status === "pending";
    return true; // 'all' option
  });

  // Apply search on filtered tasks
  const searchedTasks = filteredTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  
  const sortedTasks = tasks
  .filter((task) => {
    // Apply filter status
    if (filterStatus === "complete") return task.status === "complete";
    if (filterStatus === "pending") return task.status === "pending";
    return true; // 'all' option
  })
  .filter((task) => {
    // Apply search query
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })
  .sort((a, b) => {
    // Apply sorting criteria
    if (sortCriteria === "priority") {
      return sortOrder === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortCriteria === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id; // Sort by ID
    }
    return 0;
  });



  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setIsRotated(!isRotated); // Rotate the icon
  };

  // Handle filter change
  const handleFilterChange = (event) => setFilterStatus(event.target.value);

  useScrollAnimation(sortedTasks);

  return (
    <>
      <div className="page-container">
        <ActionBar
          onAddTaskClick={toggleForm}
          onSearchChange={setSearchQuery}
        />

        <div className="filter-container">
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>

          <select value={sortCriteria} onChange={handleSortCriteriaChange}>
            <option value="priority">Priority</option>
            <option value="id">Latest Added</option>
          </select>

          <img
            src={sortIcon}
            className={`sort-icon ${isRotated ? "rotated" : ""}`} // Conditional class
            onClick={toggleSortOrder}
            alt="Sort Icon"
          />

          <p>
            Showing {sortedTasks.length} out of {tasks.length} tasks
          </p>

        </div>

        {showForm && (
          <AddForm onAddTask={handleAddTask} onClose={toggleForm} />
        )}

        {showEditForm && taskToEdit && (
          <EditForm
            task={taskToEdit}
            onEditTask={handleEditTask}
            onClose={() => setShowEditForm(false)}
          />
        )}

        <div className="task-list-container">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              desc={task.description}
              priority={task.priority}
              status={task.status}
              onDelete={() => handleDelete(task.id)}
              onDone={() => handleDone(task.id)}
              onEdit={() => toggleEditForm(task.id)} // Pass the task ID for editing
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
