import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getFeedbackByUser, createFeedback, getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Star, Send, MessageSquare, CheckCircle } from 'lucide-react';

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1.5">
    {[1,2,3,4,5].map(s => (
      <button key={s} type="button" onClick={() => onChange(s)}
        className="transition-all duration-150 hover:scale-110">
        <Star size={26}
          className={`transition-all duration-150 ${s <= value ? 'text-amber-400 fill-amber-400 drop-shadow-sm' : 'text-slate-200 hover:text-amber-200'}`} />
      </button>
    ))}
  </div>
);

const ratingLabels = { 1: 'Sangat Buruk', 2: 'Buruk', 3: 'Cukup', 4: 'Bagus', 5: 'Sangat Bagus' };

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
      setSuccess('Feedback berhasil dikirim! Terima kasih 🎉');
      setForm({ rating: 5, komentar: '', perjalananId: '' });
      loadData();
    } catch (e) { setError(e.response?.data || 'Gagal mengirim feedback'); }
    finally { setSubmitting(false); }
  };

  return (
    <Layout title="Feedback" role="user">

      {/* Form Card */}
      <div className="card mb-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#fef3c7,#fce7f3)' }}>
            <MessageSquare size={18} className="text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Beri Feedback Perjalanan</h3>
            <p className="text-xs text-slate-400 mt-0.5">Bantu kami meningkatkan layanan TransPoin</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2 text-emerald-700 text-sm animate-fade-in"
            style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
            <CheckCircle size={15} className="flex-shrink-0 text-emerald-500" /> {success}
          </div>
        )}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-red-600 text-sm flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Pilih Perjalanan</label>
            <select id="feedback-trip" value={form.perjalananId} onChange={e => setForm({ ...form, perjalananId: e.target.value })}
              className="input-field" required>
              <option value="">-- Pilih perjalanan yang sudah disetujui --</option>
              {perjalanan.map(p => (
                <option key={p.id} value={p.id}>
                  {p.halteAsalNama} → {p.halteTujuanNama} ({p.tanggal})
                </option>
              ))}
            </select>
            {perjalanan.length === 0 && !loading && (
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                Belum ada perjalanan yang disetujui untuk diberi feedback
              </p>
            )}
          </div>

          {/* Star rating */}
          <div>
            <label className="label">Rating Pengalaman</label>
            <div className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3"
              style={{ background: 'linear-gradient(135deg,rgba(254,243,199,0.5),rgba(252,231,243,0.3))', border: '1px solid rgba(251,191,36,0.2)' }}>
              <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-600">{form.rating}/5</span>
                <span className="text-xs text-slate-500">— {ratingLabels[form.rating]}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="label">Komentar</label>
            <textarea id="feedback-comment" value={form.komentar} onChange={e => setForm({ ...form, komentar: e.target.value })}
              className="input-field resize-none" rows={3}
              placeholder="Ceritakan pengalaman perjalananmu..." required />
          </div>

          <button id="submit-feedback" type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
            {submitting
              ? <div className="w-4 h-4 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
              : <><Send size={14} /> Kirim Feedback</>
            }
          </button>
        </form>
      </div>

      {/* History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Riwayat Feedback</h3>
            <p className="text-xs text-slate-400 mt-0.5">{feedbacks.length} feedback dikirim</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg,#fef3c7,#fce7f3)' }}>
              <MessageSquare size={22} className="text-amber-500" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Belum ada feedback</p>
          </div>
        ) : (
          <div className="space-y-2">
            {feedbacks.map((f, i) => (
              <div key={i} className="p-4 rounded-xl transition-all duration-150 hover:bg-slate-50"
                style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1.5">{f.perjalananInfo} · {f.tanggal}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{f.komentar}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
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
