import React from 'react';

const variants = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50  text-amber-700  border border-amber-200',
  danger:  'bg-red-50    text-red-700    border border-red-200',
  info:    'bg-blue-50   text-blue-700   border border-blue-200',
  default: 'bg-slate-100 text-slate-600  border border-slate-200',
};

const statusMap = {
  PENDING:   'warning',
  APPROVED:  'success',
  REJECTED:  'danger',
  DIPROSES:  'info',
  SELESAI:   'success',
  BERHASIL:  'success',
  DITOLAK:   'danger',
  MENUNGGU:  'warning',
};

const Badge = ({ status, variant, children }) => {
  const v = variant || statusMap[status] || 'default';
  return (
    <span className={`badge ${variants[v]}`}>
      {children || status}
    </span>
  );
};

export default Badge;
