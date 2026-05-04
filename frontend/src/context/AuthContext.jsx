import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('transpoin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('transpoin_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('transpoin_user', JSON.stringify(userData));
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('transpoin_admin', JSON.stringify(adminData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('transpoin_user');
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('transpoin_admin');
  };

  const updateUserPoin = (newPoin) => {
    if (user) {
      const updated = { ...user, totalPoin: newPoin };
      setUser(updated);
      localStorage.setItem('transpoin_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{
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
