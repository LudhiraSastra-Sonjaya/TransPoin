import React from 'react';

const Badge = ({ status }) => {
  const styles = {
    PENDING:   'bg-yellow-100 text-yellow-700',
    DIPROSES:  'bg-blue-100 text-blue-700',
    SELESAI:   'bg-green-100 text-green-700',
    MENUNGGU:  'bg-orange-100 text-orange-700',
    BERHASIL:  'bg-green-100 text-green-700',
    DITOLAK:   'bg-red-100 text-red-700',
  };
  const labels = {
    PENDING: 'Pending', DIPROSES: 'Diproses', SELESAI: 'Selesai',
    MENUNGGU: 'Menunggu', BERHASIL: 'Berhasil', DITOLAK: 'Ditolak',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {labels[status] || status}
    </span>
  );
};

export default Badge;
