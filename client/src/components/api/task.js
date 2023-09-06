import { client } from "./client";

export const fetchTasks = async () => {
  try {
    const { data } = await client.get("/tasks/fetch");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const addNewTask = async (newTask) => {
  try {
    const { data } = await client.post("/tasks/create", newTask);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const updateTask = async (newTask) => {
  try {
    const { data } = await client.put(`/tasks/update/${newTask.taskId}`, newTask);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const deleteNewTask = async (taskId) => {
  try {
    console.log(taskId);
    const { data } = await client.delete(`/tasks/delete/${taskId}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
