import React from 'react';

const StatCard = ({ icon: Icon, label, value, subtitle, accent = false }) => (
  <div className={`card flex items-center gap-4 ${accent ? 'bg-blue-600 border-blue-600' : ''}`}>
    <div className={`p-3 rounded-xl flex-shrink-0 ${accent ? 'bg-white/20' : 'bg-blue-50'}`}>
      <Icon size={20} className={accent ? 'text-white' : 'text-blue-600'} />
    </div>
    <div className="min-w-0">
      <p className={`text-xs font-medium truncate ${accent ? 'text-blue-100' : 'text-slate-500'}`}>{label}</p>
      <p className={`text-2xl font-bold leading-tight ${accent ? 'text-white' : 'text-slate-800'}`}>{value}</p>
      {subtitle && <p className={`text-xs mt-0.5 ${accent ? 'text-blue-200' : 'text-slate-400'}`}>{subtitle}</p>}
    </div>
  </div>
);

export default StatCard;
