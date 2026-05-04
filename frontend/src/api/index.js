import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// ============ USER ============
export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);

// ============ ADMIN ============
export const loginAdmin = (data) => api.post('/admin/login', data);
export const getDashboard = () => api.get('/admin/dashboard');

// ============ PERJALANAN ============
export const getAllPerjalanan = () => api.get('/perjalanan');
export const getPerjalananByUser = (userId) => api.get(`/perjalanan/user/${userId}`);
export const createPerjalanan = (data) => api.post('/perjalanan', data);

// ============ REWARD ============
export const getAllReward = () => api.get('/reward');
export const createReward = (data) => api.post('/reward', data);
export const tukarReward = (data) => api.post('/reward/tukar', data);
export const getAllPenukaran = () => api.get('/reward/penukaran');
export const getPenukaranByUser = (userId) => api.get(`/reward/penukaran/user/${userId}`);

// ============ FEEDBACK ============
export const getAllFeedback = () => api.get('/feedback');
export const getFeedbackByUser = (userId) => api.get(`/feedback/user/${userId}`);
export const createFeedback = (data) => api.post('/feedback', data);
export const updateFeedbackStatus = (id, status) => api.put(`/feedback/${id}/status`, { status });

// ============ LAYANAN ============
export const getAllLayanan = () => api.get('/layanan');
export const getLayananByUser = (userId) => api.get(`/layanan/user/${userId}`);
export const createLayanan = (data) => api.post('/layanan', data);
export const updateLayananStatus = (id, status) => api.put(`/layanan/${id}/status`, { status });

export default api;
