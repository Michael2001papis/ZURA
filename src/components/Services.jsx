import React from "react";

const SERVICES = [
  {
    title: "שיפוצים כלליים",
    text: "שיפוץ דירה או בית מקצה לקצה – תכנון, ביצוע וליווי עד לסיום.",
  },
  {
    title: "עבודות גבס",
    text: "תקרות גבס, קירות יבשים, עיצוב פנים ופתרונות אקוסטיים.",
  },
  {
    title: "ריצוף",
    text: "ריצוף פרקט, קרמיקה, מרצפות וכל סוגי הריצוף המקצועי.",
  },
  {
    title: "איטום",
    text: "איטום גגות, מרפסות, חדרי רטיבות ומניעת נזילות.",
  },
  {
    title: "אינסטלציה",
    text: "התקנות, תיקונים והחלפות – צנרת, דודים, שירותים ומטבחים.",
  },
  {
    title: "חשמל",
    text: "התקנות חשמל, נקודות תאורה, שקעים ועדכון לוח חשמל.",
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="section-title">
        שירותים
      </h2>
      <p className="section-subtitle">מגוון שירותי שיפוץ ובנייה תחת קורת גג אחת</p>
      <div className="services-grid">
        {SERVICES.map(({ title, text }) => (
          <div key={title} className="service-card">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
