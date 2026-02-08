import React, { useState, useEffect } from "react";

const QUOTES_DRAFT_KEY = "mp-projects-quotes-draft";

function loadDraft() {
  try {
    const raw = localStorage.getItem(QUOTES_DRAFT_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.map((row, i) => ({ ...row, id: row.id || Date.now() + i }));
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

const emptyRow = () => ({ id: Date.now(), description: "", quantity: 1, unitPrice: "" });

export default function BusinessArea() {
  const [rows, setRows] = useState(() => loadDraft().length ? loadDraft() : [emptyRow()]);
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

  const totals = rows.map((row) => {
    const q = Number(row.quantity) || 0;
    const p = Number(row.unitPrice) || 0;
    return q * p;
  });
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
          <h3 className="quote-title">הצעת מחיר</h3>

          <div className="quote-meta">
            <label>
              שם הלקוח
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="שם הלקוח"
              />
            </label>
            <label>
              תאריך
              <input
                type="date"
                value={quoteDate}
                onChange={(e) => setQuoteDate(e.target.value)}
              />
            </label>
          </div>

          <div className="quote-table-wrap">
            <table className="quote-table">
              <thead>
                <tr>
                  <th>תיאור</th>
                  <th className="col-num">כמות</th>
                  <th className="col-num">מחיר ליחידה (₪)</th>
                  <th className="col-num">סה"כ (₪)</th>
                  <th className="col-action"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const q = Number(row.quantity) || 0;
                  const p = Number(row.unitPrice) || 0;
                  const total = q * p;
                  return (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => updateRow(row.id, "description", e.target.value)}
                          placeholder="תיאור הפריט"
                        />
                      </td>
                      <td className="col-num">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={row.quantity === "" ? "" : row.quantity}
                          onChange={(e) => updateRow(row.id, "quantity", e.target.value)}
                        />
                      </td>
                      <td className="col-num">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.unitPrice}
                          onChange={(e) => updateRow(row.id, "unitPrice", e.target.value)}
                          placeholder="0"
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
                  <td colSpan={3} className="grand-total-label">
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
