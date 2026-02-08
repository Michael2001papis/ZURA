import React, { createContext, useContext, useEffect, useState } from "react";

const AUTH_KEY = "mp-projects-auth";
const VALID_USER = "zura";
const VALID_PASS = "Z123456";

/** משתמש עסקי – בעל העסק (ניווט מצומצם + עריכת תוכן) */
export const BUSINESS_USER = VALID_USER;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data && data.user) setUser(data.user);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = (username, password) => {
    if (username === VALID_USER && password === VALID_PASS) {
      setUser(username);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user: username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
