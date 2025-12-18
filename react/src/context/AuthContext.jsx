import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user info in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Stored User:', JSON.parse(storedUser));  // Log the stored user
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log('Login called with user data:', userData);  // Log the user data when login is called
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};