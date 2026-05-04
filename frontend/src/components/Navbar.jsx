import React from 'react';
import { Bell, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ title, role }) => {
  const { user, admin } = useAuth();
  const currentUser = role === 'admin' ? admin : user;

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        {role === 'user' && user && (
          <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-xl">
            <Coins size={16} className="text-primary-600" />
            <span className="text-sm font-bold text-primary-600">{user.totalPoin} Poin</span>
          </div>
        )}
        <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
          <Bell size={18} className="text-gray-500" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
            {currentUser?.nama?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-none">{currentUser?.nama}</p>
            <p className="text-xs text-gray-400">{role === 'admin' ? 'Admin' : 'User'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
