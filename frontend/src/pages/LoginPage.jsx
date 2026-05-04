import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { loginUser, loginAdmin } from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser: authLoginUser, loginAdmin: authLoginAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (role === 'admin') {
        const res = await loginAdmin({ email, password });
        authLoginAdmin(res.data);
        navigate('/admin/dashboard');
      } else {
        const res = await loginUser({ email, password });
        authLoginUser(res.data);
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data || 'Login gagal. Periksa email dan password.');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
            <Zap size={28} className="text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Trans<span className="text-accent-400">Poin</span>
          </h1>
          <p className="text-blue-200 mt-1 text-sm">Sistem Reward Transportasi Umum</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isAdmin ? 'Login Admin' : 'Masuk ke Akun'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isAdmin ? 'Panel pengelola TransPoin' : 'Kelola poin perjalanan kamu'}
            </p>
          </div>

          {/* Role Switch */}
          <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
            <Link to="/login/user"
              className={`flex-1 text-center py-2 rounded-lg text-sm font-medium transition-all ${!isAdmin ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              User
            </Link>
            <Link to="/login/admin"
              className={`flex-1 text-center py-2 rounded-lg text-sm font-medium transition-all ${isAdmin ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Admin
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Masuk <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {!isAdmin && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          )}

          {isAdmin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-600">
              <strong>Default:</strong> admin@transpoin.com / admin123
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
