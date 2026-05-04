import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { registerUser } from '../api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ nama: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Password tidak cocok');
    if (form.password.length < 6) return setError('Password minimal 6 karakter');
    setLoading(true);
    try {
      const res = await registerUser({ nama: form.nama, email: form.email, password: form.password });
      loginUser(res.data);
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
            <Zap size={28} className="text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">Trans<span className="text-accent-400">Poin</span></h1>
          <p className="text-blue-200 mt-1 text-sm">Sistem Reward Transportasi Umum</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h2>
            <p className="text-gray-500 text-sm mt-1">Mulai kumpulkan poin perjalananmu</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="nama" value={form.nama} onChange={handleChange}
                  className="input-field pl-10" placeholder="Nama lengkap" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="input-field pl-10" placeholder="nama@email.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} className="input-field pl-10 pr-10" placeholder="Min. 6 karakter" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                  className="input-field pl-10" placeholder="Ulangi password" required />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Daftar Sekarang <ArrowRight size={16} /></>
              )}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Sudah punya akun?{' '}
            <Link to="/login/user" className="text-primary-600 font-semibold hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
