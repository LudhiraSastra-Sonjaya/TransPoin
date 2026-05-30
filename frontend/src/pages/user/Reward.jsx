import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getAllReward, tukarReward, getPenukaranByUser, getUserById } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Gift, Coins, CheckCircle, AlertCircle, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RewardUser = () => {
  const { user, updateUserPoin } = useAuth();
  const [rewards, setRewards]           = useState([]);
  const [penukaran, setPenukaran]       = useState([]);
  const [currentPoin, setCurrentPoin]   = useState(user.totalPoin ?? 0);
  const [selected, setSelected]         = useState(null);
  const [loading, setLoading]           = useState(true);
  const [tukarLoading, setTukarLoading] = useState(false);
  const [success, setSuccess]           = useState('');
  const [error, setError]               = useState('');

  const loadData = useCallback(async () => {
    try {
      const [rwRes, pnkRes, profileRes] = await Promise.all([
        getAllReward(), getPenukaranByUser(user.id), getUserById(user.id),
      ]);
      setRewards(rwRes.data);
      setPenukaran(pnkRes.data);
      setCurrentPoin(profileRes.data.totalPoin ?? 0);
      updateUserPoin(profileRes.data.totalPoin ?? 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [user.id, updateUserPoin]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleTukar = async () => {
    setTukarLoading(true); setError('');
    try {
      await tukarReward({ userId: user.id, rewardId: selected.id });
      setSuccess(`Reward "${selected.nama}" berhasil ditukar!`);
      setSelected(null);
      loadData();
    } catch (e) { setError(e.response?.data || 'Penukaran gagal'); }
    finally { setTukarLoading(false); }
  };

  // Reward icon colors cycling
  const rewardColors = [
    { bg: 'linear-gradient(135deg,#2563eb,#4f46e5)', shadow: 'rgba(37,99,235,0.3)'   },
    { bg: 'linear-gradient(135deg,#059669,#0891b2)', shadow: 'rgba(5,150,105,0.3)'   },
    { bg: 'linear-gradient(135deg,#7c3aed,#db2777)', shadow: 'rgba(124,58,237,0.3)'  },
    { bg: 'linear-gradient(135deg,#d97706,#dc2626)', shadow: 'rgba(217,119,6,0.3)'   },
    { bg: 'linear-gradient(135deg,#0891b2,#2563eb)', shadow: 'rgba(8,145,178,0.3)'   },
    { bg: 'linear-gradient(135deg,#db2777,#7c3aed)', shadow: 'rgba(219,39,119,0.3)'  },
  ];

  return (
    <Layout title="Reward" role="user">

      {/* ── Poin Banner ── */}
      <div className="hero-gradient rounded-2xl p-6 sm:p-7 mb-5 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #a78bfa, #4f46e5)', filter: 'blur(20px)' }} />
        <div className="absolute left-1/2 bottom-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', filter: 'blur(30px)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Sparkles size={10} /> Poin Kamu
            </div>
            <p className="text-5xl font-bold leading-none">{currentPoin.toLocaleString()}</p>
            <p className="text-blue-200 text-sm mt-2">poin tersedia untuk ditukar</p>
          </div>

          {/* Coin icon */}
          <div className="p-5 rounded-2xl flex-shrink-0 animate-float"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <Coins size={36} className="text-yellow-300" />
          </div>
        </div>

        {/* Quick links */}
        <div className="relative z-10 flex gap-3 mt-5">
          <Link to="/user/perjalanan"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:bg-white/25"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Tambah Perjalanan <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Success alert */}
      {success && (
        <div className="mb-5 px-4 py-3 rounded-xl flex items-center gap-2 text-emerald-700 text-sm animate-fade-in"
          style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
          <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" /> {success}
        </div>
      )}

      {/* ── Reward Grid ── */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Pilihan Reward</h3>
          <p className="text-xs text-slate-400 mt-0.5">Tukar poinmu dengan hadiah menarik</p>
        </div>
        <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-semibold border border-blue-100">
          {rewards.length} tersedia
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-14">
          <div className="spinner" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {rewards.length === 0 && (
            <p className="col-span-3 text-center text-slate-400 py-12 text-sm">Belum ada reward tersedia</p>
          )}
          {rewards.map((r, idx) => {
            const can  = currentPoin >= r.poinDibutuhkan;
            const col  = rewardColors[idx % rewardColors.length];
            const pct  = Math.min(100, (currentPoin / r.poinDibutuhkan) * 100);

            return (
              <div key={r.id}
                className={`reward-card ${can ? '' : 'reward-card-locked'}`}
                style={{ position: 'relative', overflow: 'hidden' }}>

                {/* Top: icon + poin badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: col.bg, boxShadow: `0 4px 16px ${col.shadow}` }}>
                    <Gift size={20} className="text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 block">
                      {r.poinDibutuhkan.toLocaleString()} poin
                    </span>
                    {!can && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        Kurang {(r.poinDibutuhkan - currentPoin).toLocaleString()} poin
                      </p>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="mb-3">
                  <h4 className="font-semibold text-slate-800 text-sm leading-tight">{r.nama}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.deskripsi}</p>
                </div>

                {/* Progress bar */}
                {!can && (
                  <div className="mb-3">
                    <div className="h-1 rounded-full w-full bg-slate-100">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: col.bg }} />
                    </div>
                  </div>
                )}

                {/* Action */}
                <button
                  onClick={() => { setError(''); setSuccess(''); setSelected(r); }}
                  disabled={!can}
                  className={`w-full mt-auto text-sm py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    can ? 'btn-primary' : 'cursor-not-allowed'
                  }`}
                  style={!can ? { background: '#f1f5f9', color: '#94a3b8' } : {}}
                >
                  {can ? <><Gift size={14} /> Tukar Sekarang</> : <><Lock size={13} /> Belum Cukup Poin</>}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Riwayat Penukaran ── */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Riwayat Penukaran</h3>
            <p className="text-xs text-slate-400 mt-0.5">{penukaran.length} transaksi</p>
          </div>
        </div>

        {penukaran.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
              <Gift size={24} className="text-blue-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Belum ada riwayat penukaran</p>
            <p className="text-slate-400 text-xs mt-1">Kumpulkan poin dan tukar dengan reward di atas</p>
          </div>
        ) : (
          <div className="space-y-1">
            {penukaran.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
                    <Gift size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{p.rewardNama}</p>
                    <p className="text-xs text-slate-400">{p.tanggal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                    -{p.poinDibutuhkan}
                  </span>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Confirm Modal ── */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Konfirmasi Penukaran">
        {selected && (
          <div className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl text-red-600 text-sm flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <AlertCircle size={15} /> {error}
              </div>
            )}

            {/* Reward detail */}
            <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg,#eff6ff,#ede9fe)', border: '1px solid rgba(37,99,235,0.1)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
                  <Gift size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{selected.nama}</p>
                  <p className="text-xs text-blue-600 font-bold">{selected.poinDibutuhkan} poin</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">{selected.deskripsi}</p>
            </div>

            {/* Poin summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Poin saat ini</span>
                <span className="font-bold text-slate-800">{currentPoin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Poin dibutuhkan</span>
                <span className="font-bold text-rose-500">-{selected.poinDibutuhkan}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Poin setelah tukar</span>
                <span className="font-bold text-emerald-600">{(currentPoin - selected.poinDibutuhkan).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={handleTukar} disabled={tukarLoading} className="btn-primary flex-1">
                {tukarLoading
                  ? <div className="w-4 h-4 border-2 rounded-full mx-auto" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                  : 'Konfirmasi Tukar'
                }
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default RewardUser;
