import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getAllPerjalanan, getPerjalananPending, verifikasiPerjalanan } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Eye, Clock, MapPin, ExternalLink } from 'lucide-react';

const statusLabel   = { PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak' };
const statusVariant = { PENDING: 'warning',  APPROVED: 'success',   REJECTED: 'danger' };

const KelolaPerjalanan = () => {
  const { admin } = useAuth();
  const [data, setData]           = useState([]);
  const [filter, setFilter]       = useState('ALL');
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');
  const [selected, setSelected]   = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = filter === 'PENDING' ? await getPerjalananPending() : await getAllPerjalanan();
      setData(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [filter]);

  const handleVerifikasi = async (id, action) => {
    setSubmitting(true); setError('');
    try {
      await verifikasiPerjalanan(id, { adminId: admin.id, action });
      setSelected(null);
      loadData();
    } catch (e) {
      setError(e.response?.data || 'Gagal memproses verifikasi');
    } finally { setSubmitting(false); }
  };

  const pendingCount = data.filter(p => p.status === 'PENDING').length;

  return (
    <Layout title="Kelola Perjalanan" role="admin">
      {/* Filter tabs */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          {[['ALL', 'Semua'], ['PENDING', 'Pending']].map(([val, lbl]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                filter === val
                  ? 'bg-blue-600 text-white shadow-blue'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600'
              }`}>
              {val === 'PENDING' && <Clock size={13} />}
              {lbl}
              {val === 'PENDING' && pendingCount > 0 && filter !== 'PENDING' && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400">{data.length} perjalanan</span>
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-10">Tidak ada perjalanan</p>
        ) : (
          <div className="space-y-2">
            {data.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {t.halteAsalNama} → {t.halteTujuanNama}
                  </p>
                  <p className="text-xs text-slate-400">{t.userName} · {t.tanggal}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                  <button onClick={() => { setError(''); setSelected(t); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors">
                    <Eye size={14} />
                  </button>
                  {t.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleVerifikasi(t.id, 'APPROVE')} disabled={submitting}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors">
                        <CheckCircle size={14} />
                      </button>
                      <button onClick={() => handleVerifikasi(t.id, 'REJECT')} disabled={submitting}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                        <XCircle size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Detail Perjalanan">
        {selected && (
          <div className="space-y-4">
            {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-2">
              {[
                ['Pengguna', selected.userName],
                ['Tanggal', selected.tanggal],
                ['Halte Asal', selected.halteAsalNama],
                ['Halte Tujuan', selected.halteTujuanNama],
                ['Jarak', selected.jarak ? `${selected.jarak} km` : '—'],
                ['Poin', selected.poinDidapat ?? '—'],
              ].map(([k, v]) => (
                <div key={k} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-0.5">{k}</p>
                  <p className="text-sm font-semibold text-slate-800">{v}</p>
                </div>
              ))}
            </div>

            {selected.catatan && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">Catatan</p>
                <p className="text-sm text-slate-700">{selected.catatan}</p>
              </div>
            )}

            {/* Bukti */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Bukti Perjalanan</p>
              {selected.buktiPerjalanan ? (
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <img src={`http://localhost:8080/${selected.buktiPerjalanan}`} alt="Bukti"
                    className="w-full max-h-56 object-contain bg-slate-50"
                    onError={e => { e.target.style.display = 'none'; }} />
                  <a href={`http://localhost:8080/${selected.buktiPerjalanan}`} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:underline py-2 bg-slate-50">
                    <ExternalLink size={11} /> Buka di tab baru
                  </a>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Tidak ada bukti</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status:</span>
              <Badge variant={statusVariant[selected.status]}>{statusLabel[selected.status]}</Badge>
            </div>

            {selected.status === 'PENDING' && (
              <div className="flex gap-3 pt-1">
                <button onClick={() => handleVerifikasi(selected.id, 'REJECT')} disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition-colors">
                  <XCircle size={15} /> Tolak
                </button>
                <button onClick={() => handleVerifikasi(selected.id, 'APPROVE')} disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors shadow-blue">
                  <CheckCircle size={15} /> {submitting ? 'Memproses...' : 'Setujui & Beri Poin'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default KelolaPerjalanan;
