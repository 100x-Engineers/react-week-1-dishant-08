import axios from "axios";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging/debugging (can be extended for auth tokens)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      if (status === 401) {
        // Unauthorized - could redirect to login
        console.error("Unauthorized access - please login");
      } else if (status === 403) {
        console.error("Forbidden - you don't have permission");
      } else if (status === 500) {
        console.error("Server error - please try again later");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network error - please check your connection");
    }
    return Promise.reject(error);
  }
);

export default api;
