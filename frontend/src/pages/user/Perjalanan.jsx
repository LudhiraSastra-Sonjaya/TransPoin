import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/DataTable';
import { getPerjalananByUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Route, MapPin } from 'lucide-react';

const PerjalananUser = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPerjalananByUser(user.id)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.id]);

  const totalPoin = data.reduce((s, p) => s + (p.poinDidapat || 0), 0);

  const columns = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'asal', label: 'Asal', render: (v) => (
      <span className="flex items-center gap-1"><MapPin size={12} className="text-gray-400" />{v}</span>
    )},
    { key: 'tujuan', label: 'Tujuan', render: (v) => (
      <span className="flex items-center gap-1"><MapPin size={12} className="text-primary-400" />{v}</span>
    )},
    { key: 'jarak', label: 'Jarak', render: (v) => `${v} km` },
    { key: 'poinDidapat', label: 'Poin Didapat', render: (v) => (
      <span className="inline-flex items-center gap-1 font-bold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full text-xs">
        +{v} poin
      </span>
    )},
    { key: 'adminNama', label: 'Admin Input' },
  ];

  return (
    <Layout title="Riwayat Perjalanan" role="user">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card flex items-center gap-4">
          <div className="bg-primary-100 p-3 rounded-xl"><Route size={20} className="text-primary-600" /></div>
          <div>
            <p className="text-sm text-gray-500">Total Perjalanan</p>
            <p className="text-2xl font-bold text-primary-600">{data.length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="bg-accent-500/10 p-3 rounded-xl">
            <span className="text-accent-500 font-bold text-lg">⭐</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Poin Diperoleh</p>
            <p className="text-2xl font-bold text-accent-500">{totalPoin}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Semua Riwayat Perjalanan</h3>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={data} emptyMessage="Belum ada perjalanan" />
        )}
      </div>
    </Layout>
  );
};

export default PerjalananUser;
