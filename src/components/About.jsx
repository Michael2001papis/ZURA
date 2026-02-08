import React, { useState, useEffect } from "react";
import { useAuth, BUSINESS_USER } from "../context/AuthContext";
import { getAbout, setAbout } from "../utils/siteContent";

export default function About() {
  const { user } = useAuth();
  const isBusiness = user === BUSINESS_USER;
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(getAbout);

  useEffect(() => {
    setData(getAbout());
  }, [editing]);

  const handleSave = () => {
    setAbout(data);
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const handleListChange = (index, value) => {
    setData((d) => {
      const list = [...(d.listItems || [])];
      list[index] = value;
      return { ...d, listItems: list };
    });
  };

  const content = editing ? data : getAbout();

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="section-header-row">
        <h2 id="about-title" className="section-title">
          אודות
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
              </>
            ) : (
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                עריכה
              </button>
            )}
          </div>
        )}
      </div>
      <p className="section-subtitle">מי אנחנו ואיך אנחנו עובדים</p>
      <div className="about-content">
        <div className="about-text">
          {isBusiness && editing ? (
            <>
              <label className="edit-label">פסקה ראשונה</label>
              <textarea
                value={content.intro1}
                onChange={(e) => handleChange("intro1", e.target.value)}
                rows={3}
                className="edit-textarea"
              />
              <label className="edit-label">פסקה שנייה</label>
              <textarea
                value={content.intro2}
                onChange={(e) => handleChange("intro2", e.target.value)}
                rows={3}
                className="edit-textarea"
              />
              <label className="edit-label">נקודות (שורה לכל נקודה)</label>
              {(content.listItems || []).map((item, i) => (
                <input
                  key={i}
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange(i, e.target.value)}
                  className="edit-input"
                  placeholder={`נקודה ${i + 1}`}
                />
              ))}
            </>
          ) : (
            <>
              <p>{content.intro1}</p>
              <p>{content.intro2}</p>
              <ul className="about-list">
                {(content.listItems || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="about-visual">
          {isBusiness && editing ? (
            <>
              <h3>שעות פעילות</h3>
              <textarea
                value={content.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                rows={4}
                className="edit-textarea"
                placeholder="שורה לכל שורה"
              />
              <h3 className="about-visual-h3-secondary">כתובת</h3>
              <input
                type="text"
                value={content.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="edit-input"
              />
            </>
          ) : (
            <>
              <h3>שעות פעילות</h3>
              <p className="about-hours-pre">{content.hours}</p>
              <h3 className="about-visual-h3-secondary">כתובת</h3>
              <p>{content.address}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
