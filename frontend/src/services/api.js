import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
    baseURL: import.meta.env.VITE_API_URL,  //New corrected url recently to avoid disease detection api call
});


// Register 
export const registerUser = (data) => API.post("/auth/register", data);
// Login API
export const loginUser = (formData) => API.post("/auth/login", formData);
export const predictCrop = (data) => API.post("/crop/predict", data);


export default API;