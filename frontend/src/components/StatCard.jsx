import React from 'react';

const StatCard = ({ icon: Icon, label, value, color = 'blue', subtitle }) => {
  const colors = {
    blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-600',   val: 'text-blue-700' },
    green:  { bg: 'bg-green-50',  icon: 'bg-green-100 text-green-600',  val: 'text-green-700' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', val: 'text-purple-700' },
    orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-600', val: 'text-orange-700' },
    rose:   { bg: 'bg-rose-50',   icon: 'bg-rose-100 text-rose-600',     val: 'text-rose-700' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={`card ${c.bg} border-0 animate-fade-in-up`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${c.val}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${c.icon}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
