import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// color → gradient + shadow + bg map
const colorMap = {
  blue:    { icon: 'stat-icon-blue',    shadow: 'shadow-blue',    glow: 'rgba(37,99,235,0.15)',    ring: 'ring-blue-100'   },
  emerald: { icon: 'stat-icon-emerald', shadow: 'shadow-emerald', glow: 'rgba(5,150,105,0.15)',    ring: 'ring-emerald-100'},
  violet:  { icon: 'stat-icon-violet',  shadow: 'shadow-violet',  glow: 'rgba(124,58,237,0.15)',   ring: 'ring-violet-100' },
  amber:   { icon: 'stat-icon-amber',   shadow: 'shadow-amber',   glow: 'rgba(217,119,6,0.15)',    ring: 'ring-amber-100'  },
  rose:    { icon: 'stat-icon-rose',    shadow: 'shadow-rose',    glow: 'rgba(225,29,72,0.15)',    ring: 'ring-rose-100'   },
};

const StatCard = ({ icon: Icon, label, value, subtitle, accent = false, color = 'blue', trend }) => {
  const cm = colorMap[color] || colorMap.blue;

  if (accent) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl p-5 text-white flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg,#1d4ed8,#4f46e5)', boxShadow: '0 8px 30px rgba(37,99,235,0.4)' }}
      >
        {/* glow orb */}
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="absolute right-4 bottom-0 w-12 h-12 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

        <div className="p-3 rounded-xl flex-shrink-0 relative z-10" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="min-w-0 relative z-10">
          <p className="text-xs font-medium text-blue-100 truncate">{label}</p>
          <p className="text-2xl font-bold leading-tight text-white animate-count-up">{value}</p>
          {subtitle && <p className="text-xs text-blue-200 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4
                 transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.05)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 30px ${cm.glow}`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.05)'}
    >
      <div className={`p-3 rounded-xl flex-shrink-0 ${cm.icon} transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold leading-tight text-slate-800">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {trend !== undefined && (
        <div className={`flex-shrink-0 flex items-center gap-0.5 text-xs font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

export default StatCard;
