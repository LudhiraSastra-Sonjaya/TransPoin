import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Gift, MessageSquare, HeadphonesIcon,
  Route, ShieldCheck, Users, LogOut, ChevronLeft,
  ChevronRight, MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoPutih from '../assets/Logo Putih.png';
import logoKotak from '../assets/Logo Kotak.png';

const userNav = [
  { to: '/user/dashboard',  icon: LayoutDashboard, label: 'Dashboard',  color: '#60a5fa' },
  { to: '/user/perjalanan', icon: Route,            label: 'Perjalanan', color: '#34d399' },
  { to: '/user/reward',     icon: Gift,             label: 'Reward',     color: '#a78bfa' },
  { to: '/user/feedback',   icon: MessageSquare,    label: 'Feedback',   color: '#fbbf24' },
  { to: '/user/layanan',    icon: HeadphonesIcon,   label: 'Layanan',    color: '#fb7185' },
];

const adminNav = [
  { to: '/admin/dashboard',  icon: LayoutDashboard, label: 'Dashboard',          color: '#60a5fa' },
  { to: '/admin/halte',      icon: MapPin,           label: 'Kelola Halte',       color: '#34d399' },
  { to: '/admin/perjalanan', icon: Route,            label: 'Kelola Perjalanan',  color: '#fbbf24' },
  { to: '/admin/reward',     icon: Gift,             label: 'Kelola Reward',      color: '#a78bfa' },
  { to: '/admin/feedback',   icon: MessageSquare,    label: 'Kelola Feedback',    color: '#fb7185' },
  { to: '/admin/layanan',    icon: HeadphonesIcon,   label: 'Kelola Layanan',     color: '#38bdf8' },
];

/* ── Mobile overlay sidebar ── */
export const MobileSidebar = ({ role, open, onClose }) => {
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : userNav;
  const currentUser = role === 'admin' ? admin : user;

  const handleLogout = () => {
    if (role === 'admin') { logoutAdmin(); navigate('/login'); }
    else { logoutUser(); navigate('/login'); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="absolute inset-0 animate-fade-in" style={{ background: 'rgba(6,11,20,0.75)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <aside className="relative w-72 flex flex-col h-full animate-fade-in-up sidebar-bg" style={{ boxShadow: '4px 0 40px rgba(0,0,0,0.4)' }}>
        <SidebarContent navItems={navItems} currentUser={currentUser} role={role} collapsed={false} handleLogout={handleLogout} onNavClick={onClose} />
      </aside>
    </div>
  );
};

/* ── Desktop sidebar ── */
const Sidebar = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const navItems   = role === 'admin' ? adminNav : userNav;
  const currentUser = role === 'admin' ? admin : user;

  const handleLogout = () => {
    if (role === 'admin') { logoutAdmin(); navigate('/login'); }
    else { logoutUser(); navigate('/login'); }
  };

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 sidebar-bg transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-64'}`}
      style={{ boxShadow: '2px 0 30px rgba(0,0,0,0.3)' }}
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
    <div
      className={`flex items-center px-4 py-5 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {collapsed ? (
        <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-white/10 flex-shrink-0">
          <img src={logoKotak} alt="TransPoin" className="w-full h-full object-cover" />
        </div>
      ) : (
        <img src={logoPutih} alt="TransPoin" className="h-7 w-auto object-contain" />
      )}
    </div>

    {/* Role pill */}
    {!collapsed && (
      <div className="px-4 pt-4 pb-1 flex-shrink-0">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(37,99,235,0.2)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.25)' }}>
          {role === 'admin' ? <ShieldCheck size={11} /> : <Users size={11} />}
          {role === 'admin' ? 'Administrator' : 'Pengguna'}
        </span>
      </div>
    )}

    {/* Nav */}
    <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto sidebar-scroll">
      {navItems.map(({ to, icon: Icon, label, color }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavClick}
          title={collapsed ? label : undefined}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'} ${collapsed ? 'justify-center px-0' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={18}
                className="flex-shrink-0 transition-transform duration-200"
                style={{ color: isActive ? '#fff' : color, transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
              />
              {!collapsed && <span>{label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Divider */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

    {/* Footer */}
    <div className="p-3 space-y-1 flex-shrink-0">
      {/* User info */}
      {!collapsed && currentUser && (
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
          >
            {currentUser?.nama?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{currentUser.nama}</p>
            <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{currentUser.email}</p>
          </div>
        </div>
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`sidebar-link sidebar-link-inactive w-full transition-all duration-200 ${collapsed ? 'justify-center px-0' : ''}`}
        style={{ color: '#f87171' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <LogOut size={17} />
        {!collapsed && <span>Keluar</span>}
      </button>

      {/* Collapse toggle */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="sidebar-link sidebar-link-inactive w-full justify-center px-0 mt-0.5"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      )}
    </div>
  </>
);

export default Sidebar;
