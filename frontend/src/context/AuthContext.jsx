import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will hold { id, name, email, role }
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Re-hydrate state from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      // Matches the POST /api/auth/login endpoint on Node backend
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data && res.data.success) {
        const { token, user } = res.data;
        
        // Save to LocalStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Save to State
        setToken(token);
        setUser(user);

        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data && res.data.success) {
        const { token, user } = res.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setToken(token);
        setUser(user);
        
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isStudent = user?.role === 'student';
  const isOrganizer = user?.role === 'organizer';
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      user, 
      token, 
      loading, 
      isAuthenticated,
      isStudent,
      isOrganizer,
      isAdmin,
      login, 
      register, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};