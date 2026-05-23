import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Gift, MessageSquare, HeadphonesIcon,
  Route, ShieldCheck, Users, LogOut, ChevronLeft,
  ChevronRight, MapPin, Zap, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const userNav = [
  { to: '/user/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/user/perjalanan', icon: Route,            label: 'Perjalanan' },
  { to: '/user/reward',     icon: Gift,             label: 'Reward' },
  { to: '/user/feedback',   icon: MessageSquare,    label: 'Feedback' },
  { to: '/user/layanan',    icon: HeadphonesIcon,   label: 'Layanan' },
];

const adminNav = [
  { to: '/admin/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/halte',      icon: MapPin,           label: 'Kelola Halte' },
  { to: '/admin/perjalanan', icon: Route,            label: 'Kelola Perjalanan' },
  { to: '/admin/reward',     icon: Gift,             label: 'Kelola Reward' },
  { to: '/admin/feedback',   icon: MessageSquare,    label: 'Kelola Feedback' },
  { to: '/admin/layanan',    icon: HeadphonesIcon,   label: 'Kelola Layanan' },
];

/* ── Mobile overlay sidebar ── */
export const MobileSidebar = ({ role, open, onClose }) => {
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : userNav;
  const currentUser = role === 'admin' ? admin : user;

  const handleLogout = () => {
    if (role === 'admin') { logoutAdmin(); navigate('/login/admin'); }
    else { logoutUser(); navigate('/login/user'); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      {/* Drawer */}
      <aside className="relative w-72 bg-navy flex flex-col h-full animate-fade-in-up shadow-modal">
        <SidebarContent
          navItems={navItems}
          currentUser={currentUser}
          role={role}
          collapsed={false}
          handleLogout={handleLogout}
          onNavClick={onClose}
        />
      </aside>
    </div>
  );
};

/* ── Desktop sidebar ── */
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
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 bg-navy transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}
    >
      <SidebarContent
        navItems={navItems}
        currentUser={currentUser}
        role={role}
        collapsed={collapsed}
        handleLogout={handleLogout}
        onToggle={() => setCollapsed(!collapsed)}
      />
    </aside>
  );
};

/* ── Shared sidebar content ── */
const SidebarContent = ({ navItems, currentUser, role, collapsed, handleLogout, onToggle, onNavClick }) => (
  <>
    {/* Logo */}
    <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-blue">
        <Zap size={18} className="text-white" />
      </div>
      {!collapsed && (
        <span className="text-white font-bold text-lg tracking-tight">
          Trans<span className="text-blue-400">Poin</span>
        </span>
      )}
    </div>

    {/* Role pill */}
    {!collapsed && (
      <div className="px-4 pt-4 pb-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 bg-blue-600/20 px-3 py-1 rounded-full">
          {role === 'admin' ? <ShieldCheck size={11} /> : <Users size={11} />}
          {role === 'admin' ? 'Administrator' : 'Pengguna'}
        </span>
      </div>
    )}

    {/* Nav */}
    <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavClick}
          title={collapsed ? label : undefined}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'} ${collapsed ? 'justify-center px-0' : ''}`
          }
        >
          <Icon size={17} className="flex-shrink-0" />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>

    {/* Footer */}
    <div className="border-t border-white/10 p-3 space-y-1">
      {!collapsed && currentUser && (
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {currentUser?.nama?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{currentUser.nama}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className={`sidebar-link sidebar-link-inactive text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <LogOut size={17} />
        {!collapsed && <span>Keluar</span>}
      </button>
      {onToggle && (
        <button
          onClick={onToggle}
          className="sidebar-link sidebar-link-inactive w-full justify-center px-0 mt-0.5"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      )}
    </div>
  </>
);

export default Sidebar;
