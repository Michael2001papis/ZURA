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

# צפייה בתוצאת ה-build
npm run preview
```

## פיצ'רים

- **מבקרים:** אתר תדמיתי – אודות, שירותים, פרויקטים (כולל תמונות), המלצות לקוחות, צור קשר. זיכרון פרטים (טופס), חלונית יצירת קשר חכמה, חזרה למעלה, דלג לתוכן.
- **כניסה (בעל העסק):** משתמש `zura` – ניווט מצומצם (אזור עסקי, אודות, שירותים, פרויקטים), עריכת תוכן (אודות, שירותים, פרויקטים, המלצות) (נשמר ב־localStorage).
- **אזור עסקי:** הצעות מחיר – טבלה מסודרת, שמירת כמה הצעות (בחירה/טעינה/מחיקה), הדפסה עם תג "//סודי//", hint לשמירה כ־PDF.
- **צור קשר:** שליחה דרך mailto או דרך Formspree (אם מוגדר ב־constants).
- **SEO:** נתוני LocalBusiness (JSON-LD) ב־index.html.
- **PWA:** קובץ manifest.json – התקנה כ־"אפליקציה" מהדפדפן (הוספה למסך הבית).

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

### שליחת טופס צור קשר ל־Formspree (אופציונלי)

אם תרצה שהפניות מהטופס יגיעו לאימייל בלי לפתוח תוכנת אימייל אצל הלקוח:

1. היכנס ל־[formspree.io](https://formspree.io), צור טופס חדש וקבל מזהה (למשל `xyzabcde`).
2. ב־`src/utils/constants.js` הגדר: `export const FORMSPREE_FORM_ID = "xyzabcde";`
3. אם השדה ריק – האתר ממשיך להשתמש ב־mailto כרגיל.

## תוכן ותחזוקה

- **פיתוח וניהול מערכת:** מיכאל פפיסמדוב
- **תוכן ועדכונים עסקיים:** זורה פפיסמדוב

## רישיון

© מ.פ. פרויקטים – כל הזכויות שמורות.
