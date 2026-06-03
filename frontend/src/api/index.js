import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
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

// ============ HALTE ============
export const getAllHalte = () => api.get('/halte');
export const getAllHalteAdmin = () => api.get('/admin/halte');
export const createHalte = (data) => api.post('/admin/halte', data);
export const updateHalte = (id, data) => api.put(`/admin/halte/${id}`, data);
export const deleteHalte = (id) => api.delete(`/admin/halte/${id}`);

// ============ PERJALANAN ============
export const getAllPerjalanan = () => api.get('/perjalanan');
export const getPerjalananByUser = (userId) => api.get(`/perjalanan/user/${userId}`);
export const getPerjalananPending = () => api.get('/perjalanan/pending');

// User submit perjalanan dengan bukti (multipart/form-data)
export const createPerjalanan = (formData) =>
  axios.post('http://localhost:8080/api/perjalanan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Admin verifikasi perjalanan
export const verifikasiPerjalanan = (id, data) => api.put(`/perjalanan/${id}/verifikasi`, data);

// ============ REWARD ============
export const getAllReward = () => api.get('/reward');
export const createReward = (data) => api.post('/reward', data);
export const updateReward = (id, data) => api.put(`/reward/${id}`, data);
export const deleteReward = (id) => api.delete(`/reward/${id}`);
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
