import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, title, role }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} role={role} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
