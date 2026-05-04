import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { getDashboard } from '../../api';
import { Users, Route, MessageSquare, HeadphonesIcon, Gift, Coins } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Layout title="Dashboard Admin" role="admin">
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout title="Dashboard Admin" role="admin">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 mb-6 text-white">
        <p className="text-purple-100 text-sm mb-1">Panel Administratif</p>
        <h2 className="text-2xl font-bold">Ringkasan Sistem TransPoin</h2>
        <p className="text-purple-200 text-sm mt-1">Data real-time dari seluruh aktivitas platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Users} label="Total Pengguna" value={stats?.totalUsers ?? 0} color="blue" />
        <StatCard icon={Route} label="Total Perjalanan" value={stats?.totalPerjalanan ?? 0} color="green" />
        <StatCard icon={Coins} label="Total Poin Terdistribusi" value={stats?.totalPoinDistribusi ?? 0} color="purple" />
        <StatCard icon={MessageSquare} label="Total Feedback" value={stats?.totalFeedback ?? 0} color="orange" />
        <StatCard icon={HeadphonesIcon} label="Total Layanan" value={stats?.totalLayanan ?? 0} color="rose" />
        <StatCard icon={Gift} label="Penukaran Berhasil" value={stats?.totalPenukaranBerhasil ?? 0} color="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Panduan Admin</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span>Gunakan <strong>Kelola Perjalanan</strong> untuk menginput perjalanan user. Poin otomatis terhitung.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span>Tambah reward baru di <strong>Kelola Reward</strong>.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span>Update status feedback &amp; layanan di halaman masing-masing.</li>
          </ul>
        </div>
        <div className="card bg-gradient-to-br from-accent-500/10 to-emerald-50 border-accent-200">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Formula Poin</h3>
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent-500">1 km</p>
              <p className="text-gray-400 text-xl my-2">=</p>
              <p className="text-4xl font-bold text-primary-600">1 poin</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">Poin dihitung otomatis saat input perjalanan</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
