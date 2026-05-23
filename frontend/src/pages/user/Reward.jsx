import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getAllReward, tukarReward, getPenukaranByUser, getUserById } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Gift, Coins, CheckCircle, AlertCircle, Lock } from 'lucide-react';

const RewardUser = () => {
  const { user, updateUserPoin } = useAuth();
  const [rewards, setRewards]       = useState([]);
  const [penukaran, setPenukaran]   = useState([]);
  const [currentPoin, setCurrentPoin] = useState(user.totalPoin ?? 0);
  const [selected, setSelected]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [tukarLoading, setTukarLoading] = useState(false);
  const [success, setSuccess]       = useState('');
  const [error, setError]           = useState('');

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

  return (
    <Layout title="Reward" role="user">
      {/* Poin banner */}
      <div className="bg-blue-600 rounded-2xl p-5 mb-5 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full" />
        <div>
          <p className="text-blue-200 text-xs mb-1">Poin tersedia</p>
          <p className="text-4xl font-bold">{currentPoin}</p>
          <p className="text-blue-300 text-xs mt-1">Tukarkan dengan hadiah menarik</p>
        </div>
        <div className="bg-white/15 p-4 rounded-2xl"><Coins size={32} className="text-white" /></div>
      </div>

      {success && (
        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-sm">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      {/* Reward grid */}
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Pilihan Reward</h3>
      {loading ? (
        <div className="flex justify-center py-10"><div className="spinner" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {rewards.length === 0 && (
            <p className="col-span-3 text-center text-slate-400 py-10 text-sm">Belum ada reward</p>
          )}
          {rewards.map((r) => {
            const can = currentPoin >= r.poinDibutuhkan;
            return (
              <div key={r.id} className={`card flex flex-col gap-3 transition-all duration-150 ${can ? 'hover:shadow-blue hover:border-blue-200' : 'opacity-60'}`}>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Gift size={18} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {r.poinDibutuhkan} poin
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{r.nama}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{r.deskripsi}</p>
                </div>
                <button
                  onClick={() => { setError(''); setSuccess(''); setSelected(r); }}
                  disabled={!can}
                  className={`mt-auto text-sm py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${can ? 'btn-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  {can ? <><Gift size={13} /> Tukar</> : <><Lock size={13} /> Poin kurang</>}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Riwayat */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Riwayat Penukaran</h3>
        {penukaran.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">Belum ada riwayat penukaran</p>
        ) : (
          <div className="space-y-2">
            {penukaran.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-700">{p.rewardNama}</p>
                  <p className="text-xs text-slate-400">{p.tanggal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-red-500">-{p.poinDibutuhkan}</span>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Konfirmasi Penukaran">
        {selected && (
          <div className="space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <AlertCircle size={15} /> {error}
              </div>
            )}
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-slate-800">{selected.nama}</p>
              <p className="text-xs text-slate-500 mt-1">{selected.deskripsi}</p>
              <p className="text-blue-600 font-bold mt-2 text-sm">{selected.poinDibutuhkan} poin</p>
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Poin saat ini</span><strong>{currentPoin}</strong></div>
              <div className="flex justify-between"><span>Setelah tukar</span><strong className="text-red-500">{currentPoin - selected.poinDibutuhkan}</strong></div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={handleTukar} disabled={tukarLoading} className="btn-primary flex-1">
                {tukarLoading ? 'Memproses...' : 'Konfirmasi'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default RewardUser;
