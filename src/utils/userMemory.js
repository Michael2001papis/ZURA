/**
 * זיכרון משתמש – שמירת פרטי טופס צור קשר ב־localStorage
 * מאפשר למלא אוטומטית בחזרה ולקבל "שלום שוב"
 */

const DRAFT_KEY = "mp-projects-contact-draft";

export function getContactDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { name: "", phone: "", email: "" };
    const data = JSON.parse(raw);
    return {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
    };
  } catch {
    return { name: "", phone: "", email: "" };
  }
}

export function setContactDraft({ name = "", phone = "", email = "" }) {
  try {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ name, phone, email })
    );
  } catch {
    // ignore
  }
}

export function hasStoredUser() {
  const d = getContactDraft();
  return !!(d.name || d.phone || d.email);
}
