import React, { useState, useEffect, useRef } from "react";
import { getContactDraft, setContactDraft } from "../utils/userMemory";

const EMAIL = "zurapapismedov@gmail.com";
const VISIT_COUNT_KEY = "mp-projects-visits";
const OVERLAY_CLOSED_KEY = "mp-projects-overlay-closed";

function getVisitCount() {
  return parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
}

function setVisitCount(n) {
  localStorage.setItem(VISIT_COUNT_KEY, String(n));
}

function shouldShowOverlay() {
  const count = getVisitCount();
  if (count <= 1) return false;
  if (count === 2) return true;
  return (count - 2) % 10 === 0;
}

export default function ContactOverlay({ open, onClose }) {
  const draft = getContactDraft();
  const [name, setName] = useState(draft.name);
  const [phone, setPhone] = useState(draft.phone);
  const [message, setMessage] = useState("");
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const d = getContactDraft();
    setName(d.name);
    setPhone(d.phone);
  }, [open]);

  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setContactDraft({ name, phone, email: getContactDraft().email });
    }, 500);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [name, phone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `שם: ${name}\nטלפון: ${phone}\n\nהודעה:\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=פנייה מאתר מ.פ. פרויקטים (חלונית)&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div
      className={`contact-overlay ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="contact-form">
        <button
          type="button"
          className="contact-overlay-close"
          aria-label="סגור"
          onClick={onClose}
        >
          ×
        </button>
        <h3 style={{ marginTop: 0 }}>רוצים הצעת מחיר? השאירו פרטים</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="overlay-name">שם</label>
          <input
            type="text"
            id="overlay-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="overlay-phone">טלפון</label>
          <input
            type="tel"
            id="overlay-phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="overlay-message">הודעה קצרה</label>
          <textarea
            id="overlay-message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            שליחה
          </button>
        </form>
      </div>
    </div>
  );
}

export { getVisitCount, setVisitCount, shouldShowOverlay, OVERLAY_CLOSED_KEY };
