import axios from "axios";

export const client = axios.create({baseURL: "https://main-kanban-api.vercel.app/api"});
