import axios from "axios";

export const client = axios.create({baseURL: "main-kanban-api.vercel.app/api"});
