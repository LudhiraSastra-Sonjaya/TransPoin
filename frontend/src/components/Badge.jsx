import React from 'react';

const variantMap = {
  success: { bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  warning: { bg: 'bg-amber-50 text-amber-700 border border-amber-200',   dot: 'bg-amber-500'   },
  danger:  { bg: 'bg-rose-50 text-rose-700 border border-rose-200',       dot: 'bg-rose-500'    },
  info:    { bg: 'bg-blue-50 text-blue-700 border border-blue-200',       dot: 'bg-blue-500'    },
  default: { bg: 'bg-slate-50 text-slate-600 border border-slate-200',    dot: 'bg-slate-400'   },
};

const statusVariantMap = {
  PENDING:  'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  SUKSES:   'success',
  GAGAL:    'danger',
};

const Badge = ({ variant, status, children }) => {
  const resolved = variant || statusVariantMap[status] || 'default';
  const label = children || status;
  const { bg, dot } = variantMap[resolved] || variantMap.default;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  );
};

export default Badge;
