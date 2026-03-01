import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Login API
export const loginUser = (formData) => API.post("/auth/login", formData);
// Register 
export const registerUser = (data) => API.post("/auth/register", data);

export default API;