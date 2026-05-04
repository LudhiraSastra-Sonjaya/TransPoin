import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import DataTable from '../../components/DataTable';
import { getFeedbackByUser, createFeedback, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Star, Send } from 'lucide-react';

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(s => (
      <button key={s} type="button" onClick={() => onChange(s)}>
        <Star size={24} className={s <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
      </button>
    ))}
  </div>
);

const FeedbackUser = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [perjalanan, setPerjalanan] = useState([]);
  const [form, setForm] = useState({ rating: 5, komentar: '', perjalananId: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fbRes, pjRes] = await Promise.all([
          getFeedbackByUser(user.id),
          getPerjalananByUser(user.id),
        ]);
        setFeedbacks(fbRes.data);
        setPerjalanan(pjRes.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    loadData();
  }, [user.id]);

  const reload = async () => {
    try {
      const [fbRes, pjRes] = await Promise.all([
        getFeedbackByUser(user.id),
        getPerjalananByUser(user.id),
      ]);
      setFeedbacks(fbRes.data);
      setPerjalanan(pjRes.data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.perjalananId) return setError('Pilih perjalanan terlebih dahulu');
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await createFeedback({ ...form, userId: user.id, perjalananId: Number(form.perjalananId) });
      setSuccess('Feedback berhasil dikirim!');
      setForm({ rating: 5, komentar: '', perjalananId: '' });
      reload();
    } catch (e) { setError(e.response?.data || 'Gagal mengirim feedback'); }
    finally { setSubmitting(false); }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'perjalananInfo', label: 'Perjalanan' },
    { key: 'rating', label: 'Rating', render: (v) => (
      <span className="flex items-center gap-1 text-yellow-500 font-semibold"><Star size={14} className="fill-yellow-400" />{v}</span>
    )},
    { key: 'komentar', label: 'Komentar' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
  ];

  return (
    <Layout title="Feedback Perjalanan" role="user">
      <div className="card mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Beri Feedback</h3>
        {success && <div className="mb-4 p-3 bg-green-50 rounded-xl text-green-700 text-sm">{success}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pilih Perjalanan</label>
            <select value={form.perjalananId} onChange={e => setForm({...form, perjalananId: e.target.value})}
              className="input-field" required>
              <option value="">-- Pilih Perjalanan --</option>
              {perjalanan.map(p => (
                <option key={p.id} value={p.id}>{p.asal} → {p.tujuan} ({p.tanggal})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating</label>
            <StarRating value={form.rating} onChange={v => setForm({...form, rating: v})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Komentar</label>
            <textarea value={form.komentar} onChange={e => setForm({...form, komentar: e.target.value})}
              className="input-field resize-none" rows={3}
              placeholder="Ceritakan pengalaman perjalananmu..." required />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
            <Send size={16} />{submitting ? 'Mengirim...' : 'Kirim Feedback'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Riwayat Feedback</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={feedbacks} emptyMessage="Belum ada feedback" />
        )}
      </div>
    </Layout>
  );
};

export default FeedbackUser;
