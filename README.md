# מ.פ. פרויקטים (M.P. Projects)

אתר תדמיתי + אזור עסקי לעסק שיפוצים ועבודות בניין – ראשון לציון, גוש דן.

## טכנולוגיות

- **React 18** – SPA, ממשק משתמש
- **Vite 5** – בנייה ופיתוח
- **CSS** – ערכות צבעים (בהיר / כהה / נגישות), RTL, רספונסיב (טלפון, טאבלט)

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

## פיצ'רים

- **מבקרים:** אתר תדמיתי – אודות, שירותים, פרויקטים, המלצות, צור קשר. זיכרון פרטים (טופס), חלונית יצירת קשר חכמה, חזרה למעלה, דלג לתוכן.
- **כניסה (בעל העסק):** משתמש `zura` – ניווט מצומצם (אזור עסקי, אודות, שירותים, פרויקטים), עריכת תוכן לאודות / שירותים / פרויקטים (נשמר ב־localStorage).
- **אזור עסקי:** הצעת מחיר עם טבלה מסודרת (סוג עבודה, תיאור עד 50 אותיות, יחידה, כמות, אחוז עבודה, מחיר, הנחה), הדפסה עם תג "//סודי//".

## מבנה הפרויקט

```
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── context/         # ThemeContext, AuthContext (כולל BUSINESS_USER)
│   ├── components/      # Nav, Hero, About, Services, Projects, Testimonials, Contact, Footer,
│   │                    # ContactOverlay, LoginModal, BusinessArea, ScrollToTop, SkipToContent
│   └── utils/           # siteContent, userMemory, constants (אימייל, טלפון, וואטסאפ)
├── css/                 # variables.css, styles.css
├── vite.config.mjs
└── package.json
```

## עדכון פרטי קשר

ערוך את הקובץ **`src/utils/constants.js`** – שם מוגדרים אימייל, טלפון וקישור וואטסאפ.

## תוכן ותחזוקה

- **פיתוח וניהול מערכת:** מיכאל פפיסמדוב
- **תוכן ועדכונים עסקיים:** זורה פפיסמדוב

## רישיון

© מ.פ. פרויקטים – כל הזכויות שמורות.
