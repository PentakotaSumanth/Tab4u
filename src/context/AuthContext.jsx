import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('tab4u_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('tab4u_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tab4u_user');
    localStorage.removeItem('tab4u_token');
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('tab4u_user', JSON.stringify(userData));
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('tab4u_user', JSON.stringify(updatedUser));
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    isAdmin,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
