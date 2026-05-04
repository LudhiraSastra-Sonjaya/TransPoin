import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getAllReward, tukarReward, getPenukaranByUser, getUserById } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Gift, Coins, CheckCircle, AlertCircle } from 'lucide-react';

const RewardUser = () => {
  const { user, updateUserPoin } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [penukaran, setPenukaran] = useState([]);
  const [currentPoin, setCurrentPoin] = useState(user.totalPoin);
  const [selectedReward, setSelectedReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tukarLoading, setTukarLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [rwRes, pnkRes, profileRes] = await Promise.all([
        getAllReward(),
        getPenukaranByUser(user.id),
        getUserById(user.id),
      ]);
      setRewards(rwRes.data);
      setPenukaran(pnkRes.data);
      setCurrentPoin(profileRes.data.totalPoin);
      updateUserPoin(profileRes.data.totalPoin);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [user.id, updateUserPoin]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleTukar = async () => {
    setTukarLoading(true);
    setError('');
    try {
      await tukarReward({ userId: user.id, rewardId: selectedReward.id });
      setSuccess(`Reward "${selectedReward.nama}" berhasil ditukar!`);
      setSelectedReward(null);
      loadData();
    } catch (e) {
      setError(e.response?.data || 'Penukaran gagal');
    } finally { setTukarLoading(false); }
  };

  return (
    <Layout title="Reward & Penukaran" role="user">
      {/* Poin Banner */}
      <div className="card bg-gradient-to-r from-accent-500 to-emerald-600 text-white border-0 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm">Poin tersedia</p>
            <p className="text-4xl font-bold mt-1">{currentPoin}</p>
            <p className="text-emerald-100 text-sm mt-1">Tukarkan dengan hadiah menarik!</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl"><Coins size={36} /></div>
        </div>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
          <CheckCircle size={18} /> {success}
        </div>
      )}

      {/* Reward Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Pilihan Reward</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((r) => {
              const canRedeem = currentPoin >= r.poinDibutuhkan;
              return (
                <div key={r.id} className={`card border-2 transition-all duration-200 ${canRedeem ? 'border-transparent hover:border-primary-200 hover:shadow-md' : 'border-transparent opacity-60'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-primary-100 p-2.5 rounded-xl"><Gift size={20} className="text-primary-600" /></div>
                    <span className="text-xs font-semibold bg-primary-50 text-primary-600 px-2 py-1 rounded-lg">
                      {r.poinDibutuhkan} poin
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{r.nama}</h4>
                  <p className="text-sm text-gray-500 mb-4">{r.deskripsi}</p>
                  <button
                    onClick={() => { setError(''); setSuccess(''); setSelectedReward(r); }}
                    disabled={!canRedeem}
                    className={canRedeem ? 'btn-primary w-full text-sm py-2' : 'btn-secondary w-full text-sm py-2 opacity-50 cursor-not-allowed'}
                  >
                    {canRedeem ? 'Tukar Reward' : 'Poin Tidak Cukup'}
                  </button>
                </div>
              );
            })}
            {rewards.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-400">Belum ada reward tersedia</div>
            )}
          </div>
        )}
      </div>

      {/* Riwayat Penukaran */}
      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Riwayat Penukaran</h3>
        {penukaran.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">Belum ada riwayat penukaran</p>
        ) : (
          <div className="space-y-2">
            {penukaran.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{p.rewardNama}</p>
                  <p className="text-xs text-gray-400">{p.tanggal}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-red-500">-{p.poinDibutuhkan} poin</span>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <Modal isOpen={!!selectedReward} onClose={() => setSelectedReward(null)} title="Konfirmasi Penukaran">
        {selectedReward && (
          <div>
            {error && <div className="mb-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
            <div className="bg-primary-50 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-800">{selectedReward.nama}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedReward.deskripsi}</p>
              <p className="text-primary-600 font-bold mt-2">{selectedReward.poinDibutuhkan} poin</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">Poin kamu: <strong>{currentPoin}</strong></p>
            <p className="text-sm text-gray-600 mb-6">Poin setelah tukar: <strong>{currentPoin - selectedReward.poinDibutuhkan}</strong></p>
            <div className="flex gap-3">
              <button onClick={() => setSelectedReward(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={handleTukar} disabled={tukarLoading} className="btn-primary flex-1">
                {tukarLoading ? 'Memproses...' : 'Konfirmasi Tukar'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default RewardUser;
