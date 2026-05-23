import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { getAllHalteAdmin, createHalte, updateHalte, deleteHalte } from '../../api';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';

const empty = { namaHalte: '', alamat: '', latitude: '', longitude: '', aktif: true };

const KelolaHalte = () => {
  const [data, setData]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editId, setEditId]         = useState(null);
  const [form, setForm]             = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [delConfirm, setDelConfirm] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try { const r = await getAllHalteAdmin(); setData(r.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const openCreate = () => { setEditId(null); setForm(empty); setError(''); setShowModal(true); };
  const openEdit   = (h) => {
    setEditId(h.id);
    setForm({ namaHalte: h.namaHalte || '', alamat: h.alamat || '', latitude: h.latitude || '', longitude: h.longitude || '', aktif: h.aktif !== false });
    setError(''); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError('');
    try {
      const payload = {
        namaHalte: form.namaHalte, alamat: form.alamat,
        latitude:  form.latitude  !== '' ? parseFloat(form.latitude)  : null,
        longitude: form.longitude !== '' ? parseFloat(form.longitude) : null,
        aktif: form.aktif,
      };
      editId ? await updateHalte(editId, payload) : await createHalte(payload);
      setShowModal(false); loadData();
    } catch (e) { setError(e.response?.data || 'Gagal menyimpan halte'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteHalte(id); setDelConfirm(null); loadData(); }
    catch (e) { alert(e.response?.data || 'Gagal menghapus'); }
  };

  return (
    <Layout title="Kelola Halte" role="admin">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-slate-400">{data.length} halte terdaftar</span>
        <button onClick={openCreate} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Tambah Halte
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <MapPin size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada halte. Tambahkan halte pertama.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{h.namaHalte}</p>
                  <p className="text-xs text-slate-400 truncate">{h.alamat}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={h.aktif ? 'success' : 'default'}>{h.aktif ? 'Aktif' : 'Nonaktif'}</Badge>
                  <button onClick={() => openEdit(h)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDelConfirm(h)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Halte' : 'Tambah Halte'}>
        {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nama Halte *</label>
            <input value={form.namaHalte} onChange={e => setForm({ ...form, namaHalte: e.target.value })}
              className="input-field" placeholder="Halte Sudirman" required />
          </div>
          <div>
            <label className="label">Alamat *</label>
            <input value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })}
              className="input-field" placeholder="Jl. Sudirman No. 1" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Latitude <span className="normal-case font-normal text-slate-400">(opsional)</span></label>
              <input type="number" step="any" value={form.latitude}
                onChange={e => setForm({ ...form, latitude: e.target.value })}
                className="input-field" placeholder="-6.2088" />
            </div>
            <div>
              <label className="label">Longitude <span className="normal-case font-normal text-slate-400">(opsional)</span></label>
              <input type="number" step="any" value={form.longitude}
                onChange={e => setForm({ ...form, longitude: e.target.value })}
                className="input-field" placeholder="106.8456" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status Aktif</span>
            <button type="button" onClick={() => setForm({ ...form, aktif: !form.aktif })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.aktif ? 'bg-blue-600' : 'bg-slate-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.aktif ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className="text-sm text-slate-500">{form.aktif ? 'Aktif' : 'Nonaktif'}</span>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Menyimpan...' : (editId ? 'Update' : 'Tambah')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!delConfirm} onClose={() => setDelConfirm(null)} title="Hapus Halte" size="sm">
        {delConfirm && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Yakin ingin menghapus halte <strong>{delConfirm.namaHalte}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={() => handleDelete(delConfirm.id)} className="btn-danger flex-1">Hapus</button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default KelolaHalte;
