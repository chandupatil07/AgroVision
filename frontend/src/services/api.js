import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Register 
export const registerUser = (data) => API.post("/auth/register", data);
// Login API
export const loginUser = (formData) => API.post("/auth/login", formData);
export const predictCrop = (data) => API.post("/crop/predict", data);


export default API;