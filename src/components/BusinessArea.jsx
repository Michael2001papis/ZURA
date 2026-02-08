import React, { useState, useEffect } from "react";

const QUOTES_DRAFT_KEY = "mp-projects-quotes-draft";
const QUOTES_DRAFT_META_KEY = "mp-projects-quotes-draft-meta";
const QUOTES_SAVED_KEY = "mp-projects-quotes-saved";

const WORK_TYPES = ["גבס", "צבע", "שפכטל", "אחר"];
const UNITS = ["מ\"ר", "י\"ח", "מ\"א", "מ\"ק", "ריצוף", "אחר"];
const WORK_PERCENT_OPTIONS = [50, 60, 70, 80, 90, 100];

function normalizeRows(data) {
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
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(QUOTES_DRAFT_KEY);
    if (!raw) return [];
    return normalizeRows(JSON.parse(raw));
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

function loadDraftMeta() {
  try {
    const raw = localStorage.getItem(QUOTES_DRAFT_META_KEY);
    if (!raw) return { clientName: "", quoteDate: new Date().toISOString().slice(0, 10) };
    const d = JSON.parse(raw);
    return {
      clientName: d.clientName ?? "",
      quoteDate: d.quoteDate ?? new Date().toISOString().slice(0, 10),
    };
  } catch {
    return { clientName: "", quoteDate: new Date().toISOString().slice(0, 10) };
  }
}

function saveDraftMeta(meta) {
  try {
    localStorage.setItem(QUOTES_DRAFT_META_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

function getSavedQuotes() {
  try {
    const raw = localStorage.getItem(QUOTES_SAVED_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function setSavedQuotes(list) {
  try {
    localStorage.setItem(QUOTES_SAVED_KEY, JSON.stringify(list));
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
  const meta = loadDraftMeta();
  const [rows, setRows] = useState(() => {
    const draft = loadDraft();
    if (draft.length) return draft;
    return [emptyRow()];
  });
  const [clientName, setClientName] = useState(meta.clientName);
  const [quoteDate, setQuoteDate] = useState(meta.quoteDate);
  const [savedQuotes, setSavedQuotesState] = useState(getSavedQuotes);
  const [selectedQuoteId, setSelectedQuoteId] = useState("");

  useEffect(() => {
    saveDraft(rows);
  }, [rows]);

  useEffect(() => {
    saveDraftMeta({ clientName, quoteDate });
  }, [clientName, quoteDate]);

  const loadQuote = (quote) => {
    if (!quote) return;
    const nextRows = normalizeRows(quote.rows).length ? normalizeRows(quote.rows) : [emptyRow()];
    const nextClient = quote.clientName || "";
    const nextDate = quote.quoteDate || new Date().toISOString().slice(0, 10);
    setRows(nextRows);
    setClientName(nextClient);
    setQuoteDate(nextDate);
    saveDraft(nextRows);
    saveDraftMeta({ clientName: nextClient, quoteDate: nextDate });
  };

  const handleSelectSavedQuote = (e) => {
    const id = e.target.value;
    setSelectedQuoteId(id);
    if (!id) return;
    const list = getSavedQuotes();
    const q = list.find((x) => String(x.id) === String(id));
    if (q) loadQuote(q);
  };

  const handleSaveCurrentQuote = () => {
    const list = getSavedQuotes();
    const newQuote = {
      id: String(Date.now()),
      clientName,
      quoteDate,
      rows: [...rows],
      createdAt: new Date().toISOString(),
    };
    setSavedQuotes([...list, newQuote]);
    setSavedQuotesState([...list, newQuote]);
    setSelectedQuoteId(newQuote.id);
  };

  const handleNewQuote = () => {
    setSelectedQuoteId("");
    setRows([emptyRow()]);
    setClientName("");
    setQuoteDate(new Date().toISOString().slice(0, 10));
    saveDraft([emptyRow()]);
    saveDraftMeta({ clientName: "", quoteDate: new Date().toISOString().slice(0, 10) });
  };

  const handleDeleteSavedQuote = () => {
    if (!selectedQuoteId) return;
    const list = getSavedQuotes().filter((q) => String(q.id) !== String(selectedQuoteId));
    setSavedQuotes(list);
    setSavedQuotesState(list);
    setSelectedQuoteId("");
    setRows([emptyRow()]);
    setClientName("");
    setQuoteDate(new Date().toISOString().slice(0, 10));
    saveDraft([emptyRow()]);
  };

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

        <div className="quote-selector-bar">
          <label htmlFor="quote-select-saved" className="quote-selector-label">
            הצעות שמורות:
          </label>
          <select
            id="quote-select-saved"
            value={selectedQuoteId}
            onChange={handleSelectSavedQuote}
            className="quote-select-select"
            aria-label="בחר הצעה שמורה"
          >
            <option value="">— הצעה נוכחית —</option>
            {savedQuotes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.clientName || "(ללא שם)"} – {q.quoteDate}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleSaveCurrentQuote}>
            שמור הצעה נוכחית
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleNewQuote}>
            הצעה חדשה
          </button>
          {selectedQuoteId && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleDeleteSavedQuote}
              aria-label="מחק הצעה שמורה"
            >
              מחק הצעה
            </button>
          )}
        </div>

        <div className="quote-card">
          <div className="quote-confidential print-only" aria-hidden="true">
            //סודי// – מסמך פנימי, באישור מנהל העסק
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
                <col className="col-qty" />
                <col className="col-pct" />
                <col className="col-price" />
                <col className="col-discount" />
                <col className="col-total" />
                <col className="col-action" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="col-work-type">סוג עבודה</th>
                  <th scope="col" className="col-description">תיאור</th>
                  <th scope="col" className="col-unit">יחידה</th>
                  <th scope="col" className="col-qty">כמות</th>
                  <th scope="col" className="col-pct">אחוז עבודה</th>
                  <th scope="col" className="col-price">מחיר ליחידה (₪)</th>
                  <th scope="col" className="col-discount">הנחה %</th>
                  <th scope="col" className="col-total">סה"כ (₪)</th>
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
                      <td className="col-qty">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={row.quantity === "" ? "" : row.quantity}
                          onChange={(e) => updateRow(row.id, "quantity", e.target.value)}
                          aria-label="כמות"
                        />
                      </td>
                      <td className="col-pct">
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
                      <td className="col-price">
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
                      <td className="col-discount">
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
                      <td className="col-total total-cell">{total.toFixed(2)}</td>
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
                  <td className="col-total grand-total-value" scope="row">
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
          <p className="quote-pdf-hint">לשמירה כ־PDF: לחץ הדפס ובחר &quot;שמור כ־PDF&quot; ביעד ההדפסה.</p>
        </div>

        <p className="business-hint">הטיוטה נשמרת אוטומטית בדפדפן.</p>
      </div>
    </section>
  );
}
