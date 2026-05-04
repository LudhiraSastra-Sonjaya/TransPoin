import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { getAllFeedback, updateFeedbackStatus } from '../../api';
import { Star } from 'lucide-react';

const KelolaFeedback = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getAllFeedback().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateFeedbackStatus(id, status);
      loadData();
    } catch (e) { console.error(e); }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'userName', label: 'Pengguna' },
    { key: 'perjalananInfo', label: 'Perjalanan' },
    { key: 'rating', label: 'Rating', render: (v) => (
      <span className="flex items-center gap-1 text-yellow-500 font-semibold"><Star size={14} className="fill-yellow-400" />{v}</span>
    )},
    { key: 'komentar', label: 'Komentar' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'id', label: 'Aksi', render: (id, row) => (
      <select value={row.status}
        onChange={e => handleStatusChange(id, e.target.value)}
        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-primary-400">
        <option value="PENDING">Pending</option>
        <option value="DIPROSES">Diproses</option>
        <option value="SELESAI">Selesai</option>
      </select>
    )},
  ];

  return (
    <Layout title="Kelola Feedback" role="admin">
      <div className="mb-4">
        <p className="text-sm text-gray-500">Total: <strong>{data.length}</strong> feedback</p>
      </div>
      <div className="card">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={data} emptyMessage="Belum ada feedback" />
        )}
      </div>
    </Layout>
  );
};

export default KelolaFeedback;
