import React, { useState, useEffect, useRef } from "react";
import { getContactDraft, setContactDraft } from "../utils/userMemory";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, WHATSAPP_URL } from "../utils/constants";

function buildMailto(body) {
  return `mailto:${CONTACT_EMAIL}?subject=פנייה מאתר מ.פ. פרויקטים&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const draft = getContactDraft();
  const [name, setName] = useState(draft.name);
  const [phone, setPhone] = useState(draft.phone);
  const [email, setEmail] = useState(draft.email);
  const [message, setMessage] = useState("");
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setContactDraft({ name, phone, email });
    }, 500);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [name, phone, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto(`שם: ${name}\nטלפון: ${phone}\n\nהודעה:\n${message}`);
  };

  const hasStored = draft.name || draft.phone || draft.email;

  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">
        צור קשר
      </h2>
      <p className="section-subtitle">להצעת מחיר או תיאום פגישה – נשמח לשמוע מכם</p>
      {hasStored && (
        <p className="contact-welcome-back" aria-live="polite">
          שלום שוב! מילאנו עבורך את הפרטים מהביקור הקודם.
        </p>
      )}
      <div className="contact-wrap">
        <div className="contact-details">
          <h3>פרטי התקשרות</h3>
          <ul className="contact-list">
            <li>
              <strong>שם:</strong> זורה פפיסמדוב
            </li>
            <li>
              <strong>טלפון:</strong>{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a>
            </li>
            <li>
              <strong>וואטסאפ:</strong>{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <strong>אימייל:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <strong>כתובת:</strong> גולדברג הנדבן 14, ראשון לציון
            </li>
          </ul>
          <h3 style={{ marginTop: "1.5rem" }}>שעות פעילות</h3>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>
            ימים א׳–ה׳: 07:00–18:00 | יום ו׳: 07:00–13:30 | שבת: אין פעילות
          </p>
        </div>
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">שם מלא *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="השם שלך"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phone">טלפון *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="050-0000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="message">הודעה *</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="ספרו בקצרה על הפרויקט או השאירו פרטים ליצירת קשר"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              שליחת פנייה
            </button>
          </form>
          <p className="contact-saved-hint">הפרטים נשמרים אוטומטית להבא.</p>
        </div>
      </div>
    </section>
  );
}
