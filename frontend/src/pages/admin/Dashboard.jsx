import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { getDashboard } from '../../api';
import { Users, Route, Clock, CheckCircle, MapPin, Gift, Coins, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(r => setStats(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Layout title="Dashboard" role="admin">
      <div className="flex justify-center items-center h-64"><div className="spinner" /></div>
    </Layout>
  );

  return (
    <Layout title="Dashboard" role="admin">
      {/* Hero */}
      <div className="bg-blue-600 rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute right-8 bottom-0 w-20 h-20 bg-white/5 rounded-full" />
        <p className="text-blue-200 text-xs mb-1">Panel Administratif</p>
        <h2 className="text-xl sm:text-2xl font-bold">Ringkasan TransPoin</h2>
        {stats?.totalPerjalananPending > 0 && (
          <Link to="/admin/perjalanan"
            className="mt-3 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors rounded-xl px-4 py-2 text-sm font-medium">
            <Clock size={14} />
            {stats.totalPerjalananPending} perjalanan menunggu verifikasi
            <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard icon={Users}       label="Total Pengguna"   value={stats?.totalUsers ?? 0} />
        <StatCard icon={MapPin}      label="Total Halte"      value={stats?.totalHalte ?? 0} />
        <StatCard icon={Clock}       label="Pending"          value={stats?.totalPerjalananPending ?? 0} accent />
        <StatCard icon={CheckCircle} label="Approved"         value={stats?.totalPerjalananApproved ?? 0} />
        <StatCard icon={Route}       label="Total Perjalanan" value={stats?.totalPerjalanan ?? 0} />
        <StatCard icon={Coins}       label="Poin Distribusi"  value={stats?.totalPoinDistribusi ?? 0} />
        <StatCard icon={Gift}        label="Penukaran"        value={stats?.totalPenukaranBerhasil ?? 0} />
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Alur Kerja Admin</h3>
          <ol className="space-y-3">
            {[
              ['Tambah Halte', 'Buat daftar halte agar user bisa memilih rute perjalanan.'],
              ['User Submit', 'User upload bukti perjalanan. Status awal: PENDING.'],
              ['Verifikasi', 'ACC perjalanan → poin otomatis masuk ke akun user.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="card bg-blue-50 border-blue-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Formula Poin</h3>
          <div className="flex items-center justify-center py-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">1 km</p>
              <p className="text-xs text-slate-400 mt-1">jarak tempuh</p>
            </div>
            <span className="text-2xl text-slate-300 font-light">=</span>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">1 poin</p>
              <p className="text-xs text-slate-400 mt-1">reward poin</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">Dihitung otomatis saat admin ACC perjalanan</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
