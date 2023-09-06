// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";
import {
  fetchTasks,
  addNewTask,
  updateTask,
  deleteNewTask,
} from "./components/api/task";

const App = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: "To Do",
      tasks: [],
    },
    inProgress: {
      title: "In Progress",
      tasks: [],
    },
    done: {
      title: "Done",
      tasks: [],
    },
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const getTasks = async () => {
    const { result, error } = await fetchTasks();
    if (!result) {
      console.log(error);
    }
    const inProgressTasks = result.filter((task) => {
      return task.droppableId === "inProgress";
    });
    const doneTasks = result.filter((task) => {
      return task.droppableId === "done";
    });
    const todoTasks = result.filter((task) => {
      return task.droppableId === "todo";
    });
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        tasks: todoTasks,
      },
      inProgress: {
        ...columns.inProgress,
        tasks: inProgressTasks,
      },
      done: {
        ...columns.done,
        tasks: doneTasks,
      },
    });
  };
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const task = columns[source.droppableId].tasks[source.index];
    // console.log(destination);
    const sourceTasks = [...columns[source.droppableId].tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    const destinationTasks = [...columns[destination.droppableId].tasks];
    destinationTasks.splice(destination.index, 0, movedTask);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...columns[source.droppableId],
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...columns[destination.droppableId],
        tasks: destinationTasks,
      },
    });
    const updatedTask = await updateTask({
      taskId: task._id,
      title: task.title,
      description: task.description,
      droppableId: destination.droppableId,
    }); 

    
    console.log(updatedTask);
  };

  const addTask = async (newTask) => {
    const task = await addNewTask(newTask);
    const newtodo = columns.todo.tasks;
    newtodo.push(task);
    console.log(newtodo);
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        tasks: newtodo,
      },
    });
  };

  const deleteTask = async (taskId) => {
    await deleteNewTask(taskId);
    const updatedColumns = { ...columns };
    for (const columnId of Object.keys(updatedColumns)) {
      updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(
        (task) => task._id !== taskId
      );
    }
    setColumns(updatedColumns);
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;
    addTask(newTask);
    setNewTask({
      title: "",
      description: "",
    });
  };

  const onEdit = (task) => {
    console.log(task);
    setIsEditing(true);
    setNewTask({
      title: task.title,
      description: task.description,
      _id: task._id,
      droppableId: task.droppableId,
    });
    // console.log(newTask);
  };

  const EditTask = async() => {
    const updatedColumns = { ...columns };
    const columnId = newTask.droppableId;
    await updateTask({
      taskId: newTask._id,
      title: newTask.title,
      description: newTask.description,
      droppableId: newTask.droppableId,
    });

    for(let index = 0; index < updatedColumns[columnId].tasks.length; index++){
      const element = updatedColumns[columnId].tasks[index];
        if(element._id === newTask._id){
          updatedColumns[columnId].tasks[index].title = newTask.title;
          updatedColumns[columnId].tasks[index].description = newTask.description;
          break;
        }
    }
    console.log(updatedColumns);
    setColumns(updatedColumns);
    
    console.log(updateTask);
    setNewTask({
      title: "",
      description: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.keys(columns).map((columnId) => (
            <Column
              key={columnId}
              title={columns[columnId].title}
              tasks={columns[columnId].tasks}
              columnId={columnId}
              onDelete={deleteTask}
              onEdit={onEdit}
            />
          ))}
        </div>
      </DragDropContext>
      <AddTaskForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
        newTask={newTask}
        setNewTask={setNewTask}
        EditTask={EditTask}
      />
    </div>
  );
};

export default App;
