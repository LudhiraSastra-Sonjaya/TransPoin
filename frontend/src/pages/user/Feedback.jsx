import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getFeedbackByUser, createFeedback, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Star, Send, MessageSquare } from 'lucide-react';

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(s => (
      <button key={s} type="button" onClick={() => onChange(s)}>
        <Star size={22} className={s <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
      </button>
    ))}
  </div>
);

const FeedbackUser = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks]   = useState([]);
  const [perjalanan, setPerjalanan] = useState([]);
  const [form, setForm]             = useState({ rating: 5, komentar: '', perjalananId: '' });
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState('');
  const [error, setError]           = useState('');

  const loadData = async () => {
    try {
      const [fbRes, pjRes] = await Promise.all([getFeedbackByUser(user.id), getPerjalananByUser(user.id)]);
      setFeedbacks(fbRes.data);
      // Only approved trips can be reviewed
      setPerjalanan(pjRes.data.filter(p => p.status === 'APPROVED'));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.perjalananId) return setError('Pilih perjalanan terlebih dahulu');
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await createFeedback({ ...form, userId: user.id, perjalananId: Number(form.perjalananId) });
      setSuccess('Feedback berhasil dikirim!');
      setForm({ rating: 5, komentar: '', perjalananId: '' });
      loadData();
    } catch (e) { setError(e.response?.data || 'Gagal mengirim feedback'); }
    finally { setSubmitting(false); }
  };

  return (
    <Layout title="Feedback" role="user">
      {/* Form */}
      <div className="card mb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <MessageSquare size={15} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Beri Feedback Perjalanan</h3>
        </div>

        {success && <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">{success}</div>}
        {error   && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Pilih Perjalanan</label>
            <select value={form.perjalananId} onChange={e => setForm({ ...form, perjalananId: e.target.value })}
              className="input-field" required>
              <option value="">-- Pilih perjalanan yang sudah disetujui --</option>
              {perjalanan.map(p => (
                <option key={p.id} value={p.id}>
                  {p.halteAsalNama} → {p.halteTujuanNama} ({p.tanggal})
                </option>
              ))}
            </select>
            {perjalanan.length === 0 && !loading && (
              <p className="text-xs text-slate-400 mt-1">Belum ada perjalanan yang disetujui</p>
            )}
          </div>
          <div>
            <label className="label">Rating</label>
            <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
          </div>
          <div>
            <label className="label">Komentar</label>
            <textarea value={form.komentar} onChange={e => setForm({ ...form, komentar: e.target.value })}
              className="input-field resize-none" rows={3}
              placeholder="Ceritakan pengalaman perjalananmu..." required />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
            <Send size={14} /> {submitting ? 'Mengirim...' : 'Kirim Feedback'}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Riwayat Feedback</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="spinner" /></div>
        ) : feedbacks.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">Belum ada feedback</p>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((f, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1">{f.perjalananInfo} · {f.tanggal}</p>
                    <p className="text-sm text-slate-700">{f.komentar}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} className={s <= f.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                      ))}
                    </div>
                    <Badge status={f.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackUser;
