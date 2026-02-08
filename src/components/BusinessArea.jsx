import React, { useState, useEffect } from "react";

const QUOTES_DRAFT_KEY = "mp-projects-quotes-draft";

const WORK_TYPES = ["גבס", "צבע", "שפכטל", "אחר"];
const UNITS = ["מ\"ר", "י\"ח", "מ\"א", "מ\"ק", "ריצוף", "אחר"];
const WORK_PERCENT_OPTIONS = [50, 60, 70, 80, 90, 100];

function loadDraft() {
  try {
    const raw = localStorage.getItem(QUOTES_DRAFT_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.map((row, i) => ({
      id: row.id || Date.now() + i,
      workType: row.workType ?? "גבס",
      workTypeOther: row.workTypeOther ?? "",
      description: row.description ?? "",
      unit: row.unit ?? "מ\"ר",
      quantity: row.quantity ?? 1,
      workPercent: row.workPercent ?? 100,
      unitPrice: row.unitPrice ?? "",
      discount: row.discount ?? "",
    }));
  } catch {
    return [];
  }
}

function saveDraft(rows) {
  try {
    localStorage.setItem(QUOTES_DRAFT_KEY, JSON.stringify(rows));
  } catch {
    // ignore
  }
}

function emptyRow() {
  return {
    id: Date.now(),
    workType: "גבס",
    workTypeOther: "",
    description: "",
    unit: "מ\"ר",
    quantity: 1,
    workPercent: 100,
    unitPrice: "",
    discount: "",
  };
}

function calcRowTotal(row) {
  const q = Number(row.quantity) || 0;
  const p = Number(row.unitPrice) || 0;
  const pct = Number(row.workPercent) || 100;
  const disc = Number(row.discount) || 0;
  const base = q * p * (pct / 100);
  if (disc <= 0) return base;
  return base * (1 - disc / 100);
}

export default function BusinessArea() {
  const [rows, setRows] = useState(() => {
    const draft = loadDraft();
    if (draft.length) return draft;
    return [emptyRow()];
  });
  const [clientName, setClientName] = useState("");
  const [quoteDate, setQuoteDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    saveDraft(rows);
  }, [rows]);

  const addRow = () => setRows((r) => [...r, emptyRow()]);

  const updateRow = (id, field, value) => {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const removeRow = (id) => {
    setRows((r) => (r.length <= 1 ? [emptyRow()] : r.filter((row) => row.id !== id)));
  };

  const totals = rows.map(calcRowTotal);
  const grandTotal = totals.reduce((a, b) => a + b, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="business-area" className="business-area" aria-labelledby="business-title">
      <div className="business-area-inner">
        <h2 id="business-title" className="section-title">
          אזור עסקי
        </h2>
        <p className="section-subtitle">
          רק בעל העסק רואה אזור זה. כאן ניתן להכין הצעות מחיר.
        </p>

        <div className="quote-card">
          <div className="quote-confidential print-only" aria-hidden="true">
            //סודי// — מסמך פנימי, באישור מנהל העסק
          </div>

          <h3 className="quote-title">הצעת מחיר</h3>

          <div className="quote-meta">
            <label htmlFor="quote-client-name">
              שם הלקוח
              <input
                id="quote-client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="שם הלקוח"
                aria-label="שם הלקוח"
              />
            </label>
            <label htmlFor="quote-date">
              תאריך
              <input
                id="quote-date"
                type="date"
                value={quoteDate}
                onChange={(e) => setQuoteDate(e.target.value)}
                aria-label="תאריך ההצעה"
              />
            </label>
          </div>

          <div className="quote-table-wrap">
            <table className="quote-table" role="table">
              <colgroup>
                <col className="col-work-type" />
                <col className="col-description" />
                <col className="col-unit" />
                <col className="col-num" />
                <col className="col-num" />
                <col className="col-num" />
                <col className="col-num" />
                <col className="col-num" />
                <col className="col-action" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="col-work-type">סוג עבודה</th>
                  <th scope="col" className="col-description">תיאור</th>
                  <th scope="col" className="col-unit">יחידה</th>
                  <th scope="col" className="col-num">כמות</th>
                  <th scope="col" className="col-num">אחוז עבודה</th>
                  <th scope="col" className="col-num">מחיר ליחידה (₪)</th>
                  <th scope="col" className="col-num">הנחה %</th>
                  <th scope="col" className="col-num">סה"כ (₪)</th>
                  <th scope="col" className="col-action" aria-label="מחיקה"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const total = calcRowTotal(row);
                  return (
                    <tr key={row.id}>
                      <td className="col-work-type">
                        <select
                          value={row.workType}
                          onChange={(e) => updateRow(row.id, "workType", e.target.value)}
                          aria-label="סוג עבודה"
                        >
                          {WORK_TYPES.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {row.workType === "אחר" && (
                          <input
                            type="text"
                            className="work-type-other"
                            value={row.workTypeOther}
                            onChange={(e) => updateRow(row.id, "workTypeOther", e.target.value)}
                            placeholder="פרט"
                          />
                        )}
                      </td>
                      <td className="col-description">
                        <textarea
                          value={row.description}
                          onChange={(e) => updateRow(row.id, "description", e.target.value.slice(0, 50))}
                          placeholder="תיאור הפריט (עד 50 אותיות)"
                          maxLength={50}
                          rows={2}
                          aria-label="תיאור (עד 50 אותיות)"
                        />
                        <span className="desc-char-count" aria-hidden="true">
                          {(row.description || "").length}/50
                        </span>
                      </td>
                      <td className="col-unit">
                        <select
                          value={row.unit}
                          onChange={(e) => updateRow(row.id, "unit", e.target.value)}
                          aria-label="יחידת מידה"
                        >
                          {UNITS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="col-num">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={row.quantity === "" ? "" : row.quantity}
                          onChange={(e) => updateRow(row.id, "quantity", e.target.value)}
                          aria-label="כמות"
                        />
                      </td>
                      <td className="col-num">
                        <select
                          value={row.workPercent}
                          onChange={(e) => updateRow(row.id, "workPercent", e.target.value)}
                          aria-label="אחוז עבודה"
                        >
                          {WORK_PERCENT_OPTIONS.map((n) => (
                            <option key={n} value={n}>{n}%</option>
                          ))}
                        </select>
                      </td>
                      <td className="col-num">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.unitPrice}
                          onChange={(e) => updateRow(row.id, "unitPrice", e.target.value)}
                          placeholder="0"
                          aria-label="מחיר ליחידה"
                        />
                      </td>
                      <td className="col-num">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={row.discount}
                          onChange={(e) => updateRow(row.id, "discount", e.target.value)}
                          placeholder="0"
                          aria-label="הנחה באחוזים"
                        />
                      </td>
                      <td className="col-num total-cell">{total.toFixed(2)}</td>
                      <td className="col-action">
                        <button
                          type="button"
                          className="btn-remove-row"
                          onClick={() => removeRow(row.id)}
                          aria-label="הסר שורה"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7} className="grand-total-label">
                    סה"כ לתשלום
                  </td>
                  <td className="col-num grand-total-value" scope="row">
                    ₪{grandTotal.toFixed(2)}
                  </td>
                  <td className="col-action"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="quote-actions">
            <button type="button" className="btn btn-secondary" onClick={addRow}>
              + הוסף שורה
            </button>
            <button type="button" className="btn btn-primary" onClick={handlePrint}>
              הדפס הצעה
            </button>
          </div>
        </div>

        <p className="business-hint">הטיוטה נשמרת אוטומטית בדפדפן.</p>
      </div>
    </section>
  );
}
