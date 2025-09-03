import axios from "axios";

// TEMPORARY HARDCODE - Testing only
export const API_BASE_URL = "https://cryptomela.onrender.com";

console.log("🌍 API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;