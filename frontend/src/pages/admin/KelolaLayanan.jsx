import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getAllLayanan, updateLayananStatus } from '../../api';
import { HeadphonesIcon } from 'lucide-react';

const KelolaLayanan = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getAllLayanan().then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { loadData(); }, []);

  const handleStatus = async (id, status) => {
    try { await updateLayananStatus(id, status); loadData(); }
    catch (e) { console.error(e); }
  };

  return (
    <Layout title="Kelola Layanan" role="admin">
      <div className="mb-4">
        <span className="text-xs text-slate-400">{data.length} layanan masuk</span>
      </div>
      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <HeadphonesIcon size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada layanan</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((l, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HeadphonesIcon size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-slate-700">{l.userName}</span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{l.jenis}</span>
                    <span className="text-xs text-slate-400">{l.tanggal}</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{l.deskripsi}</p>
                  {l.adminNama && <p className="text-xs text-slate-400 mt-1">Ditangani: {l.adminNama}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <Badge status={l.status} />
                  <select value={l.status} onChange={e => handleStatus(l.id, e.target.value)}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-slate-600">
                    <option value="PENDING">Pending</option>
                    <option value="DIPROSES">Diproses</option>
                    <option value="SELESAI">Selesai</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default KelolaLayanan;
