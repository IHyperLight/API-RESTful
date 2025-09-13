// API Configuration
// In development: uses localhost:8000
// In production: uses the environment variable REACT_APP_API_URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://YOUR_BACKEND_URL_HERE.onrender.com'
  : 'http://localhost:8000';

export default API_BASE_URL;