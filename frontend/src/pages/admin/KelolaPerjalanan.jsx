import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { getAllPerjalanan, createPerjalanan, getAllUsers } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Plus } from 'lucide-react';

const KelolaPerjalanan = () => {
  const { admin } = useAuth();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ asal: '', tujuan: '', jarak: '', userId: '', tanggal: '' });

  const loadData = async () => {
    try {
      const [pjRes, usrRes] = await Promise.all([getAllPerjalanan(), getAllUsers()]);
      setData(pjRes.data);
      setUsers(usrRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      await createPerjalanan({
        asal: form.asal, tujuan: form.tujuan,
        jarak: parseFloat(form.jarak),
        userId: Number(form.userId),
        adminId: admin.id,
        tanggal: form.tanggal || new Date().toISOString().split('T')[0],
      });
      setShowModal(false);
      setForm({ asal: '', tujuan: '', jarak: '', userId: '', tanggal: '' });
      loadData();
    } catch (e) { setError(e.response?.data || 'Gagal tambah perjalanan'); }
    finally { setSubmitting(false); }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'userName', label: 'Pengguna' },
    { key: 'asal', label: 'Asal' },
    { key: 'tujuan', label: 'Tujuan' },
    { key: 'jarak', label: 'Jarak', render: (v) => `${v} km` },
    { key: 'poinDidapat', label: 'Poin', render: (v) => (
      <span className="font-bold text-primary-600">+{v}</span>
    )},
    { key: 'adminNama', label: 'Admin' },
  ];

  return (
    <Layout title="Kelola Perjalanan" role="admin">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Total: <strong>{data.length}</strong> perjalanan</p>
        <button onClick={() => { setError(''); setShowModal(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Tambah Perjalanan
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={data} emptyMessage="Belum ada perjalanan" />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Tambah Perjalanan">
        {error && <div className="mb-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pengguna</label>
            <select value={form.userId} onChange={e => setForm({...form, userId: e.target.value})}
              className="input-field" required>
              <option value="">-- Pilih User --</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.nama} ({u.email})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Asal</label>
              <input value={form.asal} onChange={e => setForm({...form, asal: e.target.value})}
                className="input-field" placeholder="Stasiun A" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tujuan</label>
              <input value={form.tujuan} onChange={e => setForm({...form, tujuan: e.target.value})}
                className="input-field" placeholder="Terminal B" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jarak (km)</label>
              <input type="number" step="0.1" min="0.1" value={form.jarak}
                onChange={e => setForm({...form, jarak: e.target.value})}
                className="input-field" placeholder="5.5" required />
              {form.jarak && <p className="text-xs text-primary-600 mt-1">= {Math.round(parseFloat(form.jarak))} poin</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
              <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})}
                className="input-field" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Menyimpan...' : 'Simpan Perjalanan'}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default KelolaPerjalanan;
