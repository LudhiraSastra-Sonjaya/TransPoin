import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { getAllReward, createReward } from '../../api';
import { Plus, Gift } from 'lucide-react';

const KelolaReward = () => {
  const [data, setData]             = useState([]);
  const [showModal, setShowModal]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [form, setForm]             = useState({ nama: '', poinDibutuhkan: '', deskripsi: '' });

  const loadData = () => {
    getAllReward().then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError('');
    try {
      await createReward({ ...form, poinDibutuhkan: Number(form.poinDibutuhkan) });
      setShowModal(false); setForm({ nama: '', poinDibutuhkan: '', deskripsi: '' }); loadData();
    } catch (e) { setError(e.response?.data || 'Gagal tambah reward'); }
    finally { setSubmitting(false); }
  };

  return (
    <Layout title="Kelola Reward" role="admin">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-slate-400">{data.length} reward tersedia</span>
        <button onClick={() => { setError(''); setShowModal(true); }} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Tambah Reward
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <Gift size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada reward</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift size={15} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{r.nama}</p>
                  <p className="text-xs text-slate-400 truncate">{r.deskripsi}</p>
                </div>
                <span className="text-sm font-bold text-blue-600 flex-shrink-0">{r.poinDibutuhkan} poin</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Tambah Reward">
        {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nama Reward</label>
            <input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
              className="input-field" placeholder="Voucher GoFood 50rb" required />
          </div>
          <div>
            <label className="label">Poin Dibutuhkan</label>
            <input type="number" min="1" value={form.poinDibutuhkan}
              onChange={e => setForm({ ...form, poinDibutuhkan: e.target.value })}
              className="input-field" placeholder="100" required />
          </div>
          <div>
            <label className="label">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
              className="input-field resize-none" rows={3} placeholder="Deskripsi reward..." required />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default KelolaReward;
