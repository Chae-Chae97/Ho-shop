import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 새로고침 시 localStorage 토큰/유저 정보 복구
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
  setCurrentUser(updatedUser);
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};

  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
