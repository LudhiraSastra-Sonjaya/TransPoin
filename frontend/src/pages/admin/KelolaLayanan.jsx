import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { getAllLayanan, updateLayananStatus } from '../../api';

const KelolaLayanan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getAllLayanan().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateLayananStatus(id, status);
      loadData();
    } catch (e) { console.error(e); }
  };

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'userName', label: 'Pengguna' },
    { key: 'jenis', label: 'Jenis' },
    { key: 'deskripsi', label: 'Deskripsi' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'adminNama', label: 'Admin' },
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
    <Layout title="Kelola Layanan" role="admin">
      <div className="mb-4">
        <p className="text-sm text-gray-500">Total: <strong>{data.length}</strong> layanan</p>
      </div>
      <div className="card">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={data} emptyMessage="Belum ada layanan" />
        )}
      </div>
    </Layout>
  );
};

export default KelolaLayanan;
