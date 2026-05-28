import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// User pages
import UserDashboard from './pages/user/Dashboard';
import PerjalananUser from './pages/user/Perjalanan';
import RewardUser from './pages/user/Reward';
import FeedbackUser from './pages/user/Feedback';
import LayananUser from './pages/user/Layanan';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import KelolaPerjalanan from './pages/admin/KelolaPerjalanan';
import KelolaHalte from './pages/admin/KelolaHalte';
import KelolaReward from './pages/admin/KelolaReward';
import KelolaFeedback from './pages/admin/KelolaFeedback';
import KelolaLayanan from './pages/admin/KelolaLayanan';

// Route guards
const UserRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { user, admin } = useAuth();
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={
        admin ? <Navigate to="/admin/dashboard" /> :
        user ? <Navigate to="/user/dashboard" /> :
        <Navigate to="/login" />
      } />

      {/* Auth — satu halaman login */}
      <Route path="/login" element={<LoginPage />} />
      {/* Redirect dari URL lama supaya tidak 404 */}
      <Route path="/login/user"  element={<Navigate to="/login" replace />} />
      <Route path="/login/admin" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* User */}
      <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />
      <Route path="/user/perjalanan" element={<UserRoute><PerjalananUser /></UserRoute>} />
      <Route path="/user/reward" element={<UserRoute><RewardUser /></UserRoute>} />
      <Route path="/user/feedback" element={<UserRoute><FeedbackUser /></UserRoute>} />
      <Route path="/user/layanan" element={<UserRoute><LayananUser /></UserRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/perjalanan" element={<AdminRoute><KelolaPerjalanan /></AdminRoute>} />
      <Route path="/admin/halte" element={<AdminRoute><KelolaHalte /></AdminRoute>} />
      <Route path="/admin/reward" element={<AdminRoute><KelolaReward /></AdminRoute>} />
      <Route path="/admin/feedback" element={<AdminRoute><KelolaFeedback /></AdminRoute>} />
      <Route path="/admin/layanan" element={<AdminRoute><KelolaLayanan /></AdminRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
