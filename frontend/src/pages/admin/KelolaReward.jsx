import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { getAllReward, createReward } from '../../api';
import { Plus, Gift } from 'lucide-react';

const KelolaReward = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nama: '', poinDibutuhkan: '', deskripsi: '' });

  const loadData = () => {
    getAllReward().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      await createReward({ ...form, poinDibutuhkan: Number(form.poinDibutuhkan) });
      setShowModal(false);
      setForm({ nama: '', poinDibutuhkan: '', deskripsi: '' });
      loadData();
    } catch (e) { setError(e.response?.data || 'Gagal tambah reward'); }
    finally { setSubmitting(false); }
  };

  const columns = [
    { key: 'id', label: '#' },
    { key: 'nama', label: 'Nama Reward', render: (v) => (
      <span className="flex items-center gap-2 font-medium"><Gift size={14} className="text-primary-400" />{v}</span>
    )},
    { key: 'poinDibutuhkan', label: 'Poin Dibutuhkan', render: (v) => (
      <span className="font-bold text-primary-600">{v} poin</span>
    )},
    { key: 'deskripsi', label: 'Deskripsi' },
  ];

  return (
    <Layout title="Kelola Reward" role="admin">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Total: <strong>{data.length}</strong> reward</p>
        <button onClick={() => { setError(''); setShowModal(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Tambah Reward
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={data} emptyMessage="Belum ada reward" />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Tambah Reward">
        {error && <div className="mb-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Reward</label>
            <input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})}
              className="input-field" placeholder="Voucher GoFood 50rb" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Poin Dibutuhkan</label>
            <input type="number" min="1" value={form.poinDibutuhkan}
              onChange={e => setForm({...form, poinDibutuhkan: e.target.value})}
              className="input-field" placeholder="100" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
              className="input-field resize-none" rows={3} placeholder="Deskripsi reward..." required />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Menyimpan...' : 'Simpan Reward'}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default KelolaReward;
