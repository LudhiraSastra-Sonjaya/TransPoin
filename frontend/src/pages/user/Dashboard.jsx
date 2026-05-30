import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { getUserById, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Coins, Route, CheckCircle, Clock, ArrowRight, MapPin, TrendingUp, Gift, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusLabel   = { PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak' };
const statusVariant = { PENDING: 'warning',  APPROVED: 'success',   REJECTED: 'danger'   };

const UserDashboard = () => {
  const { user, updateUserPoin } = useAuth();
  const [profile, setProfile] = useState(user);
  const [trips, setTrips]     = useState([]);
  const [loading, setLoading] = useState(true);

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
  const totalPoin = profile?.totalPoin ?? 0;

  // Progress to next reward milestone
  const milestones = [100, 250, 500, 1000, 2500, 5000];
  const nextMilestone = milestones.find(m => m > totalPoin) || milestones[milestones.length - 1];
  const prevMilestone = milestones.filter(m => m <= totalPoin).pop() || 0;
  const progress = Math.min(100, ((totalPoin - prevMilestone) / (nextMilestone - prevMilestone)) * 100);

  return (
    <Layout title="Dashboard" role="user">

      {/* ── Hero Card ── */}
      <div className="hero-gradient rounded-2xl p-5 sm:p-7 mb-5 text-white relative overflow-hidden" style={{ minHeight: '160px' }}>
        {/* Animated orb */}
        <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #93c5fd, #4f46e5)', filter: 'blur(20px)' }} />
        <div className="absolute right-10 bottom-0 w-28 h-28 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(20px)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
              <Zap size={10} /> Member Aktif
            </div>
            <p className="text-blue-100 text-sm">Selamat datang</p>
            <h2 className="text-[1.5rem] sm:text-[3rem] font-bold">{profile?.nama}</h2>
            {/* <p className="text-blue-300 text-xs mt-0.5">{profile?.email}</p> */}
          </div>

          {/* Poin display */}
          <div className="flex items-center gap-3 p-4 rounded-2xl sm:flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Coins size={24} className="text-yellow-300" />
            </div>
            <div>
              <p className="text-[11px] text-blue-200 uppercase font-semibold tracking-wide">Total Poin</p>
              <p className="text-3xl font-bold leading-none">{totalPoin.toLocaleString()}</p>
              <p className="text-blue-300 text-xs mt-0.5">poin terkumpul</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-blue-200">Progress ke {nextMilestone} poin</p>
            <p className="text-xs font-bold text-white">{Math.round(progress)}%</p>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #93c5fd, #c4b5fd)' }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-blue-300">{prevMilestone} poin</p>
            <p className="text-xs text-blue-300 flex items-center gap-1">
              <Gift size={10} /> {nextMilestone} poin
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard icon={Coins}       label="Total Poin"  value={totalPoin}     color="blue"    accent />
        <StatCard icon={Route}       label="Perjalanan"  value={trips.length}  color="emerald" subtitle="5 terbaru" />
        <StatCard icon={CheckCircle} label="Disetujui"   value={approved}      color="emerald" />
        <StatCard icon={Clock}       label="Menunggu"    value={pending}       color="amber" />
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { to: '/user/perjalanan', icon: Route,       label: 'Tambah Perjalanan', bg: 'linear-gradient(135deg,#dbeafe,#ede9fe)', color: '#2563eb',  border: 'rgba(37,99,235,0.2)'   },
          { to: '/user/reward',     icon: Gift,         label: 'Tukar Reward',      bg: 'linear-gradient(135deg,#d1fae5,#e0f2fe)', color: '#059669',  border: 'rgba(5,150,105,0.2)'   },
          { to: '/user/feedback',   icon: TrendingUp,   label: 'Beri Feedback',     bg: 'linear-gradient(135deg,#fef3c7,#fce7f3)', color: '#d97706',  border: 'rgba(217,119,6,0.2)'   },
          { to: '/user/layanan',    icon: Zap,          label: 'Bantuan',           bg: 'linear-gradient(135deg,#ede9fe,#fce7f3)', color: '#7c3aed',  border: 'rgba(124,58,237,0.2)'  },
        ].map(({ to, icon: Icon, label, bg, color, border }) => (
          <Link key={to} to={to}
            className="group p-4 rounded-2xl flex flex-col items-start gap-2 transition-all duration-200 hover:-translate-y-1"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.6)' }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-xs font-semibold" style={{ color }}>{label}</p>
          </Link>
        ))}
      </div>

      {/* ── Recent trips ── */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Perjalanan Terbaru</h3>
            <p className="text-xs text-slate-400 mt-0.5">5 perjalanan terakhir</p>
          </div>
          <Link to="/user/perjalanan"
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
              <Route size={28} className="text-blue-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Belum ada perjalanan</p>
            <p className="text-slate-400 text-xs mt-1">Upload bukti perjalananmu dan dapatkan poin!</p>
            <Link to="/user/perjalanan"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline">
              Tambah perjalanan <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {trips.map((t, i) => (
              <div key={i}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 hover:bg-blue-50/60 group cursor-default">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
                  <MapPin size={15} className="text-blue-600" />
                </div>

                {/* Route info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {t.halteAsalNama}
                    <span className="text-slate-400 font-normal mx-1.5">→</span>
                    {t.halteTujuanNama}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.tanggal}</p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.status === 'APPROVED' && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                      +{t.poinDidapat} poin
                    </span>
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
