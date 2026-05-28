import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getPerjalananByUser, createPerjalanan, getAllHalte } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Route, MapPin, Plus, Upload, ExternalLink, Coins, CheckCircle } from 'lucide-react';

const statusLabel   = { PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak' };
const statusVariant = { PENDING: 'warning',  APPROVED: 'success',   REJECTED: 'danger' };

const PerjalananUser = () => {
  const { user } = useAuth();
  const [data, setData]           = useState([]);
  const [halteList, setHalteList] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');
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

  return (
    <Layout title="Perjalanan Saya" role="user">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatMini icon={Route}       label="Total"     value={data.length} />
        <StatMini icon={CheckCircle} label="Disetujui" value={totalApproved} />
        <StatMini icon={Coins}       label="Poin"      value={totalPoin} accent />
      </div>

      {/* Table card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Riwayat Perjalanan</h3>
          <button onClick={() => { resetForm(); setShowModal(true); }}
            className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3">
            <Plus size={14} /> Tambah
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <EmptyState />
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
                  <p className="text-xs text-slate-400">{t.tanggal} {t.jarak ? `· ${t.jarak} km` : ''}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.status === 'APPROVED' && (
                    <span className="text-xs font-bold text-emerald-600 hidden sm:inline">+{t.poinDidapat}</span>
                  )}
                  <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                  {t.buktiPerjalanan && (
                    <a href={`http://localhost:8080/${t.buktiPerjalanan}`} target="_blank" rel="noreferrer"
                      className="text-blue-400 hover:text-blue-600">
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
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title="Submit Perjalanan">
        {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Halte Asal *</label>
              <select value={form.halteAsalId} onChange={e => setForm({ ...form, halteAsalId: e.target.value })}
                className="input-field" required>
                <option value="">Pilih halte</option>
                {halteList.filter(h => String(h.id) !== String(form.halteTujuanId)).map(h => <option key={h.id} value={h.id}>{h.namaHalte}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Halte Tujuan *</label>
              <select value={form.halteTujuanId} onChange={e => setForm({ ...form, halteTujuanId: e.target.value })}
                className="input-field" required>
                <option value="">Pilih halte</option>
                {halteList.filter(h => String(h.id) !== String(form.halteAsalId)).map(h => <option key={h.id} value={h.id}>{h.namaHalte}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Tanggal</label>
            <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
              className="input-field" max={new Date().toISOString().split('T')[0]} />
          </div>

          <div>
            <label className="label">Catatan <span className="normal-case font-normal text-slate-400">(opsional)</span></label>
            <textarea value={form.catatan} onChange={e => setForm({ ...form, catatan: e.target.value })}
              className="input-field resize-none" rows={2} placeholder="Catatan perjalanan..." />
          </div>

          {/* Upload */}
          <div>
            <label className="label">Bukti Perjalanan *</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-blue-50/50 hover:bg-blue-50 transition-colors">
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="h-full w-full object-contain rounded-xl p-1" />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-blue-400">
                  <Upload size={22} />
                  <span className="text-sm font-medium">Upload foto bukti</span>
                  <span className="text-xs text-slate-400">JPG, PNG (maks 5MB)</span>
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
              {submitting ? 'Mengirim...' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

const StatMini = ({ icon: Icon, label, value, accent }) => (
  <div className={`rounded-2xl p-4 flex flex-col gap-1 ${accent ? 'bg-blue-600' : 'bg-white border border-blue-50 shadow-card'}`}>
    <Icon size={16} className={accent ? 'text-blue-200' : 'text-blue-500'} />
    <p className={`text-xl font-bold ${accent ? 'text-white' : 'text-slate-800'}`}>{value}</p>
    <p className={`text-xs ${accent ? 'text-blue-200' : 'text-slate-400'}`}>{label}</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <Route size={36} className="text-slate-200 mx-auto mb-3" />
    <p className="text-slate-400 text-sm">Belum ada perjalanan</p>
  </div>
);

export default PerjalananUser;
