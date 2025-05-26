import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);    

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', {
      email,
      password,
    });
    const data = res.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } else {
      throw new Error(data.msg || 'Login failed');
    }
  };

  // --- Add this function for registration ---
  const register = async (name, email, password) => {
    const res = await axios.post('/api/auth/register', {
      name,
      email,
      password,
    });
    const data = res.data;
    console.log(data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } else {
      throw new Error(data.msg || 'Login failed');
    }
    
    return data;
  };
  // ------------------------------------------

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};