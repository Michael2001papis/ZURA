import React from "react";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        אודות
      </h2>
      <p className="section-subtitle">מי אנחנו ואיך אנחנו עובדים</p>
      <div className="about-content">
        <div className="about-text">
          <p>
            <strong>זורה פפיסמדוב</strong> – בעל העסק, עם 7 שנות ניסיון בתחום השיפוצים והבנייה.
            אנחנו מתמחים בשיפוצים כלליים, עבודות גבס, ריצוף, איטום, אינסטלציה וחשמל –
            משלב התכנון ועד לסיום העבודה.
          </p>
          <p>
            התהליך אצלנו פשוט וברור:{" "}
            <strong>פנייה → פגישה בשטח → הצעת מחיר גמישה</strong> בהתאם לצרכים שלכם. המחיר
            הסופי נקבע ביחד, בשקיפות מלאה.
          </p>
          <ul className="about-list">
            <li>עבודה מסודרת ואמינה, עם דגש על איכות החומרים והביצוע</li>
            <li>שירות אישי וליווי צמוד לאורך הפרויקט</li>
            <li>אזור פעילות: ראשון לציון וגוש דן</li>
          </ul>
        </div>
        <div className="about-visual">
          <h3>שעות פעילות</h3>
          <p>
            ימים א׳–ה׳: 07:00–18:00
            <br />
            יום ו׳: 07:00–13:30
            <br />
            שבת: אין פעילות
          </p>
          <h3 style={{ marginTop: "1.25rem" }}>כתובת</h3>
          <p>גולדברג הנדבן 14, ראשון לציון</p>
        </div>
      </div>
    </section>
  );
}
