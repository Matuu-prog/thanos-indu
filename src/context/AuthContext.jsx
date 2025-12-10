import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 1. INICIALIZACIÓN: Leemos de localStorage con la NUEVA LLAVE
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedSession = localStorage.getItem('thanos_is_admin'); // <--- NUEVA LLAVE
    return savedSession === 'true'; // Si dice "true", arranca logueado
  });

  const login = () => {
    // 2. Al loguear, guardamos con la NUEVA LLAVE
    localStorage.setItem('thanos_is_admin', 'true'); // <--- NUEVA LLAVE
    setIsAdmin(true);
  };

  const logout = () => {
    // 3. Al salir, borramos la NUEVA LLAVE
    localStorage.removeItem('thanos_is_admin'); // <--- NUEVA LLAVE
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};