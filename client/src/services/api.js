import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lifejudge_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on protected route, clean storage
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        localStorage.removeItem('lifejudge_token');
        localStorage.removeItem('lifejudge_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Daily Activities endpoints
export const entryAPI = {
  create: (data) => api.post('/entries', data),
  getAll: () => api.get('/entries'),
  getById: (id) => api.get(`/entries/${id}`),
  delete: (id) => api.delete(`/entries/${id}`)
};

// AI Judgement endpoints
export const judgeAPI = {
  submitForJudgement: (data) => api.post('/judge', data),
  getHistory: (params) => api.get('/judge/history', { params }),
  getById: (id) => api.get(`/judge/${id}`),
  delete: (id) => api.delete(`/judge/${id}`),
  getDashboardStats: () => api.get('/judge/stats/dashboard')
};

// Weekly Review endpoints
export const weeklyAPI = {
  generate: () => api.post('/weekly-review'),
  getAll: () => api.get('/weekly-review')
};

export default api;

