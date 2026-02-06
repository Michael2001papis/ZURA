import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ContactOverlay, {
  getVisitCount,
  setVisitCount,
  shouldShowOverlay,
  OVERLAY_CLOSED_KEY,
} from "./components/ContactOverlay";

function AppContent() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const count = getVisitCount();
    setVisitCount(count + 1);

    if (shouldShowOverlay()) {
      localStorage.removeItem(OVERLAY_CLOSED_KEY);
      const t = setTimeout(() => setOverlayOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const closeOverlay = () => {
    setOverlayOpen(false);
    localStorage.setItem(OVERLAY_CLOSED_KEY, "true");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (overlayOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [overlayOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && overlayOpen) closeOverlay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ContactOverlay open={overlayOpen} onClose={closeOverlay} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
