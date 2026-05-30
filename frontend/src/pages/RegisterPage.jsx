import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import logoBiru from '../assets/Logo Biru.png';
import logoPutih from '../assets/Logo Putih.png';
import { registerUser } from '../api';
import { useAuth } from '../context/AuthContext';

const steps = [
  'Isi data diri kamu',
  'Verifikasi akun',
  'Mulai kumpulkan poin!',
];

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
    <div className="min-h-screen flex login-bg">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[400px] xl:w-[460px] p-12 flex-shrink-0 relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #059669, #0891b2)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-20 right-0 w-56 h-56 rounded-full opacity-15 animate-blob"
          style={{ background: 'radial-gradient(circle, #4f46e5, #7c3aed)', filter: 'blur(50px)', animationDelay: '2s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Logo */}
        <div className="relative z-10">
          <img src={logoPutih} alt="TransPoin" className="h-8 w-auto object-contain" />
        </div>

        {/* Text */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Bergabung &<br />
              <span style={{ background: 'linear-gradient(135deg,#34d399,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                mulai perjalanan.
              </span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Daftar sekarang dan dapatkan poin dari setiap perjalanan transportasi umummu.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#059669,#0891b2)', color: '#fff' }}>
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-white/80">{step}</p>
                {i === 0 && <CheckCircle size={14} className="ml-auto text-emerald-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative z-10 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            🔒 Data kamu aman dan dilindungi enkripsi. TransPoin tidak pernah membagikan data pribadimu.
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)' }}>

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.07), transparent)', filter: 'blur(40px)' }} />

        <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src={logoBiru} alt="TransPoin" className="h-7 w-auto object-contain" />
          </div>

          <div className="login-form-glass p-8 rounded-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Buat akun baru ✨</h1>
              <p className="text-slate-500 text-sm mt-1">Mulai kumpulkan poin perjalananmu</p>
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
                <label className="label">Nama Lengkap</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="reg-nama" name="nama" value={form.nama} onChange={handleChange}
                    className="input-field pl-10" placeholder="Nama lengkap kamu" required />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="reg-email" name="email" type="email" value={form.email} onChange={handleChange}
                    className="input-field pl-10" placeholder="nama@email.com" required />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="reg-password" name="password" type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={handleChange} className="input-field pl-10 pr-10" placeholder="Min. 6 karakter" required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Konfirmasi Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="reg-confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange}
                    className="input-field pl-10" placeholder="Ulangi password" required />
                </div>
              </div>

              <button id="reg-submit" type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2">
                {loading
                  ? <div className="w-5 h-5 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                  : <><span>Daftar Sekarang</span><ArrowRight size={15} /></>
                }
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
