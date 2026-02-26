import axios from "axios";

// Environment variable 
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// record a site visit 
export const recordVisit = async () => {
  try {
    await api.post("/visit");
  } catch (error) {
    console.error("Failed to record visit", error);
  }
};

// 🔹 get total visit count (admin / optional)
export const getVisitCount = async () => {
  const response = await api.get("/visit/count");
  return response.data;
};

export default api;