import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { loginUser, loginAdmin } from '../api';
import { useAuth } from '../context/AuthContext';
import logoPutih from '../assets/Logo Putih.png';
import logoBiru from '../assets/Logo Biru.png';

const features = [
  { icon: Zap,    label: 'Mudah',      desc: 'Upload bukti perjalanan dalam hitungan detik' },
  { icon: Star,   label: 'Cepat',      desc: 'Poin langsung masuk setelah verifikasi admin'   },
  { icon: Shield, label: 'Terpercaya', desc: 'Data perjalanan aman & terenkripsi'            },
];

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
      try {
        const res = await loginUser({ email, password });
        authLoginUser(res.data);
        navigate('/user/dashboard');
        return;
      } catch (userErr) {
        if (userErr.response?.status !== 400) throw userErr;
      }
      const res = await loginAdmin({ email, password });
      authLoginAdmin(res.data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Email atau password salah.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex login-bg">

      {/* ── Left panel ── */}
      <div className="hidden bg-blue-600  lg:flex flex-col justify-between w-[440px] xl:w-[500px] p-12 flex-shrink-0 relative overflow-hidden">

        {/* Animated blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #2563eb, #4f46e5)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-20 right-0 w-56 h-56 rounded-full opacity-15 animate-blob"
          style={{ background: 'radial-gradient(circle, #7c3aed, #db2777)', filter: 'blur(50px)', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #38bdf8, #2563eb)', filter: 'blur(60px)' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Logo */}
        <div className="relative z-10">
          <img src={logoPutih} alt="TransPoin" className="h-8 w-auto object-contain" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(255,255,255,0.25)', color: '#ffff', border: '1px solid rgba(37,99,235,0.3)' }}>
              <Zap size={11} /> Reward otomatis setiap perjalanan
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Naik transportasi,<br />
              <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                kumpulkan poin.
              </span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              TransPoin mengubah setiap perjalanan transportasi umum menjadi reward yang nyata untuk kamu.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(37,99,235,0.3)' }}>
                  <Icon size={15} className="text-white"/>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[['1K+','Pengguna'], ['5K+','Perjalanan'], ['10K+','Poin Dibagi']].map(([val, lbl]) => (
            <div key={lbl} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-lg font-bold text-white">{val}</p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)' }}>

        {/* Subtle bg blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.08), transparent)', filter: 'blur(50px)' }} />

        <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src={logoBiru} alt="TransPoin" className="h-7 w-auto object-contain" />
          </div>

          {/* Form card */}
          <div className="login-form-glass p-8 rounded-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Selamat datang</h1>
              <p className="text-slate-500 text-sm mt-1">Masuk untuk melanjutkan ke TransPoin</p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl text-red-600 text-sm flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="input-field pl-10" placeholder="nama@email.com" required />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="login-password" type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button id="login-submit" type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                {loading
                  ? <div className="w-5 h-5 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                  : <><span>Masuk</span><ArrowRight size={15} /></>
                }
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
