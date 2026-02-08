import React from "react";
import { getContactDraft } from "../utils/userMemory";

export default function Hero() {
  const draft = getContactDraft();
  const hasName = draft.name && draft.name.trim();

  return (
    <section className="hero" id="hero">
      <div>
        {hasName && (
          <p className="hero-welcome-back" aria-live="polite">
            שלום שוב, {draft.name.trim()}!
          </p>
        )}
        <h1>מ.פ. פרויקטים</h1>
        <p className="hero-tagline">
          שיפוצים כלליים, גבס, ריצוף, איטום, אינסטלציה וחשמל – ברמה גבוהה ובמחיר הוגן.
          ראשון לציון וגוש דן. 7 שנות ניסיון.
        </p>
        <div className="hero-cta">
          <a
            href="https://wa.me/972545820008"
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
          >
            וואטסאפ – להצעת מחיר
          </a>
          <a href="#contact" className="btn btn-secondary">
            צור קשר
          </a>
        </div>
      </div>
    </section>
  );
}
