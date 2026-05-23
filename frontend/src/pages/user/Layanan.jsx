import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getLayananByUser, createLayanan } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { HeadphonesIcon, Send } from 'lucide-react';

const JENIS = ['Pengaduan', 'Pertanyaan', 'Saran', 'Lainnya'];

const LayananUser = () => {
  const { user } = useAuth();
  const [layanans, setLayanans]     = useState([]);
  const [form, setForm]             = useState({ jenis: '', deskripsi: '' });
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState('');
  const [error, setError]           = useState('');

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
    } catch (e) { setError(e.response?.data || 'Gagal mengajukan layanan'); }
    finally { setSubmitting(false); }
  };

  return (
    <Layout title="Layanan" role="user">
      {/* Form */}
      <div className="card mb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <HeadphonesIcon size={15} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Ajukan Layanan / Pengaduan</h3>
        </div>

        {success && <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">{success}</div>}
        {error   && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Jenis Layanan</label>
            <select value={form.jenis} onChange={e => setForm({ ...form, jenis: e.target.value })}
              className="input-field" required>
              <option value="">-- Pilih jenis --</option>
              {JENIS.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
              className="input-field resize-none" rows={4}
              placeholder="Jelaskan pengaduan atau pertanyaan kamu..." required />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
            <Send size={14} /> {submitting ? 'Mengirim...' : 'Ajukan Layanan'}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Riwayat Layanan</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="spinner" /></div>
        ) : layanans.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">Belum ada layanan diajukan</p>
        ) : (
          <div className="space-y-2">
            {layanans.map((l, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HeadphonesIcon size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{l.jenis}</span>
                    <span className="text-xs text-slate-400">{l.tanggal}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{l.deskripsi}</p>
                </div>
                <Badge status={l.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LayananUser;
