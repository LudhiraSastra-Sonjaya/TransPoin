import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import DataTable from '../../components/DataTable';
import { getLayananByUser, createLayanan } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { HeadphonesIcon, Send } from 'lucide-react';

const LayananUser = () => {
  const { user } = useAuth();
  const [layanans, setLayanans] = useState([]);
  const [form, setForm] = useState({ jenis: '', deskripsi: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const jenisOptions = ['Pengaduan', 'Pertanyaan', 'Saran', 'Lainnya'];

  const loadData = useCallback(async () => {
    try {
      const res = await getLayananByUser(user.id);
      setLayanans(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await createLayanan({ ...form, userId: user.id });
      setSuccess('Layanan berhasil diajukan!');
      setForm({ jenis: '', deskripsi: '' });
      loadData();
    } catch (e) {
      setError(e.response?.data || 'Gagal mengajukan layanan');
    } finally { setSubmitting(false); }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'jenis', label: 'Jenis' },
    { key: 'deskripsi', label: 'Deskripsi' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'adminNama', label: 'Admin' },
  ];

  return (
    <Layout title="Layanan Masyarakat" role="user">
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-100 p-2 rounded-xl"><HeadphonesIcon size={20} className="text-primary-600" /></div>
          <h3 className="text-base font-semibold text-gray-800">Ajukan Layanan / Pengaduan</h3>
        </div>
        {success && <div className="mb-4 p-3 bg-green-50 rounded-xl text-green-700 text-sm">{success}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis Layanan</label>
            <select value={form.jenis} onChange={e => setForm({...form, jenis: e.target.value})}
              className="input-field" required>
              <option value="">-- Pilih Jenis --</option>
              {jenisOptions.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
              className="input-field resize-none" rows={4}
              placeholder="Jelaskan pengaduan atau pertanyaan kamu..." required />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
            <Send size={16} />{submitting ? 'Mengirim...' : 'Ajukan Layanan'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Riwayat Layanan</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={layanans} emptyMessage="Belum ada layanan diajukan" />
        )}
      </div>
    </Layout>
  );
};

export default LayananUser;
