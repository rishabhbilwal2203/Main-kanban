// src/components/AddTaskForm.js
import React from "react";

const AddTaskForm = ({
  handleAddTask,
  handleInputChange,
  newTask,
  setNewTask,
  isEditing,
  setIsEditing,
  EditTask
}) => {
  return (
    <div className="add-task-form">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={newTask.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={newTask.description}
        onChange={handleInputChange}
      />
      {isEditing ? (
        <button onClick={EditTask}>Edit</button>
      ) : (
        <button onClick={handleAddTask}>Add Task</button>
      )}
    </div>
  );
};

export default AddTaskForm;
