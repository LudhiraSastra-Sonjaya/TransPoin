import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { getAllReward, createReward, updateReward, deleteReward } from '../../api';
import { Plus, Gift, Pencil, Trash2 } from 'lucide-react';

const emptyForm = { nama: '', poinDibutuhkan: '', deskripsi: '' };

const KelolaReward = () => {
  const [data, setData]             = useState([]);
  const [showModal, setShowModal]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [editId, setEditId]         = useState(null);
  const [form, setForm]             = useState(emptyForm);
  const [delConfirm, setDelConfirm] = useState(null);

  const loadData = () => {
    getAllReward().then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { loadData(); }, []);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setError(''); setShowModal(true); };
  const openEdit   = (r) => {
    setEditId(r.id);
    setForm({ nama: r.nama, poinDibutuhkan: String(r.poinDibutuhkan), deskripsi: r.deskripsi });
    setError(''); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError('');
    try {
      const payload = { ...form, poinDibutuhkan: Number(form.poinDibutuhkan) };
      editId ? await updateReward(editId, payload) : await createReward(payload);
      setShowModal(false); loadData();
    } catch (e) { setError(e.response?.data || 'Gagal menyimpan reward'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteReward(id); setDelConfirm(null); loadData(); }
    catch (e) { alert(e.response?.data || 'Gagal menghapus reward'); }
  };

  return (
    <Layout title="Kelola Reward" role="admin">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-slate-400">{data.length} reward tersedia</span>
        <button onClick={openCreate} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Tambah Reward
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <Gift size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada reward</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift size={15} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{r.nama}</p>
                  <p className="text-xs text-slate-400 truncate">{r.deskripsi}</p>
                </div>
                <span className="text-sm font-bold text-blue-600 flex-shrink-0">{r.poinDibutuhkan} poin</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(r)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDelConfirm(r)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal — tambah / edit */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Reward' : 'Tambah Reward'}>
        {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nama Reward *</label>
            <input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
              className="input-field" placeholder="Voucher GoFood 50rb" required />
          </div>
          <div>
            <label className="label">Poin Dibutuhkan *</label>
            <input type="number" min="1" value={form.poinDibutuhkan}
              onChange={e => setForm({ ...form, poinDibutuhkan: e.target.value })}
              className="input-field" placeholder="100" required />
          </div>
          <div>
            <label className="label">Deskripsi *</label>
            <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
              className="input-field resize-none" rows={3} placeholder="Deskripsi reward..." required />
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
      <Modal isOpen={!!delConfirm} onClose={() => setDelConfirm(null)} title="Hapus Reward" size="sm">
        {delConfirm && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Yakin ingin menghapus reward <strong>{delConfirm.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
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

export default KelolaReward;
