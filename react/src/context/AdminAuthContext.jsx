import { createContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken'));

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken') {
        setAdminToken(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  const isLoggedIn = !!adminToken;

  return (
    <AdminAuthContext.Provider value={{ adminToken, isLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
