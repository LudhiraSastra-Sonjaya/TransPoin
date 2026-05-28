import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoBiru from '../assets/Logo Biru.png';
import { registerUser } from '../api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm]         = useState({ nama: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirm) return setError('Password tidak cocok');
    if (form.password.length < 6) return setError('Password minimal 6 karakter');
    setLoading(true);
    try {
      const res = await registerUser({ nama: form.nama, email: form.email, password: form.password });
      loginUser(res.data);
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Registrasi gagal. Coba lagi.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src={logoBiru} alt="TransPoin" className="h-7 w-auto object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-1">Buat akun baru</h1>
        <p className="text-slate-500 text-sm mb-7">Mulai kumpulkan poin perjalananmu</p>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nama Lengkap</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="nama" value={form.nama} onChange={handleChange}
                className="input-field pl-10" placeholder="Nama lengkap" required />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="input-field pl-10" placeholder="nama@email.com" required />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                onChange={handleChange} className="input-field pl-10 pr-10" placeholder="Min. 6 karakter" required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">Konfirmasi Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                className="input-field pl-10" placeholder="Ulangi password" required />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2">
            {loading
              ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><span>Daftar Sekarang</span><ArrowRight size={15} /></>
            }
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
