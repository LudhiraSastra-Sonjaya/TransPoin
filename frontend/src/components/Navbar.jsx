import React from 'react';
import { Menu, Coins, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const avatarGradients = [
  'linear-gradient(135deg, #2563eb, #4f46e5)',
  'linear-gradient(135deg, #059669, #0891b2)',
  'linear-gradient(135deg, #7c3aed, #db2777)',
  'linear-gradient(135deg, #d97706, #dc2626)',
];

const getGradient = (name = '') => avatarGradients[name.charCodeAt(0) % avatarGradients.length];

const Navbar = ({ title, role, onMenuClick }) => {
  const { user, admin } = useAuth();
  const currentUser = role === 'admin' ? admin : user;
  const gradient = getGradient(currentUser?.nama);

  return (
    <header
      className="px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30"
      style={{
        background: 'rgba(240,244,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
        boxShadow: '0 1px 20px rgba(37,99,235,0.06)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-blue-600 transition-all duration-150"
          style={{ background: 'rgba(37,99,235,0.06)' }}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-slate-800 leading-none">{title}</h1>
          <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
            {role === 'admin' ? 'Panel Administrator TransPoin' : 'Selamat datang kembali!'}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Poin chip — user only */}
        {role === 'user' && user && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 cursor-default"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(79,70,229,0.1))', border: '1px solid rgba(37,99,235,0.2)' }}
          >
            <Coins size={15} className="text-blue-600 animate-pulse" style={{ animationDuration: '2s' }} />
            <span className="text-sm font-bold text-blue-700">{user.totalPoin ?? 0}</span>
            <span className="hidden sm:inline text-xs text-blue-500 font-medium">poin</span>
          </div>
        )}

        {/* Notification bell */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 transition-all duration-150"
          style={{ background: 'rgba(37,99,235,0.06)' }}
          title="Notifikasi"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-2 ring-white"
            style={{ background: gradient, boxShadow: '0 4px 12px rgba(37,99,235,0.35)' }}
          >
            {currentUser?.nama?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">{currentUser?.nama}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{role === 'admin' ? 'Admin' : 'Member'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
