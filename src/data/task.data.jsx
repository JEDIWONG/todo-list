import TaskModel from '../model/task.model';

// Create Task objects
const taskList = [

  new TaskModel(
    1,
    "Learn MVC",
    "Understand the MVC architecture and its implementation in web development.",
    "High",
    "pending"
  ),
  new TaskModel(
    2,
    "Build To-Do List App",
    "Develop a To-Do List web application using HTML, CSS, and JavaScript.",
    "Medium",
    "complete"
  ),
  new TaskModel(
    3,
    "Research React",
    "Study React components, hooks, and state management.",
    "High",
    "pending"
  ),
  new TaskModel(
    4,
    "Refactor Codebase",
    "Refactor the existing project code to improve maintainability.",
    "Low",
    "pending"
  ),
  new TaskModel(
    5,
    "Write Documentation",
    "Document the project details and usage instructions for the To-Do List app.",
    "Medium",
    "pending"
  )
];

export default taskList;
