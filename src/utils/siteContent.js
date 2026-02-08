/**
 * תוכן האתר – נשמר ב־localStorage, עריכה רק למשתמש עסקי
 */

const KEY_ABOUT = "mp-projects-content-about";
const KEY_SERVICES = "mp-projects-content-services";
const KEY_PROJECTS = "mp-projects-content-projects";

const DEFAULT_ABOUT = {
  intro1: "זורה פפיסמדוב – בעל העסק, עם 7 שנות ניסיון בתחום השיפוצים והבנייה. אנחנו מתמחים בשיפוצים כלליים, עבודות גבס, ריצוף, איטום, אינסטלציה וחשמל – משלב התכנון ועד לסיום העבודה.",
  intro2: "התהליך אצלנו פשוט וברור: פנייה → פגישה בשטח → הצעת מחיר גמישה בהתאם לצרכים שלכם. המחיר הסופי נקבע ביחד, בשקיפות מלאה.",
  listItems: [
    "עבודה מסודרת ואמינה, עם דגש על איכות החומרים והביצוע",
    "שירות אישי וליווי צמוד לאורך הפרויקט",
    "אזור פעילות: ראשון לציון וגוש דן",
  ],
  hours: "ימים א׳–ה׳: 07:00–18:00\nיום ו׳: 07:00–13:30\nשבת: אין פעילות",
  address: "גולדברג הנדבן 14, ראשון לציון",
};

const DEFAULT_SERVICES = [
  { id: "1", title: "שיפוצים כלליים", text: "שיפוץ דירה או בית מקצה לקצה – תכנון, ביצוע וליווי עד לסיום." },
  { id: "2", title: "עבודות גבס", text: "תקרות גבס, קירות יבשים, עיצוב פנים ופתרונות אקוסטיים." },
  { id: "3", title: "ריצוף", text: "ריצוף פרקט, קרמיקה, מרצפות וכל סוגי הריצוף המקצועי." },
  { id: "4", title: "איטום", text: "איטום גגות, מרפסות, חדרי רטיבות ומניעת נזילות." },
  { id: "5", title: "אינסטלציה", text: "התקנות, תיקונים והחלפות – צנרת, דודים, שירותים ומטבחים." },
  { id: "6", title: "חשמל", text: "התקנות חשמל, נקודות תאורה, שקעים ועדכון לוח חשמל." },
];

const DEFAULT_PROJECTS = [
  { id: "1", title: "שיפוץ דירה", location: "ראשון לציון" },
  { id: "2", title: "עבודות גבס וריצוף", location: "גוש דן" },
  { id: "3", title: "איטום וריצוף מרפסת", location: "ראשון לציון" },
];

function load(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getAbout() {
  return load(KEY_ABOUT, DEFAULT_ABOUT);
}

export function setAbout(data) {
  save(KEY_ABOUT, data);
}

export function getServices() {
  return load(KEY_SERVICES, DEFAULT_SERVICES);
}

export function setServices(data) {
  save(KEY_SERVICES, data);
}

export function getProjects() {
  return load(KEY_PROJECTS, DEFAULT_PROJECTS);
}

export function setProjects(data) {
  save(KEY_PROJECTS, data);
}
