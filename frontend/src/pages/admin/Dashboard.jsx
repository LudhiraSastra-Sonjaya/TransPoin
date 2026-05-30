import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { getDashboard } from '../../api';
import { Users, Route, Clock, CheckCircle, MapPin, Gift, Coins, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(r => setStats(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Layout title="Dashboard" role="admin">
      <div className="flex justify-center items-center h-64"><div className="spinner" /></div>
    </Layout>
  );

  const quickLinks = [
    { to: '/admin/perjalanan', label: 'Verifikasi Perjalanan', icon: Route,    color: '#2563eb', bg: 'linear-gradient(135deg,#dbeafe,#ede9fe)', border: 'rgba(37,99,235,0.2)', badge: stats?.totalPerjalananPending },
    { to: '/admin/halte',      label: 'Kelola Halte',          icon: MapPin,   color: '#059669', bg: 'linear-gradient(135deg,#d1fae5,#e0f2fe)', border: 'rgba(5,150,105,0.2)'  },
    { to: '/admin/reward',     label: 'Kelola Reward',         icon: Gift,     color: '#7c3aed', bg: 'linear-gradient(135deg,#ede9fe,#fce7f3)', border: 'rgba(124,58,237,0.2)' },
    { to: '/admin/feedback',   label: 'Lihat Feedback',        icon: Activity, color: '#d97706', bg: 'linear-gradient(135deg,#fef3c7,#fce7f3)', border: 'rgba(217,119,6,0.2)'  },
  ];

  return (
    <Layout title="Dashboard" role="admin">

      {/* ── Hero ── */}
      <div className="hero-gradient rounded-2xl p-5 sm:p-7 mb-5 text-white relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #93c5fd, #4f46e5)', filter: 'blur(20px)' }} />
        <div className="absolute right-10 bottom-0 w-32 h-32 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(30px)' }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <TrendingUp size={10} /> Panel Administratif
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Ringkasan TransPoin</h2>
          <p className="text-blue-200 text-sm">Overview performa platform hari ini</p>

          {stats?.totalPerjalananPending > 0 && (
            <Link to="/admin/perjalanan"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/25"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <Clock size={14} />
              <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold flex items-center justify-center">
                {stats.totalPerjalananPending}
              </span>
              Perjalanan menunggu verifikasi
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard icon={Users}       label="Total Pengguna"   value={stats?.totalUsers ?? 0}                 color="blue"    />
        <StatCard icon={MapPin}      label="Total Halte"      value={stats?.totalHalte ?? 0}                 color="emerald" />
        <StatCard icon={Clock}       label="Pending"          value={stats?.totalPerjalananPending ?? 0}     color="amber"   accent />
        <StatCard icon={CheckCircle} label="Approved"         value={stats?.totalPerjalananApproved ?? 0}    color="emerald" />
        <StatCard icon={Route}       label="Total Perjalanan" value={stats?.totalPerjalanan ?? 0}            color="violet"  />
        <StatCard icon={Coins}       label="Poin Distribusi"  value={stats?.totalPoinDistribusi ?? 0}        color="blue"    />
        <StatCard icon={Gift}        label="Penukaran"        value={stats?.totalPenukaranBerhasil ?? 0}     color="rose"    />
      </div>

      {/* ── Quick Actions ── */}
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Aksi Cepat</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {quickLinks.map(({ to, label, icon: Icon, color, bg, border, badge }) => (
          <Link key={to} to={to}
            className="group p-4 rounded-2xl flex flex-col items-start gap-2.5 transition-all duration-200 hover:-translate-y-1"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="flex items-start justify-between w-full">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
                <Icon size={16} style={{ color }} />
              </div>
              {badge > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: '#f59e0b' }}>{badge}</span>
              )}
            </div>
            <p className="text-xs font-semibold leading-tight" style={{ color }}>{label}</p>
          </Link>
        ))}
      </div>

      {/* ── Info Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Alur Kerja */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Alur Kerja Admin</h3>
          <ol className="space-y-3">
            {[
              { title: 'Tambah Halte',  desc: 'Buat daftar halte agar user bisa memilih rute perjalanan.',         color: 'blue'    },
              { title: 'User Submit',   desc: 'User upload bukti perjalanan. Status awal: PENDING.',                color: 'amber'   },
              { title: 'Verifikasi',    desc: 'ACC perjalanan → poin otomatis masuk ke akun user.',                 color: 'emerald' },
            ].map(({ title, desc, color }, i) => {
              const bg  = { blue: 'linear-gradient(135deg,#2563eb,#4f46e5)', amber: 'linear-gradient(135deg,#d97706,#f59e0b)', emerald: 'linear-gradient(135deg,#059669,#0891b2)' }[color];
              return (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-white"
                    style={{ background: bg }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Formula Poin */}
        <div className="card" style={{ background: 'linear-gradient(135deg,#eff6ff,#ede9fe)', border: '1px solid rgba(37,99,235,0.1)' }}>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Formula Poin</h3>
          <p className="text-xs text-slate-500 mb-5">Dihitung otomatis saat admin ACC perjalanan</p>

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="text-center p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(37,99,235,0.1)' }}>
              <p className="text-4xl font-bold text-blue-600">1</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">km jarak</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-slate-300" />
              <span className="text-lg font-bold text-slate-400">=</span>
              <div className="w-px h-6 bg-slate-300" />
            </div>
            <div className="text-center p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
              <p className="text-4xl font-bold text-white">1</p>
              <p className="text-xs text-blue-200 mt-1 font-medium">poin reward</p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.6)' }}>
            <p className="text-xs text-slate-500">
              Semakin jauh perjalanan, semakin banyak poin yang terkumpul 🚌
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
