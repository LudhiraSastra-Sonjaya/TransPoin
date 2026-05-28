import React from 'react';
import { Menu, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ title, role, onMenuClick }) => {
  const { user, admin } = useAuth();
  const currentUser = role === 'admin' ? admin : user;

  return (
    <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Poin chip — user only */}
        {role === 'user' && user && (
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
            <Coins size={14} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-700">{user.totalPoin ?? 0}</span>
            <span className="hidden sm:inline text-xs text-blue-500 font-medium">poin</span>
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-blue flex-shrink-0">
            {currentUser?.nama?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">{currentUser?.nama}</p>
            <p className="text-xs text-slate-400 mt-0.5">{role === 'admin' ? 'Admin' : 'User'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
