import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getServices, setServices } from "../utils/siteContent";

const BUSINESS_USER = "zura";

export default function Services() {
  const { user } = useAuth();
  const isBusiness = user === BUSINESS_USER;
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState(getServices);

  useEffect(() => {
    setItems(getServices());
  }, [editing]);

  const handleSave = () => {
    setServices(items);
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
      { id: String(Date.now()), title: "שירות חדש", text: "" },
    ]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems((list) => list.filter((item) => item.id !== id));
  };

  const displayItems = editing ? items : getServices();

  return (
    <section id="services" aria-labelledby="services-title">
      <div className="section-header-row">
        <h2 id="services-title" className="section-title">
          שירותים
        </h2>
        {isBusiness && (
          <div className="section-actions">
            {editing ? (
              <>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>
                  שמור
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                  ביטול
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>
                  + הוסף שירות
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                עריכה
              </button>
            )}
          </div>
        )}
      </div>
      <p className="section-subtitle">מגוון שירותי שיפוץ ובנייה תחת קורת גג אחת</p>
      <div className="services-grid">
        {displayItems.map((item) => (
          <div key={item.id} className="service-card">
            {isBusiness && editing ? (
              <>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  className="edit-input service-edit-title"
                  placeholder="כותרת"
                />
                <textarea
                  value={item.text}
                  onChange={(e) => updateItem(item.id, "text", e.target.value)}
                  rows={2}
                  className="edit-textarea"
                  placeholder="תיאור"
                />
                <button
                  type="button"
                  className="btn-remove-item"
                  onClick={() => removeItem(item.id)}
                  aria-label="הסר שירות"
                >
                  הסר
                </button>
              </>
            ) : (
              <>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
