import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (login(username, password)) {
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError("פרטי ההתחברות שגויים");
    }
  };

  if (!open) return null;

  return (
    <div
      className="login-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="login-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="login-modal">
        <button
          type="button"
          className="login-modal-close"
          aria-label="סגור"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="login-title" className="login-title">
          כניסת משתמש
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="login-username">שם משתמש</label>
          <input
            type="text"
            id="login-username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="שם משתמש"
          />
          <label htmlFor="login-password">סיסמה</label>
          <input
            type="password"
            id="login-password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary">
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}
