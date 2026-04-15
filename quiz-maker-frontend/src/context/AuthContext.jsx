import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('quizUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = (name, email, password) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('quizUsers', JSON.stringify(users));
    // Auto login after register
    const { password: _, ...userWithoutPass } = newUser;
    localStorage.setItem('quizUser', JSON.stringify(userWithoutPass));
    setUser(userWithoutPass);
    return userWithoutPass;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    const { password: _, ...userWithoutPass } = found;
    localStorage.setItem('quizUser', JSON.stringify(userWithoutPass));
    setUser(userWithoutPass);
    return userWithoutPass;
  };

  const logout = () => {
    localStorage.removeItem('quizUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);