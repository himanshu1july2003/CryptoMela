// import axios from "axios";

// export const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://cryptomela.onrender.com";


// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// export default api;

import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://cryptomela.onrender.com";

console.log("🌍 API_BASE_URL in frontend:", API_BASE_URL); // 👈 Add this line

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
