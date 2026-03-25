import axios from 'axios';

// Create an Axios instance pointing to our environment API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Interceptor for Request (Attach JWT) ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ── Interceptor for Response (Handle global errors) ──
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If we receive a 401 Unauthorized globally (e.g. token expired), we can wipe state.
    if (error.response && error.response.status === 401) {
      // Clean up localStorage to trigger logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // If we want a hard redirect, we can do window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
