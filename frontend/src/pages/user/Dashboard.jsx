import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { getUserById, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Coins, Route, CheckCircle, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusLabel = { PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak' };
const statusVariant = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger' };

const UserDashboard = () => {
  const { user, updateUserPoin } = useAuth();
  const [profile, setProfile]   = useState(user);
  const [trips, setTrips]       = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, tRes] = await Promise.all([getUserById(user.id), getPerjalananByUser(user.id)]);
        setProfile(pRes.data);
        updateUserPoin(pRes.data.totalPoin);
        setTrips(tRes.data.slice(0, 5));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user.id, updateUserPoin]);

  const approved = trips.filter(p => p.status === 'APPROVED').length;
  const pending  = trips.filter(p => p.status === 'PENDING').length;

  return (
    <Layout title="Dashboard" role="user">
      {/* Hero card */}
      <div className="bg-blue-600 rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -right-4 top-8 w-24 h-24 bg-white/5 rounded-full" />

        <p className="text-blue-200 text-sm mb-1">Selamat datang 👋</p>
        <h2 className="text-xl sm:text-2xl font-bold">{profile?.nama}</h2>
        <p className="text-blue-300 text-xs mt-0.5">{profile?.email}</p>

        <div className="mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5 w-fit">
          <Coins size={18} className="text-blue-200" />
          <span className="text-2xl font-bold">{profile?.totalPoin ?? 0}</span>
          <span className="text-blue-200 text-sm">poin</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard icon={Coins}       label="Total Poin"    value={profile?.totalPoin ?? 0} accent />
        <StatCard icon={Route}       label="Perjalanan"    value={trips.length} subtitle="5 terbaru" />
        <StatCard icon={CheckCircle} label="Disetujui"     value={approved} />
        <StatCard icon={Clock}       label="Menunggu"      value={pending} />
      </div>

      {/* Recent trips */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Perjalanan Terbaru</h3>
          <Link to="/user/perjalanan" className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : trips.length === 0 ? (
          <div className="text-center py-10">
            <Route size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada perjalanan</p>
            <Link to="/user/perjalanan" className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
              Tambah perjalanan <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {trips.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {t.halteAsalNama} → {t.halteTujuanNama}
                  </p>
                  <p className="text-xs text-slate-400">{t.tanggal}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.status === 'APPROVED' && (
                    <span className="text-xs font-bold text-emerald-600">+{t.poinDidapat}</span>
                  )}
                  <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
