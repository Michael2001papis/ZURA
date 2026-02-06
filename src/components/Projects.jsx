import React from "react";

const PROJECTS = [
  { title: "שיפוץ דירה", location: "ראשון לציון" },
  { title: "עבודות גבס וריצוף", location: "גוש דן" },
  { title: "איטום וריצוף מרפסת", location: "ראשון לציון" },
];

export default function Projects() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">
        פרויקטים
      </h2>
      <p className="section-subtitle">לפני ואחרי – דוגמאות מעבודות שבוצעו</p>
      <div className="projects-grid">
        {PROJECTS.map(({ title, location }) => (
          <article key={title} className="project-card">
            <div className="project-placeholder">תמונה לפני / אחרי – יועלה בהמשך</div>
            <div className="project-info">
              <h3>{title}</h3>
              <p>{location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
