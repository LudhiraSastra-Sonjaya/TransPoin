import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getLayananByUser, createLayanan } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { HeadphonesIcon, Send, CheckCircle, AlertCircle, HelpCircle, Lightbulb, MoreHorizontal } from 'lucide-react';

const JENIS = ['Pengaduan', 'Pertanyaan', 'Saran', 'Lainnya'];

const jenisConfig = {
  Pengaduan:  { icon: AlertCircle, color: '#e11d48', bg: 'rgba(225,29,72,0.1)',   border: 'rgba(225,29,72,0.2)'   },
  Pertanyaan: { icon: HelpCircle,  color: '#2563eb', bg: 'rgba(37,99,235,0.1)',   border: 'rgba(37,99,235,0.2)'   },
  Saran:      { icon: Lightbulb,   color: '#d97706', bg: 'rgba(217,119,6,0.1)',   border: 'rgba(217,119,6,0.2)'   },
  Lainnya:    { icon: MoreHorizontal, color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.2)' },
};

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
      setSuccess('Layanan berhasil diajukan! Tim kami akan segera merespons 🙌');
      setForm({ jenis: '', deskripsi: '' });
      loadData();
    } catch (e) { setError(e.response?.data || 'Gagal mengajukan layanan'); }
    finally { setSubmitting(false); }
  };

  return (
    <Layout title="Layanan" role="user">

      {/* Form Card */}
      <div className="card mb-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#ede9fe,#fce7f3)' }}>
            <HeadphonesIcon size={18} className="text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Ajukan Layanan / Pengaduan</h3>
            <p className="text-xs text-slate-400 mt-0.5">Tim kami siap membantu kamu 24/7</p>
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
          {/* Jenis selector pills */}
          <div>
            <label className="label">Jenis Layanan</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {JENIS.map(j => {
                const cfg    = jenisConfig[j];
                const Icon   = cfg.icon;
                const active = form.jenis === j;
                return (
                  <button key={j} type="button" onClick={() => setForm({ ...form, jenis: j })}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150"
                    style={{
                      background: active ? cfg.bg : 'rgba(248,250,252,1)',
                      border: `1px solid ${active ? cfg.border : 'rgba(0,0,0,0.07)'}`,
                      transform: active ? 'scale(1.02)' : 'scale(1)',
                    }}>
                    <Icon size={16} style={{ color: active ? cfg.color : '#94a3b8' }} />
                    <span className="text-xs font-semibold" style={{ color: active ? cfg.color : '#64748b' }}>{j}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="label">Deskripsi</label>
            <textarea id="layanan-desc" value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
              className="input-field resize-none" rows={4}
              placeholder="Jelaskan pengaduan atau pertanyaan kamu secara detail..." required />
          </div>

          <button id="submit-layanan" type="submit" disabled={submitting || !form.jenis} className="btn-primary flex items-center gap-2">
            {submitting
              ? <div className="w-4 h-4 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
              : <><Send size={14} /> Ajukan Layanan</>
            }
          </button>
        </form>
      </div>

      {/* History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Riwayat Layanan</h3>
            <p className="text-xs text-slate-400 mt-0.5">{layanans.length} tiket diajukan</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : layanans.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg,#ede9fe,#fce7f3)' }}>
              <HeadphonesIcon size={22} className="text-violet-500" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Belum ada layanan diajukan</p>
            <p className="text-slate-400 text-xs mt-1">Ada pertanyaan? Jangan ragu untuk menghubungi kami</p>
          </div>
        ) : (
          <div className="space-y-2">
            {layanans.map((l, i) => {
              const cfg  = jenisConfig[l.jenis] || jenisConfig.Lainnya;
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl transition-all duration-150 hover:bg-slate-50"
                  style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <Icon size={15} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                        {l.jenis}
                      </span>
                      <span className="text-xs text-slate-400">{l.tanggal}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{l.deskripsi}</p>
                  </div>
                  <Badge status={l.status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LayananUser;
