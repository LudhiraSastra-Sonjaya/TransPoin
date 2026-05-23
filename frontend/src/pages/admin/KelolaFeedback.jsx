import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { getAllFeedback, updateFeedbackStatus } from '../../api';
import { Star, MessageSquare } from 'lucide-react';

const KelolaFeedback = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getAllFeedback().then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { loadData(); }, []);

  const handleStatus = async (id, status) => {
    try { await updateFeedbackStatus(id, status); loadData(); }
    catch (e) { console.error(e); }
  };

  return (
    <Layout title="Kelola Feedback" role="admin">
      <div className="mb-4">
        <span className="text-xs text-slate-400">{data.length} feedback masuk</span>
      </div>
      <div className="card">
        {loading ? (
          <div className="flex justify-center py-10"><div className="spinner" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Belum ada feedback</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((f, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-slate-700">{f.userName}</span>
                      <span className="text-xs text-slate-400">{f.tanggal}</span>
                      {f.perjalananInfo && (
                        <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg">{f.perjalananInfo}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} className={s <= f.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{f.komentar}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Badge status={f.status} />
                    <select value={f.status} onChange={e => handleStatus(f.id, e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-slate-600">
                      <option value="PENDING">Pending</option>
                      <option value="DIPROSES">Diproses</option>
                      <option value="SELESAI">Selesai</option>
                    </select>
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

export default KelolaFeedback;
