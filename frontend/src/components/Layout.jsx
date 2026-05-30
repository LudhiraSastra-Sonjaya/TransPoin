import React, { useState } from 'react';
import Sidebar, { MobileSidebar } from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, title, role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f0f4ff' }}>
      {/* Desktop sidebar */}
      <Sidebar role={role} />

      {/* Mobile sidebar overlay */}
      <MobileSidebar role={role} open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar title={title} role={role} onMenuClick={() => setMobileOpen(true)} />
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in"
          style={{ background: 'radial-gradient(at 80% 0%, hsla(213,100%,97%,0.8) 0px, transparent 50%), radial-gradient(at 0% 80%, hsla(240,100%,97%,0.8) 0px, transparent 50%), #f0f4ff' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
