/**
 * מ.פ. פרויקטים – לוגיקת אתר
 * ניהול ערכת צבעים, תפריט מובייל, טופס צור קשר וחלונית יצירת קשר (חכמה)
 */

(function () {
  "use strict";

  const THEME_KEY = "mp-projects-theme";
  const VISIT_COUNT_KEY = "mp-projects-visits";
  const OVERLAY_CLOSED_KEY = "mp-projects-overlay-closed";

  // ----- ערכת צבעים -----
  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll(".theme-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-theme") === theme ? "true" : "false");
    });
  }

  document.querySelectorAll(".theme-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(this.getAttribute("data-theme"));
    });
  });

  setTheme(getStoredTheme());

  // ----- תפריט מובייל -----
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.querySelector(".nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.setAttribute("aria-label", open ? "סגור תפריט" : "תפריט");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "תפריט");
      });
    });
  }

  // ----- טופס צור קשר ראשי -----
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // בשלב זה אין שליחה לשרת – בעתיד: שליחה למייל zurapapismedov@gmail.com
      var name = (document.getElementById("name") && document.getElementById("name").value) || "";
      var phone = (document.getElementById("phone") && document.getElementById("phone").value) || "";
      var message = (document.getElementById("message") && document.getElementById("message").value) || "";
      // אפשרות: פתיחת mailto כ־fallback
      var mailto =
        "mailto:zurapapismedov@gmail.com?subject=פנייה מאתר מ.פ. פרויקטים&body=" +
        encodeURIComponent("שם: " + name + "\nטלפון: " + phone + "\n\nהודעה:\n" + message);
      window.location.href = mailto;
    });
  }

  // ----- חלונית יצירת קשר חכמה -----
  // כניסה ראשונה – ללא הפרעה | כניסה שנייה – חלונית עם סגירה | אחר כך – כל 10 כניסות
  var overlay = document.getElementById("contact-overlay");
  var overlayClose = document.getElementById("overlay-close");
  var overlayForm = document.getElementById("overlay-form");

  function getVisitCount() {
    return parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
  }

  function setVisitCount(n) {
    localStorage.setItem(VISIT_COUNT_KEY, String(n));
  }

  function shouldShowOverlay() {
    var count = getVisitCount();
    if (count <= 1) return false;   // כניסה ראשונה – ללא הפרעה
    if (count === 2) return true;   // כניסה שנייה – חלונית עם סגירה
    return (count - 2) % 10 === 0;  // אחר כך – קפיצה אחת כל 10 כניסות
  }

  function openOverlay() {
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    localStorage.setItem(OVERLAY_CLOSED_KEY, "true");
  }

  var visits = getVisitCount();
  setVisitCount(visits + 1);

  if (shouldShowOverlay()) {
    localStorage.removeItem(OVERLAY_CLOSED_KEY); // איפוס לכל מחזור הצגה חדש
    setTimeout(openOverlay, 800);
  }

  if (overlayClose) {
    overlayClose.addEventListener("click", closeOverlay);
  }
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeOverlay();
    });
  }

  if (overlayForm) {
    overlayForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("overlay-name") && document.getElementById("overlay-name").value) || "";
      var phone = (document.getElementById("overlay-phone") && document.getElementById("overlay-phone").value) || "";
      var message = (document.getElementById("overlay-message") && document.getElementById("overlay-message").value) || "";
      var mailto =
        "mailto:zurapapismedov@gmail.com?subject=פנייה מאתר מ.פ. פרויקטים (חלונית)&body=" +
        encodeURIComponent("שם: " + name + "\nטלפון: " + phone + "\n\nהודעה:\n" + message);
      window.location.href = mailto;
      closeOverlay();
    });
  }

  // סגירת חלונית עם Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });
})();
