import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProjects, setProjects } from "../utils/siteContent";

const BUSINESS_USER = "zura";

export default function Projects() {
  const { user } = useAuth();
  const isBusiness = user === BUSINESS_USER;
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState(getProjects);

  useEffect(() => {
    setItems(getProjects());
  }, [editing]);

  const handleSave = () => {
    setProjects(items);
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
      { id: String(Date.now()), title: "פרויקט חדש", location: "" },
    ]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems((list) => list.filter((item) => item.id !== id));
  };

  const displayItems = editing ? items : getProjects();

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-header-row">
        <h2 id="projects-title" className="section-title">
          פרויקטים
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
                  + הוסף פרויקט
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
      <p className="section-subtitle">לפני ואחרי – דוגמאות מעבודות שבוצעו</p>
      <div className="projects-grid">
        {displayItems.map((item) => (
          <article key={item.id} className="project-card">
            <div className="project-placeholder">תמונה לפני / אחרי – יועלה בהמשך</div>
            <div className="project-info">
              {isBusiness && editing ? (
                <>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(item.id, "title", e.target.value)}
                    className="edit-input project-edit-title"
                    placeholder="כותרת"
                  />
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => updateItem(item.id, "location", e.target.value)}
                    className="edit-input"
                    placeholder="מיקום"
                  />
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeItem(item.id)}
                    aria-label="הסר פרויקט"
                  >
                    הסר
                  </button>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p>{item.location}</p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
