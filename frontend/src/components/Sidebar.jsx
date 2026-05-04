import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Gift, MessageSquare, HeadphonesIcon,
  Users, Route, ShieldCheck, LogOut, ChevronLeft, ChevronRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const userNav = [
  { to: '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/user/perjalanan', icon: Route, label: 'Riwayat Perjalanan' },
  { to: '/user/reward', icon: Gift, label: 'Reward' },
  { to: '/user/feedback', icon: MessageSquare, label: 'Feedback' },
  { to: '/user/layanan', icon: HeadphonesIcon, label: 'Layanan' },
];

const adminNav = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/perjalanan', icon: Route, label: 'Kelola Perjalanan' },
  { to: '/admin/reward', icon: Gift, label: 'Kelola Reward' },
  { to: '/admin/feedback', icon: MessageSquare, label: 'Kelola Feedback' },
  { to: '/admin/layanan', icon: HeadphonesIcon, label: 'Kelola Layanan' },
];

const Sidebar = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : userNav;
  const currentUser = role === 'admin' ? admin : user;

  const handleLogout = () => {
    if (role === 'admin') { logoutAdmin(); navigate('/login/admin'); }
    else { logoutUser(); navigate('/login/user'); }
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shadow-sm`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="bg-primary-600 p-2 rounded-xl flex-shrink-0">
          <Zap size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-lg text-gray-800">Trans</span>
            <span className="font-bold text-lg text-primary-600">Poin</span>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-5 py-3">
          <div className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 ${role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
            {role === 'admin' ? <ShieldCheck size={12} /> : <Users size={12} />}
            {role === 'admin' ? 'Administrator' : 'Pengguna'}
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'} ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : ''}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-gray-100 p-3">
        {!collapsed && currentUser && (
          <div className="mb-2 px-2 py-2">
            <p className="text-xs font-semibold text-gray-800 truncate">{currentUser.nama}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`sidebar-link sidebar-link-inactive text-red-500 hover:bg-red-50 hover:text-red-600 w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Keluar</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link sidebar-link-inactive w-full justify-center mt-1"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs text-gray-400">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
