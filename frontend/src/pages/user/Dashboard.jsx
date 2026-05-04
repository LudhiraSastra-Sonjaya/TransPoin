import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import DataTable from '../../components/DataTable';
import { getUserById, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Coins, Route, Star, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const { user, updateUserPoin } = useAuth();
  const [profile, setProfile] = useState(user);
  const [perjalanan, setPerjalanan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, perjalananRes] = await Promise.all([
          getUserById(user.id),
          getPerjalananByUser(user.id),
        ]);
        setProfile(profileRes.data);
        updateUserPoin(profileRes.data.totalPoin);
        setPerjalanan(perjalananRes.data.slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user.id, updateUserPoin]);

  const totalKm = perjalanan.reduce((sum, p) => sum + (p.jarak || 0), 0);

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'asal', label: 'Asal' },
    { key: 'tujuan', label: 'Tujuan' },
    { key: 'jarak', label: 'Jarak (km)', render: (v) => `${v} km` },
    { key: 'poinDidapat', label: 'Poin', render: (v) => (
      <span className="font-semibold text-primary-600">+{v}</span>
    )},
  ];

  return (
    <Layout title="Dashboard" role="user">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
        <p className="text-blue-100 text-sm mb-1">Selamat datang kembali 👋</p>
        <h2 className="text-2xl font-bold">{profile?.nama}</h2>
        <p className="text-blue-200 text-sm mt-1">{profile?.email}</p>
        <div className="mt-4 flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 w-fit">
          <Coins size={20} />
          <span className="text-xl font-bold">{profile?.totalPoin || 0}</span>
          <span className="text-sm text-blue-100">Total Poin</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Coins} label="Total Poin" value={profile?.totalPoin || 0} color="blue" />
        <StatCard icon={Route} label="Perjalanan" value={perjalanan.length} color="green" subtitle="5 terbaru" />
        <StatCard icon={TrendingUp} label="Total Jarak" value={`${totalKm.toFixed(1)} km`} color="purple" />
      </div>

      {/* Recent trips */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Perjalanan Terbaru</h3>
          <Star size={16} className="text-gray-400" />
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={perjalanan} emptyMessage="Belum ada perjalanan" />
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
