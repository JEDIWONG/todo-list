class TaskModel{
    constructor(id, title, description, priority = "Medium", status = "pending") {
      this.id = id; // Unique identifier for the task
      this.title = title; // Title of the task
      this.description = description; // Description of the task
      this.priority = priority; // Priority of the task (High, Medium, Low)
      this.status = status; // Status of the task ('pending' or 'complete')
    }
  
    // Method to toggle task status
    toggleStatus() {
      this.status = this.status === "pending" ? "complete" : "pending";
    }
  
    // Method to update task properties
    updateTask({ title, description, priority }) {
      if (title) this.title = title;
      if (description) this.description = description;
      if (priority) this.priority = priority;
    }
  
    // Method to represent the task as a plain object
    toObject() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        priority: this.priority,
        status: this.status,
      };
    }
  }
  
  export default TaskModel;
  