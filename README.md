# מ.פ. פרויקטים (M.P. Projects)

אתר תדמיתי לעסק שיפוצים ועבודות בניין – ראשון לציון, גוש דן.

## טכנולוגיות

- **React 18** – ממשק משתמש
- **Vite 5** – בנייה ופיתוח
- **CSS** – ערכות צבעים (בהיר / כהה / נגישות), RTL

## הרצה מקומית

```bash
# התקנת תלויות
npm i

# שרת פיתוח (פורט 5173)
npm run dev

# בנייה ל־Production
npm run build

# צפייה בתוצרת Build
npm run preview
```

## מבנה הפרויקט

```
├── index.html           # כניסה ל־SPA
├── src/
│   ├── main.jsx         # נקודת כניסה
│   ├── App.jsx          # רכיב ראשי + לוגיקת חלונית
│   ├── context/         # ThemeContext (ערכת צבעים)
│   └── components/      # Nav, Hero, About, Services, Projects, Testimonials, Contact, Footer, ContactOverlay, ScrollToTop
├── css/                 # variables.css, styles.css
├── vite.config.mjs
└── package.json
```

## תוכן ותחזוקה

- **פיתוח וניהול מערכת:** מיכאל פפיסמדוב
- **תוכן ועדכונים עסקיים:** זורה פפיסמדוב

## רישיון

© מ.פ. פרויקטים – כל הזכויות שמורות.
