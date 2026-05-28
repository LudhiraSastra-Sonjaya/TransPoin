import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // currentUser menyimpan data login (bisa role USER atau ADMIN)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('transpoin_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Backward compat: user dan admin diturunkan dari currentUser
  const user  = currentUser?.role === 'USER'  ? currentUser : null;
  const admin = currentUser?.role === 'ADMIN' ? currentUser : null;

  const loginUser = (userData) => {
    const data = { ...userData, role: 'USER' };
    setCurrentUser(data);
    localStorage.setItem('transpoin_current_user', JSON.stringify(data));
  };

  const loginAdmin = (adminData) => {
    const data = { ...adminData, role: 'ADMIN' };
    setCurrentUser(data);
    localStorage.setItem('transpoin_current_user', JSON.stringify(data));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('transpoin_current_user');
    // Hapus key lama untuk keamanan
    localStorage.removeItem('transpoin_user');
    localStorage.removeItem('transpoin_admin');
  };

  const logoutAdmin = logoutUser; // Alias, keduanya logout dari currentUser

  const updateUserPoin = (newPoin) => {
    if (currentUser) {
      const updated = { ...currentUser, totalPoin: newPoin };
      setCurrentUser(updated);
      localStorage.setItem('transpoin_current_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      user, admin,
      loginUser, loginAdmin,
      logoutUser, logoutAdmin,
      updateUserPoin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
