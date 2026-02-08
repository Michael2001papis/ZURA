import React from "react";
import { WHATSAPP_URL } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#" className="logo">
          M.P. Projects
        </a>
        <p>מ.פ. פרויקטים – שיפוצים ועבודות בניין | ראשון לציון, גוש דן</p>
        <p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-wa">
            צור קשר בוואטסאפ
          </a>
        </p>
        <p>© כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}
