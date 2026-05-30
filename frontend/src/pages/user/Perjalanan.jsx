import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getPerjalananByUser, createPerjalanan, getAllHalte } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Route, MapPin, Plus, Upload, ExternalLink, Coins, CheckCircle, ArrowRight } from 'lucide-react';

const statusLabel   = { PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak' };
const statusVariant = { PENDING: 'warning',  APPROVED: 'success',   REJECTED: 'danger'   };

const PerjalananUser = () => {
  const { user } = useAuth();
  const [data, setData]             = useState([]);
  const [halteList, setHalteList]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({ halteAsalId: '', halteTujuanId: '', tanggal: '', catatan: '', buktiPerjalanan: null });

  const loadData = async () => {
    try {
      const [pjRes, hRes] = await Promise.all([getPerjalananByUser(user.id), getAllHalte()]);
      setData(pjRes.data);
      setHalteList(hRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [user.id]);

  const resetForm = () => {
    setForm({ halteAsalId: '', halteTujuanId: '', tanggal: '', catatan: '', buktiPerjalanan: null });
    setPreviewUrl(null); setError('');
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('File harus berupa gambar'); return; }
    setForm({ ...form, buktiPerjalanan: file });
    setPreviewUrl(URL.createObjectURL(file));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.buktiPerjalanan) return setError('Bukti perjalanan wajib diupload');
    if (form.halteAsalId === form.halteTujuanId) return setError('Halte asal dan tujuan tidak boleh sama');
    setSubmitting(true); setError('');
    try {
      const fd = new FormData();
      fd.append('userId', user.id);
      fd.append('halteAsalId', form.halteAsalId);
      fd.append('halteTujuanId', form.halteTujuanId);
      if (form.tanggal) fd.append('tanggal', form.tanggal);
      if (form.catatan) fd.append('catatan', form.catatan);
      fd.append('buktiPerjalanan', form.buktiPerjalanan);
      await createPerjalanan(fd);
      setShowModal(false); resetForm(); loadData();
    } catch (e) { setError(e.response?.data || 'Gagal submit perjalanan'); }
    finally { setSubmitting(false); }
  };

  const totalApproved = data.filter(p => p.status === 'APPROVED').length;
  const totalPoin     = data.filter(p => p.status === 'APPROVED').reduce((s, p) => s + (p.poinDidapat || 0), 0);
  const totalPending  = data.filter(p => p.status === 'PENDING').length;

  return (
    <Layout title="Perjalanan Saya" role="user">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Route,       label: 'Total',     value: data.length,    color: 'blue'    },
          { icon: CheckCircle, label: 'Disetujui', value: totalApproved,  color: 'emerald' },
          { icon: Coins,       label: 'Total Poin Didapat',      value: totalPoin,      color: 'blue',   accent: true },
        ].map(({ icon: Icon, label, value, color, accent }) => (
          <div key={label}
            className="rounded-2xl p-4 flex flex-col gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
            style={accent
              ? { background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }
              : { background: '#fff', border: '1px solid rgba(37,99,235,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }
            }>
            <Icon size={16} className={accent ? 'text-blue-200' : color === 'emerald' ? 'text-emerald-500' : 'text-blue-500'} />
            <p className={`text-xl font-bold ${accent ? 'text-white' : 'text-slate-800'}`}>{value}</p>
            <p className={`text-xs font-medium ${accent ? 'text-blue-200' : 'text-slate-500'}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Trip list card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Riwayat Perjalanan</h3>
            <p className="text-xs text-slate-400 mt-0.5">{data.length} perjalanan · {totalPending} menunggu</p>
          </div>
          <button id="btn-tambah-perjalanan" onClick={() => { resetForm(); setShowModal(true); }}
            className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3">
            <Plus size={14} /> Tambah
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-14">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
              <Route size={28} className="text-blue-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Belum ada perjalanan</p>
            <p className="text-slate-400 text-xs mt-1">Tambahkan perjalanan pertamamu!</p>
            <button onClick={() => { resetForm(); setShowModal(true); }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline">
              Tambah sekarang <ArrowRight size={13} />
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {data.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-150 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#dbeafe,#ede9fe)' }}>
                  <MapPin size={15} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {t.halteAsalNama}
                    <span className="text-slate-400 font-normal mx-1.5">→</span>
                    {t.halteTujuanNama}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.tanggal}
                    {t.jarak ? <span className="ml-1.5">· {t.jarak} km</span> : null}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.status === 'APPROVED' && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 hidden sm:inline">
                      +{t.poinDidapat} poin
                    </span>
                  )}
                  <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                  {t.buktiPerjalanan && (
                    <a href={`http://localhost:8080/${t.buktiPerjalanan}`} target="_blank" rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title="Submit Perjalanan Baru">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-red-600 text-sm flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Halte Asal *</label>
              <select id="halte-asal" value={form.halteAsalId} onChange={e => setForm({ ...form, halteAsalId: e.target.value })}
                className="input-field" required>
                <option value="">Pilih halte</option>
                {halteList.filter(h => String(h.id) !== String(form.halteTujuanId)).map(h =>
                  <option key={h.id} value={h.id}>{h.namaHalte}</option>
                )}
              </select>
            </div>
            <div>
              <label className="label">Halte Tujuan *</label>
              <select id="halte-tujuan" value={form.halteTujuanId} onChange={e => setForm({ ...form, halteTujuanId: e.target.value })}
                className="input-field" required>
                <option value="">Pilih halte</option>
                {halteList.filter(h => String(h.id) !== String(form.halteAsalId)).map(h =>
                  <option key={h.id} value={h.id}>{h.namaHalte}</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Tanggal</label>
            <input id="trip-date" type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
              className="input-field" max={new Date().toISOString().split('T')[0]} />
          </div>

          <div>
            <label className="label">Catatan <span className="normal-case font-normal text-slate-400">(opsional)</span></label>
            <textarea value={form.catatan} onChange={e => setForm({ ...form, catatan: e.target.value })}
              className="input-field resize-none" rows={2} placeholder="Catatan perjalanan..." />
          </div>

          {/* Upload zone */}
          <div>
            <label className="label">Bukti Perjalanan *</label>
            <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer transition-all duration-200"
              style={{ border: '2px dashed rgba(37,99,235,0.25)', background: previewUrl ? 'transparent' : 'rgba(37,99,235,0.03)' }}
              onMouseEnter={e => !previewUrl && (e.currentTarget.style.background = 'rgba(37,99,235,0.06)')}
              onMouseLeave={e => !previewUrl && (e.currentTarget.style.background = 'rgba(37,99,235,0.03)')}>
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="h-full w-full object-contain rounded-xl p-1" />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-blue-400">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.1)' }}>
                    <Upload size={18} />
                  </div>
                  <span className="text-sm font-semibold">Upload foto bukti</span>
                  <span className="text-xs text-slate-400">JPG, PNG · maks 5MB</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {form.buktiPerjalanan && (
              <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                <CheckCircle size={12} /> {form.buktiPerjalanan.name}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting
                ? <div className="w-4 h-4 border-2 rounded-full mx-auto" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                : 'Submit Perjalanan'
              }
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default PerjalananUser;
