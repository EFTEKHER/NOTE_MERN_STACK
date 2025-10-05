// frontend/src/lib/axios.js
import axios from "axios";

const isProd = import.meta.env.MODE === "production";
const BASE_URL = isProd ? "/api" : "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // enable only if you’re using cookies/sessions
});

export default api;
