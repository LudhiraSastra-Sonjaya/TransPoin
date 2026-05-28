import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { loginUser, loginAdmin } from '../api';
import { useAuth } from '../context/AuthContext';
import logoPutih from '../assets/Logo Putih.png';
import logoBiru from '../assets/Logo Biru.png';

const LoginPage = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const navigate = useNavigate();
  const { loginUser: authLoginUser, loginAdmin: authLoginAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      // Coba login sebagai USER dulu
      try {
        const res = await loginUser({ email, password });
        authLoginUser(res.data);
        navigate('/user/dashboard');
        return;
      } catch (userErr) {
        // Jika gagal sebagai user, coba sebagai admin
        if (userErr.response?.status !== 400) throw userErr;
      }

      // Coba login sebagai ADMIN
      const res = await loginAdmin({ email, password });
      authLoginAdmin(res.data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Email atau password salah.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Left panel — background biru, pakai Logo Putih */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[480px] bg-blue-600 p-12 flex-shrink-0">
        <div>
          <img src={logoPutih} alt="TransPoin" className="h-8 w-auto object-contain" />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Kumpulkan poin<br />dari setiap<br />perjalananmu.
          </h2>
          <p className="text-blue-200 text-base leading-relaxed">
            Naik transportasi umum, upload bukti, dan tukarkan poin dengan hadiah menarik.
          </p>
        </div>

        <div className="flex gap-3">
          {['Mudah', 'Cepat', 'Terpercaya'].map(t => (
            <span key={t} className="text-xs font-semibold text-blue-200 bg-white/10 px-3 py-1.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel — background terang, pakai Logo Biru */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-surface">
        <div className="w-full max-w-sm animate-fade-in-up">
          {/* Mobile logo — background terang, pakai Logo Biru */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src={logoBiru} alt="TransPoin" className="h-7 w-auto object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-1">Selamat datang</h1>
          <p className="text-slate-500 text-sm mb-7">Masuk untuk melanjutkan</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field pl-10" placeholder="nama@email.com" required />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Masuk</span><ArrowRight size={15} /></>
              }
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
