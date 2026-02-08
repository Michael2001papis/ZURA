import React, { useState, useEffect } from "react";
import { useAuth, BUSINESS_USER } from "../context/AuthContext";
import { getTestimonials, setTestimonials } from "../utils/siteContent";

export default function Testimonials() {
  const { user } = useAuth();
  const isBusiness = user === BUSINESS_USER;
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState(getTestimonials);

  useEffect(() => {
    setItems(getTestimonials());
  }, [editing]);

  const handleSave = () => {
    setTestimonials(items);
    setEditing(false);
  };

  const updateItem = (id, field, value) => {
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems((list) => [
      ...list,
      { id: String(Date.now()), name: "שם הלקוח", text: "תוכן ההמלצה..." },
    ]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems((list) => list.filter((item) => item.id !== id));
  };

  const displayItems = editing ? items : getTestimonials();

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className="section-title">
        המלצות
      </h2>
      <p className="section-subtitle">מ־לקוחות מרוצים</p>
      <div className="testimonials-inner">
        {isBusiness && (
          <div className="section-actions testimonials-actions">
            {editing ? (
              <>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>
                  שמור
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                  ביטול
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>
                  + הוסף המלצה
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                עריכת המלצות
              </button>
            )}
          </div>
        )}
        {displayItems.length > 0 ? (
          <div className="testimonials-grid">
            {displayItems.map((item) => (
              <blockquote key={item.id} className="testimonial-card">
                {isBusiness && editing ? (
                  <>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      className="edit-input testimonial-edit-name"
                      placeholder="שם (למשל: דוד ל.)"
                    />
                    <textarea
                      value={item.text}
                      onChange={(e) => updateItem(item.id, "text", e.target.value)}
                      rows={3}
                      className="edit-textarea"
                      placeholder="תוכן ההמלצה"
                    />
                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeItem(item.id)}
                      aria-label="הסר המלצה"
                    >
                      הסר
                    </button>
                  </>
                ) : (
                  <>
                    <p className="testimonial-text">«{item.text}»</p>
                    <cite className="testimonial-cite">— {item.name}</cite>
                  </>
                )}
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="testimonials-placeholder">
            <p>המלצות לקוחות יתווספו כאן לאחר איסוף החומר.</p>
            <p>לאחר סיום עבודה – ניתן לבקש המלצה.</p>
          </div>
        )}
      </div>
    </section>
  );
}
